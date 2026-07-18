"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { images } from "@/lib/images";
import { useLang } from "@/components/layout/LanguageProvider";

// Asymmetric mosaic with parallax — each tile drifts at a different rate.
//
// NOTE: every tile below is an UNSPLASH STOCK photograph (see src/lib/images.ts)
// — generic devotional imagery, not Vadakkankulam. The alt text therefore
// describes only what is genuinely in each frame and never claims it is this
// shrine, because it is not.
//
// This is worth fixing rather than annotating: the parish now has ~70 real
// photographs in /public/images (the façade, the two naves, the vault, the
// glass, the feast). Stock imagery is duplicated across thousands of sites and
// is worth precisely nothing in image search, whereas these photographs are
// unique and are the single most ownable asset the shrine has online.
const tiles = [
  {
    img: images.cathedralCeiling,
    alt: "A vaulted church ceiling",
    span: "row-span-2 col-span-2",
    drift: -25,
  },
  {
    img: images.candlesLit,
    alt: "A cluster of lit devotional candles",
    span: "col-span-1 row-span-1",
    drift: -10,
  },
  {
    img: images.stainedGlass,
    alt: "Coloured light falling through stained glass",
    span: "col-span-1 row-span-1",
    drift: -45,
  },
  {
    img: images.rosary,
    alt: "A rosary held in the hand",
    span: "col-span-1 row-span-1",
    drift: -30,
  },
  {
    img: images.archInterior,
    alt: "The arches of a church interior",
    span: "col-span-2 row-span-1",
    drift: -15,
  },
];

export function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gridRef.current?.children;
      if (!els) return;

      Array.from(els).forEach((el, i) => {
        gsap.to(el, {
          yPercent: tiles[i]?.drift ?? -20,
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
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="section-padding cathedral-depth relative overflow-hidden"
    >
      <div className="light-shaft absolute -top-10 left-[6%] w-[42%] h-[120%] -rotate-12" />

      <div className="relative max-w-7xl mx-auto">
        <div className="relative text-center mb-16">
          <span className="section-numeral pointer-events-none absolute left-1/2 -translate-x-1/2 -top-24 text-[10rem] opacity-[0.07] select-none">
            VI
          </span>
          <p className="kicker justify-center mb-5 text-gold!">{t.home.galleryLabel}</p>
          <h2 className="font-display uppercase tracking-[0.03em] text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            {t.home.galleryTitle}
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4 md:gap-6"
        >
          {tiles.map((tile, i) => (
            <div
              key={i}
              className={`relative ${tile.span} rounded-2xl overflow-hidden group will-change-transform ring-1 ring-white/5`}
            >
              <Image
                src={tile.img}
                alt={tile.alt}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
              <div className="absolute inset-0 bg-navy/25 group-hover:bg-navy/0 transition-colors duration-700" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/30 transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/architecture"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-navy font-display text-xs uppercase tracking-[0.22em] hover:bg-white transition-all duration-500 group"
          >
            {t.home.galleryCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
