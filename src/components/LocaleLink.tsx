"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

import { useLang } from "@/components/layout/LanguageProvider";
import { localePath } from "@/lib/locale";

/**
 * A `next/link` that keeps you in the language you are reading.
 *
 * Every internal href in the site is written in its canonical English form
 * (`/faq`, `/mass-timings#festivals`). This prefixes it for the active locale,
 * so a Tamil reader on `/ta/history` who taps "Mass & Festivals" lands on
 * `/ta/mass-timings` rather than being thrown back into English. English is the
 * default locale and takes no prefix, so those hrefs pass through untouched.
 *
 * Client components only. Server components have `lang` from their route params
 * and should call `localePath(lang, href)` directly.
 */
export function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { lang } = useLang();

  // Only site-relative paths are localised. Anything else — an absolute URL, a
  // `tel:`/`mailto:`, a bare `#anchor` — is left exactly as written.
  const localised =
    typeof href === "string" && href.startsWith("/")
      ? localePath(lang, href)
      : href;

  return <NextLink href={localised} {...rest} />;
}

export default Link;
