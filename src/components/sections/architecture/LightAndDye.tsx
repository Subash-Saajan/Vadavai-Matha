"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, DESKTOP } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";

/** The rose window in the painted vault — the strongest of the four, so it
    stands beside the copy rather than queueing below it with the rest. */
const LEAD = { src: "/images/architecture/glass-1.jpg", caption: 0 };

/** The three that follow, in one row. `drift` is the parallax travel in percent;
    they are staggered so the row breathes, but gently — these three are the same
    size side by side, so a large spread reads as misalignment rather than
    movement (the old masonry layout could carry -34 because no two tiles shared
    an edge). */
const TRIO = [
  { src: "/images/architecture/glass-2.jpg", caption: 1, drift: -8 },
  { src: "/images/architecture/glass-3.jpg", caption: 2, drift: -18 },
  { src: "/images/architecture/glass-4.jpg", caption: 3, drift: -12 },
];

/**
 * IV — the first-impression "wow" on stepping inside: the glass, the plant
 * dyes, and the gold that has never been allowed to fade. lightBody tells it
 * as a story (plain glass + sealed windows for a century, then the 1972
 * centenary gift), with sensory detail (diamond lattices, trefoil rosettes,
 * the rose window) drawn from the church's own photographed interior — see
 * KB file 12 §"Stained glass, nave, ceiling" — not from any documented
 * symbolism, since none is recorded for the glass specifically.
 *
 * LAYOUT (rebuilt July 2026). This section used to run its copy in a `max-w-2xl`
 * column with a four-tile masonry grid underneath. On a wide screen that left
 * the entire top right of the section empty, and lightBody is the longest body
 * on the page, so the void was at its most obvious right here — every other
 * numbered section pairs its text with a figure across twelve columns. It now
 * does the same: the rose window at col-5, the copy at col-7, the other three
 * windows in a row below.
 *
 * The figure sits LEFT to keep the page's alternation intact — I Towers right,
 * II HowItStands left, III Bells right, IV here left, VII ThreeChurches right.
 * That is a separate rhythm from the Roman numeral's side; don't conflate them.
 *
 * All four sources are 4:3 (2560×1920). The old grid cropped glass-4 into a
 * 2.9:1 slot, which threw most of the window away; every frame here is 4:3, so
 * they are shown as shot.
 */
/** One window: 4:3 as shot, gold hairline, caption on hover. */
function GlassTile({
  src,
  alt,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative aspect-4/3 rounded-2xl overflow-hidden group ring-1 ring-gold/15 shadow-lg ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        sizes={sizes}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
      {/* ⚠ VISIBLE AT REST ON TOUCH. This caption was `opacity-0` until hover,
          and a phone has no hover — so on the device where most readers meet
          this section, the only thing naming each of the four windows did not
          exist. These are photographs of specific windows and the caption is
          the whole of their identification; it is content, not a flourish. It
          goes back to being a hover reveal from `md` up, where a pointer
          exists to reveal it, so the desktop composition is unchanged.
          The size is the same 9.3px→11.2px correction as every other engraved
          caption on the page — see Towers.tsx. */}
      <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-linear-to-t from-navy/85 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <span className="font-display text-[0.7rem] tracking-[0.13em] md:text-[0.62rem] md:tracking-[0.2em] uppercase text-white/90">
          {alt}
        </span>
      </figcaption>
    </figure>
  );
}

export function LightAndDye() {
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      /* ── DESKTOP ONLY: the drift of the three windows ───────────────────
         This is the whole of this page's decorative scrubbed motion — three
         photographs given a transform on every scrolled frame purely so the
         row breathes. It is depth behind the subject, not the subject, and
         on a phone the three tiles are stacked one under another anyway, so
         the stagger that makes the row read as a row on a monitor cannot be
         seen at all: what was left was the cost. The section keeps its
         entrance reveal, which is what a reader on a phone actually sees.
         See the note on DESKTOP in lib/gsap.ts.

         `matchMedia` rather than an `if` on `matchMedia(...).matches`: it
         builds and reverts as the query flips, so a tablet rotated across
         768px lands on the right build instead of whichever one mounted. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const tiles = gridRef.current?.children;
        if (!tiles) return;

        // The lead figure does NOT drift: it sits beside the copy, and moving
        // it against a fixed block of text only makes the text look crooked.
        Array.from(tiles).forEach((el, i) => {
          gsap.to(el, {
            yPercent: TRIO[i]?.drift ?? -12,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        });
      });

      return () => mm.revert();
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream-dark parchment-swell overflow-hidden"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        IV
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <GlassTile
            className="lg:col-span-5 reveal-item"
            src={LEAD.src}
            alt={a.glassCaptions[LEAD.caption]}
            sizes="(max-width: 1024px) 92vw, 30rem"
          />

          <div className="lg:col-span-7">
            <p className="reveal-item kicker mb-6">{a.lightLabel}</p>
            {/* See the heading note in Towers.tsx. */}
            <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl lg:text-6xl text-navy leading-[1.06]">
              {a.lightTitle}
            </h2>
            {/* lightBody is the longest paragraph on the page, which is exactly
                where 18px in a 342px column costs the most lines. */}
            <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed mt-6">
              {a.lightBody}
            </p>
          </div>
        </div>

        <div
          ref={gridRef}
          className="reveal-item mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
        >
          {TRIO.map((tile) => (
            <GlassTile
              key={tile.src}
              /* `md:will-change-transform`, not bare: `will-change` promotes
                 the tile to its own compositor layer for the whole life of the
                 page, and since the drift above is desktop-only nothing moves
                 these three on a phone. A standing promise to move that is
                 never kept is just memory — three full-bleed photographs' worth
                 of it. */
              className="md:will-change-transform"
              src={tile.src}
              alt={a.glassCaptions[tile.caption]}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 26rem"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
