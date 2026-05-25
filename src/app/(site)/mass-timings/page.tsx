"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Sunrise, Church, MoonStar, Sparkles, CalendarDays, Star } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { images } from "@/lib/images";

const cardIcons = [Sunrise, Church, MoonStar];
const yearImages = [
  images.candlesLit,
  images.procession,
  images.flowers,
  images.candleLight,
  images.lampLights,
  images.marian,
  images.cross,
];

export default function MassFestivalsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={rootRef}>
      <PageHero
        label={t.mass.label}
        title={t.mass.title}
        intro={t.mass.intro}
        image={images.pews}
      />

      {/* ─────────────  MASS TIMINGS  ───────────── */}
      <section id="mass" className="section-padding bg-cream-dark scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16 reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
              {t.mass.weeklyLabel}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy font-serif">
              {t.mass.title}
            </h2>
          </header>

          {/* Weekly cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {t.mass.cards.map((card, i) => {
              const Icon = cardIcons[i % cardIcons.length];
              return (
                <div
                  key={card.title}
                  className="reveal group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/15 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-500">
                      <Icon className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy font-serif">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mt-1 mb-4">
                        {card.subtitle}
                      </p>
                    )}
                    <ul className={`space-y-2 ${card.subtitle ? "" : "mt-4"}`}>
                      {card.times.map((time) => (
                        <li
                          key={time}
                          className="text-text-muted flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly devotions */}
          <div className="reveal mt-16 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
              <h3 className="text-xl md:text-2xl font-serif text-navy">
                {t.mass.devotionsLabel}
              </h3>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gold/10">
              {t.mass.devotions.map((d, i) => (
                <div
                  key={`${d.when}-${d.service}-${i}`}
                  className="grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-cream/60 transition-colors"
                >
                  <span className="col-span-5 sm:col-span-4 text-sm font-medium text-navy">
                    {d.when}
                  </span>
                  <span className="col-span-3 sm:col-span-2 text-sm text-gold-dark tabular-nums whitespace-nowrap">
                    {d.time}
                  </span>
                  <span className="col-span-12 sm:col-span-6 text-sm text-text-muted">
                    {d.service}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-text-muted/80 italic">
              {t.mass.devotionsNote}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────  FESTIVALS  ───────────── */}
      <section id="festivals" className="section-padding bg-cream scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16 reveal">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
              {t.festivals.label}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy font-serif">
              {t.festivals.title}
            </h2>
            <p className="mt-6 text-text-muted max-w-2xl mx-auto leading-relaxed">
              {t.festivals.intro}
            </p>
          </header>

          {/* Featured annual feast */}
          <article className="reveal relative rounded-3xl overflow-hidden shadow-2xl bg-navy mb-20">
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[280px] md:min-h-full">
                <Image
                  src={images.candlesLit}
                  alt={t.festivals.featured.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="p-8 md:p-12 lg:p-14">
                <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">
                  {t.festivals.featuredLabel} · {t.festivals.featured.date}
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-5">
                  {t.festivals.featured.name}
                </h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  {t.festivals.featured.body}
                </p>

                <ul className="space-y-4 border-t border-white/10 pt-6">
                  {t.festivals.featured.schedule.map((row) => (
                    <li key={row.when} className="flex flex-col sm:flex-row sm:gap-5">
                      <span className="text-gold text-sm font-medium sm:w-44 flex-shrink-0">
                        {row.when}
                      </span>
                      <span className="text-white/85 text-sm">{row.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* Feasts through the year */}
          <div className="reveal flex items-center gap-3 mb-8">
            <CalendarDays className="w-5 h-5 text-gold flex-shrink-0" />
            <h3 className="text-2xl md:text-3xl font-serif text-navy">
              {t.festivals.yearLabel}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {t.festivals.list.map((f, i) => (
              <article
                key={f.name}
                className="reveal group relative rounded-2xl overflow-hidden bg-navy aspect-[4/3]"
              >
                <Image
                  src={yearImages[i % yearImages.length]}
                  alt={f.name}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.7rem] uppercase tracking-[0.25em] text-gold mb-2">
                    {f.date}
                  </p>
                  <h4 className="text-xl font-serif text-white mb-2 leading-snug">
                    {f.name}
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed">{f.body}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Special Marian days */}
          <div className="reveal flex items-center gap-3 mb-8">
            <Star className="w-5 h-5 text-gold flex-shrink-0" />
            <h3 className="text-2xl md:text-3xl font-serif text-navy">
              {t.festivals.marianLabel}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.festivals.marian.map((m) => (
              <div
                key={m.name}
                className="reveal bg-white rounded-2xl p-8 shadow-sm border-l-4 border-gold"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-gold-dark mb-3">
                  {m.date}
                </p>
                <h4 className="text-2xl font-serif text-navy mb-3">{m.name}</h4>
                <p className="text-text-muted leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
