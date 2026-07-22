import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale rewriting.
 *
 * Every route now lives under `app/[lang]`, but the English URLs must not move:
 * `/faq` was indexed as `/faq` and turning it into `/en/faq` would discard the
 * site's search authority. So this rewrites — never redirects — an unprefixed
 * path onto the internal `/en/...` route. The address bar, the canonical and the
 * sitemap all keep saying `/faq`; only the router sees `/en/faq`.
 *
 * `/ta/...` is already explicit and passes straight through.
 *
 * Constants are inlined rather than imported from `@/lib/locale`: proxy may be
 * hoisted to the CDN edge and is documented not to rely on shared modules, and
 * `config.matcher` must be a statically analysable literal.
 */

const LOCALES = ["en", "ta"] as const;
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals, API routes, and any path with a file
  // extension (favicon.ico, robots.txt, sitemap.xml, images, the manifest).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
