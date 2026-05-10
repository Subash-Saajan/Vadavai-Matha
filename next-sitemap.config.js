/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://vadavaimatha.org",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  additionalPaths: async () => [
    { loc: "/", priority: 1.0, changefreq: "daily" },
    { loc: "/history", priority: 0.8 },
    { loc: "/gallery", priority: 0.7 },
    { loc: "/festivals", priority: 0.8 },
    { loc: "/mass-timings", priority: 0.9 },
    { loc: "/contact", priority: 0.7 },
  ],
};
