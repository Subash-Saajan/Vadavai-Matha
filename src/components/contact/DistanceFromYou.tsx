"use client";

import { useState } from "react";
import { Compass } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { GEO } from "@/lib/contact";

/**
 * "You are about 340 km away, as the crow flies."
 *
 * Geolocation is requested only on an explicit tap — never on load — so the
 * browser's permission prompt is something the visitor asked for. If they
 * decline, or the page is served over http, or the device has no fix, we say
 * nothing more about it: the printed address above is the answer either way.
 *
 * Straight-line, not road distance. Claiming a road distance would need a
 * routing API, and a wrong one would be worse than none.
 */

const EARTH_RADIUS_KM = 6371;

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

type State = { kind: "idle" } | { kind: "locating" } | { kind: "found"; km: number } | { kind: "denied" };

export function DistanceFromYou() {
  const { t } = useLang();
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<State>({ kind: "idle" });

  function locate() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ kind: "denied" });
      return;
    }
    setState({ kind: "locating" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const km = haversineKm(pos.coords.latitude, pos.coords.longitude, GEO.lat, GEO.lng);
        setState({ kind: "found", km });
      },
      () => setState({ kind: "denied" }),
      { timeout: 10_000, maximumAge: 600_000 },
    );
  }

  if (state.kind === "found") {
    const km = state.km < 10 ? state.km.toFixed(1) : Math.round(state.km).toLocaleString();
    return (
      <p aria-live="polite" className="font-serif text-lg text-navy/75">
        {t.contact.travel.youAre}{" "}
        <span className="text-gold-dark tabular-nums text-2xl">{km} {t.contact.travel.km}</span>{" "}
        <span className="text-text-muted text-base">{t.contact.travel.straightLine}</span>
      </p>
    );
  }

  if (state.kind === "denied") {
    return (
      <p aria-live="polite" className="text-sm text-text-muted italic">
        {t.contact.travel.locateDenied}
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={locate}
      disabled={state.kind === "locating"}
      className="inline-flex items-center gap-2.5 min-h-[46px] px-6 rounded-full border border-navy/20 text-navy/70 font-display text-[0.62rem] uppercase tracking-[0.22em] hover:border-gold hover:text-gold-dark transition-colors disabled:opacity-60"
    >
      {/* The "Finding you…" label already announces the wait, so the needle
          need not spin for someone who has asked for less motion. */}
      <Compass
        className={`w-4 h-4 ${state.kind === "locating" && !reducedMotion ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
      {state.kind === "locating" ? t.contact.travel.locating : t.contact.travel.locate}
    </button>
  );
}
