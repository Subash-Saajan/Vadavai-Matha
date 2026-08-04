"use client";

import { useRef } from "react";
import Image from "next/image";
import { cappedSizes } from "@/lib/imageSizes";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";
import { useReveal } from "./useReveal";

const FIGURE_IMAGES = [
  "/images/architecture/relief.jpg",
  "/images/architecture/altar.jpg",
];

/**
 * VI — after the creed's climax, a quieter devotional beat: the two images
 * the building holds, the Two Trinities relief over the door you come in by,
 * and the six statues above the altar you come to.
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
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        VI
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="reveal-item kicker mb-6">{a.imagesLabel}</p>
          {/* See the heading note in Towers.tsx. */}
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl lg:text-6xl text-navy leading-[1.06]">
            {a.imagesTitle}
          </h2>
          <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed mt-6">
            {a.imagesBody}
          </p>
        </div>

        {/* ── CAPPED, AND FLUSH LEFT. Two 4:5 figures across the full 7xl
            container come out ~610px wide and ~760px down on a laptop, which
            is taller than the viewport: you cannot see either photograph and
            its caption at the same time, and the pair reads as two posters
            rather than as the two images the building holds. So the grid is
            capped — 64rem, ~484×605 a tile.

            ⚠ NO `mx-auto` ON THIS. Capping it and centring it was tried, and
            it put the pair's left edge 190px inside the heading's: the
            heading, the intro paragraph and every other section on the page
            start at the container's left edge, and the photographs suddenly
            did not. A narrower block on this page is fine; a block on a
            different centre line from the words above it is not.

            The 4:5 aspect is deliberate and stays: the relief and the altar
            screen are both upright subjects. */}
        <div className="mt-12 md:mt-16 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14">
          {a.figures.map((f, i) => (
            <figure key={i} className="reveal-item">
              <div className="relative w-full aspect-4/5">
                <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25">
                  <Image
                    src={FIGURE_IMAGES[i]}
                    alt={f.caption}
                    fill
                    className="object-cover"
                    sizes={cappedSizes("(max-width: 768px) 90vw, 31rem")}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
                  <PhotoOrnaments />
                </div>
              </div>

              <figcaption className="mt-7">
                <h3 className="font-serif text-2xl md:text-3xl text-navy">{f.title}</h3>
                <p className="mt-3 text-text-muted leading-relaxed">{f.body}</p>
                {/* Same 9.9px caption correction as Towers — the note there. */}
                <p className="mt-4 pt-4 border-t border-gold/25 font-display text-[0.7rem] tracking-[0.15em] md:text-[0.62rem] md:tracking-[0.24em] uppercase text-text-muted">
                  {f.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* The words over the porch */}
        <div className="reveal-item mt-14 md:mt-20 max-w-2xl mx-auto text-center">
          <div className="cross-rule max-w-xs mx-auto mb-8">
            <span className="text-gold text-lg">✦</span>
          </div>
          {/* The Tamil keeps its size on a phone deliberately: this is the
              lettering cut over the porch, shown as lettering, and Tamil
              carries far more stroke detail per glyph than Latin does — it is
              the one line here that would lose meaning by shrinking. */}
          <p className="font-tamil text-4xl md:text-5xl text-gradient-gold-deep leading-snug">
            {a.inscription}
          </p>
          <p className="mt-6 font-serif italic text-navy/75 text-[1.08rem] md:text-lg leading-relaxed">
            {a.inscriptionGloss}
          </p>
        </div>
      </div>
    </section>
  );
}
