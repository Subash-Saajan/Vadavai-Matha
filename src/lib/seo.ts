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
  | "faq"
  | "sources";

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
    title: "History of Vadavai Matha",
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
    title: "Architecture",
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
    title: "Mass Timings & Feasts",
    fullTitle: "Mass Timings & the Feasts of the Year",
    description:
      "Daily and Sunday Mass at the Holy Family Shrine, Vadakkankulam, with the feasts of the liturgical year — including the ten-day annual feast of Our Lady of the Assumption, 6–15 August, and the chariot procession on 15 August.",
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
    title: "St Devasahayam Pillai",
    fullTitle: "St Devasahayam Pillai — baptised at this parish, 1745",
    description:
      "Neelakanta Pillai was baptised at Vadakkankulam in 1745, taking the name Devasahayam. Canonised on 15 May 2022, he is the first Indian layman to be declared a saint — and this is the parish of his baptism.",
    crumb: "St Devasahayam Pillai",
    priority: 0.8,
    changeFrequency: "yearly",
    image: "/images/saints/devasahayam-pillai.jpg",
    ogImage: "/og/devasahayam.jpg",
  },
  faq: {
    path: "/faq",
    title: "Questions & Answers",
    fullTitle: "Questions & Answers about the Shrine",
    description:
      "When is the feast? What are the Mass timings? Who was St Devasahayam Pillai? Why is Vadakkankulam called Little Rome? Is this the same as Velankanni? Plain answers about the Holy Family Shrine, Vadakkankulam.",
    crumb: "Questions & Answers",
    priority: 0.8,
    changeFrequency: "monthly",
    image: "/images/architecture/altar.jpg",
    ogImage: "/og/faq.jpg",
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
  "faq",
  "architecture",
  "sources",
];

/* ── Metadata builder ──────────────────────────────────────────────────────
   Every page calls this. It guarantees the three things the live site is
   currently missing on every route: a canonical, an og:url, and a share card. */
export function pageMetadata(key: RouteKey, overrides: Metadata = {}): Metadata {
  const r = ROUTES[key];
  const url = abs(r.path);

  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: r.path },
    openGraph: {
      title: r.fullTitle,
      description: r.description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      alternateLocale: "ta_IN",
      type: "website",
      images: [{ url: r.ogImage, width: 1200, height: 630, alt: r.fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: r.fullTitle,
      description: r.description,
      images: [r.ogImage],
    },
    ...overrides,
  };
}
