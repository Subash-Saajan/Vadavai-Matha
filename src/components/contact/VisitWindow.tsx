"use client";

import { Link } from "@/components/LocaleLink";
import { ArrowUpRight, Shirt, DoorOpen, HandCoins } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { SCHEDULE, hasUpi, upiLink, config } from "@/lib/contact";
import { formatClock, formatClockList } from "@/lib/formatTime";

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

  // Two notes, not three: the photography note is gone at the parish's
  // request. See the comment where its strings used to be in i18n.ts.
  //
  // `DoorOpen` rather than lucide's `Accessibility`, which is the wheelchair
  // pictogram — an international access symbol sitting alone in a column of
  // hairline outline icons, and it read as a regulation sign rather than as
  // this page's own hand. A door standing open is what this note actually
  // says (the church is at ground level; ring ahead and they will see you in)
  // and it is the site's own image — /contact opens on a threshold.
  const notes = [
    { icon: Shirt, title: t.contact.notes.dress, body: t.contact.notes.dressBody },
    { icon: DoorOpen, title: t.contact.notes.access, body: t.contact.notes.accessBody },
  ];

  /* ⚠ EVERY HOUR BELOW COMES FROM `SCHEDULE` IN lib/contact.ts — the same
     source /mass-timings reads, typeset by the same `formatClock`. It used to
     be four hand-written strings in i18n.ts, and they had drifted: the evening
     row said "Rosary 6:30 PM · Benediction 7:00 PM" flat, while /mass-timings
     says the Sunday devotion begins at 5:30 PM. Assembling them here means the
     parish changing an hour is one edit in one file, and the two pages cannot
     disagree again. Words stay in i18n; numbers never do. */
  const v = t.contact.visit;
  // "Open daily, 9:00 AM – 8:00 PM" / "தினமும் காலை 9:00 – இரவு 8:00 வரை
  // திறந்திருக்கும்". The verb sits before the hours in English and after them
  // in Tamil, so the sentence is built from a lead and a tail, either of which
  // may be empty. See the note on these keys in i18n.ts for why it says OPEN.
  const chapelHours = [
    v.chapelOpenLead,
    `${formatClock(SCHEDULE.chapel.open, lang)} – ${formatClock(SCHEDULE.chapel.close, lang)}`,
    v.chapelOpenTail,
  ]
    .filter(Boolean)
    .join(" ");
  const devotionHours = `${v.rosary} ${formatClock(SCHEDULE.devotions.rosary, lang)} · ${v.benediction} ${formatClock(SCHEDULE.devotions.benediction, lang)}`;
  const sundayDevotions = [
    v.sundayDevotionsLead,
    formatClock(SCHEDULE.devotions.sundayStart, lang),
    v.sundayDevotionsTail,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="section-padding relative overflow-hidden parchment-swell">
      <div className="light-shaft absolute -top-16 right-0 w-[45%] h-[120%] -rotate-6" aria-hidden="true" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[11rem] opacity-[0.05] select-none">
        VI
      </span>

      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-10 md:mb-14 reveal">
          <p className="kicker justify-center mb-5">{t.contact.visit.heading}</p>
        </header>

        {/* Hours. Also the source of the openingHoursSpecification in JSON-LD. */}
        <div className="reveal grid sm:grid-cols-2 gap-x-12 gap-y-7 md:gap-y-8 border-y border-gold/25 py-8 md:py-10">
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
            { label: t.contact.visit.chapel, value: chapelHours, sub: "" },
            {
              label: t.contact.visit.devotions,
              value: devotionHours,
              sub: "",
              // The one line that was wrong. Sunday's devotion is an hour
              // earlier than the other six days', and this row is the only
              // place on /contact that can say so.
              note: sundayDevotions,
            },
          ].map((row) => (
            <div key={row.label}>
              {/* "WEEKDAYS · MASS", "SUNDAY · MASS" — 9.3px of Cinzel with a
                  third of its width in tracking, and the only thing that says
                  WHICH day the times beneath it belong to. Getting this wrong
                  sends somebody to a church on the wrong morning. */}
              <p className="font-display text-[0.66rem] tracking-[0.16em] md:text-[0.58rem] md:tracking-[0.3em] uppercase text-gold-dark mb-2.5">
                {row.label}
                {row.sub && <span className="text-navy/25"> · {row.sub}</span>}
              </p>
              <p className="font-serif text-xl md:text-2xl text-navy tabular-nums leading-snug">
                {row.value}
              </p>
              {"note" in row && row.note && (
                <p className="mt-1.5 text-[0.84rem] md:text-[0.8rem] text-text-muted tabular-nums">
                  {row.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="reveal mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p className="text-[0.9rem] md:text-[0.85rem] text-text-muted italic max-w-md leading-relaxed">
            {t.contact.visit.workingChurch}
          </p>
          {/* `-my-2 py-2` gives the link a 44px tap target without moving a
              pixel of it — the text is 20px tall on its own, which is under
              half of what a thumb needs, and this is the route to the full
              timetable. */}
          <Link
            href="/mass-timings"
            className="group shrink-0 -my-2 inline-flex items-center gap-1.5 py-2 text-[0.92rem] md:text-sm text-gold-dark hover:text-navy transition-colors"
          >
            {t.contact.visit.fullTimings}
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* The feast. A hundred thousand people arrive; say so plainly. One
            deliberate dark panel — the single dramatic accent on a bright page. */}
        <aside className="reveal mt-12 md:mt-16 relative overflow-hidden rounded-2xl bg-navy cathedral-depth p-6 md:p-12 shadow-xl">
          <div className="light-shaft absolute -top-12 right-[6%] w-2/5 h-[140%] -rotate-12" aria-hidden="true" />
          <div className="relative">
            <p className="font-display text-[0.66rem] tracking-[0.18em] md:text-[0.6rem] md:tracking-[0.32em] uppercase text-gold mb-5">
              {t.contact.visit.feastTitle}
            </p>
            {/* Cormorant reversed out of navy is the least legible combination
                on this page — small x-height and thin strokes both work against
                a white-on-dark reversal — so it comes DOWN only to 1.05rem,
                still a step above the sans around it. Same finding as
                sections/Weeping.tsx on the home page. */}
            <p className="font-serif text-[1.05rem] md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {t.contact.visit.feastBody}
            </p>
          </div>
        </aside>

        {/* Before you come */}
        <div className="reveal mt-12 md:mt-16">
          <p className="kicker mb-7 md:mb-8">{t.contact.notes.heading}</p>
          {/* Two columns, because there are two notes. It was three, sized for
              the photography note that no longer exists — leaving that grid
              would have hung an empty third of the page beside them. */}
          <div className="grid md:grid-cols-2 gap-7 md:gap-8">
            {notes.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.title}>
                  <Icon className="w-4 h-4 text-gold-dark mb-3.5 md:mb-4" aria-hidden="true" />
                  <h3 className="font-serif text-xl text-navy mb-2.5">{n.title}</h3>
                  <p className="text-[0.9rem] md:text-[0.85rem] text-text-muted leading-relaxed md:max-w-md">{n.body}</p>
                </div>
              );
            })}
          </div>

          {/* Offerings. UPI appears only if the parish has supplied a VPA. */}
          <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-gold/20">
            <HandCoins className="w-4 h-4 text-gold-dark mb-3.5 md:mb-4" aria-hidden="true" />
            <h3 className="font-serif text-xl text-navy mb-2.5">{t.contact.notes.offeringTitle}</h3>
            <p className="text-[0.9rem] md:text-[0.85rem] text-text-muted leading-relaxed max-w-xl">
              {t.contact.notes.offeringBody}
            </p>
            {/* `flex-wrap` because the label and the VPA together are wider
                than a phone; without it the pill ran off the side of the
                screen. The VPA holds 16px for the same reason a telephone
                number does — it is an address somebody may transcribe into a
                banking app by hand, and one wrong character sends the parish's
                money to a stranger. */}
            {hasUpi && (
              <a
                href={upiLink()}
                className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 min-h-[46px] px-5 md:px-6 py-2 rounded-full bg-navy text-white font-display text-[0.7rem] tracking-[0.12em] md:text-[0.62rem] md:tracking-[0.22em] uppercase hover:bg-gold hover:text-navy transition-colors"
              >
                {t.contact.notes.offeringUpi}
                <span className="font-sans tracking-normal text-base md:text-sm normal-case">{config.upiVpa}</span>
              </a>
            )}
          </div>
        </div>

        {/* Plain answers, for people and for machines. */}
        {/* The plain answers. These are the paragraphs a language model lifts
            verbatim, so they stay at the sans default rather than taking the
            phone build's step down; only the gaps between them close up. */}
        <div className="reveal mt-14 md:mt-20 space-y-8 md:space-y-10">
          {t.contact.visit.questions.map((qa) => (
            <div key={qa.q} className="border-l-2 border-gold/30 pl-5 md:pl-6">
              <h3 className="font-serif text-xl md:text-2xl text-navy mb-3 leading-snug">{qa.q}</h3>
              <p className="text-text-muted leading-relaxed max-w-2xl">{qa.a}</p>
            </div>
          ))}
        </div>

        <div className="cross-rule reveal mt-14 md:mt-20 max-w-xs mx-auto" aria-hidden="true">
          <svg width="10" height="15" viewBox="0 0 13 20" fill="none" className="shrink-0">
            <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        {/* 9.6px at 0.38em — the last line on the page, and on a phone it
            wrapped into two rows of scattered capitals. */}
        <p className="reveal mt-8 text-center font-display text-[0.66rem] tracking-[0.2em] md:text-[0.6rem] md:tracking-[0.38em] uppercase text-gold-dark/70">
          {t.contact.notes.colophon}
        </p>
      </div>
    </section>
  );
}
