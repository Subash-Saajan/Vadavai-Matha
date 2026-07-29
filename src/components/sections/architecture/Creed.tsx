"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";
import { PlanDrawing, type PlanRegion } from "./PlanDrawing";
import { AltarPhoto, type AltarSpot } from "./AltarPhoto";

/**
 * V — the climax: the building read as a creed, held for the peak of the
 * page on purpose, after the visitor has already seen the towers, heard the
 * bells, watched the light and looked up at the vault. The reading runs to
 * NINE numbers — five live in the measured floor plan (five doors, twelve
 * piers, three ways in, the fourteen of the centre path, one altar) and four
 * more wait at the altar (five upper arches, nine flower-carvings, four lower
 * arches, the Trinity at the centre). Tapping (or hovering) one of the first
 * five lifts that region of the plan and dims the rest.
 *
 * ONE drawing only. A second SVG — a symbolic elevation of the altarpiece —
 * used to sit below the parish sheet, carrying the last numbers as its own
 * interactive diagram; it was cut in July 2026 because it invented what it
 * could not measure. AltarpieceDrawing.tsx stays in the repo, simply no longer
 * imported (as PeelFilm does on this page). Its readings did not go with it:
 * they now sit beside a PHOTOGRAPH of the reredos, and two of the four are
 * mapped onto the thing itself. Why only two — AltarPhoto.tsx.
 *
 * The source of the reading is a single handwritten parish sheet, photographed
 * in July 2026, shown between the plan and that list. What it is — how the
 * parish reads its church, NOT documented intent of the builders of 1855 — is
 * now stated plainly in creedBody itself, not as a trailing footnote. Keep that
 * fact somewhere in the visible copy; do not let it quietly disappear.
 */
/**
 * Which altar readings can be pointed at on the photograph. `flowers` and
 * `lowerArches` are deliberately absent — the nine bouquet-carvings cannot be
 * counted at this resolution and the reredos' base row cannot be resolved at
 * all, so they get no hotspot rather than a guessed one. KB 02 §4.7c has both
 * on its on-site camera list; add them here once someone has counted them.
 */
const ALTAR_SPOT: Partial<Record<string, AltarSpot>> = {
  upperArches: "arches",
  trinity: "trinity",
};

export function Creed() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  // Locked selection (click) and hover preview; the preview wins for display.
  // The plan and the altar photograph each own their own pair of the same
  // little state machine.
  const [active, setActive] = useState<PlanRegion | null>(null);
  const [hover, setHover] = useState<PlanRegion | null>(null);
  const shown = hover ?? active;
  const toggle = (r: PlanRegion) => setActive((prev) => (prev === r ? null : r));

  const [active2, setActive2] = useState<AltarSpot | null>(null);
  const [hover2, setHover2] = useState<AltarSpot | null>(null);
  const shown2 = hover2 ?? active2;
  const toggle2 = (s: AltarSpot) => setActive2((prev) => (prev === s ? null : s));

  return (
    <section
      ref={ref}
      className="relative section-padding cathedral-depth overflow-hidden"
    >
      <div className="light-shaft absolute -top-10 left-[6%] w-[42%] h-[120%] -rotate-12" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.07] select-none">
        V
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="reveal-item kicker text-gold! mb-6">{a.creedLabel}</p>
          <h2 className="reveal-item font-display uppercase tracking-[0.03em] text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            {a.creedTitle}
          </h2>
          <p className="reveal-item text-white/70 text-lg leading-relaxed mt-7">
            {a.creedBody}
          </p>
        </div>

        {/* The interactive plan and its four readings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-16">
          {/* The drawing */}
          <div className="lg:col-span-7 reveal-item">
            <div className="rounded-[1.75rem] ring-1 ring-gold/15 bg-night-deep/40 p-5 md:p-8">
              <PlanDrawing
                title={a.planDrawTitle}
                active={shown}
                onSelect={toggle}
              />
            </div>
            <p className="mt-5 text-center font-display text-[0.6rem] uppercase tracking-[0.22em] text-white/35">
              {a.planNote}
            </p>
          </div>

          {/* The readings that live in the plan */}
          <div className="lg:col-span-5">
            <h3 className="reveal-item font-serif text-2xl md:text-3xl italic text-gradient-gold">
              {a.creedReadTitle}
            </h3>
            <p className="reveal-item mt-2 font-display text-[0.6rem] uppercase tracking-[0.24em] text-gold/60">
              {a.creedReadHint}
            </p>

            <ul className="mt-7 space-y-3">
              {a.creedReadings.map((r) => {
                const on = active === r.anchor;
                return (
                  <li key={`${r.n}-${r.anchor}`} className="reveal-item">
                    <button
                      type="button"
                      onClick={() => toggle(r.anchor)}
                      onMouseEnter={() => setHover(r.anchor)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(r.anchor)}
                      onBlur={() => setHover(null)}
                      aria-pressed={on}
                      className={`group w-full text-left flex items-center gap-5 rounded-2xl border p-4 transition-all duration-300 ${
                        on
                          ? "border-gold/60 bg-gold/10"
                          : "border-white/10 hover:border-gold/30 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-14 h-14 rounded-full grid place-items-center font-display text-2xl tabular-nums transition-colors duration-300 ${
                          on
                            ? "bg-gold text-navy"
                            : "border border-gold/40 text-gold group-hover:border-gold/70"
                        }`}
                      >
                        {r.n}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-xl md:text-2xl text-white leading-snug">
                          {r.means}
                        </span>
                        <span className="block mt-0.5 text-sm text-white/55 leading-relaxed">
                          {r.what}
                        </span>
                        {/* The gloss. Serif italic so two small greys in a row
                            don't blur into one another. */}
                        <span className="block mt-2 font-serif italic text-sm text-white/45 leading-relaxed">
                          {r.note}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* The motto set at the altar (KB Mismatch J9 — never say "cut into the foundation stone": the stone itself has never been inspected) */}
            <figure className="reveal-item mt-12 pt-10 border-t border-white/10 text-center">
              <blockquote className="font-display text-gold text-base md:text-lg leading-[1.9] tracking-[0.12em] whitespace-pre-line">
                {a.motto}
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-serif italic text-white/75 leading-relaxed">
                  {a.mottoTr}
                </p>
                <p className="mt-4 font-display text-[0.58rem] uppercase tracking-[0.26em] text-white/40">
                  {a.mottoCaption}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* The parish's own hand — the sheet both readings come from */}
        <figure className="reveal-item mt-24 max-w-sm mx-auto text-center">
          <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden ring-1 ring-gold/20 shadow-2xl">
            <Image
              src="/images/architecture/creed-note.jpg"
              alt={a.creedNoteCaption}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 70vw, 24rem"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/55 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/25" />
          </div>
          <figcaption className="mt-5">
            <p className="font-serif italic text-white/70 leading-relaxed">
              {a.creedNoteCaption}
            </p>
          </figcaption>
        </figure>

        {/* The readings that wait at the altar, read against a photograph of
            the reredos rather than a drawing of it. Only two of the four are
            mapped — the other two have never been counted on site, so they are
            rendered as plain, unclickable text, with no affordance promising a
            highlight that cannot come. AltarPhoto.tsx has the reasoning. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-20">
          <div className="lg:col-span-7 reveal-item">
            <AltarPhoto alt={a.altarPhotoAlt} active={shown2} onSelect={toggle2} />
            <p className="mt-5 text-center font-display text-[0.6rem] uppercase tracking-[0.22em] text-white/35">
              {a.altarPhotoNote}
            </p>
          </div>

          <div className="lg:col-span-5">
            <h3 className="reveal-item font-serif text-2xl md:text-3xl italic text-gradient-gold">
              {a.creedAltarTitle}
            </h3>
            <p className="reveal-item mt-2 font-display text-[0.6rem] uppercase tracking-[0.24em] text-gold/60">
              {a.creedAltarHint}
            </p>

            <ul className="mt-7 space-y-3">
              {a.creed.map((c) => {
                const spot = ALTAR_SPOT[c.anchor];
                const on = spot !== undefined && active2 === spot;
                const body = (
                  <>
                    <span
                      className={`shrink-0 w-14 h-14 rounded-full grid place-items-center font-display text-2xl tabular-nums transition-colors duration-300 ${
                        on
                          ? "bg-gold text-navy"
                          : "border border-gold/40 text-gold group-hover:border-gold/70"
                      }`}
                    >
                      {c.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-xl md:text-2xl text-white leading-snug">
                        {c.means}
                      </span>
                      <span className="block mt-0.5 text-sm text-white/55 leading-relaxed">
                        {c.what}
                      </span>
                      <span className="block mt-2 font-serif italic text-sm text-white/45 leading-relaxed">
                        {c.note}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={`${c.n}-${c.anchor}`} className="reveal-item">
                    {spot ? (
                      <button
                        type="button"
                        onClick={() => toggle2(spot)}
                        onMouseEnter={() => setHover2(spot)}
                        onMouseLeave={() => setHover2(null)}
                        onFocus={() => setHover2(spot)}
                        onBlur={() => setHover2(null)}
                        aria-pressed={on}
                        className={`group w-full text-left flex items-center gap-5 rounded-2xl border p-4 transition-all duration-300 ${
                          on
                            ? "border-gold/60 bg-gold/10"
                            : "border-white/10 hover:border-gold/30 hover:bg-white/3"
                        }`}
                      >
                        {body}
                      </button>
                    ) : (
                      <div className="w-full flex items-center gap-5 rounded-2xl border border-white/10 p-4">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="reveal-item mt-6 text-sm text-white/40 leading-relaxed">
              {a.creedAltarUncounted}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
