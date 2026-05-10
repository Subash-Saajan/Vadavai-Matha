"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { images } from "@/lib/images";
import { useLang } from "@/components/layout/LanguageProvider";

export function Verse() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image slow parallax
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Word-by-word reveal
      const words = wordsRef.current?.querySelectorAll("span.w");
      if (words) {
        gsap.fromTo(
          words,
          { opacity: 0.15, y: 8 },
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
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  const verseWords = t.home.verse.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-navy"
    >
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <Image
          src={images.candleLight}
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/40 to-navy/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold mb-8 ornament-divider">
          {t.home.verseLabel}
        </p>
        <p
          ref={wordsRef}
          className={`font-serif text-3xl md:text-5xl lg:text-6xl text-white/95 leading-[1.2] ${
            lang === "ta" ? "leading-[1.5]" : ""
          }`}
        >
          {verseWords.map((w, i) => (
            <span key={i} className="w inline-block mr-[0.25em]">
              {w}
            </span>
          ))}
        </p>
        <p className="mt-10 text-sm tracking-[0.3em] uppercase text-gold/70">
          — {t.home.verseRef}
        </p>
      </div>
    </section>
  );
}
