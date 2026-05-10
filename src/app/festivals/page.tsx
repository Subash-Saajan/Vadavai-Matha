"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { images } from "@/lib/images";

const festivalImages = [
  images.candlesLit,
  images.churchSunset,
  images.candleLight,
  images.flowers,
  images.lampLights,
  images.cross,
];

export default function FestivalsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(".fest-item");
      items?.forEach((el) => {
        const img = el.querySelector(".fest-img");
        const text = el.querySelector(".fest-text");

        // Image parallax within sticky frame
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25, yPercent: -10 },
            {
              scale: 1,
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <>
      <PageHero
        label={t.festivals.label}
        title={t.festivals.title}
        intro={t.festivals.intro}
        image={images.candlesLit}
      />

      <section ref={sectionRef} className="bg-cream">
        {t.festivals.list.map((f, i) => {
          const left = i % 2 === 0;
          return (
            <article
              key={f.name}
              className="fest-item relative section-padding border-b border-gold/10 last:border-0 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div
                  className={`relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ${
                    left ? "" : "md:order-2"
                  }`}
                >
                  <div className="fest-img absolute inset-0 will-change-transform">
                    <Image
                      src={festivalImages[i % festivalImages.length]}
                      alt={f.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                </div>

                <div className={`fest-text ${left ? "" : "md:order-1"}`}>
                  <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">
                    {f.date}
                  </p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy leading-tight mb-6">
                    {f.name}
                  </h2>
                  <p className="text-text-muted text-lg leading-relaxed max-w-xl">
                    {f.body}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
