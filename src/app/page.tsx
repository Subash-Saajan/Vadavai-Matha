import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

// Root of littlerome.net: a coming-soon holding page (no navbar/footer, since
// it lives outside the (site) route group). The full church site is live at
// /home and its sub-routes (/history, /gallery, …).
export const metadata: Metadata = {
  title: "Little Rome — Holy Family Church, Vadakkankulam",
  description:
    "Little Rome (littlerome.net) — the home of Holy Family Church, Vadakkankulam. A new site is coming soon.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
