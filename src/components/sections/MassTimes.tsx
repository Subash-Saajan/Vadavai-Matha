"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/components/LocaleLink";
import { gsap } from "@/lib/gsap";
import { Sunrise, Church, MoonStar, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";

export function MassTimes({ withCta = true }: { withCta?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  const scheduleData = [
    {
      icon: Sunrise,
      title: lang === "en" ? "Daily Mass" : "தினசரி திருப்பலி",
      times:
        lang === "en"
          ? ["5:00 AM", "6:10 AM"]
          : ["காலை 5:00", "காலை 6:10"],
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
      title: lang === "en" ? "Adoration & Novena" : "ஆராதனை மற்றும் நவநாள்",
      times:
        lang === "en"
          ? ["Wednesday · 5:00 PM", "Friday · 6:00 PM", "First Saturday · 4:00 PM"]
          : ["புதன் · மாலை 5:00", "வெள்ளி · மாலை 6:00", "முதல் சனி · மாலை 4:00"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      Array.from(cards).forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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

  return (
    <section ref={sectionRef} className="section-padding bg-cream-dark parchment-sheen relative overflow-hidden">
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.05] select-none">
        V
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="kicker justify-center mb-5">{t.home.massLabel}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-navy font-serif">
            {t.home.massTitle}
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {scheduleData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ring-1 ring-gold/10"
              >
                {/* Gold top rule */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-br from-gold/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-500">
                    <Icon className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-500" />
                  </div>

                  <h3 className="text-2xl text-navy mb-5 font-serif">
                    {item.title}
                  </h3>

                  <ul className="space-y-2.5">
                    {item.times.map((time) => (
                      <li key={time} className="text-text-muted flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/0 group-hover:border-gold/40 transition-colors duration-700" />
              </div>
            );
          })}
        </div>

        {withCta && (
          <div className="mt-14 text-center">
            <Link
              href="/mass-timings"
              className="inline-flex items-center gap-2 text-navy font-display text-xs uppercase tracking-[0.2em] hover:text-gold-dark transition-colors group"
            >
              {t.home.massCta}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
