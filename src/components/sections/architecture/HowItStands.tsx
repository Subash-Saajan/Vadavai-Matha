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
          {/* ── THE VAULT. This frame was served on its side for months: the
              camera original carries EXIF `Orientation = 6` and the web copy
              was cut from it with the tag stripped but never applied, so the
              arches ran across the picture instead of up it. It is rebuilt
              now through scripts/fix-architecture-images.mjs, which bakes the
              rotation into the pixels — go through that script if you ever
              replace it, never a plain resize.

              The photograph itself changed with the fix. The old frame looked
              sideways at the altar screen and showed barely any arcading; this
              one (PIcs/IMG_5390.JPG) looks straight up into the nave vault, at
              the twenty-four arches the section is entirely about. */}
          <figure className="lg:col-span-5 reveal-item">
            {/* ⚠ 28rem, and it was briefly capped to 20rem — do not do that
                again. This is the section's only photograph and it sits beside
                a nine-line paragraph; shrunk to 320px it read as a thumbnail
                with a caption twice its weight, and the owner said so. The
                windows in LightAndDye ARE capped small, but there are four of
                them in a block; one photograph carrying a section is not the
                same problem. */}
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

          {/* ── FOUR INGREDIENTS, TWO ACROSS ON A PHONE. One per row made each
              card a full-width slab about 200px tall, so the four of them ran
              the height of a phone screen and a half — an ingredient list read
              as four landing panels. They are four short entries in one
              recipe and they should be seen together, so they go two across
              from the narrowest screen up and stay four across from `lg`.

              At 2×2 the column is ~150px on a 360px phone, and everything
              inside is sized down a step to hold it: the Tamil headword from
              30px to 20px (`சுண்ணாம்பு` sets to ~120px at 24px, which does not
              fit), the gloss from 20px to 18px, and the padding from 20px to
              16px. */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7">
            {a.recipe.map((r, i) => {
              /* `as string` on both sides deliberately. The dictionary is
                 typed off the English block, so `gloss` narrows to the union
                 of the four English glosses and `ta` to the four Tamil
                 headwords — types that provably never overlap, which is a
                 compile error even though at runtime, under `ta`, they are
                 equal three times out of four. That equality is the whole
                 point of the test. */
              const glossRepeatsHeadword = (r.gloss as string) === (r.ta as string);
              return (
              <div
                key={i}
                className="reveal-item group relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-7 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ring-1 ring-gold/10"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-br from-gold/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <p className="relative font-tamil text-xl sm:text-2xl md:text-3xl text-navy leading-snug">
                  {r.ta}
                </p>
                {/* ── NO ROMANISATION LINE. Each card used to carry the word
                    three times over: பதனீர், then `padaneer`, then "Palm sap".
                    The middle line spelled the first line out in Latin
                    letters and told a reader nothing the third did not, so it
                    is gone at the owner's instruction (July 2026) — the Tamil
                    word, then what it is in English. Do not restore it.

                    The gloss is dropped when it merely repeats the headword,
                    which is what happens on the Tamil site: there `gloss` is
                    itself Tamil, and for three of the four ingredients it is
                    the same word again (சுண்ணாம்பு / சுண்ணாம்பு). Only
                    padaneer glosses to something different there (பனஞ்சாறு),
                    so only padaneer keeps a second line. */}
                {!glossRepeatsHeadword && (
                  <p className="relative mt-3 md:mt-4 font-serif text-lg sm:text-xl text-navy/90">
                    {r.gloss}
                  </p>
                )}
                <p
                  className={`relative text-[0.8rem] sm:text-sm text-text-muted leading-relaxed ${
                    glossRepeatsHeadword ? "mt-3 md:mt-4" : "mt-1.5"
                  }`}
                >
                  {r.d}
                </p>
              </div>
              );
            })}
          </div>

          <p className="reveal-item mt-10 max-w-3xl mx-auto text-center text-sm text-text-muted/90 leading-relaxed">
            {a.recipeNote}
          </p>
        </div>
      </div>
    </section>
  );
}
