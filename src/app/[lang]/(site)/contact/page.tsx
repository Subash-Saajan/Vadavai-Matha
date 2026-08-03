import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/JsonLd";
import { graph, pageNode, trailTo } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

import { ContactExperience } from "./ContactExperience";

/**
 * The server half of /contact.
 *
 * This file exists so the route can export `metadata` and structured data at
 * all — a `"use client"` module cannot. It was the only route on the site that
 * had solved this; /history, /architecture, /mass-timings and /saints have now
 * been given the same treatment.
 *
 * The `shrine` and `parish` nodes used to be declared inline here, where no
 * other page could reach them. They now live in src/lib/schema.ts and are
 * emitted site-wide from the root layout, so this page contributes only what is
 * genuinely its own: that it is the ContactPage, and where it sits in the tree.
 * One entity, described once.
 */
/**
 * THIS PAGE'S TITLE DELIBERATELY OMITS "LITTLE ROME", and it is the only page
 * on the site that does.
 *
 * Search Console, 2 August 2026, for the query "little rome":
 *
 *     /contact   17 clicks, 28 impressions, position 3.2
 *     /          0 clicks,   3 impressions, position 1.0
 *
 * Read that carefully: when Google shows the HOME page for this query it ranks
 * FIRST — better than this page does. The home page is not weaker. Google is
 * simply picking this page nine times out of ten, and then ranking it worse.
 * That is a page-selection problem, not a ranking one, and every one of those
 * 17 clicks teaches Google the choice was right.
 *
 * Why it picks this page: the root layout's title template appends
 * "· Little Rome" to every route, so this page's title was literally
 * "Contact & Visit · Little Rome" — an exact match for the query, on a page
 * whose whole subject is visiting the place. The h1 was already changed to
 * defer ("Come to the Shrine"); the title never was, which left the strongest
 * signal of the two still pointing here.
 *
 * So the title is absolute, and carries the village instead of the brand. The
 * page keeps every other way of being found — its description still says
 * Little Rome, the schema still names it, and nobody looking for directions
 * will fail to find it. It simply stops competing with the home page for the
 * home page's own name.
 *
 * If "little rome" ever settles on "/" in GSC, this can go back to
 * `localizedMetadata("contact")` — but check the numbers first, not the hunch.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "ta" ? "ta" : "en";
  return pageMetadata("contact", l, {
    title: {
      absolute:
        l === "ta"
          ? "தொடர்பும் வருகையும் — வடக்கன்குளம் திருக்குடும்பத் திருத்தலம்"
          : "Contact & Visit — Holy Family Shrine, Vadakkankulam",
    },
  });
}

export const viewport: Viewport = {
  themeColor: "#0a1322",
};

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";

  /* Built here, not at module scope: a module-level graph is evaluated once at
     import, before any locale exists, so /ta emitted the English node. */
  const jsonLd = graph(
    pageNode("contact", "ContactPage", lang),
    trailTo("contact", lang),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactExperience />
    </>
  );
}
