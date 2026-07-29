/**
 * The entity graph.
 *
 * These nodes were written inline in /contact, where no other page could reach
 * them. That is how NAP drift starts: a second page restates the address by
 * hand, the two disagree, and Google quietly declines to merge them into one
 * Knowledge-Graph entity. So the graph lives here, is built once, and every
 * route imports it.
 *
 * Node identity is the whole point. `@id` is a stable URI, not a URL you visit
 * — every page emits `{"@id": SHRINE_ID}` as a *reference*, and Google unions
 * them into a single node. Six pages therefore describe one shrine, not six.
 *
 * Two nodes, not one (kept from the original, because it is correct):
 * schema.org's `CatholicChurch` is a *Place* — a building with an address and
 * opening hours. It has no founder and no founding date. The thing St John de
 * Britto founded in 1685, and that the Diocese of Thoothukudi is parent to, is
 * the *parish*: an `Organization`, which `location`s at the church.
 */
import type {
  BreadcrumbList,
  CatholicChurch,
  Event,
  FAQPage,
  Organization,
  Person,
  WebPage,
  WebSite,
  WithContext,
  Thing,
} from "schema-dts";

import {
  ADDRESS,
  ALIASES,
  DIOCESE,
  FEAST,
  GEO,
  MAP_LINKS,
  PARISH_PRIEST,
  PHONE,
  SAME_AS,
  SCHEDULE,
} from "./contact";
import { PEOPLE, SPELLINGS } from "./history";
import { LOCALE_TAG, localePath, type Locale } from "./locale";
import type { RouteKey } from "./seo";
import { HOME_PATH, ROUTES, SITE_NAME, SITE_URL, abs, routeCopy } from "./seo";

/* ── Stable node ids ───────────────────────────────────────────────────────
   Fragment URIs on the origin. They never move, even when HOME_PATH does.    */
export const SHRINE_ID = `${SITE_URL}/#shrine`;
export const PARISH_ID = `${SITE_URL}/#parish`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEVASAHAYAM_ID = `${SITE_URL}/#st-devasahayam`;
export const DE_BRITTO_ID = `${SITE_URL}/#st-john-de-britto`;

const EVERY_DAY = [
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
  "https://schema.org/Saturday",
  "https://schema.org/Sunday",
] as const;

/** The feast runs 6–15 August. Hard-coding a year would silently rot into a
 *  past-dated Event, which Google drops. Roll to next year once it has passed. */
export function feastYear(now: Date = new Date()): number {
  const y = now.getUTCFullYear();
  const ended = Date.UTC(y, FEAST.endMonth - 1, FEAST.endDay, 23, 59, 59);
  return now.getTime() <= ended ? y : y + 1;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ── Tamil prose for the graph ─────────────────────────────────────────────
   The `/ta` pages render Tamil, so the machine-readable summary of those pages
   must be Tamil too: a Tamil <h1> under an English `description` is the graph
   contradicting the document it claims to describe, and it teaches an answer
   engine the wrong language for the entity.

   Every builder below therefore takes a `lang` that DEFAULTS TO "en", so the
   English output is byte-for-byte what it was. Nothing is Tamil until a caller
   asks for it — see the note above `baseNodes`.

   The same no-invented-facts rule as everywhere else: this is the English
   prose said in Tamil, not a fuller version of it. Terminology follows
   .claude/skills/tamil-localize/reference/glossary.md — village வடக்கன்குளம்,
   shrine திருத்தலம், Mass திருப்பலி, feast திருவிழா, martyr இரத்தசாட்சி,
   Little Rome சின்ன ரோமாபுரி.                                                */
const TA = {
  shrineName: "திருக்குடும்பத் திருத்தலம், வடக்கன்குளம்",
  /** Tamil aliases, added to (not instead of) the Latin-script ones: a crawler
   *  reconciling a Tamil query with this node needs both scripts on one node. */
  shrineAliases: [
    "வடவை மாதா",
    "பரலோக மாதா",
    "விண்ணேற்பு மாதா",
    "வடக்கன்குளத்து அன்னை",
    "சின்ன ரோமாபுரி",
    "திருக்குடும்ப ஆலயம்",
  ],
  shrineDescription:
    "திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்ட, விண்ணேற்பு மாதாவின் பெயரால் வணங்கப்படும் மாதா யாத்திரைத் தலம் — ஊரார் இதனை வடவை மாதா, பரலோக மாதா, விண்ணேற்பு மாதா என்று அழைக்கிறார்கள். 1685-ல் புனித அருளானந்தரால் (ஜான் தெ பிரிட்டோ) தொடங்கப்பட்டது. ஒரே பலிபீடத்தில் சந்திக்கும் இரு மண்டபங்களைக் கொண்ட இன்றைய ஆலயம், அருட்தந்தை கிரகோயர் அவர்களின் வழிநடத்தலில், சகோதரர் பெர்கந்தால் அவர்களைக் கட்டிடக் கலைஞராகக் கொண்டு, 1855 முதல் 1872 வரை கட்டப்பட்டது. புனித தேவசகாயம் பிள்ளை — 2022-ல் இந்தியாவின் முதல் பொதுநிலைப் புனிதராக அறிவிக்கப்பட்டவர் — 1745 மே 14 அன்று இங்கே திருமுழுக்குப் பெற்றார். 1926 முதல் இவ்வூர் சின்ன ரோமாபுரி என்று அழைக்கப்படுகிறது.",
  parishName: "வடக்கன்குளம் திருக்குடும்பப் பங்கு",
  founderName: "புனித அருளானந்தர்",
  dioceseName: "தூத்துக்குடி மறைமாவட்டம்",
  parishPriestTitle: "பங்குத் தந்தை",
  feastName: "விண்ணேற்பு மாதா திருவிழா",
  feastAlias: "வடக்கன்குளம் தேர்த் திருவிழா",
  feastDescription:
    "ஆகஸ்ட் 6 அன்று கொடியேற்றத்துடன் தொடங்கி, ஆகஸ்ட் 15 அன்று சுமார் ஒரு லட்சம் யாத்திரிகர்களை ஈர்க்கும் தேர் ஊர்வலத்துடன் நிறைவடையும் பத்து நாள் ஆண்டுத் திருவிழா.",
  apparitionName: "மாதா காட்சிப் பெருவிழா",
  apparitionDescription:
    "1803 அக்டோபர் 23 அன்று ஊர் முன்னிலையில் அன்னை கண்ணீர் சிந்தியதாகச் சொல்லப்படும் நிகழ்வை, ஆண்டுதோறும் அக்டோபர் 22–23 அன்று பங்கு நினைவுகூர்ந்து வருகிறது. இது ஊரிலும் மறைமாவட்டத்திலும் நிலவும் ஒரு பக்தி மரபு; இது வத்திக்கானின் விசாரணைக்கு உட்பட்டது அல்ல.",
  devasahayamName: "புனித தேவசகாயம் பிள்ளை",
  devasahayamDescription:
    "திருவிதாங்கூரின் மார்த்தாண்ட வர்மா அரசவையின் அதிகாரி. 1745 மே 14 அன்று வடக்கன்குளம் திருக்குடும்ப ஆலயத்தில், இயேசு சபை அருட்தந்தை புத்தாரி அவர்களால் திருமுழுக்குப் பெற்று, “கடவுளே என் துணை” எனப் பொருள்படும் தேவசகாயம் என்னும் பெயரைப் பெற்றார். 1752 ஜனவரி 14 அன்று ஆரல்வாய்மொழிக் கணவாயில் விசுவாசத்திற்காக இரத்தசாட்சியானார்; 2022 மே 15 அன்று புனிதராக அறிவிக்கப்பட்டார் — இந்தியாவில் பிறந்த முதல் பொதுநிலைப் புனிதர். 2025-ல் இந்தியப் பொதுநிலையினரின் பாதுகாவலராக அறிவிக்கப்பட்டார்.",
  deBrittoName: "புனித அருளானந்தர் (ஜான் தெ பிரிட்டோ)",
  deBrittoDescription:
    "மதுரைப் பணிக்களத்தின் போர்த்துகீசிய இயேசு சபை அருட்தந்தை; 1683 முதல் பணிக்களத்தின் பொறுப்பாளர், 1685–86-ல் அதன் தலைவர். 1685-ல் இவரது வருகையிலிருந்தே வடக்கன்குளம் பங்கு தன் தொடக்கத்தை எண்ணுகிறது; தமிழில் இவரை அருளானந்தர் என்று வணங்குகிறது. 1693 பிப்ரவரி 4 அன்று ஓரியூரில் இரத்தசாட்சியானார்; 1853-ல் அருளாளர், 1947-ல் புனிதர்.",
  lisbon: "லிஸ்பன், போர்த்துகல்",
  oriyur: "ஓரியூர், இராமநாதபுரம், தமிழ்நாடு",
  nattalam: "நாட்டாலம், திருவிதாங்கூர்",
  aralvaimozhi: "ஆரல்வாய்மொழி, கன்னியாகுமரி, தமிழ்நாடு",
} as const;

const isTa = (lang: Locale) => lang === "ta";

/* ── The shrine: a Place ───────────────────────────────────────────────────
   Deliberately NO `aggregateRating`. The 4.8★/49 reviews are Google's own
   first-party data about this place; restating them in our markup would be
   self-serving review markup, which is a manual-action risk and adds nothing
   — Google already shows its own stars. `sameAs` → the Maps CID is the honest
   way to claim the same entity.                                              */
export function shrineFor(lang: Locale = "en"): CatholicChurch {
  return {
    "@type": "CatholicChurch",
    "@id": SHRINE_ID,
    name: isTa(lang) ? TA.shrineName : ADDRESS.name,
    // Every name and every attested spelling. This is not padding: the parish is
    // written "Vadakenkoulam" in the 19th-century French sources, "Vadakangulam"
    // in the colonial gazetteers, and வடக்கன்குளம் in Tamil. Without this list a
    // crawler has no reason to believe those documents are about this place.
    // The Tamil node carries the Latin list PLUS the Tamil devotional titles and
    // the English name, so the two language twins reconcile to one entity.
    alternateName: isTa(lang)
      ? [...new Set([ADDRESS.name, ...TA.shrineAliases, ...ALIASES, ...SPELLINGS])]
      : [...new Set([...ALIASES, ...SPELLINGS])],
    description: isTa(lang)
      ? TA.shrineDescription
      : "A Marian pilgrimage shrine dedicated to the Holy Family and venerated under the title of Our Lady of the Assumption — known locally as Vadavai Matha, Paraloga Matha and Vinnerpu Matha. Founded in 1685 by St John de Britto; the present two-nave church, whose naves converge on a single altar, was built between 1855 and 1872 under Fr Joseph Grégoire, with Br Joseph Bergenthal as its architect. St Devasahayam Pillai — canonised in 2022 as the first Indian layman to be declared a saint — was baptised here on 14 May 1745. The village has been called Little Rome (Chinna Romapuri) since 1926.",
    url: abs(localePath(lang, HOME_PATH)),
    telephone: PHONE.e164,
    image: abs(ROUTES.home.image),
    // NO `foundingDate` here, though it is tempting. A Place is a building; it
    // has no founder and no founding date. 1685 belongs to `parish` below, which
    // is the Organization St John de Britto actually founded. schema-dts rejects
    // it outright, which is the type system enforcing the very distinction this
    // file's header sets out.
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    hasMap: MAP_LINKS.google,
    isAccessibleForFree: true,
    publicAccess: true,
    sameAs: [...SAME_AS],
    // The adoration chapel's hours — the only ones the parish publishes.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...EVERY_DAY],
      opens: SCHEDULE.chapel.open,
      closes: SCHEDULE.chapel.close,
    },
  };
}

/** The English shrine node, unchanged — kept so existing imports still work. */
export const shrine: CatholicChurch = shrineFor("en");

/* ── The parish: an Organization ───────────────────────────────────────────*/
export function parishFor(lang: Locale = "en"): Organization {
  return {
    "@type": "Organization",
    "@id": PARISH_ID,
    name: isTa(lang) ? TA.parishName : "Holy Family Parish, Vadakkankulam",
    url: abs(localePath(lang, HOME_PATH)),
    telephone: PHONE.e164,
    location: { "@id": SHRINE_ID },
    foundingDate: "1685",
    founder: {
      "@type": "Person",
      name: isTa(lang) ? TA.founderName : "St John de Britto",
      alternateName: isTa(lang) ? "St John de Britto" : "Arulanandar",
      sameAs: "https://en.wikipedia.org/wiki/John_de_Britto",
    },
    // The parish priest's name stays in Latin script in both languages. The
    // parish has published no Tamil spelling of it, and a transliteration
    // guessed here would be exactly the invented fact this file forbids.
    employee: {
      "@type": "Person",
      name: PARISH_PRIEST,
      jobTitle: isTa(lang) ? TA.parishPriestTitle : "Parish Priest",
    },
    parentOrganization: {
      "@type": "Organization",
      name: isTa(lang) ? TA.dioceseName : DIOCESE.name,
      url: "https://tuticorindiocese.org/",
    },
  };
}

export const parish: Organization = parishFor("en");

/* ── The website itself ────────────────────────────────────────────────────
   No `SearchAction`: the site has no search endpoint, and claiming one you do
   not have is exactly the sort of thing that gets structured data ignored.   */
export const website: WebSite = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en", "ta"],
  publisher: { "@id": PARISH_ID },
  about: { "@id": SHRINE_ID },
};

/* ── The annual feast ──────────────────────────────────────────────────────*/
export function feast(now?: Date, lang: Locale = "en"): Event {
  const y = feastYear(now);
  return {
    "@type": "Event",
    "@id": `${SITE_URL}/#feast-${y}`,
    name: isTa(lang) ? TA.feastName : "Feast of Our Lady of the Assumption",
    alternateName: isTa(lang) ? TA.feastAlias : "Vadakkankulam Car Festival",
    description: isTa(lang)
      ? TA.feastDescription
      : "The ten-day annual feast, opening with the hoisting of the flag (kodiyetram) on 6 August and closing on 15 August with the chariot procession, which draws around 100,000 pilgrims.",
    startDate: `${y}-${pad(FEAST.startMonth)}-${pad(FEAST.startDay)}`,
    endDate: `${y}-${pad(FEAST.endMonth)}-${pad(FEAST.endDay)}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@id": SHRINE_ID },
    organizer: { "@id": PARISH_ID },
    isAccessibleForFree: true,
    image: abs(ROUTES.massTimings.image),
  };
}

/* ── The October commemoration ─────────────────────────────────────────────
   The parish keeps a SECOND annual observance, on 22–23 October, and the
   website has never published it. Worded to the evidential tier the Knowledge
   Base insisted on: what is asserted is that the parish commemorates, which is
   simply true and is the thing a visitor needs to know.                       */
export function apparitionFeast(now?: Date, lang: Locale = "en"): Event {
  const y = feastYear(now);
  return {
    "@type": "Event",
    "@id": `${SITE_URL}/#apparition-${y}`,
    name: isTa(lang)
      ? TA.apparitionName
      : "The Commemoration of the Apparition (Matha Kaatchi)",
    description: isTa(lang)
      ? TA.apparitionDescription
      : "The parish's annual commemoration, kept on 22–23 October, of the weeping of Our Lady before the village on 23 October 1803. A local and diocesan tradition; it has never been the subject of a Vatican investigation.",
    startDate: `${y}-10-22`,
    endDate: `${y}-10-23`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@id": SHRINE_ID },
    organizer: { "@id": PARISH_ID },
    isAccessibleForFree: true,
  };
}

/* ── The people ────────────────────────────────────────────────────────────
   Br Bergenthal is the one to look at. The Knowledge Base resolved him as the
   church's architect from the parish's own English history plus the Jesuit
   archives in Rome — and he exists nowhere on the open web. Declaring him here
   is the site making an original contribution to the record rather than
   restating what is already indexed. That is exactly what earns a citation.   */
export const gregoire: Person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#fr-gregoire`,
  name: PEOPLE.gregoire.name,
  alternateName: "The apostle of Vadakenkoulam",
  description: PEOPLE.gregoire.role,
};

export const bergenthal: Person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#br-bergenthal`,
  name: PEOPLE.bergenthal.name,
  jobTitle: "Architect of the Holy Family Church, Vadakkankulam",
  description: PEOPLE.bergenthal.role,
};

export const buttari: Person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#fr-buttari`,
  name: PEOPLE.buttari.name,
  description: PEOPLE.buttari.role,
};

export const santhaayi: Person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#santhaayi`,
  name: PEOPLE.santhaayi.name,
  description: PEOPLE.santhaayi.role,
};

/* ── Saints of this parish ─────────────────────────────────────────────────
   Devasahayam is the reason a large share of the world will ever search for
   this village: the first Indian layman canonised, baptised in this church.  */
/**
 * The layman baptised here.
 *
 * Dated to the day at both ends and stated flatly, because unusually for this
 * parish nothing here needs hedging: the Holy See's own record of the cause
 * names this church as the place of the baptism and gives 14 May 1745, and the
 * canonisation of 2022 seals "Lazarus, known as Devasahayam (1712–1752)". This
 * is the strongest entity claim the whole site can make, and the graph should
 * make it without a qualifier.
 *
 * `deathDate` is the 14th. The execution ran a little before midnight between
 * the 14th and the 15th of January 1752, and his feast is the 14th — a date
 * property cannot hold that nuance, so the prose on the page does.
 */
export function devasahayamFor(lang: Locale = "en"): Person {
  return {
    "@type": "Person",
    "@id": DEVASAHAYAM_ID,
    name: isTa(lang) ? TA.devasahayamName : "St Devasahayam Pillai",
    alternateName: isTa(lang)
      ? ["St Devasahayam Pillai", "நீலகண்ட பிள்ளை", "லாசர்", "தேவசகாயம் பிள்ளை"]
      : ["Neelakanta Pillai", "Lazarus", "தேவசகாயம் பிள்ளை"],
    honorificPrefix: isTa(lang) ? "புனித" : "Saint",
    description: isTa(lang)
      ? TA.devasahayamDescription
      : "Officer at the court of Marthanda Varma of Travancore, baptised at the Holy Family Church, Vadakkankulam, on 14 May 1745 by the Jesuit Fr Giovanni Battista Buttari, taking the name Devasahayam — “God is my help”. Martyred for the faith at the Aralvaimozhi lines on 14 January 1752 and canonised on 15 May 2022, the first layperson of Indian birth to be raised to the altars; proclaimed Patron of the Laity in India in 2025.",
    birthDate: "1712-04-23",
    birthPlace: {
      "@type": "Place",
      name: isTa(lang) ? TA.nattalam : "Nattalam, Travancore",
    },
    deathDate: "1752-01-14",
    deathPlace: {
      "@type": "Place",
      name: isTa(lang) ? TA.aralvaimozhi : "Aralvaimozhi, Kanyakumari, Tamil Nadu",
    },
    // As with de Britto, one verified `sameAs` and no guessed ones.
    sameAs: "https://en.wikipedia.org/wiki/Devasahayam_Pillai",
    url: abs(localePath(lang, ROUTES.devasahayam.path)),
  };
}

export const devasahayam: Person = devasahayamFor("en");

/**
 * The founder.
 *
 * Dated to the day at both ends, because the days are documented: his own
 * prison letter and a Latin martyrology printed at Antwerp in 1697 fix
 * 4 February 1693, and the 1913 Catholic Encyclopedia's "11 February" is a slip
 * this graph must not repeat.
 *
 * The description says "the parish counts its founding from" rather than
 * asserting he built the chapel with his own hands. That is not timidity: no de
 * Britto biography names this village, and Besse — the mission's own historian
 * — writes only that the builder "is said to be" him. The page says as much in
 * both languages, and the machine-readable summary of the page must not claim
 * more than the page does.
 */
export function deBrittoFor(lang: Locale = "en"): Person {
  return {
    "@type": "Person",
    "@id": DE_BRITTO_ID,
    name: isTa(lang) ? TA.deBrittoName : "St John de Britto",
    alternateName: isTa(lang)
      ? ["St John de Britto", "அருளானந்தர்", "João de Brito"]
      : ["Arulanandar", "João de Brito", "அருளானந்தர்"],
    honorificPrefix: isTa(lang) ? "புனித" : "Saint",
    description: isTa(lang)
      ? TA.deBrittoDescription
      : "Portuguese Jesuit of the Madurai Mission, in charge of the mission from 1683 and its Superior in 1685–86. The parish of Vadakkankulam counts its founding from his coming in 1685, and venerates him in Tamil as Arulanandar. Martyred at Oriyur on 4 February 1693; beatified 1853, canonised 1947.",
    birthDate: "1647-03-01",
    birthPlace: {
      "@type": "Place",
      name: isTa(lang) ? TA.lisbon : "Lisbon, Portugal",
    },
    deathDate: "1693-02-04",
    deathPlace: {
      "@type": "Place",
      name: isTa(lang) ? TA.oriyur : "Oriyur, Ramanathapuram, Tamil Nadu",
    },
    // One `sameAs`, and only one. A Wikidata Q-id and a ta.wikipedia title were
    // drafted here and cut again: neither had been opened and verified, and a
    // sameAs pointing at the wrong entity actively teaches a crawler something
    // false. Add either only after loading the URL.
    sameAs: "https://en.wikipedia.org/wiki/John_de_Britto",
  };
}

export const deBritto: Person = deBrittoFor("en");

/* ── The page you are on ───────────────────────────────────────────────────
   `about` → the shrine is the load-bearing edge: it says "this document is
   about that entity", which is how a page earns the right to be cited as a
   source *for the shrine* rather than as an unrelated document that happens to
   mention it.                                                                 */
export function pageNode(
  key: RouteKey,
  type: "WebPage" | "ContactPage" | "AboutPage" = "WebPage",
  lang: Locale = "en",
): WebPage {
  const r = ROUTES[key];
  const c = routeCopy(key, lang);
  const url = abs(localePath(lang, r.path));
  return {
    "@type": type,
    // The `@id` rides on the locale URL, so `/faq` and `/ta/faq` are two
    // documents about one shrine — not one document that claims to be both.
    "@id": `${url}#page`,
    url,
    name: c.fullTitle,
    description: c.description,
    // A URL is one language. Its twin is declared by the hreflang pair in
    // `pageMetadata`, which is where a language alternate belongs; listing both
    // here told a crawler this single document was written in two.
    inLanguage: LOCALE_TAG[lang],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": SHRINE_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: abs(r.image),
    },
  } as WebPage;
}

/* ── The FAQ ───────────────────────────────────────────────────────────────
   A question with a short, complete answer is the most liftable unit of text
   on the web. This is what Google promotes into a rich result and what the
   answer engines quote wholesale. Note `acceptedAnswer.text` must be plain
   prose, not markup — we feed it the same strings the page renders, so the
   answer a machine reads and the answer a person reads cannot diverge.        */
export function faqPage(
  faqs: { q: string; a: string }[],
  lang: Locale = "en",
): FAQPage {
  const url = abs(localePath(lang, ROUTES.faq.path));
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    name: routeCopy("faq", lang).fullTitle,
    inLanguage: LOCALE_TAG[lang],
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": SHRINE_ID },
    mainEntity: faqs.map((f) => ({
      "@type": "Question" as const,
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: f.a,
      },
    })),
  };
}

/* ── Breadcrumbs ───────────────────────────────────────────────────────────*/
export function breadcrumbs(
  trail: { name: string; path: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/** Home → this page. Every route below the home gets one.
 *  The crumb LABELS come from `routeCopy`, so the Tamil breadcrumb a crawler
 *  reads is the Tamil breadcrumb a visitor sees; the paths carry the `/ta`
 *  prefix for the same reason. */
export function trailTo(
  key: keyof typeof ROUTES,
  lang: Locale = "en",
): BreadcrumbList {
  const home = { name: routeCopy("home", lang).crumb, path: localePath(lang, HOME_PATH) };
  if (key === "home") return breadcrumbs([home]);
  return breadcrumbs([
    home,
    { name: routeCopy(key, lang).crumb, path: localePath(lang, ROUTES[key].path) },
  ]);
}

/* ── Assembly ──────────────────────────────────────────────────────────────*/
export function graph(...nodes: Thing[]): WithContext<Thing> {
  return {
    "@context": "https://schema.org",
    // `@graph` is not on schema-dts's WithContext, but it is valid JSON-LD and
    // is what lets one <script> carry several nodes that reference each other.
    "@graph": nodes,
  } as unknown as WithContext<Thing>;
}

/**
 * The nodes every page should carry, so the entity is asserted site-wide.
 *
 * NOT YET WIRED FOR TAMIL. `app/[lang]/layout.tsx` calls this as `baseNodes()`
 * and has `lang` in scope, so the whole of the Tamil root graph is one argument
 * away — `graph(...baseNodes(lang))`. Every per-page graph is the same story:
 * each route builds its `jsonLd` as a MODULE-LEVEL const (`const jsonLd =
 * graph(pageNode("faq"), trailTo("faq"))`), evaluated once at import time, when
 * no locale exists. Passing `lang` there means moving that expression inside
 * the page component, where `params` is awaited — ten files, and a change to
 * how each page renders rather than to what this file says. That is the piece
 * deliberately left undone here.
 */
export function baseNodes(lang: Locale = "en"): Thing[] {
  return [
    shrineFor(lang) as Thing,
    parishFor(lang) as Thing,
    website as Thing,
  ];
}
