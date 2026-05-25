import type { Metadata } from "next";
import { ComingSoon } from "./ComingSoon";

export const metadata: Metadata = {
  title: "Little Rome — Holy Family Church, Vadakkankulam",
  description:
    "Little Rome (littlerome.net) — the home of Holy Family Church, Vadakkankulam. A new site is coming soon.",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
