"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { SCHEDULE } from "@/lib/contact";
import { formatClock } from "@/lib/formatTime";
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

  /* Sunday is the seventh column; the first six are identical. */
  const columns = w.days.map((name, i) => {
    const sunday = i === 6;
    return {
      name,
      short: w.daysShort[i],
      sunday,
      masses: sunday ? SCHEDULE.sundayMass : SCHEDULE.weekdayMass,
      // Sunday's devotion has a published start and no published parts, so it
      // is stated as a start; the weekdays have both parts and get them.
      evening: sunday
        ? [{ at: SCHEDULE.devotions.sundayStart, from: true }]
        : [
            { at: SCHEDULE.devotions.rosary, from: false },
            { at: SCHEDULE.devotions.benediction, from: false },
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
                className={`week-column relative flex items-center justify-between gap-5 px-5 py-4 lg:flex-col lg:items-stretch lg:justify-start lg:px-4 lg:py-7 ${
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

                <div className="flex shrink-0 items-baseline gap-2.5 lg:mb-5 lg:flex-col lg:items-start lg:gap-1.5">
                  <h3
                    className={`ui-label ${
                      col.sunday ? "text-gold" : "text-navy"
                    }`}
                  >
                    <span className="lg:hidden">{col.name}</span>
                    <span className="hidden lg:inline">{col.short}</span>
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

                <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 lg:block lg:justify-start">
                  {/* Morning */}
                  <p
                    className={`micro-label hidden lg:block ${
                      col.sunday ? "text-white/40" : "text-text-muted/60"
                    }`}
                  >
                    {w.morning}
                  </p>
                  {/* ── THE TIMES GO UP ON A PHONE, NOT DOWN ──────────────
                      0.9rem is 14.4px, and it was chosen for a seven-across
                      grid on a monitor where each column is about 130px wide
                      and every number is on its own line. Below `lg` the whole
                      layout turns — the day becomes a ROW and the times are set
                      flush right in a wrapping cluster — but the size stayed at
                      the one picked to survive a narrow column. That is the
                      wrong way round: the prose on this page is what a phone
                      should shed, and the hours are what it came for. 15.7px
                      matches the week plate on the home page, which is the same
                      object at half the length. Restored at `md`, so both the
                      tablet row and the seven-column grid are untouched. */}
                  <ul className="flex flex-wrap justify-end gap-x-3 lg:mt-2 lg:block lg:space-y-1">
                    {col.masses.map((at) => (
                      <li
                        key={at}
                        className={`text-[0.98rem] tabular-nums md:text-[0.9rem] ${
                          col.sunday ? "text-gold-light" : "text-navy/80"
                        }`}
                      >
                        {formatClock(at, lang)}
                      </li>
                    ))}
                  </ul>

                  {/* The divider turns with the layout: a short upright tick
                      between the two lists when the day is a row, a full rule
                      beneath the morning when the day is a column. Without it
                      the two sets of times run together on a phone. */}
                  <span
                    className={`h-3.5 w-px shrink-0 lg:my-4 lg:h-px lg:w-full ${
                      col.sunday ? "bg-white/20" : "bg-gold/30"
                    }`}
                    aria-hidden="true"
                  />
                  <p
                    className={`micro-label hidden lg:block ${
                      col.sunday ? "text-white/40" : "text-text-muted/60"
                    }`}
                  >
                    {w.evening}
                  </p>
                  <ul className="flex flex-wrap justify-end gap-x-3 lg:mt-2 lg:block lg:space-y-1">
                    {col.evening.map(({ at, from }) => (
                      <li
                        key={at}
                        className={`text-[0.98rem] tabular-nums md:text-[0.9rem] ${
                          col.sunday ? "text-white/70" : "text-text-muted"
                        }`}
                      >
                        {/* English leads with "From", Tamil trails with
                            "முதல்" — hence a lead and a tail, either of which
                            may be empty in a given language. */}
                        {from && w.fromLead ? `${w.fromLead} ` : ""}
                        {formatClock(at, lang)}
                        {from && w.fromTail ? ` ${w.fromTail}` : ""}
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
