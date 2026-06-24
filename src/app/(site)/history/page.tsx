"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

// Vertical scroll (in vh) allotted to each year-dot within a pinned era.
const STEP_VH = 52;

// One generated still per year, in /public/images/history named
// <era-id>-<n>.jpg (n = 1-based dot index). See IMAGE_PROMPTS.md.
const photoFor = (eraId: string, di: number) =>
  `/images/history/${eraId}-${di + 1}.jpg`;

export default function HistoryPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 768px)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const eras = gsap.utils.toArray<HTMLElement>(".era");

      eras.forEach((era) => {
        // Scroll-synced step-through: as the pinned era scrolls, the active
        // year advances — its panel, photo and dot crossfade in together.
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

        // The stepping only applies on desktop, where the stage is pinned and
        // scrolled through. On mobile / reduced-motion every panel is shown in
        // normal flow (CSS), so we leave them all visible.
        const pinned = !reduce && desktop;
        let st: ReturnType<typeof ScrollTrigger.create> | null = null;

        if (pinned) {
          const stage = era.querySelector<HTMLElement>(".stage");
          if (stage) {
            // Pin the stage with GSAP (not CSS sticky — body has
            // overflow-x:hidden, which disables native sticky). The pin lasts
            // STEP_VH per year; the active year tracks scroll progress.
            st = ScrollTrigger.create({
              trigger: era,
              start: "top top",
              end: () => "+=" + (n * STEP_VH * window.innerHeight) / 100,
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
          }
        }

        // Clickable dots — jump straight to a year.
        const goTo = (k: number) => {
          if (st) {
            const target = st.start + (st.end - st.start) * ((k + 0.5) / n);
            const lenis = (
              window as unknown as {
                __lenis?: { scrollTo: (t: number, o?: object) => void };
              }
            ).__lenis;
            if (lenis?.scrollTo) lenis.scrollTo(target, { duration: 1 });
            else window.scrollTo({ top: target, behavior: "smooth" });
          } else {
            panels[k]?.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        };
        railBtns.forEach((btn, k) => {
          const handler = () => goTo(k);
          btn.addEventListener("click", handler);
          cleanups.push(() => btn.removeEventListener("click", handler));
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, [lang]);

  return (
    <div ref={rootRef} className="history-timeline">
      <PageHero
        label={t.history.label}
        title={t.history.title}
        intro={t.history.intro}
        image="/images/bw-old-pic.jpg"
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

              <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-10 py-24 md:py-0 grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
                {/* IMAGE */}
                <div>
                  <div className="relative aspect-[4/5] md:h-[70vh] md:aspect-auto rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-gold/20">
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
                    <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                      <p className="font-display text-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-3">
                        {era.span}
                      </p>
                      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                        {era.heading}
                      </h2>
                      <p className="mt-4 text-white/75 leading-relaxed max-w-md">
                        {era.blurb}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT — small dot rail + the one active year */}
                <div className="flex gap-6 md:gap-8">
                  <ul className="rail hidden md:flex flex-col justify-center items-stretch gap-2.5">
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
                        <p className="font-display text-text-muted text-xs tracking-[0.4em] uppercase mb-4">
                          {String(di + 1).padStart(2, "0")} / {String(era.dots.length).padStart(2, "0")}
                        </p>
                        <p className="dot-year font-display text-4xl md:text-6xl leading-none text-gradient-gold">
                          {dot.year}
                        </p>
                        <h3 className="mt-4 font-serif text-2xl md:text-3xl text-navy">
                          {dot.title}
                        </h3>
                        <p className="mt-3 text-text-muted text-lg leading-relaxed max-w-xl">
                          {dot.body}
                        </p>
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

        /* Mobile & reduced-motion: every year shown in normal flow */
        @media (max-width: 767px) {
          .history-timeline .dot-panel + .dot-panel { margin-top: 3rem; }
        }
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
          .history-timeline .dot-panel + .dot-panel { margin-top: 3rem; }
        }
      `}</style>
    </div>
  );
}
