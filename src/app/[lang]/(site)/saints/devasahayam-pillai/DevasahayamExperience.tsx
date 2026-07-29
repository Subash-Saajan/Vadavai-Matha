"use client";

import { SaintPage } from "@/components/sections/SaintPage";
import { useLang } from "@/components/layout/LanguageProvider";
import { devasahayamCiteFor, DEVASAHAYAM_BIBLIOGRAPHY } from "@/lib/saintSources";

/**
 * The client half of /saints/devasahayam-pillai. Everything visual lives in
 * SaintPage, which this page shares with St John de Britto's; everything that
 * differs is here or in lib/saintSources.ts. The server page.tsx owns the
 * metadata and the JSON-LD.
 *
 * THE HERO IS THE WIFE'S TOMB, and it stays that way. It is the most intimate
 * photograph the parish holds and the only thing in this whole story a visitor
 * can still walk up to and touch: Gnanapoo Ammal, who was told eight days
 * before his death to keep the faith and settle here, and who did, and who died
 * here in 1766. Her chapter further down carries the same photograph in a
 * squarer crop, where the plaque and the old INRI cross can actually be read.
 */
export default function DevasahayamPage() {
  const { t } = useLang();
  const s = t.saintDevasahayam;

  return (
    <SaintPage
      content={s}
      citeFor={devasahayamCiteFor}
      bibliography={DEVASAHAYAM_BIBLIOGRAPHY}
      heroImage="/images/saints/gnanapoo-ammal-tomb.jpg"
      heroAlt="The tomb of Gnanapoo Ammal, who died in 1766, wife of St Devasahayam Pillai, sheltered under a white arched memorial with an old stone cross"
      altFor={(key, heading) => (s.alts as Record<string, string>)[key] || heading}
    />
  );
}
