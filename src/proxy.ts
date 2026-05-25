import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Host-based routing for the single deployment that serves two domains:
//   • vadavaimatha.net  → the full Holy Family Church site
//   • littlerome.net    → the /coming-soon holding page
//
// In Next.js 16 the former `middleware` convention is renamed to `proxy`.
const COMING_SOON_HOSTS = new Set([
  "littlerome.net",
  "www.littlerome.net",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase() ?? "";
  const { pathname } = request.nextUrl;

  if (COMING_SOON_HOSTS.has(host) && pathname !== "/coming-soon") {
    return NextResponse.rewrite(new URL("/coming-soon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on everything except static assets and metadata files.
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
