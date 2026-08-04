"use client";

import { useRef } from "react";
import Image from "next/image";
import { cappedSizes } from "@/lib/imageSizes";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";

/**
 * The four windows, read across then down: the four-light tracery window and
 * the rose window the copy names on the top row, the lancet heads and the
 * angled window in its stencilled wall beneath them. See the layout note.
 */
const WINDOWS = [
  { src: "/images/architecture/glass-1.jpg", caption: 0 },
  { src: "/images/architecture/glass-2.jpg", caption: 1 },
  { src: "/images/architecture/glass-3.jpg", caption: 2 },
  { src: "/images/architecture/glass-4.jpg", caption: 3 },
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
 * ── LAYOUT: A 2×2 BLOCK BESIDE THE COPY. ────────────────────────────────────
 * This section has been through four shapes; this is the one the owner chose.
 * It began as a `max-w-2xl` column of copy over a four-tile masonry grid,
 * which left the whole top right of a wide screen empty. It became a lead
 * figure beside the copy with the other three in a centred row beneath, and
 * that is the one that failed — not because there were four photographs, but
 * because of how they were arranged: a big lead and three small tiles at a
 * different width, centred under a left-aligned lead they could not line up
 * with. It was then cut to a pair, and the owner asked for the four back as a
 * square block.
 *
 * So: four equal frames, 2×2, in six of the twelve columns, with the copy in
 * the other six. Equal is the whole point — the failure mode here was never
 * the count, it was tiles of different sizes on different centre lines. Every
 * frame is the same width, the same 3:4, and on one of two shared column
 * edges. If you add or remove a photograph, keep it even: 2×2 or 1×2, never
 * three, and never one big one with small ones under it.
 *
 * The figures sit LEFT to keep the page's alternation intact — I Towers right,
 * II HowItStands left, III Bells right, IV here left, VII ThreeChurches right.
 * That is a separate rhythm from the Roman numeral's side; don't conflate them.
 *
 * The parallax drift that used to scrub these on scroll is gone for good.
 * Tiles on a shared grid edge cannot drift against each other without simply
 * looking misaligned, which is the fault this layout exists to fix. The
 * section keeps its entrance reveal, which is what a reader actually sees.
 * This component no longer touches GSAP at all.
 */
/** One window: 3:4 upright, gold hairline, caption on hover. */
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
    <figure className={className}>
      <div className="relative aspect-3/4 rounded-2xl overflow-hidden group ring-1 ring-gold/15 shadow-lg">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          sizes={sizes}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
        {/* The desktop caption, laid over the picture and revealed on hover.
            It is `aria-hidden` and duplicates the alt text on purpose: the
            real <figcaption> is the one below, and a <figure> may hold only
            one. Hidden outright below `md`, where there is no pointer to
            reveal it with — see the note on the figcaption. */}
        <div
          aria-hidden
          className="hidden md:block absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-navy/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <span className="font-display text-[0.62rem] tracking-[0.18em] uppercase text-white/90">
            {alt}
          </span>
        </div>
      </div>
      {/* ⚠ VISIBLE AT REST ON TOUCH, AND OUTSIDE THE FRAME. This caption was
          `opacity-0` until hover, and a phone has no hover — so on the device
          where most readers meet this section, the only thing naming each
          window did not exist. These are photographs of specific windows and
          the caption is the whole of their identification; it is content, not
          a flourish.

          It sits BELOW the picture rather than over it, because the two tiles
          are half-width on a phone: forty characters of spaced Cinzel laid
          over a 155px frame runs four lines deep and covers a third of the
          window. Under the frame it costs the photograph nothing. From `md`
          up it goes back to being a hover reveal inside the frame, so the
          desktop composition is unchanged. The size is the same 9.3px→11.2px
          correction as every other engraved caption on the page — see
          Towers.tsx. */}
      <figcaption className="md:hidden mt-3 font-display text-[0.7rem] tracking-[0.12em] uppercase text-text-muted leading-relaxed">
        {alt}
      </figcaption>
    </figure>
  );
}

export function LightAndDye() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding bg-cream-dark parchment-swell overflow-hidden"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        IV
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── THE BLOCK, AND HOW BIG IT IS ALLOWED TO GET. Filling six of
              twelve columns it was ~600px square and ~810px tall in total,
              which is a wall of stained glass beside the paragraph rather than
              an illustration of it. It is five columns capped at 26rem now:
              each window ~198 across and ~264 down, the whole block ~548 tall,
              against copy that runs about 430. Two goes at this have both been
              told it was still too big, so treat 26rem as a ceiling, not a
              starting point.

              Cap the WIDTH, never the aspect: a shorter box crops the head off
              a Gothic window, which is the subject. And no `mx-auto` — the
              block is flush with the container's left edge, the same edge the
              heading and every other section on the page start from.

              Two across at every width, phone included. The block is then the
              same shape everywhere, and it is the shape that makes this work —
              stacking them one per row on a phone was 1300px of scroll through
              four near-fullscreen pictures of the same thing. */}
          <div className="lg:col-span-5 lg:max-w-104 grid grid-cols-2 gap-3 sm:gap-4">
            {WINDOWS.map((tile) => (
              <GlassTile
                key={tile.src}
                className="reveal-item"
                src={tile.src}
                alt={a.glassCaptions[tile.caption]}
                sizes={cappedSizes("(max-width: 1024px) 46vw, 13rem")}
              />
            ))}
          </div>

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
      </div>
    </section>
  );
}
