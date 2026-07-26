"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
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
 * The choreography is the same at both breakpoints and always was: pin the
 * stage, step the year with scroll progress. What differs on a phone is that the
 * stage is restacked and the paragraph reads BEFORE it advances:
 *
 *   the photograph — fixed at 45svh, about half the screen and identical in every
 *                    year. It now carries the year, the year's title and the
 *                    counter inside it; the era's big heading is gone, and a
 *                    hairline label top-left is all that is left of it.
 *   the paragraph  — its own scroll box in what remains, and deliberately NOT
 *                    overscroll-contained. A finger in the text scrolls the text;
 *                    when the text runs out the same gesture chains into the page,
 *                    which is the pinned scrub, which steps to the next year. Read
 *                    to the end, keep going, move on.
 *   the dots       — untouched: a row of beads, tap any one to go to that year.
 *   the four steps — an overlay held at the foot of the stage for the whole
 *                    chapter, one line, « ‹ in the left corner and › » in the
 *                    right. ‹ › move a year. « » move a chapter, and they ARM
 *                    before they fire: the first tap opens the circle into a pill
 *                    naming the chapter it would send you to, the second tap goes.
 *                    Losing your place to a mistap is expensive, so it asks first
 *                    — and shows you the destination while it asks.
 *
 * (A one-card deck was tried here — eight chapters stacked in 100svh, buttons
 * only, no pin. It stopped the thumb wandering between chapters, but a single
 * flick then carried the reader clean past the deck to the footer. Worse than
 * what it fixed; don't rebuild it.)
 *
 * ONE AUTHORITY: SCROLL POSITION. Every way of moving — swipe, dot, ‹ ›, « », the
 * Contents index — ends in a scroll, and the trigger works out the year from
 * where the scroll landed. No control holds an index of its own, so no two
 * controls can disagree. React keeps a MIRROR of that index (`activeDots`), but
 * only on mobile and only so ‹ › can grey out at the ends of a chapter: desktop,
 * where the scrub is fastest, does no React work per year at all.
 */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Vertical scroll (in vh) allotted to each year-dot within a pinned era. This is
// the pace of the swipe: raise it and each year takes more thumb to leave, which
// is what stops a single flick tearing through five of them.
//
// Mobile is deliberately shorter than desktop. There are 56 dots across the eight
// eras, so at the desktop pace a phone would be thumbed through ~29 screens of
// pinned scroll. 46 keeps it near ~25 while still costing enough per year that
// one swipe reads as one step rather than a blur.
const STEP_VH = { desktop: 52, mobile: 46 };

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

export default function HistoryPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  // Per-era "scroll the pin to year k". Written by the effect below, read by the
  // ‹ › buttons. The buttons cannot hold the index themselves: scroll position is
  // the one authority here, so a button has to MOVE THE SCROLL and let the
  // trigger work out which year that is. See the note at the head.
  const goToRef = useRef<Record<string, (k: number) => void>>({});
  const { t, lang } = useLang();

  const h = t.history;

  // Which year each era is showing. This is a MIRROR, not the source: the
  // ScrollTrigger works the year out from scroll position and pushes it here, so
  // React can render the parts only React can render — the year inside the
  // photograph, and whether ‹ › are at the end of their travel.
  const [activeDots, setActiveDots] = useState<Record<string, number>>({});
  const [armed, setArmed] = useState<string | null>(null);
  const dotOf = (eraId: string) => activeDots[eraId] ?? 0;

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

    // Both breakpoints run the same choreography — pin the stage, step the
    // active year with scroll progress — and differ only in how the stage is
    // laid out (CSS) and how much scroll each year is given. matchMedia builds
    // and reverts each variant as the breakpoint crosses, so nothing leaks.
    const build = (stepVh: number, mirrorToReact: boolean) => {
      const cleanups: Array<() => void> = [];
      const eras = gsap.utils.toArray<HTMLElement>(".era");

      eras.forEach((era) => {
        const panels = gsap.utils.toArray<HTMLElement>(".dot-panel", era);
        const photos = gsap.utils.toArray<HTMLElement>(".era-photo", era);
        const frameDots = gsap.utils.toArray<HTMLElement>(".frame-dot", era);
        const railDots = gsap.utils.toArray<HTMLElement>(".rail-dot", era);
        const railBtns = gsap.utils.toArray<HTMLElement>(".rail-btn", era);
        const n = panels.length;
        if (!n) return;

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
          frameDots.forEach((f, k) =>
            f.classList.toggle("is-active", k === idx)
          );
          railDots.forEach((d, k) => {
            d.classList.toggle("is-active", k === idx);
            d.classList.toggle("is-past", k < idx);
          });

          // Everything above is a class, toggled by hand, costing no React work
          // at all — which is the point. A scrub crosses years continuously, and
          // re-rendering eight chapters of citations on each one would be jank
          // bought for nothing.
          //
          // The mirror below exists only so ‹ › can grey out at the ends of a
          // chapter, and those buttons only exist on a phone. So desktop, where
          // the scrub is fastest and the buttons are display:none, does not pay
          // for it. It is handed the same index just written to the DOM, so the
          // two never disagree and reconciliation has nothing to undo.
          if (mirrorToReact) {
            setActiveDots((prev) =>
              prev[era.id] === idx ? prev : { ...prev, [era.id]: idx }
            );
          }
        };
        setActive(0);
        // Put the stage back to year one when this variant is torn down — GSAP's
        // matchMedia reverts its OWN work, and classes toggled by hand here are
        // not its work. Otherwise crossing the breakpoint mid-chapter leaves the
        // rebuilt stage showing whichever year the old one stopped on.
        cleanups.push(() => setActive(0));

        const stage = era.querySelector<HTMLElement>(".stage");
        if (!stage) return;

        // Pin with GSAP rather than CSS sticky: body sets overflow-x:hidden,
        // which makes it a scroll container and kills position:sticky.
        const st = ScrollTrigger.create({
          trigger: era,
          start: "top top",
          end: () => "+=" + (n * stepVh * window.innerHeight) / 100,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.max(
              0,
              Math.min(n - 1, Math.floor(self.progress * n))
            );
            setActive(idx);
          },
        });

        // Clickable dots — jump straight to a year.
        const goTo = (k: number) => {
          const target = st.start + (st.end - st.start) * ((k + 0.5) / n);
          // Lenis is desktop-only now, so on a phone this falls through to the
          // browser's own smooth scroll.
          const lenis = (
            window as unknown as {
              __lenis?: { scrollTo: (t: number, o?: object) => void };
            }
          ).__lenis;
          if (lenis?.scrollTo) lenis.scrollTo(target, { duration: 1 });
          else window.scrollTo({ top: target, behavior: "smooth" });
        };
        railBtns.forEach((btn, k) => {
          const handler = () => goTo(k);
          btn.addEventListener("click", handler);
          cleanups.push(() => btn.removeEventListener("click", handler));
        });

        // Hand the same jump to the ‹ › buttons, which are React's and live
        // outside this effect. They step the SCROLL, not an index — so a tap and
        // a swipe arrive at the identical place by the identical route, and
        // there is never a second opinion about which year is showing.
        goToRef.current[era.id] = goTo;
        cleanups.push(() => {
          delete goToRef.current[era.id];
        });
      });

      return () => cleanups.forEach((fn) => fn());
    };

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => build(STEP_VH.desktop, false)
    );
    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => build(STEP_VH.mobile, true)
    );
    // Under prefers-reduced-motion nothing is pinned and no trigger is built.
    // CSS lays every year out in normal flow, each with its own photo.

    return () => mm.revert();
  }, [lang]);

  // An armed chapter button forgets itself if it isn't confirmed.
  useEffect(() => {
    if (!armed) return;
    const id = window.setTimeout(() => setArmed(null), ARM_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [armed]);

  // Bring an element to the top of the viewport — which, for an era, is exactly
  // where its pin begins, so landing on it drops the reader at that era's first
  // year. Lenis is desktop-only; a phone falls through to the browser's own
  // smooth scroll.
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

  // Open a chapter — from the Contents index, or from « ». An era's section top
  // is exactly where its pin begins, so this lands on that chapter's first year.
  const openChapter = useCallback(
    (index: number) => {
      const target = h.eras[index];
      if (!target) return;
      setArmed(null);
      scrollToTopOf(document.getElementById(target.id));
    },
    [h.eras, scrollToTopOf]
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
            <p className="reveal-item text-base text-text-muted mb-10 max-w-lg">
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

              <div className="stage-inner relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-0 grid md:grid-cols-[minmax(0,31rem)_1fr] gap-12 md:gap-16 lg:gap-20 items-center">
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
                        <Image
                          src={photoFor(era.id, di)}
                          alt={`${era.heading} — ${dot.year}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 45vw"
                        />
                      </div>
                    ))}
                    <div className="frame-scrim absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-navy/10" />
                    <div className="era-caption absolute inset-x-0 bottom-0 p-7 md:p-9">
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
                              each year carries its own picture instead. Hidden (and
                              so, being lazy, never fetched) in the animated paths. */}
                          <div className="panel-photo relative">
                            <Image
                              src={photoFor(era.id, di)}
                              alt={`${era.heading} — ${dot.year}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 45vw"
                            />
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
                          <p className="dot-body mt-3 text-lg leading-relaxed">
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

        /* ── Desktop: photo left, rail + stepping panel right ── */
        @media (min-width: 768px) {
          .history-timeline .stage {
            height: 100vh;
            display: flex;
            align-items: center;
            overflow: hidden;
          }
          .history-timeline .dot-panel {
            position: absolute;
            inset: 0;
            opacity: 0;
            transform: translateY(38px);
            transition: opacity .6s cubic-bezier(.16,1,.3,1),
              transform .6s cubic-bezier(.16,1,.3,1);
            pointer-events: none;
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

           svh, not vh or dvh: dvh re-flows as the URL bar animates, and a card
           that resizes under a reader's thumb loses their place mid-sentence. */
        @media (max-width: 767px) and (prefers-reduced-motion: no-preference) {
          .history-timeline .stage {
            height: 100svh;
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
            font-size: 0.6rem;
            letter-spacing: 0.22em;
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
            font-size: 0.6rem;
            letter-spacing: 0.2em;
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
             and go straight to that year. Tap targets stay 26px + padding. */
          .history-timeline .rail {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 0.35rem;
            flex: none;
          }
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
          .history-timeline .rail-btn {
            justify-content: center;
            padding: 6px 0;
          }
          .history-timeline .rail-dotbox { width: 26px; height: 26px; }

          /* minmax(0, 1fr), not the default auto row: an auto row sizes to its
             tallest content and would push past the pinned stage instead of
             giving the paragraph a definite height to scroll inside. */
          .history-timeline .panel-wrap {
            display: grid;
            grid-template-rows: minmax(0, 1fr);
            flex: 1 1 auto;
            min-height: 0;
          }

          /* ── The paragraph reads, then hands the scroll back ──
             Each year is its own scroll box, and deliberately does NOT set
             overscroll-behavior: the default chains. So a finger dragging in the
             text scrolls the text, and the moment the text runs out that same
             gesture continues into the page — which is the pinned scrub, which
             steps to the next year. Read to the end, keep going, move on: one
             gesture, no gear change.

             Containing the overscroll here would strand the reader at the last
             line with nothing happening until they moved their thumb onto the
             photograph. */
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
            /* Clears the button overlay, so the last line of a year can be
               scrolled out from under the circles instead of sitting behind them. */
            padding-bottom: 4.75rem;
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
          .history-timeline .dot-note {
            margin-top: 1rem;
            padding-left: 0.7rem;
            font-size: 0.78rem;
            line-height: 1.55;
          }
          .history-timeline .dot-cite {
            margin-top: 1.1rem;
            gap: 0.3rem 0.45rem;
          }
          .history-timeline .dot-tier {
            font-size: 0.5rem;
            letter-spacing: 0.2em;
            padding: 0.3rem 0.5rem 0.27rem;
          }
          .history-timeline .cite-chip { font-size: 0.65rem; }

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
            gap: 0.4rem;
            min-width: 0;
          }
          .history-timeline .nav-btn {
            flex: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            width: 2.2rem;
            height: 2.2rem;
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
          .history-timeline .nav-chev {
            font-size: 0.95rem;
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
          .history-timeline .nav-btn--chapter.is-armed {
            width: auto;
            max-width: 13.5rem;
            padding: 0 0.85rem;
            color: var(--gold-dark);
            background: rgba(196, 160, 73, 0.14);
            box-shadow: inset 0 0 0 1px rgba(196, 160, 73, 0.5);
          }
          .history-timeline .nav-target {
            min-width: 0;
            font-family: var(--font-display), serif;
            font-size: 0.64rem;
            letter-spacing: 0.1em;
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
          }
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
