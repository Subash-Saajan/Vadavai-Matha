import type { MetadataRoute } from "next";

import { INDEXABLE, ROUTES, abs } from "@/lib/seo";
import { LOCALES, localePath } from "@/lib/locale";

/**
 * The sitemap.
 *
 * There was already a fully-written `next-sitemap.config.js` in this repo —
 * routes, priorities and all. It never ran once: `next-sitemap` executes from a
 * `postbuild` script, and package.json had no `postbuild`. So the site has been
 * live with no sitemap and no robots.txt. Rather than repair a dead dependency,
 * this is Next 16's native convention: typed, generated at build, and reading
 * the same ROUTES table the canonicals and breadcrumbs read, so a new page
 * cannot be added to the site and forgotten by search.
 *
 * The site has LAUNCHED, so "/" is now the real home and is listed here. (It
 * was absent while it was the `noindex` coming-soon page — listing a noindex
 * URL in a sitemap is an error Search Console reports back at you.)
 *
 * `images` gives Google the lead photo per page. The shrine's own photographs
 * are its strongest asset (there are ~70 of them) and image search is a real
 * discovery path for a pilgrimage site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Every page is listed once per language. The `alternates.languages` pair is
  // the sitemap half of the hreflang contract the pages declare in their
  // metadata — Google wants the relationship asserted in both places, and
  // without it `/faq` and `/ta/faq` compete as duplicates instead of ranking
  // each for its own language.
  return INDEXABLE.flatMap((key) => {
    const r = ROUTES[key];
    const languages = {
      "en-IN": abs(r.path),
      "ta-IN": abs(localePath("ta", r.path)),
    };

    return LOCALES.map((lang) => ({
      url: abs(localePath(lang, r.path)),
      // Per-route, hand-maintained (see RouteDef.lastModified). This was
      // `new Date()` — build time — which told Google on every single deploy
      // that all 22 URLs had changed. A sitemap that says everything changed
      // always is a sitemap whose `lastmod` Google learns to ignore, and this
      // one needs to be believed.
      //
      // Both language twins share the route's date. The Tamil page is a
      // translation of the same content, so when the English changes the Tamil
      // is stale until re-translated — one date is the honest reading.
      lastModified: r.lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      images: [abs(r.image)],
      alternates: { languages },
    }));
  });
}
