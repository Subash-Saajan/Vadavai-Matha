import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Chronicle } from "@/components/sections/Chronicle";

/* ── SECOND-STAGE BISECT: WHAT INSIDE THE CHRONICLE KILLS THE TAB ──────────
   /bisect/N found the section: /bisect/3 loads on an iPhone, /bisect/4 does
   not, and Chronicle is the only difference. This narrows it further.

   ⚠ VARIANT 0 IS THE ONE THAT MATTERS FIRST, AND IT IS NOT A FEATURE TEST.
   It renders the Chronicle ALONE — no Hero, no Patroness, no About. That
   separates two very different diagnoses which /bisect/4 cannot tell apart:

     · 0 CRASHES  → the Chronicle is sufficient on its own. The variants below
                    then say which part of it.
     · 0 LOADS    → the Chronicle is not special; the page simply crosses a
                    threshold at four sections, and the cost is CUMULATIVE.
                    The variants below would then be measuring the wrong thing
                    and the search moves back to what every section shares.

   Each variant neuters ONE suspect with scoped CSS rather than by editing the
   component, so the markup, the JS, the images and the scroll handlers are
   identical across all of them — only the compositing changes. `!important`
   beats GSAP's inline styles, which is what makes 2 possible at all.

   Every suspect here is a thing that forces WebKit to give the element its own
   composited layer or an offscreen buffer. Backing store is charged at
   width x height x 4 x devicePixelRatio^2 from LAYOUT GEOMETRY, which is why
   this is device-independent and why the phone with more RAM died first.

   DELETE THIS ROUTE, and /bisect/[n], once the cause is found. */

const VARIANTS: { id: string; what: string; css: string }[] = [
  {
    id: "0",
    what: "control — the Chronicle alone, untouched",
    css: "",
  },
  {
    id: "1",
    what: "no per-card transform (kills force3D's nine composited layers)",
    // gsap.set(el, {force3D:true}) puts translate3d() inline on every
    // .chron-card, and paint() rewrites y/scale on each one every scroll
    // frame. A 3D transform is an unconditional compositing trigger, so this
    // is nine full-card layers that exist for the life of the page.
    css: ".chron-card{transform:none!important}",
  },
  {
    id: "2",
    what: "no rounded corners or clipping on the cards (kills mask layers)",
    // A border-radius plus overflow:hidden on a COMPOSITED element needs a
    // mask layer of its own in WebKit — potentially doubling the count above.
    css: ".chron-card{border-radius:0!important;overflow:visible!important}",
  },
  {
    id: "3",
    what: "no horizontal scroller (kills the seven-screen-wide scrolling layer)",
    // The track is ~7 viewports wide. An async-scrollable overflow area is
    // composited and tiled, and iOS inflates coverage around the visible rect.
    css: '[aria-roledescription="carousel"]{overflow-x:hidden!important}',
  },
  {
    id: "4",
    what: "no light-shaft (kills filter: blur(8px) + mix-blend-mode: screen)",
    // .light-shaft is the one blend on this section. mix-blend-mode makes
    // WebKit isolate and composite the whole blending group, and none of the
    // host sections form a stacking context, so that group climbs to the root.
    css: ".light-shaft{display:none!important}",
  },
  {
    id: "5",
    what: "no photographs (kills seven decoded bitmaps)",
    // display:none removes the box entirely, so nothing is decoded or held.
    css: ".chron-card img{display:none!important}",
  },
  {
    id: "6",
    what: "no shadows or rings on the cards",
    css: ".chron-card{box-shadow:none!important;--tw-ring-shadow:0 0 #0000!important}",
  },

  /* ── FINDING THE FLOOR ─────────────────────────────────────────────────
     If 1-6 all still fail, no SINGLE trigger is responsible and taking them
     away one at a time will never show anything. These take away a lot at
     once, to establish what the section can survive at all. Work down: the
     first of these that LOADS brackets the problem between itself and the
     variant above it. */
  {
    id: "7",
    what: "ONE card instead of nine (everything else untouched)",
    // If nine cards die and one lives, the trigger scales with the number of
    // cards — layers, decoded images or scroller width — rather than being
    // any one property. That is a different fix from removing a feature.
    css: ".chron-card:nth-of-type(n+2){display:none!important}",
  },
  {
    id: "8",
    what: "everything off at once — 1+2+3+4+5+6 combined",
    // Same DOM, same JS, same scroll handlers, but nothing left that asks
    // WebKit for a composited layer or an offscreen buffer. If this still
    // fails the cause is not compositing at all, and the remaining suspects
    // are the markup itself and the JS that runs over it.
    css:
      ".chron-card{transform:none!important;border-radius:0!important;" +
      "overflow:visible!important;box-shadow:none!important;" +
      "--tw-ring-shadow:0 0 #0000!important}" +
      '[aria-roledescription="carousel"]{overflow-x:hidden!important}' +
      ".light-shaft{display:none!important}" +
      ".chron-card img{display:none!important}",
  },
  {
    id: "9",
    what: "no cards at all — the section header alone",
    // The floor. If even this fails, nothing in the carousel is to blame and
    // the trigger is in the shared layout or the header, which would also
    // mean /faq surviving needs explaining.
    css: '[aria-roledescription="carousel"]{display:none!important}',
  },
];

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ v: v.id }));
}

export const metadata: Metadata = {
  title: "Bisect · chronicle",
  robots: { index: false, follow: false },
};

export default async function ChronoBisect({
  params,
}: {
  params: Promise<{ v: string }>;
}) {
  const { v } = await params;
  const variant = VARIANTS.find((x) => x.id === v);
  if (!variant) notFound();

  return (
    <>
      {variant.css ? (
        <style dangerouslySetInnerHTML={{ __html: variant.css }} />
      ) : null}
      <Chronicle />
      {/* Named on the page so a tester can see which one they are looking at
          without reading the URL — the variants are otherwise identical. */}
      <p className="px-6 py-10 text-center font-mono text-xs text-text-muted">
        bisect/chrono/{variant.id} — {variant.what}
      </p>
    </>
  );
}
