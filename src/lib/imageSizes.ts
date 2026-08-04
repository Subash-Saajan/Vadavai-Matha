/* ── WHY A PHONE IS DELIBERATELY SERVED A SMALLER PICTURE THAN IT ASKED FOR ─
   A `sizes` attribute is an honest statement of layout: "this picture is one
   viewport wide". The browser then multiplies it by the device pixel ratio to
   decide which entry of the srcset to fetch. On a modern iPhone that ratio is
   3, so `100vw` on a 390pt screen asks for 1170 device pixels and Next hands
   back the 1200-wide rendition.

   That rendition costs 1200 × 1600 × 4 = 7.3 MB of RAM. Not 145 KB, which is
   what the file weighs — a decoded bitmap is uncompressed by definition, and
   its size is fixed by its dimensions alone. Compressing the source harder
   changes the download and does not change this number by one byte. It is the
   single most expensive thing on any page of this site, it is invisible in
   every network panel, and fifty-two of them on the home page came to 151 MB.

   On iOS that is fatal. Safari does not swap or degrade; it kills the tab and
   shows "This page couldn't load — Reload to try again", with no console and
   no clue as to the cause. See the head of `useScrubMedia.ts`, which fought
   the same fight for the hero's film. The budget is tighter still inside the
   in-app browsers — WhatsApp's above all, which is how most people arrive here.

   So phones are capped at an EFFECTIVE PIXEL RATIO OF 2 instead of 3. That is
   the density every mainstream site serves and comfortably past the point the
   eye resolves at arm's length; 828px across a 390pt screen is still 2.1×. It
   costs nothing visible and it halves the page:

       1200 × 1600  =  7.3 MB   →   828 × 1104  =  3.7 MB
       1080 × 1350  =  5.6 MB   →   640 ×  800  =  2.0 MB

   `cappedSizes` does not rewrite the caller's statement of layout — the
   `sizes` strings at the call sites stay truthful, which is what makes them
   readable. It PREPENDS a phone-only branch computed from them. Everything at
   641px and wider matches exactly the branch it always did. */

/** Reference phone viewport. iPhone 12–16 are 390–393pt; the Pro Maxes 430. */
const PHONE_VW = 390;

/** 3 ÷ 2 expressed as a multiplier on the requested width. See above. */
const CAP = 2 / 3;

/* Below this many CSS pixels the cap buys nothing and can only cost sharpness.
   The number to keep in view is which RENDITION a request lands in, not the
   request itself — Next offers 128, 256 and 384 below its device sizes, so the
   saving is a step function and the floor has to sit under the step.

   200 was too high and it showed. The gallery's plates ask for 45vw — 175pt on
   a phone, which at a ratio of 3 is 526 device pixels and therefore the 640
   rendition: 2.1 MB apiece across thirty-nine plates, and the one page the cap
   left almost untouched. Capping to a ratio of 2 asks for 351 and lands in the
   384 rendition instead, at 0.79 MB. The plate is 384 pixels across a 175pt
   box either way — 2.2×, still past what the eye resolves.

   120 keeps the genuinely small marks out of it, which is the whole point of
   having a floor: the priests' portraits at 80px and the chapter thumbnails at
   76px are looked at closely, are already only a fifth of a megabyte, and have
   no memory worth reclaiming. */
const FLOOR_PX = 120;

/** The phone branch is scoped to 640px so it cannot capture tablet widths,
    where the caller's own branches are already right. Real phones in portrait
    are 320–430pt, well inside it. */
const PHONE_MAX = 640;

/**
 * Evaluates one `sizes` value (`100vw`, `23rem`, `420px`) at PHONE_VW.
 * Returns null for anything unrecognised, which makes the caller pass the
 * whole string through untouched rather than guess.
 */
type Length = {
  px: number;
  /** True for `vw`, which tracks the viewport; false for `px`/`rem`, which
      do not. The capped branch has to be re-emitted in the same kind of unit
      or it stops meaning the same thing at the top of the phone range: 1300px
      re-expressed as a percentage of a 390pt phone is 222vw, which on a 640pt
      one is 1421px — larger than the value it was supposed to cap. */
  relative: boolean;
};

function toLength(value: string): Length | null {
  const v = value.trim();
  const n = parseFloat(v);
  if (!Number.isFinite(n)) return null;
  if (v.endsWith("vw")) return { px: (PHONE_VW * n) / 100, relative: true };
  if (v.endsWith("rem")) return { px: n * 16, relative: false };
  if (v.endsWith("px")) return { px: n, relative: false };
  return null;
}

/**
 * Does this branch's media condition hold on the reference phone?
 *
 * Only the two conditions this codebase actually writes are understood. A
 * `sizes` string containing anything else — `and`, `orientation`, a range
 * syntax — returns `unknown` and makes `cappedSizes` hand the whole string
 * back untouched rather than act on a guess. Serving a picture that is too
 * big wastes memory; serving one that is too small is visible, so the
 * uncertain case must fail towards leaving things alone.
 */
function holdsOnPhone(condition: string): boolean | "unknown" {
  const max = /^\(\s*max-width:\s*(\d+(?:\.\d+)?)px\s*\)$/.exec(condition);
  if (max) return PHONE_VW <= Number(max[1]);
  const min = /^\(\s*min-width:\s*(\d+(?:\.\d+)?)px\s*\)$/.exec(condition);
  if (min) return PHONE_VW >= Number(min[1]);
  return "unknown";
}

/**
 * Caps the phone rendition of a `sizes` attribute at an effective DPR of 2.
 *
 * Pass the honest layout string; get back the same string with a phone-only
 * branch in front of it. Pure, and safe to call during a server render — there
 * is no feature detection and no client state, so it cannot cause a hydration
 * mismatch.
 *
 * ⚠ APPLY IT EXACTLY ONCE. It is not idempotent: capping an already-capped
 * string caps it again, and two passes put a phone at an effective ratio of
 * 1.3, which IS visible. `ResidentImage` calls it for you, so a call site
 * using that component must pass its `sizes` through untouched. Call it by
 * hand only where a bare `next/image` is used — which should be rare, and is
 * why the rule is easy to keep.
 *
 *   cappedSizes("(max-width: 768px) 100vw, 45vw")
 *     → "(max-width: 640px) 67vw, (max-width: 768px) 100vw, 45vw"
 *
 *   cappedSizes("80px")   // already small
 *     → "80px"
 */
export function cappedSizes(sizes: string): string {
  const parts = sizes.split(",").map((p) => p.trim());

  // What the caller's own string resolves to on a phone: the first branch
  // whose condition the phone satisfies, or else the bare fallback.
  let honest: Length | null = null;
  for (const part of parts) {
    const branch = /^(\([^)]*\))\s*(.+)$/.exec(part);
    if (!branch) {
      honest = toLength(part); // bare fallback — always matches
      break;
    }
    // A compound condition (`… and …`) leaves a second parenthesis in what
    // the regex took to be the value. Bail rather than evaluate half of it.
    if (branch[2].includes("(")) return sizes;
    const holds = holdsOnPhone(branch[1]);
    if (holds === "unknown") return sizes;
    if (holds) {
      honest = toLength(branch[2]);
      break;
    }
  }

  if (honest === null || honest.px <= FLOOR_PX) return sizes;

  const capped = honest.px * CAP;
  const value = honest.relative
    ? `${Math.round((capped / PHONE_VW) * 100)}vw`
    : `${Math.round(capped)}px`;

  // A branch the new one would shadow completely is dropped rather than left
  // behind it as unreachable text — `(max-width: 640px) 78vw` after
  // `(max-width: 640px) 52vw` can never match, and reads like a bug.
  const kept = parts.filter(
    (p) => !new RegExp(`^\\(max-width:\\s*${PHONE_MAX}px\\)`).test(p),
  );

  return [`(max-width: ${PHONE_MAX}px) ${value}`, ...kept].join(", ");
}
