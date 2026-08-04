import type { Metadata } from "next";

import { Diagnostics } from "./Diagnostics";

/**
 * Scaffolding, not a page of the site. It is deliberately absent from
 * `INDEXABLE` in lib/seo.ts, so it is in neither sitemap, and it carries its
 * own `noindex` in case anything ever links to it.
 *
 * Delete with lib/probe.ts and ./Diagnostics.tsx once the iOS crash is settled.
 */
export const metadata: Metadata = {
  title: "Diagnostics",
  robots: { index: false, follow: false },
};

export default function DiagnosticsPage() {
  return <Diagnostics />;
}
