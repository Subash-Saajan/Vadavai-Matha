import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// "Coming soon" launch gate for littlerome.net.
//
// While the full Holy Family Church site is being finished, every request is
// rewritten to the /coming-soon holding page. To go live, set the env var
// COMING_SOON to anything other than "true" (or remove it) and redeploy —
// no code change needed. Locally it is unset, so `npm run dev` shows the
// full site for development.
//
// In Next.js 16 the former `middleware` convention is renamed to `proxy`.
const COMING_SOON = process.env.COMING_SOON === "true";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (COMING_SOON && pathname !== "/coming-soon") {
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
