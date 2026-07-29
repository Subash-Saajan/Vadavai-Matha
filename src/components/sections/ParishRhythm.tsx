"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { gsap } from "@/lib/gsap";
import { Sunrise, Church, MoonStar, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";

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
 * ⚠ THE TIMES BELOW ARE COPIED FROM MassTimes.tsx UNCHANGED. They are the one
 * thing on this page a reader may act on at five in the morning. If the parish
 * changes a Mass time, this file and /mass-timings must change together.
 */

// Local imagery matched to the first three feasts of the calendar (St Sebastian,
// Presentation of the BVM, St John de Britto) — the same pairings /mass-timings
// uses, so the teaser and the page it opens agree.
const cards = [
  { img: "/images/vadavai-st-sebasthiyarchurch.jpg", key: 0 },
  { img: "/images/kannikai-matha-church.jpg", key: 1 },
  { img: "/images/de-britto-grotto.jpg", key: 2 },
];

export function ParishRhythm() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const weekRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  const schedule = [
    {
      icon: Sunrise,
      title: lang === "en" ? "Daily Mass" : "தினசரி திருப்பலி",
      times: lang === "en" ? ["5:00 AM", "6:10 AM"] : ["காலை 5:00", "காலை 6:10"],
    },
    {
      icon: Church,
      title: lang === "en" ? "Sunday Mass" : "ஞாயிறு திருப்பலி",
      times:
        lang === "en"
          ? ["5:00 AM", "7:00 AM", "9:30 AM"]
          : ["காலை 5:00", "காலை 7:00", "காலை 9:30"],
    },
    {
      icon: MoonStar,
      title: lang === "en" ? "Adoration & Novena" : "ஆராதனையும் நவநாளும்",
      times:
        lang === "en"
          ? ["Wednesday · 5:00 PM", "Friday · 6:00 PM", "First Saturday · 4:00 PM"]
          : ["புதன் · மாலை 5:00", "வெள்ளி · மாலை 6:00", "முதல் சனி · மாலை 4:00"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (el: Element, delay = 0) =>
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            delay,
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          },
        );

      headerRef.current?.querySelectorAll(".reveal-item").forEach((el, i) => reveal(el, i * 0.1));
      weekRef.current?.querySelectorAll(".week-col").forEach((el, i) => reveal(el, i * 0.1));

      Array.from(cardsRef.current?.children ?? []).forEach((el, i) => {
        // Gentle offset drift, kept smaller than the old teaser's: the cards now
        // share a section with a plate of Mass times, and a card that travels
        // 25% pulls the eye off the numbers underneath it.
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -6 : -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        reveal(el, i * 0.12);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  const feasts = t.festivals.list.slice(0, 3);

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
          <h2 className="reveal-item font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl">
            {t.home.rhythmTitle}
          </h2>
          <p className="reveal-item mt-5 text-lg leading-relaxed text-text-muted">
            {t.home.festivalsBody}
          </p>
        </div>

        {/* ── Band one: the year ──────────────────────────────────────────── */}
        <p className="mb-6 flex items-center gap-4 font-display text-[0.6rem] uppercase tracking-[0.3em] text-gold-dark">
          {t.home.rhythmYearBand}
          <span className="h-px flex-1 bg-gold/25" />
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((c, i) => {
            const item = feasts[i];
            return (
              <Link
                key={c.key}
                href="/mass-timings#festivals"
                className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-navy ring-1 ring-gold/10 will-change-transform md:aspect-[3/4]"
              >
                <Image
                  src={c.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-night-deep/95 via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="mb-2 font-display text-[0.6rem] uppercase tracking-[0.28em] text-gold">
                    {item.date}
                  </p>
                  <h3 className="mb-2 font-serif text-2xl text-white">{item.name}</h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/70">{item.body}</p>
                </div>
                <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 transition-all duration-700 group-hover:ring-gold/30" />
              </Link>
            );
          })}
        </div>

        {/* ── Band two: the week ──────────────────────────────────────────── */}
        <p className="mb-6 mt-16 flex items-center gap-4 font-display text-[0.6rem] uppercase tracking-[0.3em] text-gold-dark">
          {t.home.rhythmWeekBand}
          <span className="h-px flex-1 bg-gold/25" />
        </p>

        <div
          ref={weekRef}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-gold/20 ring-1 ring-gold/20 sm:grid-cols-3"
        >
          {schedule.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="week-col bg-white/90 p-7 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-gold-dark" />
                  <h3 className="font-serif text-lg text-navy">{item.title}</h3>
                </div>
                <ul className="space-y-2">
                  {item.times.map((time) => (
                    <li
                      key={time}
                      className="flex items-center gap-2.5 text-[0.95rem] text-text-muted"
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* One CTA for the whole section, because both bands open the same page.
            Two CTAs to one destination is the redundancy this merge removed. */}
        <div className="mt-12">
          <Link
            href="/mass-timings"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-display text-[0.7rem] uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-gold hover:text-navy"
          >
            {t.home.rhythmCta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
