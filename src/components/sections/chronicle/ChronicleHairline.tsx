"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { gsap, onPhone, revealStart, revealDuration, revealTravel } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { CHRONICLE_FRAMES } from "@/lib/chronicle";
import { ChronicleHeader } from "./ChronicleHeader";

/**
 * VARIANT B — the hairline chronicle.
 *
 * One gold rule down the page with the years hung off it. No cards, no frames,
 * no boxes: the only graphic device in the whole section is a line, and that is
 * the point — every other section of this home page is made of rectangles with
 * rounded corners, and this one is made of a line.
 *
 * THREE THINGS IT DOES THAT THE OTHER TWO DO NOT.
 *
 *   1. IT IS READABLE AT A GLANCE. Seven years and seven titles are visible in
 *      one column with no interaction at all — no swiping, no scrubbing, no
 *      page-turning. A reader who scrolls straight past still absorbs 1685,
 *      1745, 1803, 1872, 1926, 2022 in peripheral vision, and those numbers are
 *      the argument.
 *   2. IT COSTS NOTHING. No pin, no horizontal transform, no measurement of
 *      anything. It cannot break on a narrow window or a short one; it is the
 *      same object at every size.
 *   3. IT ENDS UNFINISHED IN THE MOST LITERAL WAY AVAILABLE. The rule does not
 *      stop at the last year — it runs on past it and fades out, with the door
 *      standing where the eye has already been sent. See `runOff` below.
 *
 * THE LINE DRAWS ITSELF as the section passes, scrubbed off scroll rather than
 * played on a timer, so it tracks the reader's own pace. Purely decorative: the
 * years are in the DOM whether or not that ever runs.
 */
export function ChronicleHairline() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLSpanElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The rule draws downward with the scroll. `transformOrigin` top, scaleY
      // rather than height, so it never triggers layout.
      if (inkRef.current) {
        gsap.fromTo(
          inkRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: railRef.current,
              // Scrubbed, so this is a mapping and not a moment — but on a
              // phone the rule should be drawing by the time the first entry
              // is read, and the lag has to be short enough to survive a flick.
              start: onPhone() ? "top 95%" : "top 78%",
              end: "bottom 65%",
              scrub: onPhone() ? 0.4 : 0.8,
            },
          },
        );
      }

      // Each entry arrives from the side of the rule it sits on.
      railRef.current?.querySelectorAll(".chron-entry").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -revealTravel(26), opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: revealDuration(0.85),
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 86%"),
              toggleActions: "play none none none",
            },
          },
        );
      });

      // The node on the rule fills as it is reached.
      railRef.current?.querySelectorAll(".chron-node").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: revealDuration(0.5),
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 84%"),
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  const frames = t.home.chronicleFrames;

  return (
    <section
      ref={sectionRef}
      className="parchment-sheen section-padding relative overflow-hidden bg-cream"
    >
      <div className="light-shaft absolute -top-16 left-[8%] h-[120%] w-[40%] rotate-6" />

      {/* Trailing `!`, not leading — this is Tailwind v4, where the important
          modifier goes at the end. `!max-w-3xl` silently does nothing. */}
      <ChronicleHeader className="max-w-3xl!" />

      {/* ⚠ THE GEOMETRY IS EXACT AND THE NUMBERS ARE COUPLED. The entry grid is
          `[7rem_1fr]` with a 2rem gap, so the year column ends at 7rem, the
          content starts at 9rem, and the rule belongs in the middle of that gap
          at 8rem — which is why the rule, every node and the closing indent all
          carry 8rem/9rem and not round numbers. Change the grid and all four
          must move together, or the years will drift off their own line. */}
      <div className="mx-auto mt-16 max-w-3xl px-6">
        <div ref={railRef} className="relative">
          {/* ── The rule ─────────────────────────────────────────────────────
              Between the years and the entries on desktop, hard left on a
              phone, so the years always read AGAINST it rather than across it. */}
          <div className="pointer-events-none absolute bottom-0 left-[0.4rem] top-0 w-px bg-gold/15 sm:left-32">
            <span ref={inkRef} className="block h-full w-px origin-top bg-gold-dark/50" />
          </div>

          <ol className="space-y-12 md:space-y-14">
            {frames.map((frame, i) => {
              const meta = CHRONICLE_FRAMES[i];
              return (
                <li key={i} className="relative">
                  {/* The node, centred on the rule. */}
                  <span className="chron-node absolute left-[0.4rem] top-2.5 z-10 block h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold-dark ring-4 ring-cream sm:left-32" />

                  <div className="chron-entry grid grid-cols-1 gap-x-8 pl-8 sm:grid-cols-[7rem_1fr] sm:pl-0">
                    {/* The year, right-aligned into the rule. Tabular figures so
                        1685 and 1872 share a stem position and the column reads
                        as a scale rather than a list. */}
                    <p className="mb-3 font-display text-lg leading-none text-gold-dark tabular-nums sm:mb-0 sm:text-right sm:text-xl">
                      {frame.year}
                    </p>

                    <Link href={meta.href} className="group block">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                        {/* The painting, small. It is evidence that the chapter
                            exists, not the reason to read the line. */}
                        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl ring-1 ring-gold/25 sm:aspect-square sm:w-28">
                          <Image
                            src={`/images/history/${meta.photo}`}
                            alt={frame.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 7rem"
                            className="object-cover saturate-[0.92] transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="font-display text-[0.55rem] uppercase tracking-[0.26em] text-text-muted">
                            {frame.chapter}
                          </p>
                          <h3 className="mt-2 font-serif text-2xl leading-tight text-navy transition-colors duration-500 group-hover:text-gold-dark md:text-[1.7rem]">
                            {frame.title}
                          </h3>
                          <p className="mt-3 font-serif text-[1.02rem] leading-relaxed text-text-muted">
                            {frame.line}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ── The run-off ──────────────────────────────────────────────────
              The rule does not stop at 2022. It carries on below the last year
              and fades out, which is this variant's whole open loop said in one
              graphic: there is more line than there are years shown. */}
          <div className="relative mt-2 h-24">
            <span className="absolute left-[0.4rem] top-0 h-full w-px -translate-x-px bg-linear-to-b from-gold-dark/45 to-transparent sm:left-32" />
          </div>

          {/* The door, indented to where the entries start (9rem), so it reads
              as the next thing on the line rather than a new block. */}
          <div className="pl-8 sm:pl-36">
            <p className="font-serif text-2xl leading-tight text-navy md:text-3xl">
              {t.home.chronicleDoorTitle}
            </p>
            <p className="mt-3 max-w-lg font-serif text-lg leading-relaxed text-text-muted">
              {t.home.chronicleDoorBody}
            </p>
            <Link
              href="/history"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-display text-[0.7rem] uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-gold hover:text-navy"
            >
              {t.home.chronicleCta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
