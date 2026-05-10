"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { images } from "@/lib/images";
import { useLang } from "@/components/layout/LanguageProvider";

// Asymmetric mosaic with parallax — each tile drifts at a different rate
const tiles = [
  { img: images.cathedralCeiling, span: "row-span-2 col-span-2", drift: -25 },
  { img: images.candlesLit, span: "col-span-1 row-span-1", drift: -10 },
  { img: images.stainedGlass, span: "col-span-1 row-span-1", drift: -45 },
  { img: images.rosary, span: "col-span-1 row-span-1", drift: -30 },
  { img: images.archInterior, span: "col-span-2 row-span-1", drift: -15 },
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
      className="section-padding bg-navy relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
            {t.home.galleryLabel}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif">
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
              className={`relative ${tile.span} rounded-2xl overflow-hidden group will-change-transform`}
            >
              <Image
                src={tile.img}
                alt=""
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors duration-700" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-navy text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-500 group"
          >
            {t.home.galleryCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
