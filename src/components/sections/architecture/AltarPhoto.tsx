"use client";

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
 * WHAT IS MAPPED, AND WHAT IS NOT. Only two of the four are placed here, because
 * only two can be honestly read off the one altar photograph the archive holds:
 *
 *   · `trinity` — the dove in the starred oval at the top of the centre bay, and
 *     the crucified Christ directly below it on the same axis. This is the same
 *     "Two Trinities" logic that governs the façade relief (KB file 19).
 *   · `arches`  — the five arched niches of the main tier. ⚠ The note says "the
 *     upper row"; the reredos also has a HIGHER tier with arches at its outer
 *     ends, cropped away here. Which row the note meant is not settled.
 *
 * The nine flower-clusters and the four lower-row arches are NOT mapped. The
 * gold bouquet-bosses are all over the gables but cannot be counted at this
 * resolution, and the register below the altar shelf cannot be resolved at all.
 * KB 02 §4.7c lists both as on-site camera work. Do not guess coordinates for
 * them — leave them as plain list entries until someone counts them.
 *
 * COORDINATES. `/images/architecture/altar-reredos.jpg` is a crop of
 * altar.original.jpg — box (257,77)–(3080,1796) on that 3285×2176 original,
 * exported at 1760×1072. It is a separate crop rather than altar.jpg itself
 * because altar.jpg already appears further down the page in ImagesItCarries,
 * and the same photograph twice in two sections reads as a mistake. The viewBox
 * below is the crop's own space at 2200×1340 (the export is that × 0.8, exactly),
 * so the overlay lands without distortion. Re-cropping the image means
 * re-measuring every ellipse: scripts are in the session scratchpad, and the
 * method was to draw the candidates onto the JPEG and look at them.
 */

export type AltarSpot = "arches" | "trinity";

/** cx, cy, rx, ry — in the crop's own 2200×1340 space. */
const SPOTS: Record<AltarSpot, [number, number, number, number][]> = {
  arches: [
    [245, 810, 106, 244],
    [536, 759, 134, 243],
    [1093, 775, 218, 440], // the centre bay, taller than its four neighbours
    [1698, 759, 109, 243],
    [1963, 785, 89, 218],
  ],
  trinity: [
    [1093, 260, 110, 80], // the dove
    [1099, 554, 165, 215], // the crucifix below it
  ],
};

const REGIONS = Object.keys(SPOTS) as AltarSpot[];

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
    /* The ratio is set here rather than with an aspect-* utility because it has
       to be EXACTLY the crop's — the overlay's viewBox lines up with the pixels
       underneath, and Image `fill` has no height without it. */
    <div
      className="relative rounded-2xl overflow-hidden ring-1 ring-gold/20 shadow-2xl"
      style={{ aspectRatio: "2200 / 1340" }}
    >
      <Image
        src="/images/architecture/altar-reredos.jpg"
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 92vw, 48rem"
      />

      <svg
        viewBox="0 0 2200 1340"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          {REGIONS.map((region) => (
            /* White lets the dimming rect through; the black ellipses punch the
               spotlights out of it. */
            <mask key={region} id={`altar-spot-${region}`}>
              <rect width="2200" height="1340" fill="white" />
              {SPOTS[region].map(([cx, cy, rx, ry]) => (
                <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} fill="black" />
              ))}
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
                width="2200"
                height="1340"
                fill="#0a1428"
                opacity={0.72}
                mask={`url(#altar-spot-${region})`}
              />
              <g className={on ? "plan-region--on" : undefined}>
                {SPOTS[region].map(([cx, cy, rx, ry]) => (
                  <ellipse
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
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
              onClick={() => onSelect(region)}
            >
              {SPOTS[region].map(([cx, cy, rx, ry]) => (
                <ellipse
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={ry}
                  fill="transparent"
                />
              ))}
            </g>
          ))}
      </svg>
    </div>
  );
}
