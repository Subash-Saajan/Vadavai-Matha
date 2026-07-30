"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { gsap, DESKTOP } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "@/hooks/useReveal";
import { useFeastCountdown } from "@/lib/feasts";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";

/**
 * IV — THE ANNUAL FEAST. The ten days in August the whole village turns on.
 *
 * ⚠ THIS PANEL IS THE ONE PART OF THE OLD PAGE THE OWNER ASKED TO KEEP. Its
 * shape is therefore deliberately unchanged: a navy plate split down the
 * middle, the processional photograph on the left, and on the right the gold
 * label, the date, the name at display size, the paragraph, and the ten-day
 * schedule under a rule. Do not restructure it. What was added is additive and
 * nothing more —
 *
 *   · a LIVE COUNTDOWN. This is the one date on the site a pilgrim books travel
 *     around, and the page never said how far off it was. Computed in
 *     lib/feasts.ts against the shrine's own calendar day, so it is right for a
 *     reader in Chennai and one in Toronto.
 *   · the schedule read as a LADDER rather than a list — a hairline down the
 *     left with a node per entry — because six rows of "when / detail" with no
 *     spine between them is where the old panel went slack.
 *   · the house corner ornaments on the photograph, which every other framed
 *     picture on this site carries and this one did not.
 *   · a slow parallax on the photograph inside its own frame. Desktop only,
 *     per the rule in lib/gsap.ts.
 *
 * The section also carries the page's `#festivals` anchor: the home page, the
 * footer and the old teaser all point at it, and it must land here, at the top
 * of the festival half of the page.
 */
export function TheAnnualFeast() {
  const ref = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const f = t.festivals;
  const countdown = useFeastCountdown();

  useReveal(ref, lang);

  /* The photograph breathes inside its frame as the panel goes by. The frame
     never moves, so nothing here can cause a horizontal scrollbar. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.fromTo(
          plateRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          },
        );
      });
      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={ref}
      id="festivals"
      className="parchment-sheen section-padding relative scroll-mt-24 overflow-hidden bg-cream"
    >
      <span
        className="section-numeral pointer-events-none absolute -top-6 left-4 select-none text-[7rem] opacity-[0.06] md:left-12 md:text-[12rem]"
        aria-hidden="true"
      >
        IV
      </span>

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-9 max-w-2xl md:mb-16">
          <p className="reveal-item kicker mb-5">{f.label}</p>
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-tight text-navy md:text-5xl lg:text-6xl">
            {f.title}
          </h2>
          <p className="reveal-item mt-5 text-[0.98rem] leading-relaxed text-text-muted md:mt-6 md:text-lg">
            {f.intro}
          </p>
        </header>

        <article className="reveal-item relative overflow-hidden rounded-3xl bg-navy shadow-2xl ring-1 ring-gold/20">
          <div className="grid md:grid-cols-2">
            {/* The photograph. `overflow-hidden` on the cell, so the parallax
                inside it is clipped to the panel's own corner radius. */}
            <div className="relative min-h-[300px] overflow-hidden md:min-h-full">
              {/* THE OVERSCAN IS A SCALE ON THE IMAGE, NOT A HEIGHT ON THE
                  FRAME. A `h-[112%]` wrapper needs its parent's height to be
                  definite before a percentage can resolve, and this parent is
                  a grid cell whose height comes from `min-height` on a phone —
                  exactly the case browsers disagree about. `scale-110` gives
                  5% of picture beyond each edge with no dependency at all, and
                  the ±4% drift below can never expose a bare strip. */}
              {/* `md:will-change-transform`, not bare: `will-change` promotes
                  the element to its own compositor layer for the whole life of
                  the page, and the drift below it is desktop-only, so on a
                  phone this was a standing promise to move that is never kept —
                  a full-bleed photograph's worth of memory for nothing. */}
              <div ref={plateRef} className="absolute inset-0 md:will-change-transform">
                <Image
                  src="/images/fest-procession-monstrance.jpg"
                  alt={f.featured.name}
                  fill
                  // Portrait 3:4 source in a landscape panel — bias the crop
                  // upward so the canopy and monstrance stay in frame.
                  className="scale-110 object-cover object-[50%_35%]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-navy/75 via-navy/10 to-transparent md:bg-linear-to-r" />
              <PhotoOrnaments corners="diagonal" />
            </div>

            <div className="p-6 md:p-12 lg:p-14">
              {/* The countdown. Absent on the server and the first paint — a
                  number of days is not something to bake into the HTML, where
                  a cached page would go on asserting it for a week. */}
              {countdown && (
                <p className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-gold/12 px-4 py-1.5 ring-1 ring-gold/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  <span className="micro-label text-gold-light">
                    {countdown.state === "during"
                      ? f.countdownNow
                      : `${f.countdownLead} ${countdown.days} ${
                          countdown.days === 1 ? f.countdownDay : f.countdownDays
                        }`}
                  </span>
                </p>
              )}

              <p className="mb-4 ui-label text-gold">
                {f.featuredLabel} · {f.featured.date}
              </p>
              {/* The feast's own name, and the largest thing inside the plate.
                  30px flat was the phone value too, and inside a card that is
                  now `p-6` on a 390px screen the column is about 294px wide —
                  narrow enough that a long name broke to three lines. The clamp
                  gives back a line without taking it below the size a name of
                  this weight wants; it reaches the 30px it was drawn at just as
                  `md` takes the panel back to two columns. */}
              <h3 className="mb-4 font-serif text-[clamp(1.7rem,6.8vw,1.875rem)] leading-tight text-white md:mb-5 md:text-4xl lg:text-5xl">
                {f.featured.name}
              </h3>
              <p className="mb-7 text-[0.98rem] leading-relaxed text-white/70 md:mb-9 md:text-base">
                {f.featured.body}
              </p>

              {/* The ten days, as a ladder. */}
              <ol className="relative border-t border-white/10 pt-7">
                <span
                  className="absolute bottom-2 left-[3px] top-9 w-px bg-linear-to-b from-gold/45 via-gold/25 to-transparent"
                  aria-hidden="true"
                />
                {f.featured.schedule.map((row) => (
                  <li key={row.when} className="relative flex gap-5 pb-5 last:pb-0">
                    <span
                      className="relative mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-gold ring-4 ring-navy"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 sm:flex sm:gap-5">
                      <span className="block shrink-0 ui-label leading-relaxed text-gold sm:w-44">
                        {row.when}
                      </span>
                      <span className="mt-1 block text-[0.95rem] leading-relaxed text-white/85 sm:mt-0">
                        {row.detail}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
