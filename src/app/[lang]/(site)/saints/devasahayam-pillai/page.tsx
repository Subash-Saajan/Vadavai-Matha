import { JsonLd } from "@/components/JsonLd";
import { DEVASAHAYAM_ID, devasahayamFor, graph, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

import DevasahayamExperience from "./DevasahayamExperience";

/** Server half of /saints/devasahayam-pillai — see ../../history/page.tsx. */
export const generateMetadata = localizedMetadata("devasahayam");

/**
 * Strategically this is the most valuable page on the site.
 *
 * Almost nobody searches for "Vadakkankulam". A great many people search for
 * St Devasahayam Pillai — the first Indian layman canonised, in 2022 — and this
 * is the parish of his baptism. Declaring the Person node, `mainEntity` of this
 * page and `sameAs` his Wikipedia article, is what lets Google and the AI
 * crawlers attach a globally-searched entity to this shrine.
 */
export default async function DevasahayamRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";

  /* Built here, not at module scope: a module-level graph is evaluated once at
     import, before any locale exists, so /ta described this saint in English.
     The `@id` is stable across languages by design — one saint, two documents. */
  const jsonLd = graph(
    {
      ...pageNode("devasahayam", "WebPage", lang),
      mainEntity: { "@id": DEVASAHAYAM_ID },
    },
    devasahayamFor(lang),
    trailTo("devasahayam", lang),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <DevasahayamExperience />
    </>
  );
}
