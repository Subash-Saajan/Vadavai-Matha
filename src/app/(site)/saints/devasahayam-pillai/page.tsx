import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { DEVASAHAYAM_ID, devasahayam, graph, pageNode, trailTo } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

import DevasahayamExperience from "./DevasahayamExperience";

/** Server half of /saints/devasahayam-pillai — see ../../history/page.tsx. */
export const metadata: Metadata = pageMetadata("devasahayam");

/**
 * Strategically this is the most valuable page on the site.
 *
 * Almost nobody searches for "Vadakkankulam". A great many people search for
 * St Devasahayam Pillai — the first Indian layman canonised, in 2022 — and this
 * is the parish of his baptism. Declaring the Person node, `mainEntity` of this
 * page and `sameAs` his Wikipedia article, is what lets Google and the AI
 * crawlers attach a globally-searched entity to this shrine.
 */
const jsonLd = graph(
  {
    ...pageNode("devasahayam"),
    mainEntity: { "@id": DEVASAHAYAM_ID },
  },
  devasahayam,
  trailTo("devasahayam"),
);

export default function DevasahayamRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <DevasahayamExperience />
    </>
  );
}
