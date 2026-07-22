import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Cormorant_Garamond, Cinzel, Tiro_Tamil } from "next/font/google";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { JsonLd } from "@/components/JsonLd";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { baseNodes, graph } from "@/lib/schema";
import { SITE_NAME, SITE_URL, siteTitle, siteDescription } from "@/lib/seo";
import { LOCALES, LOCALE_TAG, isLocale, type Locale } from "@/lib/locale";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Devotional "voice of prayer" — flowing humanist serif for body & quotes.
const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Monumental "voice of stone" — Roman inscriptional capitals (Trajan lineage),
// the typographic heart of the "Little Rome" identity. Used for the wordmark,
// section eyebrows, Roman numerals and the big cinematic headings.
const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  // Force a SERIF fallback so the inscriptional headings never flash as a
  // generic sans while Cinzel is still loading.
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const tiroTamil = Tiro_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
});

// `metadataBase` is required before any page may use a relative canonical or
// a relative Open Graph image — without it, Next 16 fails the build.
//
// The apex is canonical. www.littlerome.net redirects onto it (Vercel domain
// settings), so every URL we mint here must be apex or we would be pointing
// crawlers at a redirect and splitting the site's authority across two hosts.
// One static render per locale: `/en/*` (served unprefixed) and `/ta/*`.
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "en";
  const title = siteTitle(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: title.template,
      // The old default ("A Sanctuary of Faith") said nothing a person would
      // ever search for. This one carries the three things they do type: the
      // dedication, the village, and the name the place is famous by.
      default: title.default,
    },
    description: siteDescription(lang),
    applicationName: SITE_NAME,
    publisher: "Holy Family Parish, Vadakkankulam",
    // `max-image-preview: large` is the one that matters here. It is what permits
    // Google to show a full-width photograph beside the result and in Discover —
    // and this shrine's photographs are its strongest asset. `max-snippet: -1`
    // lifts the snippet cap, which is also what lets AI Overviews quote enough of
    // a page to cite it usefully.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    // Only rendered when the var is set. Search Console is being verified by DNS
    // (Cloudflare TXT), so this is a spare route in, not the primary one.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: "#0a1628",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: raw } = await params;
  // An unknown segment (e.g. /fr/faq) must 404 rather than silently render English.
  if (!isLocale(raw)) notFound();
  const lang: Locale = raw;

  return (
    <html
      lang={LOCALE_TAG[lang]}
      className={`${geistSans.variable} ${cormorant.variable} ${cinzel.variable} ${tiroTamil.variable} antialiased`}
    >
      <body className="min-h-screen">
        <GoogleAnalytics />
        {/* The shrine, the parish and the website — asserted on every route.
            Pages add only their own nodes (a WebPage, a breadcrumb, the feast)
            and reference these by @id, so six pages describe one entity rather
            than six near-identical ones that Google must guess how to merge. */}
        <JsonLd data={graph(...baseNodes())} />
        {/* Language now comes from the URL, not localStorage — so the server
            renders the correct language and a crawler can see it. */}
        <LanguageProvider lang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
