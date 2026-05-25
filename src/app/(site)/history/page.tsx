"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { images } from "@/lib/images";

const timelineImages = [
  images.oldChapel,
  images.churchTower,
  images.basilica,
  images.cathedralCeiling,
  images.churchSunset,
];

export default function HistoryPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll(".tl-item");
      if (!items) return;

      // Animate the gold rail height as you scroll
      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 50%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      items.forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          el,
          { x: dir * 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        const img = el.querySelector(".tl-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      });
    }, timelineRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <>
      <PageHero
        label={t.history.label}
        title={t.history.title}
        intro={t.history.intro}
        image={images.archInterior}
      />

      <section
        ref={timelineRef}
        className="relative section-padding bg-cream overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical rail */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block">
            <div className="w-px h-full bg-gold/20" />
            <div
              ref={railRef}
              className="absolute inset-0 w-px bg-gradient-to-b from-gold via-gold to-gold/0 origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="space-y-32">
            {t.history.timeline.map((entry, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={entry.year}
                  className="tl-item relative grid md:grid-cols-2 gap-10 md:gap-16 items-center"
                >
                  {/* Image side */}
                  <div className={`${left ? "md:order-1" : "md:order-2"}`}>
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                      <div className="tl-img absolute inset-0 will-change-transform">
                        <Image
                          src={timelineImages[i % timelineImages.length]}
                          alt={entry.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                      <p className="absolute top-6 left-6 text-xs uppercase tracking-[0.3em] text-gold font-medium bg-navy/60 backdrop-blur px-3 py-1.5 rounded-full">
                        {entry.year}
                      </p>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`${left ? "md:order-2" : "md:order-1"}`}>
                    <p className="text-7xl md:text-8xl font-serif text-gradient-gold mb-4 leading-none">
                      {entry.year}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                      {entry.title}
                    </h2>
                    <p className="text-text-muted text-lg leading-relaxed">
                      {entry.body}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                    <div className="w-4 h-4 rounded-full bg-gold ring-8 ring-cream" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
