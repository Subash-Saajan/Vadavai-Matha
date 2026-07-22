import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { bergenthal, graph, gregoire, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

import ArchitectureExperience from "./ArchitectureExperience";

/** Server half of /architecture — see the note in ../history/page.tsx. */
export const generateMetadata = localizedMetadata("architecture");

// The architect and the priest who drove the build. If this page is ever cited
// for anything, it should be for naming Br Bergenthal, whom no other page on
// the web names.
const jsonLd = graph(
  pageNode("architecture"),
  bergenthal,
  gregoire,
  trailTo("architecture"),
);

export default function ArchitectureRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ArchitectureExperience />
    </>
  );
}
