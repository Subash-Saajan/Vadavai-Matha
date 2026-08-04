"use client";

import { useLang } from "@/components/layout/LanguageProvider";
import { PageHero } from "@/components/sections/PageHero";

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
 *        building read as doctrine, nine numbers — four on the measured floor
 *        plan, five more at the altar, read against a photograph of it (three of
 *        those five mapped onto it; see AltarPhoto.tsx for why not all).
 *   VI   ImagesItCarries  — devotional detail: the two images the building
 *        holds, closing on the Marian inscription over the porch.
 *   VII  ThreeChurches    — history, deliberately moved LAST of the numbered
 *        sections: backstory lands better once a visitor is already hooked
 *        than as a gate up front.
 *
 * Roman numerals run I–VII; the opening Overture and the closing Colophon
 * stay unnumbered, as home leaves its Hero unnumbered. Numeral side alternates
 * with parity — odd (I, III, V, VII) sits left, even (II, IV, VI) sits right —
 * independent of which section holds the number, so reordering a section here
 * means only renumbering it, never re-siding it.
 *
 * NO VisitCTA. The "come and see / find your way here" panel was removed in
 * July 2026 at the owner's request; home is now the only page that carries it.
 * This page ends on the Colophon — a closing note rather than an invitation —
 * deliberately, so do not re-add the CTA as a "missing" component. The footer
 * still carries the parish address, the phone number and the contact link.
 *
 * Ground rhythm — never two true-darks (cathedral-depth) in a row until the
 * close, and no two adjacent light sections share the same cream tier:
 *   hero(dark) → cream → cream-dark → cream → DARK(Bells) → cream-dark →
 *   DARK(Creed) → cream → cream-dark → DARK(Colophon, last)
 *
 * The measured floor plan lives inside the Creed section, read as doctrine
 * rather than as a plan of the old caste seating. A scroll-scrubbed PeelFilm
 * once opened this page; it was never re-rendered after the stand-in footage
 * was dropped, and its component was deleted in August 2026 along with the
 * rest of the canvas-scrub stack (see useScrubVideo.ts for why that went).
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
    </main>
  );
}
