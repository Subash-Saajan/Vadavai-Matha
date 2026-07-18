import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
