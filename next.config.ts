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
    /* ── WHY AVIF IS OFF, AND WHAT WOULD PUT IT BACK ────────────────────────
       AVIF is smaller on the wire and MUCH more expensive to turn back into
       pixels: it is AV1 intra-frame, decoded in software by dav1d, where WebP
       has a decade-old fast path everywhere. On a desktop that difference is
       invisible. On a mid-range Android it is a few hundred milliseconds per
       large photograph, and this site is uniquely exposed to that cost for a
       reason that has nothing to do with images: `ResidentImage` UNMOUNTS a
       picture once it is two viewports away and remounts it when it comes
       back, so that a phone is never holding all fifty-two bitmaps of the home
       page at once (see the long note in that component — it exists to stop
       iOS killing the tab). A remount reads the file from cache and DECODES IT
       AGAIN. So the format's decode cost is not paid once per image per visit;
       it is paid every time the reader scrolls back past one, all the way down
       a page that is mostly photographs. That is what "laggy everywhere, only
       on the phone" is made of.

       And the bytes it buys back are not what the format's reputation
       promises. Measured against this site's own images at w=828 q=75, AVIF vs
       WebP: bw-old-pic −36%, weeping-madonna-2 −38%, facade-day −12%,
       matha-midnight −3%, and architecture/altar +20% — AVIF is LARGER on the
       last one. Roughly a seventh on average, unevenly, for a decode that
       costs multiples.

       Chrome on Android is the build that was taking AVIF (Safari asks for it
       too). Both are served WebP now.

       Put AVIF back if the decode ever stops mattering — i.e. if
       `ResidentImage`'s remounting is dropped because phones have the memory,
       or if the photographs are pre-encoded at sizes small enough that no
       decode is slow. Re-measure before believing either. */
    formats: ["image/webp"],
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
      // The hero's scrub films and its poster. Next's default for /public is
      // `max-age=0, must-revalidate`, which costs a revalidation round trip
      // for every one of these on every visit — and the phone's cut is 2.75 MB
      // fetched before the reader has scrolled anything, on a site whose
      // readers are largely on Indian mobile data.
      //
      // A day, not a year, and no `immutable`: every one of these filenames is
      // stable, so re-running scripts/gen-hero-mobile.mjs (or the frame
      // generator) changes the bytes at an unchanged URL. A day means a re-cut
      // film reaches everyone by tomorrow; `immutable` would mean a year of
      // the old one.
      {
        source: "/hero-frames/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/:file(hero-mobile.mp4|hero-video.mp4)",
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
