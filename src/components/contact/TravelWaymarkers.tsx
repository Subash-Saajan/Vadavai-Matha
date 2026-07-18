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
        <header className="text-center mb-14 reveal max-w-2xl mx-auto">
          <p className="kicker justify-center mb-5">{t.contact.travel.heading}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy leading-snug">
            {t.contact.travel.intro}
          </h2>
          <div className="mt-8 flex justify-center">
            <DistanceFromYou />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {boards.map((b) => {
            const Icon = b.icon;
            return (
              <article
                key={b.title}
                className="reveal group relative bg-white backdrop-blur-sm rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden ring-1 ring-gold/15"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
                <div className="absolute inset-0 bg-linear-to-br from-gold/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-500">
                    <Icon className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-500" aria-hidden="true" />
                  </div>

                  <h3 className="font-serif text-2xl text-navy mb-6">{b.title}</h3>

                  <ul className="divide-y divide-gold/12 border-t border-gold/15">
                    {b.rows.map((r) => (
                      <li key={r.name} className="flex items-baseline justify-between gap-4 py-3">
                        <span className="min-w-0">
                          <span className="block text-navy/85 text-[0.95rem] leading-snug">{r.name}</span>
                          {r.meta && (
                            <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-text-muted/80 mt-0.5">
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

                  <p className="mt-5 pt-4 border-t border-gold/12 text-[0.8rem] text-text-muted leading-relaxed">
                    {b.note}
                  </p>
                </div>

                <span className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-700" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        <p className="reveal mt-10 text-center font-display text-[0.62rem] uppercase tracking-[0.4em] text-gold-dark/70">
          {TRAVEL.highway}
        </p>
      </div>
    </section>
  );
}
