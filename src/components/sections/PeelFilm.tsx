"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrubMedia } from "@/hooks/useScrubMedia";
import { useLang } from "@/components/layout/LanguageProvider";

/**
 * The "peel film" — one continuous AI-generated film of the church peeling
 * open in space and back in time (see PEEL_FILM_STORYBOARD.md), scrubbed by
 * scroll exactly like the home Hero: desktop seeks the video, phones draw
 * the pre-extracted frame sequence onto a canvas (useScrubMedia).
 *
 * Film: /peel-film.mp4 (stitched by scripts/gen-peel-video.mjs --stitch)
 * Frames + poster: /peel-frames/ (scripts/gen-scrub-frames.mjs peel —
 * re-run it whenever the film itself is replaced)
 */
const FRAME_COUNT = 150;
const frameSrc = (i: number) => `/peel-frames/f${String(i + 1).padStart(3, "0")}.webp`;

export function PeelFilm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const { t } = useLang();
  const p = t.architecture.peel;
  const n = p.chapters.length;

  const { mode, mediaReady, frameTargetRef, drawRef } = useScrubMedia({
    videoRef,
    canvasRef,
    frameCount: FRAME_COUNT,
    frameSrc,
  });

  // Chapter captions + hint — driven by section progress, independent of the
  // video, so the storytelling still works if the film fails to load.
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setChapter(Math.min(n - 1, Math.floor(self.progress * n)));
        },
      });

      gsap.to(hintRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "8% top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [n]);

  // Scroll-driven film scrub (the Apple-style core effect).
  useEffect(() => {
    if (!mediaReady || !mode) return;
    const video = videoRef.current;
    if (mode === "video" && (!video || !video.duration)) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // frame 0 / poster stays put

    const ctx = gsap.context(() => {
      if (mode === "video" && video) {
        const scrub = { time: 0 };
        gsap.to(scrub, {
          time: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
          onUpdate: () => {
            if (video.readyState >= 2) video.currentTime = scrub.time;
          },
        });
      } else {
        const scrub = { frame: 0 };
        gsap.to(scrub, {
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
            frameTargetRef.current = scrub.frame;
            drawRef.current?.();
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [mediaReady, mode, frameTargetRef, drawRef]);

  return (
    <section
      ref={sectionRef}
      className="pf-section relative bg-navy"
      style={{ height: `${120 + n * 80}vh` }} /* scroll runway for the film */
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* First frame as instant paint under whichever scrub medium mounts
            (phones never download the film itself). */}
        <Image
          src="/peel-frames/poster.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        {mode === "video" && (
          <video
            ref={videoRef}
            src="/peel-film.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {mode === "canvas" && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        )}

        {/* Legibility washes — same family as the home Hero */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-navy/40 via-transparent to-navy/70" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,19,34,0.45)_100%)]" />

        {/* Section label */}
        <div className="absolute top-8 left-0 right-0 z-10 flex flex-col items-center gap-2 text-center px-6">
          <span className="font-display text-[0.62rem] md:text-xs tracking-[0.5em] uppercase text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {p.label}
          </span>
          <span className="font-serif italic text-white/60 text-sm md:text-base max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {p.title}
          </span>
        </div>

        {/* Chapter captions — stacked, crossfading */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-12 lg:px-16 pb-12 md:pb-16">
          <div className="relative max-w-2xl min-h-[9.5rem] md:min-h-[10.5rem]">
            {p.chapters.map((c, i) => (
              <div
                key={i}
                className="absolute inset-x-0 bottom-0 transition-all duration-700 ease-out"
                style={{
                  opacity: chapter === i ? 1 : 0,
                  transform: chapter === i ? "translateY(0)" : "translateY(14px)",
                  pointerEvents: "none",
                }}
                aria-hidden={chapter !== i}
              >
                <p className="font-display text-[0.62rem] md:text-xs tracking-[0.4em] uppercase text-gold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
                  {c.y}
                </p>
                <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                  {c.t}
                </h3>
                <p className="font-serif text-base md:text-lg text-white/80 leading-relaxed max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chapter rail — right edge */}
        <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col items-center gap-3">
          {p.chapters.map((c, i) => (
            <div key={i} className="flex items-center gap-2 justify-end">
              <span
                className="font-display text-[0.55rem] tracking-[0.2em] uppercase transition-colors duration-500 tabular-nums"
                style={{ color: chapter === i ? "var(--gold-light)" : "rgba(255,255,255,0.28)" }}
              >
                {c.y}
              </span>
              <span
                className="block rounded-full transition-all duration-500"
                style={{
                  width: chapter === i ? 10 : 6,
                  height: chapter === i ? 10 : 6,
                  background: chapter === i ? "var(--gold)" : "rgba(255,255,255,0.3)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        >
          <span className="font-display text-[0.58rem] uppercase tracking-[0.35em] text-white/50">
            {p.hint}
          </span>
          <span className="block w-px h-8 bg-linear-to-b from-gold/80 to-transparent animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}
