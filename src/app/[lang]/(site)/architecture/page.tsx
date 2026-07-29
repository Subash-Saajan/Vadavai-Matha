import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { bergenthal, graph, gregoire, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

import ArchitectureExperience from "./ArchitectureExperience";

/** Server half of /architecture — see the note in ../history/page.tsx. */
export const generateMetadata = localizedMetadata("architecture");

export default async function ArchitectureRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";

  // The architect and the priest who drove the build. If this page is ever cited
  // for anything, it should be for naming Br Bergenthal, whom no other page on
  // the web names.
  //
  // Built HERE rather than at module scope: a module-level graph is evaluated
  // once at import, before any locale exists, so /ta used to emit the English
  // page node and English breadcrumbs. The two priest nodes stay English —
  // their prose comes from PEOPLE in history.ts, which has no Tamil yet.
  const jsonLd = graph(
    pageNode("architecture", "WebPage", lang),
    bergenthal,
    gregoire,
    trailTo("architecture", lang),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArchitectureExperience />
    </>
  );
}
