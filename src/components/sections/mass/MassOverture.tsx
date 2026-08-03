"use client";

import { ArrowDown } from "lucide-react";

import { useLang } from "@/components/layout/LanguageProvider";
import { useShrineStatus } from "@/components/contact/useShrineStatus";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { formatClock, formatGap } from "@/lib/formatTime";
import { nextObservance, useToday } from "@/lib/feasts";

/**
 * THE BRASS PLATE ON THE THRESHOLD OF THIS PAGE.
 *
 * /contact opens with the same idiom — a white plate lifted into the foot of
 * the hero — and it is repeated here on purpose: these are the site's two
 * practical pages, and a reader who has learnt what the plate means on one
 * must not have to relearn it on the other.
 *
 * What it carries is different, though. /contact answers "is it open, how do I
 * reach someone"; this answers the two questions this page is opened with:
 * WHEN IS THE NEXT MASS, and WHAT IS THE PARISH KEEPING NEXT. The live half
 * reads the same clock (useShrineStatus) and the same strings
 * (t.contact.status), so the two pages can never disagree about whether Mass is
 * being said; the feast half reads lib/feasts.ts, the same calendar the home
 * page and the grid further down this page read.
 *
 * ⚠ THE THREE CLOCKS ARE GONE, AND ARE NOT TO BE PUT BACK. The plate used to
 * carry a second row beneath the live line — three tabs, "The Day", "The Week",
 * "The Year", jumping to the three sections. The owner asked for them out. They
 * were a table of contents for a page a reader can simply scroll, and they cost
 * the whole lower half of the plate — the most valuable strip on the page — to
 * repeat three headings that appear again, in full, a screen below. What sits
 * there now is something the page could not otherwise say at all: which feast
 * is next, and when.
 *
 * The overture's dict block is deliberately left whole in i18n.ts: only
 * `overture.year` is still read (TheYear uses it as its kicker), but the rest
 * is the parish's own wording for these three sections and costs nothing.
 */
export function MassOverture() {
  const { t, lang } = useLang();
  const status = useShrineStatus();
  const reducedMotion = usePrefersReducedMotion();
  const f = t.festivals;

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

  /* Which feast is next. `null` until the client knows the date — same
     hydration contract as the Mass status beside it, and handled the same way:
     the server renders something that is true at every hour of every day (the
     parish's own annual feast, unbadged), and the live reading replaces it. */
  const today = useToday();
  const next = nextObservance(today);

  const annual = { name: f.featured.name, date: f.featured.date, href: "#festivals" };
  const feast =
    next === null || next.kind === "annual"
      ? annual
      : {
          name: f.list[next.index].name,
          date: f.list[next.index].date,
          href: "#year",
        };

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

            {/* ── What the parish is keeping next ──────────────────────────
                The one thing this page held nowhere above the fold. It stays a
                link, so the row the three tabs used to do — reaching the feasts
                without scrolling — is not lost with them; it simply costs one
                line instead of a whole band, and it says something true about
                today rather than repeating a heading.

                The gap between the plates on a phone is a hairline rule, not a
                gutter: this is one plate, and the feast is the second half of
                the same sentence as the Mass beside it. */}
            <a
              href={feast.href}
              className="group flex shrink-0 items-center gap-3.5 border-t border-gold/15 pt-5 sm:border-t-0 sm:pt-0"
            >
              {/* The badge appears only once the date is known; before that the
                  block is a plain statement of the parish's own feast, which is
                  true whenever it is read. */}
              {next !== null && (
                <span className="micro-label shrink-0 rounded-full bg-gold/15 px-2.5 py-1 text-gold-dark">
                  {next.running ? f.nowBadge : f.nextBadge}
                </span>
              )}
              <span className="min-w-0 sm:text-right">
                <span className="block font-serif text-[1.05rem] leading-tight text-navy md:text-lg">
                  {feast.name}
                </span>
                <span className="micro-label mt-1 block text-text-muted">{feast.date}</span>
              </span>
              {/* Muted at rest rather than revealed on hover: a touch device
                  never hovers, and this arrow is the only mark saying the row
                  jumps down the page rather than off the site. */}
              <ArrowDown
                className="h-4 w-4 shrink-0 text-gold/55 transition-all duration-500 group-hover:translate-y-0.5 group-hover:text-gold"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
