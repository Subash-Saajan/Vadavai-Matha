/**
 * /gallery — the plates.
 *
 * WHAT IS IN HERE AND WHAT IS DELIBERATELY NOT.
 *
 * This file is the site's one list of its own PHOTOGRAPHS: the building, its
 * inside, the statue, the feast, the other churches of the village, the graves,
 * and the two archival plates. Every entry points at a file that already lives
 * in `public/images`, so the gallery costs the repository nothing new — it is
 * the first page that shows them all in one place, and until now most of them
 * appeared on exactly one page each, at thumbnail size, behind a scroll effect.
 *
 * FOUR KINDS OF PICTURE ARE HELD OUT, and each for its own reason:
 *
 *   · THE HISTORY ILLUSTRATIONS (`public/images/history/*`). Fifty-eight of
 *     them, and not one is a photograph — they are paintings made for the
 *     narrative on /history, several of them reused across neighbouring
 *     passages. Mixed in among real photographs of a real church, with the same
 *     frame and the same caption style, they would read as evidence. They are
 *     illustration, and they stay where the prose that explains them is.
 *   · THE CUT-OUTS (`matha.png`, `church-night.png`). Transparent PNGs made as
 *     design assets, not pictures of anything.
 *   · THE BACKDROPS (`sky-bg.jpg`). A sky. It is a texture.
 *   · THE PARISH'S HANDWRITTEN NOTE (`architecture/creed-note.jpg`). Pulled at
 *     the owner's request, August 2026. It is a document rather than a
 *     photograph — a page of working notes, not something the parish has
 *     published — and a gallery is the wrong place to put one on display.
 *     `creedNoteCaption` in lib/i18n.ts still carries its words in both
 *     languages if it is ever wanted back.
 *   · THE PRIEST PORTRAITS (`public/images/priests/*`). Roundels of 120–520px,
 *     cut from a souvenir book; they are a register's furniture and they are
 *     already on /priests, where the man each belongs to is named. Enlarging
 *     them here would only show the halftone. `tombs.jpg` is the exception —
 *     that one is a photograph of a place a visitor can stand in.
 *
 * NEAR-DUPLICATES ARE ALSO OUT. `vault-chandelier.jpg` is the same vault, the
 * same window and the same chandelier as `architecture/vault.jpg` from a step
 * to one side; `architecture/archival.jpg` is byte-for-byte `bw-old-pic.jpg`;
 * `velankannichurch-1.jpg` is a building nothing in the repo identifies. A
 * gallery that prints the same picture twice is read as carelessness, and the
 * one place that must not happen is the page whose whole subject is the
 * pictures.
 *
 * ── THE RULE THIS FILE INHERITS ────────────────────────────────────────────
 * Same rule as lib/seo.ts and lib/contact.ts: NO INVENTED FACTS. A caption may
 * say what is in the frame and what the parish or the Knowledge Base already
 * says about it. It may not date a photograph nobody has dated, name a person
 * nobody has named, or attribute a picture to a photographer we cannot cite.
 * Where a date IS known it goes in `year`; where a picture is somebody else's
 * it goes in `credit`. Both print, and neither is guessed.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * TAMIL. Captions carry `…Ta` siblings and fall back to English when one is
 * missing, exactly as lib/priests.ts does. The captions lifted from
 * lib/i18n.ts — the four windows, the towers, the bell, the vault, the altar,
 * the parish note — are the tamil-localize skill's own verified strings and are
 * reproduced here verbatim rather than re-translated. The rest were written for
 * this page against .claude/skills/tamil-localize/reference/glossary.md and
 * SHOULD BE RUN THROUGH THAT SKILL before they are treated as final.
 *
 * ⚠ TWO PHOTOGRAPHS CARRY A PHOTOGRAPHER'S WATERMARK in the top-right corner
 * (`architecture/towers.jpg`, `fest-drone.jpg`). They are already published on
 * /architecture and /mass-timings with it. It is small at thumbnail size and
 * unmissable in the lightbox, so either the parish clears the credit and it is
 * named in `credit`, or the files are recropped — see the note in
 * project_history_page_images: crop deeper, never inpaint.
 */

export type ChapterKey =
  | "church"
  | "inside"
  | "lady"
  | "village"
  | "saints"
  | "archive";

export type Chapter = {
  key: ChapterKey;
  numeral: string;
  title: string;
  titleTa: string;
  /** One line under the chapter heading. Sets up what follows; never a caption. */
  blurb: string;
  blurbTa: string;
};

export const CHAPTERS: readonly Chapter[] = [
  {
    key: "church",
    numeral: "I",
    title: "The Church",
    titleTa: `ஆலயம்`,
    blurb:
      "Twin octagonal towers, ninety-two feet of them, and the silhouette that in 1926 earned a Tamil village the name Little Rome.",
    blurbTa: `அடி முதல் சிகரம் வரை எண்கோண வடிவில் உயரும் இரட்டைக் கோபுரங்கள் — 1926-இல் இவ்வூருக்குச் சின்ன ரோமாபுரி எனும் பெயரைத் தந்த தோற்றம்.`,
  },
  {
    key: "inside",
    numeral: "II",
    title: "Inside",
    titleTa: `உள்ளே`,
    blurb:
      "Two naves running in to one altar, twenty-four arches turned in lime with no iron in them, and glass a hundred years late.",
    blurbTa: `ஒரே பலிபீடத்தை நோக்கி நெருங்கும் இரு நடைகள், இரும்பின்றிச் சுண்ணாம்பில் எழுப்பப்பட்ட இருபத்து நான்கு வளைவுகள், நூறு ஆண்டுகள் தாமதமாய் வந்த வண்ணக் கண்ணாடி.`,
  },
  {
    key: "lady",
    numeral: "III",
    title: "Our Lady, and the Feast",
    titleTa: `மாதாவும் திருவிழாவும்`,
    blurb:
      "The statue this village has kept since before the church was built, and the ten days in August it is carried out to.",
    blurbTa: `ஆலயம் எழுவதற்கு முன்பே இவ்வூர் காத்துவரும் மாதாவின் திருவுருவம், அவரை வெளியே எழுந்தருளச் செய்யும் ஆகஸ்ட் மாதப் பத்து நாட்கள்.`,
  },
  {
    key: "village",
    numeral: "IV",
    title: "The Village of Churches",
    titleTa: `ஆலயங்களின் ஊர்`,
    blurb:
      "Little Rome is not one building. Eight more feasts are kept in the year, and each is kept at a church of its own.",
    blurbTa: `சின்ன ரோமாபுரி ஒரே கட்டிடம் அல்ல. ஆண்டில் மேலும் எட்டுத் திருவிழாக்கள், ஒவ்வொன்றும் தனித்தனி ஆலயத்தில்.`,
  },
  {
    key: "saints",
    numeral: "V",
    title: "The Saints and the Graves",
    titleTa: `புனிதர்களும் கல்லறைகளும்`,
    blurb:
      "The founder, the layman baptised here in 1745, his wife, and the six priests buried behind the church.",
    blurbTa: `இப்பங்கை நிறுவியவர், 1745-இல் இங்கே திருமுழுக்குப் பெற்ற பொதுநிலையினர், அவரது மனைவி, ஆலயத்தின் பின்னால் அடக்கம் செய்யப்பட்ட ஆறு அருட்தந்தையர்.`,
  },
  {
    key: "archive",
    numeral: "VI",
    title: "From the Archive",
    titleTa: `ஆவணக் காப்பகத்திலிருந்து`,
    blurb:
      "The two photographs of this church that are older than anyone now living — one of them printed in Paris in 1901.",
    blurbTa: `இன்று வாழ்பவர் எவரையும் விடப் பழமையான, இவ்வாலயத்தின் இரு புகைப்படங்கள் — அவற்றுள் ஒன்று 1901-இல் பாரிஸில் அச்சானது.`,
  },
];

export type Plate = {
  src: string;
  /** Intrinsic pixels. Sets the box's aspect-ratio, so nothing reflows on load. */
  w: number;
  h: number;
  chapter: ChapterKey;
  /** What is in the frame. Read aloud by assistive tech; indexed by Google Images. */
  alt: string;
  altTa?: string;
  /** The line printed under the plate. Short — it is a caption, not a paragraph. */
  caption: string;
  captionTa?: string;
  /** A hairline chip on the plate. Only ever a date somebody has actually given. */
  year?: string;
  /** Whose picture this is, where that is not the parish. Printed in the lightbox. */
  credit?: string;
  creditTa?: string;
};

export const PLATES: readonly Plate[] = [
  /* ── I · THE CHURCH ──────────────────────────────────────────────────── */
  {
    src: "/images/architecture/facade.jpg",
    w: 1200,
    h: 800,
    chapter: "church",
    alt: "The white Gothic façade of the Holy Family Church, Vadakkankulam, with its twin octagonal towers and pinnacled roofline against a clear sky",
    altTa: `தெளிந்த வானின் பின்னணியில், வடக்கன்குளம் திருக்குடும்ப ஆலயத்தின் வெண்ணிறக் கோத்திக் முகப்பு, இரட்டை எண்கோணக் கோபுரங்களும் சிகரங்கள் நிறைந்த கூரையோரமும்`,
    caption: "The west front",
    captionTa: `மேற்கு முகப்பு`,
  },
  {
    src: "/images/facade-day.jpg",
    w: 2400,
    h: 1600,
    chapter: "church",
    alt: "The west façade of Holy Family Church, Vadakkankulam, seen square-on in daylight — five doors, a Tamil inscription across the gable, and the twin spires above",
    altTa: `பகல் வெளிச்சத்தில் நேரெதிரே காணப்படும் வடக்கன்குளம் திருக்குடும்ப ஆலயத்தின் மேற்கு முகப்பு — ஐந்து வாசல்கள், முகப்பின் மேல் தமிழ் வாசகம், மேலே இரட்டைக் கோபுரங்கள்`,
    caption: "The church as it stands today",
    captionTa: `இன்று நிற்கும் ஆலயம்`,
  },
  {
    src: "/images/architecture/towers.jpg",
    w: 1040,
    h: 694,
    chapter: "church",
    alt: "The twin octagonal towers and the ring of pinnacles along the roofline, with the sun going down directly behind the spires",
    altTa: `இரட்டை எண்கோணக் கோபுரங்களும் கூரையோரம் சூழும் சிகரங்களின் வளையமும், கோபுரங்களுக்குப் பின்னால் நேராக மறையும் கதிரவனும்`,
    caption: "The twin towers and the pinnacled roofline",
    captionTa: `இரட்டைக் கோபுரங்களும், சிகரங்கள் சூழ்ந்த கூரையும்`,
  },
  {
    src: "/images/fest-drone.jpg",
    w: 1040,
    h: 694,
    chapter: "church",
    alt: "The spires of the shrine against a clouded evening sky, the hills of the Western Ghats low on the horizon behind",
    altTa: `மேகம் சூழ்ந்த மாலை வானில் திருத்தலத்தின் கோபுரங்கள், பின்னால் தொடுவானில் மேற்குத் தொடர்ச்சி மலைகள்`,
    caption: "Evening over the shrine",
    captionTa: `திருத்தலத்தின் மேல் மாலைப் பொழுது`,
  },
  {
    src: "/images/fest-drone-2.jpg",
    w: 1040,
    h: 694,
    chapter: "church",
    alt: "The whole west front of the shrine at dusk, dressed with a feast banner across the lower gable",
    altTa: `அந்தி வேளையில் திருத்தலத்தின் முழு மேற்கு முகப்பு, கீழ் முகப்பில் திருவிழாக் கொடித் துணி கட்டப்பட்டிருக்கிறது`,
    caption: "The front, dressed for the feast",
    captionTa: `திருவிழாவுக்கு அலங்கரிக்கப்பட்ட முகப்பு`,
  },
  {
    src: "/images/holy-family-tympanum.jpg",
    w: 900,
    h: 1600,
    chapter: "church",
    alt: "The Holy Family sculpture group set in the banded pointed arch above the main entrance of the church, a dove in a golden halo above them",
    altTa: `ஆலயத்தின் பிரதான வாசலுக்கு மேல், வண்ணப் பட்டைகள் கொண்ட கூர்வளைவினுள் அமைந்த திருக்குடும்பச் சிற்பக் குழு; அவர்களுக்கு மேல் பொன் ஒளிவட்டத்தில் ஒரு புறா`,
    caption: "The Holy Family, over the entrance",
    captionTa: `வாசலுக்கு மேல், திருக்குடும்பம்`,
  },
  {
    src: "/images/architecture/relief.jpg",
    w: 1400,
    h: 2103,
    chapter: "church",
    alt: "The Two Trinities relief over the central door — the Holy Family in polychrome, a dove in a golden halo above them, and above that an eye set in a triangle",
    altTa: `நடு வாசலுக்கு மேலுள்ள “இரு திரித்துவங்கள்” சிற்பம் — வண்ணமிட்ட திருக்குடும்பம், மேலே பொன் ஒளிவட்டத்தில் புறா, அதற்கும் மேலே முக்கோணத்துள் ஒரு கண்`,
    caption: "The Two Trinities relief over the central door",
    captionTa: `நடு வாசலுக்கு மேலுள்ள “இரு திரித்துவங்கள்” சிற்பம்`,
  },
  {
    // The one dated thing on the fabric that a visitor can read for himself.
    // The year is painted on the arch; it is not our inference.
    src: "/images/heritage-door-1839.jpg",
    w: 1600,
    h: 1067,
    chapter: "church",
    alt: "A heritage doorway of the parish under a colonnaded porch, its blue double doors flanked by coloured glass and the year 1839 painted on the arch above",
    altTa: `தூண்கள் கொண்ட முகப்பின் கீழ் பங்கின் பழமையான வாசல் ஒன்று; நீல நிற இரட்டைக் கதவுகளுக்கு இருபுறமும் வண்ணக் கண்ணாடி, மேலுள்ள வளைவில் 1839 எனும் ஆண்டு`,
    caption: "A doorway of the parish, dated on its arch",
    captionTa: `வளைவில் ஆண்டு பொறிக்கப்பட்ட பங்கின் வாசல்`,
    year: "1839",
  },

  /* ── II · INSIDE ─────────────────────────────────────────────────────── */
  {
    src: "/images/architecture/nave.jpg",
    w: 2560,
    h: 1920,
    chapter: "inside",
    alt: "The interior of the church looking back down the nave to the west door, the painted rib vault overhead and a figure standing in the light of the open doorway",
    altTa: `நடை வழியே மேற்கு வாசலை நோக்கிக் காணப்படும் ஆலயத்தின் உட்புறம்; மேலே வண்ணம் தீட்டிய கூரை வளைவு, திறந்த வாசலின் ஒளியில் நிற்கும் ஒரு உருவம்`,
    caption: "Down the nave, to the west door",
    captionTa: `நடை வழியே, மேற்கு வாசலை நோக்கி`,
  },
  {
    src: "/images/architecture/altar.jpg",
    w: 2560,
    h: 1696,
    chapter: "inside",
    alt: "The high altar of the shrine, its carved screen rising in gilded tiers to a dome, the crucified Christ at the centre with Our Lady and St Joseph beside him, and the sanctuary banked with flowers",
    altTa: `திருத்தலத்தின் பெரும் பலிபீடம்; செதுக்கப்பட்ட மறைத்திரை பொன் முலாம் பூசிய அடுக்குகளாய் ஒரு குவிமாடம் வரை உயர்கிறது, நடுவே சிலுவையில் அறையப்பட்ட கிறிஸ்து, இருபுறமும் அன்னையும் புனித சூசையப்பரும், பீடப்பகுதி முழுவதும் மலர்கள்`,
    caption: "The high altar, gilded and unfaded",
    captionTa: `பொன் முலாம் மங்காத பெரும் பலிபீடம்`,
  },
  {
    src: "/images/architecture/altar-reredos.jpg",
    w: 1712,
    h: 2080,
    chapter: "inside",
    alt: "The high altar: a five-bay carved screen rising to gilded spires under the painted vault, the crucifix on its centre axis, and twelve small statues in a gold arcade either side of the tabernacle",
    altTa: `பெரும் பலிபீடம்: வண்ணம் தீட்டிய கூரை வளைவின் கீழ் பொன் சிகரங்கள் வரை உயரும் ஐந்து பிரிவுச் செதுக்குத் திரை, நடுக்கோட்டில் சிலுவை, சந்நிதிப் பேழையின் இருபுறமும் பொன் வளைவுத் தொடரில் பன்னிரண்டு சிறு உருவங்கள்`,
    caption: "The carved screen above the tabernacle",
    captionTa: `சந்நிதிப் பேழைக்கு மேலுள்ள செதுக்குத் திரை`,
  },
  {
    src: "/images/architecture/vault.jpg",
    w: 1800,
    h: 2400,
    chapter: "inside",
    alt: "The painted rib vault over the nave, its bands of green, blue and rose meeting at a chandelier, with a coloured-glass window in the wall beneath",
    altTa: `நடைக்கு மேலுள்ள வண்ணம் தீட்டிய கூரை வளைவு; பச்சை, நீலம், ரோஜா நிறப் பட்டைகள் ஒரு சரவிளக்கில் சந்திக்கின்றன, கீழே சுவரில் வண்ணக் கண்ணாடிச் சாளரம்`,
    caption: "The nave vault, its arches turned without iron, beam or centring",
    captionTa: `நடைக்கு மேலுள்ள கூரை வளைவு, இரும்போ, உத்திரமோ, சட்டமோ இன்றி எழுப்பப்பட்டது`,
  },
  {
    src: "/images/architecture/glass-1.jpg",
    w: 1500,
    h: 2000,
    chapter: "inside",
    alt: "A tall four-light tracery window in a stencilled wall, its lancets filled with red, blue, green and yellow diamond panes",
    altTa: `வேலைப்பாடுகள் தீட்டிய சுவரில் அமைந்த உயரமான நான்கு பிரிவுச் சாளரம்; அதன் நீள் பிரிவுகளில் சிவப்பு, நீலம், பச்சை, மஞ்சள் நிற வைர வடிவக் கண்ணாடிகள்`,
    caption: "A four-light tracery window, its glass filled at the 1972 centenary",
    captionTa: `1972 நூற்றாண்டு விழாவில் வண்ணக் கண்ணாடி நிரப்பப்பட்ட நான்கு பிரிவுச் சாளரம்`,
    year: "1972",
  },
  {
    src: "/images/architecture/glass-2.jpg",
    w: 1500,
    h: 2000,
    chapter: "inside",
    alt: "A rose window of coloured glass set high in the painted vault, its petals radiating from a clear centre",
    altTa: `வண்ணம் தீட்டிய கூரை வளைவில் உயரே பதிக்கப்பட்ட வண்ணக் கண்ணாடி ரோஜா சாளரம், அதன் இதழ்கள் தெளிந்த மையத்திலிருந்து விரிகின்றன`,
    caption: "The rose window set in the painted vault",
    captionTa: `வண்ணம் தீட்டிய கூரை வளைவில் அமர்ந்திருக்கும் ரோஜா சாளரம்`,
  },
  {
    src: "/images/architecture/glass-3.jpg",
    w: 1500,
    h: 2000,
    chapter: "inside",
    alt: "The heads of three lancet windows, diamond panes below and trefoil rosettes of coloured glass above them",
    altTa: `மூன்று நீள் சாளரங்களின் தலைப்பகுதி; கீழே வைர வடிவக் கண்ணாடிகள், மேலே வண்ணக் கண்ணாடியில் மும்மடல் ரோஜா வடிவங்கள்`,
    caption: "Diamond panes and trefoil rosettes in the lancet heads",
    captionTa: `நீள் சாளரங்களின் தலைப்பகுதியில் வைர வடிவக் கண்ணாடிகளும் மும்மடல் ரோஜா வடிவங்களும்`,
  },
  {
    src: "/images/architecture/glass-4.jpg",
    w: 1500,
    h: 2000,
    chapter: "inside",
    alt: "Coloured glass glowing in a pointed window, the wall around it stencilled in patterns made with plant dye",
    altTa: `கூர்வளைவுச் சாளரத்தில் ஒளிரும் வண்ணக் கண்ணாடி; அதைச் சுற்றியுள்ள சுவரில் இயற்கைச் சாயத்தால் தீட்டப்பட்ட வேலைப்பாடுகள்`,
    caption: "Coloured glass in a wall stencilled in plant dye",
    captionTa: `இயற்கைச் சாயம் தீட்டிய சுவரில் அமைந்த வண்ணக் கண்ணாடி`,
  },
  {
    src: "/images/tracery-window.jpg",
    w: 1200,
    h: 1600,
    chapter: "inside",
    alt: "Coloured glass diamonds glowing in the plaster tracery of a nave window, seen from inside against the light",
    altTa: `நடையின் சாளர வேலைப்பாட்டில் ஒளிரும் வைர வடிவ வண்ணக் கண்ணாடிகள், உள்ளிருந்து ஒளிக்கு எதிராகக் காணப்படுகின்றன`,
    caption: "Light through the tracery",
    captionTa: `சாளர வேலைப்பாட்டின் வழியே ஒளி`,
  },
  {
    src: "/images/architecture/bell.jpg",
    w: 1100,
    h: 1650,
    chapter: "inside",
    alt: "A bronze bell hanging in its frame high in the tower, cast with the words “Vve Grégoire de Valence (Drôme)” and “Donateur Casimir Grégoire”",
    altTa: `கோபுரத்தில் உயரே தன் சட்டத்தில் தொங்கும் வெண்கல மணி; அதில் “Vve Grégoire de Valence (Drôme)”, “Donateur Casimir Grégoire” எனும் சொற்கள் வார்க்கப்பட்டுள்ளன`,
    caption:
      "The bell in its tower, cast “Vve Grégoire de Valence (Drôme)” and “Donateur Casimir Grégoire”",
    captionTa: `கோபுரத்தில் தொங்கும் மணி, “Vve Grégoire de Valence (Drôme)” மற்றும் “Donateur Casimir Grégoire” என வார்க்கப்பட்டது`,
    year: "1861",
  },
  {
    src: "/images/sanctuary-angel.jpg",
    w: 1699,
    h: 672,
    chapter: "inside",
    alt: "A carved angel in a rose-coloured robe kneels with hands joined in prayer beside the pulpit of the shrine, the flower-dressed high altar and its saints out of focus behind",
    altTa: `ரோஜா நிற ஆடையணிந்த ஒரு சிற்ப தூதன் திருத்தலத்தின் மறையுரை மேடைக்கு அருகில் கைகூப்பி மண்டியிட்டிருக்கிறது; பின்னால் மலர்களால் அலங்கரிக்கப்பட்ட பெரும் பலிபீடமும் புனிதர்களும் மங்கலாகத் தெரிகின்றன`,
    caption: "An angel at the pulpit",
    captionTa: `மறையுரை மேடையருகே ஒரு தூதன்`,
  },

  /* ── III · OUR LADY, AND THE FEAST ───────────────────────────────────── */
  {
    src: "/images/home_1.jpg",
    w: 2560,
    h: 2768,
    chapter: "lady",
    alt: "The crowned statue of Our Lady of the Assumption at Vadakkankulam, robed in teal and gold, hung with gold chains and standing under an arch of flowers",
    altTa: `வடக்கன்குளம் விண்ணேற்பு மாதாவின் முடிசூட்டப்பட்ட திருவுருவம்; பச்சை–பொன் நிற ஆடையணிந்து, பொன் சங்கிலிகள் அணிந்து, மலர் வளைவின் கீழ் எழுந்தருளியுள்ளார்`,
    caption: "Vadavai Matha, dressed for her feast",
    captionTa: `திருவிழாவுக்கு அலங்கரிக்கப்பட்ட வடவை மாதா`,
  },
  {
    src: "/images/matha-midnight.jpg",
    w: 900,
    h: 1600,
    chapter: "lady",
    alt: "The crowned statue of Vadavai Matha at night, covered from throat to waist in the gold chains and ornaments left as offerings",
    altTa: `இரவில் வடவை மாதாவின் முடிசூட்டப்பட்ட திருவுருவம்; கழுத்திலிருந்து இடை வரை காணிக்கையாகச் சூட்டப்பட்ட பொன் சங்கிலிகளும் அணிகலன்களும் நிறைந்திருக்கின்றன`,
    caption: "The gold left at her feet, worn",
    captionTa: `அவரடியில் காணிக்கையாய் வைக்கப்பட்ட பொன், அவரே அணிந்திருக்கிறார்`,
  },
  {
    src: "/images/fest-noon.jpg",
    w: 2560,
    h: 1440,
    chapter: "lady",
    alt: "The crowned statue of Our Lady on her flower-decked processional chariot at the August feast, attendant figures either side and the church spires rising behind",
    altTa: `ஆகஸ்ட் திருவிழாவில் மலர்களால் அலங்கரிக்கப்பட்ட தேரில் மாதாவின் முடிசூட்டப்பட்ட திருவுருவம்; இருபுறமும் துணை உருவங்கள், பின்னால் ஆலயக் கோபுரங்கள்`,
    caption: "The chariot, on the fifteenth of August",
    captionTa: `ஆகஸ்ட் பதினைந்தில், தேர்`,
  },
  {
    src: "/images/fest-procession-monstrance.jpg",
    w: 1600,
    h: 2133,
    chapter: "lady",
    alt: "The monstrance carried under an embroidered canopy hung with lights and marigold garlands in the procession of the annual feast",
    altTa: `ஆண்டுத் திருவிழா ஊர்வலத்தில், விளக்குகளும் சாமந்தி மாலைகளும் தொங்கும் பட்டுக் குடையின் கீழ் எழுந்தருளும் நற்கருணைப் பேழை`,
    caption: "The Blessed Sacrament, carried out",
    captionTa: `ஊர்வலத்தில் எழுந்தருளும் நற்கருணை`,
  },

  /* ── IV · THE VILLAGE OF CHURCHES ────────────────────────────────────── */
  {
    src: "/images/vadavai-st-sebasthiyarchurch.jpg",
    w: 2560,
    h: 1526,
    chapter: "village",
    alt: "The church of St Sebastian at Vadakkankulam — a small teal-and-white chapel with a painted panel above its porch",
    altTa: `வடக்கன்குளம் புனித செபஸ்தியார் ஆலயம் — முகப்புக்கு மேல் வண்ணச் சித்திரப் பலகை கொண்ட சிறிய பச்சை–வெள்ளைச் சிற்றாலயம்`,
    caption: "St Sebastian — kept 11 to 20 January",
    captionTa: `புனித செபஸ்தியார் — ஜனவரி 11 முதல் 20 வரை`,
  },
  {
    src: "/images/kannikai-matha-church.jpg",
    w: 1600,
    h: 1200,
    chapter: "village",
    alt: "The chapel of Kannikai Matha — Our Lady of the Presentation — an open-sided shelter with a pitched roof standing in an open field",
    altTa: `காணிக்கை மாதா சிற்றாலயம் — திறந்தவெளியில், சாய்வுக் கூரையுடன் பக்கங்கள் திறந்த ஒரு மண்டபம்`,
    caption: "Kannikai Matha — kept 31 January to 2 February",
    captionTa: `காணிக்கை மாதா — ஜனவரி 31 முதல் பிப்ரவரி 2 வரை`,
  },
  {
    src: "/images/de-britto-grotto.jpg",
    w: 941,
    h: 1672,
    chapter: "village",
    alt: "The shrine of St John de Britto — Arulanandar — a carved wooden housing on a plinth against a blue wall, holding a painting of the martyr",
    altTa: `புனித அருளானந்தரின் சன்னிதி — நீலச் சுவரை ஒட்டி, மேடையின் மேல் செதுக்கிய மரக் கூடு; உள்ளே இரத்தசாட்சியின் திருவுருவப் படம்`,
    caption: "St John de Britto — kept 3 and 4 February",
    captionTa: `புனித அருளானந்தர் — பிப்ரவரி 3, 4`,
  },
  {
    src: "/images/our-lady-of-lourdes.jpg",
    w: 2560,
    h: 1456,
    chapter: "village",
    alt: "The Lourdes grotto of the parish — a pale blue rock grotto built up in front of a long ochre building, with steps climbing to the niche",
    altTa: `பங்கின் லூர்து குகை — நீண்ட மஞ்சள் நிறக் கட்டிடத்தின் முன் எழுப்பப்பட்ட வெளிர் நீலப் பாறைக் குகை, மேலுள்ள மாடத்திற்குப் படிகள் ஏறுகின்றன`,
    caption: "Our Lady of Lourdes — kept 5 to 11 February",
    captionTa: `லூர்து மாதா — பிப்ரவரி 5 முதல் 11 வரை`,
  },
  {
    src: "/images/st-anthonys-church.jpg",
    w: 2560,
    h: 3840,
    chapter: "village",
    alt: "St Anthony's church at Vadakkankulam — a pink-and-white front with two slender towers, a floodlight mast standing beside it",
    altTa: `வடக்கன்குளம் புனித அந்தோணியார் ஆலயம் — இரு மெல்லிய கோபுரங்களுடன் இளஞ்சிவப்பு–வெள்ளை முகப்பு, அருகில் ஒரு விளக்குக் கம்பம்`,
    caption: "St Anthony — kept 1 to 13 June",
    captionTa: `புனித அந்தோணியார் — ஜூன் 1 முதல் 13 வரை`,
  },
  {
    src: "/images/vadava-st-george-church.jpg",
    w: 600,
    h: 450,
    chapter: "village",
    alt: "The church of St George at Vadakkankulam — a small white chapel behind an iron railing, a painted image of the saint set above its door",
    altTa: `வடக்கன்குளம் புனித ஜார்ஜ் ஆலயம் — இரும்பு வேலிக்குப் பின்னால் சிறிய வெள்ளைச் சிற்றாலயம், வாசலுக்கு மேல் புனிதரின் வண்ணப் படம்`,
    caption: "St George — kept 18 to 27 June",
    captionTa: `புனித ஜார்ஜ் — ஜூன் 18 முதல் 27 வரை`,
  },
  {
    src: "/images/vellankannni.jpg",
    w: 2560,
    h: 1707,
    chapter: "village",
    alt: "The Velankanni church of the parish — a white front stepped up to three crosses, with a broad flight of steps at the door",
    altTa: `பங்கின் வேளாங்கண்ணி மாதா ஆலயம் — மூன்று சிலுவைகள் வரை படிப்படியாக உயரும் வெள்ளை முகப்பு, வாசலில் அகன்ற படிக்கட்டு`,
    caption: "Our Lady of Velankanni — kept 30 August to 8 September",
    captionTa: `வேளாங்கண்ணி மாதா — ஆகஸ்ட் 30 முதல் செப்டம்பர் 8 வரை`,
  },
  {
    src: "/images/vadavai-st-michel-church.jpg",
    w: 2116,
    h: 2340,
    chapter: "village",
    alt: "The church of St Michael the Archangel at Michaelpalayam, a Tamil banner strung across its white front",
    altTa: `மிக்கேல்பாளையத்தில் புனித மிக்கேல் அதிதூதர் ஆலயம்; வெள்ளை முகப்பின் குறுக்கே தமிழ்க் கொடித் துணி கட்டப்பட்டுள்ளது`,
    caption: "St Michael, at Michaelpalayam — kept 20 to 29 September",
    captionTa: `மிக்கேல்பாளையம், புனித மிக்கேல் — செப்டம்பர் 20 முதல் 29 வரை`,
  },

  /* ── V · THE SAINTS AND THE GRAVES ───────────────────────────────────── */
  {
    // A devotional painting, and the caption says so. The site does not own a
    // contemporary likeness of either saint and must not appear to.
    src: "/images/saints/devasahayam-pillai.jpg",
    w: 686,
    h: 858,
    chapter: "saints",
    alt: "A devotional painting of St Devasahayam Pillai kneeling in prayer on a rock above a river, a hill fort behind him and light breaking through the clouds",
    altTa: `புனித தேவசகாயம் பிள்ளை ஆற்றின் மேலுள்ள பாறையில் மண்டியிட்டு செபிக்கும் பக்திச் சித்திரம்; பின்னால் மலைக்கோட்டை, மேகங்களைக் கிழித்து வரும் ஒளி`,
    caption: "St Devasahayam Pillai, baptised at this church in 1745",
    captionTa: `புனித தேவசகாயம் பிள்ளை, 1745-இல் இவ்வாலயத்தில் திருமுழுக்குப் பெற்றார்`,
    credit: "A devotional painting — not a contemporary likeness",
    creditTa: `பக்திச் சித்திரம் — சமகாலத் திருவுருவப் படம் அல்ல`,
  },
  {
    src: "/images/saints/devasahayam-pillai-chains.jpg",
    w: 900,
    h: 1200,
    chapter: "saints",
    alt: "A devotional painting of St Devasahayam Pillai bound in chains, his hands crossed on his chest and his eyes raised",
    altTa: `விலங்குகளால் கட்டப்பட்ட புனித தேவசகாயம் பிள்ளையின் பக்திச் சித்திரம்; கைகள் மார்பில் குவிந்திருக்க, கண்கள் மேல்நோக்கி`,
    caption: "In chains, on the road to Aralvaimozhi",
    captionTa: `விலங்கிடப்பட்டு, ஆரல்வாய்மொழிக்குச் செல்லும் வழியில்`,
    credit: "A devotional painting — not a contemporary likeness",
    creditTa: `பக்திச் சித்திரம் — சமகாலத் திருவுருவப் படம் அல்ல`,
  },
  {
    src: "/images/saints/john-de-britto.jpg",
    w: 678,
    h: 906,
    chapter: "saints",
    alt: "A printed likeness of St John de Britto in a white robe, holding a crucifix, with a martyr's palm behind his shoulder",
    altTa: `வெண்ணிற ஆடையில், சிலுவையைக் கையில் ஏந்தி நிற்கும் புனித அருளானந்தரின் அச்சுத் திருவுருவப் படம்; தோளுக்குப் பின்னால் இரத்தசாட்சியின் ஈச்சம் ஓலை`,
    caption: "St John de Britto — Arulanandar — who came in 1685",
    captionTa: `புனித அருளானந்தர் — 1685-இல் இவ்வூருக்கு வந்தவர்`,
  },
  {
    src: "/images/saints/gnanapoo-ammal-tomb.jpg",
    w: 1333,
    h: 2000,
    chapter: "saints",
    alt: "The tomb of Gnanapoo Ammal, wife of St Devasahayam Pillai, sheltered under a white arched memorial with an old stone cross standing in it",
    altTa: `புனித தேவசகாயம் பிள்ளையின் மனைவி ஞானப்பூ அம்மாளின் கல்லறை; வெண்ணிற வளைவு நினைவிடத்தின் கீழ், உள்ளே பழைய கல் சிலுவை`,
    caption: "The grave of Gnanapoo Ammal, who died in 1766",
    captionTa: `1766-இல் இறந்த ஞானப்பூ அம்மாளின் கல்லறை`,
    year: "d. 1766",
  },
  {
    src: "/images/priests/tombs.jpg",
    w: 2400,
    h: 1496,
    chapter: "saints",
    alt: "Three white gabled tomb monuments in a row against a wall behind the church, each with a black inscribed plaque set into its face",
    altTa: `ஆலயத்தின் பின்புறச் சுவரை ஒட்டி வரிசையாக நிற்கும் மூன்று வெண்ணிற முக்கோண மேற்கூரைக் கல்லறை நினைவிடங்கள்; ஒவ்வொன்றின் முகத்திலும் கருப்புக் கல்வெட்டுப் பலகை`,
    caption: "They are buried here — the priests' graves behind the church",
    captionTa: `இங்கே அடக்கம் — ஆலயத்தின் பின்னால் அருட்தந்தையரின் கல்லறைகள்`,
  },

  /* ── VI · FROM THE ARCHIVE ───────────────────────────────────────────── */
  {
    // THE OLDEST KNOWN IMAGE OF THIS CHURCH. Fr Pierre Suau SJ's own plate,
    // taken on his 1899–1900 visit and printed at p.73 of L'Inde Tamoule
    // (Paris, 1901). Public domain; provenance and the recommended credit line
    // are in Knowledge_Base/Historical_Images_From_Books/README.md §1. It is
    // the picture that dates the porch: there is none here.
    src: "/images/archive-church-1901.jpg",
    w: 1800,
    h: 1282,
    chapter: "archive",
    alt: "The west façade of Holy Family Church, Vadakkankulam, photographed by Fr Pierre Suau SJ in 1899–1900 — twin spires, the pinnacle cresting, a free-standing flagstaff and a group of parishioners at a doorway that as yet has no porch",
    altTa: `1899–1900-இல் அருட்தந்தை பியேர் சுவோ இ.ச. எடுத்த வடக்கன்குளம் திருக்குடும்ப ஆலயத்தின் மேற்கு முகப்பு — இரட்டைக் கோபுரங்கள், சிகரங்கள், தனித்து நிற்கும் கொடிமரம், இன்னும் முகப்பு மண்டபமே இல்லாத ஒரு வாசலில் பங்கு மக்கள் கூட்டம்`,
    caption: "The oldest known photograph of this church",
    captionTa: `இவ்வாலயத்தின் அறியப்பட்ட மிகப் பழைய புகைப்படம்`,
    year: "1899 – 1900",
    credit:
      "Pierre Suau SJ, L’Inde Tamoule (Paris, 1901), p. 73. Public domain.",
    creditTa: `பியேர் சுவோ இ.ச., L’Inde Tamoule (பாரிஸ், 1901), ப. 73. பொதுவுரிமை.`,
  },
  {
    // The parish's own archival halftone — the same photograph that heads
    // /history. It carries NO year on purpose: nothing in the Knowledge Base
    // dates it, and a date invented for a caption is a date the site would then
    // be quoted on.
    src: "/images/bw-old-pic.jpg",
    w: 2560,
    h: 1763,
    chapter: "archive",
    alt: "An archival black-and-white photograph of the great two-nave church at Vadakkankulam, its spires and pinnacles against a clouded sky",
    altTa: `வடக்கன்குளத்தின் இரட்டை மண்டப ஆலயத்தின் பழைய கருப்பு–வெள்ளைப் புகைப்படம்; மேகம் சூழ்ந்த வானின் பின்னணியில் கோபுரங்களும் சிகரங்களும்`,
    caption: "The parish's own archival photograph. Nothing we hold dates it.",
    captionTa: `பங்கின் சொந்தப் பழம் புகைப்படம். இதன் ஆண்டைக் குறிக்கும் ஆவணம் எதுவும் நம்மிடம் இல்லை.`,
  },
];

/** The plates of one chapter, in the order they are declared above. */
export function platesOf(chapter: ChapterKey): Plate[] {
  return PLATES.filter((p) => p.chapter === chapter);
}

/** Printed in the intro and used by the JSON-LD. One number, one source. */
export const PLATE_COUNT = PLATES.length;

/* ── The page's own chrome ─────────────────────────────────────────────────
   Kept here beside the plates rather than in lib/i18n.ts, which is the pattern
   /priests already follows (see CHROME_TA in lib/priests.ts): the strings are
   useless without the data they label, and i18n.ts is 3,700 lines. Everything
   falls back to English when a Tamil sibling is missing.                    */
export const CHROME = {
  heroLabel: "The Plates",
  heroTitle: "What the Shrine Looks Like",
  heroIntro:
    "Every photograph this site holds of the church, the statue, the feast, the other churches of the village and the graves behind — in one place, at a size worth looking at.",
  heroAlt:
    "The crowned statue of Our Lady on her flower-decked chariot at the August feast, the spires of the shrine rising behind her",

  lead: (n: number) =>
    `${n} photographs, in six parts. Tap any one of them to see it whole.`,
  /* The honesty note. The gallery is not the parish's whole archive and should
     not be read as it — see project_pics_review: 166 more photographs are
     catalogued and not yet cut for the web. */
  note:
    "This is not everything. The parish has more, and so does the village; corrections and better prints are welcome.",
  contents: "Contents",
  jumpAria: "Jump to a part of the gallery",

  /* Lightbox furniture. Short, because it sits over a photograph. */
  open: "Open this photograph",
  close: "Close",
  prev: "Previous",
  next: "Next",
  of: "of",
  dialogAria: "The photograph, enlarged",

  askLead: "If you have a photograph of this church that we do not,",
  askLink: "please write to the parish",
  askTail: ". Everything given is credited.",
} as const;

export const CHROME_TA = {
  heroLabel: `படத் தொகுப்பு`,
  heroTitle: `திருத்தலத்தின் தோற்றம்`,
  heroIntro: `ஆலயம், மாதாவின் திருவுருவம், திருவிழா, ஊரின் பிற ஆலயங்கள், பின்னாலுள்ள கல்லறைகள் — இத்தளத்திலுள்ள ஒவ்வொரு புகைப்படமும் ஒரே இடத்தில், பார்க்கத் தகுந்த அளவில்.`,
  heroAlt: `ஆகஸ்ட் திருவிழாவில் மலர்களால் அலங்கரிக்கப்பட்ட தேரில் மாதாவின் முடிசூட்டப்பட்ட திருவுருவம், பின்னால் திருத்தலத்தின் கோபுரங்கள்`,

  lead: (n: number) =>
    `${n} புகைப்படங்கள், ஆறு பகுதிகளாக. எதையேனும் தொட்டால் முழுமையாகக் காணலாம்.`,
  note: `இது முழுமையானது அல்ல. பங்கிடமும் ஊரிடமும் இன்னும் பல உள்ளன; திருத்தங்களும் தெளிவான படங்களும் வரவேற்கப்படுகின்றன.`,
  contents: `உள்ளடக்கம்`,
  jumpAria: `படத் தொகுப்பின் ஒரு பகுதிக்குச் செல்லுங்கள்`,

  open: `இப்புகைப்படத்தைத் திறக்க`,
  close: `மூடு`,
  prev: `முந்தையது`,
  next: `அடுத்தது`,
  of: `/`,
  dialogAria: `புகைப்படம், பெரிதாக்கப்பட்டது`,

  askLead: `இவ்வாலயத்தின் புகைப்படம் ஏதேனும் இங்கு இல்லாமல் உங்களிடம் இருந்தால்,`,
  askLink: `பங்கிற்கு எழுதுங்கள்`,
  askTail: `. தரப்படும் ஒவ்வொன்றுக்கும் உரியவர் பெயர் குறிக்கப்படும்.`,
} as const;
