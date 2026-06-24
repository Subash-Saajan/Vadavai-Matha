import { Hero } from "@/components/sections/Hero";
import { Patroness } from "@/components/sections/Patroness";
import { About } from "@/components/sections/About";
import { Saints } from "@/components/sections/Saints";
import { Verse } from "@/components/sections/Verse";
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
      <Saints />
      <Verse />
      <FestivalsTeaser />
      <MassTimes />
      <GalleryPreview />
      <VisitCTA />
    </>
  );
}
