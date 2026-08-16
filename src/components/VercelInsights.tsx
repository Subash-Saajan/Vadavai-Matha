import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Vercel Web Analytics + Speed Insights for littlerome.net.
 *
 * Why a SECOND analytics package when GA4 is already here: GA4 is a
 * googletagmanager script, so it is missed by ad blockers, privacy browsers and
 * anyone who leaves before `afterInteractive` fires. On a 91%-mobile audience
 * that undercount is real. These beacons are served from our own origin
 * (`/_vercel/insights/*`), so they survive blockers GA4 does not — giving a
 * second, independent number to sanity-check GA4 against rather than replacing
 * it. See also: Cloudflare cannot help here, because the DNS record is
 * DNS-only and traffic goes straight to Vercel without passing through it.
 *
 * Speed Insights earns its place separately: CrUX has never had enough Chrome
 * traffic to publish field data for this domain, so real-world Core Web Vitals
 * are currently unavailable at ANY price. This is the only way to see them.
 *
 * Gated to production for the same reason GoogleAnalytics is — `npm run dev`
 * must never spend the parish's page-view quota on the developer's own
 * clicking, and the beacon endpoints only exist on a Vercel deployment anyway.
 */
export function VercelInsights() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
