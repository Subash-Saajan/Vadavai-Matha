import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import {
  bergenthal,
  buttari,
  deBritto,
  devasahayam,
  gregoire,
  graph,
  pageNode,
  santhaayi,
  trailTo,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

import HistoryExperience from "./HistoryExperience";

/**
 * The server half of /history.
 *
 * This file exists for the same reason /contact's does: the page is
 * `"use client"` (GSAP timelines), and a client module may not export
 * `metadata`. That is why this route — like /architecture, /mass-timings and
 * /saints — has shipped with no title, no description and no share card since
 * it was written. The interactive half is unchanged in HistoryExperience.
 */
export const metadata: Metadata = pageMetadata("history");

// Everyone whose story this page actually tells.
//
// The two saints are here because they are searched for far more than the
// parish is, and declaring them connects the shrine to entities the world
// already knows. Santhaayi, Buttari, Grégoire and Bergenthal are here for the
// opposite reason: they are searched for by nobody, because almost nothing
// about them is online. Br Bergenthal in particular — the church's architect,
// resolved by the parish's Knowledge Base from the Jesuit archives in Rome —
// appears on no website anywhere. Publishing him is original, and original is
// what gets cited.
const jsonLd = graph(
  pageNode("history", "AboutPage"),
  deBritto,
  devasahayam,
  santhaayi,
  buttari,
  gregoire,
  bergenthal,
  trailTo("history"),
);

export default function HistoryRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <HistoryExperience />
    </>
  );
}
