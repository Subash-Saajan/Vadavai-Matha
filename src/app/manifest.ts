import type { MetadataRoute } from "next";

import { HOME_PATH, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

/**
 * Web app manifest.
 *
 * Modest but not pointless: it is what lets a pilgrim "Add to Home Screen" and
 * keep the Mass timings a tap away, and it is one of the signals Google uses to
 * judge a site installable and mobile-serious. Icons are composited from the
 * cut-out church PNG onto the brand navy (see scripts that produced public/icon-*).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Little Rome",
    description: SITE_TAGLINE,
    start_url: HOME_PATH,
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#0a1628",
    lang: "en",
    categories: ["travel", "education", "lifestyle"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
