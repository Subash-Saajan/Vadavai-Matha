"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setVideoReady(true);
    };

    // Ensure video is ready for frame scrubbing
    video.addEventListener("loadedmetadata", onLoaded);
    // If already loaded
    if (video.readyState >= 1) onLoaded();

    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  useEffect(() => {
    if (!videoReady) return;

    const video = videoRef.current;
    if (!video || !video.duration) return;

    const ctx = gsap.context(() => {
      // ── Entrance animation ──
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          subRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.3"
        );

      // ── Scroll-driven video scrub ──
      // This is the core Apple-style effect:
      // Scroll position maps directly to video.currentTime
      const videoScrub = { time: 0 };

      gsap.to(videoScrub, {
        time: video.duration,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Smooth 0.5s lag for buttery feel
          pin: false,
        },
        onUpdate: () => {
          if (video.readyState >= 2) {
            video.currentTime = videoScrub.time;
          }
        },
      });

      // ── Text fade out on scroll ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "30% top",
        scrub: 1,
        animation: gsap
          .timeline()
          .to(headingRef.current, { y: -120, opacity: 0, ease: "none" })
          .to(subRef.current, { y: -80, opacity: 0, ease: "none" }, 0)
          .to(scrollRef.current, { opacity: 0, ease: "none" }, 0),
      });

      // ── Overlay darkens as you scroll deeper ──
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.3 },
        {
          opacity: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "50% top",
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
      className="relative bg-navy"
      style={{ height: "300vh" }} /* 3x viewport = scroll runway for the video */
    >
      {/* Sticky video container — stays pinned while you scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy/60 pointer-events-none"
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          {/* Cross ornament */}
          <div className="mb-6 animate-float">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="text-gold"
            >
              <path
                d="M14 2h4v12h12v4H18v12h-4V18H2v-4h12V2z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.9]"
          >
            <span className="block">Vadakancherry</span>
            <span className="block mt-2 text-gradient-gold">Matha Church</span>
          </h1>

          <p
            ref={subRef}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-xl font-light tracking-wide"
          >
            A sacred sanctuary of faith, prayer, and community
          </p>

          {/* Scroll indicator */}
          <div
            ref={scrollRef}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              Scroll to explore
            </span>
            <ChevronDown className="w-5 h-5 text-gold animate-scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
