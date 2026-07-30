"use client";

import { Sunrise, CalendarDays, CalendarRange, ArrowDown } from "lucide-react";

import { useLang } from "@/components/layout/LanguageProvider";
import { useShrineStatus } from "@/components/contact/useShrineStatus";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { formatClock, formatGap } from "@/lib/formatTime";

/**
 * THE BRASS PLATE ON THE THRESHOLD OF THIS PAGE.
 *
 * /contact opens with the same idiom — a white plate lifted into the foot of
 * the hero — and it is repeated here on purpose: these are the site's two
 * practical pages, and a reader who has learnt what the plate means on one
 * must not have to relearn it on the other.
 *
 * What it carries is different, though. /contact answers "is it open, how do I
 * reach someone"; this answers "when is the next Mass, and what does this page
 * hold". The live half reads the same clock (useShrineStatus) and the same
 * strings (t.contact.status), so the two pages can never disagree about
 * whether Mass is being said.
 *
 * The lower half is the page's own table of contents — the three clocks the
 * shrine keeps. It exists because the page is now long: without it a reader
 * looking only for Sunday's times has to scroll past the whole year.
 */
export function MassOverture() {
  const { t, lang } = useLang();
  const status = useShrineStatus();
  const reducedMotion = usePrefersReducedMotion();
  const o = t.mass.overture;

  const gapUnits = {
    hour: t.contact.status.hourUnit,
    minute: t.contact.status.minuteUnit,
    sep: t.contact.status.unitSep,
  };

  const dotColour =
    status?.state === "mass"
      ? "bg-gold"
      : status?.state === "open"
        ? "bg-emerald-500"
        : "bg-navy/30";

  const clocks = [
    { href: "#day", icon: Sunrise, name: o.day, note: o.dayNote, numeral: "I" },
    { href: "#week", icon: CalendarDays, name: o.week, note: o.weekNote, numeral: "II" },
    { href: "#festivals", icon: CalendarRange, name: o.year, note: o.yearNote, numeral: "V" },
  ];

  return (
    <div className="relative z-20 -mt-14 px-6 md:-mt-20 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-white/95 shadow-2xl ring-1 ring-gold/20 backdrop-blur">
          {/* Gold top rule — the site's card signature. */}
          <div
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
            aria-hidden="true"
          />

          {/* ── The live half ── */}
          <div
            className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-7"
            aria-live="polite"
          >
            <div className="flex items-center gap-4">
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                {/* The pulse is decoration; the dot's colour and the label
                    beside it carry the meaning. Omitted entirely under reduced
                    motion, since a Tailwind utility cannot be stopped by CSS. */}
                {status !== null && status.state !== "closed" && !reducedMotion && (
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dotColour}`}
                  />
                )}
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dotColour}`} />
              </span>

              {/* `data-nosnippet` for the same reason /contact carries it: a
                  frozen countdown ("in 1h 30m") stitched into a search snippet
                  reads as broken data to everyone who sees it tomorrow. */}
              <div className="min-w-0" data-nosnippet>
                <p className="ui-label text-navy">
                  {status === null
                    ? t.contact.status.staticSummary
                    : status.state === "mass"
                      ? t.contact.status.mass
                      : status.state === "open"
                        ? t.contact.status.open
                        : t.contact.status.closed}
                </p>
                {/* 0.78rem is 12.5px, and this line is not a caption — it is
                    the NEXT MASS TIME and the countdown to it, the single most
                    acted-upon sentence on the site. At the top of a page a
                    reader opens in the dark at half past four it was the
                    smallest thing on the screen. Up to 14.7px on a phone; the
                    desktop value is untouched, where the same line sits at
                    reading distance on a much wider plate. */}
                <p className="mt-1.5 text-[0.92rem] tabular-nums text-text-muted md:text-[0.78rem]">
                  {status === null ? (
                    t.contact.status.staticHours
                  ) : (
                    <>
                      {t.contact.status.nextMass} · {formatClock(status.nextMassAt, lang)}
                      <span className="text-text-muted/60">
                        {" "}
                        {t.contact.status.inTime}{" "}
                        {formatGap(status.minsToNextMass, gapUnits)}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Serif prose, so it comes down less far than the sans would —
                Cormorant's small x-height means 1.05rem here reads about the
                size 0.98rem does in Geist. See the note in Patroness.tsx. */}
            <p className="shrink-0 font-serif text-[1.05rem] italic leading-snug text-navy/70 sm:text-right md:text-lg">
              {o.lead}
            </p>
          </div>

          {/* ── The three clocks ── */}
          <div className="grid grid-cols-1 gap-px border-t border-gold/15 bg-gold/15 sm:grid-cols-3">
            {clocks.map(({ href, icon: Icon, name, note, numeral }) => (
              <a
                key={href}
                href={href}
                className="group relative flex items-center gap-4 bg-white px-6 py-4 transition-colors duration-500 hover:bg-cream/70 md:px-8 md:py-5"
              >
                <span
                  className="section-numeral pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[3.2rem] opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.16]"
                  aria-hidden="true"
                >
                  {numeral}
                </span>
                <Icon className="h-5 w-5 shrink-0 text-gold-dark" aria-hidden="true" />
                <span className="relative min-w-0">
                  <span className="block font-serif text-[1.05rem] leading-tight text-navy md:text-lg">
                    {name}
                  </span>
                  <span className="mt-0.5 block text-[0.88rem] leading-snug text-text-muted md:text-[0.78rem]">
                    {note}
                  </span>
                </span>
                {/* THE ARROW WAS INVISIBLE ON A PHONE. `text-gold/0` until
                    `group-hover` is a pointer idiom: a touch device never
                    hovers, so the only mark telling the reader these three rows
                    jump down the page rather than off the site was simply not
                    drawn. Shown at rest below md — muted, so it reads as an
                    affordance and not as a third piece of content — and the
                    hover reveal is left exactly as it was above it. */}
                <ArrowDown
                  className="ml-auto h-4 w-4 shrink-0 text-gold/55 transition-all duration-500 group-hover:translate-y-0.5 group-hover:text-gold md:text-gold/0"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
