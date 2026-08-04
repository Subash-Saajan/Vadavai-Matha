"use client";

import { useRef } from "react";
import Image from "next/image";
import { cappedSizes } from "@/lib/imageSizes";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";
import { useReveal } from "./useReveal";

/**
 * I — the first thing a visitor sees approaching: the twin towers, and the
 * name the village got for them. towersBody deliberately leads with the
 * design-language reason (the parish's own comparison to the great basilica
 * of Rome), not a height statistic — the old "92 ft / 16 pinnacles / 1861 /
 * 50 ft / 1890" stat strip was removed entirely at the user's request; do
 * not reintroduce a numbers list here.
 */
export function Towers() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream-dark parchment-swell overflow-hidden"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        I
      </span>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div className="lg:col-span-7">
          <p className="reveal-item kicker mb-6">{a.towersLabel}</p>
          {/* `text-5xl` was the phone size too: 48px of Cormorant with
              `leading-[1.04]` in a 342px column is about nine characters a
              line, which stops being a heading and becomes a stack. The clamp
              holds it at a share of the screen and tops out at 36px; `md` and
              up are the sizes this was drawn at. Same move as the home page —
              see the note in Patroness.tsx. */}
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-6xl lg:text-7xl text-navy leading-[1.04]">
            {a.towersTitle}
          </h2>
          <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed mt-6">
            {a.towersBody}
          </p>
        </div>

        {/* The towers */}
        <figure className="lg:col-span-5 reveal-item">
          <div className="relative w-full aspect-4/5 max-w-md mx-auto">
            <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25">
              <Image
                src="/images/architecture/towers.jpg"
                alt={a.towersCaption}
                fill
                className="object-cover"
                sizes={cappedSizes("(max-width: 1024px) 80vw, 40vw")}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
              <PhotoOrnaments />
            </div>
          </div>
          {/* THE FIGURE CAPTION, AND IT IS THE SAME CORRECTION IN EVERY BAND OF
              THIS PAGE. 0.62rem is 9.9px; Cinzel caps flung 0.24em apart at
              that size are guessed at rather than read, and this caption is the
              only thing naming what the photograph shows. Up half a step and
              the tracking down to pay for the width — the caption occupies the
              same line length it did — with the drawn values restored at `md`. */}
          <figcaption className="mt-4 text-center font-display text-[0.7rem] tracking-[0.15em] md:text-[0.62rem] md:tracking-[0.24em] uppercase text-text-muted">
            {a.towersCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
