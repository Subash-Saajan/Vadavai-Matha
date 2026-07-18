"use client";

/**
 * A SYMBOLIC elevation of the altarpiece (reredos) — the companion to the floor
 * plan, for the five readings the parish note attaches to the altar rather than
 * to the plan:
 *
 *   14 — the steps up to the pedestal cross ...... the fourteen Stations
 *    5 — the arches of the upper arcade .......... the five wounds, told again
 *    9 — the flower-cluster carvings ............. the nine choirs of angels
 *    4 — the arches of the lower arcade .......... the four Evangelists
 *    3 — the emblem at the centre ................ Father, Son and Holy Spirit
 *
 * These are features of a VERTICAL structure, so — unlike the floor plan — they
 * cannot be shown on a top-down drawing. And unlike PlanDrawing, this is NOT a
 * faithful redrawing of a measured source: the parish note gives the counts, not
 * the geometry. It is therefore an intentionally schematic, stylised reading —
 * the numbers arranged as an altarpiece so each reading can light its own part.
 * The `altarpieceNote` caption beside it says so; do not let that caveat be
 * dropped, and do not present this as the measured elevation of the real reredos.
 *
 * The Holy Family medallion at the heart and the crowning cross are drawn as
 * neutral "base" marks (never dimmed); the parish note names the titular image
 * of the Holy Family and the gold-gilded altar, which the caption carries.
 *
 * INTERACTION: identical mechanics to PlanDrawing — a reading (or a region) lifts
 * one region and dims the rest, reusing the same `.plan-region`/`--on`/`--off`
 * classes so both diagrams breathe the same way.
 */

/** The five regions a reading can point at. */
export type AltarRegion = "steps" | "upperArches" | "flowers" | "lowerArches" | "trinity";

/** An arched niche, open at the foot: vertical jambs rising to a round arch. */
function Arch({ cx, top, w, h }: { cx: number; top: number; w: number; h: number }) {
  const r = w / 2;
  return (
    <path
      d={`M ${cx - r},${top + h} L ${cx - r},${top + r} A ${r} ${r} 0 0 1 ${cx + r},${top + r} L ${cx + r},${top + h}`}
    />
  );
}

/** A flower-cluster carving — a small four-petal rosette with a boss. */
function Flower({ cx, cy }: { cx: number; cy: number }) {
  const p = 6.5;
  const r = 5;
  return (
    <g>
      <circle cx={cx} cy={cy - p} r={r} />
      <circle cx={cx} cy={cy + p} r={r} />
      <circle cx={cx - p} cy={cy} r={r} />
      <circle cx={cx + p} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={3.4} />
    </g>
  );
}

/** The five upper arches, centred on the axis. */
const UPPER = [-184, -92, 0, 92, 184];
/** The four lower arches. */
const LOWER = [-157.5, -52.5, 52.5, 157.5];
/** The nine flower-cluster carvings. */
const FLOWERS = [-216, -162, -108, -54, 0, 54, 108, 162, 216];

/** The fourteen steps, drawn as a centred stair widening toward the ground. */
const STEP_COUNT = 14;
const STEP_TOP = 610;
const STEP_DY = 17;
const STEP_HALF_TOP = 30;
const STEP_HALF_DX = 15;

export function AltarpieceDrawing({
  title,
  active = null,
  onSelect,
}: {
  title: string;
  active?: AltarRegion | null;
  onSelect?: (region: AltarRegion) => void;
}) {
  /** Highlight class for a region group: neutral, lifted, or dimmed. */
  const rcls = (region: AltarRegion) => {
    const base = "plan-region" + (onSelect ? " cursor-pointer" : "");
    if (!active) return base;
    return active === region ? `${base} plan-region--on` : `${base} plan-region--off`;
  };
  /** Click-to-select on the region itself; the list beside it drives the rest. */
  const pick = (region: AltarRegion) =>
    onSelect ? { onClick: () => onSelect(region) } : {};

  return (
    <svg viewBox="-270 5 540 870" role="img" aria-label={title} className="w-full h-auto">
      <title>{title}</title>

      {/* ── BASE — the frame, the ground, and the neutral crowning marks ───── */}
      <g className="plan-region">
        {/* Two pilasters and a base cornice, framing the arcades */}
        <g className="text-gold/35" stroke="currentColor" fill="none" strokeWidth={5} strokeLinecap="round">
          <path d="M -238,196 L -238,548" />
          <path d="M 238,196 L 238,548" />
          <path d="M -238,548 L 238,548" />
          <path d="M -238,196 L 238,196" />
        </g>
        {/* The ground line the steps rest on */}
        <path className="text-gold/40" stroke="currentColor" strokeWidth={5} strokeLinecap="round" d="M -244,846 L 244,846" />
      </g>

      {/* ── 14 — the steps up to the cross ────────────────────────────────── */}
      <g className={`${rcls("steps")} text-gold/70`} data-region="steps" {...pick("steps")}>
        <g stroke="currentColor" fill="none" strokeWidth={6} strokeLinecap="round">
          {Array.from({ length: STEP_COUNT }).map((_, i) => {
            const y = STEP_TOP + i * STEP_DY;
            const half = STEP_HALF_TOP + i * STEP_HALF_DX;
            return <path key={i} d={`M ${-half},${y} L ${half},${y}`} />;
          })}
        </g>
      </g>

      {/* ── 4 — the lower arcade: the four Evangelists ────────────────────── */}
      <g className={`${rcls("lowerArches")} text-gold/80`} data-region="lowerArches" {...pick("lowerArches")}>
        <g stroke="currentColor" fill="none" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
          {LOWER.map((cx) => (
            <Arch key={cx} cx={cx} top={396} w={90} h={130} />
          ))}
        </g>
      </g>

      {/* ── 9 — the flower-cluster carvings: the nine choirs of angels ────── */}
      <g className={`${rcls("flowers")} text-gold`} data-region="flowers" {...pick("flowers")} fill="currentColor">
        {FLOWERS.map((cx) => (
          <Flower key={cx} cx={cx} cy={362} />
        ))}
      </g>

      {/* ── 5 — the upper arcade: the five wounds, told again ─────────────── */}
      <g className={`${rcls("upperArches")} text-gold/80`} data-region="upperArches" {...pick("upperArches")}>
        <g stroke="currentColor" fill="none" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
          {UPPER.map((cx) => (
            <Arch key={cx} cx={cx} top={206} w={78} h={124} />
          ))}
        </g>
      </g>

      {/* ── 3 — the emblem at the centre: Father, Son and Holy Spirit ─────── */}
      <g className={`${rcls("trinity")} text-gold`} data-region="trinity" {...pick("trinity")}>
        {/* a small glory over the apex */}
        <g stroke="currentColor" strokeWidth={3} strokeLinecap="round">
          <path d="M 0,96 L 0,80" />
          <path d="M -13,101 L -21,87" />
          <path d="M 13,101 L 21,87" />
        </g>
        {/* the triangle */}
        <path stroke="currentColor" strokeWidth={6} fill="none" strokeLinejoin="round" d="M 0,104 L 46,176 L -46,176 Z" />
        {/* the three — one at each vertex */}
        <g fill="currentColor">
          <circle cx={0} cy={104} r={7} />
          <circle cx={-46} cy={176} r={7} />
          <circle cx={46} cy={176} r={7} />
        </g>
      </g>

      {/* ── NEUTRAL MARKS on top — the Holy Family, and the crowning cross ── */}
      <g className="plan-region">
        {/* The titular Holy Family, a medallion at the heart of the reredos */}
        <g className="text-gold/70" stroke="currentColor" fill="none" strokeWidth={4}>
          <circle cx={0} cy={566} r={27} />
        </g>
        <g className="text-gold/70" fill="currentColor">
          <circle cx={-9} cy={562} r={5} />
          <circle cx={9} cy={562} r={5} />
          <circle cx={0} cy={576} r={5} />
        </g>
        {/* The crowning cross */}
        <path
          className="text-gold"
          fill="currentColor"
          d="M -6,26 L 6,26 L 6,52 L 20,52 L 20,64 L 6,64 L 6,90 L -6,90 L -6,64 L -20,64 L -20,52 L -6,52 Z"
        />
      </g>
    </svg>
  );
}
