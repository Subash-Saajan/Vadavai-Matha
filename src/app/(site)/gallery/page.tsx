"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { images } from "@/lib/images";

const tiles = [
  { img: images.cathedralCeiling, aspect: "aspect-[4/5]" },
  { img: images.candlesLit, aspect: "aspect-[3/4]" },
  { img: images.stainedGlass, aspect: "aspect-[4/3]" },
  { img: images.archInterior, aspect: "aspect-[3/4]" },
  { img: images.rosary, aspect: "aspect-[4/5]" },
  { img: images.basilica, aspect: "aspect-[3/4]" },
  { img: images.candleLight, aspect: "aspect-[4/3]" },
  { img: images.churchSpire, aspect: "aspect-[3/4]" },
  { img: images.altar, aspect: "aspect-[4/5]" },
  { img: images.flowers, aspect: "aspect-[3/4]" },
  { img: images.marian, aspect: "aspect-[4/5]" },
  { img: images.lampLights, aspect: "aspect-[4/3]" },
  { img: images.cross, aspect: "aspect-[3/4]" },
  { img: images.pews, aspect: "aspect-[4/5]" },
  { img: images.churchSunset, aspect: "aspect-[4/3]" },
];

export default function GalleryPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gridRef.current?.querySelectorAll(".tile");
      if (!els) return;
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none none",
            },
            delay: (i % 3) * 0.08,
          }
        );

        // image scale-on-scroll inside frame
        const img = el.querySelector(".tile-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
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
      });
    }, gridRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <>
      <PageHero
        label={t.gallery.label}
        title={t.gallery.title}
        intro={t.gallery.intro}
        image={images.cathedralCeiling}
      />

      <section className="section-padding bg-cream overflow-hidden">
        <div
          ref={gridRef}
          className="max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]"
        >
          {tiles.map((tile, i) => (
            <figure
              key={i}
              className={`tile ${tile.aspect} relative w-full mb-4 md:mb-6 break-inside-avoid rounded-2xl overflow-hidden bg-navy group`}
            >
              <div className="tile-img absolute inset-0 will-change-transform">
                <Image
                  src={tile.img}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors duration-700" />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
