"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { cappedSizes } from "@/lib/imageSizes";
import { Link } from "@/components/LocaleLink";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useReveal } from "@/components/sections/architecture/useReveal";
import { useLang } from "@/components/layout/LanguageProvider";
import {
  citationsFor,
  NO_SOURCE_LABEL,
  SOURCE_SHORT,
  TIER_LABEL,
} from "@/lib/citations";
import { useIsPhone } from "@/hooks/useIsPhone";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { noteFor } from "@/lib/historyNotes";
import { renderProse } from "@/lib/prose";
import { SOURCE_INDEX } from "@/lib/sources";
// Not from references.ts — that module carries the books themselves, and this is a client
// component. See the note at the head of referenceIndex.ts.
import { hasLeaf } from "@/lib/referenceIndex";

/**
 * /history — the pinned era timeline, with a table of contents in front of it.
 *
 * THE STAGE IS THE ORIGINAL and is deliberately unchanged: each era pins, its
 * photographs crossfade, and the years step through the panel beside them. What
 * changed in July 2026 was the WRITING, not the choreography.
 *
 * WHY THE WRITING CHANGED. The citation audit behind this page is unusually
 * careful — every claim read against the books, tiered by how strongly it is
 * evidenced, then attacked to see what survived. All of that scrupulousness had
 * leaked into the narrative, so each moment told its story in one sentence and
 * withdrew it in the next: "it is memory, and this page records it as memory";
 * "no printed history we have opened names any benefactor"; "It survives; we
 * have not yet read it". One moment was actually titled "What the parish does
 * not claim". A reader came for the story of a village and got the working
 * papers.
 *
 * So the doubt moved out of the prose and under it, where a book keeps it:
 *
 *   the narrative  — i18n `history.eras[].dots[]`, rewritten to be read
 *   the tier       — citations.ts: documented / parish tradition / devotion
 *   the sources    — citations.ts keys, chips that open the actual page
 *   the difficulty — historyNotes.ts, a footnote, only where the tier isn't enough
 *
 * Nothing was softened to buy that. Every conflicting date, every unread book,
 * every figure a second witness disputes is still on this page — it is set below
 * the line now, in smaller type, instead of interrupting the sentence.
 *
 * THE ONLY STRUCTURAL ADDITION is the Contents, right after the hero and before
 * the first era. Fifty-six pinned moments is a long way to scroll to reach 1872,
 * and before it there was no way to reach 1872 at all except through 1685. The
 * preface leaf that used to sit above it is gone — the page now goes straight
 * from the hero to the index, and the index says outright that each row jumps.
 *
 * ── THE MOBILE STAGE (July 2026) ──
 *
 * Desktop pins the stage and scrubs the year off scroll progress. A PHONE DOES
 * NOT SCRUB, and this is the thing to understand before changing anything here:
 * a scrub maps scroll DISTANCE to the year, and a phone fling carries a thousand
 * pixels of momentum the reader never asked for, so one flick tore through six
 * years at once. Distance is the wrong input. The GESTURE is the input — one
 * swipe means one year, however far it throws.
 *
 * So on a phone each era is a plain 100dvh block, the page does not scroll inside
 * a chapter at all (touchmove is prevented), and every move — year, chapter, dot,
 * button — is driven by hand. See buildMobile. The layout that sits on top of it:
 *
 *   the photograph — fixed at 45svh, about half the screen and identical in every
 *                    year. It now carries the year, the year's title and the
 *                    counter inside it; the era's big heading is gone, and a
 *                    hairline label top-left is all that is left of it.
 *   the paragraph  — its own scroll box in what remains, overscroll-CONTAINED so
 *                    it can never leak a gesture to the page. The touch handler
 *                    watches it: a finger in the text scrolls the text, and the
 *                    moment the text has no more to give, that same gesture
 *                    becomes the step to the next year. Read to the end, keep
 *                    going, move on.
 *   the dots       — untouched: a row of beads, tap any one to go to that year.
 *   the four steps — an overlay held at the foot of the stage for the whole
 *                    chapter, one line, « ‹ in the left corner and › » in the
 *                    right. ‹ › move a year. « » move a chapter, and they ARM
 *                    before they fire: the first tap opens the circle into a pill
 *                    naming the chapter it would send you to, the second tap goes.
 *                    Losing your place to a mistap is expensive, so it asks first
 *                    — and shows you the destination while it asks.
 *
 * The reader is let go in exactly two places: swiping back at the first year of
 * the first chapter (up into the Contents) and swiping on at the last year of the
 * last (down to the end of the page). Those are the covers of the book.
 *
 * (A one-card deck was tried here — eight chapters stacked in 100svh with no
 * gesture handling at all. A single flick carried the reader clean past it to the
 * footer. It is the same idea as buildMobile minus the one part that makes it
 * work; don't rebuild it without the handler.)
 *
 * TWO AUTHORITIES, NEVER BOTH LIVE. Desktop derives the year from scroll
 * position; mobile holds it in `current` inside buildMobile and never consults
 * scroll. matchMedia builds exactly one of them. React keeps a MIRROR of the
 * index (`activeDots`) on mobile only, purely so ‹ › can grey out at the ends of
 * a chapter — desktop, where the scrub is fastest, does no React work per year.
 */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Vertical scroll (in vh) allotted to each year-dot within a pinned era.
// DESKTOP ONLY — a phone doesn't measure the year in scroll distance at all; it
// counts gestures. See buildMobile.
const STEP_VH = { desktop: 52 };

// DESKTOP. The quiet needed before a wheel event counts as a NEW gesture rather
// than the tail of the one before it. A trackpad fling keeps firing for the best
// part of a second after the fingers have left the glass, so without this the
// same throw that reads a paragraph out would also step the year — and the
// contract is that reading to the end and then scrolling AGAIN is what moves
// you on. Events keep arriving about every 16ms while a fling is alive, so any
// gap wider than a couple of frames means the reader let go and came back.
const GESTURE_GAP_MS = 200;

// How long an armed chapter button stays armed before it forgets. Long enough to
// read the destination and decide; short enough that a button left open by a
// wandering thumb doesn't fire on the next unrelated tap.
const ARM_TIMEOUT_MS = 5000;

// One generated still per year, in /public/images/history. The filename used to
// be DERIVED from the dot's position — which meant inserting a year silently slid
// every later photo onto the wrong year. Each dot now names its own picture in
// citations.ts, so years can be added, cut or reordered and the image stays with
// the moment it was made for. See IMAGE_PROMPTS.md.
const photoFor = (eraId: string, di: number) => {
  const named = citationsFor(eraId, di)?.photo;
  return `/images/history/${named ?? `${eraId}-${di + 1}.jpg`}`;
};

/* ── WHY THIS PAGE KILLED IPHONES, AND WHAT THE WINDOW IS FOR ──────────────
   `.era-photo` is `opacity: 0`, NOT `display: none` — it has to be, because the
   years crossfade into one another and you cannot fade something that is not
   laid out. But an `opacity: 0` image is still a rendered image: lazy-loading
   fires for it, and it decodes. Every photograph in a chapter is stacked at
   `inset: 0` in the same frame, so they all cross the lazy-load threshold in
   the same instant — the moment the chapter comes near the viewport the phone
   is asked to decode the WHOLE CHAPTER at once, and nothing ever releases it.

   Measured against an iPhone XR (414pt at DPR 2, 3 GB of RAM), the eight
   chapters hold 7, 5, 7, 12, 12, 8, 3 and 6 photographs. Chapter four is 40 MB
   in one hit; by the foot of the page all fifty-eight have decoded and none
   have been freed — around 190 MB, on a phone whose whole tab is killed
   somewhere past two hundred.

   So a phone mounts only a window: the live year, one behind, two ahead. Two
   ahead is the number that matters — it is what makes the next photograph
   already loaded when the crossfade to it starts, which is more than the old
   code guaranteed. The wrapper `.era-photo` div always stays: GSAP indexes
   that list BY POSITION (`gsap.utils.toArray(".era-photo", era)`), so dropping
   one would silently shift every later year onto the wrong picture.

   Unmounting the <img> is the point. Dropping a reference is the only thing
   that lets WebKit reclaim a decoded bitmap; hiding it, or moving it off
   screen, does not. Desktop is deliberately exempt — it is not where the
   memory is scarce, and gating it on React state would force a re-render on
   every year of a scrub the code goes out of its way to keep out of React. */
const PHOTO_BACK = 1;
const PHOTO_FWD = 2;

/* ── COMING BACK FROM A CITATION ───────────────────────────────────────────
   A chip on this page opens a whole route about ONE moment — the claim, the
   leaf of the book, what the book actually settles. Leaving it used to put the
   reader back at the top of an eight-chapter book, which meant the cost of
   checking a source was finding your place again afterwards. Nobody pays that
   twice, and a page whose whole argument is "go and look at the evidence"
   cannot afford to charge for it.

   So a moment has an address — `<era-id>~<dot index>` — and there are two ways
   home, because there are two ways a reader leaves:

     the page's own links  — the crumb and "← Back to the history" carry the
                             address as a URL HASH. It survives a cold load and
                             can be pasted to somebody, which a scroll offset
                             cannot.
     the browser's back    — returns to the bare /history URL with no hash at
                             all, so the chip writes the same address to
                             sessionStorage on its way out.

   The language toggle later joined the second of those — it navigates to the
   twin URL and keeps the scroll offset, which is a different year once the
   prose is a different height. See the switch note further down.

   The stored one is spent by the first restore that actually runs, so it can
   never resurface days later and teleport a reader who arrived at /history for
   their own reasons. */
const RETURN_KEY = "history:return";
const markerFor = (eraId: string, dot: number) => `${eraId}~${dot}`;

/* Era ids contain hyphens and could one day contain anything else, so the
   separator is found from the RIGHT — the dot index is the only part whose
   shape is known. Unknown ids are dropped rather than trusted: this string
   can arrive from the address bar. */
const parseMarker = (raw: string | null | undefined, ids: string[]) => {
  if (!raw) return null;
  const cut = raw.lastIndexOf("~");
  if (cut < 1) return null;
  const eraId = raw.slice(0, cut);
  const dot = Number(raw.slice(cut + 1));
  if (!ids.includes(eraId) || !Number.isInteger(dot) || dot < 0) return null;
  return { eraId, dot };
};

/* Safari in private mode throws on sessionStorage rather than returning null.
   Losing the return address is a disappointment; taking the page down with it
   is not an option. */
const rememberReturn = (eraId: string, dot: number) => {
  try {
    sessionStorage.setItem(RETURN_KEY, markerFor(eraId, dot));
  } catch {}
};
/* Reading and clearing are two calls, not one, so the address cannot be SPENT
   by a mount that is then thrown away. React's StrictMode double-mount did
   exactly that: the first pass took the address, its cleanup cancelled the
   restore it had just scheduled, and the second pass found an empty slot — so
   the browser-back route silently did nothing in development while working in
   production, which is the worst way for a bug to present. Cleared by the
   restore itself, once it has actually run. */
const peekReturn = () => {
  try {
    return sessionStorage.getItem(RETURN_KEY);
  } catch {
    return null;
  }
};
const clearReturn = () => {
  try {
    sessionStorage.removeItem(RETURN_KEY);
  } catch {}
};

/* Gaps between restore attempts, in ms after the one before (so three attempts
   in all, spanning ~1s). See the ⚠ in the restore effect: there is no "the
   layout has stopped moving" event to wait for, and betting everything on one
   moment is what broke this. Short enough that the page is settled long before
   a reader has finished reading the year they landed on. */
const RESTORE_RETRY_MS = [260, 700];

export default function HistoryPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  // Per-era "scroll the pin to year k". Written by the effect below, read by the
  // ‹ › buttons. The buttons cannot hold the index themselves: scroll position is
  // the one authority here, so a button has to MOVE THE SCROLL and let the
  // trigger work out which year that is. See the note at the head.
  const goToRef = useRef<Record<string, (k: number) => void>>({});
  /* Per-era "put the reader on year k of this chapter, from wherever they are
     now". Not the same job as goToRef: those are the rail dots and ‹ ›, pressed
     while the chapter is already square with the viewport, so they only have to
     move the YEAR. Arriving from somewhere else — the Contents, or back from a
     citation — has to TRAVEL as well, and on a phone travelling is a separate
     move from setting the year. Each build registers the version that is true
     for it; `instant` is for a restore, where an animated scroll across seven
     chapters would be a spectacle nobody asked for. */
  const openRef = useRef<
    Record<string, (k: number, instant?: boolean) => void>
  >({});
  const { t, lang, onBeforeSwitch } = useLang();
  /* Gates the per-year panel photographs, which only that path ever shows. */
  const stillReader = usePrefersReducedMotion();

  const h = t.history;

  // Which year each era is showing. This is a MIRROR, not the source: the
  // ScrollTrigger works the year out from scroll position and pushes it here, so
  // React can render the parts only React can render — the year inside the
  // photograph, and whether ‹ › are at the end of their travel.
  const [activeDots, setActiveDots] = useState<Record<string, number>>({});
  const [armed, setArmed] = useState<string | null>(null);
  const dotOf = (eraId: string) => activeDots[eraId] ?? 0;

  /* Which chapters are near enough to be allowed to hold pictures. A chapter is
     resident until the observer has actually SAID it is not: `undefined` reads
     as "keep", so the frame is never briefly empty in the gap between mounting
     and the observer's first callback. */
  const [eraNear, setEraNear] = useState<Record<string, boolean>>({});

  /* ── THE WINDOW IS ON BEFORE THE PAGE HAS EVEN RENDERED ─────────────────
     This used to be derived — `Object.keys(eraNear).length > 0`, i.e. "the
     observer has spoken, so we must be on a phone". That read well and it
     meant the SERVER emitted all fifty-eight photographs, plus fifty-eight
     more in the reduced-motion panels: a hundred and seventeen <img> in the
     document, of which a phone wants about three.

     They are all `loading="lazy"`, so most are never fetched — but "never
     fetched" is not "free". Every one is a node in the DOM, a candidate the
     lazy-load machinery must test against the viewport on scroll, and a
     srcset the preload scanner parses. And the window could not close them
     until React had hydrated and an observer had fired, which on a cheap
     phone on Indian mobile data is seconds after the pictures started
     arriving — so the burst this window exists to prevent had already begun.

     Starting the window CLOSED and opening it for desktop inverts that. The
     document ships the handful of pictures the top of the page can actually
     show; the phone never opens it further, and a desktop opens it on its
     first client render — before GSAP has wired anything, and on a machine
     with the memory to spare.

     `useIsPhone` is a store rather than state-set-from-an-effect so that the
     server snapshot is stable and hydration cannot mismatch on it. It answers
     `true` on the server on purpose; the note in that file says why. */
  const windowed = useIsPhone();

  useEffect(() => {
    if (!windowed) return;

    const root = rootRef.current;
    if (!root) return;

    /* Three-quarters of a viewport of slack either side. A chapter therefore
       mounts its pictures well before any of them could be looked at, and is
       only stripped once it is a good way off screen — so this never takes a
       photograph out from under a reader who is still near it. */
    const io = new IntersectionObserver(
      (entries) => {
        setEraNear((prev) => {
          let next = prev;
          for (const e of entries) {
            const id = (e.target as HTMLElement).id;
            if (!id || prev[id] === e.isIntersecting) continue;
            if (next === prev) next = { ...prev };
            next[id] = e.isIntersecting;
          }
          return next;
        });
      },
      { rootMargin: "75% 0px" }
    );

    root.querySelectorAll<HTMLElement>(".era").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [windowed]);

  /* Before the observer has said anything, only the FIRST chapter counts as
     near. That is the one the reader is looking at, and it is the only one the
     server can know about — every other chapter is somewhere below the fold, so
     assuming it is near means shipping its photographs to a phone that will
     drop them again a frame later.

     The old rule was the opposite ("unknown reads as keep"), to guarantee the
     frame is never briefly empty in the gap between mount and the observer's
     first callback. That guarantee is kept where it is actually visible — the
     first chapter — and given up where it is not: a chapter still below the
     fold has nothing to look empty. The observer's first callback reports
     every element it observes at once, so the true set arrives within a frame
     of mount, long before any later chapter is scrolled to. */
  const near = (eraId: string) => eraNear[eraId] ?? eraId === h.eras[0]?.id;

  /** Is this chapter allowed to hold decoded pictures at all? */
  const eraLive = (eraId: string) => !windowed || near(eraId);

  /** Is this particular year's photograph one of the few kept mounted? */
  const photoLive = (eraId: string, di: number, ai: number) =>
    !windowed ||
    (near(eraId) && di >= ai - PHOTO_BACK && di <= ai + PHOTO_FWD);

  // The contents index is an ordinary band above every pin, so the house
  // reveal is safe here. Scoped to `frontRef` so it can never touch a
  // `.reveal-item` inside a pinned stage.
  useReveal(frontRef, lang);

  useEffect(() => {
    // iOS collapses its URL bar as you scroll, which fires a resize and would
    // otherwise make ScrollTrigger re-measure mid-pin — the classic jump. On a
    // touch device, ignore vertical-only resizes.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia(rootRef);

    // Shared by both variants: find an era's moving parts and return the one
    // function that lights up a year. Everything it does is a class toggle, so
    // stepping a year costs no React work at all — a desktop scrub crosses years
    // continuously, and re-rendering eight chapters of citations on each one
    // would be jank bought for nothing.
    const wire = (era: HTMLElement, mirrorToReact: boolean) => {
      const panels = gsap.utils.toArray<HTMLElement>(".dot-panel", era);
      const photos = gsap.utils.toArray<HTMLElement>(".era-photo", era);
      const frameDots = gsap.utils.toArray<HTMLElement>(".frame-dot", era);
      const railDots = gsap.utils.toArray<HTMLElement>(".rail-dot", era);
      const railBtns = gsap.utils.toArray<HTMLElement>(".rail-btn", era);
      const n = panels.length;

      let current = -1;
      const setActive = (idx: number) => {
        if (idx === current) return;
        current = idx;
        // Panels above the active one slide up & out; below ones wait below,
        // so the previous year always exits upward when scrolling down (and
        // downward when scrolling back up).
        panels.forEach((p, k) => {
          p.classList.toggle("is-active", k === idx);
          p.classList.toggle("is-above", k < idx);
        });
        photos.forEach((p, k) => p.classList.toggle("is-active", k === idx));
        frameDots.forEach((f, k) => f.classList.toggle("is-active", k === idx));
        railDots.forEach((d, k) => {
          d.classList.toggle("is-active", k === idx);
          d.classList.toggle("is-past", k < idx);
        });

        // The mirror exists only so ‹ › can grey out at the ends of a chapter,
        // and those buttons only exist on a phone — so desktop, where the scrub
        // is fastest, does not pay for it. It is handed the same index just
        // written to the DOM, so the two never disagree.
        if (mirrorToReact) {
          setActiveDots((prev) =>
            prev[era.id] === idx ? prev : { ...prev, [era.id]: idx }
          );
        }
      };

      return { panels, railBtns, n, setActive, at: () => current };
    };

    // ── DESKTOP: pin the stage, scrub the year off scroll progress ──
    //
    // ⚠ THE PARAGRAPH READS BEFORE THE PAGE MOVES. A year is bounded now — the
    // panel is exactly as tall as the photograph beside it and scrolls inside
    // itself (see .panel-wrap / .dot-panel in the CSS). It has to be: the
    // longest years run well past a 100vh stage, and the stage is
    // overflow: hidden, so the end of those paragraphs was simply cut off.
    //
    // Bounding it is only half the fix; the other half is that the wheel has to
    // reach the box. So the stage takes the wheel first: while the active year
    // still has text below (or above, going back), that scroll is spent on the
    // paragraph and the page does not move at all — which means the scrub does
    // not advance and the year holds. The moment the paragraph has no more to
    // give, the event is let through to Lenis and the page carries on to the
    // next year exactly as it always did. Read to the end, keep going, move on:
    // the same contract the phone has had since July, now on the monitor too.
    const buildDesktop = () => {
      const cleanups: Array<() => void> = [];
      const eras = gsap.utils.toArray<HTMLElement>(".era");

      // ONE LOCK FOR THE WHOLE PAGE, not one per chapter. While a step is
      // animating, every stage swallows the wheel: a trackpad throws a burst of
      // twenty events and, without this, the first would step the year and the
      // other nineteen would step it another six — the same fling problem the
      // phone has, arriving here the moment a scroll started doing something
      // other than moving the page. Shared rather than per-era because a step
      // can cross into the next chapter, whose own stage would otherwise be
      // under the cursor and free to step again.
      let stepping = 0;
      // When the last wheel event landed, anywhere on the page — see
      // GESTURE_GAP_MS. Shared with the lock, and for the same reason: one
      // throw of a trackpad is one gesture wherever the cursor happens to be.
      let lastWheel = 0;
      const busy = () => stepping !== 0;
      const hold = (ms: number) => {
        window.clearTimeout(stepping);
        stepping = window.setTimeout(() => {
          stepping = 0;
        }, ms);
      };
      cleanups.push(() => window.clearTimeout(stepping));

      // Each chapter's handles, in document order, so the last year of one can
      // hand the reader to the first year of the next. Filled as the loop goes;
      // read only from event handlers, long after every entry exists.
      const chapters: Array<{ n: number; goTo: (k: number, d?: number) => void }> =
        [];

      eras.forEach((era, eraIdx) => {
        const { panels, railBtns, n, setActive: light, at } = wire(era, false);
        if (!n) return;

        const wrap = era.querySelector<HTMLElement>(".panel-wrap");

        // "There is more text below" — the bottom fade on the panel. Without it
        // a paragraph that has been cut at the box edge looks finished, and the
        // reader scrolls on past the half of it they never saw.
        const syncFade = () => {
          const p = panels[at()];
          wrap?.classList.toggle(
            "has-more",
            !!p && p.scrollTop + p.clientHeight < p.scrollHeight - 2
          );
        };

        // Every year opens at its first line — and, coming back up the page, at
        // its last one, so the reader carries on reading in the direction they
        // were already going instead of being dropped at the top of a paragraph
        // they have just read the end of.
        const setActive = (idx: number) => {
          const prev = at();
          if (idx === prev) return;
          light(idx);
          const p = panels[idx];
          if (p) {
            gsap.killTweensOf(p);
            p.scrollTop = idx > prev ? 0 : p.scrollHeight;
          }
          syncFade();
        };

        panels.forEach((p) => {
          p.addEventListener("scroll", syncFade, { passive: true });
          cleanups.push(() => p.removeEventListener("scroll", syncFade));
        });

        setActive(0);
        cleanups.push(() => setActive(0));

        const stage = era.querySelector<HTMLElement>(".stage");
        if (!stage) return;

        // Whether a year overflows its box depends on a measurement, and the
        // measurement changes when the window resizes or a webfont finally
        // swaps in. ScrollTrigger refreshes on exactly those, so ride its
        // signal rather than keeping a second set of listeners.
        ScrollTrigger.addEventListener("refresh", syncFade);
        cleanups.push(() => {
          ScrollTrigger.removeEventListener("refresh", syncFade);
          panels.forEach((p) => gsap.killTweensOf(p));
        });

        // Pin with GSAP rather than CSS sticky: body sets overflow-x:hidden,
        // which makes it a scroll container and kills position:sticky.
        const st = ScrollTrigger.create({
          trigger: era,
          start: "top top",
          end: () => "+=" + (n * STEP_VH.desktop * window.innerHeight) / 100,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(
              Math.max(0, Math.min(n - 1, Math.floor(self.progress * n)))
            );
          },
          // Leaving a chapter is the one move that does not change the year, so
          // the panel it leaves behind would keep the scroll position it had —
          // and a reader who comes back to that chapter would find its first
          // year already half-read. Rewind the year at each end of the chapter
          // to where a reader arriving from that direction should meet it: the
          // top coming down, the last line coming back up.
          onLeaveBack: () => {
            const p = panels[0];
            if (!p) return;
            gsap.killTweensOf(p);
            p.scrollTop = 0;
            syncFade();
          },
          onLeave: () => {
            const p = panels[n - 1];
            if (!p) return;
            gsap.killTweensOf(p);
            p.scrollTop = p.scrollHeight;
            syncFade();
          },
        });

        // Land in the MIDDLE of year k's band of scroll, so the scrub reads it
        // as k with room either side rather than balanced on the boundary.
        // `duration: 0` means be there now, for a restore.
        const goTo = (k: number, duration = 1) => {
          const target = st.start + (st.end - st.start) * ((k + 0.5) / n);
          const lenis = (
            window as unknown as {
              __lenis?: { scrollTo: (t: number, o?: object) => void };
            }
          ).__lenis;
          if (lenis?.scrollTo)
            lenis.scrollTo(target, duration ? { duration } : { immediate: true });
          else
            window.scrollTo({
              top: target,
              behavior: duration ? "smooth" : "auto",
            });
          // A jump gives the trigger no intermediate frames to notice it in.
          if (!duration) ScrollTrigger.update();
        };
        railBtns.forEach((btn, k) => {
          const handler = () => goTo(k);
          btn.addEventListener("click", handler);
          cleanups.push(() => btn.removeEventListener("click", handler));
        });
        goToRef.current[era.id] = goTo;
        /* ⚠ OPENING A CHAPTER AIMS AT YEAR ONE, NOT AT THE SECTION TOP.
           The Contents used to scroll to the <section> itself, and the section
           top IS st.start — the exact boundary at which this trigger becomes
           active. Stop a hair short of it (a smooth scroll lands on a
           subpixel; Lenis measured the target before the pin spacers had
           settled) and the trigger is NOT active, so onUpdate never fires and
           the stage is left showing whatever year it held when the reader last
           walked out of this chapter. Open chapter IV from the index after
           reading it once and it opened on 1874.

           Half a year's band further in, the answer is not on a knife edge:
           it is the same pixel the first rail dot travels to, so the index and
           the dots now agree by construction rather than by coincidence. */
        openRef.current[era.id] = (k, instant) => goTo(k, instant ? 0 : 1.1);
        chapters[eraIdx] = { n, goTo };
        cleanups.push(() => {
          delete goToRef.current[era.id];
          delete openRef.current[era.id];
        });

        // ── One scroll past the end of the text, one year ──
        //
        // Reading the paragraph out used to hand the wheel straight back to the
        // page, and the page then had to travel the REST of that year's band —
        // up to half a screen of scrolling with nothing changing — before the
        // scrub reached the next year. So the last thing a reader did at the end
        // of every year was scroll into dead space.
        //
        // The step is taken deliberately instead: the year is scrolled to, at
        // the same place the rail dots go to, and the page is held still for the
        // length of that animation. At the ends of a chapter the same move
        // carries into the chapter on that side. At the two ends of the BOOK —
        // the first year of the first chapter going up, the last year of the
        // last going down — nothing is taken, and the page scrolls out to the
        // Contents or to the footer as it always did. Those are the covers.

        // Asked BEFORE the gesture is spent, so that at a cover the wheel is
        // never taken at all and the page runs on as it used to.
        const canStep = (dir: number) => {
          const next = at() + dir;
          return (next >= 0 && next < n) || !!chapters[eraIdx + dir];
        };

        const step = (dir: number) => {
          const next = at() + dir;
          if (next >= 0 && next < n) {
            goTo(next, 0.7);
            hold(780);
            return true;
          }
          const neighbour = chapters[eraIdx + dir];
          if (!neighbour) return false;
          neighbour.goTo(dir > 0 ? 0 : neighbour.n - 1, 1);
          hold(1080);
          return true;
        };

        // A wheel notch in lines or pages, in pixels. Firefox reports lines.
        const pixels = (e: WheelEvent, box: HTMLElement) =>
          e.deltaMode === 1
            ? e.deltaY * 16
            : e.deltaMode === 2
              ? e.deltaY * box.clientHeight
              : e.deltaY;

        // Lenis listens on window, so stopping the bubble is what keeps the page
        // still. `lenisStopPropagation` is belt and braces for the case where it
        // is ever moved onto a wrapper inside this one.
        const swallow = (e: WheelEvent) => {
          e.preventDefault();
          e.stopPropagation();
          (e as WheelEvent & { lenisStopPropagation?: boolean })
            .lenisStopPropagation = true;
        };

        const onWheel = (e: WheelEvent) => {
          if (e.ctrlKey) return; // a pinch-zoom, not a scroll

          // Is this a new gesture, or the tail of the one before it? Measured
          // before anything else can return, so a fling that starts outside the
          // pin is still recognised as the same fling once it arrives inside.
          const now = performance.now();
          const fresh = now - lastWheel > GESTURE_GAP_MS;
          lastWheel = now;

          // ⚠ ONLY WHILE THIS CHAPTER IS THE ONE BEING READ. A section is in
          // view for a long time before its pin engages, and the cursor sits
          // over it the whole way down. Without this the paragraph would eat
          // the scroll that was trying to bring the reader INTO the chapter.
          if (!st.isActive) return;

          const p = panels[at()];
          if (!p) return;
          const dy = pixels(e, p);
          if (!dy) return;

          if (busy()) {
            swallow(e); // a step is in flight; the rest of the fling is spent
            return;
          }

          // The paragraph reads first.
          const wants =
            dy > 0
              ? p.scrollTop + p.clientHeight < p.scrollHeight - 1
              : p.scrollTop > 1;
          if (wants) {
            swallow(e);
            // Tweened, not assigned: the page around it is Lenis-smoothed, and
            // a paragraph that jumped a notch at a time next to it would read
            // as a different, cheaper page.
            const target = Math.max(
              0,
              Math.min(p.scrollHeight - p.clientHeight, p.scrollTop + dy)
            );
            gsap.to(p, {
              scrollTop: target,
              duration: 0.45,
              ease: "power2.out",
              overwrite: true,
              onUpdate: syncFade,
            });
            return;
          }

          const dir = dy > 0 ? 1 : -1;
          if (!canStep(dir)) return; // a cover of the book — the page has it

          // The paragraph is read out. Anything still arriving from the throw
          // that read it is spent here rather than stepping the year: the
          // reader has to come back and scroll again, which is the whole
          // contract. (Swallowed, not passed on — letting it through would
          // scroll the page into the dead half of the year's band instead.)
          if (!fresh) {
            swallow(e);
            return;
          }

          // Read to the end, keep going, move on.
          step(dir);
          swallow(e);
        };
        stage.addEventListener("wheel", onWheel, { passive: false });
        cleanups.push(() => stage.removeEventListener("wheel", onWheel));
      });

      return () => cleanups.forEach((fn) => fn());
    };

    // ── MOBILE: one gesture, one year ──
    //
    // NOT a scrub. A scrub maps scroll DISTANCE to the year, so a long flick —
    // which on a phone carries a thousand pixels of momentum the reader never
    // asked for — tore through six years at once. Distance is the wrong input.
    // The gesture is the input: one swipe means one year, however far it throws.
    //
    // So each era is a plain 100dvh block and the page does not scroll inside it
    // at all. A touch is read directly, and while a chapter is mid-way the page
    // scroll is prevented outright. Everything else — moving between chapters,
    // the buttons, the dots — is a programmatic, animated scroll, so the stage is
    // always square with the viewport and never has to be re-aligned.
    //
    // The reader is let go in exactly two places: swiping back at the very first
    // year of the first chapter (up to the Contents) and swiping on at the very
    // last year of the last (down to the end of the page). Those are the two
    // edges of the book, and holding them would be a trap rather than a design.
    const buildMobile = () => {
      const cleanups: Array<() => void> = [];
      const eras = gsap.utils.toArray<HTMLElement>(".era");

      eras.forEach((era, eraIdx) => {
        const { panels, railBtns, n, setActive, at } = wire(era, true);
        if (!n) return;
        setActive(0);
        cleanups.push(() => setActive(0));

        const stage = era.querySelector<HTMLElement>(".stage");
        if (!stage) return;

        // While a step is playing out, the rest of that gesture is swallowed —
        // this is what stops a fling being read as six swipes in a row.
        let settling = 0;
        const busy = () => settling !== 0;
        const hold = (ms: number) => {
          window.clearTimeout(settling);
          settling = window.setTimeout(() => {
            settling = 0;
          }, ms);
        };
        cleanups.push(() => window.clearTimeout(settling));

        // The paragraph reads first. It is overscroll-contained, so it never
        // leaks the gesture to the page; when it has no more to give, the same
        // gesture becomes the step to the next year.
        const paragraphWants = (dir: number) => {
          const p = panels[at()];
          if (!p) return false;
          return dir > 0
            ? p.scrollTop + p.clientHeight < p.scrollHeight - 2
            : p.scrollTop > 2;
        };

        const scrollToEra = (el: HTMLElement) => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          hold(700);
        };

        // True if this gesture was consumed and the page must not scroll.
        const advance = (dir: number) => {
          if (busy()) return true;

          const next = at() + dir;
          const leaving = next < 0 || next >= n;
          const neighbour = leaving ? eras[eraIdx + dir] : undefined;

          // The two edges of the book. Checked FIRST, and before the alignment
          // guard below: a reader who is on their way up out of the first chapter
          // is by definition no longer square with the viewport, and squaring them
          // up would drag them back into the chapter they are trying to leave.
          if (leaving && !neighbour) return false;

          // Arrived by free-scrolling down from the Contents and stopped
          // half-way? Square the stage up, and spend this gesture doing it.
          if (Math.abs(era.getBoundingClientRect().top) > 4) {
            scrollToEra(era);
            return true;
          }

          if (!leaving) {
            setActive(next);
            hold(520);
            return true;
          }
          scrollToEra(neighbour!);
          return true;
        };

        // Is this chapter allowed to hand the page a gesture going this way?
        // Only at the two edges of the book — the first year of the first
        // chapter going back, the last year of the last going on. Everywhere
        // else the gesture belongs to the stage.
        const isOurs = (dir: number) => {
          const next = at() + dir;
          const leaving = next < 0 || next >= n;
          return !(leaving && !eras[eraIdx + dir]);
        };

        let startY = 0;
        let spent = false;
        /* ⚠ THE GESTURE IS CLAIMED ON ITS FIRST PIXEL, NOT ITS SIXTEENTH.
           A swipe on the PHOTOGRAPH used to leave the chapter altogether: 16px
           is the point at which a wobble becomes a swipe worth STEPPING on, and
           the old code did nothing at all below it — but WebKit decides what a
           touch is for the moment it first moves. Let that first move through
           unprevented and the gesture is committed to the page there and then,
           and every preventDefault() after it is ignored. The page scrolled,
           proximity snap settled it on the NEXT ERA, and one swipe on the
           picture skipped a whole chapter.

           The paragraph never showed the bug because it is a scroll box with
           overscroll-behavior: contain, so it cannot chain to the page whatever
           the handler does. Everything else on the stage — the photo, the bead
           rail, the buttons, the padding between them — is a plain box, and all
           of it leaked.

           So the claim is made once per gesture, on the first move that has a
           direction at all, and the 16px threshold now governs only whether the
           year steps. Two things are still released: a paragraph with more to
           read (it scrolls itself), and the two edges of the book (the reader
           has to be able to get out). */
        let mine: boolean | null = null;
        const onTouchStart = (e: TouchEvent) => {
          startY = e.touches[0].clientY;
          spent = false;
          mine = null;
        };
        const onTouchMove = (e: TouchEvent) => {
          const dy = startY - e.touches[0].clientY;
          if (!dy) return; // no direction yet, so nothing to decide
          const dir = dy > 0 ? 1 : -1;
          if (mine === null) mine = !paragraphWants(dir) && isOurs(dir);
          if (!mine) return;
          e.preventDefault();
          // Already stepped on this gesture: the page is held still for the
          // rest of it above, so the follow-through cannot step again.
          if (spent || Math.abs(dy) < 16) return;
          if (advance(dir)) spent = true;
        };

        // Trackpads and mice, for a narrow desktop window. These fire in bursts,
        // so `busy()` is what collapses a burst into one step.
        const onWheel = (e: WheelEvent) => {
          if (Math.abs(e.deltaY) < 4) return;
          const dir = e.deltaY > 0 ? 1 : -1;
          if (paragraphWants(dir)) return;
          if (advance(dir)) e.preventDefault();
        };

        stage.addEventListener("touchstart", onTouchStart, { passive: true });
        stage.addEventListener("touchmove", onTouchMove, { passive: false });
        stage.addEventListener("wheel", onWheel, { passive: false });
        cleanups.push(() => {
          stage.removeEventListener("touchstart", onTouchStart);
          stage.removeEventListener("touchmove", onTouchMove);
          stage.removeEventListener("wheel", onWheel);
        });

        // A dot, or ‹ ›. No scroll involved — the year IS the state here.
        const goTo = (k: number) => {
          setActive(Math.max(0, Math.min(n - 1, k)));
          hold(520);
        };
        railBtns.forEach((btn, k) => {
          const handler = () => goTo(k);
          btn.addEventListener("click", handler);
          cleanups.push(() => btn.removeEventListener("click", handler));
        });
        goToRef.current[era.id] = goTo;
        /* Two moves here where desktop needs only one. Desktop reads the year
           back off scroll position, so scrolling IS setting the year; here the
           year is state and the page has to be carried to the chapter
           separately. Doing only the second is what left a chapter you had
           read before re-opening half way through itself — the Contents said
           "chapter IV" and got 1874, because nothing had told it otherwise. */
        openRef.current[era.id] = (k, instant) => {
          goTo(k);
          era.scrollIntoView({
            behavior: instant ? "auto" : "smooth",
            block: "start",
          });
          // The travel is longer than a year-step, so the gesture lock has to
          // outlast it — otherwise the swipe that follows lands mid-flight and
          // is spent squaring the stage up instead of turning the page.
          if (!instant) hold(700);
        };
        cleanups.push(() => {
          delete goToRef.current[era.id];
          delete openRef.current[era.id];
        });
      });

      return () => cleanups.forEach((fn) => fn());
    };

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      buildDesktop
    );
    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      buildMobile
    );
    // Under prefers-reduced-motion nothing is pinned, no trigger is built and no
    // gesture is intercepted. CSS lays every year out in normal flow.

    return () => mm.revert();
  }, [lang]);

  // An armed chapter button forgets itself if it isn't confirmed.
  useEffect(() => {
    if (!armed) return;
    const id = window.setTimeout(() => setArmed(null), ARM_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [armed]);

  // Bring an element to the top of the viewport. Lenis is desktop-only; a phone
  // falls through to the browser's own smooth scroll.
  //
  // This is NOT how a chapter is opened any more, and the reasoning that said it
  // was is worth keeping as a warning: an era's top is exactly where its pin
  // BEGINS, so landing on it looked like landing on that era's first year. It is
  // the boundary, not the inside — see the ⚠ on openRef in buildDesktop. Only
  // the reduced-motion page, where nothing is pinned and a section top is just a
  // section top, still travels this way.
  const scrollToTopOf = useCallback((el: Element | null) => {
    if (!el) return;
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: Element, o?: object) => void };
      }
    ).__lenis;
    if (lenis?.scrollTo) lenis.scrollTo(el, { duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ── Stepping through a chapter ──

  // ‹Previous / Next› — one year per tap. It does NOT set an index: it scrolls
  // the pin to where that year lives, and the trigger notices. Anything else and
  // a tap and a swipe would be two different authorities on the same question.
  // Clamped rather than wrapped — the ends of a chapter are where « » take over,
  // and looping silently back to 1542 would read as a bug.
  const stepDot = (eraId: string, delta: number, total: number) => {
    setArmed(null);
    const next = Math.min(total - 1, Math.max(0, dotOf(eraId) + delta));
    goToRef.current[eraId]?.(next);
  };

  /** Put the reader on year `dot` of chapter `eraId`, wherever they are now. */
  const openAt = useCallback(
    (eraId: string, dot: number, instant = false) => {
      const open = openRef.current[eraId];
      if (open) {
        open(dot, instant);
        return;
      }
      // No build ran: prefers-reduced-motion, where nothing is pinned, nothing
      // is stepped, and every year of every chapter stands open in normal
      // flow. There is no machinery to drive — the moment is simply an element
      // on the page, so scroll to it. Falls back to the chapter if the page is
      // somehow not laid out yet.
      const el =
        document.querySelector(`[data-moment="${markerFor(eraId, dot)}"]`) ??
        document.getElementById(eraId);
      if (!el) return;
      if (instant) el.scrollIntoView({ block: "start" });
      else scrollToTopOf(el);
    },
    [scrollToTopOf]
  );

  // Open a chapter — from the Contents index, or from « ». Always at its first
  // year: a chapter you have read before must not re-open half way through it.
  const openChapter = useCallback(
    (index: number) => {
      const target = h.eras[index];
      if (!target) return;
      setArmed(null);
      openAt(target.id, 0);
    },
    [h.eras, openAt]
  );

  /* ── Coming back to the moment you left from ──
     See the note above RETURN_KEY. The hash is what this page's own citation
     route links back with; sessionStorage catches the reader who used the
     browser's back button instead, which returns to a bare /history. */
  useEffect(() => {
    const ids = h.eras.map((e) => e.id);
    let hash: string | null = null;
    try {
      hash = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      // A malformed %-escape in the address bar. Not our problem to solve.
    }
    // Peeked rather than taken: see peekReturn. A hash still wins when both are
    // present, and the stored one is cleared by the restore below either way, so
    // it cannot fire at some later, unrelated visit.
    const where = parseMarker(hash, ids) ?? parseMarker(peekReturn(), ids);
    if (!where) return;

    /* ⚠ MEASURE FIRST, AND MORE THAN ONCE. On desktop the year is READ BACK OFF
       scroll position, so a restore is only ever as good as ScrollTrigger's idea
       of where this chapter's pin begins — and that number moves as the
       photographs above it land and the Tamil webfont swaps in.

       This used to wait for `load`, which is right for a cold load and quietly
       wrong for the way readers actually come back. "← Back to the moment" is a
       SOFT navigation: `load` fired long ago and will never fire again, so the
       code took its `document.readyState === "complete"` branch — written for
       "the page had already finished loading before this effect ran" — and aimed
       at a document that had measured nothing yet. It landed a few years out, or
       in the wrong chapter, according to what happened to still be cached.
       ScrollTrigger.update() did not save it either: that re-reads progress from
       the current scroll, it does not re-measure where a pin starts.

       So refresh, aim, and do it again as the layout settles. There is no event
       that means "everything has stopped moving", and betting on a single moment
       is the mistake being fixed. */
    let cancelled = false;
    let attempt = 0;
    let raf = 0;
    let timer = 0;

    const land = () => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      openAt(where.eraId, where.dot, true);
      clearReturn();
      const next = RESTORE_RETRY_MS[attempt++];
      if (next !== undefined) timer = window.setTimeout(land, next);
    };

    /* The reader wins the moment they touch anything. A retry firing under a
       hand that is already scrolling stops being a restore and becomes the page
       taking the scroll back off them — worse than landing a year out. */
    const stop = () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    const listen = { passive: true, once: true } as const;
    window.addEventListener("wheel", stop, listen);
    window.addEventListener("touchstart", stop, listen);
    window.addEventListener("keydown", stop, listen);

    /* Two frames before the first attempt, because a soft navigation brings its
       own scroll with it. The back links pass `scroll={false}` so Next does not
       send the route to the top, but the frames cost nothing and keep this
       correct if that prop is ever dropped. */
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(land);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [h.eras, openAt]);

  /* ── SWITCHING LANGUAGE MID-CHAPTER ───────────────────────────────────────
     A language switch is a navigation to the twin URL with the scroll offset
     left alone, which is right for every other page on the site and wrong for
     this one. A chapter is a different height in Tamil — different prose,
     different font metrics — so the same offset is a different year, and the
     reader who pressed தமிழ் at 1803 arrived somewhere in 1785.

     So it becomes the same problem as coming back from a citation, and takes
     the same road: write the moment's address on the way out, and let the
     restore effect above pick it up on the other side. That effect re-runs on
     the switch (the dictionary, and so `h.eras`, is a different object in the
     other language), and it clears the address once it has landed. */

  /** Where the reader is now, as a moment address — or null if they are above
      the first chapter, in the hero or the Contents, where there is no year to
      keep. Read from the DOM, not from React: on desktop the year lives in
      scroll position and the classes GSAP writes from it, and `activeDots` is
      deliberately not mirrored there (see the note on it). */
  const currentMoment = useCallback(() => {
    const root = rootRef.current;
    if (!root) return null;
    const mid = window.innerHeight / 2;

    // The chapter being read is the one straddling the middle of the screen.
    // Chapters are contiguous, so past the Contents exactly one always is.
    const era = Array.from(root.querySelectorAll<HTMLElement>(".era")).find(
      (s) => {
        const r = s.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      }
    );
    if (!era?.id) return null;

    const panels = Array.from(era.querySelectorAll<HTMLElement>(".dot-panel"));
    if (!panels.length) return null;

    // Desktop and phone: a build is running and its `is-active` class is the
    // authority on the year, exactly as it is for the rail dots.
    if (openRef.current[era.id]) {
      const active = panels.findIndex((p) => p.classList.contains("is-active"));
      if (active >= 0) return { eraId: era.id, dot: active };
    }

    // prefers-reduced-motion: nothing is pinned, no build ran, and every year
    // stands open in normal flow — so the year is the one on screen.
    let best = -1;
    let bestGap = Infinity;
    panels.forEach((p, k) => {
      const r = p.getBoundingClientRect();
      const gap = Math.abs((r.top + r.bottom) / 2 - mid);
      if (gap < bestGap) {
        bestGap = gap;
        best = k;
      }
    });
    return best >= 0 ? { eraId: era.id, dot: best } : null;
  }, []);

  useEffect(
    () =>
      onBeforeSwitch(() => {
        const at = currentMoment();
        if (at) rememberReturn(at.eraId, at.dot);
      }),
    [onBeforeSwitch, currentMoment]
  );

  // ‹Previous chapter / Next chapter› — two taps. The first arms the button and
  // opens it to name the chapter it would take you to; only the second travels.
  const stepEra = (fromIdx: number, delta: number) => {
    const key = `${h.eras[fromIdx].id}:${delta}`;
    if (armed !== key) {
      setArmed(key);
      return;
    }
    openChapter(fromIdx + delta);
  };

  return (
    <div ref={rootRef} className="history-timeline">
      <PageHero
        label={h.label}
        title={h.title}
        intro={h.intro}
        image="/images/bw-old-pic.jpg"
        alt="An archival black-and-white photograph of the great two-nave church at Vadakkankulam, its spires and pinnacles against a clouded sky"
      />

      <div ref={frontRef}>
        {/* Contents — the eight eras, and the only way to reach 1872 without
            scrolling through 1685. */}
        <section className="relative bg-cream-dark parchment-swell section-padding overflow-hidden">
          <div className="relative max-w-3xl mx-auto">
            <p className="reveal-item kicker mb-4">{h.contentsLabel}</p>
            {/* The house mobile body size, 15.7px — see the note in
                sections/Patroness.tsx. 16px Geist in a 340px column sets about
                36 characters a line; this lands nearer 40, which is where the
                sans copy sits everywhere else on the site. */}
            <p className="reveal-item text-[0.98rem] md:text-base text-text-muted mb-10 max-w-lg">
              {h.contentsHint}
            </p>
            <ol className="border-t border-gold/20">
              {h.eras.map((era, i) => (
                <li key={era.id} className="reveal-item border-b border-gold/20">
                  <button
                    type="button"
                    onClick={() => openChapter(i)}
                    className="contents-row group"
                  >
                    <span className="contents-numeral">{ROMAN[i] ?? i + 1}</span>
                    <span className="contents-title font-serif">
                      {era.heading}
                      <span className="contents-arrow" aria-hidden="true">→</span>
                    </span>
                    <span className="contents-span font-display">{era.span}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* The chapters */}
      <div className="bg-cream">
        {h.eras.map((era, i) => {
          // Mobile only — on desktop this never leaves 0 and GSAP owns the classes.
          const ai = dotOf(era.id);
          const prevEra = h.eras[i - 1];
          const nextEra = h.eras[i + 1];
          const armedPrev = armed === `${era.id}:-1`;
          const armedNext = armed === `${era.id}:1`;

          return (
          <section
            key={era.id}
            id={era.id}
            className="era relative border-t border-gold/15"
          >
            {/* Pinned stage — sticks for the length of this era's dots (desktop).
                On a phone nothing pins; this is just the card. */}
            <div className="stage relative">
              {/* Oversized faint Roman numeral — the "Little Rome" thread */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <span className="section-numeral absolute -top-8 right-6 select-none opacity-[0.06] leading-none text-[40vw] md:text-[16rem]">
                  {ROMAN[i] ?? i + 1}
                </span>
              </div>

              {/* `py-16`, not `py-24`. Both the animated paths override this
                  padding outright — desktop centres a 100vh stage, the phone
                  block sets 4.9rem/0 — so the only reader who ever sees it is
                  the one on a phone with prefers-reduced-motion set, where
                  nothing pins and every year stands in normal flow. 6rem of
                  dead space above and below each chapter is a monitor value;
                  4rem is the phone one. Desktop is untouched at `md:py-0`. */}
              <div className="stage-inner relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-0 grid md:grid-cols-[minmax(0,31rem)_1fr] gap-12 md:gap-16 lg:gap-20 items-center">
                {/* IMAGE — held to its existing width (31rem) even as the stage
                    widens to match the navbar's max-w-7xl, so the extra room
                    goes entirely to the text column instead of stretching the
                    photo. Nudged left so it doesn't just re-center in the new,
                    wider track. */}
                <div className="era-media md:-ml-2 lg:-ml-4">
                  <div className="era-frame relative aspect-[4/5] md:h-[70vh] md:aspect-auto rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gold/20">
                    {era.dots.map((dot, di) => (
                      <div
                        key={di}
                        className={`era-photo ${di === ai ? "is-active" : ""}`}
                      >
                        {/* The div is unconditional, the picture is not — see
                            the note above PHOTO_BACK for why the wrapper has to
                            stay even when nothing is inside it. */}
                        {photoLive(era.id, di, ai) && (
                          <Image
                            src={photoFor(era.id, di)}
                            alt={`${era.heading} — ${dot.year}`}
                            fill
                            className="object-cover"
                            sizes={cappedSizes("(max-width: 768px) 100vw, 45vw")}
                            /* The year about to be faded TO is fetched at high
                               priority, so the crossfade starts on a picture
                               that has arrived. Safari honours this from 17.2;
                               everywhere else it is ignored, not harmful. */
                            fetchPriority={di === ai + 1 ? "high" : undefined}
                          />
                        )}
                      </div>
                    ))}
                    <div className="frame-scrim absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-navy/10" />
                    {/* `p-5` on a phone: like the padding above, this caption is
                        hidden in the animated mobile stage (the year and its
                        title take the picture there) and survives only on the
                        reduced-motion path — where 1.75rem of inset on either
                        side of a 340px frame is a tenth of the screen spent on
                        margin. `md:p-9` keeps the designed desktop inset. */}
                    <div className="era-caption absolute inset-x-0 bottom-0 p-5 md:p-9">
                      <p className="font-display text-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-3">
                        {era.span}
                      </p>
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                        {era.heading}
                      </h2>
                    </div>

                    {/* ── Mobile: what used to be the era's big heading ──
                        Reduced to a hairline so the reader still knows which
                        chapter this is, without it competing with the year. */}
                    <p className="frame-label" aria-hidden>
                      <span className="frame-label-num">{ROMAN[i] ?? i + 1}</span>
                      {era.heading}
                    </p>

                    {/* ── Mobile: the year, inside the picture ──
                        A stack that crossfades with the photographs. Kept at the
                        frame level rather than nested inside `.era-photo`: a layer
                        mid-fade has opacity < 1, which makes it a stacking context,
                        and its text would drop under the scrim for the length of
                        every transition. */}
                    {era.dots.map((dot, di) => (
                      <div
                        key={di}
                        className={`frame-dot ${di === ai ? "is-active" : ""}`}
                        aria-hidden={di !== ai}
                      >
                        <p className="frame-dot-top">
                          <span className="frame-dot-year font-display">
                            {dot.year}
                          </span>
                          <span className="frame-dot-count font-display">
                            {String(di + 1).padStart(2, "0")} /{" "}
                            {String(era.dots.length).padStart(2, "0")}
                          </span>
                        </p>
                        <h2 className="frame-dot-title font-serif">{dot.title}</h2>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dot rail + the one active year. Vertical beside the panel on
                    desktop; a horizontal row of beads under the photo on mobile. */}
                <div className="era-body flex gap-6 md:gap-8">
                  <ul className="rail flex flex-col justify-center items-stretch gap-2.5">
                    {era.dots.map((dot, di) => (
                      <li
                        key={di}
                        className={`rail-dot ${di === ai ? "is-active" : ""} ${
                          di < ai ? "is-past" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="rail-btn"
                          aria-label={`${dot.year} — ${dot.title}`}
                        >
                          <span className="rail-year">{dot.year}</span>
                          <span className="rail-dotbox">
                            <span className="rail-core" />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="panel-wrap relative flex-1 md:min-h-[26rem]">
                    {era.dots.map((dot, di) => {
                      const cite = citationsFor(era.id, di);
                      const cited = (cite?.keys ?? [])
                        .map((k) => SOURCE_INDEX[k])
                        .filter(Boolean);
                      const note = noteFor(era.id, di, lang);

                      return (
                        <article
                          key={di}
                          // The moment's address, and the only handle the
                          // reduced-motion path has for a restore — there is no
                          // build there to ask, so openAt() finds the year the
                          // way a reader would: as an element on the page.
                          data-moment={markerFor(era.id, di)}
                          // `is-above` is rendered as well as toggled, so that a
                          // re-render reproduces EXACTLY what the scrub would have
                          // set. Leave it out and React, rewriting this attribute
                          // the moment the string changes, strips the class off
                          // the year it just moved past — and that year then
                          // re-enters from below on the way back up instead of
                          // from above, which reads as a glitch.
                          className={`dot-panel flex flex-col justify-center ${
                            di === ai ? "is-active" : ""
                          } ${di < ai ? "is-above" : ""}`}
                        >
                          {/* Reduced-motion only. Nothing is pinned there, so the
                              crossfading stack above never advances past photo 1 —
                              each year carries its own picture instead.

                              ⚠ THE CONDITION HERE MUST MATCH THE CSS BELOW, which
                              is `display: none` except under
                              `prefers-reduced-motion: reduce`, and there only for
                              `:not(:first-of-type)`. It used to be gated on
                              `eraLive` alone, on the reasoning that a hidden lazy
                              image is never fetched. True, and it still put
                              fifty-eight <img> that nobody would ever see into
                              every copy of this document — the great majority of
                              the hundred and seventeen it was shipping. Not
                              fetching is not the same as not existing.

                              The hook's server snapshot is a stable `false`, so
                              these cost nothing until a client that actually
                              wants them says so. */}
                          {/* Chapter-level residency only, NOT the dot window:
                              on the reduced-motion path every year stands open
                              in normal flow, so all of them are genuinely
                              scrolled past and each needs its own picture. */}
                          <div className="panel-photo relative">
                            {stillReader && di > 0 && eraLive(era.id) && (
                              <Image
                                src={photoFor(era.id, di)}
                                alt={`${era.heading} — ${dot.year}`}
                                fill
                                className="object-cover"
                                sizes={cappedSizes("(max-width: 768px) 100vw, 45vw")}
                              />
                            )}
                          </div>
                          <p className="panel-count font-display text-text-muted text-xs tracking-[0.4em] uppercase mb-4">
                            {String(di + 1).padStart(2, "0")} / {String(era.dots.length).padStart(2, "0")}
                          </p>
                          <p className="dot-year font-display text-4xl md:text-6xl leading-none text-gradient-gold">
                            {dot.year}
                          </p>
                          <h3 className="dot-title mt-4 font-serif text-2xl md:text-3xl text-navy">
                            {dot.title}
                          </h3>
                          {/* The animated phone stage sets its own size for
                              `.dot-body` in the CSS below (a clamp, so the
                              paragraph fits its scroll box); this pair is what
                              the reduced-motion phone reader gets, and 18px was
                              the monitor number left standing. 15.7px is the
                              house mobile body — see sections/Patroness.tsx. */}
                          <p className="dot-body mt-3 text-[0.98rem] md:text-lg leading-relaxed">
                            {renderProse(dot.body)}
                          </p>

                          {/* ── Below the line ──
                              The footnote, where this moment has one: a date two
                              sources disagree on, a figure a second witness
                              disputes, a book nobody has opened. It is here so the
                              story above it never has to stop and hedge. */}
                          {note && (
                            <p className="dot-note">
                              <span className="dot-note-label">{h.noteLabel}</span>
                              {note}
                            </p>
                          )}

                          {/* What this moment actually rests on. The tier is not
                              decoration — it is the honest strength of the claim,
                              and the documented half of this page is believed
                              precisely because the rest is labelled honestly. */}
                          {cite && (
                            <div className="dot-cite">
                              <span className={`dot-tier dot-tier--${cite.tier}`}>
                                {TIER_LABEL[cite.tier][lang]}
                              </span>
                              {cited.length ? (
                                cited.map((s) => {
                                  // Where we hold the book, the chip opens the actual
                                  // page. Where we don't, it goes to the bibliography as
                                  // it always did — a chip must never point at a leaf we
                                  // never built.
                                  const open = hasLeaf(era.id, di, s.id);
                                  return (
                                    <Link
                                      key={s.id}
                                      href={
                                        open
                                          ? `/reference/${era.id}/${di}/${s.id}`
                                          : `/sources#${s.id}`
                                      }
                                      /* Drop a return address on the way out.
                                         The citation route links back with the
                                         same address in the URL; this is for
                                         the reader who uses the browser's back
                                         button, and for /sources, which has no
                                         idea which moment sent them. */
                                      onClick={() => rememberReturn(era.id, di)}
                                      className={`cite-chip ${open ? "cite-chip--open" : ""}`}
                                      title={
                                        open
                                          ? `${s.title} — read the page`
                                          : `${s.author ? s.author + " — " : ""}${s.title} (${s.detail})`
                                      }
                                    >
                                      {SOURCE_SHORT[s.id] ?? s.title}
                                    </Link>
                                  );
                                })
                              ) : (
                                // Say it rather than show an empty badge. A page that admits
                                // where it has nothing is believed where it has something.
                                <span className="cite-none">{NO_SOURCE_LABEL[lang]}</span>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>

                {/* ── The four steps (mobile only; display:none on desktop) ──

                    An overlay pinned to the foot of the stage — see the CSS. One
                    line, pushed to the two corners: « ‹ … › ». Small circles,
                    because the dots above are the instrument for moving through a
                    chapter and these are only the ends of it. Chapter jumps sit
                    outermost — furthest from the thumb, since going further is the
                    rarer and more expensive move.

                    A chapter circle ARMS before it fires: the first tap opens it
                    into a pill naming where it would send you, the second tap
                    goes. That is the one place the row is allowed to grow. */}
                <div className="era-nav">
                  <div className="era-nav-side">
                    <button
                      type="button"
                      className={`nav-btn nav-btn--chapter ${
                        armedPrev ? "is-armed" : ""
                      }`}
                      disabled={!prevEra}
                      aria-expanded={armedPrev}
                      onClick={() => stepEra(i, -1)}
                      aria-label={
                        prevEra
                          ? `${h.navPrevChapter}: ${prevEra.heading}${
                              armedPrev ? ` — ${h.navTapAgain}` : ""
                            }`
                          : h.navPrevChapter
                      }
                    >
                      <span className="nav-chev" aria-hidden>
                        «
                      </span>
                      {armedPrev && prevEra && (
                        <span className="nav-target">{prevEra.heading}</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className="nav-btn nav-btn--year"
                      disabled={ai === 0}
                      onClick={() => stepDot(era.id, -1, era.dots.length)}
                      aria-label={
                        ai > 0
                          ? `${h.navPrev}: ${era.dots[ai - 1].year} — ${era.dots[ai - 1].title}`
                          : h.navPrev
                      }
                    >
                      <span className="nav-chev" aria-hidden>
                        ‹
                      </span>
                    </button>
                  </div>

                  <div className="era-nav-side">
                    <button
                      type="button"
                      className="nav-btn nav-btn--year"
                      disabled={ai === era.dots.length - 1}
                      onClick={() => stepDot(era.id, 1, era.dots.length)}
                      aria-label={
                        ai < era.dots.length - 1
                          ? `${h.navNext}: ${era.dots[ai + 1].year} — ${era.dots[ai + 1].title}`
                          : h.navNext
                      }
                    >
                      <span className="nav-chev" aria-hidden>
                        ›
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`nav-btn nav-btn--chapter ${
                        armedNext ? "is-armed" : ""
                      }`}
                      disabled={!nextEra}
                      aria-expanded={armedNext}
                      onClick={() => stepEra(i, 1)}
                      aria-label={
                        nextEra
                          ? `${h.navNextChapter}: ${nextEra.heading}${
                              armedNext ? ` — ${h.navTapAgain}` : ""
                            }`
                          : h.navNextChapter
                      }
                    >
                      {armedNext && nextEra && (
                        <span className="nav-target">{nextEra.heading}</span>
                      )}
                      <span className="nav-chev" aria-hidden>
                        »
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          );
        })}
      </div>

      <style>{`
        /* ── Contents ── */
        .history-timeline .contents-row {
          display: grid;
          grid-template-columns: 2.75rem 1fr auto;
          align-items: baseline;
          gap: 1rem;
          width: 100%;
          padding: 1.15rem 0;
          text-align: left;
          background: transparent;
          border: 0;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .history-timeline .contents-row:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 4px;
          border-radius: 4px;
        }
        .history-timeline .contents-numeral {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          color: var(--gold-dark);
          opacity: 0.75;
        }
        .history-timeline .contents-title {
          font-size: 1.35rem;
          line-height: 1.25;
          color: var(--navy);
          transition: color 0.35s ease;
        }
        .history-timeline .contents-row:hover .contents-title { color: var(--gold-dark); }
        /* A standing hint that the row is clickable, not just a hover reward —
           faint at rest so it reads as punctuation, then steps out on hover
           or keyboard focus. */
        .history-timeline .contents-arrow {
          display: inline-block;
          margin-left: 0.6em;
          font-size: 0.8em;
          color: var(--gold);
          opacity: 0.4;
          transform: translateX(0);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .history-timeline .contents-row:hover .contents-arrow,
        .history-timeline .contents-row:focus-visible .contents-arrow {
          opacity: 1;
          transform: translateX(4px);
        }
        .history-timeline .contents-span {
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        /* The span — "1542–1685" — is the only thing on a Contents row that
           isn't the chapter's name, and it is how a reader picks the century
           they came for. At 0.7rem it was 11.2px of spaced-out Cinzel, right on
           the floor below which small caps stop being read and start being
           guessed at. It goes up half a step and the tracking comes off to pay
           for it: 0.7rem/0.16em and 0.76rem/0.1em set to the same width, so no
           row grows and the column beside the title is unchanged. */
        @media (max-width: 767px) {
          .history-timeline .contents-span {
            font-size: 0.76rem;
            letter-spacing: 0.1em;
          }
        }
        @media (max-width: 480px) {
          .history-timeline .contents-row {
            grid-template-columns: 2.25rem 1fr;
            row-gap: 0.3rem;
          }
          .history-timeline .contents-span { grid-column: 2; }
          .history-timeline .contents-title { font-size: 1.15rem; }
        }

        .history-timeline .era-photo {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .7s ease;
        }
        .history-timeline .era-photo.is-active { opacity: 1; }

        /* Built for the phone; switched on in the mobile block below. Off here so
           they never touch the desktop stage — and, being display:none, the
           chapter buttons cannot be clicked there, which is what freezes the
           React state that would otherwise fight GSAP for .is-active. */
        .history-timeline .frame-label,
        .history-timeline .frame-dot,
        .history-timeline .era-nav { display: none; }

        .history-timeline .rail { position: relative; }
        .history-timeline .rail::before {
          content: "";
          position: absolute;
          top: 6px;
          bottom: 6px;
          right: 11.5px;
          width: 1px;
          background: var(--line-gold);
        }
        .history-timeline .rail-dot { position: relative; }
        .history-timeline .rail-btn {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.8rem;
          width: 100%;
          padding: 3px 0;
          margin: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .history-timeline .rail-btn:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
          border-radius: 6px;
        }
        .history-timeline .rail-year {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.06em;
          line-height: 1;
          white-space: nowrap;
          color: var(--navy);
          opacity: 0.55;
          transition: opacity .4s ease, color .4s ease;
        }
        .history-timeline .rail-dot.is-past .rail-year { opacity: 0.72; }
        .history-timeline .rail-dot.is-active .rail-year {
          opacity: 1;
          color: var(--gold-dark);
        }
        .history-timeline .rail-dotbox {
          flex: none;
          display: grid;
          place-items: center;
          width: 24px;
          height: 24px;
        }
        .history-timeline .rail-core {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: var(--cream);
          box-shadow: inset 0 0 0 1.5px var(--gold);
          opacity: 0.5;
          transition: transform .45s ease, opacity .45s ease, box-shadow .45s ease, background .45s ease;
        }
        .history-timeline .rail-dot.is-past .rail-core {
          background: var(--gold);
          opacity: 0.55;
        }
        .history-timeline .rail-dot.is-active .rail-core {
          background: var(--gold);
          opacity: 1;
          transform: scale(1.7);
          box-shadow: 0 0 0 5px rgba(196,160,73,.14), inset 0 0 0 1.5px var(--gold);
        }

        /* The per-year photo inside a panel is for the reduced-motion path only;
           everywhere else the crossfading stack in .era-frame does the work. */
        .history-timeline .panel-photo { display: none; }

        /* ── Book ink ──
           --text-muted is right for a caption and a little pale for four hundred
           words of it. The story gets a darker ink; the apparatus below keeps
           --text-muted, so the two read as different registers. */
        .history-timeline .dot-body { color: rgba(28, 26, 21, 0.84); }

        /* ── The footnote ──
           Only seven of the fifty-six moments carry one. Set against a gold
           hairline so it reads as an aside to the story rather than part of it. */
        .history-timeline .dot-note {
          margin-top: 1.25rem;
          padding-left: 0.95rem;
          border-left: 1px solid var(--line-gold);
          font-size: 0.84rem;
          line-height: 1.62;
          color: var(--text-muted);
          max-width: 34rem;
        }
        .history-timeline .dot-note-label {
          font-family: var(--font-display), serif;
          font-size: 0.55rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-right: 0.7em;
          white-space: nowrap;
        }

        /* ── The citation line ──
           Gold on cream, the house voice. It has to sit UNDER the story without
           competing with it: the reader who wants the book can reach it in one
           tap, and the reader who just wants the story never notices it. */
        .history-timeline .dot-cite {
          margin-top: 1.4rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.4rem 0.55rem;
        }
        .history-timeline .dot-tier {
          font-family: var(--font-display), serif;
          font-size: 0.58rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          line-height: 1;
          padding: 0.36rem 0.6rem 0.32rem;
          border-radius: 9999px;
          white-space: nowrap;
        }
        /* Someone outside this parish, with no reason to flatter it, wrote this
           down. That earns the filled badge — nothing else does. */
        .history-timeline .dot-tier--documented {
          color: var(--gold-dark);
          background: rgba(196, 160, 73, 0.15);
          box-shadow: inset 0 0 0 1px rgba(196, 160, 73, 0.4);
        }
        .history-timeline .dot-tier--tradition {
          color: var(--text-muted);
          box-shadow: inset 0 0 0 1px rgba(111, 102, 80, 0.3);
        }
        .history-timeline .dot-tier--devotion {
          color: var(--gold-dark);
          box-shadow: inset 0 0 0 1px rgba(196, 160, 73, 0.32);
        }
        .history-timeline .cite-chip {
          font-family: var(--font-display), serif;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          line-height: 1;
          color: var(--navy);
          opacity: 0.68;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 1px;
          text-decoration-color: rgba(196, 160, 73, 0.5);
          transition: opacity 0.3s ease, color 0.3s ease, text-decoration-color 0.3s ease;
        }
        .history-timeline .cite-chip:hover {
          opacity: 1;
          color: var(--gold-dark);
          text-decoration-color: var(--gold-dark);
        }
        /* A chip that opens the actual page of the actual book carries a small mark, so
           a reader learns — once — that these are not dead labels but doors. The chips
           without it still work; they go to the bibliography, as they always did. */
        .history-timeline .cite-chip--open::after {
          content: "❧";
          margin-left: 0.28em;
          font-size: 0.78em;
          color: var(--gold);
          opacity: 0.7;
          text-decoration: none;
          display: inline-block;
        }
        .history-timeline .cite-chip--open:hover::after { opacity: 1; }
        /* Where a moment has no source outside the parish, we say so. */
        .history-timeline .cite-none {
          font-family: var(--font-display), serif;
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          font-style: italic;
          color: var(--text-muted);
          opacity: 0.8;
        }
        .history-timeline .cite-chip:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
          border-radius: 3px;
        }

        /* ── The apparatus on a phone, at a size a phone can read ──────────────
           The footnote and the citation line are where this page keeps its doubt
           and its evidence — the two things that make it citable. All of it had
           been tuned DOWN for the phone (0.78rem note, 0.5rem tier, 0.65rem
           chip) on the reasoning that it is secondary to the story; but 8px caps
           and a 10.4px link are not secondary, they are absent. A note nobody
           can read is a note that is not there.

           ⚠ THIS BLOCK IS DELIBERATELY NOT INSIDE THE no-preference MOTION
           BLOCK BELOW. How large a footnote should be has nothing to do with
           whether a reader has asked for less animation — and the reduced-motion
           phone reader is the one who sees the MOST of this apparatus, since
           every year of every chapter stands open in normal flow for them
           instead of one at a time. Written the other way round they would have
           kept all of the 8px type. */
        @media (max-width: 767px) {
          /* Was 12.5px, and BELOW its own desktop size (0.84rem/13.4px) — the
             one place on the page where the phone had been given less than the
             monitor. 0.85rem is 13.6px, which holds the same ~0.9 ratio to the
             body copy beside it that the home page's honest-note keeps to its
             prose, so it still reads as an aside rather than as part of the
             story. The margins tighten because a phone column needs less. */
          .history-timeline .dot-note {
            margin-top: 1rem;
            padding-left: 0.7rem;
            font-size: 0.85rem;
            line-height: 1.55;
          }
          /* 0.55rem is 8.8px — the "Note" that opens the footnote was the
             smallest type on the page. Up to 9.9px, tracking traded down to pay
             for the width so the white-space: nowrap label still fits on the
             first line of the note beside it. */
          .history-timeline .dot-note-label {
            font-size: 0.62rem;
            letter-spacing: 0.14em;
          }
          /* The row gap comes almost off because the chips inside it are now
             tall (see below): with 0.3rem of row gap as well, a moment citing
             four books would push its wrapped second row a third of the way
             down the scroll box. */
          .history-timeline .dot-cite {
            margin-top: 1.1rem;
            gap: 0.15rem 0.5rem;
          }
          /* 0.5rem is EIGHT PIXELS. The tier badge is not decoration — it is the
             honest strength of the claim above it, "documented" or "parish
             tradition" or "devotion", and the documented half of this page is
             believed precisely because the rest is labelled. At 8px of
             letterspaced caps it was a texture, not a word. 0.62rem is 9.9px,
             tracking down to 0.13em so the longest label gains about a tenth of
             its width, in a row that wraps anyway. */
          .history-timeline .dot-tier {
            font-size: 0.62rem;
            letter-spacing: 0.13em;
            padding: 0.34rem 0.55rem 0.3rem;
          }
          /* ⚠ THESE ARE LINKS, AND THEY WERE A 10.4px LINE OF TEXT.
             A chip opens the actual page of the actual book — the whole
             reference reader hangs off it — and its tap target was its own font
             size, about 10px tall, in a row of other chips. 0.72rem takes the
             type to 11.5px and 0.62rem of block padding takes the target to
             ~31px, with the row gap tightened above so wrapped rows sit ~34px
             apart and never overlap each other's hit areas.

             Not the full 44px, and knowingly: four chips at 44 with the
             clearance a 44px target implies is 100px of citation apparatus under
             every year, inside a scroll box about 260px tall. This is the
             largest target that does not make the footnotes the tallest thing on
             the stage. */
          .history-timeline .cite-chip {
            font-size: 0.72rem;
            padding: 0.62rem 0.15rem;
          }
          /* Where a moment rests on nothing outside the parish, this sentence is
             the whole disclosure — 10.9px of italic display type was too quiet
             for the one line that keeps the page honest. */
          .history-timeline .cite-none { font-size: 0.74rem; }
        }

        /* ── Desktop: photo left, rail + stepping panel right ── */
        @media (min-width: 768px) {
          .history-timeline .stage {
            height: 100vh;
            display: flex;
            align-items: center;
            overflow: hidden;
          }

          /* ⚠ THE PANEL IS BOUNDED, AND IT HAS TO BE. It used to be an absolute
             box 26rem tall holding whatever the year happened to weigh, centred
             — so a long year overflowed it in BOTH directions at once, ran up
             behind the navbar and down past the foot of the stage, and .stage is
             overflow: hidden, so the top and the bottom of the longest
             paragraphs on the page were simply cut off. Nothing in the layout
             said 26rem was enough; it was invisible until the chapter with the
             long years.

             The height now matches the photograph beside it (.era-frame is
             md:h-[70vh]), so the two columns are the same page, and the text
             scrolls inside it. A height, not a min-height, because the Tailwind
             md:min-h-[26rem] on the wrap stays as the floor for a very short
             window. The stage is 100vh and this is 70 of it, so it can never
             push past the pin again whatever a year weighs. */
          .history-timeline .panel-wrap { height: 70vh; }

          /* The "there is more below" fade — see syncFade in buildDesktop. It
             resolves to the page colour and is only shown while the active year
             has text under the fold, so a paragraph that ends inside the box
             ends cleanly with nothing over it. */
          .history-timeline .panel-wrap::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 4.5rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity .35s ease;
            background: linear-gradient(
              to top,
              var(--cream) 16%,
              rgba(244, 238, 225, 0)
            );
          }
          .history-timeline .panel-wrap.has-more::after { opacity: 1; }

          .history-timeline .dot-panel {
            position: absolute;
            inset: 0;
            /* GRID, not the flex + justify-center it inherits from Tailwind. In
               a column flex container the children are shrinkable, so a
               paragraph taller than the box is COMPRESSED to fit instead of
               overflowing — and a scroll box with nothing overflowing it does
               not scroll (the phone stage hit this exact thing; see the note on
               .dot-panel in the mobile block). Grid rows size to their content
               and overflow honestly.

               The align-content is "safe center" so a short year still sits
               centred against the photograph, while a long one packs to the top
               instead of having its first lines centred out of reach above the
               scroll origin — unreachable overflow is the classic
               centred-scroll-box bug. The plain "center" above it is the
               fallback for anything that doesn't know the keyword. */
            display: grid;
            align-content: center;
            align-content: safe center;
            overflow-y: auto;
            /* NOT "contain", which is what the phone uses. A wheel can never
               chain here anyway — either this handler takes the event and
               preventDefaults it, or Lenis does — so containment would buy
               nothing and would cost the one reader it still applies to: a
               finger on a touchscreen laptop, who has no wheel to hand the page
               back with and would be sealed inside the paragraph. */
            overscroll-behavior-y: auto;
            /* Reserved always, so the text column doesn't shift a few pixels
               between a year that scrolls and one that doesn't. */
            scrollbar-gutter: stable;
            padding-right: 0.6rem;
            scrollbar-width: thin;
            scrollbar-color: rgba(196, 160, 73, 0.45) transparent;
            opacity: 0;
            transform: translateY(38px);
            transition: opacity .6s cubic-bezier(.16,1,.3,1),
              transform .6s cubic-bezier(.16,1,.3,1);
            pointer-events: none;
          }
          .history-timeline .dot-panel::-webkit-scrollbar { width: 6px; }
          .history-timeline .dot-panel::-webkit-scrollbar-track {
            background: transparent;
          }
          .history-timeline .dot-panel::-webkit-scrollbar-thumb {
            background: rgba(196, 160, 73, 0.45);
            border-radius: 9999px;
          }
          .history-timeline .dot-panel:hover::-webkit-scrollbar-thumb {
            background: rgba(196, 160, 73, 0.7);
          }
          .history-timeline .dot-panel.is-above {
            transform: translateY(-38px);
          }
          .history-timeline .dot-panel.is-active {
            opacity: 1;
            transform: none;
            pointer-events: auto;
          }
        }

        /* ── Mobile: one chapter, one screen, stepped by hand ──
           Not scrollytelling any more. Each era is a 100svh card in normal flow:
           a tall photograph carrying the year, a paragraph that scrolls inside its
           own box, and four buttons. Nothing is pinned, because the scroll gesture
           a pin would need has been given to the paragraph.

           What this buys, beyond the buttons: the photo is now the SAME height in
           every year. The old layout sized the text first and let the picture
           flex into the remainder (26–46svh), so a long year visibly shrank its
           own photograph — the image jumped between years of the same era. Fixing
           the photo and letting the text scroll instead puts the variance where it
           can't be seen.

           The card is dvh and the photograph in it is svh — see the ⚠ note on
           .stage below. Short version: svh everywhere left a gap the height of
           a retracted URL bar under every chapter, and dvh only re-flows the
           one box (the scrolling paragraph) where a re-flow cannot be felt. */
        @media (max-width: 767px) and (prefers-reduced-motion: no-preference) {
          /* The touch handler owns every gesture that starts INSIDE a chapter,
             but it cannot own the one that arrives from outside: a fling thrown
             in the Contents is still travelling when it crosses into the first
             chapter, and no touch is on the glass to catch it. Proximity snap
             catches it instead, so a fling settles square on a chapter rather
             than half-way across one.

             Proximity, never mandatory: mandatory has to snap to SOMETHING, and
             the nearest something to a reader halfway down the Contents is the
             first chapter — it would yank them out of the index they are reading.

             The rule on html is safe to leak. If it ever outlived this page it
             would be inert, because scroll-snap-align lives only on .era and .era
             only exists here. */
          html { scroll-snap-type: y proximity; }
          .history-timeline .era { scroll-snap-align: start; }

          /* ⚠ THE CARD IS dvh AND THE PHOTOGRAPH INSIDE IT IS svh, ON PURPOSE.
             This was 100svh throughout, and svh is the viewport with the URL bar
             SHOWN — so the moment a phone retracts its toolbar (Chrome and
             Samsung Internet on Android, Safari on iOS; not browsers that keep
             the bar down, which is why it only showed up in "some" of them) the
             real viewport grew by ~55px and every chapter fell that far short of
             the glass: a cream band under the buttons and the top of the next
             chapter's photograph peeking in beneath it.

             dvh closes it, and the reason svh was chosen in the first place —
             "a card that resizes under a reader's thumb loses their place" —
             does not actually bite here, because everything ABOVE the paragraph
             is fixed: 4.9rem of navbar clearance, then a 45svh photograph (left
             in svh below, deliberately: the picture must never breathe with the
             toolbar). So the whole of the dvh↔svh difference lands on the ONE
             box that can absorb it, .era-body — a scroll box, which keeps its
             scrollTop and simply reveals another line or two at the foot. No
             line of type moves. Only the bottom edge and the four buttons ride
             down with the bar, which is where a reader expects them to be. */
          .history-timeline .stage {
            height: 100vh; /* fallback: browsers with neither svh nor dvh */
            height: 100dvh;
            display: flex;
            align-items: center;
            overflow: hidden;
          }
          .history-timeline .stage-inner {
            display: flex;
            flex-direction: column;
            /* Must override Tailwind's items-center. In a COLUMN flex container
               align-items is the horizontal axis, and .era-frame's children are
               all absolutely positioned — so centring shrink-wraps it to zero
               width and the photo disappears, leaving just the ring as a hairline
               down the middle. */
            align-items: stretch;
            height: 100%;
            /* Nothing is pinned now, but the card still starts at the top of the
               viewport, under the fixed navbar (h-16 = 4rem). Clear it or the top
               of every photo lives behind the bar. */
            padding-top: 4.9rem;
            /* No bottom padding: the button overlay owns the foot of the stage,
               and the paragraph is free to scroll behind it. */
            padding-bottom: 0;
            gap: 0.7rem;
            /* Children must be allowed to shrink below their content so the
               paragraph's scroll box gets a definite height to scroll within. */
            min-height: 0;
          }
          /* Let .era-frame be a direct flex child. */
          .history-timeline .era-media { display: contents; }
          .history-timeline .era-frame {
            aspect-ratio: auto;
            flex: none;
            /* Fixed, not flexed — roughly half the screen, the same in every year
               of every chapter. The old rule sized the text first and let the
               picture take the remainder, which meant a long year visibly shrank
               its own photograph. The paragraph scrolls instead, so the variance
               goes somewhere it cannot be seen. */
            height: 45svh;
            border-radius: 1.5rem;
          }

          /* The era's own heading and span move out of the picture; the year and
             the year's title move in. */
          .history-timeline .era-caption { display: none; }

          /* Text now sits at BOTH ends of the photo, so the one-way scrim would
             leave the chapter label floating on bare picture. Darken top and
             bottom, keep the middle clear. */
          .history-timeline .frame-scrim {
            background: linear-gradient(
              to bottom,
              rgba(10, 19, 34, 0.62) 0%,
              rgba(10, 19, 34, 0.12) 26%,
              rgba(10, 19, 34, 0.16) 48%,
              rgba(10, 19, 34, 0.88) 100%
            );
          }

          .history-timeline .frame-label {
            display: flex;
            align-items: baseline;
            gap: 0.6em;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding: 1.1rem 1.35rem 0;
            font-family: var(--font-display), serif;
            /* 0.6rem was 9.6px — and this is the ONLY thing on the mobile stage
               that tells the reader which of the eight chapters they are in, set
               in white at 72% over a photograph, which is already the hardest
               ground on the page to read from. Small display caps need ~11px
               before they stop being deciphered and start being read; 0.68rem
               is 10.9px, and the tracking comes off to buy it: 9.6px at 0.22em
               and 10.9px at 0.13em set to the SAME width, so a long chapter
               name wraps exactly where it did before. */
            font-size: 0.68rem;
            letter-spacing: 0.13em;
            text-transform: uppercase;
            line-height: 1.4;
            color: rgba(255, 255, 255, 0.72);
          }
          .history-timeline .frame-label-num {
            color: var(--gold);
            letter-spacing: 0.1em;
          }

          /* The year, crossfading with its photograph. */
          .history-timeline .frame-dot {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: absolute;
            inset: 0;
            padding: 1.25rem 1.35rem 1.4rem;
            opacity: 0;
            transition: opacity .55s ease;
            pointer-events: none;
          }
          .history-timeline .frame-dot.is-active { opacity: 1; }
          .history-timeline .frame-dot-top {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 1rem;
          }
          .history-timeline .frame-dot-year {
            font-size: clamp(1.9rem, 8vw, 2.6rem);
            line-height: 1;
            color: var(--gold-light, #e6cf90);
            text-shadow: 0 2px 18px rgba(10, 19, 34, 0.55);
          }
          .history-timeline .frame-dot-count {
            /* "03 / 07" — how far through the chapter you are, and the only
               progress indicator on a stage that has deliberately taken the
               scrollbar away. Same correction as .frame-label directly above:
               9.6px → 10.9px, tracking traded for size at equal width. */
            font-size: 0.68rem;
            letter-spacing: 0.12em;
            color: rgba(255, 255, 255, 0.6);
            font-variant-numeric: tabular-nums;
            white-space: nowrap;
          }
          .history-timeline .frame-dot-title {
            margin-top: 0.45rem;
            font-size: clamp(1.15rem, 5vw, 1.5rem);
            line-height: 1.25;
            color: #fff;
            text-shadow: 0 2px 16px rgba(10, 19, 34, 0.6);
          }

          /* On desktop the numeral is a faint mark up in the corner. On a phone
             that corner is the photo, where it reads as a smudge on the picture.
             Drop it behind the paragraph instead. */
          .history-timeline .section-numeral {
            top: auto;
            bottom: -1rem;
            right: 0.5rem;
            font-size: 44vw;
            opacity: 0.07;
          }

          /* The photo is fixed, so the body takes everything left over. */
          .history-timeline .era-body {
            flex: 1 1 auto;
            min-height: 0;
            display: flex;
            flex-direction: column;
            /* Overrides Tailwind's gap-6 (1.5rem), which is a desktop-column gap
               and far too much between the rail and the paragraph on a phone. */
            gap: 0.6rem;
          }

          /* ── The dots ──
             Unchanged from the scroll-scrubbed layout: the rail turns on its side
             into a row of beads, no years (the year is set large in the photo).
             They are the instrument for moving through a chapter — tap any bead
             and go straight to that year.

             ⚠ THE ROW OVERFLOWED, AND THE LONGEST CHAPTER IS THE ONE IT
             OVERFLOWED ON. The beads were rigid: 26px each, flex: none on the
             box inside them, 0.35rem apart. The chapter with twelve years
             therefore asked for 12x26 + 11x5.6 = 374px of row inside the 342px
             a 390px phone has between the stage's px-6 gutters — and .stage
             is overflow: hidden, so the first and last years of the longest
             chapter in the book were simply cut off the screen. On a 360px
             Android it lost two beads at each end. Nothing in the layout said
             12, so it was invisible until you scrolled to that chapter.

             The fix is to let the row shrink instead of spill: 26px is now a
             flex BASIS rather than a width, so a chapter of ten years or fewer
             is pixel-for-pixel what it was, and only the twelve-year one
             tightens (to ~23px a bead) to fit. The bead itself — an 8px core —
             never changes size; only the box around it does. */
          .history-timeline .rail {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.35rem;
            flex: none;
          }
          .history-timeline .rail-dot { flex: 0 1 26px; min-width: 0; }
          .history-timeline .rail::before {
            top: 50%;
            bottom: auto;
            left: 10px;
            right: 10px;
            width: auto;
            height: 1px;
            transform: translateY(-0.5px);
          }
          .history-timeline .rail-year { display: none; }
          /* 26px of box and 6px of padding made a 38px-tall target for the
             control a reader uses most on this page. 9px takes it to 44, the
             height a thumb actually needs, and it costs the paragraph below it
             six pixels of scroll box — which scrolls, so it costs it nothing. */
          .history-timeline .rail-btn {
            justify-content: center;
            padding: 9px 0;
          }
          /* width: 100%, not 26px: the box has to be able to follow its li
             down when a twelve-year chapter tightens the row (see above). A
             fixed width here would keep min-content at 26px and put the
             overflow straight back. */
          .history-timeline .rail-dotbox { width: 100%; height: 26px; }

          /* minmax(0, 1fr), not the default auto row: an auto row sizes to its
             tallest content and would push past the pinned stage instead of
             giving the paragraph a definite height to scroll inside. */
          .history-timeline .panel-wrap {
            display: grid;
            grid-template-rows: minmax(0, 1fr);
            flex: 1 1 auto;
            min-height: 0;
          }

          /* ── The paragraph reads, then hands the gesture back ──
             Each year is its own scroll box. Containment stops it EVER leaking a
             gesture to the page: the page must not move inside a chapter, or a
             fling would carry the reader clean out of it. What happens instead is
             that the touch handler watches this box, and the moment it has no
             more to give, that same gesture becomes the step to the next year.
             Read to the end, keep going, move on. */
          .history-timeline .dot-panel {
            grid-area: 1 / 1;
            /* MUST override Tailwind's flex + flex-col + justify-center. In a
               column flex container the children are shrinkable, so a paragraph
               taller than the box would be COMPRESSED to fit rather than
               overflowing — and a scroll box with nothing overflowing it does not
               scroll. Block layout lets the content exceed the box. */
            display: block;
            min-height: 0;
            overflow-y: auto;
            overscroll-behavior-y: contain;
            /* Clears the button overlay, so the last line of a year can be
               scrolled out from under the circles instead of sitting behind them.
               Tracks the overlay's real height: 1.75rem of top gradient + the
               button + 0.85rem beneath it. The buttons grew to 2.75rem (see the
               note on .nav-btn), so this grew with them — leave the two in step
               or the last footnote of a year strands under the chapter arrows. */
            padding-bottom: 5.4rem;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity .45s cubic-bezier(.16,1,.3,1),
              transform .45s cubic-bezier(.16,1,.3,1);
            pointer-events: none;
          }
          .history-timeline .dot-panel.is-above { transform: translateY(-20px); }
          .history-timeline .dot-panel.is-active {
            opacity: 1;
            transform: none;
            pointer-events: auto;
          }
          /* All three now live in the photograph. */
          .history-timeline .panel-count,
          .history-timeline .dot-year,
          .history-timeline .dot-title { display: none; }

          .history-timeline .dot-body {
            font-size: clamp(0.95rem, 3.8vw, 1.06rem);
            line-height: 1.66;
            margin-top: 0;
          }

          /* ── The four steps ──
             One line, nothing in the middle: « ‹ pushed into the left corner and
             › » into the right. Small circles by intent — the dots above already
             carry the chapter, so these only need to be the ends of it. */
          /* An OVERLAY, not a row in the stack. Lifted out of the flex flow so
             it costs the paragraph no height, and so it holds the bottom of the
             stage for the whole chapter — the stage is pinned, so these stay put
             under the reader's thumb from the first year to the last while the
             text scrolls beneath them.

             The gradient is doing two jobs: it keeps the text legible where it
             passes behind the circles, and it is the "there is more below" fade.
             It resolves to the page colour, so where a year is short and there is
             nothing to scroll, it falls over bare cream and cannot be seen. */
          .history-timeline .era-nav {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            padding: 1.75rem 1.5rem 0.85rem;
            background: linear-gradient(
              to top,
              #f4eee1 55%,
              rgba(244, 238, 225, 0)
            );
          }
          .history-timeline .era-nav-side {
            display: flex;
            align-items: center;
            /* 0.4rem was fine between two 35px circles and is not fine between
               two 44px ones: the pair either side of it are a year forward and
               a whole chapter forward, and a mistap between them costs the
               reader their place. */
            gap: 0.5rem;
            min-width: 0;
          }
          /* ⚠ 2.2rem IS 35px, AND THESE ARE THE PAGE. On a phone the stage does
             not scroll, so apart from a swipe and the beads above, these four
             circles are the only way through fifty-six years — and every one of
             them was nine pixels under the 44px a thumb needs, in the corners
             of the screen, which is where a target is least forgiving because
             half the ways you can miss it are off the edge of the glass.
             2.75rem is exactly 44. It costs the paragraph above about ten
             pixels of visible text (the overlay is taller, so .dot-panel's
             bottom padding grew with it) — and the paragraph scrolls, while a
             missed tap does not. */
          .history-timeline .nav-btn {
            flex: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            width: 2.75rem;
            height: 2.75rem;
            padding: 0;
            border: 0;
            border-radius: 9999px;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            transition: opacity .3s ease, background .3s ease,
              box-shadow .3s ease, color .3s ease;
          }
          .history-timeline .nav-btn:disabled {
            opacity: 0.28;
            cursor: default;
          }
          .history-timeline .nav-btn:focus-visible {
            outline: 2px solid var(--gold);
            outline-offset: 3px;
          }
          /* Follows the circle up — a 15px chevron in a 44px disc reads as a
             mark that missed its target rather than as a button face. */
          .history-timeline .nav-chev {
            font-size: 1.05rem;
            line-height: 1;
          }
          /* The year pair — the move you make most, so it is the gold one. */
          .history-timeline .nav-btn--year {
            color: var(--gold-dark);
            background: rgba(196, 160, 73, 0.12);
            box-shadow: inset 0 0 0 1px rgba(196, 160, 73, 0.38);
          }
          /* The chapter pair — outermost and quieter. */
          .history-timeline .nav-btn--chapter {
            color: var(--text-muted);
            background: transparent;
            box-shadow: inset 0 0 0 1px rgba(111, 102, 80, 0.22);
          }
          /* Armed: the circle opens into a pill naming where it would send you.
             The only thing on this row allowed to grow, and it shrinks back the
             moment it fires or times out. */
          /* flex: 0 1 auto and min-width: 0, not the flex: none it
             inherits: the pill is the one thing in this row sized by its
             CONTENT — a chapter heading — and with the circles now 44px there
             is no longer room for a 13.5rem pill plus three discs plus the
             gutters on a 360px screen. Unable to shrink, it pushed the year
             arrow off the edge of the stage, which is overflow: hidden.
             Shrinkable, it gives way to the buttons and lets .nav-target's
             ellipsis do the rest — the heading is cut, nothing is lost. */
          .history-timeline .nav-btn--chapter.is-armed {
            width: auto;
            flex: 0 1 auto;
            min-width: 0;
            max-width: 12rem;
            padding: 0 0.85rem;
            color: var(--gold-dark);
            background: rgba(196, 160, 73, 0.14);
            box-shadow: inset 0 0 0 1px rgba(196, 160, 73, 0.5);
          }
          /* The destination of a two-tap jump, and the reason the arming step
             exists at all — it is there to be READ before the second tap, so
             10.2px was the wrong size for it. 11.2px, tracking down to keep the
             pill the width it was. */
          .history-timeline .nav-target {
            min-width: 0;
            font-family: var(--font-display), serif;
            font-size: 0.7rem;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            line-height: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        /* ── Reduced motion: nothing pinned, nothing crossfaded ──
           Every year stands in normal flow with its own photo. Without this the
           stack in .era-frame never advances and only each era's first picture
           would ever be seen. */
        @media (prefers-reduced-motion: reduce) {
          .history-timeline .era { min-height: 0 !important; }
          .history-timeline .stage {
            position: relative !important;
            height: auto !important;
            overflow: visible !important;
          }
          .history-timeline .dot-panel {
            position: static !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
            /* The desktop block above bounds the panel to 70vh and scrolls it,
               which is the right answer for a pinned stage and the wrong one
               here: nothing is pinned, no wheel is intercepted, and every year
               stands open in normal flow. A scroll box inside a page that
               already scrolls is just a paragraph with its end hidden. */
            overflow: visible !important;
            height: auto !important;
            padding-right: 0 !important;
          }
          .history-timeline .panel-wrap {
            height: auto !important;
            display: block !important;
          }
          .history-timeline .panel-wrap::after { display: none; }
          .history-timeline .dot-panel + .dot-panel { margin-top: 3.5rem; }
          /* The era's opening photo sits directly above year one, so year one
             showing it again would just be the same picture twice. */
          .history-timeline .dot-panel:not(:first-of-type) .panel-photo {
            display: block;
            aspect-ratio: 4 / 5;
            border-radius: 1.25rem;
            overflow: hidden;
            margin-bottom: 1.75rem;
            box-shadow: 0 18px 40px -24px rgba(10,19,34,.5);
          }
          .history-timeline .rail { display: none; }
        }
      `}</style>
    </div>
  );
}
