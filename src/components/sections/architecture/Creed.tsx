"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";
import { PlanDrawing, type PlanRegion } from "./PlanDrawing";
import { AltarpieceDrawing, type AltarRegion } from "./AltarpieceDrawing";

/**
 * II — the centrepiece: the building read as a creed.
 *
 * The measured floor plan sits beside the parish's own numeric reading of the
 * church. Four of those readings live in the plan itself — the five doors, the
 * twelve piers, the three ways in, the one altar — and tapping (or hovering) a
 * reading lifts that region of the drawing and dims the rest. The rest of the
 * reading waits at the altar, shown against the handwritten sheet it comes from.
 *
 * The source of the reading is a single handwritten parish sheet, photographed in
 * July 2026. The footnote says plainly what it is — how the parish reads its
 * church, NOT documented intent of the builders of 1855. Do not let that caveat
 * be edited out.
 */
export function Creed() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  // Locked selection (click) and hover preview; the preview wins for display.
  // The plan (doors/piers/arrows/altar) and the altarpiece (steps/upper/flowers/
  // lower/trinity) each own their own pair of the same little state machine.
  const [active, setActive] = useState<PlanRegion | null>(null);
  const [hover, setHover] = useState<PlanRegion | null>(null);
  const shown = hover ?? active;
  const toggle = (r: PlanRegion) => setActive((prev) => (prev === r ? null : r));

  const [active2, setActive2] = useState<AltarRegion | null>(null);
  const [hover2, setHover2] = useState<AltarRegion | null>(null);
  const shown2 = hover2 ?? active2;
  const toggle2 = (r: AltarRegion) => setActive2((prev) => (prev === r ? null : r));

  return (
    <section
      ref={ref}
      className="relative section-padding cathedral-depth overflow-hidden"
    >
      <div className="light-shaft absolute -top-10 left-[6%] w-[42%] h-[120%] -rotate-12" />
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.07] select-none">
        II
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
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* The motto cut into the foundation stone */}
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

        {/* The parish's own hand — the sheet, and the numbers that wait at the altar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 mt-24 items-start">
          {/* The sheet itself */}
          <figure className="lg:col-span-5 reveal-item lg:sticky lg:top-28">
            <div className="relative w-full aspect-4/5 max-w-sm mx-auto rounded-2xl overflow-hidden ring-1 ring-gold/20 shadow-2xl">
              <Image
                src="/images/architecture/creed-note.jpg"
                alt={a.creedNoteCaption}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 70vw, 32vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/25" />
            </div>
            <figcaption className="mt-5 max-w-sm mx-auto">
              <p className="font-serif italic text-white/70 leading-relaxed">
                {a.creedNoteCaption}
              </p>
            </figcaption>
          </figure>

          {/* What waits at the altar */}
          <div className="lg:col-span-7">
            <h3 className="reveal-item font-serif text-2xl md:text-3xl italic text-gradient-gold">
              {a.creedAltarTitle}
            </h3>
            <dl className="mt-6">
              {a.creed.map((c, i) => (
                <div
                  key={i}
                  className="reveal-item grid grid-cols-[4.5rem_1fr] md:grid-cols-[6rem_1fr] gap-5 md:gap-8 items-baseline py-6 border-t border-white/10 first:border-t-0"
                >
                  <dt className="font-display text-5xl md:text-6xl tabular-nums text-gradient-gold leading-none text-right">
                    {c.n}
                  </dt>
                  <dd>
                    <p className="text-white/55 leading-relaxed">{c.what}</p>
                    <p className="mt-1 font-serif text-xl md:text-2xl text-white/95 leading-snug">
                      {c.means}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="reveal-item mt-10 pt-6 border-t border-white/10 text-xs text-white/40 leading-relaxed max-w-2xl">
              {a.creedFootnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
