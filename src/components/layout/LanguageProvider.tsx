"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
  /**
   * Run something in the moment BEFORE a language switch navigates away, and
   * return the unsubscribe. Most pages need nothing: the switch keeps the
   * scroll offset and the two renders are the same shape, so the reader stays
   * where they were.
   *
   * A page that keeps its place in something other than a scroll offset does
   * need it. The history page is the case: the same chapter is a different
   * height in Tamil, and the year within it is held in scroll position and
   * GSAP classes, not in the URL — so an untouched scroll offset lands on a
   * different year. It registers here and writes its return address on the way
   * out, and its own restore picks the address up on the other side.
   */
  onBeforeSwitch: (fn: () => void) => () => void;
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

  /* Held in a ref, and the callbacks are called rather than depended on, so
     registering one never re-mints setLang/toggle — otherwise every page that
     registered would re-register on its own registration. */
  const beforeSwitch = useRef<Set<() => void>>(new Set());

  const onBeforeSwitch = useCallback((fn: () => void) => {
    const set = beforeSwitch.current;
    set.add(fn);
    return () => {
      set.delete(fn);
    };
  }, []);

  /* One page's bookkeeping must not be able to strand the reader in the
     language they were trying to leave. */
  const runBeforeSwitch = useCallback(() => {
    for (const fn of beforeSwitch.current) {
      try {
        fn();
      } catch {}
    }
  }, []);

  const setLang = useCallback(
    (l: Locale) => {
      if (l === lang) return;
      runBeforeSwitch();
      // scroll: false — a language switch is the same page in the other
      // tongue, not a new destination. Without it Next.js jumps to the top
      // of the page on every toggle, same as any other route change.
      router.push(localePath(l, basePath), { scroll: false });
    },
    [router, basePath, lang, runBeforeSwitch],
  );

  const toggle = useCallback(() => {
    runBeforeSwitch();
    router.push(otherHref, { scroll: false });
  }, [router, otherHref, runBeforeSwitch]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle,
      otherHref,
      onBeforeSwitch,
      t: dict[lang] as Dict,
    }),
    [lang, setLang, toggle, otherHref, onBeforeSwitch],
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
