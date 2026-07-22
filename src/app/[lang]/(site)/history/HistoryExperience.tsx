"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import {
  citationsFor,
  NO_SOURCE_LABEL,
  SOURCE_SHORT,
  TIER_LABEL,
} from "@/lib/citations";
import { SOURCE_INDEX } from "@/lib/sources";
// Not from references.ts — that module carries the books themselves, and this is a client
// component. See the note at the head of referenceIndex.ts.
import { hasLeaf } from "@/lib/referenceIndex";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Vertical scroll (in vh) allotted to each year-dot within a pinned era.
//
// Mobile gets a shorter step on purpose. There are 53 dots across the eight
// eras, so at the desktop pace a phone would have to be thumbed through ~28
// screens of pinned scroll — well past where readers give up. 40vh keeps the
// same choreography inside ~21.
const STEP_VH = { desktop: 52, mobile: 40 };

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
  const { t, lang } = useLang();

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
    const build = (stepVh: number) => {
      const cleanups: Array<() => void> = [];
      const eras = gsap.utils.toArray<HTMLElement>(".era");

      eras.forEach((era) => {
        const panels = gsap.utils.toArray<HTMLElement>(".dot-panel", era);
        const photos = gsap.utils.toArray<HTMLElement>(".era-photo", era);
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
          railDots.forEach((d, k) => {
            d.classList.toggle("is-active", k === idx);
            d.classList.toggle("is-past", k < idx);
          });
        };
        setActive(0);

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
      });

      return () => cleanups.forEach((fn) => fn());
    };

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => build(STEP_VH.desktop)
    );
    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => build(STEP_VH.mobile)
    );
    // Under prefers-reduced-motion nothing is pinned and no trigger is built.
    // CSS lays every year out in normal flow, each with its own photo.

    return () => mm.revert();
  }, [lang]);

  return (
    <div ref={rootRef} className="history-timeline">
      <PageHero
        label={t.history.label}
        title={t.history.title}
        intro={t.history.intro}
        image="/images/bw-old-pic.jpg"
        alt="An archival black-and-white photograph of the great two-nave church at Vadakkankulam, its spires and pinnacles against a clouded sky"
      />

      {/* Intro / overview band */}
      <section className="relative bg-cream parchment-sheen section-padding overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <p className="kicker justify-center mb-8">{t.history.overlineLabel}</p>
          <p className="font-serif text-2xl md:text-3xl text-navy leading-snug">
            {t.history.overview}
          </p>
          <div className="cross-rule mt-12 max-w-xs mx-auto">
            <span className="text-gold text-lg">✦</span>
          </div>
        </div>
      </section>

      {/* The chapters */}
      <div className="bg-cream">
        {t.history.eras.map((era, i) => (
          <section
            key={era.id}
            className="era relative border-t border-gold/15"
          >
            {/* Pinned stage — sticks for the length of this era's dots */}
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

              <div className="stage-inner relative w-full max-w-6xl mx-auto px-6 lg:px-10 py-24 md:py-0 grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
                {/* IMAGE */}
                <div className="era-media">
                  <div className="era-frame relative aspect-[4/5] md:h-[70vh] md:aspect-auto rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gold/20">
                    {era.dots.map((dot, di) => (
                      <div
                        key={di}
                        className={`era-photo ${di === 0 ? "is-active" : ""}`}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-navy/10" />
                    <div className="era-caption absolute inset-x-0 bottom-0 p-7 md:p-9">
                      <p className="font-display text-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-3">
                        {era.span}
                      </p>
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                        {era.heading}
                      </h2>
                      {/* The blurb is a summary the years then tell properly. On a
                          phone the photo is only ~44svh tall, so it would swallow
                          the picture — the years carry it instead. */}
                      <p className="era-blurb mt-4 text-white/75 leading-relaxed max-w-md">
                        {era.blurb}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dot rail + the one active year. Vertical beside the panel on
                    desktop; a horizontal row of beads under the photo on mobile. */}
                <div className="era-body flex gap-6 md:gap-8">
                  <ul className="rail flex flex-col justify-center items-stretch gap-2.5">
                    {era.dots.map((dot, di) => (
                      <li
                        key={di}
                        className={`rail-dot ${di === 0 ? "is-active" : ""}`}
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
                    {era.dots.map((dot, di) => (
                      <article
                        key={di}
                        className={`dot-panel flex flex-col justify-center ${
                          di === 0 ? "is-active" : ""
                        }`}
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
                        <h3 className="mt-4 font-serif text-2xl md:text-3xl text-navy">
                          {dot.title}
                        </h3>
                        <p className="dot-body mt-3 text-text-muted text-lg leading-relaxed max-w-xl">
                          {dot.body}
                        </p>

                        {/* What this moment actually rests on. The tier is not
                            decoration — it is the honest strength of the claim,
                            and the documented half of this page is believed
                            precisely because the rest is labelled honestly. */}
                        {(() => {
                          const cite = citationsFor(era.id, di);
                          if (!cite) return null;
                          const cited = cite.keys
                            .map((k) => SOURCE_INDEX[k])
                            .filter(Boolean);
                          return (
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
                          );
                        })()}
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <style>{`
        .history-timeline .era-photo {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity .7s ease;
        }
        .history-timeline .era-photo.is-active { opacity: 1; }

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

        /* ── Mobile: the same stage, restacked ──
           Sticky-overlay scrollytelling, the way the news-graphics desks do it:
           the photo holds the top of the viewport and crossfades, the year steps
           through the band beneath it.

           The usual advice is a fixed ~60vh graphic. That fails here: these
           bodies run to ~540 characters, and a fixed photo height would push the
           longest years past the bottom of a pinned, overflow-hidden stage and
           quietly clip them. So the text is sized first — the panel is as tall as
           the longest year in its era — and the photo flexes into whatever is
           left, between 26svh and 46svh. Text can never be cut off.

           svh, not vh or dvh: dvh re-flows as the URL bar animates, which is the
           exact shift a pin must not have. svh is fixed to the small viewport. */
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
            gap: 0.85rem;
            /* The stage is pinned at top:0, so it starts UNDER the fixed navbar
               (h-16 = 4rem on mobile). Clear it, or the top of every photo is
               permanently hidden behind the bar. The photo just crops — it is
               object-cover and flexes into whatever height is left. */
            padding-top: 4.9rem;
            padding-bottom: 1.35rem;
          }
          /* Let .era-frame be a direct flex child so it can absorb the slack. */
          .history-timeline .era-media { display: contents; }
          .history-timeline .era-frame {
            aspect-ratio: auto;
            height: auto;
            flex: 1 1 auto;
            min-height: 26svh;
            max-height: 46svh;
            border-radius: 1.5rem;
          }
          .history-timeline .era-caption { padding: 1.25rem 1.35rem; }
          .history-timeline .era-blurb { display: none; }

          /* On desktop the numeral is a faint mark up in the corner. On a phone
             that corner is the photo, where it reads as a smudge on the picture.
             Drop it to the bottom instead, so it sits as a watermark UNDER the
             year text. It stays behind: .stage-inner is positioned and comes
             later in the DOM, so the text paints over it. */
          .history-timeline .section-numeral {
            top: auto;
            bottom: -1rem;
            right: 0.5rem;
            font-size: 44vw;
            opacity: 0.07;
          }

          .history-timeline .era-body {
            flex: none;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          }
          /* Stack the years in one grid cell instead of absolutely positioning
             them: the wrapper then measures the TALLEST year and reserves exactly
             that much, so no year is ever clipped and the photo doesn't resize
             from year to year within an era. */
          .history-timeline .panel-wrap {
            display: grid;
            flex: none;
          }
          .history-timeline .dot-panel {
            grid-area: 1 / 1;
            justify-content: flex-start;
            opacity: 0;
            transform: translateY(26px);
            transition: opacity .5s cubic-bezier(.16,1,.3,1),
              transform .5s cubic-bezier(.16,1,.3,1);
            pointer-events: none;
          }
          .history-timeline .dot-panel.is-above { transform: translateY(-26px); }
          .history-timeline .dot-panel.is-active {
            opacity: 1;
            transform: none;
            pointer-events: auto;
          }
          /* The rail already says which year this is, and the year itself is set
             large right below — the 01 / 06 counter is a third copy. */
          .history-timeline .panel-count { display: none; }
          .history-timeline .dot-year { font-size: 2.15rem; }
          .history-timeline .dot-body {
            font-size: clamp(0.92rem, 3.7vw, 1.05rem);
            line-height: 1.62;
            margin-top: 0.6rem;
          }
          /* The citation line is real content on a phone too — it just has to
             cost less height. The panel sizes to its tallest year, so this comes
             out of the photo's flex, not out of the text. */
          .history-timeline .dot-cite {
            margin-top: 0.9rem;
            gap: 0.3rem 0.45rem;
          }
          .history-timeline .dot-tier {
            font-size: 0.5rem;
            letter-spacing: 0.2em;
            padding: 0.3rem 0.5rem 0.27rem;
          }
          .history-timeline .cite-chip { font-size: 0.65rem; }

          /* Rail turns on its side: a row of beads, no years (the active year is
             already set large in the panel). Tap targets stay 26px + padding. */
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
