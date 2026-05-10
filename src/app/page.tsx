import { Hero } from "@/components/sections/Hero";
import { Patroness } from "@/components/sections/Patroness";
import { About } from "@/components/sections/About";
import { Verse } from "@/components/sections/Verse";
import { ScrollShowcase } from "@/components/sections/ScrollShowcase";
import { FestivalsTeaser } from "@/components/sections/FestivalsTeaser";
import { MassTimes } from "@/components/sections/MassTimes";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { VisitCTA } from "@/components/sections/VisitCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Patroness />
      <About />
      <Verse />
      <ScrollShowcase />
      <FestivalsTeaser />
      <MassTimes />
      <GalleryPreview />
      <VisitCTA />
    </>
  );
}
