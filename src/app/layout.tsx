import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Cinzel, Tiro_Tamil } from "next/font/google";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Vadakankulam Matha — A Sanctuary of Faith",
  description:
    "Vadakankulam Matha Church · A sacred sanctuary of faith, prayer, and community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} ${cinzel.variable} ${tiroTamil.variable} antialiased`}
    >
      <body className="min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
