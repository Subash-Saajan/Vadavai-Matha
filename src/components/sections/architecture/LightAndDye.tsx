"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";

const TILES = [
  { src: "/images/architecture/glass-1.jpg", span: "col-span-2 row-span-2", drift: -22 },
  { src: "/images/architecture/glass-2.jpg", span: "col-span-1 row-span-1", drift: -10 },
  { src: "/images/architecture/glass-3.jpg", span: "col-span-1 row-span-1", drift: -34 },
  { src: "/images/architecture/glass-4.jpg", span: "col-span-2 row-span-1", drift: -16 },
];

/** VII — the glass, the plant dyes, and the gold that has never been allowed to fade. */
export function LightAndDye() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const tiles = gridRef.current?.children;
      if (!tiles) return;

      Array.from(tiles).forEach((el, i) => {
        gsap.to(el, {
          yPercent: TILES[i]?.drift ?? -20,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream-dark parchment-swell overflow-hidden"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        VI
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="reveal-item kicker mb-6">{a.lightLabel}</p>
          <h2 className="reveal-item font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.06]">
            {a.lightTitle}
          </h2>
          <p className="reveal-item text-text-muted text-lg leading-relaxed mt-6">
            {a.lightBody}
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-item mt-16 grid grid-cols-3 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[210px] gap-4 md:gap-6"
        >
          {TILES.map((tile, i) => (
            <figure
              key={i}
              className={`relative ${tile.span} rounded-2xl overflow-hidden group will-change-transform ring-1 ring-gold/15 shadow-lg`}
            >
              <Image
                src={tile.src}
                alt={a.glassCaptions[i]}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-linear-to-t from-navy/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-display text-[0.58rem] md:text-[0.62rem] uppercase tracking-[0.2em] text-white/90">
                  {a.glassCaptions[i]}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
