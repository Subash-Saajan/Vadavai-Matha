"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ResidentImage } from "@/components/ResidentImage";
import { useReveal } from "@/hooks/useReveal";
import { CHAPTERS, CHROME, CHROME_TA, platesOf, type Plate } from "@/lib/gallery";

/**
 * /gallery — the plates, and the reader who wants one of them large.
 *
 * ── WHY THIS IS A COLUMN MASONRY AND NOT A CARD GRID ──────────────────────
 * The photographs this parish owns run from 0.53 to 2.53 in aspect ratio: a
 * bell shaft, a panoramic angel, four portrait windows, a near-square statue. A
 * uniform grid can only reconcile that with `object-cover`, and `object-cover`
 * on a 0.56 portrait in a landscape box throws away two thirds of the picture —
 * which on this site means cropping the crown off Our Lady to make a tidy row.
 *
 * So every plate keeps its own shape. `columns-*` lays them out, each figure is
 * `break-inside-avoid`, and each image box carries its intrinsic `aspect-ratio`
 * so the column is the right height before a single byte of image has arrived.
 * Nothing here reflows as it loads, which on a page of thirty-nine photographs
 * is not a nicety: a masonry that resettles four times is a page you cannot tap.
 *
 * ── THE CHAPTERS ARE ANCHORS, NOT A FILTER ────────────────────────────────
 * The obvious build is a row of filter chips that hides five parts of the page.
 * It is the wrong one here. Every plate would still be in the DOM but
 * `display: none`, so Google Images — a real discovery path for a pilgrimage
 * shrine, and the reason lib/seo.ts feeds the sitemap a picture per route —
 * would see a page whose contents are mostly hidden, and a reader arriving from
 * a search for one photograph would land on a page that is not showing it. Real
 * `#anchors` instead, exactly as the contents block on /priests: everything is
 * rendered, everything is indexable, and the nav works with JavaScript off.
 *
 * ── THE LIGHTBOX IS A <dialog>, FOR THE REASON BookLeaf'S IS ──────────────
 * `showModal()` gives the platform's own modality: the rest of the document is
 * inert, focus is trapped, Escape closes, and the backdrop is a real
 * `::backdrop`. Hand-rolling that is how a gallery ends up with a reader tabbing
 * into the footer behind a full-screen photograph. The three things the platform
 * does NOT do are done below: the document is locked against scrolling, Lenis is
 * stopped (it drives `window.scrollTo` off its own rAF loop and does not know
 * the dialog exists), and the arrow keys walk the plates.
 *
 * ⚠ The <style> block at the foot is a PLAIN <style> element, not styled-jsx.
 * Every selector in it is already global; do NOT write `:global(...)` in it. See
 * the note in components/reference/BookLeaf.tsx for the rule that spent a year
 * silently discarded because someone did.
 */

/* Built once at module scope. The chapters are fixed and the plates never
   change, so filtering them on every render of six sections — and again in the
   contents block — is work with a known answer. */
const BY_CHAPTER = new Map(CHAPTERS.map((c) => [c.key, platesOf(c.key)] as const));

/** Page order — the order the lightbox's ← and → walk in. */
const ORDERED: Plate[] = CHAPTERS.flatMap((c) => BY_CHAPTER.get(c.key) ?? []);

/* Each plate's index in ORDERED, by src. The figures are rendered chapter by
   chapter, so every one needs to know where it sits in the flat sequence. */
const INDEX_OF = new Map(ORDERED.map((p, i) => [p.src, i]));

export function GalleryPlates({ lang }: { lang: "en" | "ta" }) {
  const ta = lang === "ta";
  const C = ta ? CHROME_TA : CHROME;

  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  /* The thumbnail that opened the dialog, so a keyboard reader is handed back
     to the plate they were on rather than to the top of the page. */
  const openerRef = useRef<HTMLElement | null>(null);

  const [at, setAt] = useState<number | null>(null);

  const cap = (p: Plate) => (ta && p.captionTa ? p.captionTa : p.caption);
  const alt = (p: Plate) => (ta && p.altTa ? p.altTa : p.alt);
  const credit = (p: Plate) => (ta && p.creditTa ? p.creditTa : p.credit);

  useReveal(rootRef, lang);

  const close = useCallback(() => setAt(null), []);
  const step = useCallback((by: number) => {
    setAt((i) => (i === null ? i : (i + by + ORDERED.length) % ORDERED.length));
  }, []);

  /* ── Showing and hiding, and everything the platform leaves to us ─────────
     `showModal()` is imperative, so the element is driven from `at` here rather
     than rendered conditionally: a <dialog> that has never been shown is
     `display: none` under the UA stylesheet, so it costs nothing to leave in
     the tree, and keeping one element means a step replaces the image inside it
     instead of tearing the dialog down and building it again. */
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;

    if (at === null) {
      if (dlg.open) dlg.close();
      /* Browsers largely restore focus themselves. One line removes the
         "largely" — and it is the difference between a keyboard reader landing
         back on plate 14 and landing at the top of a page of thirty-nine. */
      openerRef.current?.focus();
      return;
    }

    if (!dlg.open) dlg.showModal();
    closeRef.current?.focus();

    const root = document.documentElement;
    const body = document.body;
    const prevRootOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPad = body.style.paddingRight;
    /* The scrollbar's width put back as padding, so locking the document does
       not shift the page sideways behind the backdrop. */
    const gutter = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    const lenis = (
      window as unknown as { __lenis?: { start(): void; stop(): void } }
    ).__lenis;
    lenis?.stop();

    return () => {
      root.style.overflow = prevRootOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPad;
      lenis?.start();
    };
  }, [at]);

  /* Arrow keys walk the plates. Escape is the dialog's own — it fires `cancel`,
     then `close`, and `onClose` below puts the state back in step with it, so
     the several ways of shutting this can never disagree with each other. */
  useEffect(() => {
    if (at === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [at, step]);

  const cur = at === null ? null : ORDERED[at];

  return (
    <div ref={rootRef}>
      {/* ── Contents ───────────────────────────────────────────────────────
          Real anchors, no JavaScript, one full-width row each — the same block
          /priests uses, and for the same reason: it is the only navigation a
          long page has, and six links laid out as a phrase are six mis-taps. */}
      <nav
        aria-label={C.jumpAria}
        className="mx-auto max-w-3xl border-y border-gold/20 px-6"
      >
        <p
          className={`pt-6 ${
            ta
              ? "font-tamil"
              : "font-display uppercase tracking-[0.16em] md:tracking-[0.3em]"
          } text-[0.68rem] text-gold-dark md:text-[0.6rem]`}
        >
          {C.contents}
        </p>
        <ul className="mt-3 mb-2 divide-y divide-gold/15">
          {CHAPTERS.map((c) => (
            <li key={c.key}>
              <a
                href={`#part-${c.key}`}
                className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:bg-gold/5 md:py-3"
              >
                <span className="flex items-baseline gap-3">
                  <span className="w-6 shrink-0 font-display text-[0.72rem] tabular-nums text-gold-dark/70">
                    {c.numeral}
                  </span>
                  <span
                    className={`${
                      ta ? "font-tamil" : "font-display"
                    } text-[0.95rem] text-navy/75 underline decoration-gold/0 underline-offset-4 transition-colors group-hover:text-navy group-hover:decoration-gold-dark sm:text-base`}
                  >
                    {ta ? c.titleTa : c.title}
                  </span>
                </span>
                <span className="shrink-0 whitespace-nowrap font-display text-[0.76rem] tabular-nums text-navy/45 md:text-[0.7rem]">
                  {BY_CHAPTER.get(c.key)?.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── The six parts ──────────────────────────────────────────────── */}
      {CHAPTERS.map((c) => (
        <section
          key={c.key}
          id={`part-${c.key}`}
          /* `scroll-mt` clears the fixed navbar — 64px on a phone, 80px from md
             — or an anchor jump lands with the heading under the bar. */
          className="mx-auto mt-14 max-w-6xl scroll-mt-20 px-6 md:mt-24 md:scroll-mt-28 lg:px-10"
        >
          <header className="reveal-item relative mb-8 md:mb-12">
            <span
              className="section-numeral pointer-events-none absolute -top-8 left-0 select-none text-[6rem] opacity-[0.09] md:-top-12 md:text-[9rem]"
              aria-hidden="true"
            >
              {c.numeral}
            </span>
            <h2
              className={`relative ${
                ta ? "font-tamil" : "font-serif"
              } text-[clamp(1.6rem,6.4vw,2rem)] leading-tight text-navy md:text-5xl`}
            >
              {ta ? c.titleTa : c.title}
            </h2>
            <p
              className={`relative mt-3 max-w-2xl ${
                ta ? "font-tamil" : "font-serif"
              } text-[1.02rem] leading-relaxed text-navy/70 md:text-lg`}
            >
              {ta ? c.blurbTa : c.blurb}
            </p>
            <div className="leaf-rule mt-6 md:mt-8" />
          </header>

          {/* Two columns on a phone, not one. A single column of thirty-nine
              photographs is nine screens of scrolling before the reader reaches
              the last part; paired, a part is a glance. */}
          <div className="columns-2 gap-3 md:columns-3 md:gap-5 lg:gap-6">
            {(BY_CHAPTER.get(c.key) ?? []).map((p) => {
              const i = INDEX_OF.get(p.src) ?? 0;
              return (
                <figure
                  key={p.src}
                  className="reveal-item mb-3 w-full break-inside-avoid md:mb-5 lg:mb-6"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      openerRef.current = e.currentTarget;
                      setAt(i);
                    }}
                    aria-label={`${C.open}: ${cap(p)}`}
                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg ring-1 ring-navy/10 transition-shadow duration-500 hover:shadow-[0_18px_40px_-24px_rgba(20,28,48,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
                  >
                    {/* The box knows the picture's shape before it arrives, so
                        the column never resettles. See the head note. */}
                    <span
                      className="relative block w-full"
                      style={{ aspectRatio: `${p.w} / ${p.h}` }}
                    >
                      <ResidentImage
                        src={p.src}
                        alt={alt(p)}
                        fill
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 24vw"
                      />
                    </span>

                    {/* A date only where one is actually known — see the rule at
                        the head of lib/gallery.ts. */}
                    {p.year && (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 block bg-linear-to-t from-night-deep/80 to-transparent pt-10">
                        <span className="mb-2.5 ml-3 flex items-center gap-2 font-display text-[0.58rem] tracking-[0.2em] text-gold-light/90 uppercase">
                          <span className="h-px w-4 bg-gold/60" />
                          {p.year}
                        </span>
                      </span>
                    )}

                    <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-gold/0 ring-inset transition-all duration-500 group-hover:ring-gold/50" />
                  </button>

                  <figcaption
                    className={`mt-2 pr-1 ${
                      ta ? "font-tamil" : "font-serif"
                    } text-[0.82rem] leading-snug text-navy/65 md:mt-2.5 md:text-[0.95rem]`}
                  >
                    {cap(p)}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      ))}

      {/* ── The plate, enlarged ────────────────────────────────────────────
          `onClose` is the single place the state is put back: Escape, the close
          button and a click on the ground around the photograph all end here,
          so there is no way to shut this that leaves `at` pointing at
          something. */}
      <dialog
        ref={dialogRef}
        onClose={close}
        aria-label={C.dialogAria}
        className="gallery-zoom"
      >
        {cur && (
          <figure
            className="gallery-zoom-panel"
            /* Clicking the ground closes; clicking a control or the photograph
               itself does not. `closest` rather than a target equality test,
               because the ground here is three nested boxes, not one. */
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest("button, img, figcaption")) {
                close();
              }
            }}
          >
            <div className="gallery-zoom-bar">
              <span className="gallery-zoom-count">
                {(at ?? 0) + 1} {C.of} {ORDERED.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="gallery-zoom-btn"
              >
                {C.close}
                <span aria-hidden> ✕</span>
              </button>
            </div>

            {/* `min-height: 0` in the CSS is what lets this flex child actually
                shrink; without it a 0.53 portrait pushes the pager off screen. */}
            <div className="gallery-zoom-stage">
              <Image
                src={cur.src}
                alt={alt(cur)}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <figcaption className={`gallery-zoom-cap ${ta ? "font-tamil" : "font-serif"}`}>
              {cap(cur)}
              {credit(cur) && <span className="gallery-zoom-credit">{credit(cur)}</span>}
            </figcaption>

            <nav className="gallery-zoom-pager">
              <button type="button" className="gallery-zoom-btn" onClick={() => step(-1)}>
                <span aria-hidden>← </span>
                {C.prev}
              </button>
              <button type="button" className="gallery-zoom-btn" onClick={() => step(1)}>
                {C.next}
                <span aria-hidden> →</span>
              </button>
            </nav>
          </figure>
        )}
      </dialog>

      <style>{`
        .gallery-zoom {
          margin: auto;
          width: 100%;
          height: 100%;
          max-width: 100vw;
          max-height: 100dvh;
          padding: 0;
          border: 0;
          background: transparent;
          overflow: hidden;
        }
        .gallery-zoom::backdrop { background: rgba(6, 12, 24, .94); }

        .gallery-zoom-panel {
          display: flex;
          flex-direction: column;
          gap: .75rem;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: .75rem .9rem 1rem;
          color: #f4eee1;
        }

        .gallery-zoom-bar,
        .gallery-zoom-pager {
          flex: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .gallery-zoom-count {
          font-family: var(--font-display), serif;
          font-size: .7rem;
          letter-spacing: .2em;
          color: var(--gold);
          font-variant-numeric: tabular-nums;
        }

        /* ~44px of target. These three are the only way out of a full-screen
           photograph, and two of them are the only way through it. */
        .gallery-zoom-btn {
          font-family: var(--font-display), serif;
          font-size: .7rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(244, 238, 225, .8);
          padding: .72rem .95rem;
          border: 1px solid rgba(196, 160, 73, .35);
          border-radius: 9999px;
          background: rgba(255, 255, 255, .04);
          cursor: pointer;
          transition: color .3s ease, border-color .3s ease, background-color .3s ease;
        }
        .gallery-zoom-btn:hover {
          color: #fff;
          border-color: var(--gold);
          background: rgba(196, 160, 73, .16);
        }
        .gallery-zoom-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

        /* Tamil has no small-caps convention and the display face is cut for
           130px titles — at .7rem through that cut these labels are ~6px. Same
           correction .ui-label makes in globals.css. */
        html[lang|="ta"] .gallery-zoom-btn,
        html[lang|="ta"] .gallery-zoom-count {
          font-size: 1rem;
          letter-spacing: .02em;
          text-transform: none;
        }

        .gallery-zoom-stage {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
          width: 100%;
        }

        .gallery-zoom-cap {
          flex: none;
          max-width: 46rem;
          margin: 0 auto;
          text-align: center;
          font-size: .92rem;
          line-height: 1.5;
          color: rgba(244, 238, 225, .75);
        }

        .gallery-zoom-credit {
          display: block;
          margin-top: .35rem;
          font-family: var(--font-display), serif;
          font-size: .62rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(196, 160, 73, .75);
        }
        html[lang|="ta"] .gallery-zoom-credit {
          font-size: .85rem;
          letter-spacing: .02em;
          text-transform: none;
        }

        @media (min-width: 768px) {
          .gallery-zoom-panel { gap: 1rem; padding: 1.25rem 2rem 1.75rem; }
          .gallery-zoom-cap { font-size: 1.05rem; }
        }
      `}</style>
    </div>
  );
}
