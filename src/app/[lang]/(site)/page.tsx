import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Patroness } from "@/components/sections/Patroness";
import { About } from "@/components/sections/About";
import { Chronicle } from "@/components/sections/Chronicle";
import { Weeping } from "@/components/sections/Weeping";
import { Fathers } from "@/components/sections/Fathers";
import { Saints } from "@/components/sections/Saints";
import { Verse } from "@/components/sections/Verse";
import { ParishRhythm } from "@/components/sections/ParishRhythm";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { VisitCTA } from "@/components/sections/VisitCTA";
import { apparitionFeast, feast, graph, pageNode, trailTo } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// The homepage's <title> LEADS with "Little Rome" (an absolute title, so the
// `%s · Little Rome` template does not also append it). This is deliberate: the
// contact page was out-ranking the homepage for the brand query "Little Rome"
// because its H1 was literally "Come to Little Rome" while the homepage's title
// buried the term at the end. The contact H1 has been changed to defer, and the
// homepage now claims the term first — the two together stop the pages
// cannibalising each other for their own brand name.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "ta" ? "ta" : "en";
  return pageMetadata("home", l, {
    title: {
      absolute:
        l === "ta"
          ? "சின்ன ரோமாபுரி — வடக்கன்குளம் திருக்குடும்ப திருத்தலம் (வடவை மாதா)"
          : "Little Rome — Holy Family Shrine, Vadakkankulam (Vadavai Matha)",
    },
  });
}

// Both dated observances ride on the home page: they are the facts most people
// arrive wanting, and the home page is the URL most likely to be cited. The
// October commemoration has never been published on this site at all.
const jsonLd = graph(
  pageNode("home"),
  feast(),
  apparitionFeast(),
  trailTo("home"),
);

/**
 * THE RUNNING ORDER, AND WHY IT IS THIS ONE.
 *
 * What was here before ran Hero → Patroness → About → Saints → Verse →
 * Festivals → Mass → Gallery → Visit: six sections after the hero, pointing at
 * three destinations, two of which were the same page. /history and /priests —
 * eight sourced chapters and a 328-year succession, the two things this parish
 * has that nobody else has — appeared on the home page nowhere at all, and
 * /priests was reachable from no link on the entire site.
 *
 * Three things drove the re-sequence.
 *
 *   1. THE HISTORY GOES HIGH, NOT LOW. Most readers never reach the foot of a
 *      home page, so the strongest material cannot live there. The Chronicle
 *      and the Fathers sit third and fifth, while attention is still intact;
 *      the logistics that used to occupy that space moved down.
 *   2. NO TWO NEIGHBOURS SHARE A FORM. Chronicle is a moving strip, Weeping is
 *      one full-bleed moment, Fathers is a row of faces, Saints is two portrait
 *      cards, Rhythm is cards over a plate, Gallery is a mosaic. The old page
 *      ran grid, grid, grid — and an eye that has classified a page as
 *      repeating cards stops reading it.
 *   3. ONE DESTINATION, ONE SECTION. Festivals and Mass were two full sections
 *      opening one page; they are one section in two bands now (ParishRhythm),
 *      which is what paid for the two new sections without lengthening the page.
 *
 * Destinations went from three to six: /history, /priests, /saints/… (both
 * cards, de Britto's now goes to his own page instead of the timeline),
 * /mass-timings, /architecture, /contact.
 *
 * Hero, Patroness and About are untouched. They were working.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Patroness />
      <About />
      <Chronicle />
      <Weeping />
      <Fathers />
      <Saints />
      <Verse />
      <ParishRhythm />
      <GalleryPreview />
      <VisitCTA />
    </>
  );
}
