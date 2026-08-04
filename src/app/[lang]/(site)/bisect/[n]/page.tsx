import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

/* ── THE HOME PAGE, TRUNCATED, FOR BISECTING THE iOS TAB KILL ──────────────
   /bisect/0 … /bisect/11 render the first N sections of the home page and
   nothing else. Binary-search them on the failing device: four reloads over
   eleven sections names the culprit exactly.

     /bisect/0   the shared layout alone — Navbar, <main>, Footer, globals.css
     /bisect/1   + Hero
     /bisect/2   + Patroness      …and so on, in the home page's own order.

   ⚠ WHY THIS IS A ROUTE AND NOT A `?sections=` FLAG.
   Every page on this site is prerendered without a query string, so a page
   that branched on one would have to do it AFTER hydration — and the whole
   question here is whether the tab dies BEFORE React ever runs. Pruning
   sections client-side would arrive too late to prove anything. These are
   separate static builds, so a section that is excluded is genuinely absent
   from the HTML the phone parses.

   Everything else is held constant on purpose: same layout, same fonts, same
   stylesheet, same components in the same order. The ONLY variable is how
   many sections exist.

   ── WHAT THIS REPLACED, AND WHY THE OLD INSTRUMENTS WERE NO GOOD ──
   `?probe=nofilm` forced the hero onto the EXPENSIVE stills path, so it could
   only ever make the page heavier — its "no change" result was meaningless.
   The flight recorder in lib/blackbox.ts went through four iterations and
   still only ever produced one row. And both only ever interrogated the hero,
   which is now conclusively cleared: iPhones still die with no canvas, no
   decoder and no frame sequence on the page at all.

   DELETE THIS ROUTE once the cause is found. It is scaffolding, it is not in
   INDEXABLE so it stays out of the sitemap, and it carries noindex below. */

const SECTIONS = [
  Hero,
  Patroness,
  About,
  Chronicle,
  Weeping,
  Fathers,
  Saints,
  Verse,
  ParishRhythm,
  GalleryPreview,
  VisitCTA,
] as const;

export function generateStaticParams() {
  return Array.from({ length: SECTIONS.length + 1 }, (_, n) => ({ n: String(n) }));
}

export const metadata: Metadata = {
  title: "Bisect",
  robots: { index: false, follow: false },
};

export default async function Bisect({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const count = Number(n);
  if (!Number.isInteger(count) || count < 0 || count > SECTIONS.length) notFound();

  return (
    <>
      {SECTIONS.slice(0, count).map((Section, i) => (
        <Section key={i} />
      ))}
    </>
  );
}
