"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";
import { useReveal } from "./useReveal";

/** VI — the towers, the bells inside them, and the name the village got for them. */
export function Towers() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream parchment-sheen overflow-hidden"
    >
      <div className="light-shaft absolute -top-24 -left-10 w-[48%] h-[130%] rotate-6" />
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        IV
      </span>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div className="lg:col-span-7">
          <p className="reveal-item kicker mb-6">{a.towersLabel}</p>
          <h2 className="reveal-item font-serif text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.04]">
            {a.towersTitle}
          </h2>
          <p className="reveal-item text-text-muted text-lg leading-relaxed mt-6">
            {a.towersBody}
          </p>

          <dl className="mt-10 space-y-6">
            {a.towerStats.map((s, i) => (
              <div
                key={i}
                className="reveal-item flex items-baseline gap-6 pl-6 border-l-2 border-gold/40"
              >
                <dt className="font-display text-2xl md:text-3xl tabular-nums text-gradient-gold-deep shrink-0 min-w-28">
                  {s.v}
                </dt>
                <dd className="text-text-muted leading-relaxed">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The towers */}
        <figure className="lg:col-span-5 reveal-item">
          <div className="relative w-full aspect-4/5 max-w-md mx-auto">
            <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25">
              <Image
                src="/images/architecture/towers.jpg"
                alt={a.towersCaption}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
              <PhotoOrnaments />
            </div>
          </div>
          <figcaption className="mt-4 text-center font-display text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">
            {a.towersCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
