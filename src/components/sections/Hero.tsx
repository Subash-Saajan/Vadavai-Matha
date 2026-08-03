"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrubMedia } from "@/hooks/useScrubMedia";
import { ChevronDown } from "lucide-react";

/**
 * Mobile scrub frames — generated from hero-video.mp4 by
 * scripts/gen-scrub-frames.mjs. Phones can't scrub a <video> smoothly (every
 * currentTime set is a full async seek through the media pipeline), so under
 * md the hero draws these onto a canvas instead, Apple-product-page style.
 */
const FRAME_COUNT = 150;
const frameSrc = (i: number) => `/hero-frames/f${String(i + 1).padStart(3, "0")}.webp`;

/**
 * The same film as a single H.264 stream, which is what a phone actually plays
 * now — the stills above are the fallback for anything that cannot decode it.
 *
 * It is 1080×1350 against the stills' 864×1080 and 3.93 MB against their
 * 14.7 MB, both at once, because inter-frame compression is the thing a
 * sequence of separate images cannot do. The reason it exists is memory
 * though, not bytes: a decoded VideoFrame is released by calling close(), so
 * the mobile hero holds one canvas and nothing else. See useScrubFilm.ts.
 */
const FILM_SRC = "/hero-frames/film.h264";
const FILM_INDEX_SRC = "/hero-frames/film.json";

/**
 * The church is not in the middle of its own footage. gen-scrub-frames.mjs
 * takes a dead-centre 4:5 slice of the drone master, and in that slice the
 * spire sits at about 51% of the frame's width at the start of the scrub and
 * drifts out to about 56% by the end — the drone is descending towards it, not
 * orbiting it. A desktop viewport is wide enough that the whole 4:5 field is on
 * screen and nobody notices; a phone crops another ~40% off the sides, which
 * magnifies that offset into a church visibly parked right of centre.
 *
 * So the mobile canvas draws from 54.5% of the frame instead of 50% — a
 * compromise between the two ends of the pan that reads as centred throughout.
 * Canvas-only by construction, so the desktop <video> keeps its full field.
 */
const CHURCH_FOCUS_X = 0.545;

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Desktop scrubs the real video; touch draws the frame sequence (and never
  // downloads the 8 MB video). mode is null until mounted, so SSR paints
  // only the poster.
  const { mode, mediaReady, frameTargetRef, drawRef } = useScrubMedia({
    videoRef,
    canvasRef,
    frameCount: FRAME_COUNT,
    frameSrc,
    filmSrc: FILM_SRC,
    filmIndexSrc: FILM_INDEX_SRC,
    focusX: CHURCH_FOCUS_X,
  });

  useEffect(() => {
    if (!mediaReady || !mode) return;

    const video = videoRef.current;
    if (mode === "video" && (!video || !video.duration)) return;

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

      // ── Scroll-driven scrub (the Apple-style core effect) ──
      if (mode === "video" && video) {
        const videoScrub = { time: 0 };
        gsap.to(videoScrub, {
          time: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
          onUpdate: () => {
            if (video.readyState >= 2) video.currentTime = videoScrub.time;
          },
        });
      } else {
        const frameScrub = { frame: 0 };
        gsap.to(frameScrub, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            // More catch-up than desktop's 0.5: raw touch scroll has no Lenis
            // easing in front of it, so the scrub supplies the glide instead.
            scrub: 1,
          },
          onUpdate: () => {
            frameTargetRef.current = frameScrub.frame;
            drawRef.current?.();
          },
        });
      }

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
  }, [mediaReady, mode, frameTargetRef, drawRef]);

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
        {/* First frame as instant poster under whichever scrub medium mounts —
            also the mobile LCP, since phones never load the video itself.

            The poster is the uncropped landscape frame, so on a phone
            object-cover happens to crop it to exactly the same slice the 4:5
            scrub frames show. It therefore has to carry the same off-centre
            framing as CHURCH_FOCUS_X, or the church would visibly jump
            sideways the moment frame 1 lands on the canvas over it. 52.7% of
            this frame's overflow is the same ~30px nudge that 54.5% of the
            narrower crop is. Phones only — desktop shows the whole field. */}
        <Image
          src="/hero-frames/poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[52.7%_center] md:object-center"
        />

        {mode === "video" && (
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* One canvas for both mobile paths. `film` decodes the H.264 stream
            with WebCodecs; `canvas` draws the WebP stills. They are the same
            element on purpose — a hero that demotes from film to stills
            mid-load keeps its canvas, and therefore whatever was last painted
            on it, instead of blanking while React swaps one node for another. */}
        {(mode === "film" || mode === "canvas") && (
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
