/**
 * SEO surface: the one place that knows what pages exist, what each is called,
 * and where it lives.
 *
 * `src/lib/contact.ts` owns the real-world FACTS (address, phone, feast dates).
 * This file owns how those facts are PRESENTED to a crawler. The sitemap, the
 * canonicals, the Open Graph cards and the breadcrumbs all read the `ROUTES`
 * table below — so a page cannot be added to the site and forgotten by search.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * RULE (inherited from contact.ts): no invented facts. Every claim in a title
 * or description below is one the shrine has published — 1685, the two naves,
 * the 6–15 August feast, the 1926 "Little Rome" title. Nothing is embellished
 * for keywords; an AI that cites us must not be made to repeat a fiction.
 * ─────────────────────────────────────────────────────────────────────────
 */
import type { Metadata } from "next";

import { SITE_URL } from "./contact";
import { localePath, type Locale } from "./locale";
import { ROUTES_TA, type RouteCopy } from "./seo-ta";

export { SITE_URL };

/** Shown as `og:site_name` and after the `·` in every title. */
export const SITE_NAME = "Little Rome · Holy Family Shrine, Vadakkankulam";

/** Wordier than SITE_NAME; used where the brand must stand alone. */
export const SITE_TAGLINE =
  "The Marian pilgrimage shrine of Vadakkankulam, Tamil Nadu — called Little Rome since 1926.";

/* ── Home lives at the root ─────────────────────────────────────────────────
   LAUNCHED. The coming-soon holding page has been removed; the real home is the
   site index, and "/home" 301s onto "/" (see next.config.ts). The root URL is
   where links, citations and Knowledge-Graph authority land, so it IS the
   homepage.

   HOME_PATH stays a named constant rather than a bare "/" scattered about,
   because the canonical, the sitemap, the breadcrumbs, the schema `url` and the
   manifest start_url all read it — one edit here still moves them together. */
export const HOME_PATH = "/";

/** Absolute URL for a site-relative path, with no double slash at the root. */
export function abs(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/* ── The page table ────────────────────────────────────────────────────────
   `priority` and `changeFrequency` are hints, not commands — Google mostly
   ignores them. They are kept honest anyway: mass-timings changes with the
   liturgical year, the history of 1685 does not.                             */
export type RouteKey =
  | "home"
  | "history"
  | "architecture"
  | "massTimings"
  | "contact"
  | "devasahayam"
  | "deBritto"
  | "faq"
  | "priests"
  | "sources"
  | "gallery"
  | "acknowledgements";

export type RouteDef = {
  /** Site-relative. The home's path is the launch-dependent HOME_PATH. */
  path: string;
  /** Goes through the `%s · Little Rome` template in the root layout. */
  title: string;
  /** The `<title>` when this page must stand alone (OG cards, breadcrumbs). */
  fullTitle: string;
  description: string;
  /** Crumb label. */
  crumb: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  /** The real photograph on the page. Fed to the image sitemap at full size. */
  image: string;
  /** The 1200x630 share card cut from that photograph (see public/og/).
   *  Kept separate because an image sitemap wants the real picture, while a
   *  share card must be exactly 1.91:1 or the platforms crop it themselves. */
  ogImage: string;
};

export const ROUTES: Record<RouteKey, RouteDef> = {
  home: {
    path: HOME_PATH,
    // The title carries the most-searched alias, "Vadavai Matha", beside the
    // formal name — the two queries that most often mean this place. The
    // description then front-loads the other priority names (Our Lady of the
    // Assumption, Paraloga Matha, St Devasahayam) into the ~155 characters
    // Google actually shows, so a search for any of them finds this page.
    title: "Holy Family Shrine (Vadavai Matha), Vadakkankulam",
    fullTitle: "Vadavai Matha — Holy Family Shrine, Vadakkankulam (Little Rome)",
    description:
      "The Holy Family Shrine at Vadakkankulam, Tamil Nadu — the Marian pilgrimage shrine of Our Lady of the Assumption, known as Vadavai Matha and Paraloga Matha, and honoured as Little Rome (Chinna Romapuri) since 1926. Founded in 1685 by St John de Britto; the parish where St Devasahayam Pillai was baptised in 1745.",
    crumb: "Home",
    priority: 1.0,
    changeFrequency: "weekly",
    image: "/images/architecture/facade.jpg",
    ogImage: "/og/home.jpg",
  },
  history: {
    path: "/history",
    // "vadakkankulam church history in tamil" is a real measured query (GSC,
    // July 2026), so the village name belongs in the <title>, not only in the
    // description. The `title` field is what goes through the `%s · Little Rome`
    // template; `fullTitle` only ever reaches a share card, so detail parked
    // there was invisible to search.
    title: "History of Vadavai Matha, Vadakkankulam",
    fullTitle: "History of the Holy Family Shrine (Vadavai Matha), 1685 to today",
    description:
      "Four centuries of Vadavai Matha, the Holy Family Shrine of Our Lady of the Assumption at Vadakkankulam: St John de Britto's thatched chapel of 1685, the baptism of St Devasahayam Pillai in 1745, the coming of the statue and the weeping of 1803, the great two-nave church of 1855–1872, and the shrine declared in 1993.",
    crumb: "History",
    priority: 0.8,
    changeFrequency: "yearly",
    image: "/images/bw-old-pic.jpg",
    ogImage: "/og/history.jpg",
  },
  architecture: {
    path: "/architecture",
    // "Architecture" alone was a 12-character title that named neither the
    // building nor the village. The two converging naves are the one thing about
    // this church believed to exist nowhere else in India — it should be the
    // first thing the <title> says.
    title: "The Two-Nave Church, Vadakkankulam",
    fullTitle: "The Two-Nave Church — architecture of Little Rome",
    description:
      "The 'open-compass' church of Vadakkankulam: two converging naves meeting at a single altar, a plan believed unique in India. Foundation stone laid 1855, blessed 1872 — its towers, bells, vaults and glass.",
    crumb: "Architecture",
    priority: 0.7,
    changeFrequency: "yearly",
    image: "/images/architecture/nave.jpg",
    ogImage: "/og/architecture.jpg",
  },
  massTimings: {
    path: "/mass-timings",
    title: "Mass Timings & Feasts, Vadakkankulam",
    fullTitle: "Mass Timings & the Feasts of the Year",
    description:
      "Daily and Sunday Mass at the Holy Family Shrine, Vadakkankulam, with the feasts of the liturgical year — including the ten-day annual feast of Our Lady of the Assumption, 6–15 August, and the chariot, which leaves at 11:00 PM on 14 August and is drawn around the village through the night.",
    crumb: "Mass & Feasts",
    priority: 0.9,
    changeFrequency: "monthly",
    image: "/images/fest-drone.jpg",
    ogImage: "/og/mass-timings.jpg",
  },
  contact: {
    path: "/contact",
    title: "Contact & Visit",
    fullTitle: "Contact & Visit the Shrine",
    description:
      "Reach the Holy Family Shrine at Vadakkankulam — Little Rome. Parish office 04637 230134, Mass timings, directions from Nagercoil and Tirunelveli, and how to request a Mass intention or a certificate from the parish register.",
    crumb: "Contact & Visit",
    priority: 0.9,
    changeFrequency: "monthly",
    image: "/church-interior.jpeg",
    ogImage: "/og/contact.jpg",
  },
  devasahayam: {
    path: "/saints/devasahayam-pillai",
    // Google has never discovered this URL (URL Inspection, 30 Jul 2026) even
    // though it has sat in the sitemap since 12 July and carries 11 inbound
    // internal links. It is also the site's highest-volume subject — the first
    // Indian layman canonised. The year is what distinguishes this page from the
    // hundreds of others about him: this is where the baptism happened.
    title: "St Devasahayam Pillai, baptised here 1745",
    fullTitle: "St Devasahayam Pillai — baptised at this parish, 1745",
    description:
      "St Devasahayam Pillai was baptised at this church on 14 May 1745 — the place the Holy See's own record of his cause names. His life, the errand for timber that destroyed him, his wife's grave in this parish, and what the evidence for each of it is. Canonised 15 May 2022, the first layperson of Indian birth raised to the altars.",
    crumb: "St Devasahayam Pillai",
    priority: 0.8,
    changeFrequency: "yearly",
    image: "/images/saints/devasahayam-pillai.jpg",
    ogImage: "/og/devasahayam.jpg",
  },
  deBritto: {
    path: "/saints/john-de-britto",
    // Tamil Catholics search "Arulanandar", not "de Britto". Leaving his Tamil
    // name out of the <title> forfeited the more common of the two queries.
    title: "St John de Britto (Arulanandar)",
    fullTitle: "St John de Britto (Arulanandar) — founder of the parish, 1685",
    description:
      "St John de Britto — Arulanandar — the Jesuit from whose coming in 1685 Vadakkankulam counts its founding. His life, his last letter from the prison of Oriyur, and an honest account of what the evidence for the founding actually is. Born Lisbon 1647; martyred 4 February 1693; canonised 1947.",
    crumb: "St John de Britto",
    priority: 0.8,
    changeFrequency: "yearly",
    image: "/images/de-britto-grotto.jpg",
    ogImage: "/og/john-de-britto.jpg",
  },
  faq: {
    path: "/faq",
    title: "Questions & Answers about the Shrine",
    fullTitle: "Questions & Answers about the Shrine",
    description:
      "When is the feast? What are the Mass timings? Who was St Devasahayam Pillai? Why is Vadakkankulam called Little Rome? Is this the same as Velankanni? Plain answers about the Holy Family Shrine, Vadakkankulam.",
    crumb: "Questions & Answers",
    priority: 0.8,
    changeFrequency: "monthly",
    image: "/images/architecture/altar.jpg",
    ogImage: "/og/faq.jpg",
  },
  // The most *original* page on the site, and the description is written to say
  // so. Sixty-nine named priests since 1697 exist in no indexed database
  // anywhere — not the diocese's site, not Wikipedia, not the Jesuit archives'
  // own catalogue. Six of these names (Bergenthal, Calini, Massour, Rossignol,
  // Giuliani, Cardoza) return nothing on the open web at all, so this page is a
  // net addition to the record rather than a restatement of it.
  priests: {
    path: "/priests",
    title: "The Fathers of Vadavai",
    fullTitle: "The Fathers of Vadavai — the parish priests of Vadakkankulam since 1697",
    description:
      "The complete succession of parish priests of the Holy Family Shrine, Vadakkankulam (Vadavai Matha), numbered 1 to 69 from Fr Bernard de Saa in 1697 to today — with their Tamil honorific names, the Jesuits of the old Madurai Mission, the priest who authenticated the weeping of 1803, the builders of the 1872 church, and the six who are buried behind it.",
    crumb: "The Fathers",
    priority: 0.7,
    changeFrequency: "yearly",
    image: "/images/architecture/archival.jpg",
    ogImage: "/og/priests.jpg",
  },
  sources: {
    path: "/sources",
    title: "Sources & Further Reading",
    fullTitle: "Sources & Further Reading",
    description:
      "Every historical claim on this site rests on a document. The Jesuit archives in Rome and Paris, the printed mission histories, the colonial gazetteers, the Vatican's own record of St Devasahayam's baptism here — and an honest note on which of our traditions are documented and which are not.",
    crumb: "Sources",
    priority: 0.6,
    changeFrequency: "yearly",
    image: "/images/architecture/archival.jpg",
    ogImage: "/og/sources.jpg",
  },
  // ⚠ `/gallery` HAS BEEN A 301 TO /architecture SINCE THE OLD gallery section
  // was folded into that page. The redirect is removed in next.config.ts as of
  // this route's launch, so anything Google consolidated onto /architecture has
  // to be re-discovered — which is what the sitemap entry below is for. Do not
  // re-add the redirect: this is a real page again.
  //
  // The description names the SUBJECTS, not the medium. "Photo gallery" is a
  // query nobody types about a specific shrine; "the chariot", "the two-nave
  // church", "St Devasahayam Pillai" are. Google Images reads the page's own
  // captions and alt text (lib/gallery.ts), which is where the detail lives.
  gallery: {
    path: "/gallery",
    title: "Photographs of the Shrine, Vadakkankulam",
    fullTitle: "Photographs of Vadavai Matha — the shrine, the feast and the village",
    description:
      "The Holy Family Shrine at Vadakkankulam in photographs: the twin-towered façade, the two naves and the gilded high altar, the crowned statue of Vadavai Matha, the chariot of the August feast, the eight other churches of Little Rome, the graves behind the church — and the oldest known photograph of this church, printed in Paris in 1901.",
    crumb: "Photographs",
    priority: 0.7,
    changeFrequency: "monthly",
    image: "/images/fest-noon.jpg",
    ogImage: "/og/gallery.jpg",
  },
  // Deliberately absent from INDEXABLE while the page is a draft (see DRAFT in
  // src/lib/acknowledgements.ts). It still needs an entry here, because the
  // canonical, the hreflang pair and the breadcrumb all read this table.
  // The share card is borrowed from /sources until a card of its own is cut.
  acknowledgements: {
    path: "/acknowledgements",
    title: "Acknowledgements",
    fullTitle: "Acknowledgements — the people who made this site possible",
    description:
      "The photographs, the books, the memories and the corrections behind this website, and the people of Vadakkankulam and beyond who gave them. Listed alphabetically, by the kind of help given.",
    crumb: "Acknowledgements",
    priority: 0.4,
    changeFrequency: "yearly",
    image: "/images/architecture/archival.jpg",
    ogImage: "/og/sources.jpg",
  },
};

/** Sitemap/crawl order. The coming-soon "/" is deliberately absent: it is
 *  `noindex`, and advertising a noindex URL in a sitemap is a crawl-budget
 *  own goal that Search Console reports as an error. */
export const INDEXABLE: RouteKey[] = [
  "home",
  "massTimings",
  "contact",
  "history",
  "devasahayam",
  "deBritto",
  "faq",
  "architecture",
  "priests",
  "gallery",
  "sources",
];

/* ── Metadata builder ──────────────────────────────────────────────────────
   Every page calls this. It guarantees the three things the live site is
   currently missing on every route: a canonical, an og:url, and a share card. */
/**
 * The title/description/crumb for a route in a language.
 * Tamil falls back to English when `seo-ta.ts` has no entry, so a missing
 * translation degrades to English rather than to an empty tag.
 */
export function routeCopy(key: RouteKey, lang: Locale): RouteCopy {
  const r = ROUTES[key];
  const en: RouteCopy = {
    title: r.title,
    fullTitle: r.fullTitle,
    description: r.description,
    crumb: r.crumb,
  };
  return lang === "ta" ? { ...en, ...(ROUTES_TA[key] ?? {}) } : en;
}

/** The `<title>` template and default, per language. */
export function siteTitle(lang: Locale): { template: string; default: string } {
  return lang === "ta"
    ? {
        template: "%s · சின்ன ரோமாபுரி",
        default: "திருக்குடும்பத் திருத்தலம், வடக்கன்குளம் — சின்ன ரோமாபுரி",
      }
    : {
        template: "%s · Little Rome",
        default: "Holy Family Shrine, Vadakkankulam — Little Rome",
      };
}

export function siteDescription(lang: Locale): string {
  return routeCopy("home", lang).description;
}

/**
 * The `generateMetadata` export for a static route under `app/[lang]`.
 * Pages say `export const generateMetadata = localizedMetadata("faq")` — the
 * locale is read from the route, so `/faq` and `/ta/faq` get different tags.
 */
export function localizedMetadata(key: RouteKey) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ lang: string }>;
  }): Promise<Metadata> {
    const { lang } = await params;
    return pageMetadata(key, lang === "ta" ? "ta" : "en");
  };
}

export function pageMetadata(
  key: RouteKey,
  lang: Locale = "en",
  overrides: Metadata = {},
): Metadata {
  const r = ROUTES[key];
  const c = routeCopy(key, lang);
  const url = abs(localePath(lang, r.path));

  return {
    title: c.title,
    description: c.description,
    // The canonical is this language's own URL, and the two language twins point
    // at each other with hreflang. Without this pair Google treats `/faq` and
    // `/ta/faq` as duplicates and picks one; with it, each ranks for its own
    // language. `x-default` sends an unmatched locale to the English page.
    alternates: {
      canonical: localePath(lang, r.path),
      languages: {
        "en-IN": abs(r.path),
        "ta-IN": abs(localePath("ta", r.path)),
        "x-default": abs(r.path),
      },
    },
    openGraph: {
      title: c.fullTitle,
      description: c.description,
      url,
      siteName: SITE_NAME,
      locale: lang === "ta" ? "ta_IN" : "en_IN",
      alternateLocale: lang === "ta" ? "en_IN" : "ta_IN",
      type: "website",
      images: [{ url: r.ogImage, width: 1200, height: 630, alt: c.fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.fullTitle,
      description: c.description,
      images: [r.ogImage],
    },
    ...overrides,
  };
}
