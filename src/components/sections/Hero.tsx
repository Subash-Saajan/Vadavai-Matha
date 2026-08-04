"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { cappedSizes } from "@/lib/imageSizes";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useHeroMedia } from "@/hooks/useHeroMedia";
import { useScrubFilm } from "@/hooks/useScrubFilm";
import { useScrubVideo } from "@/hooks/useScrubVideo";
import { ChevronDown } from "lucide-react";

/* ── THREE HEROES, ONE SCRUB ───────────────────────────────────────────────
   The scroll drives a single 0–1 playhead. What consumes it depends on the
   engine, and useHeroMedia.ts is where that is decided and why:

     desktop      the uncropped 16:9 cut, seeked in a <video> (unchanged)
     film         Chromium on a phone — WebCodecs decodes one picture per
                  scroll position onto a <canvas>. ~2ms, any direction, and
                  sharp, because a single-frame decode is cheap.
     mobileVideo  WebKit on a phone — a <video> seeked with currentTime.
                  Slower (20–50ms a seek) and therefore a smaller cut, but
                  WebCodecs on Safari 18 is what kills iPhones.

   Both phone cuts come from the same generator and the same crop, with the
   church's drift across the frame BAKED IN, so neither needs a runtime pan
   or an object-position — plain object-cover centres both at every point of
   the scrub. Regenerate with:

       node scripts/gen-hero-mobile.mjs

   Re-cut either file and re-measure; do not adjust any of this by eye. */
const DESKTOP_SRC = "/hero-video.mp4";
const MOBILE_SRC = "/hero-mobile.mp4";
const FILM_SRC = "/hero-frames/film.h264";
const FILM_INDEX_SRC = "/hero-frames/film.json";
const FRAME_COUNT = 150;

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /** Written by the scrub below, read by useScrubFilm. */
  const frameTargetRef = useRef(0);
  const drawRef = useRef<(() => void) | null>(null);

  // `mode` is null until mounted, so SSR paints only the poster.
  const { mode, demoteFilm } = useHeroMedia();

  const videoSrc =
    mode === "desktop" ? DESKTOP_SRC : mode === "mobileVideo" ? MOBILE_SRC : null;

  const { ready: videoReady, scrubTo } = useScrubVideo({ videoRef, src: videoSrc });

  const { ready: filmReady } = useScrubFilm({
    canvasRef,
    frameTargetRef,
    drawRef,
    active: mode === "film",
    manifestSrc: FILM_INDEX_SRC,
    filmSrc: FILM_SRC,
    frameCount: FRAME_COUNT,
    onFail: demoteFilm,
  });

  const ready = mode === "film" ? filmReady : videoReady;

  useEffect(() => {
    if (!ready || !mode) return;

    const ctx = gsap.context(() => {
      // ── Entrance: stone rises out of darkness, line by line ──
      const lines = headingRef.current?.querySelectorAll(".title-line");
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(
        kickerRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          lines ? Array.from(lines) : [],
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.3, ease: "power4.out", stagger: 0.12 },
          "-=0.6"
        )
        .fromTo(
          subRef.current,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.3"
        );

      /* ── Scroll-driven scrub (the Apple-style core effect) ──
         The tween drives a plain 0–1 proxy rather than the element: the video
         may be mid-seek when a tick arrives, and useScrubVideo decides when
         it can actually service one. Trying to write currentTime from here,
         every frame, is precisely the mistake that made this stutter on
         phones before.

         ⚠ THE SEEKING PATH WANTS LESS EASING THAN THE DECODING ONE.
         `scrub: n` is how many seconds the playhead takes to catch up to the
         scroll position. On the film a whole second reads as glide, because a
         decode-and-draw is ~2ms and the canvas can track that eased target
         exactly — which is what the mobile hero has always used. A seek
         cannot: it costs 20–50ms, so the medium ALREADY lags and a second of
         easing stacks on top of it. That combination is what read as "laggy
         and jittery" when every phone was briefly put on the <video> path.

         So the film keeps 1, and the seeking path gets 0.35 — enough
         smoothing to absorb the variance between one seek and the next
         without adding perceptible lag of its own. Desktop sits between: a
         desktop seek is far cheaper, and Lenis is already easing the wheel in
         front of it (useLenis is >=768px only). */
      const playhead = { p: 0 };
      gsap.to(playhead, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: mode === "desktop" ? 0.5 : mode === "film" ? 1 : 0.35,
        },
        onUpdate: () => {
          if (mode === "film") {
            frameTargetRef.current = playhead.p * (FRAME_COUNT - 1);
            drawRef.current?.();
          } else {
            scrubTo(playhead.p);
          }
        },
      });

      // ── Text drifts up + fades as you descend ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "32% top",
        scrub: 1,
        animation: gsap
          .timeline()
          .to(headingRef.current, { y: -130, opacity: 0, ease: "none" })
          .to(subRef.current, { y: -90, opacity: 0, ease: "none" }, 0)
          .to(kickerRef.current, { y: -70, opacity: 0, ease: "none" }, 0)
          .to(scrollRef.current, { opacity: 0, ease: "none" }, 0),
      });

      // ── Overlay deepens gently (soft navy) as you scroll ──
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.1 },
        {
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "45% top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, mode, scrubTo]);

  return (
    <section
      ref={sectionRef}
      data-nav-hero /* Navbar stays transparent while this is behind it */
      /* ── THE SCROLL RUNWAY, AND WHY IT IS SHORTER ON A PHONE ────────────────
         300vh is 200vh of actual scrub once the sticky stage has taken its
         viewport. On a monitor that is two flicks of a wheel. On a phone, where
         one comfortable thumb swipe moves something like half a screen, it is
         eight or nine swipes to get out of the hero — and a reader who has to
         work that hard to leave the first section concludes the page is stuck,
         not that it is cinematic. 220vh gives 120vh of scrub, about four
         swipes, and the film reads faster per gesture as a result.

         Deliberately `vh`, NOT `svh`/`dvh`, on both the runway and the stage
         below. `vh` is the LARGE viewport, so the stage always covers the
         screen whether the address bar is showing or not, and — because it is
         a constant — showing or hiding that bar mid-scroll resizes nothing.
         `dvh` would track the bar exactly and re-lay-out the sticky stage on
         every frame of its animation, which is the "jump" this kind of hero is
         famous for. The cost of `vh` is that the bottom ~60px sits under the
         bar while it is shown, which is what the scroll indicator's own
         `bottom-24 md:bottom-10` is for. */
      className="relative h-[220vh] bg-navy md:h-[300vh]"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* First frame as instant poster under the video — also the mobile
            LCP, since the video cannot paint until it has loaded and seeked.

            The poster is the uncropped 1920×1080 master; the mobile video is
            a 1296-wide slice of it whose left edge sits at x=1287.6 at the
            start of the scrub, i.e. centred on 0.504 of the master's width.
            That has to be what the poster aims at too, or the church jumps
            sideways the moment the video paints over it.

            The percentage is not that point, though: `object-position: P%`
            aligns the P% of the IMAGE with the P% of the BOX, so putting a
            focal point in the middle needs P = (cw/2 − focal·dw)/(cw − dw),
            which for a full-height 16:9 poster on any phone works out at
            50.5%. Phones only — desktop shows the whole field, unshifted. */}
        <Image
          src="/hero-frames/poster.webp"
          alt=""
          fill
          priority
          sizes={cappedSizes("100vw")}
          className="object-cover object-[50.5%_center] md:object-center"
        />

        {/* `muted` + `playsinline` are what make an inline video legal to load
            and decode without a gesture on iOS; `preload="auto"` asks for the
            data up front (see the kick() note in useScrubVideo for what
            happens when iOS ignores it). No `loop`, no `autoplay` — nothing
            here ever plays, it is only ever seeked. */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* The WebCodecs film draws here. Its pictures are already centred by
            the crop, so this is a plain full-bleed surface with no geometry
            of its own — useScrubFilm sizes the backing store to the element
            at a pixel ratio capped at 2. */}
        {mode === "film" && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        )}

        {/* Light legibility wash — just enough to hold the title */}
        <div className="absolute inset-0 bg-linear-to-b from-navy/30 via-transparent to-navy/45 pointer-events-none" />
        {/* Soft vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(10,19,34,0.38)_100%)]" />
        {/* Gentle scroll-driven deepening (soft navy, no red) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-navy/40 pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          {/* Kicker */}
          <div
            ref={kickerRef}
            className="mb-7 flex flex-col items-center gap-3"
          >
            <svg width="16" height="24" viewBox="0 0 13 20" fill="none" className="text-gold animate-float" aria-hidden="true">
              <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {/* 0.55em of tracking on an 11.5px word needs about 150px to sit
                in and is the first thing to crowd on a narrow screen. Up in
                size, in on tracking — the same trade the `.kicker` makes. */}
            <span className="font-display text-[0.78rem] tracking-[0.38em] uppercase text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] md:text-sm md:tracking-[0.55em]">
              Little Rome
            </span>
          </div>

          {/* Monumental title — line-by-line stone reveal.
           *
           * The visible lines read "OUR LADY / of Assumption", which is what the
           * hero should say and what the design was built around. But that is
           * also the entire <h1> a crawler saw: it named neither the shrine, nor
           * the village, nor "Little Rome". The contact page's heading did name
           * them, so for a query on this parish's own name Google preferred
           * /contact over the home page — the markup told it to.
           *
           * So the h1 keeps its two carved lines and gains a fuller reading
           * beside them, the same `aria-hidden` + `sr-only` pairing the contact
           * page's DedicationTablet already uses. A screen reader hears the whole
           * name of the place; the page renders pixel-for-pixel as before.
           *
           * `.title-line` stays only on the visible spans, so the GSAP entrance
           * (which queries for it inside `headingRef`) is untouched. */}
          <h1
            ref={headingRef}
            className="font-display font-semibold text-white uppercase tracking-[0.04em] leading-[0.92]"
          >
            <span className="sr-only">
              Our Lady of Assumption — the Holy Family Shrine, Vadakkankulam,
              called Little Rome
            </span>
            {/* ── THE TWO LINES ARE FLUID BELOW `md`, AND LINE TWO WAS BROKEN ──
                "of Assumption" was a flat 2.75rem (44px). Thirteen characters
                of Cinzel at 44px want roughly 345px; a 390px phone minus the
                `px-6` gutters leaves 342, and a 360px one leaves 312 — so on
                every common phone the site's own <h1> was running off the edge
                of the screen or breaking onto a third line. It is the first
                thing anyone sees.

                `clamp()` instead of a breakpoint step, because the failure was
                continuous — it got worse smoothly as the screen narrowed, and
                a single `sm:` jump would only move where it happened. The
                middle term is the one doing the work: 8.8vw holds the line at
                a constant share of the screen, so it fits at 320px and at
                430px, and the max is exactly the 2.75rem this was designed at,
                reached just before `md` takes over. Line one is set to 11.5vw
                so the two keep the size relationship the design has. */}
            <span aria-hidden="true" className="block">
              <span className="block overflow-hidden">
                <span className="title-line block text-[clamp(2.35rem,11.5vw,3rem)] md:text-7xl lg:text-[7.5rem]">
                  Our Lady
                </span>
              </span>
              <span className="block overflow-hidden mt-1 md:mt-2">
                <span className="title-line block text-[clamp(1.8rem,8.8vw,2.75rem)] text-gradient-gold md:text-6xl lg:text-[6rem]">
                  of Assumption
                </span>
              </span>
            </span>
          </h1>

          {/* Cross divider + tagline */}
          <div ref={subRef} className="mt-8 flex flex-col items-center gap-5 max-w-xl">
            <div className="cross-rule w-60 max-w-[72vw]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            {/* Cormorant italic renders visibly smaller than sans at the same
                number — see the note on the serif body sizes in Patroness.tsx.
                It sits a step above the page's sans body, not level with it. */}
            <p className="text-[1.02rem] md:text-lg text-white/75 font-serif italic tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              A sacred sanctuary of faith, prayer &amp; community
            </p>
          </div>

          {/* Scroll indicator */}
          {/* `bottom-24` on a phone, not `bottom-10`: the stage is a large
              viewport (see the runway note on the section), so its bottom
              40px sit behind the browser's own address bar for as long as
              that bar is showing — which is exactly when a reader is looking
              for the invitation to scroll. */}
          <div
            ref={scrollRef}
            className="absolute bottom-24 flex flex-col items-center gap-2 md:bottom-10"
          >
            <span className="font-display text-[0.68rem] uppercase tracking-[0.26em] text-white/60 md:text-[0.6rem] md:tracking-[0.35em]">
              Scroll to enter
            </span>
            <ChevronDown className="w-5 h-5 text-gold animate-scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
