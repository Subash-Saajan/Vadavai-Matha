import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Patroness } from "@/components/sections/Patroness";
import { About } from "@/components/sections/About";
import { Saints } from "@/components/sections/Saints";
import { Verse } from "@/components/sections/Verse";
import { FestivalsTeaser } from "@/components/sections/FestivalsTeaser";
import { MassTimes } from "@/components/sections/MassTimes";
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

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Patroness />
      <About />
      <Saints />
      <Verse />
      <FestivalsTeaser />
      <MassTimes />
      <GalleryPreview />
      <VisitCTA />
    </>
  );
}
