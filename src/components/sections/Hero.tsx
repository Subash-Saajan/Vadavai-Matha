"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setVideoReady(true);
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  useEffect(() => {
    if (!videoReady) return;

    const video = videoRef.current;
    if (!video || !video.duration) return;

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

      // ── Scroll-driven video scrub (the Apple-style core effect) ──
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
  }, [videoReady]);

  return (
    <section
      ref={sectionRef}
      data-nav-hero /* Navbar stays transparent while this is behind it */
      className="relative bg-navy"
      style={{ height: "300vh" }} /* scroll runway for the video scrub */
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

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

          {/* Monumental title — line-by-line stone reveal */}
          <h1
            ref={headingRef}
            className="font-display font-semibold text-white uppercase tracking-[0.04em] leading-[0.92]"
          >
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
