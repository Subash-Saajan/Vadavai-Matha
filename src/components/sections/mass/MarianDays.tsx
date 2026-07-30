"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { gsap, DESKTOP } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "@/hooks/useReveal";
import { OrnamentFrame } from "@/components/ornaments/CornerOrnament";

/**
 * VI — THE TWO DAYS THAT BELONG TO HER ALONE.
 *
 * These were two white cards with a gold left border, sitting under the feast
 * grid as though they were two more feasts of the same kind. They are not: one
 * is Our Lady's birthday and the other is the Matha Kaatchi, the day this
 * village remembers her statue turning towards the people — the event the whole
 * shrine is built around. Given the same card as St George's ten-day feast,
 * that read as filing rather than as reverence.
 *
 * So they are lifted out onto a dark ground, lit by her own midnight
 * photograph, and set as two inscribed tablets in the house ornamental frame —
 * the same frame /architecture puts round its plates. Nothing about the words
 * has changed; only what they are given to sit on.
 *
 * ⚠ ON THE APPARITION. The copy says "is remembered to have", and that hedge is
 * load-bearing — the 1803 weeping and the Matha Kaatchi are parish tradition,
 * carried in Dessal (1905) and the parish's own books, not a documented event
 * with an outside witness. See the Knowledge Base's evidence ledger. Do not
 * tighten it into a plain assertion.
 */
export function MarianDays() {
  const ref = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const f = t.festivals;

  useReveal(ref, lang);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.fromTo(
          plateRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });
      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={ref}
      id="marian"
      className="cathedral-depth section-padding relative scroll-mt-24 overflow-hidden"
    >
      {/* Her own photograph, at midnight, held to the right so the type on the
          left keeps a clean ground. Portrait source (900×1600) in a very wide
          band, so `object-cover` crops it hard on the vertical — the crop is
          held at the top, where the crowned head is. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[52%]" aria-hidden="true">
        {/* Overscan by scaling the picture, not by oversizing the frame — see
            the note in TheAnnualFeast.tsx. */}
        {/* `md:will-change-transform` — the drift is desktop-only, and an
            unkept `will-change` is a permanent compositor layer holding a
            full-bleed photograph. See the same note in TheAnnualFeast.tsx. */}
        <div ref={plateRef} className="absolute inset-0 md:will-change-transform">
          <Image
            src="/images/matha-midnight.jpg"
            alt=""
            fill
            className="scale-110 object-cover object-[50%_18%] opacity-[0.34]"
            sizes="(max-width: 768px) 100vw, 52vw"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-night-deep via-night-deep/70 to-night-deep/85 md:bg-linear-to-r md:from-night-deep md:via-night-deep/55 md:to-night-deep/80" />
      </div>

      <div className="light-shaft absolute -top-12 left-[10%] h-[120%] w-[38%] -rotate-6" />

      <span
        className="section-numeral pointer-events-none absolute -top-6 right-4 select-none text-[7rem] opacity-[0.08] md:right-12 md:text-[12rem]"
        aria-hidden="true"
      >
        VI
      </span>

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl md:mb-16">
          <p className="reveal-item kicker text-gold! mb-5">{f.marianLabel}</p>
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-tight text-white md:text-5xl lg:text-6xl">
            {t.home.patronessTitle}
          </h2>
          {/* A serif italic pull-quote, so it lands above the sans body scale
              and below the sans heading — 17.3px. `text-xl` was serving the
              phone as well as the tablet. */}
          <p className="reveal-item mt-5 font-serif text-[1.08rem] italic leading-relaxed text-white/70 md:mt-6 md:text-2xl">
            {f.marianIntro}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          {f.marian.map((m) => (
            <article
              key={m.name}
              className="reveal-item relative overflow-hidden rounded-3xl bg-night-deep/55 px-6 py-9 shadow-2xl ring-1 ring-gold/25 backdrop-blur-sm md:px-10 md:py-14"
            >
              {/* The house ornamental frame, small, inside the tablet edge. */}
              <OrnamentFrame
                variant={3}
                size="[--orn:3.25rem] md:[--orn:4rem]"
                inset="inset-3 md:inset-4"
                corners="all"
                className="text-gold/35"
              />

              <div className="relative mx-auto max-w-sm text-center">
                <p className="text-gradient-gold font-serif text-3xl md:text-4xl">
                  {m.date}
                </p>
                <div className="cross-rule mx-auto my-6 max-w-40 md:my-7">
                  <span className="text-lg text-gold">✦</span>
                </div>
                {/* The date above and the name here hold their sizes — this
                    tablet is two dates and two sentences, and the dates are the
                    whole point of it. Only the paragraph comes down. */}
                <h3 className="font-serif text-2xl leading-snug text-white md:text-3xl">
                  {m.name}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-white/65 md:mt-5 md:text-base">
                  {m.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
