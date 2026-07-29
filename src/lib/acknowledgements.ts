/**
 * Acknowledgements — the people who made this site.
 *
 * Set as a masthead: role on the left, names on the right. That form is used
 * because it is the one that credits people without describing them. Prose
 * about each contributor invites comparison between the paragraphs; a role and
 * a name does not. It is also the form a reader already knows from the front of
 * a book and the end of a film, so it reads as a record rather than a thank-you
 * note.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * RULES.
 * 1. NO TIERS. Roles are kinds of work, never degrees of it.
 * 2. ORDER IS WHATEVER THIS FILE SAYS. The page used to alphabetise at render;
 *    it no longer does, because that took the decision away from the people who
 *    know why one name belongs before another. The page therefore makes NO
 *    claim about the ordering — but every line here is a deliberate choice
 *    somebody will read into, so change one only on purpose.
 * 3. A PERSON APPEARS UNDER EVERY ROLE THEY WORKED IN. Repetition is what stops
 *    a role from looking like a box invented to hold one person.
 * 4. NO ADJECTIVES OF DEGREE anywhere on the page.
 * 5. ASK BEFORE PUBLISHING A NAME.
 * 6. OMISSION IS THE ONLY REAL INSULT — hence CLOSING_NOTE.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * DRAFT: while true the page is `noindex`, shows a draft line and stays out of
 * the sitemap. Flip to false once every name is confirmed, and add
 * "acknowledgements" to INDEXABLE in src/lib/seo.ts at the same time.
 */
export const DRAFT = true;

/**
 * One credit: the people who did a thing, and the one line saying what it was.
 *
 * `names` is a list because people who did a piece of work together should be
 * credited together — two names over one line, not the same sentence written
 * twice.
 *
 * The lines are written to be read aloud, but they are all cut to ROUGHLY THE
 * SAME LENGTH on purpose — one sentence, eighteen to twenty-two words. That is
 * the discipline that lets the page be warm without becoming a league table: a
 * longer tribute beside a shorter one is a comparison whatever the words say.
 * No line names a place, an institution or a number of years, for the same
 * reason — a specific beside a general reads as the smaller of the two.
 */
export type Entry = {
  names: string[];
  /** Tamil spellings, keyed by the English name. Falls back to English. */
  namesTa?: Record<string, string>;
  note: string;
  noteTa?: string;
};

export type Credit = {
  role: string;
  roleTa?: string;
  /** Alphabetised at render. Empty = the role is reserved, see `pending`. */
  entries: Entry[];
  /** Shown in place of names while they are still being gathered. */
  pending?: string;
  pendingTa?: string;
};

/* Roles run in the order the work happened — initiative, gathering, research,
   text, build. Stated on the page, so the sequence cannot read as a ranking. */
export const CREDITS: Credit[] = [
  {
    role: "Initiative & Coordination",
    roleTa: `முன்னெடுப்பும் ஒருங்கிணைப்பும்`,
    entries: [
      {
        names: ["Mithun Anto"],
        note: "Set this work in motion, and brought together the people who could carry it through from the first day to the last.",
        noteTa: `இப்பணியைத் தொடங்கி வைத்து, முதல் நாள் முதல் இறுதி நாள் வரை அதை நடத்திச் செல்லக்கூடியவர்களை ஒன்றிணைத்தவர்.`,
      },
    ],
  },
  {
    // The one role that carries the whole search: the archive visit, the online
    // hunt and the reading of what came back are three halves of one job, so
    // they are credited under one heading rather than split into a "research"
    // role that would have listed most of these names a second time.
    role: "Books, Documents & Photographs",
    roleTa: `நூல்கள், ஆவணங்கள், புகைப்படங்கள்`,
    entries: [
      {
        names: ["Willington", "Mithun Anto"],
        // No archive is named here on purpose. Naming one pinned these two to a
        // single trip, which read small beside the line below it — the archives
        // they went through were more than the one they are remembered for.
        note: "Went through the archives page by page, and brought back the records this village's history had to be rebuilt from.",
        noteTa: `ஆவணக்காப்பகங்களில் பக்கம் பக்கமாகத் தேடி, இவ்வூரின் வரலாற்றை மீண்டும் கட்டியெழுப்பத் தேவைப்பட்ட பதிவுகளைக் கொண்டுவந்தவர்கள்.`,
      },
      {
        names: ["Shan Raja", "Vasanth"],
        note: "Read through everything that was gathered, and drew out of those books the history that lay buried in them.",
        noteTa: `திரட்டப்பட்ட அனைத்தையும் வாசித்து, அந்நூல்களுக்குள் புதைந்து கிடந்த வரலாற்றை வெளிக்கொணர்ந்தவர்கள்.`,
      },
      {
        names: ["Subash Saajan"],
        note: "Traced the records scattered across the world's libraries, and gathered what had been written about this village into one place.",
        noteTa: `உலகின் நூலகங்களெங்கும் சிதறிக் கிடந்த பதிவுகளைத் தேடி, இவ்வூரைப் பற்றி எழுதப்பட்டவற்றை ஓரிடத்தில் ஒன்றுசேர்த்தவர்.`,
      },
    ],
  },
  {
    role: "Writing & Translation",
    roleTa: `எழுத்தும் மொழிபெயர்ப்பும்`,
    entries: [],
    pending: "Names being confirmed",
    pendingTa: `பெயர்கள் உறுதி செய்யப்பட்டு வருகின்றன`,
  },
  {
    role: "Advisory",
    roleTa: `ஆலோசனை`,
    entries: [
      {
        names: ["Willington"],
        note: "Kept the work on its course from the first plan to the last page, and steadied it whenever it wandered.",
        noteTa: `முதல் திட்டம் முதல் இறுதிப் பக்கம் வரை பணியை அதன் பாதையில் நிலைநிறுத்தி, தடம் மாறும்போதெல்லாம் சீர்செய்தவர்.`,
      },
    ],
  },
  {
    role: "Design & Development",
    roleTa: `வடிவமைப்பும் உருவாக்கமும்`,
    entries: [
      {
        names: ["Subash Saajan"],
        note: "Gave all of it a form that could be read, and built the pages this record is now kept in.",
        // Kept deliberately tighter than the English beside it. Tamil carries
        // the same sense in fewer words, and padding it out to match the
        // English word count only makes it read translated.
        noteTa: `இப்பதிவு வாசிக்கப்படுவதற்கான வடிவத்தை அளித்து, அதைத் தாங்கும் பக்கங்களை உருவாக்கியவர்.`,
      },
    ],
  },
];

export const COPY = {
  en: {
    eyebrow: "Little Rome",
    title: "Acknowledgements",
    // The frame the whole page hangs on: a gift given, not a job done. Nobody
    // is thanked in it — the thanks is the page itself.
    intro:
      "Nobody was paid for this and nobody was asked. It was made by people who wanted their village to have something of its own: a place where three hundred years of Vadakkankulam could be set down plainly, and left where anyone who cares to look can find it. The documents were sought out, the photographs gathered, the old books read and explained, the pages written and built. These are the people who did it.",
    orderNote: "Roles follow the order the work happened in.",
    also:
      "Others lent a hand in the gathering and the reading, and are not named here only because we are still asking them how they would like to be. They will be.",
    draftLine:
      "Draft — not yet published. Names are still to be confirmed, and this page is not indexed by search engines.",
  },
  ta: {
    eyebrow: `சின்ன ரோமாபுரி`,
    title: `நன்றி`,
    intro: `இதற்காக யாருக்கும் கூலி தரப்படவில்லை; யாரும் கேட்டுக்கொள்ளப்படவும் இல்லை. தங்கள் ஊருக்கெனச் சொந்தமாக ஒன்று இருக்க வேண்டும் என்று விரும்பியவர்களால் இது உருவாக்கப்பட்டது — வடக்கன்குளத்தின் முந்நூறு ஆண்டுகள் தெளிவாகப் பதிவு செய்யப்பட்டு, தேடுகிற எவரும் காணும்படி வைக்கப்படும் ஓர் இடம். ஆவணங்கள் தேடிக் கண்டெடுக்கப்பட்டன, புகைப்படங்கள் திரட்டப்பட்டன, பழைய நூல்கள் வாசிக்கப்பட்டு விளக்கப்பட்டன, பக்கங்கள் எழுதப்பட்டு உருவாக்கப்பட்டன. அதைச் செய்தவர்கள் இவர்கள்.`,
    orderNote: `பணிகள் அவை நடந்த வரிசையில் அமைந்துள்ளன.`,
    also: `திரட்டுவதிலும் வாசிப்பதிலும் பிறரும் கைகொடுத்தனர்; அவர்கள் எவ்வாறு பெயரிடப்பட விரும்புகிறார்கள் என்று கேட்டுக்கொண்டிருப்பதால் மட்டுமே அவர்களின் பெயர்கள் இங்கு இன்னும் இல்லை. அவை சேர்க்கப்படும்.`,
    draftLine: `வரைவு — இன்னும் வெளியிடப்படவில்லை. பெயர்கள் உறுதி செய்யப்பட வேண்டியுள்ளன.`,
  },
} as const;

/**
 * The most important lines on the page. People are not hurt by being listed
 * last; they are hurt by being left out with no way to say so.
 */
export const CLOSING_NOTE = {
  en: {
    heading: "If a name is missing",
    body: "It is an oversight, not a judgement. Write to us, or speak to the parish office, and it will be added.",
    cta: "Tell us a name we have missed",
  },
  ta: {
    heading: `ஒரு பெயர் விடுபட்டிருந்தால்`,
    body: `அது கவனக்குறைவே தவிர, தீர்ப்பு அல்ல. எங்களுக்கு எழுதுங்கள், அல்லது பங்கு அலுவலகத்தில் சொல்லுங்கள் — அப்பெயர் சேர்க்கப்படும்.`,
    cta: `விடுபட்ட பெயரைச் சொல்லுங்கள்`,
  },
} as const;
