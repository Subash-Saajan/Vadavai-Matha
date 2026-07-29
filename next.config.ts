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
      // The Gallery page was reworked into the dedicated Architecture page.
      { source: "/gallery", destination: "/architecture", permanent: true },
    ];
  },
};

export default nextConfig;
