"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Clock, Calendar, Music, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";

export function MassTimes({ withCta = true }: { withCta?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  const scheduleData = [
    {
      icon: Clock,
      title: lang === "en" ? "Daily Mass" : "தினசரி திருப்பலி",
      times:
        lang === "en"
          ? ["Morning · 6:30 AM", "Evening · 5:30 PM"]
          : ["காலை · 6:30", "மாலை · 5:30"],
    },
    {
      icon: Calendar,
      title: lang === "en" ? "Sunday Mass" : "ஞாயிறு திருப்பலி",
      times:
        lang === "en"
          ? [
              "6:00 AM — Tamil",
              "8:00 AM — Malayalam",
              "10:00 AM — English",
              "5:30 PM — Tamil",
            ]
          : [
              "6:00 — தமிழ்",
              "8:00 — மலையாளம்",
              "10:00 — ஆங்கிலம்",
              "5:30 — தமிழ்",
            ],
    },
    {
      icon: Music,
      title: lang === "en" ? "Adoration & Novena" : "ஆராதனை மற்றும் நவநாள்",
      times:
        lang === "en"
          ? ["Wednesday · 5:00 PM", "Friday · 6:00 PM", "First Saturday · 4:00 PM"]
          : ["புதன் · 5:00", "வெள்ளி · 6:00", "முதல் சனி · 4:00"],
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
    <section ref={sectionRef} className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
            {t.home.massLabel}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy font-serif">
            {t.home.massTitle}
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {scheduleData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/15 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-500">
                    <Icon className="w-6 h-6 text-gold group-hover:text-navy transition-colors duration-500" />
                  </div>

                  <h3 className="text-2xl font-bold text-navy mb-4 font-serif">
                    {item.title}
                  </h3>

                  <ul className="space-y-2">
                    {item.times.map((time) => (
                      <li key={time} className="text-text-muted flex items-center gap-2">
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

        {withCta && (
          <div className="mt-14 text-center">
            <Link
              href="/mass-timings"
              className="inline-flex items-center gap-2 text-navy font-medium tracking-wide hover:text-gold-dark transition-colors group"
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
