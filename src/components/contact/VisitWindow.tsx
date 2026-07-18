"use client";

import Link from "next/link";
import { ArrowUpRight, Shirt, Camera, Accessibility, HandCoins } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { SCHEDULE, hasUpi, upiLink, config } from "@/lib/contact";
import { formatClockList } from "@/lib/formatTime";

/**
 * When to come, and what to know before you do.
 *
 * The three questions at the foot of this section are written as plain
 * question-and-answer pairs, each answer self-contained and leading with the
 * fact. That is the shape a language model can lift verbatim when someone asks
 * ChatGPT "what time is Mass at Vadakkankulam" — and it is the same content a
 * human wants. Nothing here is hidden behind an accordion or an animation.
 */

export function VisitWindow() {
  const { t, lang } = useLang();

  const notes = [
    { icon: Shirt, title: t.contact.notes.dress, body: t.contact.notes.dressBody },
    { icon: Camera, title: t.contact.notes.photography, body: t.contact.notes.photographyBody },
    { icon: Accessibility, title: t.contact.notes.access, body: t.contact.notes.accessBody },
  ];

  return (
    <section className="section-padding relative overflow-hidden parchment-swell">
      <div className="light-shaft absolute -top-16 right-0 w-[45%] h-[120%] -rotate-6" aria-hidden="true" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[11rem] opacity-[0.05] select-none">
        VI
      </span>

      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-14 reveal">
          <p className="kicker justify-center mb-5">{t.contact.visit.heading}</p>
        </header>

        {/* Hours. Also the source of the openingHoursSpecification in JSON-LD. */}
        <div className="reveal grid sm:grid-cols-2 gap-x-12 gap-y-8 border-y border-gold/25 py-10">
          {[
            {
              label: t.contact.visit.weekday,
              value: formatClockList(SCHEDULE.weekdayMass, lang),
              sub: t.contact.visit.massHeading,
            },
            {
              label: t.contact.visit.sunday,
              value: formatClockList(SCHEDULE.sundayMass, lang),
              sub: t.contact.visit.massHeading,
            },
            { label: t.contact.visit.chapel, value: t.contact.visit.chapelHours, sub: "" },
            { label: t.contact.visit.devotions, value: t.contact.visit.devotionsHours, sub: "" },
          ].map((row) => (
            <div key={row.label}>
              <p className="font-display text-[0.58rem] uppercase tracking-[0.3em] text-gold-dark mb-2.5">
                {row.label}
                {row.sub && <span className="text-navy/25"> · {row.sub}</span>}
              </p>
              <p className="font-serif text-xl md:text-2xl text-navy tabular-nums leading-snug">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p className="text-[0.85rem] text-text-muted italic max-w-md leading-relaxed">
            {t.contact.visit.workingChurch}
          </p>
          <Link
            href="/mass-timings"
            className="group shrink-0 inline-flex items-center gap-1.5 text-sm text-gold-dark hover:text-navy transition-colors"
          >
            {t.contact.visit.fullTimings}
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* The feast. A hundred thousand people arrive; say so plainly. One
            deliberate dark panel — the single dramatic accent on a bright page. */}
        <aside className="reveal mt-16 relative overflow-hidden rounded-2xl bg-navy cathedral-depth p-10 md:p-12 shadow-xl">
          <div className="light-shaft absolute -top-12 right-[6%] w-2/5 h-[140%] -rotate-12" aria-hidden="true" />
          <div className="relative">
            <p className="font-display text-[0.6rem] uppercase tracking-[0.32em] text-gold mb-5">
              {t.contact.visit.feastTitle}
            </p>
            <p className="font-serif text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {t.contact.visit.feastBody}
            </p>
          </div>
        </aside>

        {/* Before you come */}
        <div className="reveal mt-16">
          <p className="kicker mb-8">{t.contact.notes.heading}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {notes.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.title}>
                  <Icon className="w-4 h-4 text-gold-dark mb-4" aria-hidden="true" />
                  <h3 className="font-serif text-xl text-navy mb-2.5">{n.title}</h3>
                  <p className="text-[0.85rem] text-text-muted leading-relaxed">{n.body}</p>
                </div>
              );
            })}
          </div>

          {/* Offerings. UPI appears only if the parish has supplied a VPA. */}
          <div className="mt-12 pt-10 border-t border-gold/20">
            <HandCoins className="w-4 h-4 text-gold-dark mb-4" aria-hidden="true" />
            <h3 className="font-serif text-xl text-navy mb-2.5">{t.contact.notes.offeringTitle}</h3>
            <p className="text-[0.85rem] text-text-muted leading-relaxed max-w-xl">
              {t.contact.notes.offeringBody}
            </p>
            {hasUpi && (
              <a
                href={upiLink()}
                className="mt-5 inline-flex items-center gap-2 min-h-[46px] px-6 rounded-full bg-navy text-white font-display text-[0.62rem] uppercase tracking-[0.22em] hover:bg-gold hover:text-navy transition-colors"
              >
                {t.contact.notes.offeringUpi}
                <span className="font-sans tracking-normal text-sm normal-case">{config.upiVpa}</span>
              </a>
            )}
          </div>
        </div>

        {/* Plain answers, for people and for machines. */}
        <div className="reveal mt-20 space-y-10">
          {t.contact.visit.questions.map((qa) => (
            <div key={qa.q} className="border-l-2 border-gold/30 pl-6">
              <h3 className="font-serif text-xl md:text-2xl text-navy mb-3 leading-snug">{qa.q}</h3>
              <p className="text-text-muted leading-relaxed max-w-2xl">{qa.a}</p>
            </div>
          ))}
        </div>

        <div className="cross-rule reveal mt-20 max-w-xs mx-auto" aria-hidden="true">
          <svg width="10" height="15" viewBox="0 0 13 20" fill="none" className="shrink-0">
            <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <p className="reveal mt-8 text-center font-display text-[0.6rem] uppercase tracking-[0.38em] text-gold-dark/70">
          {t.contact.notes.colophon}
        </p>
      </div>
    </section>
  );
}
