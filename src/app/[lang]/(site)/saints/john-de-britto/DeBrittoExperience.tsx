"use client";

import { SaintPage } from "@/components/sections/SaintPage";
import { useLang } from "@/components/layout/LanguageProvider";
import { deBrittoCiteFor, DE_BRITTO_BIBLIOGRAPHY } from "@/lib/saintSources";

/**
 * The client half of /saints/john-de-britto. Everything visual lives in
 * SaintPage, which this page shares with St Devasahayam's; everything that
 * differs is here or in lib/saintSources.ts. The server page.tsx owns the
 * metadata and the JSON-LD.
 *
 * The hero is a REAL photograph — the John de Britto grotto in the shrine's own
 * grounds — so the alt text describes exactly what is in the frame.
 */
export default function DeBrittoPage() {
  const { t } = useLang();
  const s = t.saintDeBritto;

  return (
    <SaintPage
      content={s}
      citeFor={deBrittoCiteFor}
      bibliography={DE_BRITTO_BIBLIOGRAPHY}
      heroImage="/images/de-britto-grotto.jpg"
      heroAlt="The John de Britto grotto in the grounds of the Holy Family Shrine, Vadakkankulam — a wooden Gothic shrine holding a statue of St John de Britto (Arulanandar), flanked by St Michael and St Raphael, beneath a neem tree"
      heroPosition="object-[center_42%]"
      // The cast is the one place the alts object has to be read by key rather
      // than by field. Keys match the chapter slugs; the fallback to the heading
      // is what stops a mismatched key shipping an empty alt.
      altFor={(key, heading) => (s.alts as Record<string, string>)[key] || heading}
    />
  );
}
