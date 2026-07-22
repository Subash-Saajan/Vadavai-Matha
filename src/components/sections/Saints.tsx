"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/components/LocaleLink";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";

export function Saints() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (el: Element, delay = 0) =>
        gsap.fromTo(
          el,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

      headerRef.current
        ?.querySelectorAll(".reveal-item")
        .forEach((el, i) => reveal(el, i * 0.1));

      gridRef.current
        ?.querySelectorAll(".saint-card")
        .forEach((el, i) => reveal(el, i * 0.15));
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

      <div className="relative max-w-4xl mx-auto">
        <div ref={headerRef} className="relative text-center max-w-2xl mx-auto mb-14">
          <span className="section-numeral pointer-events-none absolute left-1/2 -translate-x-1/2 -top-24 text-[10rem] opacity-[0.06] select-none">
            III
          </span>
          <p className="reveal-item kicker justify-center mb-5">{t.saints.label}</p>
          <h2 className="reveal-item font-serif text-4xl md:text-5xl text-navy leading-[1.05] mb-6">
            {t.saints.title}
          </h2>
          <p className="reveal-item text-text-muted text-lg leading-relaxed">
            {t.saints.intro}
          </p>
        </div>

        {/* Two portrait cards — Devasahayam (left) · de Britto (right) */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-8">
          {list.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              aria-label={s.name}
              className="saint-card group relative block aspect-3/4 rounded-3xl overflow-hidden bg-navy ring-1 ring-gold/20 shadow-xl"
            >
              {/* Portrait fills the whole card — the photo holder */}
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Legibility + mood: darken the lower third, warm bloom up top */}
              <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/55 to-navy/5" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(196,160,73,0.18),transparent_60%)]" />

              {/* Feast tag */}
              <p className="absolute top-4 left-1/2 -translate-x-1/2 font-display text-[0.56rem] uppercase tracking-[0.3em] text-gold/90 bg-navy/40 backdrop-blur-sm px-3 py-1 rounded-full ring-1 ring-gold/25 whitespace-nowrap">
                {s.feast}
              </p>

              {/* Overlaid content */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-center">
                <h3 className="text-xl md:text-2xl font-serif text-white leading-tight mb-1.5 transition-colors duration-500 group-hover:text-gold">
                  {s.name}
                </h3>
                <p className="text-xs italic text-gold/75 mb-3 font-serif">{s.epithet}</p>
                <div className="w-10 h-px bg-gold/40 mx-auto mb-3" />
                <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{s.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[0.6rem] uppercase tracking-[0.25em] text-gold/0 group-hover:text-gold/90 transition-colors duration-500">
                  {t.saints.readMore}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Hover gold edge + corner serifs */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
              <span className="pointer-events-none absolute top-3.5 left-3.5 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
              <span className="pointer-events-none absolute bottom-3.5 right-3.5 w-5 h-5 border-b border-r border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
