"use client";

import { useState } from "react";
import Image from "next/image";
import type { Leaf } from "@/lib/referenceIndex";
import { RIGHTS_NOTE } from "@/lib/referenceIndex";

/**
 * One leaf of one book — the page a citation on /history actually rests on.
 *
 * THE FADE IS AN ARGUMENT, NOT AN EFFECT. The cited passage is set in dark ink;
 * the rest of the printed page stays legible but recedes. That is the honest
 * shape of a citation: this is the sentence we leaned on, and here is everything
 * printed around it, so you can see for yourself that we did not crop it into
 * meaning something it doesn't.
 *
 * Which is why "Read the whole page" is a real control and not decoration. A page
 * that dimmed its context and gave you no way to undim it would be doing the
 * cherry-picking it claims to be preventing — the reader must always be one tap
 * from the unfaded page. It doubles as the accessibility escape hatch, since
 * blurred low-contrast text is unreadable for many people by default.
 */
export function BookLeaf({ leaf }: { leaf: Leaf }) {
  const [plain, setPlain] = useState(false);   // context un-faded
  const [scan, setScan] = useState(false);     // the real photographed page

  const hasPage = leaf.kind === "leaf" && leaf.pageText && leaf.span;
  const [start, end] = (leaf.span ?? [0, 0]) as [number, number];
  const text = leaf.pageText ?? "";
  // Where the whole page IS the citation, there is nothing to un-dim, and offering to
  // "read the whole page" would be a button that does nothing.
  const hasContext = Boolean(hasPage) && (start > 0 || end < text.length);

  return (
    <div className="leaf-wrap">
      {/* ── The sheet ── */}
      <article className={`leaf ${plain ? "is-plain" : ""}`}>
        <header className="leaf-head">
          <span className="leaf-head-title">{leaf.short}</span>
          {leaf.page ? <span className="leaf-head-folio">p. {leaf.page}</span> : null}
        </header>

        {scan && leaf.scan ? (
          <div className="leaf-scan">
            <Image
              src={leaf.scan}
              alt={`The printed page ${leaf.page} of ${leaf.title}, photographed from the book`}
              width={1300}
              height={2000}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 44rem"
            />
          </div>
        ) : hasPage ? (
          // The printed page, with the cited passage found inside it.
          <div className="leaf-body" lang={leaf.lang}>
            <span className="ctx">{text.slice(0, start)}</span>
            <mark className="cited">{text.slice(start, end)}</mark>
            <span className="ctx">{text.slice(end)}</span>
          </div>
        ) : (
          // No page to print — either the law forbids it, or we have never
          // opened the book. Both say so plainly rather than faking a leaf.
          <div className="leaf-body leaf-body--bare" lang={leaf.lang}>
            {leaf.quote ? (
              <blockquote className="cited-alone">{leaf.quote}</blockquote>
            ) : (
              <p className="leaf-absent">
                {leaf.kind === "unavailable"
                  ? "We hold no copy of this book. Nobody working on this website has opened it — and we would rather tell you that than show you a page we have not read."
                  : "The passage is quoted above; the page itself is not ours to reproduce."}
              </p>
            )}
          </div>
        )}

        {leaf.page && !scan ? <div className="leaf-folio">{leaf.page}</div> : null}
      </article>

      {/* A crop the reader cannot see is precisely the cherry-picking this page exists to
          prevent. That we crop for a reason does not earn us the right to crop silently. */}
      {leaf.windowed && (
        <p className="leaf-partial">
          Shown in part. The rest of this page is not reproduced here.
        </p>
      )}

      {/* ── What you may do with the sheet ── */}
      <div className="leaf-controls">
        {hasPage && hasContext && (
          <button
            type="button"
            className="leaf-btn"
            aria-pressed={plain}
            onClick={() => setPlain((v) => !v)}
          >
            {plain ? "Dim the rest of the page" : "Read the whole page"}
          </button>
        )}
        {leaf.scan && (
          <button
            type="button"
            className="leaf-btn"
            aria-pressed={scan}
            onClick={() => setScan((v) => !v)}
          >
            {scan ? "Back to the reading text" : "See the actual page"}
          </button>
        )}
      </div>

      {/* The original stays above; English sits under it in a quieter hand. A
          reader who cannot check the translation against the printed French is
          being asked to trust us again — which is the thing we are trying to
          stop asking. */}
      {leaf.translation && (
        <section className="leaf-trans">
          <p className="leaf-trans-label">In English</p>
          <p className="leaf-trans-body">{leaf.translation}</p>
        </section>
      )}

      <footer className="leaf-foot">
        <p className="leaf-cite">
          <span className="leaf-cite-title">{leaf.title}</span>
          <span className="leaf-cite-imprint">{leaf.imprint}</span>
        </p>
        <p className={`leaf-rights leaf-rights--${leaf.rights}`}>{RIGHTS_NOTE[leaf.rights]}</p>
      </footer>

      <style>{`
        .leaf-wrap { --ink: #1c1a15; --paper: #faf6ea; }

        /* ── The sheet itself ──
           A leaf lying on a desk, not a card in a grid: warm ivory, aged at the
           edges, one soft shadow. The grain is an inline SVG so the page stays
           self-contained and costs no request. */
        .leaf {
          position: relative;
          background: var(--paper);
          background-image:
            radial-gradient(ellipse at 12% 8%, rgba(160,130,70,.055), transparent 42%),
            radial-gradient(ellipse at 88% 78%, rgba(150,120,60,.05), transparent 46%),
            radial-gradient(circle at 68% 22%, rgba(140,105,50,.05), transparent 12%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
          box-shadow:
            0 1px 0 rgba(255,255,255,.7) inset,
            0 22px 50px -28px rgba(28,26,21,.42),
            0 3px 10px -4px rgba(28,26,21,.16);
          border-radius: 2px;
          padding: clamp(1.6rem, 4.5vw, 3.4rem) clamp(1.35rem, 5vw, 3.6rem) clamp(2.6rem, 5vw, 3.4rem);
          overflow: hidden;
        }
        /* The aged darkening of a cut edge. Cheap, and it does most of the work. */
        .leaf::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 5rem rgba(120,95,45,.09), inset 0 0 1.2rem rgba(120,95,45,.06);
          border-radius: 2px;
        }

        /* ── Running head: the book, and the folio, as a printer would set them ── */
        .leaf-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 0.7rem;
          margin-bottom: 1.6rem;
          border-bottom: 1px solid rgba(196,160,73,.34);
        }
        .leaf-head-title {
          font-family: var(--font-display), serif;
          font-size: 0.62rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold-dark);
        }
        .leaf-head-folio {
          font-family: var(--font-display), serif;
          font-size: 0.62rem;
          letter-spacing: 0.16em;
          color: rgba(28,26,21,.4);
        }

        /* ── The printed page ── */
        .leaf-body {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(1.02rem, 2.5vw, 1.16rem);
          line-height: 1.85;
          color: var(--ink);
          text-align: justify;
          hyphens: auto;
          -webkit-hyphens: auto;
        }
        .leaf-body--bare { text-align: left; hyphens: manual; }

        /* Everything that is NOT the citation. Still there, still legible if you
           lean in — but stepped back, so the eye lands on the sentence we relied
           on. Reduce the ink, don't delete the words. */
        .ctx {
          color: rgba(28,26,21,.34);
          filter: blur(.35px);
          transition: color .5s ease, filter .5s ease;
        }
        /* The sentence the history page actually stands on. Full ink, set heavier,
           lit from under by a wash of gold the way a hand would rule it. */
        .cited {
          color: var(--ink);
          font-weight: 600;
          background: linear-gradient(transparent 58%, rgba(196,160,73,.26) 58%);
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          padding: 0 .06em;
          border-radius: 1px;
        }
        .leaf.is-plain .ctx {
          color: rgba(28,26,21,.86);
          filter: none;
        }
        .cited-alone {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(1.1rem, 2.7vw, 1.3rem);
          line-height: 1.75;
          color: var(--ink);
          font-weight: 600;
          border-left: 2px solid var(--gold);
          padding-left: 1.1rem;
        }
        .leaf-absent {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.06rem;
          line-height: 1.8;
          font-style: italic;
          color: var(--text-muted);
        }

        .leaf-partial {
          margin-top: 1rem;
          font-family: var(--font-serif), Georgia, serif;
          font-size: .9rem;
          font-style: italic;
          color: var(--text-muted);
        }

        .leaf-scan { margin: -0.4rem 0 0.6rem; }
        .leaf-scan :global(img) {
          border: 1px solid rgba(28,26,21,.1);
          border-radius: 1px;
        }

        /* Folio at the foot, flanked by rules — the way the book has it. */
        .leaf-folio {
          position: absolute;
          left: 0; right: 0; bottom: 1.05rem;
          display: flex; align-items: center; justify-content: center; gap: .8rem;
          font-family: var(--font-display), serif;
          font-size: .68rem;
          letter-spacing: .18em;
          color: rgba(28,26,21,.32);
        }
        .leaf-folio::before, .leaf-folio::after {
          content: "";
          width: 1.6rem;
          height: 1px;
          background: rgba(196,160,73,.4);
        }

        /* ── Controls ── */
        .leaf-controls {
          display: flex;
          flex-wrap: wrap;
          gap: .6rem;
          margin-top: 1.4rem;
        }
        .leaf-btn {
          font-family: var(--font-display), serif;
          font-size: .6rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--gold-dark);
          background: transparent;
          border: 1px solid rgba(196,160,73,.42);
          border-radius: 9999px;
          padding: .62rem 1.05rem .56rem;
          cursor: pointer;
          transition: background .3s ease, color .3s ease, border-color .3s ease;
        }
        .leaf-btn:hover { background: rgba(196,160,73,.1); border-color: var(--gold); }
        .leaf-btn[aria-pressed="true"] {
          background: rgba(196,160,73,.16);
          border-color: var(--gold);
          color: #6f5620;
        }
        .leaf-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }

        /* ── The English, under the original ── */
        .leaf-trans {
          margin-top: 1.6rem;
          padding: 1.25rem 1.4rem;
          border-left: 2px solid rgba(196,160,73,.45);
          background: rgba(196,160,73,.05);
          border-radius: 0 3px 3px 0;
        }
        .leaf-trans-label {
          font-family: var(--font-display), serif;
          font-size: .58rem;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: .55rem;
        }
        .leaf-trans-body {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.06rem;
          line-height: 1.75;
          color: rgba(28,26,21,.78);
          font-style: italic;
        }

        /* ── The book, named ── */
        .leaf-foot { margin-top: 1.8rem; }
        .leaf-cite { display: flex; flex-direction: column; gap: .2rem; }
        .leaf-cite-title {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.05rem;
          color: var(--navy);
        }
        .leaf-cite-imprint {
          font-family: var(--font-display), serif;
          font-size: .64rem;
          letter-spacing: .13em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .leaf-rights {
          margin-top: .8rem;
          font-family: var(--font-serif), Georgia, serif;
          font-size: .92rem;
          line-height: 1.6;
          font-style: italic;
          color: var(--text-muted);
        }
        /* The two that are a confession, not a footnote, are allowed to say so. */
        .leaf-rights--in-copyright,
        .leaf-rights--none { color: #8a6a2c; }

        @media (max-width: 640px) {
          /* Justified text needs width to avoid rivers; a phone hasn't got it. */
          .leaf-body { text-align: left; hyphens: manual; }
          .leaf-folio { bottom: .8rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctx, .leaf-btn { transition: none; }
        }
      `}</style>
    </div>
  );
}
