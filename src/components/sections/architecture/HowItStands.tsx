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
            {/* Same 9.9px caption correction as Towers — the note there. */}
            <figcaption className="mt-4 text-center font-display text-[0.7rem] tracking-[0.15em] md:text-[0.62rem] md:tracking-[0.24em] uppercase text-text-muted">
              {a.craftCaption}
            </figcaption>
          </figure>

          {/* The argument */}
          <div className="lg:col-span-7">
            <p className="reveal-item kicker mb-6">{a.craftLabel}</p>
            {/* See the heading note in Towers.tsx. */}
            <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-6xl lg:text-7xl text-navy leading-[1.04]">
              {a.craftTitle}
            </h2>
            <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed mt-6">
              {a.craftBody}
            </p>

            {/* ── THE THREE NEGATIVES STACK BELOW `sm`, AND THAT WAS A REAL
                DEFECT. Three columns of a 342px screen with a 24px gutter is
                about 98px each. "NO CEMENT" — Cinzel caps at 16px with 0.12em
                tracking — needs 106px, so every one of the three broke across
                two lines, and the gloss beneath it ("no beam, no pillar, no
                centring") came out at eleven characters a line, five lines
                deep. In Tamil, where the words are longer still, it was worse.
                Stacked, each negative is one short line and one short gloss,
                which is what these three are. Three across from `sm` up, where
                the column is wide enough to hold them, exactly as before. */}
            <dl className="reveal-item mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 pt-7 border-t border-gold/25">
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
        <div className="mt-14 md:mt-24">
          <h3 className="reveal-item text-center font-serif text-2xl md:text-3xl italic text-gradient-gold-deep">
            {a.recipeTitle}
          </h3>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {a.recipe.map((r, i) => (
              <div
                key={i}
                className="reveal-item group relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 md:p-7 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ring-1 ring-gold/10"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-br from-gold/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <p className="relative font-tamil text-3xl text-navy leading-snug">
                  {r.ta}
                </p>
                {/* The romanisation is the bridge for a reader who cannot read
                    the Tamil above it, so it cannot be the 9.9px line on the
                    card. Same correction as the captions — see Towers.tsx. */}
                <p className="relative mt-2 font-display text-[0.7rem] tracking-[0.16em] md:text-[0.62rem] md:tracking-[0.26em] uppercase text-gold-dark">
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
