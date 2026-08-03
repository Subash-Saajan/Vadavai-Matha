import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A verification build must NOT share `.next` with a running `next dev`.
  // `next build` rewrites .next/static, .next/server and the manifests, which
  // pulls the ground out from under the dev server still serving from them —
  // the browser then gets a mix of fresh and stale chunks and the page renders
  // with whatever CSS survived. It looks exactly like a caching bug and it is
  // maddening to chase.
  //
  // So: any build run purely to check that the code compiles sets
  // NEXT_VERIFY_BUILD=1 and lands in its own directory, leaving the dev
  // server's .next untouched. Real deploy builds (Vercel) set nothing and
  // behave normally.
  distDir: process.env.NEXT_VERIFY_BUILD ? ".next-verify" : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Fonts in /public are served at a fixed URL, so Next gives them
  // `Cache-Control: public, max-age=0` — safe, but it costs every visitor a
  // revalidation round trip per font on every page load, before any Tamil text
  // can paint.
  //
  // The filenames now carry a content hash (kumudam-tamil.480cac5d.woff2), so
  // the bytes at a given URL can never change: swapping a font produces a new
  // hash and therefore a new URL. That makes it safe to cache them forever.
  //
  // If you replace a font file, recompute the hash and update BOTH the @font-face
  // src in globals.css and PreloadTamilFonts.tsx. Forgetting gives a loud 404
  // rather than a silently stale font, which is the failure mode we want.
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // The hero's mobile scrub frames. useScrubMedia deliberately does NOT
      // hold the whole sequence in memory — it keeps a window around the
      // playhead and drops the rest, because holding 150 decoded frames is
      // what kills the page on an iPhone. That trade only works if a dropped
      // frame comes back from the disk cache instead of the network, and
      // Next's default for /public (`max-age=0, must-revalidate`) costs a
      // round trip per frame every time the reader scrolls back up to the top.
      //
      // A day, not a year, and no `immutable`: these filenames are stable
      // (f001.webp…), so re-running scripts/gen-scrub-frames.mjs changes the
      // bytes at an unchanged URL. A day means a re-cut film reaches everyone
      // by tomorrow; `immutable` would mean a year of the old one.
      {
        source: "/hero-frames/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The home moved from /home to the root at launch. Anything that ever
      // linked /home — old shares, the pre-launch sitemap Google may have
      // cached — lands on the canonical root rather than a 404.
      { source: "/home", destination: "/", permanent: true },
      // Festivals were merged into the combined "Mass & Festivals" page.
      { source: "/festivals", destination: "/mass-timings", permanent: true },
      /* ⚠ `/gallery` USED TO 301 HERE. The old home-page gallery section was
         folded into /architecture and the URL was pointed at it. There is a
         real page at /gallery again (app/[lang]/(site)/gallery), so the
         redirect is gone — leaving it would have made the new route
         unreachable, and a `permanent: true` that a browser has already cached
         makes that failure look like a routing bug rather than a redirect.

         Nothing replaces it: the route exists, it is in INDEXABLE, and the
         sitemap advertises it in both languages. */
    ];
  },
};

export default nextConfig;
