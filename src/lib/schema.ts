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
import type { RouteKey } from "./seo";
import { HOME_PATH, ROUTES, SITE_NAME, SITE_URL, abs } from "./seo";

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

/* ── The shrine: a Place ───────────────────────────────────────────────────
   Deliberately NO `aggregateRating`. The 4.8★/49 reviews are Google's own
   first-party data about this place; restating them in our markup would be
   self-serving review markup, which is a manual-action risk and adds nothing
   — Google already shows its own stars. `sameAs` → the Maps CID is the honest
   way to claim the same entity.                                              */
export const shrine: CatholicChurch = {
  "@type": "CatholicChurch",
  "@id": SHRINE_ID,
  name: ADDRESS.name,
  // Every name and every attested spelling. This is not padding: the parish is
  // written "Vadakenkoulam" in the 19th-century French sources, "Vadakangulam"
  // in the colonial gazetteers, and வடக்கன்குளம் in Tamil. Without this list a
  // crawler has no reason to believe those documents are about this place.
  alternateName: [...new Set([...ALIASES, ...SPELLINGS])],
  description:
    "A Marian pilgrimage shrine dedicated to the Holy Family and venerated under the title of Our Lady of the Assumption — known locally as Vadavai Matha, Paraloga Matha and Vinnerpu Matha. Founded in 1685 by St John de Britto; the present two-nave church, whose naves converge on a single altar, was built between 1855 and 1872 under Fr Joseph Grégoire, with Br Joseph Bergenthal as its architect. St Devasahayam Pillai — canonised in 2022 as the first Indian layman to be declared a saint — was baptised here on 14 May 1745. The village has been called Little Rome (Chinna Romapuri) since 1926.",
  url: abs(HOME_PATH),
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

/* ── The parish: an Organization ───────────────────────────────────────────*/
export const parish: Organization = {
  "@type": "Organization",
  "@id": PARISH_ID,
  name: "Holy Family Parish, Vadakkankulam",
  url: SITE_URL,
  telephone: PHONE.e164,
  location: { "@id": SHRINE_ID },
  foundingDate: "1685",
  founder: {
    "@type": "Person",
    name: "St John de Britto",
    alternateName: "Arulanandar",
    sameAs: "https://en.wikipedia.org/wiki/John_de_Britto",
  },
  employee: {
    "@type": "Person",
    name: PARISH_PRIEST,
    jobTitle: "Parish Priest",
  },
  parentOrganization: {
    "@type": "Organization",
    name: DIOCESE.name,
    url: "https://tuticorindiocese.org/",
  },
};

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
export function feast(now?: Date): Event {
  const y = feastYear(now);
  return {
    "@type": "Event",
    "@id": `${SITE_URL}/#feast-${y}`,
    name: "Feast of Our Lady of the Assumption",
    alternateName: "Vadakkankulam Car Festival",
    description:
      "The ten-day annual feast, opening with the hoisting of the flag (kodiyetram) on 6 August and closing on 15 August with the chariot procession, which draws around 100,000 pilgrims.",
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
export function apparitionFeast(now?: Date): Event {
  const y = feastYear(now);
  return {
    "@type": "Event",
    "@id": `${SITE_URL}/#apparition-${y}`,
    name: "The Commemoration of the Apparition (Matha Kaatchi)",
    description:
      "The parish's annual commemoration, kept on 22–23 October, of the weeping of Our Lady before the village on 23 October 1803. A local and diocesan tradition; it has never been the subject of a Vatican investigation.",
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
export const devasahayam: Person = {
  "@type": "Person",
  "@id": DEVASAHAYAM_ID,
  name: "St Devasahayam Pillai",
  alternateName: ["Neelakanta Pillai", "Lazarus"],
  description:
    "Baptised at Vadakkankulam in 1745, taking the name Devasahayam. Canonised on 15 May 2022 — the first Indian layman to be declared a saint.",
  birthDate: "1712",
  deathDate: "1752",
  sameAs: "https://en.wikipedia.org/wiki/Devasahayam_Pillai",
  url: abs(ROUTES.devasahayam.path),
};

export const deBritto: Person = {
  "@type": "Person",
  "@id": DE_BRITTO_ID,
  name: "St John de Britto",
  alternateName: "Arulanandar",
  description:
    "Portuguese Jesuit missionary who raised the first thatched chapel of the Holy Family at Vadakkankulam in 1685. Martyred at Oriyur in 1693; canonised in 1947.",
  birthDate: "1647",
  deathDate: "1693",
  sameAs: "https://en.wikipedia.org/wiki/John_de_Britto",
};

/* ── The page you are on ───────────────────────────────────────────────────
   `about` → the shrine is the load-bearing edge: it says "this document is
   about that entity", which is how a page earns the right to be cited as a
   source *for the shrine* rather than as an unrelated document that happens to
   mention it.                                                                 */
export function pageNode(
  key: RouteKey,
  type: "WebPage" | "ContactPage" | "AboutPage" = "WebPage",
): WebPage {
  const r = ROUTES[key];
  return {
    "@type": type,
    "@id": `${abs(r.path)}#page`,
    url: abs(r.path),
    name: r.fullTitle,
    description: r.description,
    inLanguage: ["en", "ta"],
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
export function faqPage(faqs: { q: string; a: string }[]): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": `${abs(ROUTES.faq.path)}#faq`,
    url: abs(ROUTES.faq.path),
    name: ROUTES.faq.fullTitle,
    inLanguage: "en",
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

/** Home → this page. Every route below the home gets one. */
export function trailTo(key: keyof typeof ROUTES): BreadcrumbList {
  const r = ROUTES[key];
  if (key === "home") {
    return breadcrumbs([{ name: ROUTES.home.crumb, path: HOME_PATH }]);
  }
  return breadcrumbs([
    { name: ROUTES.home.crumb, path: HOME_PATH },
    { name: r.crumb, path: r.path },
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

/** The nodes every page should carry, so the entity is asserted site-wide. */
export function baseNodes(): Thing[] {
  return [shrine as Thing, parish as Thing, website as Thing];
}
