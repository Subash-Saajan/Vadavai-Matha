/**
 * The footnotes of /history — the reader-facing ones.
 *
 * WHY THIS FILE EXISTS. The history page used to argue with itself. The story was
 * told in one breath and taken back in the next: "It is memory, and this page
 * records it as memory"; "no printed history we have opened names any benefactor";
 * "It survives; we have not yet read it". Every doubt the research had honestly
 * turned up was pushed into the narrative, and the narrative could not carry them.
 * The result read as a page apologising for its own subject.
 *
 * A book solves this with a footnote. The story runs clean; the difficulty is set
 * below the line, in smaller type, for the reader who wants it. Nothing is hidden
 * and nothing interrupts.
 *
 * So this file holds the difficulties. Not all of them — most are already carried
 * by the tier badge and the citation chips in citations.ts, which say at a glance
 * whether a moment is documented, parish tradition or devotion. A note is written
 * here only where the tier is not enough on its own:
 *
 *   · two sources give different dates and the page picks neither
 *   · the page states a figure that another witness contradicts
 *   · a claim rests on a book nobody on this project has opened
 *   · the parish's present usage differs from what the record of the year says
 *
 * NOT THE SAME THING AS citations.ts `note`. That field is an audit written to an
 * editor — "Auguste Jean was removed", "the dot's own note called it single-witness".
 * It is about the making of the page. These are written to a reader, about the past.
 * Never surface the audit notes on the page; never write an audit note here.
 *
 * KEYED BY `era:dot`, index-aligned with i18n's `history.eras[].dots[]` exactly as
 * citations.ts is. Move a dot in one place and you must move it in all three.
 *
 * TAMIL. `ta` is optional and mostly absent, and the page renders a note only in a
 * language it actually has. An untranslated note is silently skipped rather than
 * shown in English on a Tamil page. Fill these in through the tamil-localize skill,
 * with the rest of the Tamil history block — not by hand here.
 */

export type HistoryNote = { en: string; ta?: string };

export const HISTORY_NOTES: Record<string, HistoryNote> = {
  /* ── I. A Clearing in the Forest ───────────────────────────────────────── */

  // The chapel and the two hundred baptisms: the parish's two witnesses disagree
  // by a year, and neither is stronger than the other.
  /* ── IV. The Weeping Madonna ───────────────────────────────────────────── */

  // The event date and the feast date differ; the page gives the event date and
  // flags the feast below the line. (Re-keyed :4→:2 after the 1794/1801 dots were cut.)
  "the-weeping-madonna:2": {
    en: "The two earliest printed accounts give this Friday as 21 October, and 21 October 1803 was a Friday; the feast is kept on the 22nd and 23rd.",
  },

  // The honest boundary of the whole miracle. (Re-keyed :8→:6, and updated: Besse has
  // now been read in the parish's English translation, and it is not the only witness.)
  "the-weeping-madonna:9": {
    en: "The weeping has never been submitted to Rome, and no Vatican commission has examined it. It reaches us in three independent printed accounts, the earliest from 1905, and it claims no more than a dated morning, named witnesses, and an unbroken feast.",
  },

  /* ── V. The Great Two-Nave Church ──────────────────────────────────────── */

  // A cherished family story that the outside record cannot reach — and one
  // date in it that does not sit easily.
  "great-two-nave-church:3": {
    en: "This is the parish's own memory. No printed history of the mission names any lay benefactor of this church — Auguste Jean credits it to Fr Grégoire's persevering energy alone — and Christopher Bilderbeck died in 1817, thirty-eight years before the foundation stone was laid. If the gift fell as the village remembers it, it belonged to the older church, or to his heirs.",
  },

  // Two chroniclers, one day, two years.
  "great-two-nave-church:10": {
    en: "His two chroniclers agree on the day and differ on the year: Auguste Jean gives 1873, Dessal 1875.",
  },

  /* ── VIII. The Shrine and the Saint ────────────────────────────────────── */

  // The shrine's present style is not the style of the year it was declared, and
  // back-dating it by twenty-nine years would be a small, easy untruth.
  "shrine-and-the-saint:0": {
    en: "Every witness of 1993 names the church by its old dedication, to the Holy Family. The Marian style the shrine carries today — Our Lady of the Assumption — is first found in the diocese's letters of 2022.",
  },

  // Two institutions count the same people and reach different totals.
  "shrine-and-the-saint:5": {
    en: "The head-count is the parish's own. The diocese's roll gives a smaller figure: about 7,350 Catholics in some 1,600 families.",
  },
};

/** The note for one moment, in the reader's language — or nothing. */
export const noteFor = (
  eraId: string,
  dotIndex: number,
  lang: "en" | "ta",
): string | undefined => HISTORY_NOTES[`${eraId}:${dotIndex}`]?.[lang];
