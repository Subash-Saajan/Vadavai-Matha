"use client";

import { PageHero } from "@/components/sections/PageHero";
import { MassTimes } from "@/components/sections/MassTimes";
import { useLang } from "@/components/layout/LanguageProvider";
import { images } from "@/lib/images";

export default function MassTimingsPage() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        label={t.mass.label}
        title={t.mass.title}
        intro={t.mass.intro}
        image={images.pews}
      />
      <MassTimes withCta={false} />
    </>
  );
}
