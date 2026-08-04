"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { cappedSizes } from "@/lib/imageSizes";
import { gsap, DESKTOP } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "@/hooks/useReveal";
import { FEASTS, nextFeastIndex, useToday, waitFor } from "@/lib/feasts";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";

/**
 * V — THE EIGHT PARISH FEASTS.
 *
 * ⚠ THIS IS A GRID ON PURPOSE, AND IT IS NOT TO BE TURNED BACK INTO A TIMELINE.
 * It was briefly built as a calendar spine — the feasts hung alternately either
 * side of a hairline running the length of the section, with the month cut into
 * it where the month changed. It read well and it was four times too tall:
 * eight entries at roughly a screen apiece, for eight facts a reader wants to
 * SCAN, not walk. The owner asked for it back as an ordinary grid, and the grid
 * is right — this is a lookup. /history is where the site walks a reader
 * through time.
 *
 * What the rebuild kept, so that "ordinary grid" does not mean "plain":
 *
 *   · THE NEXT FEAST IS MARKED, and one being kept today is marked differently.
 *     Which one is coming is the question this section is actually asked, and
 *     the original grid answered it nowhere. The ordering comes from
 *     lib/feasts.ts — the same table the home page reads — so the two can never
 *     disagree. `waitFor(i) === 0` means it is running TODAY.
 *   · the house corner ornaments, a gold ring that closes on hover, the slow
 *     photograph zoom, and a gentle desktop-only drift so the rows do not sit
 *     like a contact sheet.
 */
export function TheYear() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const f = t.festivals;

  useReveal(ref, lang);

  const today = useToday();
  const soonest = nextFeastIndex(today);

  /* A small alternating offset, so eight equal boxes are not a perfect ledger.
     Desktop only, per the rule in lib/gsap.ts: this is decoration, and on a
     phone the grid is a single column where a drift does nothing but cost
     frames. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>(".feast-card", gridRef.current).forEach((el, i) => {
          gsap.to(el, {
            yPercent: i % 2 === 0 ? -2.5 : -6,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      });
      return () => mm.revert();
    }, gridRef);

    return () => ctx.revert();
  }, [lang, today]);

  return (
    <section
      ref={ref}
      id="year"
      className="parchment-swell section-padding relative scroll-mt-24 overflow-hidden"
    >
      <span
        className="section-numeral pointer-events-none absolute -top-6 right-4 select-none text-[7rem] opacity-[0.06] md:right-12 md:text-[12rem]"
        aria-hidden="true"
      >
        V
      </span>

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-8 max-w-2xl md:mb-14">
          <p className="reveal-item kicker mb-5">{t.mass.overture.year}</p>
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-tight text-navy md:text-5xl lg:text-6xl">
            {f.yearLabel}
          </h2>
        </header>

        {/* ⚠ ONE COLUMN ON A PHONE IS DELIBERATE, unlike the home page's feast
            row, which is two-across. These cards carry a sentence of body copy
            over the photograph as well as the date and the name; at two-across
            on a 390px screen each card is about 165px wide, and that sentence
            becomes four words a line over a picture. The eight cards are a
            lookup, so what they need instead is to be quick to pass — hence the
            tighter gutter and the tighter card padding below. */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          {f.list.map((item, i) => {
            const running = today !== 0 && waitFor(i, today) === 0;
            const isNext = i === soonest;

            /* `md:will-change-transform` on the card, not a bare one: the drift
               these cards were promised is desktop-only (see the effect above),
               and eight permanent compositor layers, each holding a full-width
               photograph, is a real cost on a phone for motion that is never
               built there. */
            return (
              <article
                key={item.name}
                className={`feast-card reveal-item group relative aspect-4/3 overflow-hidden rounded-2xl bg-navy ring-1 md:will-change-transform ${
                  isNext || running ? "ring-gold/50" : "ring-gold/10"
                }`}
              >
                <Image
                  src={FEASTS[i].img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  sizes={cappedSizes("(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw")}
                />
                <div className="absolute inset-0 bg-linear-to-t from-night-deep/95 via-navy/45 to-transparent" />
                <PhotoOrnaments corners="diagonal" size="[--orn:2.25rem] md:[--orn:3rem]" />

                {(running || isNext) && (
                  <span className="micro-label absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-navy">
                    {running ? f.nowBadge : f.nextBadge}
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="micro-label mb-1.5 text-gold md:mb-2">{item.date}</p>
                  <h3 className="mb-1.5 font-serif text-xl leading-snug text-white md:mb-2">
                    {item.name}
                  </h3>
                  {/* Left at 14px. It is already at the small-note size and it
                      sits over a photograph, where anything smaller stops being
                      readable at all — the padding is what came in, not this. */}
                  <p className="text-sm leading-relaxed text-white/70">{item.body}</p>
                </div>

                {/* The frame closes in gold as the eye lands on it. */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-700 group-hover:ring-gold/45"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
