import type { Metadata, Viewport } from "next";

import { JsonLd } from "@/components/JsonLd";
import { graph, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

import { ContactExperience } from "./ContactExperience";

/**
 * The server half of /contact.
 *
 * This file exists so the route can export `metadata` and structured data at
 * all — a `"use client"` module cannot. It was the only route on the site that
 * had solved this; /history, /architecture, /mass-timings and /saints have now
 * been given the same treatment.
 *
 * The `shrine` and `parish` nodes used to be declared inline here, where no
 * other page could reach them. They now live in src/lib/schema.ts and are
 * emitted site-wide from the root layout, so this page contributes only what is
 * genuinely its own: that it is the ContactPage, and where it sits in the tree.
 * One entity, described once.
 */
export const generateMetadata = localizedMetadata("contact");

export const viewport: Viewport = {
  themeColor: "#0a1322",
};

const jsonLd = graph(pageNode("contact", "ContactPage"), trailTo("contact"));

export default function ContactRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ContactExperience />
    </>
  );
}
