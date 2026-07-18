import type { MetadataRoute } from "next";

import { INDEXABLE, ROUTES, abs } from "@/lib/seo";

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
 * The coming-soon "/" is deliberately absent — it is `noindex`, and listing a
 * noindex URL in a sitemap is an error Search Console will report back at you.
 *
 * `images` gives Google the lead photo per page. The shrine's own photographs
 * are its strongest asset (there are ~70 of them) and image search is a real
 * discovery path for a pilgrimage site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build time. Honest enough while the site is in active pre-launch change;
  // if the content ever settles, move to a per-route date rather than lying.
  const lastModified = new Date();

  return INDEXABLE.map((key) => {
    const r = ROUTES[key];
    return {
      url: abs(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      images: [abs(r.image)],
    };
  });
}
