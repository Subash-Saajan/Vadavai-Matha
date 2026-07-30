"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";
import { useReveal } from "./useReveal";

/**
 * VII — history, deliberately last of the numbered sections: the two
 * churches this one replaced, as three beats down a gold hairline. Backstory
 * lands better once a visitor is already hooked by towers, bells, light and
 * meaning than it does as a gate up front.
 */
export function ThreeChurches() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream-dark parchment-swell overflow-hidden"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        VII
      </span>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <p className="reveal-item kicker mb-6">{a.churchesLabel}</p>
          {/* See the heading note in Towers.tsx. */}
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-6xl lg:text-7xl text-navy leading-[1.04]">
            {a.churchesTitle}
          </h2>
          <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed mt-6">
            {a.churchesBody}
          </p>

          <ol className="mt-10 md:mt-12 border-l border-gold/30">
            {a.churches.map((c, i) => (
              <li key={i} className="reveal-item relative pl-8 pb-10 last:pb-0">
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-cream-dark" />
                <p className="font-display text-sm tracking-[0.28em] text-gradient-gold-deep tabular-nums">
                  {c.year}
                </p>
                <h3 className="mt-2 font-serif text-2xl md:text-3xl text-navy">
                  {c.title}
                </h3>
                <p className="mt-2 text-text-muted leading-relaxed">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Archival photograph */}
        <figure className="lg:col-span-5 order-1 lg:order-2 reveal-item">
          <div className="relative w-full aspect-4/5 max-w-md mx-auto">
            <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25">
              <Image
                src="/images/architecture/archival.jpg"
                alt={a.churchesCaption}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
              <PhotoOrnaments />
            </div>
          </div>
          {/* Same 9.9px caption correction as Towers — the note there. */}
          <figcaption className="mt-4 text-center font-display text-[0.7rem] tracking-[0.15em] md:text-[0.62rem] md:tracking-[0.24em] uppercase text-text-muted">
            {a.churchesCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
