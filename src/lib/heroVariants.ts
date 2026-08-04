/* ── THE HERO LADDER: FIVE CUTS, ONE DECISION, ON A REAL iPHONE ────────────
   TEMPORARY. Delete this file, public/hero-test/, the /hero-test route and
   the `?hero=` branch in useHeroMedia once a winner is picked.

   ── WHAT IS ACTUALLY BEING DECIDED ──
   The site has two ways to drive a scroll-scrubbed hero on a phone:

     seeked      a plain <video>, moved with currentTime. Each move is a
                 pipeline flush plus a decode — 20-50ms, and the cost rises
                 with resolution.
     WebCodecs   a VideoDecoder handed exactly the one picture the scroll
                 wants, drawn to a canvas. ~8ms on a Galaxy A55, in any
                 direction, because a single-frame decode is cheap.

   WebCodecs wins outright on Android and the site uses it there. iPhones were
   kept off it because it was believed to kill the tab — a belief formed while
   the Chronicle carousel was killing every iPhone no matter what the hero did,
   and now disproven: an iPhone has run the film with no crash. It merely felt
   LAGGIER than the seeked video.

   ⚠ THAT COMPARISON PROVED NOTHING, WHICH IS WHY THIS LADDER EXISTS.
   The film had 1080x1920 against the video's 810x1440 — 78% more pixels — AND
   a `scrub` of 1 against the video's 0.35, i.e. nearly three times the easing.
   Two variables moved at once, so "the film is laggier" could equally have
   meant "more pixels is laggier" or "more easing is laggier". No conclusion
   was available from it.

   So every entry here is pinned to SCRUB, below. The only things that differ
   across the ladder are the mechanism and the resolution, which are the two
   things being chosen. Tune the easing AFTERWARDS, once there is a winner —
   doing both at once is what wasted the first comparison.

   ── HOW TO READ A RESULT ──
   Smoothness and sharpness pull in opposite directions and only the person
   holding the phone can price them against each other. Roughly:

     · a cut feels JITTERY  → the decode is not keeping up. Go down a rung.
     · a cut looks SOFT     → it is being upscaled. Go up a rung.
     · f810 beats v810      → WebCodecs wins on iOS at equal pixels; the
                              default moves and iPhones stop seeking.
     · v810 beats f810      → seeking wins on iOS, and the current default is
                              right. Then it is only a question of which rung.

   The second is the interesting outcome, because the two are the SAME picture
   at the SAME size and the same easing — nothing is left but the mechanism. */

export type HeroVariantId = "v648" | "v810" | "v1080" | "f810" | "f1080";

export type HeroVariant = {
  id: HeroVariantId;
  /** Which hook drives it. */
  mode: "film" | "mobileVideo";
  width: number;
  height: number;
  /** Megabytes over the wire, so a tester can weigh sharpness against data. */
  mb: number;
  /** mobileVideo only. */
  videoSrc?: string;
  /** film only. */
  filmSrc?: string;
  indexSrc?: string;
  label: string;
  note: string;
};

/* ⚠ Held equal across every rung ON PURPOSE — see the note above. 0.35 is the
   seeked path's production value: enough smoothing to absorb the variance
   between one seek and the next without adding perceptible lag of its own.
   The film runs 1 in production, which is right when a decode is ~8ms and the
   canvas can track an eased target exactly; whether that holds on iOS is a
   SEPARATE question, and mixing it into this one is what broke the last
   comparison. */
export const VARIANT_SCRUB = 0.35;

/* v810 and f1080 point at the PRODUCTION files rather than at copies. The
   baseline in a ladder has to be the real thing, or a re-encode's own quirks
   get read as a difference between rungs. Their `?c=` must match `CUT` in
   Hero.tsx for the same reason it exists there at all. */
export const HERO_VARIANTS: Record<HeroVariantId, HeroVariant> = {
  v648: {
    id: "v648",
    mode: "mobileVideo",
    width: 648,
    height: 1152,
    mb: 4.57,
    videoSrc: "/hero-test/v648.mp4",
    label: "Seeked · 648×1152",
    note: "What shipped until today. Smoothest of the seeked cuts, and the one previously reported as looking soft.",
  },
  v810: {
    id: "v810",
    mode: "mobileVideo",
    width: 810,
    height: 1440,
    mb: 2.78,
    videoSrc: "/hero-mobile.mp4?c=3",
    label: "Seeked · 810×1440  ← current default",
    note: "Live now. Sharper AND smaller than 648, because GOP 10 compresses what all-IDR could not.",
  },
  v1080: {
    id: "v1080",
    mode: "mobileVideo",
    width: 1080,
    height: 1920,
    mb: 4.13,
    videoSrc: "/hero-test/v1080.mp4",
    label: "Seeked · 1080×1920",
    note: "As sharp as the screen can show. Ask whether the seeks keep up at this size.",
  },
  f810: {
    id: "f810",
    mode: "film",
    width: 810,
    height: 1440,
    mb: 8.63,
    filmSrc: "/hero-test/f810.h264",
    indexSrc: "/hero-test/f810.json",
    label: "WebCodecs · 810×1440",
    note: "THE ONE THAT SETTLES IT — same picture, size and easing as v810, so only the mechanism differs.",
  },
  f1080: {
    id: "f1080",
    mode: "film",
    width: 1080,
    height: 1920,
    mb: 13.47,
    filmSrc: "/hero-frames/film.h264?c=3",
    indexSrc: "/hero-frames/film.json?c=3",
    label: "WebCodecs · 1080×1920",
    note: "What Android runs, and what felt laggy on the iPhone — but at scrub 1. Here it gets 0.35, so this is a re-run of that test with the easing controlled.",
  },
};

export const HERO_VARIANT_IDS = Object.keys(HERO_VARIANTS) as HeroVariantId[];

export function isHeroVariantId(v: string | null): v is HeroVariantId {
  return v !== null && Object.hasOwn(HERO_VARIANTS, v);
}
