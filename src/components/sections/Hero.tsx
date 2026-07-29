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
      className="relative bg-navy"
      style={{ height: "300vh" }} /* scroll runway for the video scrub */
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* First frame as instant poster under whichever scrub medium mounts —
            also the mobile LCP, since phones never load the video itself. */}
        <Image
          src="/hero-frames/poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
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
        {mode === "canvas" && (
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
            <span className="font-display text-[0.72rem] md:text-sm tracking-[0.55em] uppercase text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
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
            <span aria-hidden="true" className="block">
              <span className="block overflow-hidden">
                <span className="title-line block text-5xl md:text-7xl lg:text-[7.5rem]">
                  Our Lady
                </span>
              </span>
              <span className="block overflow-hidden mt-1 md:mt-2">
                <span className="title-line block text-[2.75rem] md:text-6xl lg:text-[6rem] text-gradient-gold">
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
            <p className="text-base md:text-lg text-white/75 font-serif italic tracking-wide leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              A sacred sanctuary of faith, prayer &amp; community
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            ref={scrollRef}
            className="absolute bottom-10 flex flex-col items-center gap-2"
          >
            <span className="font-display text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
              Scroll to enter
            </span>
            <ChevronDown className="w-5 h-5 text-gold animate-scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
