import Script from "next/script";

/**
 * Google Analytics 4 for littlerome.net.
 *
 * The Measurement ID is NOT a secret — it ships in the page source of every
 * site that uses GA — so it lives here as the default rather than forcing a
 * Vercel env var the parish would have to remember. NEXT_PUBLIC_GA_ID still
 * overrides it if a separate property is ever wanted (e.g. a staging site).
 *
 * Gated to production so `npm run dev` and local builds never pollute the
 * parish's analytics with the developer's own page views. gtag.js loads
 * `lazyOnload` (see below) so tracking never costs the page its Core Web
 * Vitals — which matters for a site whose whole purpose is to rank.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-DRECX6BCGP";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* `lazyOnload`, not `afterInteractive`. In the App Router the latter
          also emits a `<link rel="preload" as="script">` for gtag.js in the
          <head> of every page — 183 KB of third-party script fetched in the
          same window as the hero photograph, which is the LCP on every route.
          On a phone on Indian 4G that contention is what the field data
          showed (CrUX, Nov 2026: mobile LCP p75 3.2s). Now gtag loads once the
          page is idle. The init below still runs early and only queues onto
          `dataLayer`, so the page_view is sent when gtag arrives, not lost.
          The cost: a visitor who leaves within the first seconds may go
          uncounted here. Vercel Web Analytics (same-origin, VercelInsights.tsx)
          still counts them, which is what it is mounted for. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
