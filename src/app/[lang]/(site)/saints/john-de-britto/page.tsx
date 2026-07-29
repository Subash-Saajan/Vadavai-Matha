import { JsonLd } from "@/components/JsonLd";
import { DE_BRITTO_ID, deBrittoFor, graph, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

import DeBrittoExperience from "./DeBrittoExperience";

/**
 * Server half of /saints/john-de-britto — see ../devasahayam-pillai/page.tsx.
 *
 * The strategic point of this page is the same as Devasahayam's, inverted:
 * Devasahayam attaches the shrine to a globally-searched saint; this page
 * attaches the shrine to its FOUNDER. "John de Britto Vadakkankulam",
 * "Arulanandar church", "who founded the Vadakkankulam church" — those are the
 * connection queries this page is built to win. The Person node is `mainEntity`
 * and `sameAs` his Wikipedia article, so Google and the AI crawlers bind a
 * canonised martyr-saint to this parish.
 */
export const generateMetadata = localizedMetadata("deBritto");

export default async function DeBrittoRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";

  /* Built here, not at module scope: a module-level graph is evaluated once at
     import, before any locale exists, so /ta described the founder in English.
     The `@id` is stable across languages by design — one saint, two documents. */
  const jsonLd = graph(
    {
      ...pageNode("deBritto", "WebPage", lang),
      mainEntity: { "@id": DE_BRITTO_ID },
    },
    deBrittoFor(lang),
    trailTo("deBritto", lang),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <DeBrittoExperience />
    </>
  );
}
