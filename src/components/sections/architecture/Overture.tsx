"use client";

import { useRef } from "react";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";

/**
 * The un-numbered opener: the thesis in three sentences, then the whole fabric
 * reduced to six numerals. The numerals are the page's promise — everything
 * below is one of them, explained.
 */
export function Overture() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream parchment-sheen overflow-hidden"
    >
      <div className="light-shaft absolute -top-24 -left-10 w-[50%] h-[130%] rotate-6" />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="reveal-item kicker justify-center mb-8">{a.overtureLabel}</p>

        <p className="reveal-item font-serif text-2xl md:text-3xl text-navy leading-snug">
          {a.overtureLead}
        </p>

        <div className="reveal-item space-y-5 mt-10 text-left md:text-center">
          <p className="text-text-muted text-lg leading-relaxed">{a.overtureP1}</p>
          <p className="text-text-muted text-lg leading-relaxed">{a.overtureP2}</p>
        </div>

        <div className="cross-rule mt-12 max-w-xs mx-auto">
          <span className="text-gold text-lg">✦</span>
        </div>
      </div>

      {/* The fabric in six numerals. */}
      <div className="relative max-w-6xl mx-auto mt-16 md:mt-20">
        <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6">
          {a.numbers.map((n, i) => (
            <div
              key={i}
              className="reveal-item relative text-center px-2 lg:border-r border-gold/20 last:border-r-0"
            >
              <dt className="font-display text-5xl md:text-6xl tabular-nums text-gradient-gold-deep leading-none">
                {n.v}
              </dt>
              <dd className="mt-3 font-display text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">
                {n.k}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
