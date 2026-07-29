import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { apparitionFeast, feast, graph, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

import MassFestivalsExperience from "./MassFestivalsExperience";

/** Server half of /mass-timings — see the note in ../history/page.tsx. */
export const generateMetadata = localizedMetadata("massTimings");

/**
 * The feast carries a real date range, so it is the one node on this site that
 * can win a dated rich result — and "when is the Vadakkankulam feast" / "car
 * festival date" is the highest-intent question this shrine is ever asked.
 *
 * `feast()` computes the year rather than hard-coding it: a past-dated Event is
 * dropped by Google, so a literal "2026-08-06" would quietly stop working on
 * 16 August and nobody would notice until the following year.
 */
export default async function MassTimingsRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";

  /* Built here, not at module scope, so /ta gets the Tamil page node, Tamil
     event names and Tamil breadcrumbs. `feast()` still computes the year. */
  const jsonLd = graph(
    pageNode("massTimings", "WebPage", lang),
    feast(undefined, lang),
    apparitionFeast(undefined, lang),
    trailTo("massTimings", lang),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <MassFestivalsExperience />
    </>
  );
}
