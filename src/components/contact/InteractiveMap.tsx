"use client";

/**
 * The map. Loaded only in the browser, via `dynamic(..., { ssr: false })` from
 * PilgrimMap — maplibre-gl touches `window` on import, and it is heavy, so it
 * must never enter the server bundle or the main chunk.
 *
 * WHY NOT GOOGLE. The Maps Embed API hard-codes "cooperative" gesture
 * handling: a wheel over the iframe raises the "use ctrl + scroll to zoom"
 * bar, and there is no parameter, attribute or postMessage that turns it off.
 * The iframe is cross-origin, so we cannot reach in either. Rendering the map
 * ourselves is the only way to own the gestures — so we do:
 *
 *   wheel   → nothing. The page scrolls, always. The bar cannot exist.
 *   drag    → pans (pointer devices only; see below).
 *   + / −   → zooms, on our own buttons, in the site's gold and navy.
 *
 * On touch there is no wheel to disarm, and a pannable map inside a scrolling
 * page is a trap: a finger landing on it drags the map instead of the page.
 * So on coarse pointers the map is a still picture and the buttons do the
 * zooming. Nobody gets stuck.
 *
 * Tiles: OpenFreeMap (openfreemap.org) — OSM data, no key, no billing, free
 * for production use. Attribution is a licence condition; the control stays.
 */

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { GEO, MAP_ZOOM, ADDRESS } from "@/lib/contact";

/** Positron: a quiet, near-white basemap. Google's blue-grey fights the
 *  cream; this sits under the gold instead of arguing with it. */
const STYLE = "https://tiles.openfreemap.org/styles/positron";

const MIN_ZOOM = 6;
const MAX_ZOOM = 17;

export default function InteractiveMap({ title }: { title: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!holder.current || map.current) return;

    /* A coarse pointer means a finger: no wheel to neutralise, and panning
       would swallow the page's scroll. Decided once, at construction. */
    const touch = window.matchMedia("(pointer: coarse)").matches;

    const m = new maplibregl.Map({
      container: holder.current,
      style: STYLE,
      center: [GEO.lng, GEO.lat],
      zoom: MAP_ZOOM,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      /* MapLibre's own control is an ⓘ disclosure button in its house style.
         The credit is a licence condition and stays, but we set it ourselves,
         below, in the site's type — see CREDIT. */
      attributionControl: false,
      // Every gesture that could steal the page's scroll, off at birth.
      scrollZoom: false,
      dragPan: !touch,
      touchZoomRotate: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      keyboard: !touch,
      // The shrine is the subject; nobody needs to sail to Sri Lanka.
      maxBounds: [
        [GEO.lng - 2.5, GEO.lat - 2.5],
        [GEO.lng + 2.5, GEO.lat + 2.5],
      ],
    });

    /* The pin, in the site's gold, with the navy stem — not MapLibre's blue
       default. `anchor: bottom` so the point of it sits on the coordinate. */
    const pin = document.createElement("div");
    pin.style.cursor = "pointer";
    pin.innerHTML = `
      <svg viewBox="0 0 24 32" width="30" height="40" fill="none">
        <path d="M12 31C12 31 22 19.8 22 12A10 10 0 1 0 2 12c0 7.8 10 19 10 19Z"
              fill="#0f1c33" stroke="#c9a227" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="4" fill="#c9a227"/>
      </svg>`;

    new maplibregl.Marker({ element: pin, anchor: "bottom" })
      .setLngLat([GEO.lng, GEO.lat])
      .setPopup(
        new maplibregl.Popup({ offset: 34, closeButton: false }).setHTML(
          `<strong>${ADDRESS.name}</strong><br/>${ADDRESS.street}, ${ADDRESS.locality}`,
        ),
      )
      .addTo(m);

    m.on("load", () => setReady(true));
    map.current = m;

    return () => {
      m.remove();
      map.current = null;
    };
  }, []);

  return (
    <div data-lenis-prevent className="absolute inset-0 overflow-hidden">
      {/* Faded in once the tiles are up, so the frame goes parchment → map
          rather than flashing a half-drawn world. */}
      <div
        ref={holder}
        role="application"
        aria-label={title}
        className={`h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {ready && (
        <div className="absolute bottom-4 left-4 z-10 flex flex-col items-start gap-1.5">
          <ZoomButton label="Zoom in" onClick={() => map.current?.zoomIn()}>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </ZoomButton>
          <ZoomButton label="Zoom out" onClick={() => map.current?.zoomOut()}>
            <Minus className="h-4 w-4" aria-hidden="true" />
          </ZoomButton>

          {/* The credit. Required by the ODbL — the map data is other people's
              work, given freely — so it is always visible, never behind a
              disclosure. Set small, in our own type, rather than in a control
              that belongs to somebody else's design system. */}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 rounded-full bg-white/75 px-2.5 py-1 font-display text-[0.5rem] uppercase tracking-[0.14em] text-navy/55 backdrop-blur-sm transition-colors hover:text-gold-dark"
          >
            © OpenStreetMap · OpenMapTiles
          </a>
        </div>
      )}
    </div>
  );
}

function ZoomButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/90 text-gold ring-1 ring-gold/40 shadow-lg backdrop-blur-sm transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      {children}
    </button>
  );
}
