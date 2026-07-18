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

export const metadata: Metadata = pageMetadata("home");

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
