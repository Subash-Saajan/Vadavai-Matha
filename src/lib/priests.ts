/**
 * The succession of parish priests of the Holy Family Church, Vadakkankulam.
 *
 * Source: Knowledge_Base/06_Parish_Priests_and_Clergy.md, which reproduces the
 * parish's own numbered list (Vadakankulam History 2026, "Succession of Parish
 * Priests… from the Origin of the Congregation") and cross-checks it against the
 * Jesuit archives in Rome (ARSI), Auguste Jean 1894, Dessal 1902, Bertrand 1865,
 * Pate's 1917 gazetteer and the Catholic Directory of India 1924.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE LOOKS THE WAY IT DOES
 *
 * Sixty-nine priests; a documented life for about fifteen of them; a surviving
 * likeness for eleven. That asymmetry is not a defect to be hidden — it is the
 * shape of a 328-year parish record, and the page is built to show it rather
 * than paper over it. Hence three tiers:
 *
 *   "name"  — the parish kept his name and his years. Nothing more survives.
 *             No plate, no link, and (in the page) no hover state: a row that
 *             cannot be opened must not look like it can.
 *   "line"  — one true clause survives. It is given in place, with no link,
 *             because there is nothing further to go to.
 *   "life"  — the archives preserve a life. Plate, paragraph, room to breathe.
 *
 * TWO RULES INHERITED FROM history.ts, both load-bearing.
 *
 * 1. NO INVENTED FACTS, and no invented faces. Where a priest has no surviving
 *    portrait the plate carries the Tamil honorific the village called him by
 *    (`plate`) — never a generated likeness. These are real, named men, several
 *    within living memory; a plausible AI face would be the only fabrication on
 *    this website.
 *
 * 2. WHERE THE SOURCES DISAGREE, SAY SO. The first priest has three names in
 *    two documents. Fr Grégoire died in 1873 by one book and 1875 by another.
 *    The Knowledge Base flagged every such case and this file does not quietly
 *    pick a winner — the disagreement is published as part of the record.
 *
 * NOTE ON WHAT IS ABSENT. Fr Caussanel's entry says he took down the partitions
 * inside the 1872 church and met determined opposition. It does not say who
 * opposed him or why, for the same reason /architecture does not: the parish has
 * decided not to publish that history. Nothing here invents a substitute cause.
 * (See Knowledge_Base file 16 §4.1 for what is being left out, and why the
 * omission is deliberate rather than ignorant.)
 *
 * ALSO ABSENT, FOR NOW: the ~100 assistant priests of 1870–1990. The parish holds
 * the roster, but the only copy is a faintly-printed souvenir page and the OCR of
 * it is unreliable ("Sebarik Pris", "Jiopiyams Arasavandhinam"). Publishing
 * mangled names of real men whose families are in the village is worse than
 * waiting, so the block is held until someone reads souvenir pp. 5–6 aloud
 * against the scan. Same for the "priests and sisters given by Vadavai" list.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * TAMIL. Every reader-facing string has an optional `…Ta` sibling, exactly as in
 * acknowledgements.ts: `nameTa`, `noteTa`, `lifeTa`, `titleTa`, `turnTa`,
 * `roleTa`, `whatTa`, `whenTa`. The renderer falls back to English when a Tamil
 * field is absent, so nothing can ever go blank. Three rules held while writing
 * them:
 *
 *   · The ENGLISH IS NEVER EDITED. Tamil is added beside it, never over it.
 *   · `tamil` (the by-name the village actually used) and `plate` are SOURCE
 *     DATA, not translations — they are the parish's own attested Tamil and are
 *     left exactly as the souvenir prints them, even where the site's canonical
 *     spelling of the same European name differs (Grégoire = கிரகோயர் here,
 *     கிரகோரி in the parish list). Both are shown; neither is corrected away.
 *   · The hedges are reproduced at their English strength — "may be", "very
 *     likely", "or perhaps two" — because half this register's honesty lives in
 *     them.
 */

/** The year the current pastorate is measured to. Bump with the calendar; it
 *  only affects the length of the last tenure stroke and the "– today" label. */
export const THIS_YEAR = 2026;

export type PriestTier = "name" | "line" | "life";

export type Priest = {
  /** Position in the parish's own numbering, 1–69. */
  n: number;
  name: string;
  /** The name set as the heading in Tamil: அருட்தந்தை / சகோதரர் + the Tamil
   *  form of the European or Indian name. The Latin-script `name` is still
   *  printed beneath it in the Tamil view, so a reader can search either. */
  nameTa?: string;
  /** The Tamil honorific or village name, where the parish preserved one.
   *  In the Madurai Mission a priest was known not by his European surname but
   *  by his Tamilised baptismal name plus an honorific — so for many of these
   *  men this, not the name above, is what the village actually said. */
  tamil?: string;
  /** Other attested spellings, kept because people search them and because an
   *  1894 French book calling him "Bouttari" should still find this page. */
  also?: string;
  from: number;
  /** Inclusive. Equal to `from` where the source gives one year only. */
  to: number;
  /** The serving priest. Renders as "– today" and measures to THIS_YEAR. */
  current?: true;
  tier: PriestTier;
  /** One clause. `line` tier. */
  note?: string;
  noteTa?: string;
  /** The illuminated paragraph. `life` tier. */
  life?: string;
  lifeTa?: string;
  /** File in /images/priests/. Only where a real likeness survives. */
  portrait?: string;
  /** Where that likeness came from — printed under the plate. */
  portraitFrom?: string;
  /** The Tamil name set as the plate, where no likeness survives. */
  plate?: string;
};

export type Period = {
  numeral: string;
  title: string;
  titleTa?: string;
  /** Display label for the span. */
  years: string;
  /** Why the era turned. This is the sentence a reader who scans nothing else
   *  should still come away with. */
  turn: string;
  turnTa?: string;
  priests: Priest[];
};

export const PERIODS: Period[] = [
  {
    numeral: "I",
    title: "The Old Madurai Mission",
    titleTa: `பழைய மதுரைப் பணிக்களம்`,
    years: "1697 – 1775",
    turn:
      "Jesuits of the old Madurai Mission, sent out through Goa and Cochin. They took Tamil names and the village used them: a priest here was not Buttari but Paranchodinadhar, not Thomassini but Madurendranadher. Those are the names in the parish's own list, and they are given here beside the European ones.",
    turnTa: `கோவா வழியாகவும் கொச்சி வழியாகவும் அனுப்பப்பட்ட, பழைய மதுரைப் பணிக்களத்தின் இயேசு சபை அருட்தந்தையர். அவர்கள் தமிழ்ப் பெயர்களைச் சூடிக்கொண்டார்கள்; ஊரும் அப்பெயர்களையே சொல்லி வந்தது — இங்கே ஒருவர் புத்தாரி அல்ல, பரஞ்சோதிநாதர்; தோமஸினி அல்ல, மதுரேந்திரநாதர். பங்கின் சொந்தப் பட்டியலில் இருப்பவை அப்பெயர்களே; ஐரோப்பியப் பெயர்களுக்கு அருகில் அவையும் இங்கே தரப்படுகின்றன.`,
    priests: [
      {
        n: 1,
        name: "Fr Bernard de Saa",
        nameTa: `அருட்தந்தை பெர்னார்ட் தெ சா`,
        tamil: "பென்னாட் டி சூசா",
        also: "Bennet de Souza · Fr Ponnaiya",
        from: 1697,
        to: 1699,
        tier: "life",
        plate: "பென்னாட் டி சூசா",
        life:
          "The list opens with him, and it opens unsteadily. The parish's history names him Bernard de Saa and dates him from 1697; the 150th-anniversary souvenir writes Bennet de Souza and dates him from 1698; and the souvenir's own prose says that “in the year 1698, Rev. Fr. Ponnaiya took charge… the first parish priest of Vadavai”. Three names, two start years, one man — or perhaps two. It is published as it stands, because the alternative is to choose one and sound certain. Whoever he was, a letter of his own survives, dated 14 October 1713: villagers who believed he was hiding treasure seized him and knocked out every one of his teeth. A fellow Jesuit — Fr Peter Martin, who also held this same parish, #3 on this list — saw the marks himself, and de Saa was freed only after another priest pleaded his case to Rani Mangammal, the reigning queen of Madurai, and he returned to the village.",
        lifeTa: `பட்டியல் இவரோடு தொடங்குகிறது; தொடக்கமே தடுமாற்றத்தோடு. பங்கின் வரலாறு இவரைப் பெர்னார்ட் தெ சா என்று பெயரிட்டு, 1697 முதல் என்று குறிக்கிறது; 150-ஆம் ஆண்டு நினைவு மலரோ பென்னாட் டி சூசா என்று எழுதி, 1698 முதல் என்கிறது; அதே மலரின் உரைநடையோ “1698-ஆம் ஆண்டில் அருட்தந்தை பொன்னையா பொறுப்பேற்றார்… வடவையின் முதல் பங்குத் தந்தை” என்று சொல்கிறது. மூன்று பெயர்கள், இரு தொடக்க ஆண்டுகள், ஒரே மனிதர் — அல்லது ஒருவேளை இருவர். இருப்பது இருப்பதுபோலவே இங்கே வெளியிடப்படுகிறது; ஏனெனில் மற்றொரு வழி, ஒன்றைத் தேர்ந்தெடுத்து உறுதியாகப் பேசுவதுதான். அவர் யாராயிருந்தாலும், 1713 அக்டோபர் 14 நாளிட்ட, அவரே எழுதிய கடிதம் ஒன்று எஞ்சியுள்ளது: அவர் புதையலை மறைத்து வைத்திருக்கிறார் என்று நம்பிய ஊரார் அவரைப் பிடித்து, அவரது பற்கள் அனைத்தையும் உடைத்தெறிந்தார்கள். இப்பட்டியலில் மூன்றாமவராய், இதே பங்கை ஏற்றிருந்த சக இயேசு சபை அருட்தந்தை பீட்டர் மார்ட்டின் அவர்களே அத்தழும்புகளைத் தாமே கண்டார். மற்றொரு அருட்தந்தை, அப்போது மதுரையை ஆண்ட மங்கம்மாள் அரசியிடம் இவரது வழக்கை எடுத்துச் சென்ற பின்னரே தெ சா விடுவிக்கப்பட்டார்; அவர் ஊருக்குத் திரும்பினார்.`,
      },
      {
        n: 2,
        name: "Fr Maria Xavier Borghese",
        nameTa: `அருட்தந்தை மரிய சவேரியார் போர்க்கிஸ்`,
        tamil: "மரிய போர்க்கிஸ்",
        also: "Borges",
        from: 1700,
        to: 1704,
        tier: "line",
        note: "Bertrand's letters record him imprisoned forty days during this first term — the earliest documented hardship any priest of this parish is known to have suffered for it.",
        noteTa: `இம்முதல் பதவிக்காலத்தில் இவர் நாற்பது நாட்கள் சிறையில் அடைக்கப்பட்டதைப் பெர்த்ராண்டின் கடிதங்கள் பதிவு செய்கின்றன — இப்பங்கிற்காக ஓர் அருட்தந்தை பட்டதாக ஆவணத்தில் அறியக்கிடைக்கும் மிகப் பழைய துன்பம் இதுவே.`,
      },
      {
        n: 3,
        name: "Fr Peter Martin",
        nameTa: `அருட்தந்தை பீட்டர் மார்ட்டின்`,
        tamil: "பீட்டர் மார்ட்டின்",
        also: "Pedro Samiar · Fr Pierre Martin, S.J.",
        from: 1705,
        to: 1707,
        tier: "line",
        note: "The same Fr Pierre Martin whose own letters, printed in the French Jesuits' Lettres édifiantes, are among the earliest sources on this mission — and who saw for himself the beating that cost Fr Bernard de Saa, also on this list, every one of his teeth.",
        noteTa: `பிரெஞ்சு இயேசு சபையினரின் Lettres édifiantes தொகுப்பில் அச்சான தம் சொந்தக் கடிதங்களால், இப்பணிக்களத்தைப் பற்றிய மிகப் பழைய ஆதாரங்களுள் ஒன்றாய் நிற்பவர் இவரே; இப்பட்டியலிலேயே இடம்பெறும் அருட்தந்தை பெர்னார்ட் தெ சா அவர்களின் பற்கள் அனைத்தையும் பறித்த அந்த அடிகளைத் தாமே கண்டவரும் இவரே.`,
      },
      {
        n: 4,
        name: "Fr Simon Carvalho",
        nameTa: `அருட்தந்தை சைமன் கார்வால்யோ`,
        tamil: "சைமன் கார்வெல்கோ",
        from: 1708,
        to: 1708,
        tier: "line",
        note: "He founded the mission station at Nemom, into which this church was incorporated in 1713.",
        noteTa: `நேமம் பணிக்கள நிலையத்தை நிறுவியவர்; 1713-ஆம் ஆண்டில் இவ்வாலயம் அதனுள் இணைக்கப்பட்டது.`,
      },
      {
        n: 5,
        name: "Fr Maria Xavier Borghese",
        nameTa: `அருட்தந்தை மரிய சவேரியார் போர்க்கிஸ்`,
        tamil: "போர்க்கிஸ்",
        from: 1709,
        to: 1710,
        tier: "line",
        note:
          "His second term carries the earliest printed mention of this parish anywhere: in 1709, writes Auguste Jean, Borghese was “put in charge of the Christians of Vadakenkoulam, near Cape Comorin”.",
        noteTa: `இப்பங்கைப் பற்றி எங்கும் அச்சில் அறியக்கிடைக்கும் மிகப் பழைய குறிப்பை இவரது இரண்டாம் பதவிக்காலமே சுமக்கிறது: 1709-ஆம் ஆண்டில் போர்க்கிஸ் “கன்னியாகுமரிக்கு அருகிலுள்ள வடக்கன்குளத்துக் கிறிஸ்தவர்களின் பொறுப்பில் அமர்த்தப்பட்டார்” என்று அகுஸ்த் ஜான் எழுதுகிறார்.`,
      },
      {
        n: 6,
        name: "Fr Louis Novel",
        nameTa: `அருட்தந்தை லூயி நோவெல்`,
        tamil: "ஹம்போ நோவேல்",
        also: "Louis-Noël de Bourzès",
        from: 1711,
        to: 1712,
        tier: "line",
        note:
          "He held the title only on paper — his own letters admit he could not visit during his “nominal charge”, and Fr Bernard de Saa covered the work in his stead. What he did that year was write the mission's Annual Letters and begin the French–Tamil dictionaries that make Tamil scholars remember him still.",
        noteTa: `இப்பொறுப்பு இவருக்குக் காகிதத்தில் மட்டுமே இருந்தது — தமது “பெயரளவிலான பொறுப்பு” காலத்தில் இங்கே வர இயலவில்லை என்பதை இவரது சொந்தக் கடிதங்களே ஒப்புக்கொள்கின்றன; அப்பணியை இவருக்குப் பதிலாக அருட்தந்தை பெர்னார்ட் தெ சா செய்தார். அவ்வாண்டில் இவர் செய்தது இரண்டு: பணிக்களத்தின் ஆண்டறிக்கைக் கடிதங்களை எழுதியது; தமிழ் அறிஞர்கள் இன்றும் இவரை நினைவுகூரக் காரணமான பிரெஞ்சு–தமிழ் அகராதிகளைத் தொடங்கியது.`,
      },
      {
        n: 7,
        name: "Fr Ignatius Cardoza",
        nameTa: `அருட்தந்தை இக்னேசியஸ் கர்டோசா`,
        tamil: "இக்னேசியஸ் கர்டோசா",
        also: "Fr Ignace Cordoso, S.J.",
        from: 1712,
        to: 1712,
        tier: "line",
        note: "Two years after this single year here, he gave the Spiritual Exercises to a hundred and sixty people at Ikkuti.",
        noteTa: `இங்கே இவர் இருந்த இந்த ஒரே ஆண்டுக்கு இரண்டு ஆண்டுகள் கழித்து, இக்குடியில் நூற்று அறுபது பேருக்கு ஞானப் பயிற்சிகளை நடத்தினார்.`,
      },
      { n: 8, name: "Fr Bursus", nameTa: `அருட்தந்தை பூர்சு`, tamil: "பூர்சு", also: "Bourse", from: 1713, to: 1713, tier: "name" },
      {
        n: 9,
        name: "Fr Bernardiza",
        nameTa: `அருட்தந்தை பென்னாடிசா`,
        tamil: "பென்னாடிசா",
        from: 1714,
        to: 1714,
        tier: "line",
        note: "The parish's other own list reads this same year differently, as “Rev. Bernard (Bernardino)” — and a colleague's letter from that October has Fr Bernard de Saa “again presiding”. This may be his own third, unlisted return, not a separate man.",
        noteTa: `பங்கின் மற்றொரு சொந்தப் பட்டியல் இதே ஆண்டை வேறுவிதமாக — “அருட்தந்தை பெர்னார்ட் (பெர்னார்டினோ)” என்று — வாசிக்கிறது; அந்த அக்டோபரில் ஒரு சக அருட்தந்தை எழுதிய கடிதமோ, அருட்தந்தை பெர்னார்ட் தெ சா “மீண்டும் தலைமையேற்றிருப்பதாகச்” சொல்கிறது. இது தனி ஒரு மனிதராக இல்லாமல், தெ சா அவர்களின், பட்டியலில் இடம்பெறாத மூன்றாவது வருகையாகவும் இருக்கலாம்.`,
      },
      {
        n: 10,
        name: "Fr Antonius Brandolini",
        nameTa: `அருட்தந்தை அந்தோனியுஸ் பிராந்தொலினி`,
        tamil: "அந்தோனிநாதர்",
        also: "Antoninadher",
        from: 1715,
        to: 1715,
        tier: "life",
        plate: "அந்தோனிநாதர்",
        life:
          "A first-person letter of his survives, written as resident of this village the year before he held it — the earliest inside view of Vadakkankulam in the whole documentary record. He stood witness at a fellow missionary's final vows that same October, 1714, and was sent to Rome in 1720 to argue the Jesuits' case in the Malabar Rites controversy, where his own brother, a cardinal, lobbied on his behalf.",
        lifeTa: `இப்பங்கை இவர் ஏற்பதற்கு முந்தைய ஆண்டில், இவ்வூரின் குடியிருப்பாளராக இவரே எழுதிய கடிதம் ஒன்று எஞ்சியுள்ளது — ஆவணப் பதிவு முழுவதிலும் வடக்கன்குளத்தை உள்ளிருந்து காட்டும் மிகப் பழைய பார்வை அதுவே. அதே 1714 அக்டோபரில், ஒரு சக மறைப்பணியாளரின் இறுதி வார்த்தைப்பாட்டிற்குச் சாட்சியாக நின்றார். 1720-ஆம் ஆண்டில், மலபார்ச் சடங்குகள் பற்றிய சர்ச்சையில் இயேசு சபையின் தரப்பை எடுத்துரைக்க உரோமைக்கு அனுப்பப்பட்டார்; அங்கே கர்தினாலாயிருந்த இவரது சொந்தச் சகோதரரே இவருக்காகப் பரிந்து பேசினார்.`,
      },
      { n: 11, name: "Fr Alexander", nameTa: `அருட்தந்தை அல்லக்சாண்டர்`, tamil: "அல்லக்சாண்டர்", from: 1716, to: 1716, tier: "name" },
      {
        n: 12,
        name: "Fr Dominicus Madeyara",
        nameTa: `அருட்தந்தை டொமினிக்ஸ் மடேயரா`,
        tamil: "டொமினிக்ஸ் மடேயரா",
        also: "Madeira",
        from: 1717,
        to: 1727,
        tier: "line",
        note: "In 1726 or 1727 he ordered a younger missionary, Constantine Beschi, to write the Veda Vilakkam — a Tamil catechetical work still read today.",
        noteTa: `1726 அல்லது 1727-ஆம் ஆண்டில், தமக்கு இளையவரான மறைப்பணியாளர் கான்ஸ்தந்தீன் பெஸ்கியை வேத விளக்கம் எழுதுமாறு பணித்தார் — இன்றும் வாசிக்கப்படும் ஒரு தமிழ் மறைக்கல்வி நூல் அது.`,
      },
      {
        n: 13,
        name: "Fr Giliya",
        nameTa: `அருட்தந்தை கிலியா`,
        tamil: "கிலியா",
        also: "Gilia · probably Fr G. B. Bigaglia, S.J.",
        from: 1728,
        to: 1728,
        tier: "line",
        note: "A Jesuit history of the Malabar mission places a Fr Bigaglia in this same post the same year, and has him rise to superior of the whole Madurai mission by 1739 — training, that year, the young Fr Buttari who would one day baptise St Devasahayam here.",
        noteTa: `மலபார்ப் பணிக்களத்தைப் பற்றிய ஓர் இயேசு சபை வரலாறு, இதே ஆண்டில் இதே பொறுப்பில் அருட்தந்தை பிகாலியா ஒருவரை வைக்கிறது; 1739-க்குள் அவர் மதுரைப் பணிக்களம் முழுவதற்கும் தலைவராக உயர்ந்ததாகவும் சொல்கிறது — அவ்வாண்டில், பின்னொரு நாள் இங்கே புனித தேவசகாயத்திற்குத் திருமுழுக்கு அளிக்கவிருந்த இளம் அருட்தந்தை புத்தாரிக்கு அவரே பயிற்சி அளித்தார்.`,
      },
      {
        n: 14,
        name: "Fr Thomas Prosper Giuliani",
        nameTa: `அருட்தந்தை தாமஸ் பிராஸ்பெர் ஜுலியானி`,
        tamil: "பாக்கியநாதர்",
        also: "Pakkianadher · Paulastamer",
        from: 1729,
        to: 1733,
        tier: "life",
        plate: "பாக்கியநாதர்",
        life:
          "A Saivite poosari of Vittapuram, Chidambaram Pillai, was walking to Cape Comorin with his wife Aantavalli when he heard this church's bell. He stopped for the Mass, stayed for instruction, and was baptised Gnanapragasam — spiritual light. Fr Giuliani made him catechist of the village and built him a house. Twelve years later Gnanapragasam stood godfather at the baptism of St Devasahayam Pillai. Giuliani himself died in office, of blood poisoning, in January 1733.",
        lifeTa: `விட்டப்புரத்தைச் சேர்ந்த சைவப் பூசாரி சிதம்பரம் பிள்ளை, தம் மனைவி ஆந்தவல்லியுடன் கன்னியாகுமரிக்கு நடந்து சென்றுகொண்டிருந்தபோது இவ்வாலயத்தின் மணியோசையைக் கேட்டார். திருப்பலிக்காக நின்றார்; மறைக்கல்விக்காகத் தங்கினார்; ஞானப்பிரகாசம் — ஞான ஒளி — என்னும் பெயரில் திருமுழுக்குப் பெற்றார். அருட்தந்தை ஜுலியானி அவரை ஊரின் மறைக்கல்வியாளராக்கி, அவருக்கு ஒரு வீடும் கட்டிக் கொடுத்தார். பன்னிரண்டு ஆண்டுகள் கழித்து, புனித தேவசகாயம் பிள்ளையின் திருமுழுக்கில் ஞானப்பிரகாசமே ஞானத்தந்தையாக நின்றார். ஜுலியானி அவர்களோ, குருதி நச்சேறியதால், பதவியிலிருக்கும்போதே 1733 ஜனவரியில் இறந்தார்.`,
      },
      {
        n: 15,
        name: "Fr Joseph Silverio",
        nameTa: `அருட்தந்தை ஜோசப் சில்வேரியா`,
        tamil: "ஜோசப் சில்வேரியா",
        from: 1734,
        to: 1740,
        tier: "line",
        note: "An outside history of the Jesuits in Malabar independently confirms his posting here, though it gives 1741 as his last year — one later than the parish's own count.",
        noteTa: `மலபாரில் இயேசு சபையினரைப் பற்றிய ஒரு வெளி வரலாறு, இங்கே இவர் பணியிலிருந்ததைத் தனித்து உறுதிப்படுத்துகிறது; ஆயினும் இவரது இறுதி ஆண்டாக 1741-ஐத் தருகிறது — பங்கின் சொந்தக் கணக்கைவிட ஓராண்டு பிந்தியது.`,
      },
      {
        n: 16,
        name: "Fr John Baptist Buttari, S.J.",
        nameTa: `அருட்தந்தை ஜான் பாப்டிஸ்ட் புத்தாரி, இ.ச.`,
        tamil: "பரஞ்சோதிநாதர்",
        also: "Paranchodinadhar · Jean-Baptiste Bouttari",
        from: 1741,
        to: 1750,
        tier: "life",
        plate: "பரஞ்சோதிநாதர்",
        life:
          "On 14 May 1745 he baptised Neelakanta Pillai, a captain of the Travancore army, by the name Devasahayam — the man the Church canonised in 2022 as the first Indian layman to be declared a saint. In 1749 he began the first stone church, and it was the timber for that building that undid his convert: sent to cut wood in the royal forest, Devasahayam fell into the dispute that ended in his arrest. This church still keeps a piece of his garment and the chains he was bound with. Buttari was moved on to Aoor as the missionary best able to heal that congregation's ills; at Vadakkankulam, Auguste Jean writes, “his memory is held in benediction”.",
        lifeTa: `1745 மே 14-ஆம் நாள், திருவிதாங்கூர்ப் படையின் தலைவராயிருந்த நீலகண்ட பிள்ளைக்குத் தேவசகாயம் என்னும் பெயரில் திருமுழுக்கு அளித்தார் — புனிதராக அறிவிக்கப்பட்ட முதல் இந்தியப் பொதுநிலையினர் என்று 2022-ஆம் ஆண்டில் திருச்சபை இவரையே அறிவித்தது. 1749-ஆம் ஆண்டில் முதல் கல் ஆலயத்தைத் தொடங்கினார்; அக்கட்டிடத்திற்கான மரமே அவரது மனமாற்றம் பெற்றவரை வீழ்த்தியது — அரசக் காட்டில் மரம் வெட்டச் சென்ற தேவசகாயம், அவரது கைது வரை சென்று முடிந்த அந்தத் தகராற்றில் சிக்கினார். அவரது ஆடையின் ஒரு துண்டையும், அவர் கட்டப்பட்டிருந்த சங்கிலிகளையும் இவ்வாலயம் இன்றும் காத்து வைத்திருக்கிறது. அச்சபையின் நோய்களைத் தீர்க்க மிகவும் தகுதியான மறைப்பணியாளர் என்பதால் புத்தாரி ஆவூருக்கு மாற்றப்பட்டார்; வடக்கன்குளத்தில் “அவரது நினைவு ஆசீரோடு காக்கப்படுகிறது” என்று அகுஸ்த் ஜான் எழுதுகிறார்.`,
      },
      {
        n: 17,
        name: "Fr Francis Clemente Thomassini, S.J.",
        nameTa: `அருட்தந்தை பிரான்சிஸ் கிளமெந்தே தோமஸினி, இ.ச.`,
        tamil: "மதுரேந்திரநாதர்",
        also: "Madurendranadher · Gnana Amourdam · Clément Tomassini",
        from: 1751,
        to: 1775,
        tier: "life",
        plate: "மதுரேந்திரநாதர்",
        life:
          "He finished the church Buttari had begun — built in the form of a cross, facing east — and he was the last Jesuit to hold this parish before Rome suppressed the Society of Jesus in 1773. Feeling his end near, he had himself carried to Taley, and died there in 1775, aged seventy-five. Bertrand records what followed: the Christians venerated him as a saint, gave his name to their children and visited his tomb, and in times of drought even the village's Hindus would call on him.",
        lifeTa: `புத்தாரி தொடங்கிவைத்த ஆலயத்தை இவர் கட்டி முடித்தார் — சிலுவை வடிவில், கிழக்கு நோக்கி எழுப்பப்பட்டது அது. 1773-ஆம் ஆண்டில் உரோமை இயேசு சபையை ஒடுக்குவதற்கு முன், இப்பங்கை ஏற்றிருந்த கடைசி இயேசு சபை அருட்தந்தையும் இவரே. தமது முடிவு நெருங்குவதை உணர்ந்து, தம்மைத் தளைக்குச் சுமந்து செல்லச் சொன்னார்; எழுபத்தைந்து வயதில், 1775-ஆம் ஆண்டில் அங்கேயே இறந்தார். அதன் பின் நடந்ததைப் பெர்த்ராண்ட் பதிவு செய்கிறார்: கிறிஸ்தவர்கள் அவரை ஒரு புனிதராக வணங்கினார்கள், தங்கள் பிள்ளைகளுக்கு அவரது பெயரைச் சூட்டினார்கள், அவரது கல்லறைக்குச் சென்று வந்தார்கள்; வறட்சிக் காலங்களில் இவ்வூரின் இந்துக்களும்கூட அவரை மன்றாடினார்கள்.`,
      },
    ],
  },
  {
    numeral: "II",
    title: "The Priests of Cochin",
    titleTa: `கொச்சி அருட்தந்தையர்`,
    years: "1776 – 1835",
    turn:
      "The Society of Jesus had been suppressed by the Pope in 1773. Fr Thomassini died two years later and there was no Jesuit left to send, so the parish passed to the Malabar priests under the Archbishop of Cranganore. For these sixty years it was the sole centre of the whole inland mission, with three smaller stations under it — a government gazetteer records that its priests handed that charge to the newly arrived Jesuits in a single dated act, in 1837. Sixty years, seven priests — and, in the middle of them, the year the parish has commemorated ever since.",
    turnTa: `1773-ஆம் ஆண்டில் திருத்தந்தை இயேசு சபையை ஒடுக்கியிருந்தார். இரண்டு ஆண்டுகள் கழித்து அருட்தந்தை தோமஸினி இறந்தார்; அனுப்புவதற்கு இயேசு சபையில் ஆள் எஞ்சவில்லை. எனவே இப்பங்கு, கொடுங்களூர்ப் பேராயரின் கீழிருந்த மலபார் அருட்தந்தையரிடம் சென்றது. அந்த அறுபது ஆண்டுகளில், தன் கீழ் மூன்று சிறு நிலையங்களை வைத்திருந்த இவ்வூரே உள்நாட்டுப் பணிக்களம் முழுவதற்குமான ஒரே மையமாக இருந்தது — 1837-ஆம் ஆண்டில், புதிதாக வந்த இயேசு சபையினரிடம் அப்பொறுப்பை இவ்வூர் அருட்தந்தையர் நாளிட்ட ஒரே செயலால் ஒப்படைத்தார்கள் என்று ஓர் அரசு அரசிதழ் பதிவு செய்கிறது. அறுபது ஆண்டுகள், ஏழு அருட்தந்தையர் — அவர்களுக்கு நடுவில், அன்று முதல் இப்பங்கு நினைவுகூர்ந்து வரும் அந்த ஆண்டு.`,
    priests: [
      { n: 18, name: "Fr Deva Varadhanar", nameTa: `அருட்தந்தை தேவ வரதனார்`, tamil: "தேவ வரதனார்", from: 1776, to: 1791, tier: "name" },
      { n: 19, name: "Fr Ignatius", nameTa: `அருட்தந்தை இக்னேசியஸ்`, tamil: "இக்னேசியஸ்", from: 1792, to: 1802, tier: "name" },
      {
        n: 20,
        name: "Fr John Louis Cardoza",
        nameTa: `அருட்தந்தை ஜாண் லூயிஸ் கர்டோசா`,
        tamil: "ஜாண் லூயிஸ் கர்டோசா",
        from: 1803,
        to: 1803,
        tier: "life",
        plate: "ஜாண் லூயிஸ் கர்டோசா",
        life:
          "His name occupies a single year of this list, and it is the year. On 23 October 1803 the statue of Our Lady in this church was seen to weep. Fr Cardoza — with a second priest and a European laywoman who examined the statue herself — declared it an extraordinary event, which is why this parish can still name the priest who authenticated its devotion. The souvenir's occasional “1805” is a copying slip: the list shows him parish priest in 1803 and in no other year, between Fr Ignatius and Fr de Miranda.",
        lifeTa: `இப்பட்டியலில் இவரது பெயர் ஒரே ஓராண்டை மட்டுமே அடைத்திருக்கிறது — ஆனால் அது அந்த ஆண்டு. 1803 அக்டோபர் 23-ஆம் நாள், இவ்வாலயத்தில் அன்னையின் திருவுருவம் கண்ணீர் சிந்துவது காணப்பட்டது. அருட்தந்தை கர்டோசா — இரண்டாவது அருட்தந்தை ஒருவரோடும், திருவுருவத்தைத் தாமே பரிசோதித்த ஓர் ஐரோப்பியப் பெண்மணியோடும் சேர்ந்து — அதை வழக்கத்திற்கு மாறான ஒரு நிகழ்வு என்று அறிவித்தார்; அதனால்தான் தன் பக்திக்குச் சான்று பகர்ந்த அருட்தந்தையின் பெயரை இப்பங்கால் இன்றும் சொல்ல முடிகிறது. நினைவு மலரில் அவ்வப்போது வரும் “1805” ஒரு நகல் பிழையே: அருட்தந்தை இக்னேசியஸுக்கும் அருட்தந்தை தெ மிராந்தாவுக்கும் இடையில், 1803-ஆம் ஆண்டில் மட்டுமே — வேறு எந்த ஆண்டிலும் அல்ல — இவரைப் பங்குத் தந்தையாகப் பட்டியல் காட்டுகிறது.`,
      },
      { n: 21, name: "Fr Francis de Miranda", nameTa: `அருட்தந்தை பிரான்சிஸ் தெ மிராந்தா`, tamil: "பிரான்சிஸ் டி பிரான்டா", from: 1804, to: 1808, tier: "name" },
      { n: 22, name: "Fr Xavier Gestand", nameTa: `அருட்தந்தை சவேரியார் ஜெஸ்தாந்து`, tamil: "சேவியர் ஜிஸ்மண்டு", also: "Sigismund", from: 1809, to: 1826, tier: "name" },
      { n: 23, name: "Fr Jacob Puthampare", nameTa: `அருட்தந்தை ஜேக்கப் புத்தம்பரே`, tamil: "ஜேக்கப் பத்தாம் பேரே", from: 1827, to: 1831, tier: "name" },
      { n: 24, name: "Fr Michael Fierras", nameTa: `அருட்தந்தை மிக்கேல் ஃபியேராஸ்`, tamil: "மிக்கேல் பிரான்", also: "Brun", from: 1832, to: 1835, tier: "name" },
    ],
  },
  {
    numeral: "III",
    title: "The Pondicherry Mission",
    titleTa: `புதுச்சேரிப் பணிக்களம்`,
    years: "1836 – 1837",
    turn:
      "Two years and one priest, while the southern missions were being reassigned. The shortest period on the list, and the only one with a single name in it.",
    turnTa: `தென்பகுதிப் பணிக்களங்கள் மீண்டும் பகிர்ந்தளிக்கப்பட்டுக்கொண்டிருந்த காலத்தில், இரண்டு ஆண்டுகள், ஓர் அருட்தந்தை. பட்டியலின் மிகக் குறுகிய காலப்பகுதி இது; ஒரே ஒரு பெயரை மட்டும் கொண்ட ஒன்றும் இதுவே.`,
    priests: [
      { n: 25, name: "Fr Thairiyanadhar", nameTa: `அருட்தந்தை தைரியநாதர்`, tamil: "தைரியநாதர்", also: "Fr Dayriam · Dhairyanathar", from: 1836, to: 1837, tier: "name" },
    ],
  },
  {
    numeral: "IV",
    title: "The New Jesuits of Toulouse",
    titleTa: `துலூஸ் மாகாணத்தின் புதிய இயேசு சபையினர்`,
    years: "1838 – 1910",
    turn:
      "The Society was restored in 1814, and from 1838 the French province of Toulouse took up the Madurai mission again. Almost everything a visitor sees today was built in this period: the present church, its two towers, its bells and its arches.",
    turnTa: `1814-ஆம் ஆண்டில் இயேசு சபை மீண்டும் நிலைநாட்டப்பட்டது; 1838 முதல், பிரான்சின் துலூஸ் மாகாணம் மதுரைப் பணிக்களத்தை மீண்டும் ஏற்றுக்கொண்டது. இன்று ஒரு பார்வையாளர் காண்பவை கிட்டத்தட்ட அனைத்துமே இக்காலத்தில் கட்டப்பட்டவைதான் — இன்றைய ஆலயம், அதன் இரு கோபுரங்கள், அதன் மணிகள், அதன் வளைவுகள்.`,
    priests: [
      {
        n: 26,
        name: "Fr Alex Martin",
        nameTa: `அருட்தந்தை அலெக்ஸ் மார்ட்டின்`,
        tamil: "அலக்சாண்டர் மார்ட்டின்",
        from: 1838,
        to: 1838,
        tier: "life",
        plate: "அலக்சாண்டர் மார்ட்டின்",
        life:
          "Born at Nîmes on 15 December 1798, he was one of the first two Jesuits to set foot in this parish since the Society had been suppressed, visiting on 15–16 June 1838. His own path here had already run through Montrouge, Montmorillon and Bordeaux, the Roman College, and the Portugal mission at Lisbon. He did not live to see the mission he had helped restart take root: riding out to keep the Ascension feast, he fell ill and died at Idaikattur in the Marava less than two years later, on 30 May 1840, aged forty-two — the first Jesuit death of the whole renewed Madurai mission. Fr Louis du Ranquet, who would one day die the same way, had been his travelling companion.",
        lifeTa: `1798 டிசம்பர் 15-ஆம் நாள் நீம் நகரில் பிறந்தவர். இயேசு சபை ஒடுக்கப்பட்ட பின் இப்பங்கில் கால் பதித்த முதல் இரு இயேசு சபை அருட்தந்தையருள் ஒருவர் இவர்; 1838 ஜூன் 15–16 நாட்களில் இங்கே வந்தார். இங்கே வந்து சேர்வதற்கு முன்பே இவரது பாதை மொந்ரூஜ், மொந்மொரியோன், போர்தோ, உரோமைக் கல்லூரி, லிஸ்பனிலிருந்த போர்ச்சுக்கல் பணிக்களம் ஆகியவற்றின் வழியாக ஓடியிருந்தது. தாம் மீண்டும் தொடங்கிவைக்க உதவிய பணிக்களம் வேரூன்றுவதைக் காண இவர் வாழவில்லை: ஆண்டவரின் விண்ணேற்புத் திருவிழாவைக் கொண்டாடக் குதிரையில் புறப்பட்டுச் சென்றபோது நோய்வாய்ப்பட்டு, இரண்டு ஆண்டுகள்கூட நிறைவடையுமுன், 1840 மே 30-ஆம் நாள், நாற்பத்திரண்டு வயதில், மறவ நாட்டின் இடைக்காட்டூரில் இறந்தார் — புதுப்பிக்கப்பட்ட மதுரைப் பணிக்களம் முழுவதிலும் நிகழ்ந்த முதல் இயேசு சபை மரணம் இதுவே. ஒருநாள் இதே வழியில் இறக்கவிருந்த அருட்தந்தை லூயி து ரான்கே இவரது பயணத் துணையாக இருந்தார்.`,
      },
      {
        n: 27,
        name: "Fr Louis Duranguet",
        nameTa: `அருட்தந்தை லூயி துராங்கே`,
        tamil: "ஹம்போ தூராஸ்தெவில",
        also: "Fr Louis du Ranquet, S.J.",
        from: 1839,
        to: 1840,
        tier: "line",
        note: "One of the four Jesuits who restored the mission in 1838, from an Auvergne family that gave five sons to the Society. He was known here as le Sinnasouami du Sud, “the young lord of the South”. He fell ill on 6 November 1843 and died before dawn two days later, at Strivegondam; Fr Castanier, then superior of the southern district, arrived the next morning to bury him.",
        noteTa: `1838-ஆம் ஆண்டில் பணிக்களத்தை மீண்டும் நிலைநாட்டிய நான்கு இயேசு சபை அருட்தந்தையருள் ஒருவர்; இயேசு சபைக்கு ஐந்து மகன்களைத் தந்த ஓவெர்ன் நாட்டுக் குடும்பத்தைச் சேர்ந்தவர். இங்கே இவர் le Sinnasouami du Sud — “தெற்கின் இளைய சுவாமி” — என்று அழைக்கப்பட்டார். 1843 நவம்பர் 6-ஆம் நாள் நோய்வாய்ப்பட்டு, இரண்டு நாட்கள் கழித்து விடியுமுன் ஸ்திரிவெகொந்தத்தில் இறந்தார்; அப்போது தென்கோட்டத் தலைவராயிருந்த அருட்தந்தை காஸ்டானியர் மறுநாள் காலை வந்து அவரை அடக்கம் செய்தார்.`,
      },
      {
        n: 28,
        name: "Fr Antonius Sales",
        nameTa: `அருட்தந்தை அந்தோனியுஸ் சால்ஸ்`,
        tamil: "அன்ரோனின் சேவல்",
        from: 1841,
        to: 1841,
        tier: "life",
        plate: "அன்ரோனின் சேவல்",
        life:
          "Like Fr Alex Martin, whose visit opened this era, he had been a prisoner in the fortress of St-Julien in Portugal, freed only through the French ambassador's intervention. He reached the Fishery Coast with Bishop Canoz's own band of missionaries in 1839 and served this parish in 1841, before going on to found hospital-catechumenates at Trichinopoly and Madura and to serve as spiritual father of St Joseph's College for twelve years. He died on 7 July 1875.",
        lifeTa: `இக்காலத்தைத் தன் வருகையால் தொடங்கிவைத்த அருட்தந்தை அலெக்ஸ் மார்ட்டின் அவர்களைப் போலவே, இவரும் போர்ச்சுக்கலின் புனித ஜூலியன் கோட்டையில் கைதியாக இருந்தவர்; பிரெஞ்சுத் தூதரின் தலையீட்டால் மட்டுமே விடுவிக்கப்பட்டார். 1839-ஆம் ஆண்டில் ஆயர் கனோஸ் அவர்களின் சொந்த மறைப்பணியாளர் குழுவோடு முத்துக்குளிக் கடற்கரையை வந்தடைந்தார்; 1841-ஆம் ஆண்டில் இப்பங்கில் பணியாற்றினார். பின்னர் திருச்சிராப்பள்ளியிலும் மதுரையிலும் மருத்துவமனை மறைக்கல்வி இல்லங்களை நிறுவினார்; பன்னிரண்டு ஆண்டுகள் புனித சூசையப்பர் கல்லூரியின் ஆன்மிகத் தந்தையாகப் பணியாற்றினார். 1875 ஜூலை 7-ஆம் நாள் இறந்தார்.`,
      },
      { n: 29, name: "Fr Constantine", nameTa: `அருட்தந்தை கான்ஸ்தந்தீன்`, also: "Castanier, in the souvenir", from: 1842, to: 1843, tier: "name" },
      {
        n: 30,
        name: "Fr Joseph Grégoire, S.J.",
        nameTa: `அருட்தந்தை ஜோசப் கிரகோயர், இ.ச.`,
        tamil: "ஜோசப் கிரகோரி",
        from: 1844,
        to: 1844,
        tier: "line",
        note: "The first of his three terms here. He would come back twice, and altogether give this village thirty years.",
        noteTa: `இங்கே இவரது மூன்று பதவிக்காலங்களுள் முதலாவது. இன்னும் இருமுறை திரும்பி வரவிருந்தார்; மொத்தத்தில் முப்பது ஆண்டுகளை இவ்வூருக்கு அளித்தார்.`,
      },
      {
        n: 31,
        name: "Fr Louis Verdier, S.J.",
        nameTa: `அருட்தந்தை லூயி வெர்தியே, இ.ச.`,
        tamil: "ஞானப்பிரகாசியார்",
        also: "Gnanapragasiar souvami · pangou-souvami",
        from: 1847,
        to: 1850,
        tier: "life",
        portrait: "verdier",
        portraitFrom: "Dessal, Le Père Louis Verdier, 1902",
        life:
          "Vadakkankulam was his first appointment in India — 1 December 1847 — and the village named him Gnanapragasiar, “spiritual light”, which is the Tamil for Louis. At Anakarei, the other half of his parish, the old Jesuit church was falling down, so he asked every parishioner, “men and women, great and small, young people and old folk”, to carry twenty-four stones to the site before or after the sacraments. In a month and a half he had heard a thousand confessions and twenty-four thousand stones had arrived. He rose to Vicar General of the whole Madurai mission.",
        lifeTa: `இந்தியாவில் இவருக்குக் கிடைத்த முதல் நியமனம் வடக்கன்குளம்தான் — 1847 டிசம்பர் 1. லூயி என்னும் பெயருக்கு நிகரான தமிழ்ச் சொல் “ஞான ஒளி” என்பதால், ஊர் இவரை ஞானப்பிரகாசியார் என்று அழைத்தது. இவரது பங்கின் மறுபாதியான ஆனைக்கரையில் பழைய இயேசு சபை ஆலயம் இடிந்து விழும் நிலையில் இருந்தது; எனவே அருட்சாதனங்களுக்கு முன்னோ பின்னோ இருபத்து நான்கு கற்களைத் தளத்திற்குச் சுமந்து வருமாறு, “ஆண், பெண், பெரியோர், சிறியோர், இளையோர், முதியோர்” என ஒவ்வொரு பங்கு மக்களையும் கேட்டுக்கொண்டார். ஒன்றரை மாதத்தில் ஆயிரம் பாவசங்கீர்த்தனங்களைக் கேட்டிருந்தார்; இருபத்து நான்காயிரம் கற்கள் வந்து சேர்ந்திருந்தன. பின்னர் மதுரைப் பணிக்களம் முழுவதற்கும் பொதுவிகாரியாக உயர்ந்தார்.`,
      },
      {
        n: 32,
        name: "Fr Hieronymus Maza",
        nameTa: `அருட்தந்தை ஹியரோனிமுஸ் மாசா`,
        tamil: "ஜெரோம் மெஸ்",
        also: "Jérôme Mazza",
        from: 1851,
        to: 1852,
        tier: "life",
        plate: "ஜெரோம் மெஸ்",
        life:
          "A refugee of the Piedmont revolution of 1848, he served at Aour and then the cholera-stricken Marava after this parish. He died on the last day of 1862, aged forty-eight, and his own Society recorded that he died en odeur de sainteté — in the odour of sanctity.",
        lifeTa: `1848-ஆம் ஆண்டு பீட்மாந்துப் புரட்சியிலிருந்து தப்பி வந்த அகதி. இப்பங்கிற்குப் பின் ஆவூரிலும், பின்னர் காலரா பீடித்திருந்த மறவ நாட்டிலும் பணியாற்றினார். 1862-ஆம் ஆண்டின் கடைசி நாளில், நாற்பத்தெட்டு வயதில் இறந்தார்; அவர் en odeur de sainteté — புனிதத்தின் நறுமணத்தில் — இறந்தார் என்று அவரது சொந்த சபையே பதிவு செய்தது.`,
      },
      {
        n: 33,
        name: "Fr Joseph Grégoire, S.J.",
        nameTa: `அருட்தந்தை ஜோசப் கிரகோயர், இ.ச.`,
        tamil: "ஜோசப் கிரகோரி",
        from: 1853,
        to: 1861,
        tier: "life",
        plate: "ஜோசப் கிரகோரி",
        life:
          "Auguste Jean calls him, simply, the apostle of Vadakkankulam: “it is chiefly to his persevering energy that this fine Christian community owes its great church.” Bishop Canoz blessed the foundation stone on 9 August 1855, and for seventeen years Grégoire drove the building of it, with the Westphalian lay brother Joseph Bergenthal as his architect. What they finished in 1872 was, in Auguste Jean's phrase, “a church probably without equal in the world” — but on the very day the parish took possession of it, the congregation broke apart and the quarrel went to law; obliged to give evidence against part of his own flock, Grégoire lost his eating and his sleeping, and his strength never came back. He died in the crossing of the Red Sea on 19 September 1873, on the voyage home to France, and was buried at sea. Both of his chroniclers give that same date — an earlier reading of “1875” in one of them, published here for a time, turned out to be a damaged digit rather than a second date.",
        lifeTa: `அகுஸ்த் ஜான் இவரை எளிமையாக “வடக்கன்குளத்தின் திருத்தூதர்” என்றே அழைக்கிறார்: “இந்த அழகிய கிறிஸ்தவ சமூகம் தன் மாபெரும் ஆலயத்தைப் பெற்றது, முதன்மையாக இவரது விடாமுயற்சி மிக்க ஆற்றலால்தான்.” 1855-ஆம் ஆண்டு ஆகஸ்ட் 9-ஆம் நாள் ஆயர் கனோஸ் அடிக்கல்லை ஆசீர்வதித்தார்; பதினேழு ஆண்டுகள் கிரகோயர் அக்கட்டுமானத்தை முன்னின்று நடத்தினார் — வெஸ்ட்பாலியாவைச் சேர்ந்த பொதுநிலைச் சகோதரர் ஜோசப் பெர்கந்தால் அவரது கட்டிடக் கலைஞராக இருந்தார். 1872-ஆம் ஆண்டில் அவர்கள் கட்டி முடித்தது, அகுஸ்த் ஜானின் சொற்களில், “உலகிலேயே ஒருவேளை நிகரற்ற ஓர் ஆலயம்.” ஆனால் மக்கள் அதைப் பொறுப்பேற்ற அதே நாளில் சபை பிளவுபட்டது; அந்தத் தகராறு நீதிமன்றம் வரை சென்றது. தம் சொந்த மந்தையின் ஒரு பகுதிக்கு எதிராகச் சாட்சி சொல்ல வேண்டியதாயிற்று; கிரகோயர் உணவையும் உறக்கத்தையும் இழந்தார்; அவரது வலிமை மீளவே இல்லை. பிரான்சுக்குத் திரும்பிச் சென்ற கப்பல் பயணத்தில், 1873 செப்டம்பர் 19-ஆம் நாள், செங்கடலைக் கடக்கும்போது இறந்தார்; கடலிலேயே அடக்கம் செய்யப்பட்டார். அவரைப் பற்றி எழுதிய இரு வரலாற்றாசிரியர்களும் அதே நாளையே தருகிறார்கள் — அவர்களுள் ஒருவரிடம் காணப்பட்ட “1875” என்னும் முந்தைய வாசிப்பு சில காலம் இங்கே வெளியிடப்பட்டிருந்தது; அது இரண்டாவது தேதி அல்ல, சேதமடைந்த ஓர் இலக்கமே என்று பின்னர் தெரியவந்தது.`,
      },
      {
        n: 34,
        name: "Fr Clément Castanier, S.J.",
        nameTa: `அருட்தந்தை கிளமென் காஸ்டானியர், இ.ச.`,
        tamil: "காஸ்டானியர்",
        also: "signed his own letters Alexis Castanier",
        from: 1862,
        to: 1865,
        tier: "life",
        plate: "காஸ்டானியர்",
        life:
          "The parish's own sources call him Clément, but he signed his own letters Alexis Castanier — born in the Lozère on 16 February 1802, a Jesuit from 1826, in India from 1839. He rose to superior of the mission's southern, northern and central districts in turn, and of Negapatam, and died on 17 February 1874. A full printed biography of him exists in French, in a two-volume history of fifty years of the Madurai mission.",
        lifeTa: `பங்கின் சொந்த ஆதாரங்கள் இவரைக் கிளமென் என்று அழைக்கின்றன; ஆனால் தம் கடிதங்களில் இவர் அலெக்சிஸ் காஸ்டானியர் என்றே கையொப்பமிட்டார். 1802 பிப்ரவரி 16-ஆம் நாள் லொஸேர் நாட்டில் பிறந்தவர்; 1826 முதல் இயேசு சபையினர்; 1839 முதல் இந்தியாவில். பணிக்களத்தின் தென், வட, மத்தியக் கோட்டங்களுக்கும், நாகப்பட்டினத்திற்கும் முறையே தலைவராக உயர்ந்தார்; 1874 பிப்ரவரி 17-ஆம் நாள் இறந்தார். மதுரைப் பணிக்களத்தின் ஐம்பது ஆண்டுகளைப் பற்றிய இரு தொகுதி வரலாற்று நூலில், இவரது முழு வாழ்க்கை வரலாறு ஒன்று பிரெஞ்சு மொழியில் அச்சில் உள்ளது.`,
      },
      {
        n: 35,
        name: "Fr Joseph Grégoire, S.J.",
        nameTa: `அருட்தந்தை ஜோசப் கிரகோயர், இ.ச.`,
        tamil: "ஜோசப் கிரகோரி",
        from: 1866,
        to: 1870,
        tier: "line",
        note: "His third and last term as parish priest. He stayed on in the village for years after it ended, and was still here when the church was blessed in 1872.",
        noteTa: `பங்குத் தந்தையாக இவரது மூன்றாவது, இறுதிப் பதவிக்காலம். அது முடிந்த பின்னும் பல ஆண்டுகள் இவ்வூரிலேயே தங்கியிருந்தார்; 1872-ஆம் ஆண்டில் ஆலயம் ஆசீர்வதிக்கப்பட்டபோதும் இங்கேயே இருந்தார்.`,
      },
      {
        n: 36,
        name: "Fr Guillielmus Pouget, S.J.",
        nameTa: `அருட்தந்தை வில்லியம் பூஜே, இ.ச.`,
        also: "William Pouget",
        from: 1870,
        to: 1873,
        tier: "line",
        note: "His first term; he would return in 1882 for eleven years.",
        noteTa: `இவரது முதல் பதவிக்காலம்; 1882-ஆம் ஆண்டில் பதினொரு ஆண்டுகளுக்குத் திரும்பி வரவிருந்தார்.`,
      },
      { n: 37, name: "Fr William Paget", nameTa: `அருட்தந்தை வில்லியம் பேஜெட்`, tamil: "வில்லியம் பேஜெட்", from: 1873, to: 1874, tier: "name" },
      {
        n: 38,
        name: "Fr Ficiuos Babos",
        nameTa: `அருட்தந்தை ஃபிசியுஸ் பாபோஸ்`,
        tamil: "பிரட்ரிக்கா போஸ்",
        also: "probably Fr Frixius Cabos, S.J.",
        from: 1875,
        to: 1875,
        tier: "line",
        note: "The name is very likely a garbling of Frixius Cabos, who had been superior of the whole Southern Mission of Madurai since 1869 — so this single year here came in the middle of a much larger charge.",
        noteTa: `இப்பெயர், 1869 முதல் மதுரையின் தென்பகுதிப் பணிக்களம் முழுவதற்கும் தலைவராயிருந்த ஃபிரிக்சியுஸ் காபோஸ் என்பவரின் பெயர் சிதைந்த வடிவமாக இருப்பதற்கே வாய்ப்பு மிகுதி — அப்படியெனில், இங்கே இவர் இருந்த இந்த ஒரே ஆண்டு, அதைவிட மிகப் பெரிய ஒரு பொறுப்பின் நடுவே வந்ததாகும்.`,
      },
      {
        n: 39,
        name: "Fr Victor Delpech, S.J.",
        nameTa: `அருட்தந்தை விக்தோர் தெல்பெஷ், இ.ச.`,
        tamil: "விக்டர் டெல்ப்ளீ",
        from: 1876,
        to: 1876,
        tier: "life",
        portrait: "delpech",
        portraitFrom: "Suau, L'Inde tamoule, 1899",
        life:
          "He preached with statues and marionettes worked by hidden springs, and he had been Fr Grégoire's travelling companion on the voyage where Grégoire died. Acting parish priest in 1876, he then served this church eleven years as assistant, and he died in it — “in the arms of Fr Pouget, at Vadakenkoulam, the eve of the feast of the most holy Name of Jesus”, 16 January 1887. He is buried behind the church, and the black stone over him, photographed in 2026, is cut “Natus 10 Nov. 1835 · Mortuus 16 Jan. 1887” — the same date a survey of European tombs made in 1894 had already read: “1887, 16th January. Victor Delpech S.J., aged 52 years.”",
        lifeTa: `மறைவான சுருள்வில்களால் இயக்கப்பட்ட திருவுருவங்களையும் பொம்மைகளையும் கொண்டு மறையுரை ஆற்றியவர். அருட்தந்தை கிரகோயர் இறந்த அந்தக் கப்பல் பயணத்தில் அவரது துணையாகச் சென்றவரும் இவரே. 1876-ஆம் ஆண்டில் பதில் பங்குத் தந்தையாக இருந்தார்; பின்னர் பதினொரு ஆண்டுகள் இவ்வாலயத்தில் உதவி அருட்தந்தையாகப் பணியாற்றி, இங்கேயே இறந்தார் — “வடக்கன்குளத்தில், மகா பரிசுத்த இயேசுவின் திருப்பெயர் விழாவின் முன்னாளில், அருட்தந்தை பூஜே அவர்களின் கைகளில்”, 1887 ஜனவரி 16-ஆம் நாள். ஆலயத்திற்குப் பின்புறம் அடக்கம் செய்யப்பட்டுள்ளார்; 2026-ஆம் ஆண்டில் புகைப்படம் எடுக்கப்பட்ட அவரது கருங்கல்லில் “Natus 10 Nov. 1835 · Mortuus 16 Jan. 1887” என்று செதுக்கப்பட்டுள்ளது — 1894-ஆம் ஆண்டில் ஐரோப்பியக் கல்லறைகள் பற்றிய ஒரு கணக்கெடுப்பு ஏற்கெனவே வாசித்திருந்த அதே தேதி: “1887, 16th January. Victor Delpech S.J., aged 52 years.”`,
      },
      {
        n: 40,
        name: "Fr Joseph Faseuille, S.J.",
        nameTa: `அருட்தந்தை ஜோசப் ஃபசெயி, இ.ச.`,
        tamil: "ஜோசப் பெல்லஸ்வில்லே",
        from: 1877,
        to: 1882,
        tier: "life",
        plate: "ஜோசப் பெல்லஸ்வில்லே",
        life:
          "The Rome catalogue of 1880 lists him here as minister and superior. He went on to become Rector of St Joseph's College, Trichinopoly, and in 1887 Rome named him coadjutor bishop of Trichinopoly — a promotion he had the bulls withdrawn rather than accept, out of humility. He rose instead to Superior-General of the whole Madurai mission in 1898.",
        lifeTa: `1880-ஆம் ஆண்டு உரோமைப் பதிவேடு, இவரை இங்கே இல்ல நிர்வாகியாகவும் தலைவராகவும் பட்டியலிடுகிறது. பின்னர் திருச்சிராப்பள்ளி புனித சூசையப்பர் கல்லூரியின் முதல்வரானார்; 1887-ஆம் ஆண்டில் திருச்சிராப்பள்ளியின் துணை ஆயராக உரோமை இவரை நியமித்தது — ஆனால் தாழ்ச்சியின் காரணமாக அப்பதவியை ஏற்காமல், அதற்கான திருமடல்களைத் திரும்பப் பெறச் செய்தார். அதற்குப் பதிலாக 1898-ஆம் ஆண்டில் மதுரைப் பணிக்களம் முழுவதற்கும் பொதுத் தலைவராக உயர்ந்தார்.`,
      },
      {
        n: 41,
        name: "Fr Guillielmus Pouget, S.J.",
        nameTa: `அருட்தந்தை வில்லியம் பூஜே, இ.ச.`,
        tamil: "வில்லியம் புக்கே",
        from: 1882,
        to: 1893,
        tier: "life",
        plate: "வில்லியம் புக்கே",
        life:
          "By 1887 he was already the resident priest here, and it was in his arms that Fr Delpech died that January. Two Christmases later he took a visitor up into the church towers, pointed out a hedge at the garden's end and told him not to go near it after dark — a tiger had carried off a cow from that spot the year before — and then opened the reliquary that holds St Devasahayam's turban and the chains he was bound with, so the visitor could see them for himself.",
        lifeTa: `1887-ஆம் ஆண்டிற்குள்ளேயே இவர் இங்கே தங்கியிருந்த அருட்தந்தையாக இருந்தார்; அந்த ஜனவரியில் அருட்தந்தை தெல்பெஷ் இறந்தது இவரது கைகளிலேயே. இரண்டு கிறிஸ்து பிறப்பு விழாக்களுக்குப் பின், வந்திருந்த ஒரு பார்வையாளரை ஆலயக் கோபுரங்களின் மேலே அழைத்துச் சென்று, தோட்டத்தின் முனையில் இருந்த ஒரு புதரைச் சுட்டிக்காட்டி, இருட்டிய பின் அதனருகே செல்ல வேண்டாம் என்று சொன்னார் — முந்தைய ஆண்டு அவ்விடத்திலிருந்தே ஒரு புலி ஒரு பசுவைத் தூக்கிச் சென்றிருந்தது. பின்னர், புனித தேவசகாயத்தின் தலைப்பாகையையும் அவர் கட்டப்பட்டிருந்த சங்கிலிகளையும் வைத்திருக்கும் திருஎச்சப் பேழையைத் திறந்து, அப்பார்வையாளர் அவற்றைத் தாமே காணும்படி செய்தார்.`,
      },
      {
        n: 42,
        name: "Fr Joseph Faseuille, S.J.",
        nameTa: `அருட்தந்தை ஜோசப் ஃபசெயி, இ.ச.`,
        tamil: "ஜோசப் சாங் பால்க்வில்லே",
        from: 1894,
        to: 1895,
        tier: "line",
        note: "His second term here, seventeen years after the first.",
        noteTa: `இங்கே இவரது இரண்டாம் பதவிக்காலம்; முதலாவது தொடங்கி பதினேழு ஆண்டுகளுக்குப் பின்.`,
      },
      { n: 43, name: "Fr Adaikalam", nameTa: `அருட்தந்தை அடைக்கலம்`, tamil: "அடைக்கலம்", from: 1895, to: 1896, tier: "name" },
      { n: 44, name: "Fr Peter Brien", nameTa: `அருட்தந்தை பீட்டர் பிரையன்`, tamil: "பீட்டர் புரண்ட் இன்போடாரியம்", from: 1896, to: 1897, tier: "name" },
      {
        n: 45,
        name: "Fr Gabriel Berthien",
        nameTa: `அருட்தந்தை கபிரியேல் பெர்த்தியன்`,
        tamil: "கபிரியேல் பெர்திஞ்",
        also: "Bertin",
        from: 1897,
        to: 1898,
        tier: "line",
        note: "His own brother, Fr Jacques Berthieu, was killed in Madagascar in 1896 for the faith, and canonised a saint in 2012.",
        noteTa: `இவரது சொந்தச் சகோதரர் அருட்தந்தை ஜாக் பெர்த்தியே, 1896-ஆம் ஆண்டில் மடகாஸ்கரில் விசுவாசத்திற்காகக் கொல்லப்பட்டார்; 2012-ஆம் ஆண்டில் புனிதராக அறிவிக்கப்பட்டார்.`,
      },
      { n: 46, name: "Fr Chinnappar", nameTa: `அருட்தந்தை சின்னப்பர்`, tamil: "சின்னப்பர்", from: 1899, to: 1899, tier: "name" },
      {
        n: 47,
        name: "Fr Marianus Dayriam, S.J.",
        nameTa: `அருட்தந்தை மரியானுஸ் தைரியம், இ.ச.`,
        tamil: "தைரியநாதர்",
        from: 1899,
        to: 1910,
        tier: "line",
        note:
          "Parish priest, chaplain to the convent of the native Sisters of the Seven Sorrows, and director of the schools — the three offices every late-Jesuit pastor of this village held at once.",
        noteTa: `பங்குத் தந்தை; நாட்டு ஏழு வியாகுல அன்னையின் அருட்சகோதரிகளின் மடத்திற்கு ஆன்மிகத் தந்தை; பள்ளிகளின் இயக்குநர் — இவ்வூரின் பிற்காலத்து இயேசு சபைப் பங்குத் தந்தையர் ஒவ்வொருவரும் ஒரே நேரத்தில் ஏற்றிருந்த மூன்று பொறுப்புகள் இவை.`,
      },
    ],
  },
  {
    numeral: "V",
    title: "The Modern Era",
    titleTa: `நவீன காலம்`,
    years: "1910 – today",
    turn:
      "The parish's own list opens its last period in 1910, but the change it marks came in 1923: the Diocese of Tuticorin was erected and the church passed from the Society of Jesus to the diocesan clergy. That is why, from Fr Ignatius onward, every name here is Tamil — and why the last twelve pastors are the first whose faces the parish still has.",
    turnTa: `பங்கின் சொந்தப் பட்டியல் தன் இறுதிக் காலப்பகுதியை 1910-ல் தொடங்குகிறது; ஆனால் அது குறிக்கும் மாற்றம் நிகழ்ந்தது 1923-ல்தான் — தூத்துக்குடி மறைமாவட்டம் நிறுவப்பட்டு, ஆலயம் இயேசு சபையிடமிருந்து மறைமாவட்ட அருட்தந்தையரிடம் சென்றது. அதனால்தான் அருட்தந்தை இன்னாசியார் முதல் இங்குள்ள ஒவ்வொரு பெயரும் தமிழ்ப் பெயராக உள்ளது; பங்கு இன்றும் முகத்தை வைத்திருக்கும் முதல் பங்குத் தந்தையர் இந்தக் கடைசிப் பன்னிரண்டு பேரே.`,
    priests: [
      {
        n: 48,
        name: "Fr Adrien Caussanel, S.J.",
        nameTa: `அருட்தந்தை அத்ரியன் கௌசானல், இ.ச.`,
        also: "Causonnel · Caussonnel",
        from: 1910,
        to: 1919,
        tier: "life",
        portrait: "caussanel",
        portraitFrom: "La Mission du Maduré, 1930",
        life:
          "His own Jesuit obituary says of this pastorate only that at Vadakenkoulam “he sustained long struggles”. He took down the partitions that divided the inside of the 1872 church, so that the whole parish stood in one nave and sang together, and he held to it in the face of determined opposition — the case went to the District Court in 1913 and on to the Madras High Court, which decided it in 1926. A visitor who met him here wrote that he had never seen a man so thin: for eighteen years Fr Caussanel had taken no solid food, living on milk and bananas. In whatever hours he had left he sat with the parish's old registers and letters working out what they said, and wrote from them a history that the Society's archive still holds — historians came to consult him about it. He founded the Brothers of the Sacred Heart at Palamcottah in 1902, and died at Kallikulam on 25 January 1930. His own obituary judged him two men at once: the difficult one that some in the mission never forgave, and the one the village would have canonised on the spot.",
        lifeTa: `இப்பங்குப் பணியைப் பற்றி இவரது இயேசு சபை இரங்கல் குறிப்பு சொல்வது இவ்வளவே: வடக்கன்குளத்தில் “நீண்ட போராட்டங்களைத் தாங்கினார்.” 1872-ஆம் ஆண்டு ஆலயத்தின் உட்புறத்தைப் பிரித்திருந்த தடுப்புகளை இவர் இடித்து அகற்றினார்; அதனால் பங்கு முழுவதும் ஒரே மண்டபத்தில் நின்று ஒன்றாகப் பாடியது. உறுதியான எதிர்ப்புக்கு நடுவிலும் அதில் அவர் நிலைத்து நின்றார் — அவ்வழக்கு 1913-ஆம் ஆண்டில் மாவட்ட நீதிமன்றத்திற்கும், பின்னர் சென்னை உயர் நீதிமன்றத்திற்கும் சென்று, 1926-ஆம் ஆண்டில் தீர்ப்புப் பெற்றது. இங்கே இவரைச் சந்தித்த ஒரு பார்வையாளர், இத்தனை மெலிந்த மனிதரைத் தாம் ஒருபோதும் கண்டதில்லை என்று எழுதினார்: பதினெட்டு ஆண்டுகளாக அருட்தந்தை கௌசானல் திடமான உணவு எதுவும் உண்ணாமல், பாலிலும் வாழைப்பழத்திலும் வாழ்ந்து வந்தார். எஞ்சிய நேரங்களில் பங்கின் பழைய பதிவேடுகளோடும் கடிதங்களோடும் அமர்ந்து, அவை என்ன சொல்கின்றன என்பதைக் கண்டறிந்தார்; அவற்றிலிருந்து ஒரு வரலாற்றை எழுதினார் — அது இன்றும் இயேசு சபையின் ஆவணக்காப்பகத்தில் உள்ளது; வரலாற்றாசிரியர்கள் அதைப் பற்றி இவரைக் கலந்தாலோசிக்க வந்தார்கள். 1902-ஆம் ஆண்டில் பாளையங்கோட்டையில் திரு இருதய சகோதரர் சபையை நிறுவினார்; 1930 ஜனவரி 25-ஆம் நாள் கள்ளிகுளத்தில் இறந்தார். இவரை ஒரே நேரத்தில் இரு மனிதராக இவரது இரங்கல் குறிப்பே எடைபோட்டது: பணிக்களத்தில் சிலர் ஒருபோதும் மன்னிக்காத கடினமான மனிதர்; அதே நேரத்தில், அவ்விடத்திலேயே புனிதராக அறிவித்திருக்கும் அளவுக்கு ஊர் கண்ட மனிதர்.`,
      },
      {
        n: 49,
        name: "Fr Ponor",
        nameTa: `அருட்தந்தை போனோர்`,
        tamil: "போனோசர்",
        also: "Alfred Bonhoure, S.J.",
        from: 1919,
        to: 1923,
        tier: "line",
        note: "His assistant here in 1921 was Fr Edgard Wafflart. Bonhoure himself went on to become Rector of St Joseph's College, Trichinopoly, and was, by trade, an entomologist.",
        noteTa: `1921-ஆம் ஆண்டில் இங்கே இவரது உதவி அருட்தந்தையாக இருந்தவர் அருட்தந்தை எத்கார் வாஃப்லார். அல்பிரெட் பொனூர் அவர்களே பின்னர் திருச்சிராப்பள்ளி புனித சூசையப்பர் கல்லூரியின் முதல்வரானார்; தொழில்முறையில் இவர் ஒரு பூச்சியியல் அறிஞர்.`,
      },
      {
        n: 50,
        name: "Fr Y. Ignatius",
        nameTa: `அருட்தந்தை Y. இன்னாசியார்`,
        tamil: "இன்னாசியார்",
        from: 1924,
        to: 1936,
        tier: "line",
        note:
          "The first diocesan priest on this list. The Catholic Directory of India for 1924 finds him here with an assistant, Fr G. Michael, 4,765 Catholics and seventeen villages — one church of brick and four of clay.",
        noteTa: `இப்பட்டியலில் இடம்பெறும் முதல் மறைமாவட்ட அருட்தந்தை. 1924-ஆம் ஆண்டுக்கான இந்தியக் கத்தோலிக்க வழிகாட்டி நூல் இவரை இங்கே காண்கிறது — உதவி அருட்தந்தையாக அருட்தந்தை G. மைக்கேல், 4,765 கத்தோலிக்கர், பதினேழு ஊர்கள்; ஒரு செங்கல் ஆலயமும் நான்கு களிமண் ஆலயங்களும்.`,
      },
      { n: 51, name: "Fr Mariadas", nameTa: `அருட்தந்தை மரியதாஸ்`, tamil: "மரியதாஸ்", from: 1936, to: 1943, tier: "name" },
      { n: 52, name: "Fr Joachim Fernando", nameTa: `அருட்தந்தை சுவக்கின் பெர்னாந்தோ`, tamil: "சுவக்கின்", from: 1943, to: 1950, tier: "name" },
      {
        n: 53,
        name: "Fr Benedict",
        nameTa: `அருட்தந்தை பெனடிக்ட்`,
        from: 1950,
        to: 1954,
        tier: "line",
        note: "In 1953 he built the kiosk that still stands beside the church.",
        noteTa: `1953-ஆம் ஆண்டில், ஆலயத்தின் அருகே இன்றும் நிற்கும் சிறு மண்டபத்தை இவர் கட்டினார்.`,
      },
      { n: 54, name: "Fr Navamani", nameTa: `அருட்தந்தை அமல ஆதி நவமணி`, tamil: "அமல ஆதி நவமணி", from: 1954, to: 1960, tier: "name" },
      {
        n: 55,
        name: "Fr Maria Ganam",
        nameTa: `அருட்தந்தை மரிய ஞானம்`,
        tamil: "மரியதாசர்",
        from: 1960,
        to: 1974,
        tier: "line",
        portrait: "maria-ganam",
        portraitFrom: "Diocese of Thoothukudi",
        note: "He invited the Bethany Sisters to the parish on 27 July 1970, and inaugurated a Legion of Mary praesidium the same year.",
        noteTa: `1970 ஜூலை 27-ஆம் நாள் பெத்தானி சகோதரிகளைப் பங்கிற்கு அழைத்தார்; அதே ஆண்டில் மரியாயின் சேனையின் ஒரு பிரிவைத் தொடங்கிவைத்தார்.`,
      },
      {
        n: 56,
        name: "Fr M. S. Antony",
        // The parish's own spelling of this man's name (அந்தோனியார்), not the
        // glossary's saint (புனித அந்தோணியார்) — a different word for a
        // different person, and the register follows the register.
        nameTa: `அருட்தந்தை M. S. அந்தோனியார்`,
        tamil: "அந்தோனியார்",
        from: 1974,
        to: 1982,
        tier: "life",
        portrait: "ms-antony",
        portraitFrom: "Diocese of Thoothukudi",
        life:
          "He had gone to school here himself, at St Theresa's, before he was ever its priest. Ordained in 1948, he served eleven parishes across four decades before he returned to Vadakkankulam to lead it — and while here he raised St Theresa's to a higher secondary school and laid the mosaic floor of the church itself. He is also credited with founding the parish's Don Bosco Youth Movement sodality in 1971, three years before his tenure as parish priest is otherwise listed as beginning. Among the vocations he guided was a boy who would himself become parish priest here decades later, Fr Thaddeus Rajan. He died on 3 October 2021.",
        lifeTa: `இவ்வூரின் அருட்தந்தையாவதற்கு நெடுங்காலம் முன்பே, இங்குள்ள புனித தெரேசாள் பள்ளியில் இவர் மாணவராகப் படித்தவர். 1948-ஆம் ஆண்டில் குருத்துவம் பெற்று, நான்கு பத்தாண்டுகளில் பதினொரு பங்குகளில் பணியாற்றிய பின், வடக்கன்குளத்தை வழிநடத்த இங்கேயே திரும்பி வந்தார். இங்கிருந்தபோது புனித தெரேசாள் பள்ளியை மேல்நிலைப் பள்ளியாக உயர்த்தினார்; ஆலயத்தின் மொசைக் தரையையும் இட்டார். 1971-ஆம் ஆண்டில் பங்கின் தான் போஸ்கோ இளையோர் இயக்கச் சபையை நிறுவியதும் இவரே எனச் சொல்லப்படுகிறது — பங்குத் தந்தையாக இவரது பதவிக்காலம் தொடங்கியதாகப் பட்டியல் காட்டும் ஆண்டுக்கு மூன்று ஆண்டுகள் முன்பே. இவர் வழிநடத்திய குருத்துவ அழைத்தல்களுள் ஒன்று, பல பத்தாண்டுகளுக்குப் பின் இங்கேயே பங்குத் தந்தையான ஒரு சிறுவனுடையது — அருட்தந்தை தத்தேயு ராஜன். 2021 அக்டோபர் 3-ஆம் நாள் இறந்தார்.`,
      },
      {
        n: 57,
        name: "Fr Peter Raja",
        nameTa: `அருட்தந்தை பீட்டர் ராஜா`,
        from: 1982,
        to: 1985,
        tier: "line",
        portrait: "peter-rajah",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "The earliest parish priest of this church whose photograph the parish still holds.",
        noteTa: `இவ்வாலயத்தின் பங்குத் தந்தையருள், பங்கு இன்றும் புகைப்படத்தை வைத்திருக்கும் மிகப் பழையவர் இவரே.`,
      },
      {
        n: 58,
        name: "Fr Cruz Marian",
        nameTa: `அருட்தந்தை குருசுமரியன்`,
        tamil: "குருசுமரியன்",
        from: 1985,
        to: 1988,
        tier: "line",
        portrait: "cruz-marian",
        portraitFrom: "150th-anniversary souvenir, 2022",
      },
      {
        n: 59,
        name: "Fr Job De Rose",
        nameTa: `அருட்தந்தை ஜோப் தெ ரோஸ்`,
        also: "Joseph De Rose",
        from: 1988,
        to: 1990,
        tier: "line",
        note: "Twice parish priest of this church; he was sent back in 1997. The souvenir left his portrait roundel blank.",
        noteTa: `இவ்வாலயத்தின் பங்குத் தந்தையாக இருமுறை இருந்தவர்; 1997-ஆம் ஆண்டில் மீண்டும் இங்கே அனுப்பப்பட்டார். நினைவு மலரில் இவரது படத்திற்கான வட்டம் வெறுமையாகவே விடப்பட்டது.`,
      },
      {
        n: 60,
        name: "Fr Irudayaraj",
        nameTa: `அருட்தந்தை இருதயராஜ்`,
        tamil: "இருதயராஜ்",
        also: "recorded in the souvenir as Fr Sahayaraj",
        from: 1990,
        to: 1995,
        tier: "line",
        note: "In 1990–91 he gave the parish its separate Church of St Sebastian, with its teak-wood image.",
        noteTa: `1990–91-ஆம் ஆண்டுகளில், தேக்கு மரத்தில் செய்யப்பட்ட திருவுருவத்துடன், புனித செபஸ்தியார் ஆலயத்தைத் தனியாகப் பங்கிற்கு அளித்தார்.`,
      },
      {
        n: 61,
        name: "Rev. Msgr S. Mariadas",
        nameTa: `மேதகு அருட்தந்தை S. மரியதாஸ்`,
        tamil: "மரியதாஸ்",
        from: 1995,
        to: 1997,
        tier: "line",
        portrait: "mariadas",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "A Monsignor — the only one on this list.",
        noteTa: `ஒரு மேதகு அருட்தந்தை — இப்பட்டியலில் இவர் ஒருவரே.`,
      },
      { n: 62, name: "Fr Job De Rose", nameTa: `அருட்தந்தை ஜோப் தெ ரோஸ்`, from: 1997, to: 1998, tier: "line", note: "His second term.", noteTa: `இவரது இரண்டாம் பதவிக்காலம்.` },
      {
        n: 63,
        name: "Fr Theophilus",
        nameTa: `அருட்தந்தை தியோபிலஸ்`,
        tamil: "தியோபிலஸ்",
        from: 1998,
        to: 2003,
        tier: "line",
        portrait: "theophilus",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "He had served this church as assistant priest in 1984, fourteen years before he came back to hold it.",
        noteTa: `1984-ஆம் ஆண்டில் இவ்வாலயத்தில் உதவி அருட்தந்தையாகப் பணியாற்றியவர்; பதினான்கு ஆண்டுகளுக்குப் பின் அதை ஏற்கத் திரும்பி வந்தார்.`,
      },
      {
        n: 64,
        name: "Fr N. A. Panneerselvam",
        nameTa: `அருட்தந்தை N. A. பன்னீர்செல்வம்`,
        from: 2003,
        to: 2008,
        tier: "line",
        portrait: "panneerselvam",
        portraitFrom: "150th-anniversary souvenir, 2022",
      },
      {
        n: 65,
        name: "Fr Nelson Paul Raj",
        nameTa: `அருட்தந்தை நெல்சன் பால்ராஜ்`,
        tamil: "நெல்சன் பால்ராஜ்",
        from: 2008,
        to: 2013,
        tier: "line",
        portrait: "nelson-paul-raj",
        portraitFrom: "150th-anniversary souvenir, 2022",
      },
      {
        n: 66,
        name: "Fr Thaddeus Rajan",
        nameTa: `அருட்தந்தை தத்தேயு ராஜன்`,
        tamil: "தடேயுஸ் ராஜன்",
        from: 2013,
        to: 2018,
        tier: "life",
        portrait: "thaddeus-rajan",
        portraitFrom: "150th-anniversary souvenir, 2022",
        life:
          "He completed the Calvary chapel of the apparition church, set up in it the statues of St Devasahayam and St Arulanandar, and began the First-Saturday devotion that the parish keeps still. In 2014 he had the festival chariot that carries Our Lady through the village newly designed and built.",
        lifeTa: `காட்சி மாதா ஆலயத்தின் சிலுவைக் கோவிலை இவர் கட்டி முடித்தார்; அதில் புனித தேவசகாயம், புனித அருளானந்தர் ஆகியோரின் திருவுருவங்களை நிறுவினார்; பங்கு இன்றும் கடைப்பிடிக்கும் முதல் சனிக்கிழமைப் பக்திமுயற்சியைத் தொடங்கிவைத்தார். 2014-ஆம் ஆண்டில், அன்னையை ஊரெங்கும் ஏந்திச் செல்லும் திருத்தேரைப் புதிதாக வடிவமைத்துச் செய்வித்தார்.`,
      },
      {
        n: 67,
        name: "Fr T. John Britto",
        nameTa: `அருட்தந்தை T. ஜான் பிரிட்டோ`,
        tamil: "ஜான் பிரிட்டோ",
        from: 2018,
        to: 2023,
        tier: "line",
        portrait: "john-britto",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "The parish flagstaff was raised in his time, and consecrated by Bishop A. Stephen on 6 August 2021.",
        noteTa: `பங்கின் கொடிமரம் இவரது காலத்தில் நிறுவப்பட்டது; 2021 ஆகஸ்ட் 6-ஆம் நாள் ஆயர் A. ஸ்டீபன் அவர்களால் அர்ப்பணிக்கப்பட்டது.`,
      },
      {
        n: 68,
        name: "Fr Martin Manuvel",
        nameTa: `அருட்தந்தை மார்ட்டின் மனுவேல்`,
        from: 2023,
        to: 2025,
        tier: "line",
        portrait: "martin-manuvel",
        portraitFrom: "Diocese of Thoothukudi",
        note: "Ordained in 1988, he moved on from here to become parish priest of St Antony's Church, Azhagappapuram.",
        noteTa: `1988-ஆம் ஆண்டில் குருத்துவம் பெற்றவர்; இங்கிருந்து சென்று, அழகப்பபுரம் புனித அந்தோணியார் ஆலயத்தின் பங்குத் தந்தையானார்.`,
      },
      {
        n: 69,
        name: "Fr A. Joseph Christian",
        nameTa: `அருட்தந்தை A. ஜோசப் கிறிஸ்டியன்`,
        from: 2025,
        to: THIS_YEAR,
        current: true,
        tier: "line",
        portrait: "joseph-christian",
        portraitFrom: "Diocese of Thoothukudi",
        note: "The sixty-ninth priest of this parish, and the one who has it now. Ordained in 1985, he also serves as Vicar Forane of the Vadakkankulam vicariate.",
        noteTa: `இப்பங்கின் அறுபத்தொன்பதாவது அருட்தந்தை; இப்போது இப்பங்கை ஏற்றிருப்பவரும் இவரே. 1985-ஆம் ஆண்டில் குருத்துவம் பெற்றவர்; வடக்கன்குளம் மறைவட்டத்தின் மறைவட்ட முதல்வராகவும் பணியாற்றுகிறார்.`,
      },
    ],
  },
];

/** Flat list, for counts and for the JSON-LD. */
export const ALL_PRIESTS: Priest[] = PERIODS.flatMap((p) => p.priests);

/**
 * Sixty-nine, but of *pastorates* rather than men: Fr Grégoire holds three of
 * these numbers, and Borghese, Faseuille, Pouget and De Rose two each. The page
 * therefore counts pastorates and says so. No distinct-men total is published,
 * because it cannot be computed honestly from the names alone — two different
 * priests called Mariadas hold #51 and #61, and two called Ignatius hold #19 and
 * #50, so de-duplicating by name would merge four men into two.
 */
export const TERM_COUNT = ALL_PRIESTS.length;

/** Years served, for the tenure stroke. Never less than one: a priest who
 *  appears against a single year still held the parish that year. */
export function tenureYears(p: Priest): number {
  return Math.max(1, p.to - p.from);
}

/** "1741 – 1750", "1708", "2025 – today". */
export function tenureLabel(p: Priest): string {
  if (p.current) return `${p.from} – today`;
  if (p.to === p.from) return `${p.from}`;
  return `${p.from} – ${p.to}`;
}

/** In Tamil, "2025 – today". Years stay in Western Arabic numerals. */
export function tenureLabelTa(p: Priest): string {
  if (p.current) return `${p.from} – இன்று வரை`;
  if (p.to === p.from) return `${p.from}`;
  return `${p.from} – ${p.to}`;
}

/**
 * Should the `tamil` by-name still be printed under a Tamil heading?
 *
 * Only when it says something the heading does not. For a diocesan priest whose
 * Tamil name IS the heading (மரியதாஸ் under அருட்தந்தை மரியதாஸ்) it is noise;
 * for Buttari it is பரஞ்சோதிநாதர், which is the whole point of the column. So:
 * hide it when every word of it already appears in the Tamil heading.
 */
export function showTamilByName(p: Priest): boolean {
  if (!p.tamil) return false;
  if (!p.nameTa) return true;
  const head = p.nameTa;
  return !p.tamil.split(/\s+/).filter(Boolean).every((w) => head.includes(w));
}

/* ── Names the archives add ────────────────────────────────────────────────
   The parish list and the Jesuit records do not perfectly agree, and the honest
   thing is to publish the gap rather than silently merge it. These men are
   documented at Vadakkankulam by sources outside the parish, and appear on no
   line of its numbered succession.                                            */
export const ARCHIVE_ADDITIONS = [
  {
    name: "Fr John Maynard, S.J.",
    nameTa: `அருட்தந்தை ஜான் மேனார்ட், இ.ச.`,
    when: "about 1690",
    whenTa: `சுமார் 1690`,
    what:
      "A South Indian Mission (1937) names him as the missionary under whom the first group of converts here was made — “a most active pioneer”. A history of the Jesuits in Malabar independently places him working from Cottar, wearing Indian dress, at the same time as a newly arrived Fr Bernard de Saa worked the neighbouring station of Marungur. The earliest priest of this village on any record, seven years before de Saa opens the parish's own numbered list.",
    whatTa: `A South Indian Mission (1937) என்னும் நூல், இங்கே முதல் கூட்ட மனமாற்றம் நிகழ்ந்தது இவரது கீழேயே என்று இவரைப் பெயரிட்டுச் சொல்கிறது — “மிகவும் சுறுசுறுப்பான ஒரு முன்னோடி.” மலபாரில் இயேசு சபையினரைப் பற்றிய ஒரு வரலாறு, புதிதாக வந்திருந்த அருட்தந்தை பெர்னார்ட் தெ சா அருகிலிருந்த மருங்கூர் நிலையத்தில் பணியாற்றிக்கொண்டிருந்த அதே காலத்தில், இந்திய உடையணிந்து கோட்டாற்றிலிருந்து இவர் பணியாற்றியதாகத் தனித்துப் பதிவு செய்கிறது. எந்தப் பதிவிலும் அறியக்கிடைக்கும் இவ்வூரின் மிகப் பழைய அருட்தந்தை இவரே — பங்கின் சொந்த எண்ணிடப்பட்ட பட்டியலைத் தெ சா தொடங்குவதற்கு ஏழு ஆண்டுகள் முன்பு.`,
  },
  {
    name: "Fr Calini, S.J.",
    nameTa: `அருட்தந்தை காலினி, இ.ச.`,
    when: "1716",
    what:
      "Quoted in the 1917 Tinnevelly Gazetteer as “stationed at Vadakkankulam, which had two years previously become a residence” — which independently dates the founding of the Jesuit residence here to about 1714.",
    whatTa: `1917-ஆம் ஆண்டு திருநெல்வேலி அரசிதழில், “இரண்டு ஆண்டுகளுக்கு முன் ஓர் அருட்தந்தை நிலையாகத் தங்கும் இல்லமாக ஆகியிருந்த வடக்கன்குளத்தில் நிலைகொண்டிருந்தார்” என்று இவர் மேற்கோள் காட்டப்படுகிறார் — இது, இங்கே இயேசு சபையின் இல்லம் தொடங்கப்பட்ட ஆண்டைச் சுமார் 1714 என்று தனித்து உறுதிப்படுத்துகிறது.`,
  },
  {
    name: "Fr Massour, S.J.",
    nameTa: `அருட்தந்தை மசூர், இ.ச.`,
    when: "about 1775",
    whenTa: `சுமார் 1775`,
    what:
      "Bertrand's Lettres du Maduré names him third, after Buttari and Thomassini, “about the same time”. His dates are unrecorded; he belongs somewhere in the handover to the priests of Cochin.",
    whatTa: `பெர்த்ராண்டின் Lettres du Maduré, புத்தாரிக்கும் தோமஸினிக்கும் பின், “ஏறக்குறைய அதே காலத்தில்” என்று இவரை மூன்றாமவராகப் பெயரிடுகிறது. இவரது ஆண்டுகள் பதிவாகவில்லை; கொச்சி அருட்தந்தையரிடம் பொறுப்பு கைமாறிய அக்காலத்தில் எங்கோ இவர் இடம்பெறுகிறார்.`,
  },
  {
    name: "Br Joseph Bergenthal, S.J.",
    nameTa: `சகோதரர் ஜோசப் பெர்கந்தால், இ.ச.`,
    when: "1855 – 1872",
    what:
      "The lay brother who drew and built the present church. The Rome catalogue for 1872 lists him at this station with the title Ædif. eccl. — builder of the church — and the parish's own English history calls him four times its chief architect. A German Catholic magazine, writing in 1885, agreed from entirely outside the parish: the church, it said, “bears brilliant witness to the talent of our Br Bergenthal.” He appears on no website in any language.",
    whatTa: `இன்றைய ஆலயத்தை வரைந்து கட்டிய பொதுநிலைச் சகோதரர். 1872-ஆம் ஆண்டு உரோமைப் பதிவேடு, இந்நிலையத்தில் இவரை Ædif. eccl. — ஆலயம் கட்டியவர் — என்னும் பட்டத்தோடு பட்டியலிடுகிறது; பங்கின் சொந்த ஆங்கில வரலாறு இவரை நான்கு முறை அதன் தலைமைக் கட்டிடக் கலைஞர் என்று அழைக்கிறது. 1885-ஆம் ஆண்டில் ஒரு ஜெர்மன் கத்தோலிக்க இதழ், பங்கிற்கு முற்றிலும் வெளியிலிருந்து அதையே ஒப்புக்கொண்டது: அவ்வாலயம் “எங்கள் சகோதரர் பெர்கந்தாலின் திறமைக்கு ஒளிமிக்க சான்று பகர்கிறது” என்று அது எழுதியது. எந்த மொழியிலும் எந்த இணையதளத்திலும் இவரது பெயர் இல்லை.`,
  },
  {
    name: "Fr Marianus Michel, S.J.",
    nameTa: `அருட்தந்தை மரியானுஸ் மைக்கேல், இ.ச.`,
    when: "1872",
    what:
      "The Rome catalogue for 1872 lists him at this station alongside Fr Grégoire and Br Bergenthal, simply as “Mission.” — a second missionary, otherwise unrecorded, serving through the year the great church was finished.",
    whatTa: `1872-ஆம் ஆண்டு உரோமைப் பதிவேடு, அருட்தந்தை கிரகோயருக்கும் சகோதரர் பெர்கந்தாலுக்கும் அருகில், “Mission.” என்று மட்டுமே இவரை இந்நிலையத்தில் பட்டியலிடுகிறது — மாபெரும் ஆலயம் கட்டி முடிந்த அந்த ஆண்டு முழுவதும் பணியாற்றிய, வேறெங்கும் பதிவாகாத இரண்டாவது மறைப்பணியாளர்.`,
  },
  {
    name: "Fr Eugène Rossignol, S.J.",
    nameTa: `அருட்தந்தை ஊஜென் ரொசினியோல், இ.ச.`,
    when: "died here, 1863",
    whenTa: `இங்கே இறந்தார், 1863`,
    what:
      "Not a pastor of this parish but of the mission around it. He caught the cholera that killed him while caring for the Christians of Kallikulam, and died here on 25 January 1863, aged forty-one. He is buried behind the church.",
    whatTa: `இப்பங்கின் பங்குத் தந்தை அல்ல; இதைச் சுற்றியிருந்த பணிக்களத்தின் அருட்தந்தை. கள்ளிகுளத்துக் கிறிஸ்தவர்களைப் பணிவிடை செய்யும்போது காலரா நோய் இவரைப் பிடித்தது; அதுவே இவரைக் கொன்றது. நாற்பத்தொரு வயதில், 1863 ஜனவரி 25-ஆம் நாள் இங்கே இறந்தார். ஆலயத்திற்குப் பின்புறம் அடக்கம் செய்யப்பட்டுள்ளார்.`,
  },
] as const;

/* ── Bishops who acted here ───────────────────────────────────────────────── */
export type Bishop = {
  name: string;
  nameTa?: string;
  role: string;
  roleTa?: string;
  what: string;
  whatTa?: string;
  portrait?: string;
  portraitFrom?: string;
};

export const BISHOPS: Bishop[] = [
  {
    name: "Bishop Alexis Canoz, S.J.",
    nameTa: `ஆயர் அலெக்சிஸ் கனோஸ், இ.ச.`,
    role: "First Bishop of Madurai",
    roleTa: `மதுரையின் முதல் ஆயர்`,
    what:
      "Visited on his first pastoral tour of the south in 1848, blessed the foundation stone of the present church on 9 August 1855, and blessed the finished church in 1872.",
    whatTa: `1848-ஆம் ஆண்டில் தெற்கே தமது முதல் மேய்ப்புப் பயணத்தில் இங்கே வந்தார்; 1855-ஆம் ஆண்டு ஆகஸ்ட் 9-ஆம் நாள் இன்றைய ஆலயத்தின் அடிக்கல்லை ஆசீர்வதித்தார்; 1872-ஆம் ஆண்டில் கட்டி முடிந்த ஆலயத்தை ஆசீர்வதித்தார்.`,
    portrait: "canoz",
    portraitFrom: "Pérès, 1891",
  },
  {
    name: "Most Rev. Dr Francis Tiburtius Roche, S.J.",
    nameTa: `பேரருட்திரு முனைவர் பிரான்சிஸ் திபூர்சியுஸ் ரோச், இ.ச.`,
    role: "First Bishop of Tuticorin",
    roleTa: `தூத்துக்குடியின் முதல் ஆயர்`,
    what:
      "In 1926 he called Vadakkankulam “Little Rome” — Chinna Romapuri — and the name has stuck to the village for a century.",
    whatTa: `1926-ஆம் ஆண்டில் வடக்கன்குளத்தை “சின்ன ரோமாபுரி” என்று இவர் அழைத்தார்; ஒரு நூற்றாண்டாக அப்பெயர் இவ்வூரோடு ஒட்டிக்கொண்டிருக்கிறது.`,
  },
  {
    name: "Most Rev. Dr S. T. Amalanathar",
    nameTa: `பேரருட்திரு முனைவர் S. T. அமலநாதர்`,
    role: "Bishop of Thoothukudi",
    roleTa: `தூத்துக்குடி ஆயர்`,
    what: "Declared the Holy Family Church a Shrine on 6 August 1993.",
    whatTa: `1993 ஆகஸ்ட் 6-ஆம் நாள் திருக்குடும்ப ஆலயத்தைத் திருத்தலமாக அறிவித்தார்.`,
  },
  {
    name: "Bishop A. Stephen",
    nameTa: `ஆயர் A. ஸ்டீபன்`,
    role: "Bishop of Thoothukudi",
    roleTa: `தூத்துக்குடி ஆயர்`,
    what: "Consecrated the parish flagstaff on 6 August 2021, twenty-eight years to the day after the shrine decree.",
    whatTa: `திருத்தல ஆணை பிறப்பிக்கப்பட்ட நாளிலிருந்து சரியாக இருபத்தெட்டு ஆண்டுகள் கழித்து, 2021 ஆகஸ்ட் 6-ஆம் நாள் பங்கின் கொடிமரத்தை அர்ப்பணித்தார்.`,
  },
];

/* ── The graveyard row ─────────────────────────────────────────────────────
   Six dated stones stand behind the church, photographed in July 2026. Two of
   them were also read and printed in 1894, by a colonial survey of European
   tombs in Tinnevelly — so those two inscriptions can be quoted exactly, and
   are, because a verbatim stone is worth more than a paraphrase.              */
export type Tomb = {
  name: string;
  nameTa?: string;
  /** A death year, or a birth–death span where the stone gives both. */
  died: string;
  /** Only where the wording has been read from an independent printed source
   *  — which, for these six stones, means Forbes 1894 and no one else. */
  inscription?: string;
  note?: string;
  noteTa?: string;
  /** The stone is past reading. */
  worn?: boolean;
};

export const TOMBS: Tomb[] = [
  {
    name: "Fr Eugène Rossignol, S.J.",
    nameTa: `அருட்தந்தை ஊஜென் ரொசினியோல், இ.ச.`,
    died: "1863",
    /** Verbatim from Forbes, List of European Tombs in the District of
     *  Tinnevelly (Tinnevelly: Collectorate Press, 1894), p. 5. */
    inscription: "1863, 25th January. Eugene Rossignal S.J., Roman Catholic Missionary, aged 41 years.",
  },
  {
    name: "Fr Victor Delpech, S.J.",
    nameTa: `அருட்தந்தை விக்தோர் தெல்பெஷ், இ.ச.`,
    died: "1835 – 1887",
    inscription: "1887, 16th January. Victor Delpech S.J., aged 52 years.",
    note: "His own stone, cut in Latin, gives the same day and adds that his brethren raised this tomb — and the ones around it.",
    noteTa: `இலத்தீனில் செதுக்கப்பட்ட அவரது சொந்தக் கல்லும் அதே நாளையே தருகிறது; இக்கல்லறையையும் அதைச் சுற்றியுள்ளவற்றையும் எழுப்பியவர்கள் அவரது சபைச் சகோதரர்களே என்பதையும் சேர்த்துச் சொல்கிறது.`,
  },
  { name: "Fr Remigius Fernandez, S.J.", nameTa: `அருட்தந்தை ரெமீஜியுஸ் பெர்னாண்டஸ், இ.ச.`, died: "1899" },
  { name: "An unnamed priest", nameTa: `பெயர் அறியப்படாத ஓர் அருட்தந்தை`, died: "1874 – 1925", worn: true },
  { name: "Fr Dharmanathar", nameTa: `அருட்தந்தை தர்மநாதர்`, died: "1880 – 1950" },
  { name: "Fr J. M. Nicholas", nameTa: `அருட்தந்தை J. M. நிக்கோலாஸ்`, died: "1911 – 2002", note: "A son of this village.", noteTa: `இவ்வூரின் மைந்தர்.` },
];

/**
 * Tamil for the page and register chrome.
 *
 * The English of those two components stays inline in the JSX, byte for byte as
 * it was written — only the Tamil lives here, and the components choose between
 * them. That is deliberate: it means this file can never silently rewrite an
 * English sentence, and a reviewer can diff the Tamil on its own.
 */
export const CHROME_TA = {
  /* PageHero */
  heroLabel: `பங்குப் பதிவேடு`,
  heroTitle: `வடவையின் அருட்தந்தையர்`,
  heroIntro: `1697 முதல் அறுபத்தொன்பது பங்குப் பணிக்காலங்கள். அவற்றுள் அருட்தந்தை இல்லாத ஓராண்டும் இல்லை.`,
  heroAlt: `இருபதாம் நூற்றாண்டின் நடுவில் அச்சில் வெளிவந்த, வடக்கன்குளத்தின் இரட்டைக் கோபுரத் திருக்குடும்ப ஆலயத்தின் ஒரு புள்ளித்திரைப் புகைப்படம்.`,

  /* The page's two opening paragraphs */
  intro1: `1697 முதல் இப்பங்கு தன் அருட்தந்தையரை எண்ணிட்டு வந்திருக்கிறது; பட்டியல் இப்போது அறுபத்தொன்பது வரை செல்கிறது — அவற்றுள் சில, ஒரே மனிதரின் இரண்டாம், மூன்றாம் பதவிக்காலங்கள். ஒவ்வொருவரின் பெயரையும் அது காத்து வைத்திருக்கிறது. அவர்களுள் சுமார் பதினைந்து பேருக்கு, உரோமையிலுள்ள இயேசு சபை ஆவணக்காப்பகங்களும், பிரெஞ்சுப் பணிக்கள வரலாறுகளும், பங்கின் சொந்த நாட்குறிப்புகளும் ஒரு வாழ்க்கையைக் காத்து வைத்துள்ளன: அவர் எதைக் கட்டினார், எதை மறுத்தார், எவ்வாறு இறந்தார். மற்றவர்களுக்கோ, ஊருக்கு முக்கியமாயிருந்த இரண்டு செய்திகள் மட்டுமே எஞ்சியுள்ளன — அவரது பெயரும், அவர் தங்கியிருந்த ஆண்டுகளும்.`,
  intro2a: `கீழுள்ள பட்டியல் பங்கின் சொந்தப் பட்டியலே — 1 முதல் 69 வரை எண்ணிடப்பட்டு, அது தானே பயன்படுத்தும் ஐந்து காலப்பகுதிகளாகப் பிரிக்கப்பட்டுள்ளது. ஆதாரங்கள் ஒத்துப்போகாத இடங்களில் — முந்நூற்று இருபத்தெட்டு ஆண்டுகளில் அவை அடிக்கடி ஒத்துப்போவதில்லை: முதல் அருட்தந்தையின் பெயரைப் பற்றி, ஒரு பங்குத் தந்தை கடலில் இறந்த ஆண்டைப் பற்றி — ஒன்றைத் தேர்ந்தெடுக்காமல் இரு வாசிப்புகளுமே தரப்படுகின்றன.`,
  intro2b: `ஒவ்வொரு ஆண்டுத் தொகுதிக்கும் கீழுள்ள கோடு, அப்பங்குப் பணிக்காலத்தின் நீளம்:`,
  intro2c: `ஒரே ஆண்டுக்கு ஒரு சிறு கோடு; அருட்தந்தை தோமஸினியின் இருபத்து நான்கு ஆண்டுகளுக்கு முழுக் கோடு.`,

  /* Contents nav */
  contents: `பொருளடக்கம்`,
  jumpAria: `ஒரு காலப்பகுதிக்குச் செல்ல`,

  /* Register bands and sections */
  period: `காலப்பகுதி`,
  archivesTitle: `ஆவணக்காப்பகங்கள் சேர்க்கும் பெயர்கள்`,
  archivesIntro: `பங்கு தன் சொந்த அருட்தந்தையரை எண்ணி வைத்தது; உரோமையிலிருந்த இயேசு சபையினர் தங்கள் சொந்தப் பதிவேடுகளை வைத்திருந்தார்கள்; இரண்டும் முற்றிலும் ஒத்துப்போகவில்லை. பங்கிற்கு வெளியிலுள்ள ஆதாரங்களால் வடக்கன்குளத்தில் ஆவணப்படுத்தப்பட்ட ஆறு பேர், மேலுள்ள பட்டியலின் எந்த வரியிலும் இடம்பெறவில்லை. அவர்களை அமைதியாக நடுவில் நுழைத்துவிடாமல், இங்கே தனியே பதிவு செய்யப்படுகிறார்கள்.`,
  bishopsTitle: `இங்கே செயலாற்றிய ஆயர்கள்`,
  bishopsIntro: `நான்கு ஆயர்கள் இவ்வாலயத்தில் ஒவ்வொன்று செய்தார்கள்; அவற்றுக்குள்ளேயே பங்கு இன்றும் வாழ்கிறது — ஓர் அடிக்கல், ஒரு பெயர், ஓர் ஆணை, ஒரு கொடிமரம்.`,
  tombsTitle: `இவர்கள் இங்கே அடக்கம் செய்யப்பட்டுள்ளார்கள்`,
  tombsIntro: `ஆலயத்திற்குப் பின்புறம், ஆண்டு பொறிக்கப்பட்ட ஆறு கற்கள் ஒரே வரிசையில் நிற்கின்றன — மிகப் பழையது 1863, மிகப் புதியது 2002; ஒரே சுவரோரமாக இப்பங்கின் அருட்தந்தையரின் நூற்று நாற்பது ஆண்டுகள். அவற்றுள் இரு கல்வெட்டுகளைத் திருநெல்வேலியின் ஐரோப்பியக் கல்லறைகள் பற்றிய ஒரு காலனியக் கணக்கெடுப்பு 1894-ஆம் ஆண்டில் வாசித்து அச்சிட்டது; எனவே அவ்விரண்டையும் சொல்லுக்குச் சொல் மேற்கோள் காட்ட முடிகிறது.`,
  tombsCaption: `ஆலயத்திற்குப் பின்புறமுள்ள வரிசை, 2026 ஜூலை. இடமிருந்து வலமாக: அருட்தந்தை தர்மநாதர் (1880–1950), அருட்தந்தை ஊஜென் ரொசினியோல், இ.ச. (இறப்பு 1863), இவ்வூரின் மைந்தரான அருட்தந்தை J. M. நிக்கோலாஸ் (1911–2002).`,
  tombWorn: `அக்கல் படிக்க முடியாத அளவுக்குத் தேய்ந்துவிட்டது. இரு தேதிகளை மட்டுமே இன்னும் கண்டுகொள்ள முடிகிறது.`,

  /* What is still missing */
  missingTitle: `இன்னும் விடுபட்டிருப்பவை`,
  missingIntro: `இப்பதிவேடு இன்னும் முடிவடையவில்லை. ஓட்டைகள் எங்கே இருக்கின்றன என்று சொல்வதே, ஓட்டைகளே இல்லை என்று இப்பக்கம் தோற்றம் தருவதைவிட நல்லது.`,
  missingFacesLead: `இரு முகங்கள்.`,
  missingFaces: `பங்கின் சொந்த 150-ஆம் ஆண்டு நினைவு மலர், அருட்தந்தை ஜோப் தெ ரோஸ், அருட்தந்தை இருதயராஜ் ஆகியோரின் புகைப்பட வட்டங்களை வெறுமையாகவே அச்சிட்டது. மறைமாவட்டத்தின் இணையதளத்திலும் அவை இல்லை; ஆயினும், நினைவு மலரிலேயே விடுபட்டுப்போன சில அண்மைக்கால அருட்தந்தையரின் படங்கள் — இங்கே பயன்படுத்தப்பட்டவை — அதனிடம் உள்ளன. இவ்விரு ஆதாரங்களைவிடச் சிறந்த படங்கள் பங்கிடம் இன்னும் இருக்கும் என்பது கிட்டத்தட்ட உறுதி.`,
  missingAssistantsLead: `சுமார் நூறு உதவி அருட்தந்தையர்.`,
  missingAssistants: `1870 முதல் இங்கே அனுப்பப்பட்ட ஒவ்வொரு உதவி அருட்தந்தையின் பட்டியலும் — பெரும்பாலும் அவர்களுடைய முதல் நியமனம் இதுவே — பங்கிடம் உள்ளது. அதன் ஒரே நகல், மங்கலாக அச்சான ஒரு நினைவு மலர்ப் பக்கம்; உண்மையான ஒரு மனிதரின் பெயரை அதிலிருந்து வெளியிடுமளவு உறுதியாக அதை வாசிக்க முடியவில்லை. இப்பெயர்களை அறிந்த ஒருவர், படியெடுக்கப்பட்ட அப்பக்கத்தை வைத்து அவற்றை உரக்க வாசிக்க வேண்டும்.`,
  missingVocationsLead: `இவ்வூர் தந்த அருட்தந்தையரும் அருட்சகோதரிகளும்.`,
  missingVocations: `பதினைந்து அருட்தந்தையர், பதினெட்டு அருட்சகோதரிகள் — அவர்களுள் தூத்துக்குடி மறைமாவட்டத்தின் முதல் பொதுவிகாரியும் ஒருவர்; அவர் வடக்கன்குளத்தின் மைந்தர். அதே சிக்கல், அதே தீர்வு.`,
  missingAskA: `ஒரு புகைப்படத்தைத் தர முடிந்தால், ஒரு பெயரையோ தேதியையோ திருத்த முடிந்தால், அல்லது அப்பக்கங்களுள் ஒன்றை வாசிக்க முடிந்தால்,`,
  missingAskLink: `பங்கிற்கு எழுதுங்கள்`,
  missingAskB: `. திருத்தங்கள் வரவேற்கப்படுகின்றன; அவை பெயரிட்டுப் பதிவு செய்யப்படும்.`,

  /* The closing line */
  closing: (terms: number, periods: number) =>
    `${terms} பங்குப் பணிக்காலங்கள், ${periods} காலப்பகுதிகள், முந்நூற்று இருபத்தெட்டு ஆண்டுகள் — வரிசையில் ஓர் இடைவெளியும் இல்லை.`,
} as const;
