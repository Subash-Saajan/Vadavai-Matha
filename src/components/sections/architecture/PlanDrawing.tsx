"use client";

/**
 * The floor plan of the Holy Family Church — a faithful redrawing of
 * **வரைபடம் 5, "காற்சட்டை ஆலயம்"** in A. Sivasubramanian, *Kiristhavamum Sathiyum*
 * (2001), the only measured plan of this church in print.
 *
 * It is not a freehand impression. The source photograph (`Album 1/20260610_112801.jpg`)
 * was de-tilted, thresholded, and digitised: the wall polylines were traced from the
 * connected components, and all twelve piers were measured by PCA of their ink blobs
 * — centre, length, breadth and long-axis angle. Left and right were then averaged
 * into one symmetric set, since the church is symmetric and the differences were the
 * draughtsman's hand. Every number below is in those measured units. The piers are
 * then set out on the rays they were struck from — see THE TWELVE PIERS below.
 *
 * ONE DELIBERATE DEPARTURE: the west end is drawn longer than the source draws it.
 * See WEST_EXTENSION. Set it to 0 and the plan is the book again.
 *
 * COORDINATES: the viewBox is the plan's own coordinate system. x = 0 is the church's
 * axis of symmetry; +x is toward the right nave, -x toward the left nave; y increases
 * from the sanctuary (top) to the west porch (bottom). One unit is roughly 4 cm.
 *
 * WHAT THE PLAN SHOWS:
 *   · the sacristy behind the altar, and the apsidal sanctuary with its three
 *     altar-platform steps, the altar table and the altar cross;
 *   · the TWO LOW WALLS running west from the sanctuary — the "double balustrade" —
 *     the priest's central path to the altar. Fr Caussanel demolished them c.1910;
 *   · the TWO NAVES splaying west from the sanctuary, four piers to each (P1–P4,
 *     P5–P8), with P9–P12 astride the low walls;
 *   · the FIVE DOORS, numbered as the source numbers them — 3 at the centre for the
 *     priests, the other four to the two naves;
 *   · the three arrows: the three directions in — the two naves and the central
 *     corridor — each turned toward the one altar;
 *   · two further, smaller arrows carrying the centre path on up the corridor
 *     toward the cross. These are NOT in the source; they were added in July
 *     2026 to carry the parish's fourteen. See THE CENTRE PATH below.
 *
 * The compass mark is reproduced as drawn in the source. Do not add compass claims
 * to the annotations from it — the book's north arrow and the parish history's
 * "east-facing altar" cannot both be right, and this project has not resolved which.
 *
 * INTERACTIVE REGIONS (added for the Creed section). The drawing is grouped into
 * five readable regions — `doors`, `piers`, `arrows`, `stations`, `altar` — plus the
 * neutral base (outer walls, porch, the priests' jambs, steps, compass). A line of the
 * creed beside the plan, or a region itself, lifts that region and dims EVERYTHING
 * else, the base included. Geometry is untouched; only the JSX is reorganised into
 * region groups. The `.plan-line/.plan-dot/.plan-mark` classes are kept as inert
 * markers in case the scroll-draw ever returns.
 */

/** The five regions the creed can point at. */
export type PlanRegion = "doors" | "piers" | "arrows" | "stations" | "altar";

/**
 * THE TWELVE PIERS — a polar grid, not a scatter.
 *
 * Re-measured from the source photograph: the twelve ink blobs were thresholded
 * and each one's centre, long-axis angle, length and breadth taken — the angle by
 * PCA, the length and breadth by contiguous chords across the blob, which is the
 * only way to keep the low wall and the sanctuary steps from being counted into
 * P9–P12. What came out is the order the eye reads in the book but which a table
 * of per-pier tilts hides: every pier is elongated along a RAY from a single point
 * on the axis of symmetry, and that point is not a free parameter — it is where
 * the two low walls, produced back through the sanctuary, meet. One focus fits all
 * twelve long axes to an r.m.s. of 1.7°, and the eight nave piers to 0.8°.
 *
 * So the piers were not set out one by one. They stand on three rays to each side:
 * the low wall itself, which carries P9–P12, and the two nave rays. The eight nave
 * piers are then cut by two arcs struck from the same focus — the two transverse
 * bands of the colonnade — while P9–P12 keep their own two stations along the wall.
 * The plan was laid out with a peg and a cord.
 *
 * Each pier is therefore given as the source set it out: the ray it stands on, and
 * how far down that ray. Left and right are one number, mirrored. The book is not
 * truly symmetric — the draughtsman put P8 fifty units further down its ray than
 * P3, and drew it a fifth smaller — but the church is, and those differences are
 * his hand, not the building. Sizes are the median of the four piers in each band,
 * so that one small pier cannot drag the band.
 */

/** Where the rays meet: on the axis, just behind the sanctuary. */
const FOCUS_Y = 24;

/** The three rays to each side, in degrees off the axis. */
const RAY_LOW_WALL = 6.17; // the low wall itself — P9–P12 stand astride it
const RAY_INNER = 16.44;
const RAY_OUTER = 26.48;

/** ray° (−ve = left nave, +ve = right nave), radius from the focus, length, breadth. */
const PIERS: [number, number, number, number, string][] = [
  [-RAY_LOW_WALL, 403, 113, 49, "P11"],
  [RAY_LOW_WALL, 403, 113, 49, "P12"],
  [-RAY_OUTER, 655, 93, 46, "P1"],
  [-RAY_INNER, 655, 93, 46, "P2"],
  [RAY_INNER, 655, 93, 46, "P5"],
  [RAY_OUTER, 655, 93, 46, "P6"],
  [-RAY_LOW_WALL, 781, 127, 63, "P9"],
  [RAY_LOW_WALL, 781, 127, 63, "P10"],
  [-RAY_OUTER, 949, 107, 57, "P3"],
  [-RAY_INNER, 949, 107, 57, "P4"],
  [RAY_INNER, 949, 107, 57, "P7"],
  [RAY_OUTER, 949, 107, 57, "P8"],
];

/**
 * THE WEST EXTENSION — the one place this drawing departs from the source.
 *
 * Set to 0 and the plan is the book exactly: the porch, its steps and the foot of
 * the low walls fall on the source's ink to within a couple of units. Set above 0
 * and the whole west end — the corridor mouth, the porch, the steps — is carried
 * that many units further from the altar, and the two low walls are lengthened
 * along their own splay to follow, so the corridor stays a true continuation of
 * them rather than a stretched copy. The nave, the sanctuary, the doors and the
 * twelve piers do not move.
 *
 * This is a compositional choice, not a measurement: the church is drawn longer
 * than Sivasubramanian drew it. Everything below is derived from this one number.
 */
const WEST_EXTENSION = 90;

/** The low walls' own splay, dx per dy — they open outward as they run west. */
const LOW_WALL_SLOPE = -72 / 666;

const round1 = (n: number) => Math.round(n * 10) / 10;

/** The foot of the low walls, and the corridor mouth that springs from it. */
const WALL_FOOT_Y = 1018 + WEST_EXTENSION;
const WALL_FOOT_OUTER = round1(-120 + LOW_WALL_SLOPE * WEST_EXTENSION);
const WALL_FOOT_INNER = round1(-95 + LOW_WALL_SLOPE * WEST_EXTENSION);
const MOUTH_Y = 1016 + WEST_EXTENSION;
const MOUTH_X = round1(-35.5 + LOW_WALL_SLOPE * (MOUTH_Y - 352)); // on their centreline
const JAMB_Y = 1020 + WEST_EXTENSION;

/** The porch. */
const PORCH_Y = 1140 + WEST_EXTENSION; // its two outer corners
const PORCH_FRONT_Y = 1276 + WEST_EXTENSION; // its west face

/**
 * Doors 2 and 4 travel with the porch too, and so does the knee of the outer wall
 * above them. They have to: the wall that runs from each door on to the porch is
 * short, so if the porch moved and the door did not, that wall would be stretched
 * and swing round — from 69° off the axis to 47°, which is all but the 46° of the
 * wall on the other side of the door. The doorway would stop reading as a doorway
 * and start reading as a straight wall with a gap knocked in it.
 *
 * Carrying the doors down instead keeps every jamb angle and the door's width
 * exactly as the source has them. What absorbs the extension is the one long
 * straight run above the knee (-628,772 → the knee), which simply gets longer —
 * it swings by 6°, and on a wall that length nobody can see it.
 */
const WALL_KNEE_Y = 1015 + WEST_EXTENSION; // where the long outer wall turns
const DOOR_FAR_Y = 1060 + WEST_EXTENSION; // the jamb away from the porch
const DOOR_NEAR_Y = 1075 + WEST_EXTENSION; // the jamb toward it

/**
 * How far doors 2 and 4 are slid outward along their wall — 2 to the left, 4 to the
 * right. The knee travels with them, which is what makes this safe: the wall between
 * the knee and the door is only 65 units long, so sliding the door alone would eat it
 * and swing it upright. Carrying the knee too leaves that segment and the doorway
 * itself untouched, and lets the one long outer wall take the change (it flattens
 * from 19.5° to 13.2°). Set to 0 to put the doors back on the source's line.
 */
const DOOR_SHIFT = 40;

const KNEE_X = -510 - DOOR_SHIFT;
const DOOR_FAR_X = -463 - DOOR_SHIFT;
const DOOR_NEAR_X = -385 - DOOR_SHIFT;
const DOOR_FAR_JAMB_X = -469 - DOOR_SHIFT;
const DOOR_NEAR_JAMB_X = -391 - DOOR_SHIFT;

/** Where the source prints each pier's label — kept clear of the pier itself. */
const PIER_LABELS: [number, number, string][] = [
  [-100, 415, "P11"],
  [112, 425, "P12"],
  [-272, 527, "P1"],
  [-166, 580, "P2"],
  [162, 570, "P5"],
  [276, 540, "P6"],
  [-148, 790, "P9"],
  [162, 780, "P10"],
  [-492, 800, "P3"],
  [-348, 1022, "P4"],
  [348, 1022, "P7"],
  [492, 800, "P8"],
];

/** The five doors, numbered exactly as the source numbers them. */
const DOOR_NUMERALS: [number, number, string][] = [
  [-556, 592, "1"],
  // doors 2, 3 and 4 travel with the porch (WEST_EXTENSION); 2 and 4 also slide
  // outward along their wall (DOOR_SHIFT), and their numerals go with them
  [-440 - DOOR_SHIFT, 1120 + WEST_EXTENSION, "2"],
  [-16, 1056 + WEST_EXTENSION, "3"],
  [440 + DOOR_SHIFT, 1120 + WEST_EXTENSION, "4"],
  [556, 592, "5"],
];

/**
 * An entry arrow — the direction of approach, turned toward the altar. Drawn
 * once around the origin, then set in place by (x, y) and tilted by `angle`
 * (degrees, +ve = tip swung toward the right nave) so the two flanking naves
 * can lean their arrows in toward the cross. `scale` shrinks it for the two
 * marks that continue up the centre corridor — see THE CENTRE PATH below.
 */
function Arrow({
  x = 0,
  y,
  angle = 0,
  scale = 1,
}: {
  x?: number;
  y: number;
  angle?: number;
  scale?: number;
}) {
  return (
    <path
      className="plan-mark"
      d="M -7,34 L -7,-8 L -18,-8 L 0,-34 L 18,-8 L 7,-8 L 7,34 Z"
      fill="currentColor"
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
    />
  );
}

/**
 * THE CENTRE PATH — the walk from the central door to the cross.
 *
 * Two further arrows, set on the axis above the central entry arrow, so the
 * corridor between the low walls reads as a path travelled and not merely as a
 * doorway faced. They carry the parish's fourteen — the Stations — which is a
 * reading of that walk, so they are their own region and NOT part of `arrows`:
 * the three nails must stay three when a visitor lights them up.
 *
 * The region is the arrows AND the two low walls that make the corridor — the
 * path, not just the marks along it. The low walls stay where they are in the
 * document (see the group itself for why) and simply carry the region class.
 *
 * Kept deliberately smaller and fainter than the three entry arrows. At full
 * size and full strength, five arrows all alike would be counted as five ways
 * in; at this weight they read as the tread of one path instead. The stations
 * y-values run at the same 160-unit interval as the gap up from the entry
 * arrow at y=1030, and both clear the corridor: the low walls' inner faces are
 * some 79 and 62 units off the axis at these heights, against the arrow's 14.
 */
const STATION_ARROWS = [870, 710];

export function PlanDrawing({
  title,
  active = null,
  onSelect,
}: {
  title: string;
  active?: PlanRegion | null;
  onSelect?: (region: PlanRegion) => void;
}) {
  /** Highlight class for a region group: neutral, lifted, or dimmed. */
  const rcls = (region: PlanRegion) => {
    const base = "plan-region" + (onSelect ? " cursor-pointer" : "");
    if (!active) return base;
    return active === region ? `${base} plan-region--on` : `${base} plan-region--off`;
  };
  /**
   * The neutral base — outer walls, porch, steps, compass. It is never the
   * thing being lit, but it has to FALL BACK with everything else when some
   * region is: left at full strength while the other regions dropped to 0.2 it
   * simply read as highlighted itself, which is exactly the wrong answer to
   * "which part of the church is this number?". Dimmed to the same 0.2, the
   * plan still holds its silhouette and only the lit region carries weight.
   */
  const bcls = "plan-region" + (active ? " plan-region--off" : "");
  /** Click-to-select on the region itself (a bonus affordance; the list drives it).
      It only reports the clicked region — the parent owns the toggle/hover state. */
  const pick = (region: PlanRegion) =>
    onSelect ? { onClick: () => onSelect(region) } : {};

  return (
    <svg
      viewBox={`-700 20 1400 ${1400 + WEST_EXTENSION}`}
      role="img"
      aria-label={title}
      className="w-full h-auto"
    >
      <title>{title}</title>

      {/* ── BASE STRUCTURE — nave walls, porch, the priests' jambs ──────────
          The base is split in two around the low walls (which belong to the
          centre path, not to the base) so that nothing here ever nests inside
          a lit or dimmed group: SVG group opacities multiply, so a lit region
          inside a dimmed base would come out dimmed. */}
      <g className={bcls}>
        {/* The nave outer walls (broken by the doors) and the west porch */}
        <g
          className="text-gold/75"
          stroke="currentColor"
          fill="none"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* The shoulders, where the naves spring away from the sanctuary block */}
          <path className="plan-line" d="M -266,443 L -383,444" />
          <path className="plan-line" d="M 266,443 L 383,444" />
          {/* Left outer wall — broken by doors 1 and 2 */}
          <path className="plan-line" d="M -383,444 L -475,565" />
          <path
            className="plan-line"
            d={`M -555,637 L -628,772 L ${KNEE_X},${WALL_KNEE_Y} L ${DOOR_FAR_X},${DOOR_FAR_Y}`}
          />
          <path
            className="plan-line"
            d={`M ${DOOR_NEAR_X},${DOOR_NEAR_Y} L -218,${PORCH_Y}`}
          />
          {/* Right outer wall — broken by doors 5 and 4 */}
          <path className="plan-line" d="M 383,444 L 475,565" />
          <path
            className="plan-line"
            d={`M 555,637 L 628,772 L ${-KNEE_X},${WALL_KNEE_Y} L ${-DOOR_FAR_X},${DOOR_FAR_Y}`}
          />
          <path
            className="plan-line"
            d={`M ${-DOOR_NEAR_X},${DOOR_NEAR_Y} L 218,${PORCH_Y}`}
          />
          {/* The west porch, and its walls running back up to the corridor mouth */}
          <path
            className="plan-line"
            d={`M -218,${PORCH_Y} L -134,${PORCH_FRONT_Y} L 134,${PORCH_FRONT_Y} L 218,${PORCH_Y}`}
          />
          <path className="plan-line" d={`M ${MOUTH_X},${MOUTH_Y} L -218,${PORCH_Y}`} />
          <path className="plan-line" d={`M ${-MOUTH_X},${MOUTH_Y} L 218,${PORCH_Y}`} />
        </g>

        {/* The priests' door jambs, at the mouth of the corridor */}
        <g
          className="text-gold/75"
          stroke="currentColor"
          fill="none"
          strokeWidth={9}
          strokeLinecap="round"
        >
          <path className="plan-line" d={`M ${MOUTH_X},${MOUTH_Y} L -60,${JAMB_Y}`} />
          <path className="plan-line" d={`M ${-MOUTH_X},${MOUTH_Y} L 60,${JAMB_Y}`} />
        </g>
      </g>

      {/* ── THE TWO LOW WALLS (the "double balustrade", demolished c.1910) ──
          Drawn hollow, as the source draws them: two thin parallel lines.

          They are the centre path — the priest's corridor from the central
          door up to the altar — so they belong to `stations` and light with
          its arrows rather than sitting in the neutral base. Left at this
          point in the document on purpose: the piers are painted after them,
          and P9–P12 straddle these walls, so moving the group down beside the
          arrows would draw the wall lines across the four piers. */}
      <g
        className={`${rcls("stations")} text-gold/55`}
        data-region="stations"
        {...pick("stations")}
        stroke="currentColor"
        fill="none"
        strokeWidth={4}
        strokeLinejoin="round"
      >
        <path
          className="plan-line"
          d={`M -48,352 L ${WALL_FOOT_OUTER},${WALL_FOOT_Y} L ${WALL_FOOT_INNER},${WALL_FOOT_Y} L -23,352 Z`}
        />
        <path
          className="plan-line"
          d={`M 48,352 L ${-WALL_FOOT_OUTER},${WALL_FOOT_Y} L ${-WALL_FOOT_INNER},${WALL_FOOT_Y} L 23,352 Z`}
        />
      </g>

      {/* ── BASE, continued — the entrance steps and the compass ──────────── */}
      <g className={bcls}>
        {/* ── THE ENTRANCE STEPS, below the porch ─────────────────────────── */}
        <g
          className="text-gold/60"
          stroke="currentColor"
          fill="none"
          strokeWidth={6}
          strokeLinejoin="round"
        >
          {([
            [87, 1287, 1304],
            [62, 1309, 1331],
            [39, 1333, 1349],
          ] as const).map(([half, top, bottom]) => {
            const t = top + WEST_EXTENSION;
            const b = bottom + WEST_EXTENSION;
            return (
              <path
                key={half}
                className="plan-line"
                d={`M ${-half},${t} L ${half},${t} L ${half},${b} L ${-half},${b} Z`}
              />
            );
          })}
        </g>

        {/* ── THE COMPASS MARK, as the source draws it ────────────────────── */}
        {/* it sits beside the porch in the source, so it keeps that station */}
        <g
          className="plan-mark text-gold/60"
          transform={`translate(578, ${1300 + WEST_EXTENSION})`}
        >
          <path
            fill="currentColor"
            d="M 0,-72 L 26,52 L 0,26 L -26,52 Z"
            opacity={0.5}
          />
          <path fill="currentColor" d="M 0,-72 L 26,52 L 0,26 Z" />
          <text
            x={62}
            y={12}
            fontSize={54}
            className="font-display"
            fill="currentColor"
            textAnchor="middle"
          >
            N
          </text>
        </g>
      </g>

      {/* ── ALTAR / SANCTUARY — the one altar every nave meets at ──────────── */}
      <g className={rcls("altar")} data-region="altar" {...pick("altar")}>
        {/* The sacristy and the apsidal sanctuary walls */}
        <g
          className="text-gold/75"
          stroke="currentColor"
          fill="none"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* The sacristy behind the altar */}
          <path className="plan-line" d="M -148,186 L -148,46 L 148,46 L 148,186" />
          {/* The sanctuary: top wall + the two chamfered apse walls */}
          <path className="plan-line" d="M -148,186 L 148,186" />
          <path className="plan-line" d="M -148,186 L -222,245 L -270,303 L -266,443" />
          <path className="plan-line" d="M 148,186 L 222,245 L 270,303 L 266,443" />
        </g>

        {/* Three altar-platform steps, the chancel step, and the altar table */}
        <g
          className="text-gold/50"
          stroke="currentColor"
          fill="none"
          strokeWidth={5}
          strokeLinejoin="round"
        >
          <path className="plan-line" d="M -128,186 L -213,302 L -172,347" />
          <path className="plan-line" d="M -108,186 L -196,303 L -143,347" />
          <path className="plan-line" d="M -88,186 L -165,300 L -116,347" />
          <path className="plan-line" d="M 128,186 L 213,302 L 172,347" />
          <path className="plan-line" d="M 108,186 L 196,303 L 143,347" />
          <path className="plan-line" d="M 88,186 L 165,300 L 116,347" />
          {/* the chancel step, drawn straight across the mouth of the corridor */}
          <path className="plan-line" d="M -116,347 L 116,347" />
          {/* the altar table, a hollow rectangle as in the source */}
          <path className="plan-line" d="M -67,207 L 67,207 L 67,240 L -67,240 Z" />
          <path className="plan-line" d="M -54,216 L 54,216 L 54,231 L -54,231 Z" />
        </g>

        {/* The altar cross */}
        <path
          className="plan-mark text-gold"
          fill="currentColor"
          d="M -7,290 L 7,290 L 7,305 L 21,305 L 21,319 L 7,319 L 7,340 L -7,340 L -7,319 L -21,319 L -21,305 L -7,305 Z"
        />
      </g>

      {/* ── DOORS — the five wounds: jambs + numerals ─────────────────────── */}
      <g className={rcls("doors")} data-region="doors" {...pick("doors")}>
        {/* Door jambs — the short returns that mark each opening. Each stands
            square across its own doorway and points out of the church, which is
            how the source draws all five. */}
        <g
          className="text-gold/75"
          stroke="currentColor"
          fill="none"
          strokeWidth={9}
          strokeLinecap="round"
        >
          <path className="plan-line" d="M -475,565 L -505,542" />
          <path className="plan-line" d="M -555,637 L -524,660" />
          <path
            className="plan-line"
            d={`M ${DOOR_FAR_X},${DOOR_FAR_Y} L ${DOOR_FAR_JAMB_X},${DOOR_FAR_Y + 31}`}
          />
          <path
            className="plan-line"
            d={`M ${DOOR_NEAR_X},${DOOR_NEAR_Y} L ${DOOR_NEAR_JAMB_X},${DOOR_NEAR_Y + 31}`}
          />
          <path className="plan-line" d="M 475,565 L 505,542" />
          <path className="plan-line" d="M 555,637 L 524,660" />
          <path
            className="plan-line"
            d={`M ${-DOOR_FAR_X},${DOOR_FAR_Y} L ${-DOOR_FAR_JAMB_X},${DOOR_FAR_Y + 31}`}
          />
          <path
            className="plan-line"
            d={`M ${-DOOR_NEAR_X},${DOOR_NEAR_Y} L ${-DOOR_NEAR_JAMB_X},${DOOR_NEAR_Y + 31}`}
          />
        </g>

        {/* The five door numerals, exactly as the source numbers them */}
        <g className="plan-mark font-display text-gold" fill="currentColor" fontSize={62}>
          {DOOR_NUMERALS.map(([x, y, n]) => (
            <text key={n} x={x} y={y} textAnchor="middle">
              {n}
            </text>
          ))}
        </g>
      </g>

      {/* ── THE TWELVE PIERS — the twelve apostles: rects + labels ─────────── */}
      <g className={rcls("piers")} data-region="piers" {...pick("piers")}>
        <g className="text-gold" fill="currentColor">
          {PIERS.map(([ray, radius, len, brd, id]) => {
            const t = (ray * Math.PI) / 180;
            /* Rounded at set-out: 0.01 unit is under half a millimetre on the real
               church, and it keeps the markup identical across JS engines. */
            const dx = Math.round(radius * Math.sin(t) * 100) / 100;
            const y = Math.round((FOCUS_Y + radius * Math.cos(t)) * 100) / 100;
            return (
              <rect
                key={id}
                className="plan-dot"
                x={dx - brd / 2}
                y={y - len / 2}
                width={brd}
                height={len}
                /* SVG turns clockwise; the ray is measured the other way. */
                transform={`rotate(${-ray} ${dx} ${y})`}
              />
            );
          })}
        </g>
        <g className="plan-mark font-display text-gold/55" fill="currentColor" fontSize={34}>
          {PIER_LABELS.map(([x, y, id]) => (
            <text key={id} x={x} y={y} textAnchor="middle">
              {id}
            </text>
          ))}
        </g>
      </g>

      {/* ── ENTRY ARROWS — the three nails: the three DIRECTIONS in ─────────
          Not one path up the centre, but the three ways the church is entered —
          the left nave, the central corridor, the right nave — each turned in
          toward the one altar. The parish note reads the number as "three
          directions – three nails", which is what these three now show. They sit
          in the nave body, which does not move with WEST_EXTENSION. */}
      <g className={`${rcls("arrows")} text-gold/70`} data-region="arrows" {...pick("arrows")}>
        <Arrow x={-232} y={1030} angle={13} />
        <Arrow x={0} y={1030} angle={0} />
        <Arrow x={232} y={1030} angle={-13} />
      </g>

      {/* ── THE CENTRE PATH — the fourteen: the walk from the central door up
          the corridor to the cross. Its own region, so lighting the three
          nails still lights exactly three. See THE CENTRE PATH above. */}
      <g
        className={`${rcls("stations")} text-gold/45`}
        data-region="stations"
        {...pick("stations")}
      >
        {STATION_ARROWS.map((y) => (
          <Arrow key={y} y={y} scale={0.8} />
        ))}
      </g>
    </svg>
  );
}
