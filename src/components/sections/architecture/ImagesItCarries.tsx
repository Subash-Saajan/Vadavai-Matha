"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";
import { useReveal } from "./useReveal";

const FIGURE_IMAGES = [
  "/images/architecture/relief.jpg",
  "/images/architecture/altar.jpg",
];

/**
 * VIII — the two images the building holds: the Two Trinities relief over the
 * door you come in by, and the six statues above the altar you come to.
 *
 * The relief's repaint caveat (2016–2022) is carried in the copy and must stay:
 * the figures are original, the gilding is not, and no source dates the relief.
 */
export function ImagesItCarries() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream parchment-sheen overflow-hidden"
    >
      <div className="light-shaft absolute -top-20 -right-10 w-[45%] h-[120%] -rotate-6" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        VII
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="reveal-item kicker mb-6">{a.imagesLabel}</p>
          <h2 className="reveal-item font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.06]">
            {a.imagesTitle}
          </h2>
          <p className="reveal-item text-text-muted text-lg leading-relaxed mt-6">
            {a.imagesBody}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {a.figures.map((f, i) => (
            <figure key={i} className="reveal-item">
              <div className="relative w-full aspect-4/5">
                <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25">
                  <Image
                    src={FIGURE_IMAGES[i]}
                    alt={f.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 45vw"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
                  <PhotoOrnaments />
                </div>
              </div>

              <figcaption className="mt-7">
                <h3 className="font-serif text-2xl md:text-3xl text-navy">{f.title}</h3>
                <p className="mt-3 text-text-muted leading-relaxed">{f.body}</p>
                <p className="mt-4 pt-4 border-t border-gold/25 font-display text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">
                  {f.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* The words over the porch */}
        <div className="reveal-item mt-20 max-w-2xl mx-auto text-center">
          <div className="cross-rule max-w-xs mx-auto mb-8">
            <span className="text-gold text-lg">✦</span>
          </div>
          <p className="font-tamil text-4xl md:text-5xl text-gradient-gold-deep leading-snug">
            {a.inscription}
          </p>
          <p className="mt-6 font-serif italic text-navy/75 text-lg leading-relaxed">
            {a.inscriptionGloss}
          </p>
        </div>
      </div>
    </section>
  );
}
