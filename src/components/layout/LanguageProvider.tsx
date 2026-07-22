"use client";

import { createContext, useContext, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dict, type Dict } from "@/lib/i18n";
import {
  localePath,
  otherLocale,
  stripLocale,
  type Locale,
} from "@/lib/locale";

/**
 * Language comes from the URL, not from localStorage.
 *
 * The old provider held the language in client state seeded from localStorage.
 * That meant the server always rendered English, every page had exactly one URL,
 * and the Tamil was therefore invisible to search engines — a crawler received
 * the English HTML no matter what. Now `/faq` is English and `/ta/faq` is Tamil,
 * each with its own server render, title and JSON-LD, and switching language is
 * a navigation rather than a state flip.
 *
 * Every consumer still calls `useLang()` and reads `{ lang, t }`, so the client
 * components that render the site did not have to change.
 */

type Ctx = {
  lang: Locale;
  setLang: (l: Locale) => void;
  toggle: () => void;
  /** This same page in the other language — give this to a <Link href>. */
  otherHref: string;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // The locale-free path, so we can mint the twin URL in either language.
  const basePath = stripLocale(pathname || "/");
  const otherHref = localePath(otherLocale(lang), basePath);

  const setLang = useCallback(
    (l: Locale) => {
      router.push(localePath(l, basePath));
    },
    [router, basePath],
  );

  const toggle = useCallback(() => {
    router.push(otherHref);
  }, [router, otherHref]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, toggle, otherHref, t: dict[lang] as Dict }),
    [lang, setLang, toggle, otherHref],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
