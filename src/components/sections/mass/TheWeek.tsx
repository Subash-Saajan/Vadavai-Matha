"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { SCHEDULE } from "@/lib/contact";
import { formatClock, formatClockList } from "@/lib/formatTime";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "@/hooks/useReveal";
import { useIstWeekday } from "@/hooks/useShrineClock";

/**
 * II — THE WEEK, AS SEVEN COLUMNS.
 *
 * The old page said this in prose across two cards ("Daily Mass · Monday –
 * Saturday", "Sunday Mass · Every Sunday") and left the reader to work out the
 * difference. Drawn as seven columns the difference IS the picture: six plain
 * columns of two Masses, and one gilded column of three that the whole parish
 * comes to. Nothing has to be read to see it.
 *
 * ⚠ Times come from `SCHEDULE` in lib/contact.ts and are typeset by
 * `formatClock`. Nothing here restates an hour — see the note in TheDay.tsx.
 *
 * The columns run MONDAY-FIRST, which is the liturgical and the Indian civil
 * convention, so Sunday lands at the end where the eye finishes. The IST
 * weekday store is 0-Sunday, hence the `% 7` remap when marking today.
 */
export function TheWeek() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const w = t.mass.week;

  useReveal(ref, lang);

  const weekday = useIstWeekday();
  /* Monday-first index of today, or −1 before the clock is read. */
  const todayCol = weekday === null ? -1 : (weekday + 6) % 7;

  /* "From 5:30 PM" — English leads, Tamil trails with "முதல்". */
  const fromClock = (at: string) =>
    [w.fromLead, formatClock(at, lang), w.fromTail].filter(Boolean).join(" ");

  /* Sunday is the seventh column; the first six are identical. */
  const columns = w.days.map((name, i) => {
    const sunday = i === 6;
    const evening = sunday
      ? [{ at: SCHEDULE.devotions.sundayStart, from: true }]
      : [
          { at: SCHEDULE.devotions.rosary, from: false },
          { at: SCHEDULE.devotions.benediction, from: false },
        ];
    return {
      name,
      short: w.daysShort[i],
      sunday,
      masses: sunday ? SCHEDULE.sundayMass : SCHEDULE.weekdayMass,
      // Sunday's devotion has a published start and no published parts, so it
      // is stated as a start; the weekdays have both parts and get them.
      evening,
      /* The same day, named, for the phone. The grid above can rely on two
         column headings to say what four numbers are; a row cannot, so each
         service is given its own line and its own name. Sunday's evening has
         no published parts, so it stays the general "Evening" rather than
         claiming a Rosary at 5:30 that no source gives. */
      lines: [
        { label: w.massLabel, value: formatClockList(sunday ? SCHEDULE.sundayMass : SCHEDULE.weekdayMass, lang), evening: false },
        ...(sunday
          ? [{ label: w.evening, value: fromClock(SCHEDULE.devotions.sundayStart), evening: true }]
          : [
              { label: w.rosaryLabel, value: formatClock(SCHEDULE.devotions.rosary, lang), evening: true },
              { label: w.benedictionLabel, value: formatClock(SCHEDULE.devotions.benediction, lang), evening: true },
            ]),
      ],
    };
  });

  /* The columns rise like organ pipes — left to right, Sunday last and a beat
     later, so the gilded one lands on its own. `.reveal-item` is deliberately
     not used on the columns: the house hook staggers by `i % 4`, which would
     put Sunday in the same beat as Wednesday. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cols = gsap.utils.toArray<HTMLElement>(".week-column", gridRef.current);
      if (reduced) {
        gsap.set(cols, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        cols,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={ref}
      id="week"
      className="parchment-swell section-padding relative scroll-mt-24 overflow-hidden"
    >
      <span
        className="section-numeral pointer-events-none absolute -top-6 right-4 select-none text-[7rem] opacity-[0.06] md:right-12 md:text-[12rem]"
        aria-hidden="true"
      >
        II
      </span>

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-9 max-w-2xl md:mb-16">
          <p className="reveal-item kicker mb-5">{w.label}</p>
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-tight text-navy md:text-5xl lg:text-6xl">
            {w.title}
          </h2>
          <p className="reveal-item mt-5 text-[0.98rem] leading-relaxed text-text-muted md:mt-6 md:text-lg">
            {w.body}
          </p>
        </header>

        {/* One hairline grid: `gap-px` over a gold ground draws every rule for
            free, and the rounded overflow clips them into a single plate. */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-gold/20 shadow-sm ring-1 ring-gold/20 lg:grid-cols-7"
        >
          {columns.map((col, i) => {
            const isToday = i === todayCol;
            return (
              <div
                key={col.name}
                className={`week-column relative px-5 py-4 lg:flex lg:flex-col lg:items-stretch lg:justify-start lg:px-4 lg:py-7 ${
                  col.sunday ? "bg-navy" : "bg-white/92 backdrop-blur-sm"
                }`}
              >
                {/* Today's column is lit from the top rather than outlined: a
                    ring inside a gap-px grid reads as a broken rule. */}
                {isToday && (
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-transparent via-gold to-transparent"
                    aria-hidden="true"
                  />
                )}

                {/* ── THE DAY, NAMED, ON A PHONE ────────────────────────────
                    A separate block rather than fifteen more responsive
                    utilities on the grid below — the same split TheDay.tsx
                    makes between its arc and its stacked list, and for the
                    same reason: below `lg` this stops being a column of a
                    timetable and becomes a small register of its own, where
                    every line carries the name of what it is. */}
                <div className="lg:hidden">
                  <div className="mb-2.5 flex items-baseline gap-2.5">
                    <h3 className={`ui-label ${col.sunday ? "text-gold" : "text-navy"}`}>
                      {col.name}
                    </h3>
                    {isToday && (
                      <span
                        className={`micro-label ${
                          col.sunday ? "text-white/55" : "text-gold-dark"
                        }`}
                      >
                        {w.today}
                      </span>
                    )}
                  </div>

                  {/* A description list, because that is what it is: the name
                      of a service, and the time it is said. */}
                  <dl className="space-y-1">
                    {col.lines.map((line) => (
                      <div key={line.label} className="flex items-baseline justify-between gap-4">
                        {/* `micro-label`, not `ui-label` — one step down, so
                            the name of the service never competes with the
                            name of the day beside it. Colour only: the size
                            and tracking live in globals.css so the Tamil rule
                            can replace them. */}
                        <dt
                          className={`micro-label ${
                            col.sunday ? "text-white/45" : "text-text-muted/75"
                          }`}
                        >
                          {line.label}
                        </dt>
                        {/* 15.7px — the hours are what a phone came for, and
                            they hold the size the home page's week plate uses. */}
                        <dd
                          className={`text-[0.98rem] tabular-nums ${
                            line.evening
                              ? col.sunday
                                ? "text-white/75"
                                : "text-text-muted"
                              : col.sunday
                                ? "text-gold-light"
                                : "text-navy/85"
                          }`}
                        >
                          {line.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="hidden shrink-0 items-baseline gap-2.5 lg:mb-5 lg:flex lg:flex-col lg:items-start lg:gap-1.5">
                  <h3
                    className={`ui-label ${
                      col.sunday ? "text-gold" : "text-navy"
                    }`}
                  >
                    {col.short}
                  </h3>
                  {isToday && (
                    <span
                      className={`micro-label ${
                        col.sunday ? "text-white/55" : "text-gold-dark"
                      }`}
                    >
                      {w.today}
                    </span>
                  )}
                </div>

                {/* ── The seven-column grid, from `lg` up ──────────────────
                    Two headings and four numbers. Unchanged: what used to be
                    responsive here is now the phone's own block above, so
                    every class below states the desktop case plainly. */}
                <div className="hidden lg:block">
                  {/* Morning */}
                  <p
                    className={`micro-label ${
                      col.sunday ? "text-white/40" : "text-text-muted/60"
                    }`}
                  >
                    {w.morning}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {col.masses.map((at) => (
                      <li
                        key={at}
                        className={`text-[0.9rem] tabular-nums ${
                          col.sunday ? "text-gold-light" : "text-navy/80"
                        }`}
                      >
                        {formatClock(at, lang)}
                      </li>
                    ))}
                  </ul>

                  {/* A full rule beneath the morning; without it the two sets
                      of times run together down the column. */}
                  <span
                    className={`my-4 block h-px w-full ${
                      col.sunday ? "bg-white/20" : "bg-gold/30"
                    }`}
                    aria-hidden="true"
                  />
                  <p
                    className={`micro-label ${
                      col.sunday ? "text-white/40" : "text-text-muted/60"
                    }`}
                  >
                    {w.evening}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {col.evening.map(({ at, from }) => (
                      <li
                        key={at}
                        className={`text-[0.9rem] tabular-nums ${
                          col.sunday ? "text-white/70" : "text-text-muted"
                        }`}
                      >
                        {from ? fromClock(at) : formatClock(at, lang)}
                      </li>
                    ))}
                  </ul>
                </div>

                {col.sunday && (
                  <p className="micro-label hidden leading-relaxed text-gold/70 lg:mt-6 lg:block">
                    {w.gathering}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
