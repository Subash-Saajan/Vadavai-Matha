/**
 * What each chapter of /miracle actually rests on.
 *
 * Same discipline as citations.ts and saintSources.ts, applied to the one event
 * this parish is known for. The tier is not decoration:
 *
 *   documented — someone outside this parish, with no reason to flatter it,
 *                wrote it down.
 *   tradition  — the parish's own memory of itself. Cherished, long-held,
 *                uncorroborated. We say so, on the page, in both languages.
 *   devotion   — a local and diocesan devotional tradition, never the subject
 *                of a Vatican investigation. The weeping itself is here, and it
 *                stays here however many books record that it was told.
 *
 * ── THE ONE DISTINCTION THIS PAGE MUST NEVER BLUR ─────────────────────────
 *
 * That the weeping was REPORTED, by named people, on a dated morning, and put
 * into print three times by three unconnected hands, is **documented**. That
 * the statue wept is **devotion**. A chapter may be documented and its subject
 * still be a devotion — the record is the thing the badge describes. Anyone
 * tempted to promote `signs` or `stopped` to documented because Dessal and
 * Besse both print them has misread what the badge is for: they attest the
 * telling, not the tears. The parish does not claim otherwise and neither does
 * this page.
 *
 * ── WHY THIS PAGE EXISTS AT ALL ───────────────────────────────────────────
 *
 * /history tells this morning in ten dots inside a chapter that runs from 1775
 * to 1838, between the suppression of the Society and the return of the
 * Jesuits. That is the right proportion for a history of four centuries and the
 * wrong one for the thing a pilgrim standing in front of the statue wants to
 * read. This page is the QR code at the shrine: one morning, the whole of it,
 * with every witness the record actually names and every limit the record
 * actually has.
 *
 * KEYED BY SLUG, NOT BY INDEX — the lesson citations.ts learned the hard way.
 * Each chapter in i18n carries its own `key`, in both languages, and that key
 * resolves the sources and the painting, so chapters can be added, cut or
 * reordered and nothing drifts onto the wrong year.
 */

import type { SectionCite } from "@/lib/saintSources";
import { bibliographyOf, makeCiteFor } from "@/lib/saintSources";

/* ── The chapters ─────────────────────────────────────────────────────────
   Two printed witnesses carry almost the whole narrative and they are
   independent of each other, which is the strongest thing in the file:

   · DESSAL 1905 — "Vadakencoulam: son histoire, sa merveille, son jubilé",
     Lettres de Gemert, printed pp.350–357. A Jesuit OF this mission, writing
     nine years before Besse and while the grandchildren of the 1803 generation
     were still alive. On disk, quotable, linkable to Gallica. He is also the
     only source that knows the account began as a song, the only one who
     records the 1903 centenary, and the only man on record who ever put his
     hands on the statue to test it.

   · BESSE, via the MOUMAS ENGLISH TYPESCRIPT p.842 — the parish's own copy
     (accession 215/95), photographed by the owner in July 2026. This is where
     the English wording every retelling uses comes from, and it was read for
     the first time in this project on 24 July 2026.

   They agree on the witness, his patronymic, the household he was visiting, the
   catechist, the day, the hour and the centenary, and they were not copying one
   another. A third, in Malayalam and in a different devotional tradition
   entirely (Matavatiyan 1930, reached through Trento 2022), independently
   records the European laywoman examining the same three signs.

   ⚠ WHAT IS **NOT** HERE, AND WHY. `la_gerbe_du_madure_1911` is not a source id
   because we do not hold it. Besse's own footnote on p.842 points at the fuller
   discussion of this miracle in La Gerbe du Maduré, July–August 1911, pp.135ff
   (AFSI Toulouse, cote FMd403) — the fullest known treatment of this event,
   which nobody in this project has read. The page says so, in the closing
   chapter, rather than pretending the record is complete.                    */
export const MIRACLE_SECTIONS: Record<string, SectionCite> = {
  /* The stage: sixty-three years with no Jesuit, and a village that did not
     merely survive them. The 1934 gazetteer supplement is the upgrade here — a
     government record with no interest in flattering the parish. */
  sixtyThreeYears: {
    tier: "documented",
    keys: [
      "krishnaswami_ayyar_1934",
      "caldwell_1881",
      "besse_moumas_typescript",
      "auguste_jean_1894",
      "ferroli_1951",
    ],
    photo: "/images/history/the-weeping-madonna-1.jpg",
  },

  /* The object itself. THE PHOTOGRAPH IS THE ARGUMENT: the carved hands are
     joined and the arms are fixed to the body, which is what Dessal found in
     1905 and what the camera still finds. The origin story is a different
     matter and is tiered separately below — see `provenance`. */
  statue: {
    tier: "documented",
    keys: ["dessal_gemert_1905", "besse_moumas_typescript"],
    photo: "/images/matha-midnight.jpg",
  },

  /* ⚠ TRADITION, AND IT MUST STAY TRADITION (KB file 21, mismatch G30). The
     box marked "To Vadakankulam, From Portugal" appears in no printed source
     before the parish's own modern chronology — not in Besse, not in Coubé, not
     in Dessal, who describes the statue at length and attributes it instead to
     "un ouvrier indigène", a local craftsman. Kamanayakkanpatti, which is
     supposed to hold the sister statue, tells a wholly different story about
     its own. The page tells the tradition because it is the parish's, and says
     plainly what the earliest description says instead. Do not promote this. */
  provenance: {
    tier: "tradition",
    keys: ["dessal_gemert_1905", "souvenir_150yr", "diocese_thoothukudi_page", "catholictamil_182"],
  },

  morning: {
    tier: "documented",
    keys: ["dessal_gemert_1905", "besse_moumas_typescript"],
  },

  /* The three signs. Devotion, and the badge is the whole point of the page's
     honesty — two printed witnesses record that this is what was said to have
     happened, which is not the same as recording that it happened. */
  signs: {
    tier: "devotion",
    keys: ["dessal_gemert_1905", "besse_moumas_typescript", "catholictamil_182"],
    photo: "/images/history/the-weeping-madonna-2.jpg",
  },

  /* He went for witnesses instead of shouting. Besse's phrase — "fearing to be
     the victim of a delusion" — is the hinge of the whole account, and it is
     the typescript's own words, with the ink correction over "virtue" visible
     in the photograph. */
  delusion: {
    tier: "documented",
    keys: ["besse_moumas_typescript", "dessal_gemert_1905"],
  },

  /* ⚠ TWO DESCRIPTIONS OF THE CLOUD, AND THE PAGE KEEPS BOTH (mismatch J6).
     Savarimuthu said a transparent cloud; the catechist said smoke and
     darkness. Dessal prints both, on the same page, from two men. The page
     gives each description to the man who gave it and does not harmonise
     them — a harmonised miracle is a written one. */
  catechist: {
    tier: "documented",
    keys: ["dessal_gemert_1905", "besse_moumas_typescript"],
  },

  /* Henriette. The literate European laywoman is the strongest witness in the
     file precisely because she is the one an outside record can find: Besse and
     Dessal both call her "Miss", Dessal names her "Ennériammal (Henriette)",
     and a Malayalam life of Devasahayam printed in 1930 — a different language,
     a different tradition, not downstream of this parish — has her as
     "Hendrikammal" examining the same three signs. */
  henriette: {
    tier: "documented",
    keys: ["dessal_gemert_1905", "besse_moumas_typescript", "trento_2022", "catholictamil_182"],
    photo: "/images/history/the-weeping-madonna-4.jpg",
  },

  /* ⚠ THE SEQUENCE IS NOT ASSERTED. The parish has the wiping BEFORE the bell;
     Dessal has it after the church had filled and the candles were lit. The
     page tells both moments and never claims an order (mismatch J4). */
  tears: {
    tier: "devotion",
    keys: ["dessal_gemert_1905", "catholictamil_182", "besse_moumas_typescript"],
  },

  bell: {
    tier: "documented",
    keys: ["besse_moumas_typescript", "dessal_gemert_1905", "catholictamil_182"],
    photo: "/images/history/the-weeping-madonna-3.jpg",
  },

  /* ⚠ WHAT THE PEOPLE SANG — BOTH READINGS, NEITHER DELETED (mismatch J4).
     The parish's Tamil page has the Parce Domine and the Mea culpa; Dessal, the
     earliest print, has breast-beating, "Lord, have mercy on us", and the Salve
     Regina, and says every one of his informants added it. A congregation can
     do all of these. */
  people: {
    tier: "documented",
    keys: ["dessal_gemert_1905", "catholictamil_182", "besse_moumas_typescript"],
  },

  stopped: {
    tier: "devotion",
    keys: ["besse_moumas_typescript", "dessal_gemert_1905"],
  },

  /* ⭐ THE STRONGEST SINGLE THING IN THE 1803 FILE, and it belongs to Dessal
     alone: the first account was in verse, five stanzas, made on the day by the
     village schoolmaster, who had seen it and who was a worshipper of Siva.
     ⚠ THE SONG'S OWN WORDS ARE NOT HELD AND MUST NEVER BE SUPPLIED. Dessal
     states outright that he printed "the substance of the song and its
     commentary, leaving aside the poetry and the rhythm"; a full-corpus sweep
     for the stanzas returns nothing in any language. */
  song: {
    tier: "documented",
    keys: ["dessal_gemert_1905"],
  },

  /* The family, with outside witnesses — all of them Protestant, none with any
     reason to flatter a Catholic shrine. Besse's own footnote gives their
     standing: revenue-farmers of Nangunery. */
  family: {
    tier: "documented",
    keys: [
      "besse_moumas_typescript",
      "cms_intelligencer_1880",
      "badley_directory_1886",
      "trento_2022",
    ],
    photo: "/images/history/the-weeping-madonna-8.jpg",
  },

  /* ⚠ THE BOON IS TRADITION AND NAMES NO BUILDING (mismatches J7, J8, and the
     owner's rulings of 26–27 July 2026). The twenty-seven childless years stand
     by the owner's explicit decision, with no source chip — their only surviving
     witness is the parish's own shrine board, which the owner declined to wire
     in as a citable source. Do not attach the gift to the great church: Trento
     dates Christopher Bilderbeck's death to 1817, thirty-eight years before that
     foundation stone. Do not raise the chronology tension in the prose. */
  boon: {
    tier: "tradition",
    keys: ["souvenir_150yr", "trento_2022", "diocese_thoothukudi_page"],
  },

  returned: {
    tier: "documented",
    keys: ["dessal_gemert_1905"],
  },

  centenary: {
    tier: "documented",
    keys: ["dessal_gemert_1905", "besse_moumas_typescript"],
  },

  /* The only occasion on record when anyone examined the statue. Documented
     because what it reports is what a named man did with his hands and what he
     found — not the miracle. He is mission-side and openly devout, and the page
     lets him say so. */
  examined: {
    tier: "documented",
    keys: ["dessal_gemert_1905"],
  },

  record: {
    tier: "documented",
    keys: ["dessal_gemert_1905", "besse_1914", "besse_moumas_typescript", "trento_2022"],
    photo: "/images/history/the-weeping-madonna-9.jpg",
  },
};

/* ── Where each painting must be cropped ──────────────────────────────────
   EVERY PAINTING ON THIS PAGE IS 4:5 AND EVERY PLATE IS 4:3, so `object-cover`
   throws away two fifths of the height — and in these particular pictures the
   faces are all in the top half. A centred crop cut the statue's face off the
   top of five of the seven plates and left the reader looking at robes, hands
   and a crowd's shoulders. Which is a real loss: the tear on her cheek in
   `signs`, the ladder and the wiping cloth in `bell`, the joined hands in
   `statue` are the whole reason those pictures are on those chapters.

   The value is the `object-position` Y. Because the crop window is 60% of the
   image's height (0.8 ÷ 1.333), a position of P shows the band from 0.4P to
   0.4P + 60 — so P=0 shows the top 60%, P=50 the middle, P=100 the bottom.
   Each number below was chosen by finding the faces in the actual file:

     sixtyThreeYears  statue's face ~23%, the kneeling man ~41%  → 10–70
     statue           (9:16 photo, 42% window) her face ~28%     → 13–55
     signs            statue's face ~20%, the man's head ~55%    →  6–66
     henriette        statue's face ~13%, the four faces ~37–48% →  4–64
     bell             the man on the ladder ~15%, the boy ~36%   →  8–68
     family           the merchant ~39%, the wife ~51%, baby ~63%→ 18–78
     record           a still life; nothing to miss              → centred

   ⚠ IF A PAINTING IS EVER REPLACED, RE-MEASURE ITS NUMBER. A focal point
   inherited from a different picture is worse than none, because it looks
   deliberate. Two of these plates (`song`, `returned`) have no painting at all
   yet — the era's spare canvases show a colonial office and a Roman scholar,
   neither of which is the scene — and they are better empty than wrong.       */
export const PHOTO_FOCUS: Record<string, string> = {
  sixtyThreeYears: "object-[50%_25%]",
  statue: "object-[50%_22%]",
  signs: "object-[50%_15%]",
  henriette: "object-[50%_10%]",
  bell: "object-[50%_20%]",
  family: "object-[50%_45%]",
  record: "object-[50%_50%]",
};

/** The parish's own keeping of the day: its feast, its shrine, its devotion. */
export const MIRACLE_TODAY_CITE: SectionCite = {
  tier: "tradition",
  keys: ["souvenir_150yr", "parish_english_history", "diocese_thoothukudi_page", "catholictamil_182"],
};

/**
 * The honest limits, cited so a reader can check the limits too.
 *
 * ⚠ THE COUNTER-WITNESS IS DELIBERATELY CITED HERE (KB file 21, mismatch H18).
 * The parish remembers that the priest of that year, Fr John Louis Cardoza,
 * examined the statue and declared the wonder genuine on the spot. Dessal —
 * the earliest print, and mission-side, i.e. with every reason to want the
 * story strong — says the opposite: the Goa priest who administered the village
 * was not there when it happened, did not normally reside there, the see of
 * Cochin was vacant, and no approving ecclesiastical document exists. Both are
 * printed on this page, side by side, and neither is deleted. That is the
 * parish's own standing rule for conflicting readings, applied where a reader
 * can see it working.
 */
export const MIRACLE_LIMITS_CITE: SectionCite = {
  tier: "documented",
  keys: ["dessal_gemert_1905", "besse_moumas_typescript", "catholictamil_182", "souvenir_150yr"],
};

export const miracleCiteFor = makeCiteFor(MIRACLE_SECTIONS);

/**
 * The two blocks that are not chapters but still owe the reader witnesses:
 * the honest-limits section and the parish's account of its own keeping.
 *
 * Kept out of MIRACLE_SECTIONS on purpose — that map is index-independent but
 * it IS what the page iterates to render chapters, so anything in it becomes a
 * chapter. These resolve through the same machinery and render the same chip
 * row without appearing in the story.
 */
export const miracleAsideCiteFor = makeCiteFor({
  limits: MIRACLE_LIMITS_CITE,
  today: MIRACLE_TODAY_CITE,
});

export const MIRACLE_BIBLIOGRAPHY = bibliographyOf(
  ...Object.values(MIRACLE_SECTIONS),
  MIRACLE_TODAY_CITE,
  MIRACLE_LIMITS_CITE,
);
