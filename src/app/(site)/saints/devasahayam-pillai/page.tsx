"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { images } from "@/lib/images";

export default function DevasahayamPage() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const s = t.saintDevasahayam;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = bodyRef.current?.querySelectorAll(".reveal-item");
      items?.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, bodyRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <>
      <PageHero
        label={s.label}
        title={s.name}
        intro={s.intro}
        image={images.cross}
      />

      <section ref={bodyRef} className="section-padding bg-cream relative overflow-hidden">
        {/* Soft ambient gold glows */}
        <div className="pointer-events-none absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-gold/8 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6">
          {/* Meta row */}
          <div className="reveal-item flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
              {s.feast}
            </span>
            <span className="hidden sm:block w-px h-4 bg-gold/30" />
            <span className="text-xs uppercase tracking-[0.3em] text-text-muted">
              {s.canonised}
            </span>
          </div>

          {/* Opening pull-quote */}
          <blockquote className="reveal-item text-center mb-20">
            <p className="font-serif text-2xl md:text-3xl text-navy italic leading-snug">
              “{s.quote}”
            </p>
            <div className="w-12 h-px bg-gold/40 mx-auto mt-6" />
          </blockquote>

          {/* Story sections */}
          <div className="space-y-14">
            {s.sections.map((sec, i) => (
              <div key={i} className="reveal-item">
                <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                  {sec.heading}
                </h2>
                <p className="text-text-muted text-lg leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Relics highlight */}
          <div className="reveal-item mt-20 relative rounded-3xl overflow-hidden bg-navy ring-1 ring-gold/20 shadow-xl p-10 md:p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.22),transparent_65%)]" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.35em] text-gold/80 mb-4">
                {s.relicsHeading}
              </p>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
                {s.relicsBody}
              </p>
            </div>
          </div>

          {/* Back link */}
          <div className="reveal-item mt-16 text-center">
            <Link
              href="/#saints"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-gold hover:text-navy transition-colors duration-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {s.back}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
