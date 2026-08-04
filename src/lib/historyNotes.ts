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
  // by a year, and neither is stronger than the other. (Mismatch A4/A5 — three
  // parish-side readings, and no outside source dates the chapel at all. The
  // dot's own heading straddles 1685–86 rather than choosing; this says why.)
  "clearing-in-the-forest:5": {
    en: "The parish's own accounts disagree about the year. Its 2026 history and the jubilee souvenir place the chapel and this first harvest in 1685; the Bishop's jubilee message of 2022 gives 1686; the parish's older English history puts the first church later still, at 1695. The district gazetteer of 1917 — the only witness from outside the parish — dates no chapel at all, and gives no number of baptisms. The heading therefore holds the two earliest readings together rather than choosing between them.",
    ta: "இந்த ஆண்டைக் குறித்து இப்பங்கின் சொந்தப் பதிவுகளே ஒன்றுபடவில்லை. இப்பங்கின் 2026-ஆம் ஆண்டு வரலாறும் நினைவு மலரும் சிற்றாலயத்தையும் இம்முதல் அறுவடையையும் 1685-ல் வைக்கின்றன; 2022-ஆம் ஆண்டு ஆயரின் நினைவுச் செய்தி 1686 என்கிறது; பங்கின் பழைய ஆங்கில வரலாறோ முதல் ஆலயத்தை அதற்கும் பிந்தைய 1695-ல் வைக்கிறது. பங்கிற்கு வெளியிலிருந்து சான்று பகரும் ஒரே ஆவணமான 1917-ஆம் ஆண்டு மாவட்டக் குறிப்பேடு, எந்தச் சிற்றாலயத்திற்கும் ஆண்டு தரவில்லை; திருமுழுக்குகளின் எண்ணிக்கையையும் தரவில்லை. எனவே இத்தலைப்பு, மிகப் பழைய இரு கூற்றுகளுள் ஒன்றைத் தேர்ந்தெடுக்காமல், இரண்டையும் சேர்த்தே தாங்கி நிற்கிறது.",
  },

  /* ── IV. The Weeping Madonna ───────────────────────────────────────────── */

  // The event date and the feast date differ; the page gives the event date and
  // flags the feast below the line. (Re-keyed :4→:2 after the 1794/1801 dots were cut.)
  "the-weeping-madonna:2": {
    en: "The two earliest printed accounts give this Friday as 21 October, and 21 October 1803 was a Friday; the feast is kept on the 22nd and 23rd.",
    ta: "மிகப் பழைய இரு அச்சுப் பதிவுகளும் இந்த வெள்ளிக்கிழமையை அக்டோபர் 21 என்றே தருகின்றன; 1803 அக்டோபர் 21 ஒரு வெள்ளிக்கிழமையே. திருவிழாவோ 22, 23 ஆகிய நாட்களில் கொண்டாடப்படுகிறது.",
  },

  // The honest boundary of the whole miracle. (Re-keyed :8→:6, and updated: Besse has
  // now been read in the parish's English translation, and it is not the only witness.)
  "the-weeping-madonna:9": {
    en: "The weeping has never been submitted to Rome, and no Vatican commission has examined it. It reaches us in three independent printed accounts, the earliest from 1905, and it claims no more than a dated morning, named witnesses, and an unbroken feast.",
    ta: "இந்தக் கண்ணீர் நிகழ்வு ஒருபோதும் உரோமைக்குச் சமர்ப்பிக்கப்படவில்லை; வத்திக்கானின் எந்த ஆய்வுக்குழுவும் இதை ஆராய்ந்ததில்லை. ஒன்றையொன்று சாராத மூன்று அச்சுப் பதிவுகள் வழியாகவே இது நம்மை வந்தடைகிறது — அவற்றுள் மிகப் பழையது 1905-ஆம் ஆண்டைச் சேர்ந்தது. நாள் குறிக்கப்பட்ட ஒரு காலைப் பொழுது, பெயர் சொல்லப்பட்ட சாட்சிகள், அறுபடாமல் தொடரும் ஒரு திருவிழா — இதற்கு மேல் இது எதையும் உரிமை கோரவில்லை.",
  },

  /* ── V. The Great Two-Nave Church ──────────────────────────────────────── */

  // The visit is the bishop's own; the errand he came on is the village's memory.
  "great-two-nave-church:2": {
    en: "The visit is in Bishop Canoz's own hand, but he says nothing of any church or any money. The day, the 21st of June, and the request that the people begin saving for a large new church come down through the parish's own history alone.",
    ta: "அந்த வருகை ஆயர் கனோஸ் அவர்களின் சொந்தக் கையெழுத்திலேயே உள்ளது; ஆனால் ஆலயத்தைப் பற்றியோ பணத்தைப் பற்றியோ அவர் ஒன்றும் சொல்லவில்லை. ஜூன் 21 என்னும் அந்த நாளும், புதிய பெரிய ஆலயத்திற்காக மக்கள் சேமிக்கத் தொடங்க வேண்டும் என்ற வேண்டுகோளும், இப்பங்கின் சொந்த வரலாற்றின் வழியாக மட்டுமே நம்மை வந்தடைகின்றன.",
  },

  // (great-two-nave-church:3 — footnote REMOVED at the owner's instruction, 26 Jul 2026.
  // The dot is told as a story and the tier badge carries the honesty on its own. What the
  // note used to say is preserved in full in that dot's citations.ts audit note and in
  // Mismatch J7/J8: no printed history names a lay benefactor of this church, Auguste Jean
  // credits it to Grégoire's persevering energy alone, Christopher Bilderbeck died in 1817,
  // and the parish's own shrine board attaches the gift to the Matha shrine, not this church.
  // Do NOT reinstate it here without asking — its removal was a deliberate decision.)

  // The two chroniclers agree. What they differ on is who sent him home — and that is
  // the only thing left worth telling the reader, which is why the prose says only
  // "they sent him home". (The old note here claimed they differed on the YEAR, on the
  // strength of an OCR misreading of Dessal; the scan reads 1873. See citations.ts.)
  "great-two-nave-church:11": {
    en: "Auguste Jean says he accepted his superiors' invitation to spend a few months at home; Dessal says he sailed on his doctors' advice.",
    ta: "சில மாதங்கள் சொந்த நாட்டில் தங்கும்படி மேலதிகாரிகள் அளித்த அழைப்பை அவர் ஏற்றுக்கொண்டார் என்று அகுஸ்த் ஜான் சொல்கிறார்; மருத்துவர்களின் அறிவுரையின்பேரிலேயே அவர் கப்பலேறினார் என்று தெசால் சொல்கிறார்.",
  },

  /* ── VIII. The Shrine and the Saint ────────────────────────────────────── */

  // Two institutions count the same people and reach different totals.
  "shrine-and-the-saint:5": {
    en: "The head-count is the parish's own. The diocese's roll gives a smaller figure: about 7,350 Catholics in some 1,600 families.",
    ta: "இந்தத் தலைக்கணக்கு இப்பங்கின் சொந்தக் கணக்கு. மறைமாவட்டப் பதிவேடோ இதைவிடச் சிறிய எண்ணிக்கையைத் தருகிறது: சுமார் 1,600 குடும்பங்களில் சுமார் 7,350 கத்தோலிக்கர்.",
  },
};

/** The note for one moment, in the reader's language — or nothing. */
export const noteFor = (
  eraId: string,
  dotIndex: number,
  lang: "en" | "ta",
): string | undefined => HISTORY_NOTES[`${eraId}:${dotIndex}`]?.[lang];
