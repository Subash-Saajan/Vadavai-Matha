"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

/**
 * The high altar's reredos, used as a diagram — the second half of the creed,
 * read on the thing itself.
 *
 * WHY A PHOTOGRAPH AND NOT A DRAWING. The four remaining readings of the parish
 * note (five arches above, nine flower-cluster carvings, four arches below, the
 * Trinity at the centre) are all VERTICAL: they live on the carved screen behind
 * the altar. The floor plan cannot carry them — seen from above, an upper row and
 * a lower row of arches are the same line. A symbolic elevation was drawn for
 * them once and cut in July 2026 for inventing what it could not measure. The
 * photograph invents nothing.
 *
 * WHAT IS MAPPED, AND WHAT IS NOT. Three of the five readings are placed here:
 *
 *   · `apostles` — the two gold arcades flanking the tabernacle, six small
 *     standing statues in each. See THE TWELVE, FOUND below.
 *   · `arches`  — the five arched niches of the main tier: the saint in the black
 *     cassock, the crowned Madonna, the centre bay, St Joseph, the small nun.
 *     ⚠ The note says "the upper row"; the reredos also has a HIGHER tier with
 *     statues at its outer ends. Which row the note meant is not settled.
 *   · `trinity` — the centre axis: the crucifix, and the shrine niche below it.
 *     ⚠ READ THIS BEFORE EDITING THE COPY. The note reads the centre as Father,
 *     Son and Holy Spirit, and an EARLIER photograph of this altar (altar.jpg,
 *     still used in ImagesItCarries) shows a dove in a starred oval above the
 *     crucifix — so the old crop marked dove + crucifix as two persons of the
 *     three. THIS photograph does not: that field now carries gold foliate
 *     tracery on lilac, checked at 6× magnification. The altar was redecorated
 *     between the two (the earlier one also has LED tube outlines this one has
 *     no trace of). So the mark here is the axis, not the Trinity itemised, and
 *     the gloss must not claim a dove this picture does not show.
 *
 * The nine flower-clusters and the four lower-row arches are still NOT mapped.
 * On the nine: the gold bouquet finials crowning the spires do come to about
 * nine, but each tall spire's crown is itself a cluster of several bouquets and
 * the same form runs as small crockets up every gable, so the count depends
 * entirely on what you agree to count — not good enough to publish. On the four:
 * this photograph shows the register below the statues clearly and it holds
 * TWELVE arches, not four (see below), so the note's "four arches in the base
 * row" is somewhere else again. Both stay on KB 02 §4.7c. Do not guess
 * coordinates for them.
 *
 * 🆕 THE TWELVE, FOUND. This photograph settles a question the KB had open (02
 * §4.7c item 4): the note's "both flanks of the tabernacle call to mind the
 * twelve disciples" is a gold arcade either side of the tabernacle holding SIX
 * small standing statues each — twelve, counted twice at magnification. That is
 * the parish's twelve, and the reading was moved here from the floor plan in
 * July 2026, where it had been attached to the twelve nave piers instead — a
 * pairing that appears nowhere on the parish sheet. The piers are still drawn;
 * they are simply piers again.
 *
 * COORDINATES. `/images/architecture/altar-reredos.jpg` is cut from the owner's
 * July 2026 photograph (`1000206865.jpg.jpeg`, 4000×2252 with EXIF orientation 6
 * — the turn is BAKED IN, not left to the tag, since Next's image pipeline
 * cannot be trusted to carry it). The file lives in the owner's Downloads
 * folder, NOT in PIcs; scripts/fix-architecture-images.mjs cuts the crop and is
 * the only thing that should. Upright the original is 2252×4000.
 *
 * ── THE CROP GREW, AND THE SHAPES DID NOT HAVE TO BE RE-MEASURED. ───────────
 * The crop was box (60,760)–(2200,2600) = 2140×1840; it is now (60,380)–
 * (2200,2980) = 2140×2600, because the old box cut the apse vault off the top
 * and sliced the painted altar frontal in half at the bottom. The x range did
 * not change and the new box only extends in y, so every shape below moves by
 * a pure translation — SPOT_DY — and none of the measuring had to be redone.
 * SPOTS stays in the ORIGINAL 2140×1840 space for exactly that reason: it is
 * the space they were measured in, against a JPEG that was drawn on and looked
 * at, and re-basing the numbers would throw that provenance away for nothing.
 * If the crop ever moves in x, or is re-cut from a different frame, that no
 * longer holds and every shape must be measured again.
 *
 * ── ONE FILE, TWO FRAMINGS. ─────────────────────────────────────────────────
 * The taller crop is a desktop change only; the phone keeps the picture it had.
 * That works off a single file because the new box is SYMMETRIC about y=1680,
 * the old box's centre: a centred `object-cover` in a container still shaped
 * 2140:1840 lands back on exactly (60,760)–(2200,2600). The SVG tracks it with
 * `preserveAspectRatio="xMidYMid slice"`, which is object-cover's rule written
 * in SVG. Container aspect, image fit and preserveAspectRatio are three
 * statements of one thing; change one and you must change all three.
 */

export type AltarSpot = "apostles" | "arches" | "trinity";

/** An ellipse (cx, cy, rx, ry) or a rect (x, y, w, h), in the crop's 2140×1840 space. */
type Shape =
  | { e: [number, number, number, number] }
  | { r: [number, number, number, number] };

const SPOTS: Record<AltarSpot, Shape[]> = {
  /* The two arcades flanking the tabernacle, six statues in each. Rects, because
     an ellipse over a horizontal arcade leaves its end bays outside the light. */
  apostles: [
    { r: [730, 1477, 295, 103] },
    { r: [1165, 1477, 275, 103] },
  ],
  arches: [
    { e: [425, 1080, 75, 210] },
    { e: [660, 1060, 92, 225] },
    { e: [1100, 1090, 120, 350] }, // the centre bay, taller than its four neighbours
    { e: [1570, 1060, 85, 220] },
    { e: [1790, 1065, 72, 180] },
  ],
  trinity: [
    { e: [1100, 860, 140, 170] }, // the crucifix
    { e: [1100, 1250, 110, 170] }, // the shrine niche beneath it
  ],
};

const REGIONS = Object.keys(SPOTS) as AltarSpot[];

/**
 * HOW MUCH EACH REGION'S INVISIBLE HIT SHAPE IS GROWN BEYOND ITS VISIBLE ONE,
 * in crop units, applied as a transparent stroke (a transparent paint is still
 * a painted, hit-testable one, where `none` is not).
 *
 * ⚠ THE TWO ARCADES WERE A 16px-TALL TAP TARGET. On a phone this photograph is
 * about 342px wide against a 2140-unit crop — a scale of 0.16 — so the two
 * `apostles` rectangles, 103 units deep, came out sixteen screen pixels tall.
 * That is a fifth of a fingertip, and they are the region carrying the one
 * thing this photograph settled: the parish's twelve, found as six statues in
 * each arcade. Grown by 90 units on every side they are 45px deep, which is a
 * thumb. The visible ring and the spotlight are untouched — this is the hit
 * shape only, so nothing about the drawing changes on any screen.
 *
 * The other two are already big enough (the smallest arch is 24×67px, the
 * crucifix 45×54px) and are deliberately NOT grown: `arches` and `trinity`
 * overlap each other on the centre axis as it is — the crucifix sits inside the
 * tall centre bay — and padding them would hand a whole column of the reredos
 * to whichever of the two happens to be painted last.
 */
const HIT_GROW: Record<AltarSpot, number> = {
  apostles: 180, // a 180-unit stroke straddles the edge: 90 units out, 90 in
  arches: 0,
  trinity: 0,
};

/** The crop as it is cut today: 2140×2600 from (60,380). */
const W = 2140;
const H = 2600;

/** The crop the shapes in SPOTS were measured against: 2140×1840 from
    (60,760). Its origin sits SPOT_DY lower in the current one, so every shape
    is drawn inside a group translated by that much. See the coordinates note. */
const SPOT_DY = 760 - 380;

/** The phone keeps the old framing: same width, the old 1840 height. */
const PHONE_H = 1840;

/** One shape, drawn either as the hole in the dim or as the ring around it.
    The presentation props are listed rather than spread from SVGProps: ellipse
    and rect disagree on the type of `ref`, so a shared SVGProps<…> union will
    not typecheck. Nothing here needs a ref. */
type MarkProps = {
  shape: Shape;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  vectorEffect?: "non-scaling-stroke";
};

function Mark({ shape, ...rest }: MarkProps) {
  return "e" in shape ? (
    <ellipse cx={shape.e[0]} cy={shape.e[1]} rx={shape.e[2]} ry={shape.e[3]} {...rest} />
  ) : (
    <rect
      x={shape.r[0]}
      y={shape.r[1]}
      width={shape.r[2]}
      height={shape.r[3]}
      rx={14}
      {...rest}
    />
  );
}

const keyOf = (s: Shape) => ("e" in s ? `e${s.e.join()}` : `r${s.r.join()}`);

export function AltarPhoto({
  alt,
  active = null,
  onSelect,
}: {
  alt: string;
  active?: AltarSpot | null;
  onSelect?: (spot: AltarSpot) => void;
}) {
  return (
    /* Two ratios, one file. Below `lg` the box keeps the OLD crop's shape and
       object-cover centres the taller picture back onto exactly the old
       framing; from `lg` up the box is the full crop and nothing is hidden.
       Both are written as exact ratios rather than a rounded aspect utility,
       because the overlay's viewBox lines up with the pixels underneath —
       and Image `fill` has no height without one. */
    <div
      className="relative rounded-2xl overflow-hidden ring-1 ring-gold/20 shadow-2xl aspect-(--altar-phone) lg:aspect-(--altar-full)"
      style={
        {
          "--altar-phone": `${W} / ${PHONE_H}`,
          "--altar-full": `${W} / ${H}`,
        } as CSSProperties
      }
    >
      <Image
        src="/images/architecture/altar-reredos.jpg"
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 92vw, 48rem"
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        /* object-cover's rule, in SVG: fill the box, keep the ratio, clip the
           overflow, centred. Without it the default is `meet`, which letterboxes
           — and every hotspot slides off the photograph on a phone, where the
           box is shorter than the viewBox. */
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {REGIONS.map((region) => (
            /* White lets the dimming rect through; the black shapes punch the
               spotlights out of it. */
            <mask key={region} id={`altar-spot-${region}`}>
              <rect width={W} height={H} fill="white" />
              {/* The white rect is the full CURRENT crop; the shapes are in the
                  older, shorter one, so they and only they are shifted. Same
                  pairing in the ring group and the hit group below — all three
                  must move together. */}
              <g transform={`translate(0 ${SPOT_DY})`}>
                {SPOTS[region].map((s) => (
                  <Mark key={keyOf(s)} shape={s} fill="black" />
                ))}
              </g>
            </mask>
          ))}
        </defs>

        {/* One fully-built overlay per region, faded in and out. Both are always
            in the DOM: cross-fading two finished layers avoids the flash you get
            from mutating a single mask as the selection changes. */}
        {REGIONS.map((region) => {
          const on = active === region;
          return (
            <g
              key={region}
              className="transition-opacity duration-500"
              style={{ opacity: on ? 1 : 0 }}
            >
              <rect
                width={W}
                height={H}
                fill="#0a1428"
                opacity={0.72}
                mask={`url(#altar-spot-${region})`}
              />
              <g
                className={on ? "plan-region--on" : undefined}
                transform={`translate(0 ${SPOT_DY})`}
              >
                {SPOTS[region].map((s) => (
                  <Mark
                    key={keyOf(s)}
                    shape={s}
                    fill="none"
                    stroke="#ecd28a"
                    strokeWidth={3}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            </g>
          );
        })}

        {/* Invisible hit areas, so the altar itself can be tapped as well as the
            list beside it — the same bonus affordance the floor plan has. */}
        {onSelect &&
          REGIONS.map((region) => (
            <g
              key={`hit-${region}`}
              className="pointer-events-auto cursor-pointer"
              transform={`translate(0 ${SPOT_DY})`}
              onClick={() => onSelect(region)}
            >
              {SPOTS[region].map((s) => (
                <Mark
                  key={keyOf(s)}
                  shape={s}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth={HIT_GROW[region]}
                />
              ))}
            </g>
          ))}
      </svg>
    </div>
  );
}
