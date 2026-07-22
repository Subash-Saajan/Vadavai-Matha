/**
 * Locale routing.
 *
 * English is the DEFAULT locale and carries NO url prefix — `/faq` stays `/faq`.
 * That is deliberate: those URLs are already indexed and linked, and moving them
 * to `/en/faq` would throw away the site's existing search authority for nothing.
 * Tamil lives under `/ta` — `/ta/faq` — so it has its own indexable URL, its own
 * <title>, its own JSON-LD and an hreflang pair pointing at the English twin.
 *
 * The unprefixed English paths are served by `src/proxy.ts`, which REWRITES
 * (never redirects) `/faq` onto the internal `/en/faq` route. A rewrite keeps the
 * address bar — and the canonical — at `/faq`.
 */

export const LOCALES = ["en", "ta"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** BCP-47 tags, for <html lang>, hreflang and og:locale. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: "en-IN",
  ta: "ta-IN",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * The public URL for `path` in `lang`.
 * `localePath("ta", "/faq")` -> `/ta/faq`;  `localePath("en", "/faq")` -> `/faq`.
 * Hash and query suffixes ride along untouched (`/#saints` -> `/ta/#saints`).
 */
export function localePath(lang: Locale, path: string): string {
  if (lang === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

/** The same page in the other language — used by the language toggle. */
export function otherLocale(lang: Locale): Locale {
  return lang === "en" ? "ta" : "en";
}

/**
 * Strip a leading locale segment from a pathname, giving the canonical
 * English-relative path. `/ta/faq` -> `/faq`; `/faq` -> `/faq`; `/ta` -> `/`.
 */
export function stripLocale(pathname: string): string {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
