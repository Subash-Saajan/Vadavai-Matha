"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, DESKTOP } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * VII · THE GALLERY — six frames, and every frame is a roll of photographs.
 *
 * WHAT THIS SECTION DOES NOW. Each tile holds two or three pictures stacked on
 * top of each other, and the scroll position decides which one is showing. Cross
 * the right point on the way down and a frame changes its picture: the new one
 * is wiped in from the top behind a gold hairline that sweeps the tile, the old
 * one fades out under it. Scroll back up and it runs backwards — the wipe and
 * the hairline reverse with you, because a swap that always ran one way would
 * feel like a slideshow that had lost its place.
 *
 * THE THREE MOTIONS ARE DELIBERATELY UNEQUAL, and they are what stop it reading
 * as a carousel:
 *
 *   1. the FRAME drifts a few pixels (`drift`), so the mosaic breathes;
 *   2. the PHOTOGRAPH pans inside the frame (`pan`), in opposite directions on
 *      alternate tiles, so some pictures rise while their neighbours sink;
 *   3. the PICTURE ITSELF changes (`roll`), staggered by `phase`.
 *
 * NOTHING IS PINNED. The scroll is never captured, hijacked or slowed: this is
 * all transform and opacity keyed off ScrollTrigger's progress, so the page
 * scrolls at exactly the speed the reader expects. That is also why there is no
 * `useIsomorphicLayoutEffect` here — nothing reparents a node, so the ordinary
 * effect is safe (see the note in lib/gsap.ts for when it is not).
 *
 * THE STAGGER IS THE WHOLE TRICK. With `phase` below, the nine changes land at
 * roughly 0.21, 0.27, 0.33, 0.35, 0.41, 0.47, 0.55, 0.61 and 0.67 of the
 * section's travel — one every ~190px of scroll, one tile at a time, and none of
 * them at the moment the section enters or leaves. Give every tile the same
 * phase and the entire wall flips at once, which looks like a bug.
 */

type Frame = {
  img: string;
  alt: string;
  /** Rendered as a hairline chip while this frame is the one showing. */
  year?: string;
};

type Tile = {
  /** Column/row spans, phone first then `md:` — the diagram below. */
  span: string;
  sizes: string;
  /** Frame travel, in pixels. */
  drift: number;
  /** Direction the photograph pans inside its frame: +1 down, -1 up. */
  pan: 1 | -1;
  /** Shifts this tile's changes earlier in the scroll, 0–1. */
  phase: number;
  roll: Frame[];
};

/**
 * THE MOSAIC, AND WHY THE SPANS ARE THESE ONES.
 *
 * What was here before could not tile. In `md:grid-cols-4` the spans ran 2×2,
 * 1×1, 1×1, 1×1, then a 2-wide tile — and after the fourth tile the cursor sits
 * at row 2 column 4 with a single free cell, so the wide tile could not fit
 * there and wrapped to row 3. That left one hole beside the 1×1s and two more
 * next to the wide tile: a "mosaic" with three empty cells in it.
 *
 * The grid is 12 columns (2 on phones) because 12 takes both the 4+8 split and
 * the 3+3+2 one, and the placement below is checked by hand to be gapless:
 *
 *   desktop, 12 × 5            phone, 2 × 14
 *   ┌──────┬──────┬──────┐     ┌───────────┐
 *   │      │  2   │  3   │     │     1     │  1  c1-2  r1-4
 *   │  1   ├───┬──┴──┬───┤     ├───────────┤  2  c1-2  r5-6
 *   │      │ 4 │  5  │ 6 │     │     2     │  3  c1-2  r7-8
 *   └──────┴───┴─────┴───┘     ├───────────┤  4  c1    r9-11
 *   1 c1-4  r1-5               │     3     │  5  c2    r9-11
 *   2 c5-8  r1-2               ├─────┬─────┤  6  c1-2  r12-14
 *   3 c9-12 r1-2               │  4  │  5  │
 *   4 c5-7  r3-5               ├─────┴─────┤
 *   5 c8-10 r3-5               │     6     │
 *   6 c11-12 r3-5              └───────────┘
 *
 * ⚠ EVERY PICTURE IN A ROLL SHARES ITS TILE'S BOX, so a roll may only hold
 * photographs of roughly one shape. The box ratios are 0.62, 1.63, 1.63, 0.83,
 * 0.83 and 0.53, and each frame's own ratio is noted against it below — keep new
 * pictures within about 20% of the box or `object-cover` will crop the subject
 * out. This is the other half of what was originally wrong here: four of the five
 * photographs were portrait and all five boxes were landscape.
 */
const tiles: Tile[] = [
  {
    span: "col-span-2 row-span-4 md:col-span-4 md:row-span-5", // box 0.62
    sizes: "(max-width: 768px) 100vw, 33vw",
    drift: -6,
    pan: 1,
    phase: 0,
    roll: [
      {
        img: "/images/vault-chandelier.jpg", // 0.75
        alt: "The painted rib vault, chandelier and coloured-glass window inside Holy Family Church, Vadakkankulam",
      },
      {
        img: "/images/de-britto-grotto.jpg", // 0.56
        alt: "The grotto shrine of St John de Britto — Arulanandar — in the grounds of the parish he founded in 1685",
      },
      {
        img: "/images/fest-procession-monstrance.jpg", // 0.75
        alt: "The monstrance carried under an embroidered canopy in the procession of the annual feast",
      },
    ],
  },
  {
    span: "col-span-2 row-span-2 md:col-span-4 md:row-span-2", // box 1.63
    sizes: "(max-width: 768px) 100vw, 33vw",
    drift: -16,
    pan: -1,
    phase: 0.06,
    roll: [
      {
        img: "/images/heritage-door-1839.jpg", // 1.5
        alt: "A heritage doorway of the parish, its arch painted with the year 1839",
      },
      {
        img: "/images/architecture/altar.jpg", // 1.51
        alt: "The high altar, gilded and unfaded",
      },
      {
        img: "/images/fest-noon.jpg", // 1.78
        alt: "The crowned statue of Our Lady on her flower-decked processional chariot at the August feast, the church spire rising behind",
      },
    ],
  },
  {
    // ── THE ARCHIVE TILE ──────────────────────────────────────────────────
    // One frame, one building, a hundred and twenty-five years: Suau's 1899/1900
    // plate, then the undated halftone the parish has always used, then the
    // façade as it stands today. It is the only tile whose roll is a chronology
    // rather than a set of views, and it is the reason the swap is a wipe and
    // not a cross-fade — a wipe reads as one photograph replacing another, which
    // is exactly what is happening here.
    span: "col-span-2 row-span-2 md:col-span-4 md:row-span-2", // box 1.63
    sizes: "(max-width: 768px) 100vw, 33vw",
    drift: -9,
    pan: 1,
    phase: 0.12,
    roll: [
      {
        // THE OLDEST KNOWN IMAGE OF THIS CHURCH. Fr Pierre Suau SJ's own plate,
        // taken on his 1899–1900 visit and printed at p.73 of L'Inde Tamoule
        // (Paris, 1901). Public domain; provenance and the recommended credit
        // line are in Knowledge_Base/Historical_Images_From_Books/README.md §1.
        // It is the picture that dates the porch: there is none here.
        img: "/images/archive-church-1901.jpg", // 1.40
        alt: "The west façade of Holy Family Church, Vadakkankulam, photographed by Fr Pierre Suau SJ in 1899–1900 — twin spires, the pinnacle cresting, the free-standing flagstaff and a group of parishioners at a doorway that as yet has no porch. From his L'Inde Tamoule (Paris, 1901), p. 73",
        year: "1899 – 1900",
      },
      {
        // The parish's own archival halftone — the same photograph that heads
        // /history. It carries NO chip on purpose: nothing in the KB dates it,
        // and a date invented for a caption is a date the site would then be
        // quoted on. The black-and-white does the work by itself.
        img: "/images/bw-old-pic.jpg", // 1.45
        alt: "An archival black-and-white photograph of the great two-nave church at Vadakkankulam, its spires and pinnacles against a clouded sky",
      },
      {
        img: "/images/facade-day.jpg", // 1.5
        alt: "The west façade of Holy Family Church, Vadakkankulam, in daylight — the church as it stands today",
      },
    ],
  },
  {
    span: "col-span-1 row-span-3 md:col-span-3 md:row-span-3", // box 0.83
    sizes: "(max-width: 768px) 50vw, 25vw",
    drift: -14,
    pan: -1,
    phase: 0.03,
    roll: [
      {
        img: "/images/tracery-window.jpg", // 0.75
        alt: "Coloured glass diamonds glowing in the plaster tracery of a nave window",
      },
      {
        img: "/images/architecture/bell.jpg", // 0.67
        alt: "The bell in its tower, cast “Vve Grégoire de Valence (Drôme)” and “Donateur Casimir Grégoire”",
      },
    ],
  },
  {
    span: "col-span-1 row-span-3 md:col-span-3 md:row-span-3", // box 0.83
    sizes: "(max-width: 768px) 50vw, 25vw",
    drift: -20,
    pan: 1,
    phase: 0.09,
    roll: [
      {
        img: "/images/architecture/relief.jpg", // 0.67
        alt: "The Two Trinities relief over the central door — the Holy Family in polychrome, a dove in a golden halo above them",
      },
      {
        img: "/images/saints/gnanapoo-ammal-tomb.jpg", // 0.67
        alt: "The tomb of Gnanapoo Ammal, who died in 1766, wife of St Devasahayam Pillai, sheltered under a white arched memorial with an old stone cross",
      },
    ],
  },
  {
    span: "col-span-2 row-span-3 md:col-span-2 md:row-span-3", // box 0.53
    sizes: "(max-width: 768px) 100vw, 17vw",
    drift: -12,
    pan: -1,
    phase: 0.15,
    roll: [
      {
        img: "/images/matha-midnight.jpg", // 0.56
        alt: "The crowned statue of Vadavai Matha covered in gold offerings on her feast night",
      },
      {
        img: "/images/holy-family-tympanum.jpg", // 0.56
        alt: "The Holy Family sculpture group above the main entrance of the church",
      },
    ],
  },
];

/**
 * THE PLATE, AND THE ARITHMETIC THAT KEEPS THE PAN SAFE.
 *
 * `drift` is PIXELS. It used to be -10 to -45 *percent of the tile's own
 * height*, which on a 220px row is up to -99px of travel against a 24px gap: the
 * tiles slid over each other and out of the grid. The spread is 6–20px now, so
 * the largest difference between two neighbours' travel (14px) stays inside the
 * gutter and nothing can collide.
 *
 * The pan works because every picture sits on a "plate" taller than its frame,
 * leaving slack above and below. PAN_PCT is a percentage OF THE PLATE, so the
 * travel in tile-heights is PAN_PCT × 1.26 ≈ 8.8%, comfortably inside the 13% of
 * slack. Get this wrong in the other direction and the plate's own edge swings
 * into view as a bar of empty tile — the failure this note exists to prevent.
 */
const PLATE_H = "h-[126%] -top-[13%]";
const PAN_PCT = 7;

/** How long a picture takes to replace the one under it. */
const WIPE = 1.05;

export function GalleryPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = Array.from(gridRef.current?.children ?? []) as HTMLElement[];
      if (!els.length) return;

      // Under prefers-reduced-motion nothing is built at all. The base markup is
      // the finished state — first frame of every roll visible, plate centred in
      // its frame — so returning here leaves a plain, correct, still mosaic
      // rather than a half-animated one.
      if (reduceMotion) return;

      /* ── OF THE THREE MOTIONS, TWO ARE DESKTOP-ONLY AND THE THIRD IS NOT ──
         The drift and the pan are per-frame scrubs, and there are twelve of
         them in this one section — six frames being translated plus six
         photographs being translated INSIDE those frames, every one of them a
         transform written on a composited, rounded, clipped box on every
         scrolled frame. This was comfortably the most expensive section on the
         home page for a phone.

         The ROLL stays on every device, and that distinction is the whole
         point: a roll is a handful of discrete events — nine changes across
         the section's travel — not a per-frame write, and it is what this
         section is FOR. A phone still gets the wall changing its pictures as
         it goes past; what it does not get is the two-pixel breathing
         underneath, which nobody has ever noticed on a 6-inch screen and
         which was costing the frames the roll needed. See lib/gsap.ts. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        els.forEach((el, i) => {
          const tile = tiles[i];

          gsap.to(el, {
            y: tile?.drift ?? -12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          // The photograph panning inside its own frame. Driven off THIS TILE,
          // not the section, so the pan is centred when the tile is centred: it
          // reads as the picture settling into place rather than as a wall of
          // images all sliding the same way at once.
          const plate = el.querySelector(".gallery-plate");
          const dir = tile?.pan ?? 1;
          if (plate) {
            gsap.fromTo(
              plate,
              { yPercent: -PAN_PCT * dir },
              {
                yPercent: PAN_PCT * dir,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.4,
                },
              },
            );
          }
        });
      });

      els.forEach((el, i) => {
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
          },
        );
      });

      // ── The rolls ────────────────────────────────────────────────────────
      // Which picture each tile is showing. Plain numbers, not React state: a
      // setState here would re-render six tiles mid-scroll for something the DOM
      // is already carrying, and React would fight GSAP for the same styles.
      const shown = tiles.map(() => 0);

      const show = (el: HTMLElement, i: number, next: number, instant: boolean) => {
        const prev = shown[i];
        if (prev === next) return;
        shown[i] = next;

        const frames = Array.from(el.querySelectorAll<HTMLElement>(".gallery-frame"));
        const incoming = frames[next];
        const outgoing = frames[prev];
        if (!incoming) return;

        // The incoming picture must paint ABOVE the one it replaces, and going
        // backwards it is the earlier element in the DOM — so stacking order has
        // to be set explicitly or a reverse swap would wipe in behind the old
        // picture and show nothing at all.
        gsap.set(frames, { zIndex: 1 });
        gsap.set(incoming, { zIndex: 2 });

        const down = next > prev;
        const hidden = down ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)";
        const open = "inset(0% 0% 0% 0%)";

        if (instant) {
          gsap.set(frames, { autoAlpha: 0, scale: 1, clipPath: open });
          gsap.set(incoming, { autoAlpha: 1 });
        } else {
          // The old picture only fades. All the movement belongs to the new one,
          // which is what makes the change read as an arrival rather than as two
          // pictures dissolving into a muddy middle.
          if (outgoing) {
            gsap.to(outgoing, {
              autoAlpha: 0,
              scale: 1.04,
              duration: WIPE * 0.85,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          }

          gsap.fromTo(
            incoming,
            { autoAlpha: 1, scale: 1.08, clipPath: hidden },
            {
              scale: 1,
              clipPath: open,
              duration: WIPE,
              ease: "power3.inOut",
              overwrite: "auto",
            },
          );

          // The hairline that travels with the wipe — a thread of gold crossing
          // the tile in the direction the new picture is arriving from. It is the
          // one piece of chrome in this section, and it is why the swap reads as
          // deliberate rather than as an image failing to load.
          const sweep = el.querySelector<HTMLElement>(".gallery-sweep");
          if (sweep) {
            const h = el.clientHeight;
            gsap
              .timeline()
              .fromTo(
                sweep,
                { y: down ? 0 : h, opacity: 0 },
                { opacity: 1, duration: 0.14, ease: "none" },
              )
              .to(sweep, { y: down ? h : 0, duration: WIPE * 0.9, ease: "power2.inOut" }, 0)
              .to(sweep, { opacity: 0, duration: 0.28, ease: "none" }, WIPE * 0.6);
          }
        }

        // The year chip belongs to a PICTURE, not to a tile, so it travels with
        // the roll: it is on screen only while the frame that earned it is.
        el.querySelectorAll<HTMLElement>(".gallery-chip").forEach((chip) => {
          gsap.to(chip, {
            autoAlpha: Number(chip.dataset.frame) === next ? 1 : 0,
            duration: instant ? 0 : 0.45,
            ease: "none",
            overwrite: "auto",
          });
        });
      };

      const sync = (progress: number, instant: boolean) => {
        els.forEach((el, i) => {
          const tile = tiles[i];
          if (!tile || tile.roll.length < 2) return;
          // Clamped just short of 1 so the last frame gets a full share of the
          // scroll instead of a single pixel of it at the very end.
          const p = gsap.utils.clamp(0, 0.999999, progress + tile.phase);
          show(el, i, Math.floor(p * tile.roll.length), instant);
        });
      };

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        // Deliberately inside the viewport at both ends: the wall is settled when
        // the section arrives and settled again when it leaves, and every change
        // happens where someone can actually watch it.
        start: "top 85%",
        end: "bottom 15%",
        onUpdate: (self) => sync(self.progress, false),
        // A refresh (resize, font swap, a route's images landing) can move the
        // section far enough that the roll is on the wrong frame. Snap, don't
        // animate — an animated catch-up on resize looks like a glitch.
        onRefresh: (self) => sync(self.progress, true),
      });

      // Deep-linking, reloading mid-page or arriving on a back-navigation all
      // start with the section already scrolled past. Set the right frames at
      // once rather than animating up to them.
      sync(st.progress, true);

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="section-padding cathedral-depth relative overflow-hidden"
    >
      <div className="light-shaft absolute -top-10 left-[6%] w-[42%] h-[120%] -rotate-12" />

      <div className="relative max-w-7xl mx-auto">
        <div className="relative text-center mb-16">
          <span className="section-numeral pointer-events-none absolute left-1/2 -translate-x-1/2 -top-24 text-[10rem] opacity-[0.07] select-none">
            VII
          </span>
          <p className="kicker justify-center mb-5 text-gold!">{t.home.galleryLabel}</p>
          <h2 className="font-display uppercase tracking-[0.03em] text-[clamp(1.85rem,7.4vw,2.25rem)] md:text-5xl lg:text-6xl text-white leading-tight">
            {t.home.galleryTitle}
          </h2>
        </div>

        {/* `auto-rows-[86px]` on a phone, not 100px. The mosaic is fourteen
            rows deep there — the diagram above — so at the desktop row height
            the wall alone runs to about 1,480px, more than two full phone
            screens of photographs before the reader reaches the link out of
            them. 86px brings it back to roughly 1,270px without changing a
            single span, so the tiling stays exactly as drawn. */}
        <div
          ref={gridRef}
          className="grid auto-rows-[86px] grid-cols-2 gap-3 sm:auto-rows-[100px] md:auto-rows-[110px] md:grid-cols-12 md:gap-5"
        >
          {tiles.map((tile) => (
            <div
              key={tile.roll[0].img}
              className={`relative ${tile.span} rounded-2xl overflow-hidden group md:will-change-transform ring-1 ring-white/5`}
            >
              {/* The plate: taller than the frame on purpose, so the pictures
                  have room to travel inside it. See the note above PLATE_H —
                  the overhang is what stops the pan showing its own edge. */}
              <div className={`gallery-plate absolute inset-x-0 ${PLATE_H} md:will-change-transform`}>
                {tile.roll.map((frame, fi) => (
                  <div
                    key={frame.img}
                    // Every frame after the first starts hidden, in CSS rather
                    // than in JS: with no JavaScript, or under reduced motion,
                    // the tile is simply its first photograph.
                    className={`gallery-frame absolute inset-0 ${fi === 0 ? "" : "invisible opacity-0"}`}
                  >
                    <Image
                      src={frame.img}
                      alt={frame.alt}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                      sizes={tile.sizes}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 bg-navy/25 group-hover:bg-navy/0 transition-colors duration-700" />

              {tile.roll.map((frame, fi) =>
                frame.year ? (
                  <div
                    key={`${frame.img}-chip`}
                    data-frame={fi}
                    className={`gallery-chip pointer-events-none absolute inset-0 ${
                      fi === 0 ? "" : "invisible opacity-0"
                    }`}
                  >
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-night-deep/85 to-transparent" />
                    <p className="absolute bottom-3 left-4 flex items-center gap-2.5 font-display text-[0.6rem] uppercase tracking-[0.22em] text-gold/90">
                      <span className="h-px w-6 bg-gold/50" />
                      {frame.year}
                    </p>
                  </div>
                ) : null,
              )}

              {/* Parked at the top edge with no height of its own; the swap moves
                  it with a transform, so it costs nothing when nothing changes. */}
              <div className="gallery-sweep pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 bg-linear-to-r from-transparent via-gold to-transparent" />

              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/30 transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* A quiet link, not a gold pill. This section is immediately followed
            by the Visit CTA, which IS a gold pill — two identical filled buttons
            one after the other made neither of them read as the primary action,
            and the one that matters at the foot of the page is "come here". */}
        <div className="mt-16 text-center">
          <Link
            href="/architecture"
            className="inline-flex items-center gap-2 border-b border-gold/40 pb-1.5 font-display text-xs uppercase tracking-[0.22em] text-gold transition-colors duration-500 hover:border-white hover:text-white group"
          >
            {t.home.galleryCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
