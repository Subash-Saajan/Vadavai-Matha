"use client";

import { useRef, useEffect } from "react";
import { ResidentImage } from "@/components/ResidentImage";
import { Link } from "@/components/LocaleLink";
import {
  gsap,
  DESKTOP,
  revealY,
  revealStart,
  revealDuration,
  revealDelay,
} from "@/lib/gsap";
import { Sunrise, Church, MoonStar, DoorOpen, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { ANNUAL_FEAST, FEASTS, nextFeastIndices, useToday } from "@/lib/feasts";
import { SCHEDULE } from "@/lib/contact";
import { formatClock } from "@/lib/formatTime";

/**
 * VI · The parish rhythm — the year and the week, in one section.
 *
 * WHY THESE ARE NOW ONE SECTION. They were two, FestivalsTeaser and MassTimes,
 * and they pointed at the same page: /mass-timings. Two full screens of
 * scrolling bought one destination, on a page that had six sections and three
 * destinations in total. Merging them is what made room for the Chronicle and
 * the Fathers without the page getting longer.
 *
 * THE TWO BANDS ARE DELIBERATELY UNEQUAL. The year gets photographs, because a
 * feast is something you would travel for and a picture is what decides that.
 * The week gets a compact plate of times, because a Mass time is something you
 * check, not something you admire — the old version gave it three large cards
 * with an icon apiece, which is a lot of furniture for nine lines of numbers.
 *
 * The originals are still in the tree (FestivalsTeaser.tsx, MassTimes.tsx) and
 * are now unimported. MassTimes is still exported with `withCta` because it was
 * built to be reusable; nothing on the site uses it today.
 *
 * ⚠ NO HOUR IS WRITTEN OUT IN THIS FILE ANY MORE. Every time in the week band
 * is assembled from `SCHEDULE` in lib/contact.ts and typeset by `formatClock`,
 * which is what /mass-timings and /contact already do. This was the last
 * surface on the site still hand-writing its own hours, and it had drifted
 * badly — see the note over the week band below. Words come from i18n; numbers
 * come from SCHEDULE; neither is ever retyped here.
 */

/**
 * ⚠ THE BAND-ONE CARDS ARE NO LONGER THE FIRST THREE OF THE CALENDAR.
 *
 * They were three large 3:4 photographs of whatever happened to sit at the top
 * of `t.festivals.list` — St Sebastian, the Presentation, de Britto — which
 * meant that in September a reader was shown three feasts that had gone past in
 * January and February. Now the band shows FIVE small cards:
 *
 *   · card one is always the parish's own annual feast (t.festivals.featured),
 *     the same feast /mass-timings gives its big navy plate to. It is the
 *     church's feast, so it is pinned first whatever the date;
 *   · cards two to five are the next four feasts due, counted from today, and
 *     they wrap round the year (a feast already running counts as due now).
 *
 * The dates and photographs behind that ordering live in `lib/feasts.ts`, which
 * is the site's single machine-readable copy of the parish calendar — the
 * strings in i18n.ts are localised prose and cannot be parsed. /mass-timings
 * reads the same table.
 */
const FEATURED_IMG = ANNUAL_FEAST.img;
const SLOTS = 4; // feasts shown after the pinned annual feast

export function ParishRhythm() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const weekRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  const today = useToday();
  const upcoming = nextFeastIndices(today, SLOTS);

  /* ── THE WEEK BAND ────────────────────────────────────────────────────────
     ⚠ WHAT THIS BAND USED TO SAY, AND WHY IT IS GONE.
     The third column was headed "Adoration & Novena" and listed a Wednesday at
     5:00 PM, a Friday at 6:00 PM and a First Saturday at 4:00 PM. Not one of
     those three hours exists in any source this site holds, and all three
     contradict /mass-timings, which gives the daily Rosary at 6:30 PM and the
     Benediction at 7:00 PM, and puts the month's Marian adoration on the First
     Saturday at 6:30 PM (t.mass.devotions) — not at four in the afternoon. The
     home page is the first thing a pilgrim reads, and it was sending them to
     the church on evenings when nothing is said. The evening the shrine
     actually keeps is stated instead.

     The two Mass columns were right, but were typed out twice — once here in
     both languages, once in SCHEDULE — and the first said only "Daily Mass",
     with nothing on the home page saying that it means Monday to Saturday.
     Each column now carries its own span beneath its name.

     Headings are `t.mass.cards`, the parish's own naming of its three standing
     services, already written in both languages; the hours are SCHEDULE. */
  const v = t.contact.visit;
  const [weekdayCard, sundayCard, eveningCard] = t.mass.cards;

  /* "Sundays from 5:30 PM" — English leads with the preposition, Tamil closes
     with "முதல்", so it is built from a lead and a tail either of which may be
     empty. The same idiom as VisitWindow and mass.week.fromLead / fromTail. */
  const sundayDevotion = [
    v.sundayDevotionsLead,
    formatClock(SCHEDULE.devotions.sundayStart, lang),
    v.sundayDevotionsTail,
  ]
    .filter(Boolean)
    .join(" ");

  /* "Open daily, 9:00 AM – 8:00 PM". It says OPEN, not "adoration at" — the
     only thing any source gives for the Eucharistic chapel is its opening
     hours. See the note on these keys in i18n.ts. */
  const chapelHours = [
    v.chapelOpenLead,
    `${formatClock(SCHEDULE.chapel.open, lang)} – ${formatClock(SCHEDULE.chapel.close, lang)}`,
    v.chapelOpenTail,
  ]
    .filter(Boolean)
    .join(" ");

  const schedule = [
    {
      icon: Sunrise,
      title: weekdayCard.title,
      span: weekdayCard.subtitle,
      lines: SCHEDULE.weekdayMass.map((at) => ({ time: formatClock(at, lang), name: "" })),
    },
    {
      icon: Church,
      title: sundayCard.title,
      span: sundayCard.subtitle,
      lines: SCHEDULE.sundayMass.map((at) => ({ time: formatClock(at, lang), name: "" })),
    },
    {
      icon: MoonStar,
      title: eveningCard.title,
      span: eveningCard.subtitle,
      // Named, unlike the two Mass columns: bare numbers under "Evening
      // Devotion" say nothing about which is the beads and which the Blessed
      // Sacrament. The Sunday line is the exception the other six days need —
      // it is the one thing about this week /contact was once wrong about.
      lines: [
        { time: formatClock(SCHEDULE.devotions.rosary, lang), name: t.mass.week.rosaryLabel },
        {
          time: formatClock(SCHEDULE.devotions.benediction, lang),
          name: t.mass.week.benedictionLabel,
        },
        { time: sundayDevotion, name: "" },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const from = revealY();
      const reveal = (el: Element, delay = 0) =>
        gsap.fromTo(
          el,
          { y: from, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(0.95),
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 90%"),
              toggleActions: "play none none none",
            },
          },
        );

      headerRef.current
        ?.querySelectorAll(".reveal-item")
        .forEach((el, i) => reveal(el, revealDelay(i, 0.1)));
      weekRef.current
        ?.querySelectorAll(".week-col")
        .forEach((el, i) => reveal(el, revealDelay(i, 0.1)));

      const cards = Array.from(cardsRef.current?.children ?? []);
      cards.forEach((el, i) => reveal(el, revealDelay(i, 0.12)));

      /* Desktop only: the offset drift across the five cards. Five more
         per-frame transforms in a section that also carries the week plate;
         and on a phone the cards are two-across, so a 3%-versus-8% offset
         between neighbours reads as a grid that has come loose rather than as
         depth — the effect needs the five-wide row to make sense of itself.
         See lib/gsap.ts. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        cards.forEach((el, i) => {
          gsap.to(el, {
            yPercent: i % 2 === 0 ? -3 : -8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      });
      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
    // `today` is in here so the tweens are rebuilt after the order settles on
    // the first client render — otherwise the cards that swap in, which are new
    // DOM nodes, carry no reveal at all.
  }, [lang, today]);

  return (
    <section
      ref={sectionRef}
      className="parchment-sheen section-padding relative overflow-hidden bg-cream"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 select-none text-[7rem] opacity-[0.06] md:right-12 md:text-[12rem]">
        VI
      </span>

      <div className="relative mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-14 max-w-2xl">
          <p className="reveal-item kicker mb-5">{t.home.rhythmLabel}</p>
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-tight text-navy md:text-5xl lg:text-6xl">
            {t.home.rhythmTitle}
          </h2>
          <p className="reveal-item mt-5 text-[0.98rem] leading-relaxed text-text-muted md:text-lg">
            {t.home.festivalsBody}
          </p>
        </div>

        {/* ── Band one: the year ──────────────────────────────────────────── */}
        {/* The two band labels were 0.6rem — 9.6px — at 0.3em. Up and in on a
            phone, as everything else small-cap on this page is. */}
        <p className="mb-6 flex items-center gap-4 font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-dark md:text-[0.6rem] md:tracking-[0.3em]">
          {t.home.rhythmYearBand}
          <span className="h-px flex-1 bg-gold/25" />
        </p>

        {/* Five narrow cards, not three tall ones. The annual feast is card one
            and is ringed in gold; the rest are whatever falls next. */}
        <div ref={cardsRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          <Link
            href="/mass-timings#festivals"
            className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-navy ring-1 ring-gold/40 md:will-change-transform"
          >
            <ResidentImage
              src={FEATURED_IMG}
              alt={t.festivals.featured.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              // Portrait source, and the monstrance under its canopy sits high in
              // the frame — bias the crop up so it survives the narrow card.
              className="object-cover object-[50%_32%] transition-transform duration-[1.4s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-night-deep/95 via-navy/35 to-transparent" />
            {/* ── THE CARD TEXT WAS 8–9px ON A PHONE ────────────────────────
                These sizes were chosen for a five-across row on a monitor,
                where each card is about 250px wide. On a phone the row is two
                across, so the card is roughly 164px and the text inside it was
                a 0.5rem label (8px) over a 0.55rem date (8.8px) — smaller than
                anything else on the site, on the one card carrying a date
                somebody might travel for. Up on both, and the padding comes in
                to `p-3` so the name still gets its width back. */}
            <span className="absolute left-3 top-3 rounded-full bg-gold/95 px-2.5 py-1 font-display text-[0.58rem] uppercase tracking-[0.1em] text-navy md:text-[0.5rem] md:tracking-[0.16em]">
              {t.festivals.featuredLabel}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
              <p className="mb-1.5 font-display text-[0.62rem] uppercase tracking-[0.14em] text-gold md:text-[0.55rem] md:tracking-[0.22em]">
                {t.festivals.featured.date}
              </p>
              <h3 className="font-serif text-[1.02rem] leading-snug text-white md:text-base">
                {t.festivals.featured.name}
              </h3>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-700 group-hover:ring-gold/50" />
          </Link>

          {upcoming.map((i) => {
            const item = t.festivals.list[i];
            return (
              <Link
                key={item.name}
                href="/mass-timings#festivals"
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-navy ring-1 ring-gold/10 md:will-change-transform"
              >
                <ResidentImage
                  src={FEASTS[i].img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-night-deep/95 via-navy/30 to-transparent" />
                {/* Same sizes as the featured card above — see the note there. */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <p className="mb-1.5 font-display text-[0.62rem] uppercase tracking-[0.14em] text-gold md:text-[0.55rem] md:tracking-[0.22em]">
                    {item.date}
                  </p>
                  <h3 className="font-serif text-[1.02rem] leading-snug text-white md:text-base">
                    {item.name}
                  </h3>
                </div>
                <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 transition-all duration-700 group-hover:ring-gold/30" />
              </Link>
            );
          })}
        </div>

        {/* ── Band two: the week ──────────────────────────────────────────── */}
        <p className="mb-6 mt-16 flex items-center gap-4 font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-dark md:text-[0.6rem] md:tracking-[0.3em]">
          {t.home.rhythmWeekBand}
          <span className="h-px flex-1 bg-gold/25" />
        </p>

        {/* The ref sits on a wrapper rather than on the plate itself, so the
            chapel line beneath the plate falls inside the `.week-col` reveal
            query too — it is the last thing in the band and arrives with it. */}
        <div ref={weekRef}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-gold/20 ring-1 ring-gold/20 sm:grid-cols-3">
            {schedule.map((item) => {
              const Icon = item.icon;
              // `p-5` on a phone. The plate is one column there, so the 28px
              // desktop padding is buying nothing but height on the section
              // people actually come to this page to read. The times themselves
              // go UP: a Mass time is the one thing on this page someone reads
              // at five in the morning.
              return (
                // No `backdrop-blur-sm`. It sat behind a 90%-opaque white fill,
                // over a flat cream section — so it was blurring a tenth of a
                // colour into itself, which is nothing, in exchange for three
                // more elements asking the compositor to read back and filter
                // what is under them on every frame the page moves.
                <div key={item.title} className="week-col bg-white/90 p-5 md:p-7">
                  <div className="mb-4 flex items-start gap-3">
                    <Icon className="mt-1 h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
                    <div className="min-w-0">
                      <h3 className="font-serif text-[1.05rem] text-navy md:text-lg">
                        {item.title}
                      </h3>
                      {/* WHICH DAYS. "Daily Mass" and "Sunday Mass" standing
                          side by side left the first meaning either every day
                          or the six that are not Sunday, and the plate never
                          said which. Getting that wrong sends somebody to a
                          church on the wrong morning. */}
                      <p className="micro-label mt-1 text-gold-dark/80">{item.span}</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 md:space-y-2">
                    {item.lines.map((line) => (
                      <li
                        key={line.time}
                        className="flex items-baseline gap-2.5 text-[0.98rem] text-text-muted md:text-[0.95rem]"
                      >
                        <span
                          className="relative top-[-0.2em] h-1 w-1 shrink-0 rounded-full bg-gold"
                          aria-hidden="true"
                        />
                        <span className="tabular-nums">{line.time}</span>
                        {/* The name of the service, one step down and one step
                            lighter, so the hour still leads the line. Only the
                            evening column carries them — see the note above. */}
                        {line.name && (
                          <span className="min-w-0 text-[0.86rem] text-text-muted/70 md:text-[0.82rem]">
                            {line.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* The one thing about the shrine's week that is not a service: the
              hours the chapel simply stands open. A fourth fact, and not a
              fourth column — the plate is three services, and this is a door. */}
          <p className="week-col mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.92rem] text-text-muted md:text-[0.88rem]">
            <DoorOpen className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
            <span className="text-navy/75">{v.chapel}</span>
            <span className="text-gold/60" aria-hidden="true">
              ·
            </span>
            <span className="tabular-nums">{chapelHours}</span>
          </p>
        </div>

        {/* One CTA for the whole section, because both bands open the same page.
            Two CTAs to one destination is the redundancy this merge removed. */}
        <div className="mt-10">
          <Link
            href="/mass-timings"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-display text-[0.78rem] uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-gold hover:text-navy md:text-[0.7rem] md:tracking-[0.2em]"
          >
            {t.home.rhythmCta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
