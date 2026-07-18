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
 * parish's analytics with the developer's own page views. `afterInteractive`
 * keeps gtag off the critical path, so tracking never costs the page its Core
 * Web Vitals — which matters for a site whose whole purpose is to rank.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-DRECX6BCGP";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
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
