"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { abandonHeroFilm, cachedHeroFilm, loadHeroFilm } from "@/lib/heroFilm";
import { cappedSizes } from "@/lib/imageSizes";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useHeroMedia } from "@/hooks/useHeroMedia";
import { useScrubFilm } from "@/hooks/useScrubFilm";
import { useScrubVideo } from "@/hooks/useScrubVideo";
import { VARIANT_SCRUB } from "@/lib/heroVariants";
import { useLang } from "@/components/layout/LanguageProvider";
import { ChevronDown } from "lucide-react";

/* ── THREE HEROES, ONE SCRUB ───────────────────────────────────────────────
   The scroll drives a single 0–1 playhead. What consumes it depends on the
   engine, and useHeroMedia.ts is where that is decided and why:

     desktop      the uncropped 16:9 cut, seeked in a <video> (unchanged)
     film         Chromium on a phone — WebCodecs decodes one picture per
                  scroll position onto a <canvas>. ~2ms, any direction, and
                  sharp, because a single-frame decode is cheap. 1080×1920,
                  which is exactly what a DPR-2-capped canvas can show.
     mobileVideo  WebKit on a phone — a <video> seeked with currentTime.
                  Slower (20–50ms a seek), so a smaller cut: 810×1440.
                  Kept off the film because WebCodecs on Safari 18 is
                  believed to kill iPhones — see the note in useHeroMedia
                  on why that is still a belief and not a measurement.

   Both phone cuts come from the same generator and the same crop, with the
   church's drift across the frame BAKED IN, so neither needs a runtime pan
   or an object-position — plain object-cover centres both at every point of
   the scrub. Regenerate with:

       node scripts/gen-hero-mobile.mjs

   Re-cut either file and re-measure; do not adjust any of this by eye. */
/* ⚠ BUMP `CUT` WHENEVER gen-hero-mobile.mjs IS RE-RUN.
   The generated filenames are stable and next.config.ts serves them with a
   day of max-age, so without this a returning reader keeps yesterday's bytes
   at today's URL for up to 24 hours. That is not a cosmetic staleness:

     · film.json is a BYTE INDEX into film.h264. A cached pair from different
       cuts points the decoder at the wrong offsets — every picture fails, the
       hook demotes to <video>, and a Chromium phone silently loses the good
       path with nothing in any log to say why.
     · the church's pan is baked into the crop now. An older film drawn by
       this code, which no longer applies the runtime correction it was cut
       for, sits visibly off centre.

   A query string is enough: it changes the cache key without renaming
   anything on disk, so the generator stays simple and this stays a one-line
   bump. Immutable hashed filenames would be the tidier answer if these ever
   change often enough to be worth the plumbing. */
const CUT = "3";

const DESKTOP_SRC = "/hero-video.mp4";
const MOBILE_SRC = `/hero-mobile.mp4?c=${CUT}`;
const FILM_SRC = `/hero-frames/film.h264?c=${CUT}`;
const FILM_INDEX_SRC = `/hero-frames/film.json?c=${CUT}`;
const FRAME_COUNT = 150;

/* ── THE DESKTOP LOADING SCREEN ───────────────────────────────────────────
   On a monitor the film is downloaded whole before the hero is shown, so the
   scrub never waits on the network (see lib/heroFilm.ts for why). The screen
   is server-rendered for `md` and up, so it is there from the first paint
   rather than flashing in after hydration; phones never see it (`hidden
   md:flex`), and their hero paths are unchanged.

   MAX_WAIT_MS is the promise to the reader: on a connection too slow to fetch
   8 MB in time, the screen lifts anyway and the film streams as it always
   used to. Nobody is held at a loading screen. The CSS failsafe in
   globals.css (`.hero-loader`, 10s) covers the case where JavaScript never
   runs at all. */
const MAX_WAIT_MS = 8000;
const LOADER_FADE_MS = 700;

type FilmPhase = "loading" | "ready" | "fallback";
type LenisLike = { stop(): void; start(): void };

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

  /* `mode` is null until mounted, so SSR paints only the poster. `variant` is
     non-null ONLY when ?hero=<rung> names one of the test cuts — see
     src/lib/heroVariants.ts. Temporary; goes when the ladder does. */
  const { mode, variant, demoteFilm } = useHeroMedia();
  const { t } = useLang();

  /* Desktop film: null until downloaded (the poster carries the frame), then a
     blob: URL, or the plain file URL if we gave up waiting. Already "ready"
     when this session has downloaded it before (client-side navigation home). */
  const [film, setFilm] = useState<{ src: string | null; phase: FilmPhase }>(() => {
    const cached = cachedHeroFilm();
    return cached ? { src: cached, phase: "ready" } : { src: null, phase: "loading" };
  });
  const [progress, setProgress] = useState(0);
  const [loaderGone, setLoaderGone] = useState(() => cachedHeroFilm() !== null);

  /* Up while the desktop film is downloading. `mode === null` is SSR and the
     hydrating render, where we cannot know the device yet; the CSS decides
     then (md:flex), so a monitor sees the screen from the first paint. */
  const desktopFilm = mode === "desktop" && !variant;
  const loaderUp = film.phase === "loading" && (mode === null || desktopFilm);

  useEffect(() => {
    if (!desktopFilm || film.phase !== "loading") return;
    let settled = false;
    const { promise, unsubscribe } = loadHeroFilm(DESKTOP_SRC, setProgress);
    const giveUp = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      abandonHeroFilm();
      setFilm({ src: DESKTOP_SRC, phase: "fallback" });
    }, MAX_WAIT_MS);
    promise.then(
      (url) => {
        if (settled) return;
        settled = true;
        setFilm({ src: url, phase: "ready" });
      },
      () => {
        if (settled) return;
        settled = true;
        setFilm({ src: DESKTOP_SRC, phase: "fallback" });
      },
    );
    return () => {
      settled = true;
      window.clearTimeout(giveUp);
      unsubscribe();
    };
  }, [desktopFilm, film.phase]);

  /* Hold the page still while the screen is up: a reader who wheels during
     the load would otherwise arrive halfway down the hero. A stopped Lenis
     cancels wheel events outright, so nothing about the layout changes (no
     overflow toggling, no scrollbar jump). Lenis is created by the layout,
     whose effect runs AFTER this child's, so wait a frame or two for it. */
  useEffect(() => {
    if (!desktopFilm || film.phase !== "loading") return;
    const w = window as Window & { __lenis?: LenisLike };
    let raf = 0;
    const stop = () => {
      if (w.__lenis) w.__lenis.stop();
      else raf = requestAnimationFrame(stop);
    };
    stop();
    return () => {
      cancelAnimationFrame(raf);
      w.__lenis?.start();
    };
  }, [desktopFilm, film.phase]);

  // Unmount the screen once its fade-out has finished.
  useEffect(() => {
    if (loaderUp || loaderGone) return;
    const id = window.setTimeout(() => setLoaderGone(true), LOADER_FADE_MS);
    return () => window.clearTimeout(id);
  }, [loaderUp, loaderGone]);

  const videoSrc = variant
    ? (variant.videoSrc ?? null)
    : mode === "desktop"
      ? film.src
      : mode === "mobileVideo"
        ? MOBILE_SRC
        : null;

  const { ready: videoReady, scrubTo } = useScrubVideo({ videoRef, src: videoSrc });

  const { ready: filmReady } = useScrubFilm({
    canvasRef,
    frameTargetRef,
    drawRef,
    active: mode === "film",
    manifestSrc: variant?.indexSrc ?? FILM_INDEX_SRC,
    filmSrc: variant?.filmSrc ?? FILM_SRC,
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
          /* A ladder rung pins this, so a tester compares mechanism and
             resolution rather than easing — see VARIANT_SCRUB. */
          scrub: variant
            ? VARIANT_SCRUB
            : mode === "desktop"
              ? 0.5
              : mode === "film"
                ? 1
                : 0.35,
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
  }, [ready, mode, variant, scrubTo]);

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

            The poster is the uncropped master; the phone cuts are a 1215-wide
            slice of it whose left edge sits at x=1328.1 at the start of the
            scrub, i.e. centred on 0.504 of the master's width. That has to be
            what the poster aims at too, or the church jumps sideways the
            moment the video paints over it.

            That 0.504 is invariant to the crop width, which is why this
            percentage survived the cut being renarrowed from 0.6 to 0.5625:
            the crop is positioned to put the SAME point in the world at its
            centre, so making it narrower moves both its edges inward and
            leaves its centre where it was. Only a change to CHURCH_TRACK, or
            to which end of the pan the scrub starts at, can move this number.

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
            {/* Tamil: wide tracking pulls a Tamil syllable apart into what reads
                as broken text, and `.font-display` outside the nav is the 58%
                cut, so the word is sized up and the tracking taken to the
                `.kicker`'s Tamil 0.1em. */}
            <span className="font-display text-[0.78rem] tracking-[0.38em] uppercase text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] md:text-sm md:tracking-[0.55em] ta:text-[1.15rem] ta:tracking-widest ta:normal-case">
              {t.hero.kicker}
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
          {/* Tamil leading: each line sits in an `overflow-hidden` mask for the
              reveal, and at 0.92 that mask would shear the vowel signs that
              rise above a Tamil line (ி ீ) and the hooks that hang below it
              (ு ூ). 1.3 gives them room inside the mask. */}
          <h1
            ref={headingRef}
            className="font-display font-semibold text-white uppercase tracking-[0.04em] leading-[0.92] ta:tracking-normal ta:leading-[1.3]"
          >
            <span className="sr-only">{t.hero.titleFull}</span>
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
                  {t.hero.titleLine1}
                </span>
              </span>
              <span className="block overflow-hidden mt-1 md:mt-2">
                <span className="title-line block text-[clamp(1.8rem,8.8vw,2.75rem)] text-gradient-gold md:text-6xl lg:text-[6rem]">
                  {t.hero.titleLine2}
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
              {t.hero.tagline}
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
            <span className="font-display text-[0.68rem] uppercase tracking-[0.26em] text-white/60 md:text-[0.6rem] md:tracking-[0.35em] ta:text-[1rem] ta:tracking-[0.04em] ta:normal-case">
              {t.hero.scrollCue}
            </span>
            <ChevronDown className="w-5 h-5 text-gold animate-scroll-bounce" />
          </div>
        </div>
      </div>

      {/* The desktop loading screen. Above the navbar (z-50), navy like the
          hero's own first frame, so lifting it reads as the hero arriving
          rather than as a page swap. The bar scales on the compositor
          (transform, never width). Indeterminate (pulsing) until the first
          byte count arrives, or for good if the server sends no length. */}
      {!loaderGone && (
        <div
          role="status"
          aria-live="polite"
          aria-hidden={!loaderUp}
          className={`hero-loader fixed inset-0 z-[70] hidden md:flex flex-col items-center justify-center bg-navy transition-opacity ease-out ${
            loaderUp ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ transitionDuration: `${LOADER_FADE_MS}ms` }}
        >
          <svg width="16" height="24" viewBox="0 0 13 20" fill="none" className="text-gold" aria-hidden="true">
            <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span className="mt-4 font-display text-sm uppercase tracking-[0.55em] text-gold-light ta:text-[1.15rem] ta:tracking-widest ta:normal-case">
            {t.hero.kicker}
          </span>
          <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
            <div
              className={`h-full w-full origin-left bg-gold transition-transform duration-300 ease-out ${
                progress === 0 ? "animate-pulse" : ""
              }`}
              style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }}
            />
          </div>
          <span className="sr-only">{t.hero.loading}</span>
        </div>
      )}
    </section>
  );
}
