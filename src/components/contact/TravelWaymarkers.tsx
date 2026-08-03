"use client";

import { TrainFront, Bus, Plane } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { TRAVEL } from "@/lib/contact";
import { DistanceFromYou } from "./DistanceFromYou";

/**
 * Rail · Road · Air — three refined cards echoing the home page's Mass-times
 * section, so the contact page reads as part of the same site.
 *
 * Distances are road-routed from the church's own coordinate and rounded.
 * Bus route numbers are deliberately absent: the parish has never published
 * them, and a wrong route number strands somebody in a village at dusk.
 */

export function TravelWaymarkers() {
  const { t } = useLang();

  const boards = [
    {
      icon: TrainFront,
      title: t.contact.travel.rail,
      note: t.contact.travel.railNote,
      rows: TRAVEL.rail.map((r) => ({
        name: r.name,
        meta: r.code,
        value: `${r.km} ${t.contact.travel.km}`,
      })),
    },
    {
      icon: Bus,
      title: t.contact.travel.road,
      note: t.contact.travel.roadNote,
      rows: TRAVEL.road.map((r) => ({
        name: r.name,
        meta: `${r.mins} ${t.contact.travel.mins}`,
        value: `${r.km} ${t.contact.travel.km}`,
      })),
    },
    {
      icon: Plane,
      title: t.contact.travel.air,
      note: t.contact.travel.airNote,
      rows: TRAVEL.air.map((r) => ({
        name: r.name,
        meta: r.note,
        value: `${r.km} ${t.contact.travel.km}`,
      })),
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-cream parchment-sheen">
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[11rem] opacity-[0.05] select-none">
        V
      </span>

      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-10 md:mb-14 reveal max-w-2xl mx-auto">
          <p className="kicker justify-center mb-5">{t.contact.travel.heading}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy leading-snug">
            {t.contact.travel.intro}
          </h2>
          <div className="mt-8 flex justify-center">
            <DistanceFromYou />
          </div>
        </header>

        {/* ── ON A PHONE THIS IS ONE PLATE, NOT THREE CARDS ─────────────────
            Rail, road and air are three columns of a single timetable on a
            monitor, and they were three separate raised cards on a phone —
            each with its own rounded shell, its own ring, its own shadow, its
            own 48px navy icon plate and its own 8-pixel gutter to the next
            one. Stacked, that is the same piece of furniture built three
            times: about a screen and a half of chrome wrapped around fifteen
            short lines of distance.

            Below `md` the shell moves OUT to the container — one plate, three
            groups separated by the hairline the `divide-y` already draws for
            free — and each group's heading turns into a row: a small brass
            square with the title beside it, rather than a large one stacked
            above it. Nothing is hidden and no distance is dropped; the reader
            simply stops paying for the frame twice more.

            At `md` every one of those classes is handed back and the desktop
            three-card grid is exactly what it was. */}
        <div className="divide-y divide-gold/15 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gold/15 md:grid md:grid-cols-3 md:gap-8 md:divide-y-0 md:overflow-visible md:rounded-none md:bg-transparent md:shadow-none md:ring-0">
          {boards.map((b) => {
            const Icon = b.icon;
            return (
              <article
                key={b.title}
                className="reveal group relative p-5 md:overflow-hidden md:rounded-2xl md:bg-white md:p-8 md:shadow-md md:ring-1 md:ring-gold/15 md:backdrop-blur-sm md:transition-all md:duration-500 md:hover:shadow-xl"
              >
                {/* The card signature — a gold rule along the top edge — only
                    means anything when there is a top edge to draw it on. */}
                <div className="absolute inset-x-0 top-0 hidden h-px bg-linear-to-r from-transparent via-gold/50 to-transparent md:block" aria-hidden="true" />
                <div className="absolute inset-0 hidden bg-linear-to-br from-gold/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block" aria-hidden="true" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3.5 md:mb-6 md:block">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy transition-colors duration-500 group-hover:bg-gold md:mb-6 md:h-14 md:w-14 md:rounded-xl">
                      <Icon className="h-5 w-5 text-gold transition-colors duration-500 group-hover:text-navy md:h-6 md:w-6" aria-hidden="true" />
                    </div>

                    <h3 className="font-serif text-xl text-navy md:text-2xl">{b.title}</h3>
                  </div>

                  <ul className="divide-y divide-gold/12 border-t border-gold/15">
                    {b.rows.map((r) => (
                      <li key={r.name} className="flex items-baseline justify-between gap-4 py-2.5 md:py-3">
                        <span className="min-w-0">
                          <span className="block text-navy/85 text-[0.95rem] leading-snug">{r.name}</span>
                          {/* The station code and the journey time — 10.6px of
                              spaced caps under a 15px station name. This is the
                              line that tells somebody the train takes 40
                              minutes. */}
                          {r.meta && (
                            <span className="block text-[0.72rem] tracking-[0.1em] md:text-[0.66rem] md:tracking-[0.16em] uppercase text-text-muted/80 mt-0.5">
                              {r.meta}
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 font-serif text-lg text-gold-dark tabular-nums">
                          {r.value}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 pt-3.5 border-t border-gold/12 text-[0.86rem] md:mt-5 md:pt-4 md:text-[0.8rem] text-text-muted leading-relaxed">
                    {b.note}
                  </p>
                </div>

                <span className="pointer-events-none absolute bottom-4 right-4 hidden h-6 w-6 border-b border-r border-gold/0 transition-colors duration-700 group-hover:border-gold/40 md:block" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        {/* 9.9px carrying 0.4em — two-fifths of its own width — in air. On a
            phone this was a line of disconnected capitals that wrapped, which
            is the opposite of the engraved single line it is meant to be. */}
        <p className="reveal mt-10 text-center font-display text-[0.68rem] tracking-[0.2em] md:text-[0.62rem] md:tracking-[0.4em] uppercase text-gold-dark/70">
          {TRAVEL.highway}
        </p>
      </div>
    </section>
  );
}
