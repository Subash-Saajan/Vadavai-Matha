"use client";

import { useEffect, useRef } from "react";
import { Sunrise, Moon } from "lucide-react";

import { gsap, DESKTOP } from "@/lib/gsap";
import { SCHEDULE } from "@/lib/contact";
import { formatClock } from "@/lib/formatTime";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "@/hooks/useReveal";
import { useIstMinutes } from "@/hooks/useShrineClock";

/**
 * I — THE DAY, DRAWN AS AN ARC.
 *
 * This replaced three identical cards ("Daily Mass", "Sunday Mass", "Evening
 * Devotion") that each listed a few times under an icon. Cards say WHAT; they
 * cannot say WHEN-relative-to-what, and the shape of this shrine's day is the
 * interesting thing about it: everything happens at the two ends. Two Masses
 * before the sun is properly up, nothing scheduled for eleven hours while the
 * chapel simply stands open, then the beads and Benediction at dusk. Laid on a
 * line, that reads in one glance.
 *
 * ⚠ EVERY TIME ON THIS PAGE COMES FROM `SCHEDULE` IN lib/contact.ts, and is
 * typeset by `formatClock`. Nothing here restates an hour. The parish changing
 * a Mass time must be a one-line edit in one file, because these numbers are
 * the thing a reader may act on at five in the morning.
 *
 * THE SCALE IS PIECEWISE, NOT LINEAR, and that is a deliberate stretch of about
 * two hours. On a true ruler 6:30 PM and 7:00 PM land 3% apart and collide,
 * while two-thirds of the band is empty afternoon. The three anchors below
 * stretch the two ends and compress the middle, so the morning, the open day
 * and the evening each get room to be read. The axis is labelled by watch —
 * first light, the chapel, nightfall — never by an hour ruler, so nothing on it
 * claims to be measurable.
 */

/** [minutes past midnight, position along the band] — interpolated between. */
const ANCHORS: readonly [number, number][] = [
  [4 * 60 + 30, 0], // 4:30 — first light
  [7 * 60, 30], // 7:00 — the morning Masses are done
  [17 * 60 + 30, 62], // 5:30 PM — the day turns to evening
  [20 * 60 + 30, 100], // 8:30 PM — nightfall, chapel shut
];

const DAY_START = ANCHORS[0][0];
const DAY_END = ANCHORS[ANCHORS.length - 1][0];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function placeMinutes(mins: number): number {
  if (mins <= DAY_START) return 0;
  for (let i = 1; i < ANCHORS.length; i++) {
    const [t0, p0] = ANCHORS[i - 1];
    const [t1, p1] = ANCHORS[i];
    if (mins <= t1) return p0 + ((mins - t0) / (t1 - t0)) * (p1 - p0);
  }
  return 100;
}

/** Where a clock time sits along the band, as a percentage. */
const place = (hhmm: string) => placeMinutes(toMinutes(hhmm));

/* The four fixed points of the ordinary day.
   · `above` alternates so that two marks only minutes apart (the Rosary and
     the Benediction) never share a lane and never collide.
   · `trail` hangs the plate to the LEFT of its node instead of the right. The
     two evening marks sit at 75% and 81% of the band, and a plate running
     rightward from there is off the edge of the section — clipped by its
     `overflow-hidden` — at every window narrower than about 1400px. */
const MARKS = [
  { at: SCHEDULE.weekdayMass[0], key: "massFirst", above: true, trail: false },
  { at: SCHEDULE.weekdayMass[1], key: "massSecond", above: false, trail: false },
  { at: SCHEDULE.devotions.rosary, key: "rosary", above: true, trail: true },
  { at: SCHEDULE.devotions.benediction, key: "benediction", above: false, trail: true },
] as const;

export function TheDay() {
  const ref = useRef<HTMLElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const d = t.mass.day;

  useReveal(ref, lang);

  const nowMins = useIstMinutes();
  /* Only drawn while the shrine's day is actually on the band. At 2 AM the
     marker would otherwise pin itself to the left edge and read as "Mass now". */
  // Clamped off the very edges so the centred "Now" caption is never half cut
  // off by the section's own `overflow-hidden` in the last half-hour of light.
  const nowAt =
    nowMins !== null && nowMins > DAY_START && nowMins < DAY_END
      ? Math.min(97, Math.max(3, placeMinutes(nowMins)))
      : null;

  const chapelStart = place(SCHEDULE.chapel.open);
  const chapelEnd = place(SCHEDULE.chapel.close);

  /* The arc's own choreography — drawn, not merely faded in. The axis runs out
     from first light, the nodes strike in order, the open-chapel bar unrolls
     behind them. Separate from `useReveal`, which only does the house
     rise-and-fade on `.reveal-item`.

     ⚠ EVERY ANIMATED NODE HERE OWNS ITS WHOLE `transform`. GSAP writes the
     transform property outright, so a Tailwind `-translate-x-1/2` on the same
     element is silently discarded the moment a tween starts — which is why the
     centring lives on a wrapper and the tween on the child.

     ⚠ DESKTOP ONLY, AND NOT FOR THE USUAL REASON. This is an entrance, not a
     scrubbed parallax, so the sitewide rule would keep it. It is gated because
     THE ARC IT ANIMATES DOES NOT EXIST BELOW `md` — the wrapper is
     `hidden md:block`, and the phone is given the stacked <ol> underneath
     instead. Building it anyway meant a phone paid for a timeline of seven
     staggered groups, plus a ScrollTrigger measuring a display:none element
     that reports zero height at whatever scroll position it happens to be
     created at, for motion nobody could see. The stacked list has the house
     `.reveal-item` treatment through `useReveal`, which still runs on every
     device — the section is not left motionless. */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const q = gsap.utils.selector(arcRef);
        const axis = q(".arc-axis");
        const bar = q(".arc-chapel");
        const nodes = q(".arc-node");
        const stemsUp = q(".arc-stem-up");
        const stemsDown = q(".arc-stem-down");
        const plates = q(".arc-plate");
        const caps = q(".arc-cap");
        const marker = q(".arc-now");

        if (reduced) {
          gsap.set([axis, bar], { scaleX: 1 });
          gsap.set([stemsUp, stemsDown], { scaleY: 1 });
          gsap.set([nodes, caps], { scale: 1, opacity: 1 });
          gsap.set([plates, marker], { opacity: 1, y: 0 });
          return;
        }

        gsap.set([axis, bar], { scaleX: 0, transformOrigin: "left center" });
        gsap.set(stemsUp, { scaleY: 0, transformOrigin: "center bottom" });
        gsap.set(stemsDown, { scaleY: 0, transformOrigin: "center top" });
        gsap.set([nodes, caps], { scale: 0, opacity: 0 });
        gsap.set(plates, { opacity: 0, y: 12 });
        gsap.set(marker, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: arcRef.current, start: "top 78%", once: true },
        });

        tl.to(axis, { scaleX: 1, duration: 1.5, ease: "power2.inOut" })
          .to(bar, { scaleX: 1, duration: 1.1, ease: "power2.out" }, "-=0.9")
          .to(caps, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }, "-=1.2")
          .to(
            nodes,
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.4)", stagger: 0.13 },
            "-=1.0",
          )
          .to(
            [...stemsUp, ...stemsDown],
            { scaleY: 1, duration: 0.45, ease: "power2.out", stagger: 0.13 },
            "<0.06",
          )
          .to(
            plates,
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.13 },
            "<0.05",
          )
          .to(marker, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3");
      });
      return () => mm.revert();
    }, arcRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={ref}
      id="day"
      className="parchment-sheen section-padding relative scroll-mt-24 overflow-hidden bg-cream"
    >
      <span
        className="section-numeral pointer-events-none absolute -top-6 left-4 select-none text-[7rem] opacity-[0.06] md:left-12 md:text-[12rem]"
        aria-hidden="true"
      >
        I
      </span>

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl md:mb-20">
          <p className="reveal-item kicker mb-5">{d.label}</p>
          {/* `text-4xl` was the phone size as well as the tablet one — 36px of
              Cormorant in a 340px column. The clamp holds the title at a share
              of the screen instead and tops out at the 36px it was drawn at,
              exactly as `md` takes over. Sitewide scale, set in Patroness. */}
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-tight text-navy md:text-5xl lg:text-6xl">
            {d.title}
          </h2>
          <p className="reveal-item mt-5 text-[0.98rem] leading-relaxed text-text-muted md:mt-6 md:text-lg">
            {d.body}
          </p>
        </header>

        {/* ── The arc, on anything wider than a phone ────────────────────── */}
        <div ref={arcRef} className="relative hidden md:block">
          <div className="relative h-76 lg:h-84">
            {/* Sky wash: night at both ends, daylight through the middle. */}
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "linear-gradient(90deg, rgba(10,19,34,0.10) 0%, rgba(236,210,138,0.30) 22%, rgba(255,252,244,0.55) 48%, rgba(196,160,73,0.26) 78%, rgba(10,19,34,0.12) 100%)",
              }}
              aria-hidden="true"
            />

            {/* The axis, and the band of open chapel lying behind it. */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              <div
                className="absolute -translate-y-1/2"
                style={{ left: `${chapelStart}%`, width: `${chapelEnd - chapelStart}%` }}
                aria-hidden="true"
              >
                <div className="arc-chapel h-9 rounded-full bg-linear-to-r from-gold/5 via-gold/20 to-gold/5 ring-1 ring-gold/20" />
              </div>
              <div
                className="arc-axis h-px w-full bg-linear-to-r from-gold-dark/20 via-gold-dark/60 to-gold-dark/20"
                aria-hidden="true"
              />
              <p
                className="pointer-events-none absolute top-3 -translate-x-1/2 micro-label whitespace-nowrap text-gold-dark/70"
                style={{ left: `${(chapelStart + chapelEnd) / 2}%` }}
              >
                {d.chapelOpen}
              </p>
            </div>

            {/* End caps — the day's two horizons. */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <span className="arc-cap block text-gold-dark">
                <Sunrise className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="absolute left-0 top-7 micro-label whitespace-nowrap text-text-muted/70">
                {d.firstLight}
              </span>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <span className="arc-cap block text-gold-dark">
                <Moon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="absolute right-0 top-7 micro-label whitespace-nowrap text-text-muted/70">
                {d.nightfall}
              </span>
            </div>

            {/* The four fixed points. A plate hangs off its node's left or
                right edge — never centred on it, which would throw the 5 AM
                plate clean off the band. See `trail` on MARKS above. */}
            {MARKS.map(({ at, key, above, trail }) => {
              const mark = d.marks[key];
              return (
                <div
                  key={key}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${place(at)}%` }}
                >
                  <span
                    className="absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  >
                    <span className="arc-node block h-3 w-3 rounded-full bg-gold ring-4 ring-cream" />
                  </span>
                  <span
                    className={`absolute left-0 block h-14 w-px bg-gold/45 ${
                      above ? "arc-stem-up bottom-1.5" : "arc-stem-down top-1.5"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className={`arc-plate absolute w-44 lg:w-52 ${
                      above ? "bottom-16" : "top-16"
                    } ${trail ? "right-0 text-right" : "left-0"}`}
                  >
                    <p className="text-gradient-gold-deep font-serif text-2xl leading-none tabular-nums lg:text-3xl">
                      {formatClock(at, lang)}
                    </p>
                    <h3 className="mt-2 font-serif text-lg leading-snug text-navy">
                      {mark.title}
                    </h3>
                    <p className="mt-1 text-[0.8rem] leading-snug text-text-muted">
                      {mark.note}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Where the shrine is in its own day, right now. */}
            {nowAt !== null && (
              <div
                className="arc-now pointer-events-none absolute inset-y-8 w-px bg-linear-to-b from-transparent via-navy/45 to-transparent"
                style={{ left: `${nowAt}%` }}
                aria-hidden="true"
              >
                <span className="absolute -top-1 left-1/2 block h-2 w-2 -translate-x-1/2 rotate-45 bg-navy/60" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 micro-label whitespace-nowrap text-navy/55">
                  {d.now}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── The same day, stacked, on a phone ──────────────────────────── */}
        <ol className="md:hidden">
          {MARKS.map(({ at, key }, i) => {
            const mark = d.marks[key];
            return (
              <li key={key} className="reveal-item relative flex gap-5 pb-8">
                {/* The thread between the marks, stopping at the last. */}
                {i < MARKS.length - 1 && (
                  <span
                    className="absolute bottom-0 left-1.25 top-5 w-px bg-gold/25"
                    aria-hidden="true"
                  />
                )}
                <span
                  className="relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gold"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-gradient-gold-deep font-serif text-2xl leading-none tabular-nums">
                    {formatClock(at, lang)}
                  </p>
                  <h3 className="mt-1.5 font-serif text-lg leading-snug text-navy">
                    {mark.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-text-muted">{mark.note}</p>
                </div>
              </li>
            );
          })}
          <li className="reveal-item flex gap-5">
            <span
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-gold/50"
              aria-hidden="true"
            />
            <p className="text-sm leading-snug text-text-muted">
              <span className="micro-label text-gold-dark">
                {d.chapelOpen}
              </span>
              <span className="mt-1 block tabular-nums">
                {formatClock(SCHEDULE.chapel.open, lang)} –{" "}
                {formatClock(SCHEDULE.chapel.close, lang)}
              </span>
            </p>
          </li>
        </ol>

        {/* Sunday is the one day this arc does not describe — said plainly
            here rather than drawn twice. The week's own section is next. */}
        <p className="reveal-item mt-10 max-w-2xl border-l border-gold/35 pl-5 text-[0.95rem] italic leading-relaxed text-text-muted md:mt-20">
          {d.sundayNote}
        </p>
      </div>
    </section>
  );
}
