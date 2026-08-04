import type { Metadata } from "next";
import Link from "next/link";

import { HERO_VARIANTS, HERO_VARIANT_IDS, VARIANT_SCRUB } from "@/lib/heroVariants";

/* ── THE HERO LADDER, AS SOMETHING YOU CAN TAP ─────────────────────────────
   TEMPORARY, and deliberately ugly — it is an instrument, not a page. Delete
   it, src/lib/heroVariants.ts and public/hero-test/ once a rung wins.

   A route rather than a note in a chat message because the testing happens on
   a phone: typing `?hero=f810` into iOS Safari's address bar five times, with
   autocorrect fighting you, is how a test round gets abandoned halfway. Every
   rung is one tap from here.

   noindex, and not in INDEXABLE, so it stays out of the sitemap. */

export const metadata: Metadata = {
  title: "Hero ladder",
  robots: { index: false, follow: false },
};

export default function HeroTest() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 font-mono text-sm">
      <h1 className="font-display text-2xl tracking-wide">Hero ladder</h1>

      <p className="mt-4 leading-relaxed text-text-muted">
        Each rung loads the home page with one hero cut. Scroll the hero all the
        way down and back up, then come back and try the next.
      </p>
      <p className="mt-3 leading-relaxed text-text-muted">
        Easing is pinned at {VARIANT_SCRUB} for all five, so the only things
        changing are <strong>how it decodes</strong> and{" "}
        <strong>how many pixels</strong>. Judge two things: does it{" "}
        <strong>stutter</strong>, and does it look <strong>soft</strong>.
      </p>

      <ol className="mt-8 space-y-5">
        {HERO_VARIANT_IDS.map((id) => {
          const v = HERO_VARIANTS[id];
          return (
            <li key={id}>
              <Link
                href={`/?hero=${id}`}
                className="font-display text-base text-gold underline underline-offset-4"
              >
                {v.label}
              </Link>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {v.mode === "film" ? "WebCodecs → canvas" : "<video> + currentTime"}
                {" · "}
                {v.width}×{v.height} · {v.mb} MB
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">{v.note}</p>
            </li>
          );
        })}
      </ol>

      <p className="mt-10 text-xs leading-relaxed text-text-muted">
        The pair that matters is <strong>Seeked 810</strong> vs{" "}
        <strong>WebCodecs 810</strong>: same picture, same size, same easing, so
        whichever feels better identifies the mechanism outright. The rest is
        then only a question of which resolution to spend on.
      </p>
    </div>
  );
}
