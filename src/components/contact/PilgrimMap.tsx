"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navigation, MapPin, Check } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { GEO, MAP_LINKS, ADDRESS } from "@/lib/contact";

// `ssr: false` is only legal inside a Client Component in Next 16, which this
// is. The map is shown open, not hidden behind a click — but the iframe below
// carries `loading="lazy"`, so Google is not fetched until the section nears
// the viewport. The engraving sits behind it as an on-brand poster until the
// map tiles paint over it.
const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => null,
});

const COORDS = `${GEO.lat}, ${GEO.lng}`;

/* One shape for all three controls: same height, same radius, same type.
   Their widths are equalised by the 3-column grid they sit in, so the row
   reads as a single instrument rather than three loose buttons. */
const PILL =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 font-display text-[0.64rem] uppercase tracking-[0.2em] whitespace-nowrap transition-colors";

/* Apple's own mark. Lucide has no brand glyphs, and an "external link" box
   said nothing about where the link goes. */
function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.18-1.72-1.35-.14-2.64.79-3.33.79-.69 0-1.75-.77-2.87-.75-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.74 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.5zM14.88 5.4c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.55 1.31-.56.65-1.05 1.68-.92 2.68.97.07 1.96-.49 2.57-1.23z" />
    </svg>
  );
}

export function PilgrimMap({ id }: { id?: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  async function copyCoords() {
    try {
      await navigator.clipboard.writeText(COORDS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard denied — the coordinates are printed below regardless. */
    }
  }

  return (
    <section
      id={id}
      className="section-padding relative overflow-hidden parchment-swell scroll-mt-24"
    >
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[11rem] opacity-[0.05] select-none">
        II
      </span>

      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-12 reveal max-w-2xl mx-auto">
          <p className="kicker justify-center mb-5">{t.contact.map.heading}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy leading-snug">
            {t.contact.map.intro}
          </h2>
        </header>

        {/* The plate — a framed map, like the portrait on the home page. The
            ground under the tiles is parchment, not black: for the moment
            before they paint, the frame should read as an empty page. */}
        <div className="reveal relative aspect-3/2 md:aspect-2/1 rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25 bg-cream">
          <InteractiveMap title={t.contact.map.iframeTitle} />

          {/* Corner serifs, the site's framing motif */}
          <span className="pointer-events-none absolute top-4 left-4 w-7 h-7 border-t border-l border-gold/50 z-10" aria-hidden="true" />
          <span className="pointer-events-none absolute bottom-4 right-4 w-7 h-7 border-b border-r border-gold/50 z-10" aria-hidden="true" />
        </div>

        {/* The navigational truth. Always present, JS or no JS, map or no map. */}
        <div className="reveal mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
          <address className="not-italic">
            <p className="font-display text-[0.6rem] uppercase tracking-[0.32em] text-gold-dark mb-4">
              {ADDRESS.name}
            </p>
            <p className="font-serif text-lg md:text-xl text-navy leading-relaxed max-w-sm">
              {t.contact.address}
            </p>
            <p className="mt-4 text-xs text-text-muted tabular-nums tracking-wide">
              {GEO.lat}°N, {GEO.lng}°E
            </p>
          </address>

          {/* Three equal columns — the pills come out the same width whatever
              the language, and the row never breaks. Below `sm` they stack, as
              three of these cannot honestly share a phone's width. */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:shrink-0">
            <a
              href={MAP_LINKS.googleDirections}
              target="_blank"
              rel="noopener noreferrer"
              className={`${PILL} bg-navy text-white hover:bg-gold hover:text-navy`}
            >
              <Navigation className="w-4 h-4 shrink-0 fill-current" aria-hidden="true" />
              {t.contact.map.directionsGoogle}
            </a>
            <a
              href={MAP_LINKS.apple}
              target="_blank"
              rel="noopener noreferrer"
              className={`${PILL} border border-gold/35 text-navy/80 hover:border-gold hover:text-gold-dark hover:bg-gold/5`}
            >
              <AppleMark className="w-4 h-4 shrink-0 text-gold-dark" />
              {t.contact.map.openApple}
            </a>
            <button
              type="button"
              onClick={copyCoords}
              className={`${PILL} border border-gold/35 text-navy/80 hover:border-gold hover:text-gold-dark hover:bg-gold/5`}
            >
              {copied ? (
                <Check className="w-4 h-4 shrink-0 text-gold-dark" aria-hidden="true" />
              ) : (
                <MapPin className="w-4 h-4 shrink-0 text-gold-dark" aria-hidden="true" />
              )}
              {copied ? t.contact.map.coordsCopied : t.contact.map.copyCoords}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
