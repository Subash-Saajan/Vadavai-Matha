"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";
import { useReveal } from "./useReveal";

/**
 * II — looking up once inside, right after the towers: how a roof with no
 * iron in it stays up. Sits here (not after Bells/Light) so it follows
 * directly from Overture's architect/engineer paragraph while that's still
 * fresh. The three negatives (no cement, no iron, no timber) and then the
 * four things that ARE in the mortar, set as plaques in the MassTimes idiom.
 */
export function HowItStands() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream parchment-sheen overflow-hidden"
    >
      <div className="light-shaft absolute -top-24 -right-10 w-[46%] h-[130%] -rotate-6" />
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        II
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* The vault */}
          <figure className="lg:col-span-5 reveal-item">
            <div className="relative w-full aspect-4/5 max-w-md mx-auto">
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25">
                <Image
                  src="/images/architecture/vault.jpg"
                  alt={a.craftCaption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
                <PhotoOrnaments />
              </div>
            </div>
            <figcaption className="mt-4 text-center font-display text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">
              {a.craftCaption}
            </figcaption>
          </figure>

          {/* The argument */}
          <div className="lg:col-span-7">
            <p className="reveal-item kicker mb-6">{a.craftLabel}</p>
            <h2 className="reveal-item font-serif text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.04]">
              {a.craftTitle}
            </h2>
            <p className="reveal-item text-text-muted text-lg leading-relaxed mt-6">
              {a.craftBody}
            </p>

            <dl className="reveal-item mt-10 grid grid-cols-3 gap-6 pt-7 border-t border-gold/25">
              {a.craftNegatives.map((n, i) => (
                <div key={i}>
                  <dt className="font-display text-base md:text-lg uppercase tracking-[0.12em] text-gradient-gold-deep">
                    {n.t}
                  </dt>
                  <dd className="mt-1.5 text-sm text-text-muted leading-relaxed">
                    {n.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* What the mortar was made of */}
        <div className="mt-20 md:mt-24">
          <h3 className="reveal-item text-center font-serif text-2xl md:text-3xl italic text-gradient-gold-deep">
            {a.recipeTitle}
          </h3>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {a.recipe.map((r, i) => (
              <div
                key={i}
                className="reveal-item group relative bg-white/90 backdrop-blur-sm rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ring-1 ring-gold/10"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-br from-gold/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <p className="relative font-tamil text-3xl text-navy leading-snug">
                  {r.ta}
                </p>
                <p className="relative mt-2 font-display text-[0.62rem] uppercase tracking-[0.26em] text-gold-dark">
                  {r.tr}
                </p>
                <p className="relative mt-4 font-serif text-xl text-navy/90">{r.gloss}</p>
                <p className="relative mt-1.5 text-sm text-text-muted leading-relaxed">
                  {r.d}
                </p>
              </div>
            ))}
          </div>

          <p className="reveal-item mt-10 max-w-3xl mx-auto text-center text-sm text-text-muted/90 leading-relaxed">
            {a.recipeNote}
          </p>
        </div>
      </div>
    </section>
  );
}
