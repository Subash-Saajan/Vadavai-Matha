"use client";

import { useRef, useEffect, useState, useCallback, useId } from "react";
import { ResidentImage } from "@/components/ResidentImage";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import {
  CHRONICLE_FRAMES,
  chronicleCounts,
  fillCounts,
  type ChronicleFrame,
  type ChronicleFrameMeta,
} from "@/lib/chronicle";
import { ChronicleHeader } from "./ChronicleHeader";

/**
 * III · The Chronicle — the home page's door into /history.
 *
 * ── HOW IT MOVES, AND WHY IT MOVES TWO DIFFERENT WAYS ─────────────────────
 *
 * DESKTOP — THE PAGE'S OWN SCROLL DRIVES IT. The section pins and the strip
 * scrubs sideways off scroll progress, so a reader coming down the page moves
 * through three centuries without reaching for anything, and then carries on to
 * the next section when the strip runs out. Wherever the pointer happens to be
 * makes no difference — there is nothing to aim at and nothing to hover.
 *
 * MOBILE — THE FINGER DRIVES IT, AND ONLY SIDEWAYS. A horizontal swipe moves
 * the cards; a vertical swipe scrolls the page and is never intercepted. This is
 * a native overflow scroller, so it inherits the platform's own momentum and
 * rubber-banding, which no JavaScript reproduces convincingly. The pin does not
 * exist here at all: mapping a phone's fling to a horizontal position throws the
 * reader past six years on one flick.
 *
 * Never run both. `matchMedia` builds exactly one, the same rule /history keeps.
 *
 * ── THE CURVE ─────────────────────────────────────────────────────────────
 *
 * The cards sit on a shallow arc. The card at the rail is at full size and at
 * the top of the arc; the further a card is from that position the smaller it
 * gets, the lower it sits and the more it tilts — so the strip reads as a
 * conveyor going over a rise rather than a flat row sliding past.
 *
 * ⚠ SIZE IS THE ONLY EMPHASIS. An earlier build dimmed the unfocused cards to
 * 45% opacity and it read as a blur — the paintings are the argument of this
 * section and washing six of them out to advertise the seventh throws away the
 * thing the reader came for. Every card is at full strength. If this ever needs
 * more separation, take it from scale or elevation, NOT from opacity.
 *
 * Because the curve owns `transform` on every card and repaints it each frame,
 * nothing else may animate transform on a `.chron-card` — no CSS transition, no
 * competing tween. That is why the entrance animation below moves the viewport
 * and not the cards.
 */

/* The left edge of a `max-w-7xl` (80rem) container inside `.section-padding`,
   written so the track can match it without being inside it. At each
   breakpoint: hold the page gutter until the viewport is wide enough that the
   centred container's own edge is further in, then follow that instead. */
const RAIL =
  "pl-[max(1.5rem,calc((100vw-80rem)/2))] md:pl-[max(2rem,calc((100vw-80rem)/2))] lg:pl-[max(4rem,calc((100vw-80rem)/2))]";

/**
 * The shape of the arc.
 *
 * `reach` is how many card-widths away a card has to be before it is at the
 * bottom of the curve — past that it stops changing, so the far end of the
 * strip does not shrink away to nothing.
 *
 * ⚠ `tilt` IS ZERO, AND THAT IS A DECISION, NOT AN OVERSIGHT.
 *
 * The first build rotated each card by up to 2.2°, signed by which side of the
 * focal slot it sat on. On a strip whose focal slot is at the LEFT rail, every
 * visible card is on the same side of it — so every card rotated the same way,
 * and instead of an arc the row read as a slope, with the cards looking like
 * they were sliding off a table to the right. A one-sided arc cannot use
 * rotation; the sign never changes, so the eye reads slant rather than curve.
 *
 * What survives is scale and a small drop, both squared, which read as depth —
 * the strip receding — and never as a tilt. If this ever needs more shape, take
 * it from `shrink`. Do NOT reinstate `tilt` without first moving the focal slot
 * to the middle of the viewport, which is the only geometry rotation works in,
 * and which costs the alignment of the first card with the heading above it.
 */
const CURVE = {
  reach: 2.6,
  /** Scale lost at full reach. 0.10 → the far cards are 90% of the near one. */
  shrink: 0.1,
  /** Pixels a card drops at full reach. */
  dip: 18,
  /** Degrees of rotation. Zero. Read the note above before changing it. */
  tilt: 0,
};

/**
 * How long the strip stands still at the end, as a fraction of its own travel.
 *
 * 0.25 → a quarter of the scroll the strip took to arrive is spent with the
 * last card sitting square on screen before the page moves on. Raise it and the
 * section starts to feel like it is refusing to let go; drop it to 0 and the
 * closing panel is swept past at the speed it arrived at.
 */
const HOLD = 0.25;

/**
 * The beat of stillness at the START, in the same units as HOLD.
 *
 * A pin is, by nature, an abrupt event: one frame the page is moving, the next
 * it is not. What softens it is what the reader sees at that instant. With no
 * lead-in the strip left the rail at full speed on the very frame the lock
 * engaged, so the section both stopped AND lurched sideways at once, and the
 * two together read as a pop.
 *
 * With a lead-in the lock lands on a still picture and the strip gathers itself
 * a moment later — the section catches the reader rather than snatching them.
 * Because the timeline is scrubbed, the same beat is there coming back UP the
 * page: the strip arrives home at the rail and rests before the pin lets go, so
 * the release is as quiet as the catch.
 *
 * Small on purpose. Much past 0.15 and it stops reading as a settle and starts
 * reading as a section that has stopped responding to the wheel.
 */
const LEAD = 0.1;

/**
 * The corner arrow, stroked in gold leaf rather than a flat colour.
 *
 * WHY IT IS NOT THE LUCIDE ICON. A CSS gradient cannot fill an SVG stroke —
 * `background-clip: text` is a text trick and does nothing for a path. The only
 * way to gild a stroke is an SVG `<linearGradient>` referenced by the stroke
 * itself, which means the icon has to carry its own `<defs>`, which means
 * drawing it here instead of importing it. It is the same glyph lucide's
 * ArrowUpRight draws.
 *
 * ⚠ THE ID MUST BE UNIQUE PER INSTANCE. This renders once per card, and a
 * `<linearGradient>` is addressed by id — seven copies of one id is invalid
 * markup and browsers resolve `url(#…)` to whichever they saw first. `useId`
 * gives each card its own, and it is stable across server and client so
 * hydration matches.
 *
 * The stops are set through CLASSES, not `stopColor` attributes, so the values
 * come from the theme tokens rather than being hard-coded hexes that would
 * quietly drift the day the gold changes.
 *
 * The gradient runs dark at the tail to light at the head — bottom-left to
 * top-right, along the arrow — so the leaf catches at the tip, which is the
 * direction the eye is being sent anyway.
 */
function GildedArrow({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        {/* `userSpaceOnUse`, not the default `objectBoundingBox`. The glyph is
            two separate paths, and per-object units would map the gradient
            across EACH path's own box — the shaft and the head would each run
            the full dark-to-light sweep and meet at a seam. In user space both
            strokes read off one gradient laid across the 24×24 grid, so the
            leaf runs continuously from the tail to the point. */}
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="6" y1="18" x2="18" y2="6">
          <stop offset="0%" className="[stop-color:var(--gold-dark)]" />
          <stop offset="45%" className="[stop-color:var(--gold)]" />
          <stop offset="100%" className="[stop-color:var(--gold-light)]" />
        </linearGradient>
      </defs>
      <g
        stroke={`url(#${id})`}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </g>
    </svg>
  );
}

function CarouselCard({ frame, meta }: { frame: ChronicleFrame; meta: ChronicleFrameMeta }) {
  return (
    // Narrower and taller than it was — 23rem against 26rem, on a card that is
    // now half the height of the viewport. The paintings are portrait, so the
    // taller frame shows more of each one and less crop.
    //
    // ⚠ NARROWER MEANS THE PROSE WRAPS MORE, and the text block is anchored to
    // the bottom edge, so it grows UPWARDS into the picture. On a short window
    // the card is short too and the two meet. That is what the `short:` sizes
    // below are for; they are not decoration. If the copy on a card ever grows,
    // check it at 768px tall before shipping.
    /* ── THE WHOLE CARD IS THE LINK NOW ───────────────────────────────────────
       The chapter name used to be repeated a third time at the foot of the card
       as its own link — under a title and a paragraph that already said where
       you were. Removing it does two things: it drops the bottom text block by
       about forty pixels, which is forty more pixels of painting, and it lets
       the card itself become the target.

       That was not possible while the strip was draggable — every throw ended
       in a navigation nobody asked for. It is safe now: desktop is driven by
       page scroll with no drag at all, and the phone build is a NATIVE scroller,
       where a swipe that begins on a link does not fire a click on release.

       The arrow in the corner is the affordance, and it is `aria-hidden` — the
       link takes its accessible name from `aria-label`, so a screen reader
       announces the moment rather than reading a whole paragraph as a link. */
    <Link
      href={meta.href}
      draggable={false}
      aria-label={`${frame.year} — ${frame.title}`}
      className="chron-card group relative block h-full w-[78vw] shrink-0 overflow-hidden rounded-3xl bg-navy shadow-xl ring-1 ring-gold/15 sm:w-[23rem]"
    >
      {/* A HORIZONTAL slack, not the default vertical one: on a phone this strip
          is a native side-scroller, so a card that is nowhere near the screen is
          still inside the viewport's vertical band. The vertical default would
          call all eight of them visible and never release a single painting —
          which is exactly the bug this is here to fix. A full viewport width is
          more than a card either side of the one being read. */}
      <ResidentImage
        src={`/images/history/${meta.photo}`}
        alt={frame.title}
        fill
        sizes="(max-width: 640px) 78vw, 23rem"
        className="object-cover"
        draggable={false}
        slack="0px 100%"
      />
      {/* Sits over the painting, and over the bare navy card while the painting
          is away — so a stripped card is a dark plate with its year and title
          on it, never a hole. */}
      <div className="absolute inset-0 bg-linear-to-t from-night-deep via-navy/60 to-navy/10" />

      {/* Year and chapter stack together on the left, which frees the opposite
          corner for the arrow. */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-6">
        <span className="min-w-0">
          <span className="block font-display text-lg tracking-[0.14em] text-gold tabular-nums">
            {frame.year}
          </span>
          <span className="mt-1.5 block max-w-[11rem] font-display text-[0.63rem] uppercase leading-snug tracking-[0.16em] text-white/60 md:text-[0.55rem] md:tracking-[0.24em] md:text-white/50">
            {frame.chapter}
          </span>
        </span>

        {/* The ring does NOT fill gold on hover any more. It used to, with the
            arrow going navy for contrast — but a gilded arrow on a gold disc is
            an invisible arrow, and the gradient is the point. The ring brightens
            its edge instead and the leaf stays lit throughout. */}
        <span
          aria-hidden="true"
          /* ⚠ THE BLUR IS `md:` ONLY, AND IT IS THE LAST ONE ON THIS PAGE.
             A backdrop-filter makes the compositor read back the pixels under
             the element and re-filter them on every frame the page moves — see
             the note on `.navbar-blur` in globals.css, which is why the bar
             carries no blur below `md` either, and the one in ParishRhythm,
             which is why those cards carry none at all.

             This disc is the case that got missed, and it is the worst-placed
             of the three: there is one PER CARD, so seven of them, and every
             card has its `y` and `scale` rewritten by paint() on every scroll
             frame. A filter that costs a read-back per frame, sitting on seven
             elements that move every frame, is not the same proposition as one
             fixed bar — and this section is the one an iPhone bisect
             (/bisect/4) singled out as where the tab dies.

             Nothing is lost visually. Two pixels of blur behind a disc that is
             already 25% navy over a dark photograph is not a legible effect at
             any size, let alone at 36px. */
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-navy/25 transition-colors duration-500 md:backdrop-blur-[2px] group-hover:border-gold/70 group-hover:bg-navy/45"
        >
          <GildedArrow className="h-[1.05rem] w-[1.05rem] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* ⚠ EVERY `short:` HERE IS NOW `short:md:`, AND IT WAS A REAL BUG.
          `short:` is `max-height: 820px` — written for a 1366×768 laptop, where
          a pinned section has no vertical room to spare. But a phone held
          upright is ALSO under 820px tall (an iPhone 15 gives about 745px of
          viewport), so every phone was silently taking the laptop's emergency
          sizes: the card body dropped to 0.85rem — 13.6px of Cormorant, which
          with its small x-height reads at about 11px — on a card that is 78vw
          wide and has all the room in the world. The pin does not even exist on
          the phone build. Scoping each one to `md` keeps the laptop rescue and
          gives the phone its proper sizes back.

          The Tamil sizes are not a font correction — they are a copy-length
          one. The same frame runs 40–70% longer in Tamil, which pushed the
          text block up over the painting until the art was barely visible.
          At 1.34rem every title returns to a single line as in English, and
          the smaller body buys back two lines of artwork. */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 short:md:p-5">
        <h3 className="font-serif text-[1.5rem] leading-tight text-white md:text-[1.55rem] ta:text-[1.34rem] short:md:text-[1.3rem]">
          {frame.title}
        </h3>
        <div className="my-4 h-px w-12 bg-gold/45 short:md:my-3" />
        <p className="font-serif text-[0.95rem] leading-relaxed text-white/80 md:text-[0.95rem] md:text-white/75 ta:text-[0.82rem] ta:leading-normal short:md:text-[0.85rem]">
          {frame.line}
        </p>
      </div>

      {/* The card is clickable, so it says so on hover. */}
      <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 transition-all duration-700 group-hover:ring-gold/40" />
    </Link>
  );
}

function CarouselDoor({
  title,
  body,
  cta,
  label,
}: {
  title: string;
  body: string;
  cta: string;
  label: string;
}) {
  return (
    <article className="chron-card relative flex h-full w-[78vw] shrink-0 flex-col justify-center overflow-hidden rounded-3xl border border-gold/30 bg-cream-dark px-8 shadow-xl ring-1 ring-gold/10 sm:w-[22rem] md:px-9">
      <div className="light-shaft absolute -top-10 left-[10%] h-[140%] w-[60%] -rotate-12 opacity-60" />
      <div className="relative">
        {/* Same `short:md:` correction as CarouselCard — read the note there. */}
        <p className="font-display text-[0.68rem] uppercase tracking-[0.2em] text-gold-dark md:text-[0.6rem] md:tracking-[0.3em]">
          {label}
        </p>
        <p className="mt-5 font-serif text-[1.7rem] leading-tight text-navy md:text-[1.85rem] short:md:mt-4 short:md:text-[1.55rem]">
          {title}
        </p>
        <p className="mt-5 font-serif text-[1rem] leading-relaxed text-text-muted md:text-[1rem] short:md:mt-4 short:md:text-[0.9rem]">
          {body}
        </p>
        <Link
          href="/history"
          draggable={false}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 font-display text-[0.76rem] uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-gold hover:text-navy md:py-3 md:text-[0.65rem] md:tracking-[0.2em] short:md:mt-6"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

/* ⚠ TEMPORARY DEBUG SWITCH — remove with the /bisect routes.
   An iPhone kills the tab on this section and only this section, and loading
   it with JavaScript disabled in Safari makes it survive. So the trigger is
   in the script, not the markup, the CSS or the images — which the CSS-only
   variants in /bisect/chrono could never have shown, because they left every
   line of this file running.

   `off` turns individual effects off so the phone can say which one:
     "arc"       the measure/paint/scroll machinery
     "entrance"  the fade-and-rise tween on the scroller
   Comma-separated. Nothing passes it in normal use, so the default is the
   component exactly as it shipped. */
export function ChronicleCarousel({ off = "" }: { off?: string } = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  /** How far the whole strip travels end to end. */
  const spanRef = useRef(0);
  /** Set once per card by the measure pass; drives the arc. */
  const curveRef = useRef<
    { el: HTMLElement; centre: number; setY: (v: number) => void; setScale: (v: number) => void }[]
  >([]);
  const focalRef = useRef(0);
  const pitchRef = useRef(1);

  const [isDesktop, setIsDesktop] = useState(false);

  const { t, lang } = useLang();
  const frames = t.home.chronicleFrames;
  const counts = chronicleCounts(t.history.eras, frames.length);
  const lastYear = frames[frames.length - 1]?.year ?? "";

  // The one authority on which build runs. React has to know it too: the two
  // render different markup (a transformed track vs. a native scroller), so it
  // cannot be a CSS-only difference. The server renders the phone build; a
  // desktop client swaps after hydration, which is invisible in practice
  // because this section is three screens down. Do not read matchMedia in the
  // initial state — that is a hydration mismatch.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /**
   * Measure the strip: where each card rests, how far the whole thing travels,
   * and the quick-setters the arc writes through.
   *
   * Read from the DOM rather than computed from card widths, so a card of a
   * different size, a font that loads late or a changed gap cannot put the
   * geometry out of step with what is on screen.
   */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".chron-card"));
    if (!cards.length) return;

    const first = cards[0];
    const rail = first.offsetLeft;

    /* ── HOW FAR THE STRIP TRAVELS, AND WHY IT IS NOT `scrollWidth` ──────────
       The strip has to end with the LAST CARD FULLY ON SCREEN — the last card
       is the way into /history, and stopping with it half off the right edge
       makes the section look like it ran out rather than finished.

       `scrollWidth - clientWidth` does not reliably give that. Browsers
       disagree about whether a flex container's trailing PADDING is included in
       `scrollWidth` when its children overflow, and where it is dropped the
       strip stops with the last card flush against the edge of the screen, or
       clipped. So the trailing gutter is a real ELEMENT (`[data-chron-tail]`)
       rather than a `pr-*` class, and the travel is measured to its right edge.
       Same fix serves the phone build, where the identical quirk makes the last
       card unreachable by scrolling.                                          */
    const tail = track.querySelector<HTMLElement>("[data-chron-tail]");
    const last = cards[cards.length - 1];
    const rightEdge = tail
      ? tail.offsetLeft + tail.offsetWidth
      : last.offsetLeft + last.offsetWidth;

    const span = Math.max(0, rightEdge - viewport.clientWidth);
    spanRef.current = span;

    // The focal point of the arc is the first slot: the card standing at the
    // rail is the one at full size, which is also the card whose left edge
    // lines up with the heading above it.
    focalRef.current = rail + first.offsetWidth / 2;
    pitchRef.current =
      cards.length > 1 ? cards[1].offsetLeft - first.offsetLeft : first.offsetWidth;

    curveRef.current = cards.map((el) => {
      // temporary — see the note on `off`. force3D:true puts translate3d() on
      // all nine cards for the life of the page, which is nine permanent
      // composited layers; "gsapset" skips the write entirely.
      /* Desktop only, for the same reason paint() is: nothing transforms
         these cards on a phone any more, so promoting them to their own
         composited layers would be paying for a texture apiece to hold nine
         pictures that never move. */
      if (isDesktop && !off.includes("gsapset")) {
        gsap.set(el, {
          transformOrigin: "center center",
          force3D: off.includes("force3d") ? false : true,
        });
      }
      return {
        el,
        centre: el.offsetLeft + el.offsetWidth / 2,
        setY: gsap.quickSetter(el, "y", "px") as (v: number) => void,
        setScale: gsap.quickSetter(el, "scale") as (v: number) => void,
      };
    });
  }, [off, isDesktop]);

  /**
   * Lay the cards on the arc for a given strip offset, and keep the progress
   * rail and the counter in step.
   *
   * `offset` is how far the strip has travelled from its start, positive in
   * both builds (desktop negates it into a transform, mobile it IS scrollLeft).
   *
   * ⚠ IT TOUCHES NO REACT STATE. This runs on every frame of a scroll, and the
   * moment it calls a setter it costs a render of eight cards per frame for the
   * sake of a number nobody is reading. It writes through GSAP quick-setters
   * and one inline style, and the component never re-renders while scrolling.
   */
  const paint = useCallback((offset: number) => {
    const items = curveRef.current;
    if (!items.length) return;

    const focal = focalRef.current;
    const pitch = pitchRef.current || 1;

    /* ⚠ THE ARC IS DESKTOP-ONLY, AND THIS IS THE LINE THAT KILLED iPHONES.
       Writing a transform to these cards is what made Safari destroy the tab —
       "A problem repeatedly occurred", deterministically, on every iPhone
       tried, while Android and desktop were fine. It was found by bisection
       rather than by reasoning (/bisect/N to the section, then
       /bisect/chrono/N through the section), and it is narrower than any of
       the things that looked guilty on the way: not the seven backdrop
       filters, not the entrance tween, not force3D, not the scroll handler.
       A SINGLE paint() call, writing translate+scale to nine cards, is enough.

       Each card is 78vw x 30rem with `overflow: hidden`, `rounded-3xl`, a ring
       and a shadow, and they sit inside a horizontally scrolling container
       seven screens wide. Transforming nine of those asks WebKit's compositor
       for something it does not survive; the exact internal limit is not
       documented and the crash log never named one.

       What is lost on a phone: `shrink: 0.1` and `dip: 18` — far cards at 90%
       and eighteen pixels lower. In a native scroller showing about one card
       at a time that was nearly invisible, and it is not worth a dead page.
       Desktop is untouched: there the strip is a transformed track under a
       pinned section, the arc is the whole point of it, and it has never
       crashed anything.

       If this is ever reinstated on touch, reinstate it against a real iPhone,
       not a simulator — the Simulator has no jetsam and will not reproduce it. */
    if (isDesktop && !off.includes("cardtransform")) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // Distance from the focal slot, in card-widths. Unsigned: the arc is
        // the same shape on either side of the focus, and nothing here is
        // rotated — see the note on CURVE.tilt.
        const u = Math.min(1, Math.abs(item.centre - offset - focal) / CURVE.reach / pitch);

        item.setScale(1 - CURVE.shrink * u);
        // Squared, so the top of the curve is broad and flat and the fall-off
        // happens further out. A linear drop reads as a ramp, not a curve.
        item.setY(CURVE.dip * u * u);
      }
    }

    const span = spanRef.current;
    const progress = span === 0 ? 1 : Math.min(1, Math.max(0, offset / span));
    // temporary — see the note on `off`.
    /* The progress rail stays on both builds. It is one span, one pixel tall,
       taking a scaleX — not a card, not clipped, not inside the scroller, and
       nothing the bisect implicated. It is also the only feedback a phone
       reader gets about how far through the chronicle they are, now that the
       arc is gone. */
    if (progressRef.current && !off.includes("progress")) {
      progressRef.current.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
    }
  }, [off, isDesktop]);

  /* ── DESKTOP: the page's scroll drives the strip ──────────────────────────
     A LAYOUT effect, not `useEffect`. ScrollTrigger's `pin` WRAPS the section in
     a .pin-spacer, so the pinned node stops being a child of the node React
     thinks it is a child of. Only the context's revert puts it back, and a
     passive cleanup runs after React's mutation phase — by which point React has
     already tried to remove a reparented node and the navigation dies with a
     removeChild NotFoundError. See useIsomorphicLayoutEffect in lib/gsap.ts. */
  useIsomorphicLayoutEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      measure();

      // Nothing to travel means nothing to pin. A pin of one pixel is not a
      // pin, it is a jitter — so on a screen wide enough to hold the whole
      // strip the section is simply a static row of cards.
      if (spanRef.current <= 0) {
        paint(0);
        return;
      }

      /* ── THE HOLD AT THE END, AND THE BUG IT FIXES ─────────────────────────
         This used to be a single tween across the whole pin, with the pin given
         `span + 45% of a screen` of scroll. That extra distance was meant to be
         a pause on the last card — but a lone tween stretches to fill whatever
         distance its ScrollTrigger covers, so it did nothing of the kind. It
         just made the whole strip travel more slowly, and the final card came
         to rest at the exact instant the pin let go. The last card was never
         seen standing still; the section always ended mid-movement.

         A timeline fixes it because a timeline has PARTS. The strip moves for
         the first `1` of it and then nothing happens for `HOLD` — so the cards
         finish arriving with a real beat of stillness left, the closing panel
         sits square on screen, and only then does the page go on. The two
         durations are RATIOS, not pixels, so they stay true when `span` is
         re-measured on a resize.                                              */
      const tl = gsap.timeline({
        /* ⚠ THE ARC IS REPAINTED FROM THE TIMELINE, NOT FROM THE SCROLLTRIGGER.
           It used to hang off `scrollTrigger.onUpdate`, which fires when the
           SCROLL moves — and `scrub: 0.6` means the strip carries on gliding for
           about half a second AFTER the scroll has stopped. So through the whole
           of that glide — the most visible part of the movement, the part that
           reads as weight — nothing repainted: the cards held whatever scale and
           drop they had when the wheel stopped, and the progress rail froze,
           while the strip slid on underneath them. Then the next flick of the
           wheel fired one update and the arc snapped to where it should have
           been. That snap is the other half of the "pop".

           A timeline's own `onUpdate` fires on every frame its playhead moves,
           and the scrub IS a tween on that playhead — so the arc now tracks the
           glide the whole way down to rest, and the strip decelerates as one
           object instead of a track and a set of cards that disagree. */
        onUpdate: () => paint(-((gsap.getProperty(track, "x") as number) ?? 0)),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.max(1, spanRef.current * (LEAD + 1 + HOLD))}`,
          pin: true,
          scrub: 0.6,
          /* ⚠ NO `anticipatePin`. It exists for pages on the browser's raw
             scroll, where a fast wheel can outrun ScrollTrigger and the pin
             lands a frame late; it buys that back by applying the pin slightly
             BEFORE the trigger reaches its start — i.e. by jumping the section
             into place early, on purpose. This page is on Lenis, whose whole job
             is that the scroll never arrives in one unsmoothed lump, so there is
             no lag here to compensate for. All the option was doing was the
             jump. */
          invalidateOnRefresh: true,
          onRefresh: () => {
            measure();
            paint(-((gsap.getProperty(track, "x") as number) ?? 0));
          },
        },
      });

      // The beat of stillness at each end. An empty tween on a throwaway object
      // is the documented way to hold a scrubbed timeline in place.
      tl.to({}, { duration: LEAD })
        .to(track, { x: () => -spanRef.current, ease: "none", duration: 1 })
        .to({}, { duration: HOLD });

      paint(0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, sectionRef);

    // The pin changes the document height, so every trigger below this section
    // needs its start and end recomputed once the spacer is in place.
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [lang, isDesktop, measure, paint]);

  /* ── MOBILE: the finger drives it, sideways only ───────────────────────── */
  useEffect(() => {
    if (isDesktop) return;
    if (off.includes("arc")) return; // temporary — see the note on `off`
    const viewport = viewportRef.current;
    if (!viewport) return;

    measure();
    paint(viewport.scrollLeft);

    // rAF-throttled: a native scroller fires far more often than a frame, and
    // the arc only ever needs to be right once per paint.
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        paint(viewport.scrollLeft);
      });
    };
    const onResize = () => {
      measure();
      paint(viewport.scrollLeft);
    };

    // temporary — see the note on `off`. Without this the arc is measured and
    // painted exactly once and never touched again, which separates "setting
    // up nine composited layers" from "rewriting them on every scroll frame".
    if (!off.includes("scroll")) {
      viewport.addEventListener("scroll", onScroll, { passive: true });
    }
    // temporary — see the note on `off`. iOS fires resize every time the URL
    // bar shows or hides, and onResize re-runs the whole of measure().
    if (!off.includes("resize")) {
      window.addEventListener("resize", onResize);
    }
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [lang, isDesktop, measure, paint, off]);

  // The strip arrives once, on scroll into view. It moves the VIEWPORT, never
  // the cards: the arc owns every card's transform and repaints it each frame,
  // so a second tween on the same property would fight it.
  useEffect(() => {
    if (off.includes("entrance")) return; // temporary — see the note on `off`
    const ctx = gsap.context(() => {
      gsap.fromTo(
        viewportRef.current,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: viewportRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [lang, off]);

  /* ── NO ARROWS, NO COUNTER, AND NOTHING LOST BY IT ────────────────────────
     There was a row of prev/next buttons and an 03 / 08 counter under the
     strip. Both are gone, and neither was carrying its weight:

       · on desktop the strip is driven by the page's own scroll, so a "next"
         button was a second, slower way to do the thing the reader was already
         doing by scrolling;
       · on mobile it is a native scroller, so the swipe IS the control, and
         arrow keys move it without a line of JavaScript once the region is
         focusable — which is why `tabIndex` is still set on that build;
       · and the row cost about sixty vertical pixels inside a section that is
         pinned to exactly one viewport, where sixty pixels is the difference
         between a comfortable card and a clipped one.

     What replaced them is the hairline rail, which answers the only question
     the buttons were really answering — how much of this is left. */

  const cards = (
    <>
      {frames.map((frame, i) => (
        <CarouselCard key={i} frame={frame} meta={CHRONICLE_FRAMES[i]} />
      ))}
      <CarouselDoor
        label={t.nav.history}
        title={fillCounts(t.home.chronicleDoorTitle, { y: lastYear })}
        body={fillCounts(t.home.chronicleDoorBody, {
          n: counts.remaining,
          c: counts.chapters,
        })}
        cta={t.home.chronicleCta}
      />
      {/* The trailing gutter, as an ELEMENT rather than a `pr-*` on the track.
          See the note in `measure` — browsers disagree about whether a flex
          container's trailing padding counts towards `scrollWidth` when its
          children overflow, and where it does not the strip stops with the
          closing panel flush against the edge of the screen, or clipped, and on
          a phone that last card cannot be scrolled to at all. A real box cannot
          be disagreed about. */}
      <div
        data-chron-tail
        aria-hidden="true"
        className="w-6 shrink-0 md:w-8 lg:w-16"
      />
    </>
  );

  // ⚠ ON DESKTOP THE PINNED SECTION MUST BE EXACTLY ONE VIEWPORT TALL.
  // ScrollTrigger pins the element as it stands; anything taller has its bottom
  // edge cut off for the whole pin, and on a short laptop window that edge is
  // the strip. Hence `lg:h-svh` on the stage, the section's own vertical padding
  // dropped at the same breakpoint, and a card height in vh. Change any of the
  // three and check a short window, not just a tall monitor.
  return (
    <section
      ref={sectionRef}
      className="parchment-sheen relative overflow-hidden bg-cream py-16 md:py-32 lg:py-0"
    >
      {/* ⚠ `lg:pt-20` IS THE NAVBAR, AND IT IS LOAD-BEARING.
          The bar is `position: fixed` and 5rem tall on this breakpoint, so it
          floats over whatever is beneath it. Everywhere else on the site that
          is harmless — the content scrolls past. Here the section is PINNED at
          `top top`, so its first 5rem sit under the bar and stay there for the
          entire pin: the kicker and the top of the heading were being covered
          the whole time the reader was in this section. The padding is inside
          `h-svh`, so the stage still measures exactly one viewport and the
          content simply centres in what is left of it. */}
      <div
        ref={stageRef}
        className="relative lg:flex lg:h-svh lg:flex-col lg:justify-center lg:pt-20"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-16">
          <ChronicleHeader />
        </div>

        <div
          ref={viewportRef}
          // Focusable on the phone build only, where it is a real scroll
          // container: that is what lets a keyboard move it, with no handler of
          // ours involved. On desktop it does not scroll — the page does — so a
          // tab stop there would be a focusable thing that does nothing.
          tabIndex={isDesktop ? undefined : 0}
          role="group"
          aria-roledescription="carousel"
          aria-label={t.home.chronicleLabel}
          // `py-8` is headroom for the arc: cards at the far end of it sit up to
          // CURVE.dip lower and cast a shadow, and this box clips.
          className={`relative mt-7 overflow-hidden py-8 outline-none focus-visible:ring-1 focus-visible:ring-gold/40 ${
            isDesktop
              ? ""
              : // Mobile only: a native horizontal scroller. `overscroll-x-contain`
                // stops a sideways fling at the end of the strip from turning into
                // a page gesture; vertical is untouched, so the page scrolls
                // normally through this section. `data-lenis-prevent` is belt and
                // braces — Lenis does not run on touch at all.
                "overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-pl-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }`}
          data-lenis-prevent={isDesktop ? undefined : true}
        >
          <div
            ref={trackRef}
            // Half the viewport tall now, up from 46vh capped at 30rem. Two
            // things paid for it: the control row went, and so did the
            // "drag, or use the arrows" line — together about a hundred pixels
            // inside a section pinned to exactly one screen.
            //
            // `short:` gives some of it back on a laptop window where the pin
            // has no room to spare (see the variant in globals.css). The `!` on
            // that override is not decoration: both heights are single classes
            // of equal specificity, so which one wins would otherwise depend on
            // the order Tailwind happens to emit a custom variant in. Important
            // makes the short window win by rule rather than by luck.
            //
            // No `pr-*`: the trailing gutter is the [data-chron-tail] element at
            // the end of the track. See `measure`.
            //
            // `lg:will-change-transform`, matching the breakpoint the desktop
            // build switches on. Only that build writes a transform here; below
            // `lg` the track never moves — the VIEWPORT around it scrolls — so
            // the bare class was a standing promise to move that was never kept.
            // It is not a small one either: the track is seven screens wide, and
            // promoting it asks a phone to hold the whole strip as one texture
            // on top of the scrolling layer the browser has already made for it.
            className={`flex h-[30rem] gap-5 lg:will-change-transform md:h-[clamp(19rem,50vh,32rem)] md:gap-6 short:md:h-[clamp(16rem,42vh,22rem)]! ${RAIL} ${
              // `.chron-card`, not `*` — the trailing spacer is a child of this
              // track too, and a snap point on an empty box lets the scroller
              // rest there with the closing panel pushed half off the screen.
              isDesktop ? "" : "[&>.chron-card]:snap-start"
            }`}
          >
            {cards}
          </div>
        </div>

        {/* All that is left of the controls: how much of the chronicle is
            behind you. It answers the only question the arrows were really
            answering, in one pixel of height. */}
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-16">
          <div className="relative h-px bg-navy/12">
            <span
              ref={progressRef}
              className="absolute inset-0 block h-px origin-left scale-x-0 bg-gold-dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
