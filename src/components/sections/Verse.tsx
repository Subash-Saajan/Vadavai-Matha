"use client";

import { useRef, useEffect } from "react";
import { ResidentImage } from "@/components/ResidentImage";
import { gsap, DESKTOP } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";

export function Verse() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Desktop only: the layered parallax ─────────────────────────────
         Backdrop translating and scaling, text counter-translating, both
         scrubbed — three of the page's transforms in one section, over a
         full-bleed photograph. The word-by-word illumination below stays on
         every device: it is what this section IS, and it animates opacity on
         short spans of text rather than resampling an image. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -8, scale: 1.18 },
          {
            yPercent: 12,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        gsap.to(contentRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // Word-by-word illumination
      const words = wordsRef.current?.querySelectorAll("span.w");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.12, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wordsRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  const verseWords = t.home.verse.split(" ");

  return (
    <section
      ref={sectionRef}
      /* `svh`, not `vh` — the SMALL viewport. Unlike the hero this section is
         not sticky and its picture is `inset-0`, so being a little shorter
         than the screen costs nothing and guarantees the verse is never
         partly behind a phone's address bar. On desktop the two are equal. */
      className="relative h-[92svh] flex items-center justify-center overflow-hidden bg-navy"
    >
      <div ref={imgRef} className="absolute inset-0 md:will-change-transform">
        <ResidentImage
          src="/church-interior.jpeg"
          alt=""
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        {/* Soft navy wash — lighter, no red, still holds the verse text */}
        <div className="absolute inset-0 bg-linear-to-b from-navy/70 via-navy/25 to-navy/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(10,19,34,0.42)_92%)]" />
      </div>

      {/* Faint engraved cross watermark */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/5 w-[70vh] h-[70vh] pointer-events-none"
        viewBox="0 0 100 140"
        fill="none"
        aria-hidden="true"
      >
        <path d="M50 4v132M14 40h72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center md:will-change-transform">
        <p className="kicker justify-center mb-9 text-gold/90!">{t.home.verseLabel}</p>
        {/* Fluid rather than a flat `text-3xl`: this is the one block on the
            page with nothing else beside it, so it can take a larger share of
            a phone screen than a heading with body copy under it — and it must
            still not collide with the gutters on a 320px device. */}
        <p
          ref={wordsRef}
          className={`font-serif text-[clamp(1.7rem,8vw,2.1rem)] md:text-5xl lg:text-6xl text-white/95 leading-tight ${
            lang === "ta" ? "leading-normal" : ""
          }`}
        >
          {verseWords.map((w, i) => (
            <span key={i} className="w inline-block mr-[0.25em]">
              {w}
            </span>
          ))}
        </p>
        <div className="cross-rule w-40 mx-auto mt-10">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
        <p className="mt-6 font-display text-sm tracking-[0.32em] uppercase text-gold/75">
          {t.home.verseRef}
        </p>
      </div>
    </section>
  );
}
