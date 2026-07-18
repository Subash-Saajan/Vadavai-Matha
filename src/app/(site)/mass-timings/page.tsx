import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { apparitionFeast, feast, graph, pageNode, trailTo } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

import MassFestivalsExperience from "./MassFestivalsExperience";

/** Server half of /mass-timings — see the note in ../history/page.tsx. */
export const metadata: Metadata = pageMetadata("massTimings");

/**
 * The feast carries a real date range, so it is the one node on this site that
 * can win a dated rich result — and "when is the Vadakkankulam feast" / "car
 * festival date" is the highest-intent question this shrine is ever asked.
 *
 * `feast()` computes the year rather than hard-coding it: a past-dated Event is
 * dropped by Google, so a literal "2026-08-06" would quietly stop working on
 * 16 August and nobody would notice until the following year.
 */
const jsonLd = graph(
  pageNode("massTimings"),
  feast(),
  apparitionFeast(),
  trailTo("massTimings"),
);

export default function MassTimingsRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <MassFestivalsExperience />
    </>
  );
}
