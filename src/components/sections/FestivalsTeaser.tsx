"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";
import { useLang } from "@/components/layout/LanguageProvider";

const cards = [
  { img: images.candlesLit, key: 0 },
  { img: images.procession, key: 1 },
  { img: images.flowers, key: 2 },
];

export function FestivalsTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = cardsRef.current?.children;
      if (!els) return;

      Array.from(els).forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -10 : -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  const items = t.festivals.list.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-cream parchment-sheen relative overflow-hidden"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        IV
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="kicker mb-5">{t.home.festivalsLabel}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-navy leading-tight font-serif">
              {t.home.festivalsTitle}
            </h2>
            <p className="mt-5 text-text-muted max-w-xl leading-relaxed text-lg">
              {t.home.festivalsBody}
            </p>
          </div>

          <Link
            href="/mass-timings#festivals"
            className="inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 rounded-full bg-navy text-white font-display text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-navy transition-all duration-500 group"
          >
            {t.home.festivalsCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {cards.map((c, i) => {
            const item = items[i];
            return (
              <article
                key={c.key}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-navy will-change-transform ring-1 ring-gold/10"
              >
                <Image
                  src={c.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-night-deep/95 via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[0.6rem] uppercase tracking-[0.28em] text-gold mb-2">
                    {item.date}
                  </p>
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                    {item.body}
                  </p>
                </div>
                <span className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/30 transition-all duration-700" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
