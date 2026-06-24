"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";

export function Saints() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerItems = headerRef.current?.querySelectorAll(".reveal-item");
      headerItems?.forEach((el, i) => {
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
            delay: i * 0.1,
          }
        );
      });

      const cards = gridRef.current?.children;
      if (!cards) return;

      Array.from(cards).forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -12 : -22,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });

        gsap.fromTo(
          el,
          { y: 90, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  const list = t.saints.list;

  return (
    <section
      id="saints"
      ref={sectionRef}
      className="section-padding bg-cream parchment-sheen relative overflow-hidden scroll-mt-24"
    >
      <div className="light-shaft absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[90%]" />

      <div className="relative max-w-7xl mx-auto">
        <div ref={headerRef} className="relative text-center max-w-2xl mx-auto mb-20">
          <span className="section-numeral pointer-events-none absolute left-1/2 -translate-x-1/2 -top-24 text-[10rem] opacity-[0.06] select-none">
            III
          </span>
          <p className="reveal-item kicker justify-center mb-5">{t.saints.label}</p>
          <h2 className="reveal-item font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.05] mb-6">
            {t.saints.title}
          </h2>
          <p className="reveal-item text-text-muted text-lg leading-relaxed">
            {t.saints.intro}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {list.map((s, i) => {
            const href = "slug" in s ? `/saints/${s.slug}` : null;
            const cardClass =
              "group relative block aspect-[3/4] rounded-3xl overflow-hidden bg-navy will-change-transform ring-1 ring-gold/15 shadow-xl";

            const inner = (
              <>
                {/* Cathedral-depth backdrop with gold bloom */}
                <div className="absolute inset-0 bg-linear-to-b from-navy via-[#0a1322] to-[#05080f]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(196,160,73,0.30),transparent_62%)]" />

                {/* Iconographic cross flourish */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 text-gold/70 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-0.5">
                  <svg width="26" height="36" viewBox="0 0 28 36" fill="none" aria-hidden="true">
                    <path
                      d="M14 1v34M3 10h22M14 1l-4 4M14 1l4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <circle cx="14" cy="22" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-7 text-center">
                  <p className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-gold/80 mb-3">
                    {s.feast}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-2 transition-colors duration-500 group-hover:text-gold">
                    {s.name}
                  </h3>
                  <p className="text-xs italic text-gold/70 mb-4 font-serif">
                    {s.epithet}
                  </p>
                  <div className="w-12 h-px bg-gold/40 mx-auto mb-4" />
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-4">
                    {s.body}
                  </p>
                  {href && (
                    <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[0.6rem] uppercase tracking-[0.25em] text-gold/0 group-hover:text-gold/90 transition-colors duration-500">
                      Read his story
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Hover gold edge + corner serifs */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
                <span className="pointer-events-none absolute top-3.5 left-3.5 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
                <span className="pointer-events-none absolute bottom-3.5 right-3.5 w-5 h-5 border-b border-r border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
              </>
            );

            return href ? (
              <Link key={i} href={href} className={cardClass} aria-label={s.name}>
                {inner}
              </Link>
            ) : (
              <article key={i} className={cardClass}>
                {inner}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
