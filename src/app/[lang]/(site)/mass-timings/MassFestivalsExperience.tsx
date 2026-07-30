"use client";

import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";

import { MassOverture } from "@/components/sections/mass/MassOverture";
import { TheDay } from "@/components/sections/mass/TheDay";
import { TheWeek } from "@/components/sections/mass/TheWeek";
import { TheRegister } from "@/components/sections/mass/TheRegister";
import { TheAnnualFeast } from "@/components/sections/mass/TheAnnualFeast";
import { TheYear } from "@/components/sections/mass/TheYear";
import { MarianDays } from "@/components/sections/mass/MarianDays";
import { MassColophon } from "@/components/sections/mass/MassColophon";

/**
 * /mass-timings — the shrine's three clocks, in the order a visitor asks about
 * them: the day, the week, the month, then the year.
 *
 *   —    MassOverture   — the brass plate: is Mass on now, when is the next
 *        one, and what does this page hold. Lifted into the foot of the hero,
 *        the same idiom /contact opens with.
 *   I    TheDay         — the ordinary day drawn as an arc from first light to
 *        Benediction, with the open chapel filling the eleven hours between.
 *   II   TheWeek        — seven columns; six plain, one gilded.
 *   III  TheRegister    — the monthly devotions read as a ruled register.
 *   IV   TheAnnualFeast — the ten days of the Assumption. THE ONE PANEL THE
 *        OWNER ASKED TO KEEP; its shape is unchanged, see the file's own note.
 *   V    TheYear        — the eight parish feasts hung down a calendar spine.
 *   VI   MarianDays     — the two days that belong to Our Lady alone.
 *   —    MassColophon   — ring before you travel. Not a CTA panel: this page
 *        ends the way /architecture ends.
 *
 * WHY THIS IS EIGHT COMPONENTS AND NOT ONE FILE. It was one file, and every
 * band in it was the same band — a heading, then cards. Splitting it is what
 * made it possible for each section to be a different KIND of object (an arc, a
 * grid of columns, a register, a plate, a spine, two tablets) instead of the
 * same card at six sizes. /architecture is built the same way and for the same
 * reason.
 *
 * GROUND RHYTHM — never two true-darks in a row, and no two adjacent light
 * sections on the same cream tier:
 *   hero(dark) → plate(white) → cream → cream-dark → DARK → cream →
 *   cream-dark → DARK → cream(close)
 *
 * ANCHORS. `#festivals` is load-bearing — the home page's rhythm cards, the
 * footer and the old teaser all link to it — and lives on TheAnnualFeast.
 * `#mass` is the page's older anchor, kept below as an empty target so any link
 * out in the world still lands on the timings rather than the top of the page.
 */
export default function MassFestivalsExperience() {
  const { t } = useLang();

  return (
    <main>
      <PageHero
        label={t.mass.label}
        title={t.mass.title}
        intro={t.mass.intro}
        image="/images/fest-noon.jpg"
        alt="The crowned statue of Our Lady of the Assumption on her flower-decked processional chariot during the August feast, an angel kneeling either side and the church spire rising behind"
      />

      <MassOverture />

      {/* The retired anchor. Empty, unstyled, scroll-offset to clear the nav. */}
      <span id="mass" className="block scroll-mt-24" aria-hidden="true" />

      <TheDay />
      <TheWeek />
      <TheRegister />
      <TheAnnualFeast />
      <TheYear />
      <MarianDays />
      <MassColophon />
    </main>
  );
}
