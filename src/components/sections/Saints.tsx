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
        // Subtle interleaved parallax — even cards drift less, odd cards drift more
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

        // Entrance
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
      className="section-padding bg-cream relative overflow-hidden scroll-mt-24"
    >
      {/* Soft ambient gold glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full bg-gold/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/8 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20">
          <p className="reveal-item text-xs uppercase tracking-[0.4em] text-gold font-medium mb-4">
            {t.saints.label}
          </p>
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
                {/* Layered backdrop: deep navy with gold radial bloom */}
                <div className="absolute inset-0 bg-linear-to-b from-navy via-navy to-[#06101e]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(201,168,76,0.28),transparent_60%)]" />

                {/* Iconographic flourish */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 text-gold/70 transition-transform duration-700 group-hover:scale-110">
                  <svg width="28" height="36" viewBox="0 0 28 36" fill="none" aria-hidden="true">
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
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-3">
                    {s.feast}
                  </p>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-2 transition-colors duration-500 group-hover:text-gold">
                    {s.name}
                  </h3>
                  <p className="text-xs italic text-gold/70 mb-4">
                    {s.epithet}
                  </p>
                  <div className="w-12 h-px bg-gold/40 mx-auto mb-4" />
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-4">
                    {s.body}
                  </p>
                  {href && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-gold/0 group-hover:text-gold/90 transition-colors duration-500">
                      Read his story
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Hover gold edge */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
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
