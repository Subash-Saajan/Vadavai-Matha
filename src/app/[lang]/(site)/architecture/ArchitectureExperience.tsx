"use client";

import { useLang } from "@/components/layout/LanguageProvider";
import { PageHero } from "@/components/sections/PageHero";
import { VisitCTA } from "@/components/sections/VisitCTA";

import { Overture } from "@/components/sections/architecture/Overture";
import { ThreeChurches } from "@/components/sections/architecture/ThreeChurches";
import { Creed } from "@/components/sections/architecture/Creed";
import { HowItStands } from "@/components/sections/architecture/HowItStands";
import { Towers } from "@/components/sections/architecture/Towers";
import { Bells } from "@/components/sections/architecture/Bells";
import { LightAndDye } from "@/components/sections/architecture/LightAndDye";
import { ImagesItCarries } from "@/components/sections/architecture/ImagesItCarries";
import { Colophon } from "@/components/sections/architecture/Colophon";

/**
 * /architecture — composed as the home page is: light narrative bands,
 * interrupted by dark "breath" sections that land on the two biggest ideas —
 * the building read as a creed (II), and the bells (V). Roman numerals run
 * I–VII; the opening Overture and the closing Colophon are deliberately
 * unnumbered, as home leaves its Hero and VisitCTA unnumbered.
 *
 * Ground rhythm — never two darks in a row until the close:
 *   hero(dark) → cream → cream-dark → DARK → cream-dark → cream → DARK →
 *   cream-dark → cream → DARK → CTA(dark)
 *
 * The measured floor plan lives inside the Creed section now, read as doctrine
 * rather than as a plan of the old caste seating; the scroll-scrubbed PeelFilm
 * that once opened this page remains in the repo, simply no longer imported.
 */
export default function ArchitectureExperience() {
  const { t } = useLang();
  const a = t.architecture;

  return (
    <main>
      <PageHero
        label={a.label}
        title={a.title}
        intro={a.intro}
        image="/images/architecture/facade.jpg"
        alt={a.heroAlt}
      />

      <Overture />
      <ThreeChurches />
      <Creed />
      <HowItStands />
      <Towers />
      <Bells />
      <LightAndDye />
      <ImagesItCarries />
      <Colophon />

      <VisitCTA />
    </main>
  );
}
