/**
 * The seven moments the home page shows out of /history's fifty-six.
 *
 * The prose for each of these lives in i18n.ts as `home.chronicleFrames`,
 * because it is translated. What lives here is what is NOT translatable — the
 * painting and the chapter it opens — and it lives in its own module because
 * three different presentations of this section share it (see
 * components/sections/chronicle/).
 *
 * ⚠ INDEX-ALIGNED WITH `home.chronicleFrames` IN BOTH LANGUAGES. Add, remove or
 * reorder an entry here and you must do the same in the `en` and `ta` blocks of
 * i18n.ts, or a year will wear another year's picture — the exact failure
 * citations.ts documents at the head of its `photo` field.
 *
 * THE PAINTINGS ARE THE HISTORY PAGE'S OWN. Each one is the image /history uses
 * for that very moment (citations.ts `photo`), so a reader who follows the link
 * arrives at pictures they have already seen. That continuity is the point. Do
 * not swap them for general shrine photography.
 */
export const CHRONICLE_FRAMES = [
  { photo: "clearing-in-the-forest-2.jpg", href: "/history#clearing-in-the-forest" },
  { photo: "clearing-in-the-forest-4.jpg", href: "/history#clearing-in-the-forest" },
  { photo: "statue-and-the-saint-2.jpg", href: "/history#statue-and-the-saint" },
  { photo: "the-weeping-madonna-2.jpg", href: "/history#the-weeping-madonna" },
  { photo: "great-two-nave-church-5.jpg", href: "/history#great-two-nave-church" },
  { photo: "little-rome-4.jpg", href: "/history#little-rome" },
  { photo: "shrine-and-the-saint-4.jpg", href: "/history#shrine-and-the-saint" },
] as const;

export type ChronicleFrameMeta = (typeof CHRONICLE_FRAMES)[number];

/**
 * The three numbers the Chronicle's copy quotes, counted rather than typed.
 *
 * WHY THIS EXISTS. The first draft of that copy said "fifty-six moments"
 * because a stale comment at the head of HistoryExperience.tsx said fifty-six.
 * /history actually holds fifty-eight, and it had held fifty-eight for a while:
 * a number written into a sentence has no way of noticing that a year was added
 * to a chapter. So the sentences carry `{n}`, `{c}` and `{y}` and this counts
 * the real thing — add a moment to /history tomorrow and the home page says so
 * the same day.
 *
 * `shown` is how many the carousel itself displays, so `remaining` is what is
 * genuinely still unread when the reader reaches the closing panel.
 */
export function chronicleCounts(
  eras: readonly { dots: readonly unknown[] }[],
  shown: number,
) {
  const moments = eras.reduce((n, era) => n + era.dots.length, 0);
  return {
    moments,
    chapters: eras.length,
    remaining: Math.max(0, moments - shown),
  };
}

/** Fill `{n}`, `{c}` and `{y}` in a dictionary string. */
export function fillCounts(
  template: string,
  values: { n?: number | string; c?: number | string; y?: number | string },
): string {
  return template.replace(/\{(n|c|y)\}/g, (whole, key: "n" | "c" | "y") =>
    values[key] === undefined ? whole : String(values[key]),
  );
}

/** The translated half of a frame, as it comes out of the dictionary. */
export type ChronicleFrame = {
  year: string;
  chapter: string;
  title: string;
  line: string;
};

/**
 * The three presentations of this section, built so one can be chosen and the
 * other two deleted.
 *
 *   film     — a horizontal strip, scrubbed sideways by the page's own scroll.
 *   hairline — a single gold rule down the page with the years hung off it.
 *   book     — one open spread, a page turned at a time.
 *
 * See components/sections/Chronicle.tsx for how one is selected, and for the
 * note on removing this machinery once the choice is made.
 */
export type ChronicleVariant = "film" | "hairline" | "book";
