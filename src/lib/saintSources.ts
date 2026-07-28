/**
 * What each chapter of the two saints' pages actually rests on.
 *
 * The same discipline as citations.ts, applied to /saints/john-de-britto and
 * /saints/devasahayam-pillai. The tier is not decoration — it is the honest
 * strength of the claim:
 *
 *   documented — someone outside this parish, with no reason to flatter it,
 *                wrote it down.
 *   tradition  — the parish's own memory of itself. Cherished, long-held, and
 *                uncorroborated. We say so, on the page, in both languages.
 *
 * BOTH SAINTS LIVE IN ONE FILE, and the difference between them is the point.
 * De Britto's founding of this parish is the parish's own memory: no biography
 * of him names Vadakkankulam, and Besse — the mission's own historian — will
 * only write that the builder "is said to be" him. Devasahayam's baptism here
 * is the exact opposite, and the best-attested fact this village has: the Holy
 * See's own biographical record names the church and the day. Two saints, two
 * evidence pictures, one honest apparatus — put them side by side and neither
 * page can quietly borrow the other's confidence.
 *
 * KEYED BY SLUG, NOT BY INDEX. citations.ts is index-aligned with the i18n dots
 * array, which means inserting a moment silently attaches every later citation
 * to the wrong year. Here each section in i18n carries its own `key`, in both
 * languages, and that key is what resolves the sources and the painting — so
 * chapters can be added, cut or reordered and nothing drifts. `as const` on the
 * dictionary makes the two language arrays type-check against each other, so a
 * key typed wrong in the Tamil is a build error, not a missing citation.
 *
 * Every id here must exist in sources.ts, or the chip would point at a dead
 * anchor on /sources; the resolver filters unknown ids for that reason.
 */

import { sortKeys, type Tier } from "@/lib/citations";
import { SOURCE_INDEX } from "@/lib/sources";

export type SectionCite = {
  tier: Tier;
  /** Source ids. Order here is irrelevant — sortKeys ranks them by authority. */
  keys: string[];
  /**
   * The painting for this chapter, where it has one.
   *
   * Mostly the /history page's own paintings: the same hand painted the same
   * men, so the pages agree visually as well as factually. Alt text lives in
   * i18n, because it is prose and prose gets translated.
   */
  photo?: string;
};

export type SaintCiteMap = Record<string, SectionCite>;

/* ── St John de Britto ────────────────────────────────────────────────────
   THE HONEST GAP, RECORDED HERE SO NOBODY QUIETLY CLOSES IT. No biography of
   de Britto names Vadakkankulam — not Faber, not Boero, not the 1854
   abridgement — and his prison letter never mentions it. A full sweep of every
   text this project holds returns nothing (KB file 21, mismatch J2). The ONE
   outside source that puts him here is Pate's gazetteer, echoed by the 1934
   Supplement from the same lineage. What IS externally documented is that a
   church rose here in 1685 (Hardgrave, Pate, Neill) — not that de Britto's
   hands raised it. So the founding chapters are `tradition`, and the page says
   why, at length, in its own section.                                       */
export const DE_BRITTO_SECTIONS: SaintCiteMap = {
  lisbon: {
    tier: "documented",
    keys: ["boero_1853", "faber_1851"],
  },
  sannyasi: {
    tier: "documented",
    keys: ["cronin_1959", "neill_1985", "boero_1853"],
  },
  charge: {
    tier: "documented",
    keys: ["pate_gazetteer_1917", "boero_1853", "faber_1851"],
  },
  forestRoad: {
    tier: "tradition",
    keys: ["pate_gazetteer_1917", "besse_moumas_typescript"],
    photo: "/images/history/clearing-in-the-forest-3.jpg",
  },
  chapel: {
    tier: "documented",
    keys: [
      "pate_gazetteer_1917",
      "neill_1985",
      "hardgrave_1969",
      "besse_moumas_typescript",
    ],
    photo: "/images/history/clearing-in-the-forest-4.jpg",
  },
  harvest: {
    tier: "tradition",
    keys: ["faber_1851", "bishop_stephen_jubilee_2022", "diocese_thoothukudi_page"],
    photo: "/images/history/clearing-in-the-forest-5.jpg",
  },
  recalled: {
    tier: "documented",
    keys: ["boero_1853", "faber_1851"],
  },
  arrest: {
    tier: "documented",
    keys: ["debritto_prison_letter_1693", "faber_1851"],
  },
  oriyur: {
    tier: "documented",
    keys: [
      "debritto_prison_letter_1693",
      "maldonado_1697",
      "boero_1853",
      "faber_1851",
      "bertrand_1847",
    ],
    photo: "/images/history/clearing-in-the-forest-8.jpg",
  },
  afterwards: {
    tier: "documented",
    keys: ["boero_1853", "bertrand_1847"],
  },
  altars: {
    tier: "documented",
    keys: ["boero_1853", "maldonado_1697"],
  },
};

/** The parish's own account of its own devotion — parish-side, and labelled so. */
export const DE_BRITTO_TODAY_CITE: SectionCite = {
  tier: "tradition",
  keys: ["souvenir_150yr", "parish_english_history", "diocese_thoothukudi_page"],
};

/* ── St Devasahayam Pillai ────────────────────────────────────────────────
   THE STRONGEST THING THIS PARISH HAS. The baptism at Vadakkankulam on
   14 May 1745 is confirmed by the Holy See's own sources — Vatican News names
   the church, and L'Osservatore Romano, written by the Vice-Postulator of the
   cause, gives the day and the nine months of instruction — and sealed by the
   canonisation of 2022. Two Protestant historians of Travancore, Mackenzie and
   Agur, record the man and the place with no reason whatever to flatter a
   Catholic parish. Almost every chapter here is therefore `documented`, and it
   is earned rather than claimed.

   ONE PRECISION THE PAGE MUST KEEP (KB file 05, §G1): the RITE of canonisation
   recites only the name. The place and the date come from the Holy See's
   biographical pipeline, not from the homily or the bulletin — so the page says
   "officially recognised by the Holy See as the site", never "proclaimed at the
   canonisation".

   CASTE IS OFF THIS PAGE, per the parish's standing decision. The Vatican
   biography's account of his parentage stays in the Knowledge Base, and the
   sources cited here are cited for the events, never for that.              */
export const DEVASAHAYAM_SECTIONS: SaintCiteMap = {
  court: {
    tier: "documented",
    keys: ["mackenzie_1901", "auguste_jean_1894", "bertrand_1847"],
    photo: "/images/saints/devasahayam-pillai.jpg",
  },
  lannoy: {
    tier: "documented",
    keys: ["osservatore_romano_2012", "auguste_jean_1894", "bertrand_1847"],
  },
  font: {
    tier: "documented",
    keys: [
      "vatican_news_canonisation",
      "osservatore_romano_2012",
      "mackenzie_1901",
      "agur_1903",
      "auguste_jean_1894",
      "bertrand_1847",
    ],
    photo: "/images/history/statue-and-the-saint-2.jpg",
  },
  godfather: {
    tier: "documented",
    keys: ["trento_2022", "besse_moumas_typescript", "parish_english_history"],
  },
  timber: {
    tier: "documented",
    keys: ["besse_moumas_typescript", "auguste_jean_1894", "bertrand_1847"],
    photo: "/images/history/statue-and-the-saint-7.jpg",
  },
  seized: {
    tier: "documented",
    keys: ["osservatore_romano_2012", "auguste_jean_1894", "bertrand_1847"],
  },
  buffalo: {
    tier: "documented",
    keys: ["osservatore_romano_2012", "auguste_jean_1894", "bertrand_1847"],
  },
  chained: {
    tier: "documented",
    keys: ["auguste_jean_1894", "bertrand_1847"],
    photo: "/images/history/statue-and-the-saint-5.jpg",
  },
  night: {
    tier: "documented",
    keys: [
      "holy_see_canonisation_rite_2022",
      "osservatore_romano_2012",
      "auguste_jean_1894",
      "bertrand_1847",
    ],
  },
  kottar: {
    tier: "documented",
    keys: ["bertrand_1847", "auguste_jean_1894"],
  },
  gnanapoo: {
    tier: "documented",
    keys: ["gnanapoo_tomb_photograph", "souvenir_150yr", "parish_english_history"],
    photo: "/images/saints/gnanapoo-ammal-tomb.jpg",
  },
  altars: {
    tier: "documented",
    keys: [
      "holy_see_canonisation_rite_2022",
      "pope_francis_homily_2022",
      "vatican_news_canonisation",
      "ccbi_patron_laity_2025",
      "souvenir_150yr",
    ],
  },
};

/** The relics and the two feasts: the parish's own account of its own keeping. */
export const DEVASAHAYAM_TODAY_CITE: SectionCite = {
  tier: "tradition",
  keys: [
    "auguste_jean_1894",
    "narchison_2011",
    "souvenir_150yr",
    "parish_english_history",
    "diocese_thoothukudi_page",
  ],
};

/**
 * Resolve a section's citation to renderable sources, strongest witness first.
 * Returns undefined for a section with no citation block at all, and an empty
 * `sources` array for one whose keys are all unknown — the page says so rather
 * than showing an empty badge.
 */
export const makeCiteFor =
  (map: SaintCiteMap) =>
  (key: string) => {
    const cite = map[key];
    if (!cite) return undefined;
    return {
      tier: cite.tier,
      photo: cite.photo,
      sources: sortKeys(cite.keys)
        .map((k) => SOURCE_INDEX[k])
        .filter(Boolean),
    };
  };

/** The bibliography row under a page: every book it leans on, once, ranked. */
export const bibliographyOf = (...cites: SectionCite[]): string[] =>
  sortKeys([...new Set(cites.flatMap((c) => c.keys))]).filter(
    (k) => SOURCE_INDEX[k],
  );

export const deBrittoCiteFor = makeCiteFor(DE_BRITTO_SECTIONS);
export const devasahayamCiteFor = makeCiteFor(DEVASAHAYAM_SECTIONS);

export const DE_BRITTO_BIBLIOGRAPHY = bibliographyOf(
  ...Object.values(DE_BRITTO_SECTIONS),
  DE_BRITTO_TODAY_CITE,
);

export const DEVASAHAYAM_BIBLIOGRAPHY = bibliographyOf(
  ...Object.values(DEVASAHAYAM_SECTIONS),
  DEVASAHAYAM_TODAY_CITE,
);
