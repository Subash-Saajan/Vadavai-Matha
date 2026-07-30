"use client";

import { Phone, Navigation, MessageCircle } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { PHONE, MAP_LINKS, hasWhatsApp, whatsAppLink, ADDRESS } from "@/lib/contact";
import { formatClock, formatGap } from "@/lib/formatTime";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useShrineStatus } from "./useShrineStatus";

/**
 * The brass plate on the threshold. It answers, before anything else, the two
 * questions a pilgrim actually arrives with: is it open, and how do I reach
 * someone. Everything else on this page is downstream of these.
 *
 * The status asserts only what we can verify — Mass times and the adoration
 * chapel's published hours. It never claims the office is staffed, because the
 * parish has never published office hours.
 */
export function ThresholdBar() {
  const { t, lang } = useLang();
  const status = useShrineStatus();
  const reducedMotion = usePrefersReducedMotion();

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

  return (
    <div className="relative z-20 -mt-12 md:-mt-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-white/95 backdrop-blur rounded-2xl ring-1 ring-gold/20 shadow-2xl overflow-hidden">
          {/* Gold top rule — the home page's card signature */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 md:gap-6 px-5 py-5 md:px-10 md:py-7">
            {/* Live status */}
            <div
              className="flex items-center gap-4"
              // The clock ticks; announce changes politely rather than
              // interrupting whatever a screen-reader user is doing.
              aria-live="polite"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                {/* The pulse is decoration; the dot's colour and the label
                    beside it carry the meaning. Omitted entirely under reduced
                    motion, since a Tailwind utility cannot be stopped by CSS. */}
                {status !== null && status.state !== "closed" && !reducedMotion && (
                  <span className={`absolute inline-flex h-full w-full rounded-full ${dotColour} opacity-60 animate-ping`} />
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColour}`} />
              </span>

              {/* `data-nosnippet` keeps this block out of Google's search
                  snippets. It is here because it was actively producing a bad
                  one: the live result for "little rome" read

                    "Parish office 04637 230134, open since 1685. 7:00 AM in
                     1h 30m. Open daily, 9:00 AM – 8:00 10 AM, …"

                  Google had stitched the countdown into the description, frozen
                  at whatever minute Googlebot happened to crawl. "in 1h 30m" is
                  meaningless to someone reading a search result tomorrow, and it
                  made the parish look like broken data on the one query that
                  brings half this site's traffic.

                  The status itself stays exactly as it is — it is genuinely
                  useful to a visitor standing at a bus stop. It is only withheld
                  from snippets, which is what `data-nosnippet` is for. Google
                  honours it on div/span/section; it does not affect indexing or
                  ranking, only the text Google is permitted to quote. */}
              <div className="min-w-0" data-nosnippet>
                {/* "OPEN NOW" / "MASS IS BEING SAID" at 0.66rem/0.28em is
                    10.6px of spaced caps — the one line on this page that
                    answers "can I go there right now", and it was the smallest
                    thing in the brass plate. Up on a phone, tracking in so the
                    longest of the three states still holds one line. */}
                <p className="font-display text-[0.74rem] tracking-[0.16em] md:text-[0.66rem] md:tracking-[0.28em] uppercase text-navy">
                  {/* Before hydration — and permanently, for a visitor without
                      JavaScript — this states something true at any hour. It
                      upgrades to the live reading once the clock is read. */}
                  {status === null
                    ? t.contact.status.staticSummary
                    : status.state === "mass"
                      ? t.contact.status.mass
                      : status.state === "open"
                        ? t.contact.status.open
                        : t.contact.status.closed}
                </p>
                <p className="mt-1.5 text-[0.88rem] md:text-[0.78rem] text-text-muted tabular-nums">
                  {status === null ? (
                    t.contact.status.staticHours
                  ) : (
                    <>
                      {t.contact.status.nextMass} · {formatClock(status.nextMassAt, lang)}
                      <span className="text-text-muted/60">
                        {" "}
                        {t.contact.status.inTime} {formatGap(status.minsToNextMass, gapUnits)}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Actions. ≥46px tall — these are pressed with a thumb, often by
                someone standing at a bus stop.

                On a phone these three wrap onto two rows inside a card about
                300px wide, so the Cinzel labels were the constraint: 0.64rem
                with 0.2em of tracking is 10.2px of type carrying a fifth of
                its own width in air, and "DIRECTIONS" alone ate a whole row.
                Larger and tighter is both more legible AND narrower, which is
                the trade this site makes everywhere small caps are used.
                `px-4` recovers another 8px per pill. */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={`tel:${PHONE.e164}`}
                className="inline-flex items-center gap-2.5 min-h-[46px] px-4 md:px-5 rounded-full bg-navy text-white font-display text-[0.7rem] tracking-[0.12em] md:text-[0.64rem] md:tracking-[0.2em] uppercase hover:bg-gold hover:text-navy transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                {/* The parish's number, on the brass plate, above the fold.
                    14px is below the floor this site holds for a telephone
                    number on a phone — see the note in ContactExperience. */}
                <span className="tabular-nums tracking-normal font-sans text-base md:text-sm font-medium">
                  {PHONE.display}
                </span>
              </a>

              {hasWhatsApp && (
                <a
                  href={whatsAppLink(`${ADDRESS.name}: `)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[46px] px-4 md:px-5 rounded-full border border-gold/30 text-navy/75 font-display text-[0.7rem] tracking-[0.12em] md:text-[0.64rem] md:tracking-[0.2em] uppercase hover:border-gold hover:text-gold-dark transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {t.contact.actions.whatsapp}
                </a>
              )}

              <a
                href={MAP_LINKS.googleDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[46px] px-4 md:px-5 rounded-full border border-gold/30 text-navy/75 font-display text-[0.7rem] tracking-[0.12em] md:text-[0.64rem] md:tracking-[0.2em] uppercase hover:border-gold hover:text-gold-dark transition-colors"
              >
                {/* Gold-leaf stroke rather than a flat colour. Same 135° axis and
                    the same gold tokens through the middle as
                    .text-gradient-gold, so the arrow reads as the site's gilding
                    and not a fourth gold.

                    The gradient is defined INSIDE this icon: lucide renders
                    `children` after its own paths, so the paint server sits in
                    the same <svg> that uses it and there is no cross-element
                    `url(#id)` reference to resolve. Two consequences to keep in
                    mind — lucide stops adding `aria-hidden` on its own once a
                    child is passed (hence the explicit one below), and it spreads
                    children into an array, so the <defs> needs a `key` or React
                    logs a missing-key warning.

                    Coordinates are the 24×24 viewBox, not the rendered 16px. */}
                <Navigation
                  className="w-4 h-4"
                  stroke="url(#threshold-gold-arrow)"
                  aria-hidden="true"
                >
                  <defs key="gold">
                    <linearGradient
                      id="threshold-gold-arrow"
                      gradientUnits="userSpaceOnUse"
                      x1="3"
                      y1="3"
                      x2="21"
                      y2="21"
                    >
                      {/* Four stops, not three: across a 1.3px stroke at 16px,
                          gold-light → gold → gold-dark alone is too narrow a
                          range to read as anything but flat. This opens on a
                          champagne highlight and closes on the same deep tone
                          .text-gradient-gold-deep ends on, so the arrow catches
                          light along its upper edge and sinks at the tail.
                          Tokens where tokens exist; the two extremes are the
                          gold-leaf highlight and shadow, which have none. */}
                      <stop offset="0%" stopColor="#f6e6b0" />
                      <stop offset="28%" style={{ stopColor: "var(--gold-light)" }} />
                      <stop offset="58%" style={{ stopColor: "var(--gold)" }} />
                      <stop offset="100%" stopColor="#8a6c28" />
                    </linearGradient>
                  </defs>
                </Navigation>
                {t.contact.actions.directions}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
