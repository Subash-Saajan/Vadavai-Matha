"use client";

import { useLang } from "@/components/layout/LanguageProvider";
import { PageHero } from "@/components/sections/PageHero";
import { VisitCTA } from "@/components/sections/VisitCTA";

import { Overture } from "@/components/sections/architecture/Overture";
import { ThreeChurches } from "@/components/sections/architecture/ThreeChurches";
import { HowItStands } from "@/components/sections/architecture/HowItStands";
import { Towers } from "@/components/sections/architecture/Towers";
import { Bells } from "@/components/sections/architecture/Bells";
import { LightAndDye } from "@/components/sections/architecture/LightAndDye";
import { Creed } from "@/components/sections/architecture/Creed";
import { ImagesItCarries } from "@/components/sections/architecture/ImagesItCarries";
import { Colophon } from "@/components/sections/architecture/Colophon";

/**
 * /architecture — ordered to follow how a visitor actually meets the church,
 * not how facts could be filed. (Originally the Overture teased six numerals
 * and every section existed only to resolve one, in that fixed order — a
 * trivia-answer structure that read as reference material, not an experience.
 * overtureP3 now says the intent directly: see it, hear it, step inside, look
 * up, then meaning.)
 *
 *   I    Towers          — what you'd see first, approaching: the twin
 *        towers, and the real reason for "Little Rome" — the design itself,
 *        not a height statistic (see the note in Towers.tsx).
 *   II   HowItStands      — looking up once inside: twenty-four arches with
 *        no iron, no cement, no timber — the engineering curiosity. Moved
 *        ABOVE Bells on purpose: it follows straight from Overture's
 *        architect/engineer paragraph while that's still fresh.
 *   III  Bells            — what you'd hear approaching: the twin French
 *        bells, and the older bell that rang the 1803 miracle.
 *   IV   LightAndDye      — the first-impression "wow" on stepping inside:
 *        stained glass and plant-dye colour.
 *   V    Creed            — the climax, held for the peak on purpose: the
 *        building read as doctrine, nine numbers — five on the measured floor
 *        plan, four more at the altar, read against a photograph of the reredos
 *        (two of those four mapped onto it; see AltarPhoto.tsx for why not all).
 *   VI   ImagesItCarries  — devotional detail: the two images the building
 *        holds, closing on the Marian inscription over the porch.
 *   VII  ThreeChurches    — history, deliberately moved LAST of the numbered
 *        sections: backstory lands better once a visitor is already hooked
 *        than as a gate up front.
 *
 * Roman numerals run I–VII; the opening Overture and the closing Colophon
 * stay unnumbered, as home leaves its Hero and VisitCTA unnumbered. Numeral
 * side alternates with parity — odd (I, III, V, VII) sits left, even
 * (II, IV, VI) sits right — independent of which section holds the number,
 * so reordering a section here means only renumbering it, never re-siding it.
 *
 * Ground rhythm — never two true-darks (cathedral-depth) in a row until the
 * close, and no two adjacent light sections share the same cream tier:
 *   hero(dark) → cream → cream-dark → cream → DARK(Bells) → cream-dark →
 *   DARK(Creed) → cream → cream-dark → DARK(Colophon) → CTA(dark)
 *
 * The measured floor plan lives inside the Creed section, read as doctrine
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
      <Towers />
      <HowItStands />
      <Bells />
      <LightAndDye />
      <Creed />
      <ImagesItCarries />
      <ThreeChurches />
      <Colophon />

      <VisitCTA />
    </main>
  );
}
