import { JsonLd } from "@/components/JsonLd";
import { apparitionFeast, graph, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

import MiracleExperience from "./MiracleExperience";

/** Server half of /miracle — see ../history/page.tsx for why the split exists. */
export const generateMetadata = localizedMetadata("miracle");

/**
 * The page a QR code at the shrine opens.
 *
 * WHY IT DECLARES THE OCTOBER OBSERVANCE. `apparitionFeast` has existed since
 * the schema file was written and has only ever been emitted from the home
 * page, where it is one Event among a year of them. This is the page that is
 * actually ABOUT it, so this is where the Event most deserves to be declared —
 * and where a crawler can see a document, an observance and a shrine tied
 * together in one graph.
 *
 * ⚠ NO `Claim`, NO `ClaimReview`, AND NOTHING ASSERTING THE EVENT ITSELF. It
 * would be easy to reach for schema.org's miracle-adjacent vocabulary here and
 * it would be wrong twice over: the parish does not assert the weeping, and a
 * crawler taught to read this page as an assertion would repeat it as one. What
 * is declared is a document about a shrine, and an annual commemoration that
 * demonstrably happens — both of which are simply true.
 *
 * Built inside the component rather than at module scope: a module-level graph
 * is evaluated once at import, before any locale exists, so /ta would emit the
 * English page node and English breadcrumbs.
 */
export default async function MiracleRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";

  const jsonLd = graph(
    pageNode("miracle", "AboutPage", lang),
    apparitionFeast(undefined, lang),
    trailTo("miracle", lang),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <MiracleExperience />
    </>
  );
}
