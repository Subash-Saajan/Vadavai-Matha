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
export function BookLeaf({ leaf, url }: { leaf: Leaf; url?: string }) {
  // The pages we can turn through: the cited page plus any caste-free neighbours
  // the build could reach. Most leaves have only the one, and behave as before.
  const pages = leaf.pages;
  // Open on THE cited page — not on a run-up page that only carries the head of a
  // sentence spilling into the cited one.
  const anchorIdx = pages ? Math.max(0, pages.findIndex((p) => p.cited)) : 0;

  const [pageIdx, setPageIdx] = useState(anchorIdx);
  const [plain, setPlain] = useState(false);   // context un-faded
  const [scan, setScan] = useState(false);     // the real photographed page

  // The page currently on the desk — one of the neighbours, or the single leaf.
  const cur = pages
    ? pages[pageIdx]
    : { n: leaf.page, text: leaf.pageText ?? "", span: leaf.span ?? null, scan: leaf.scan, cited: true };
  const curText = cur.text ?? "";
  const curScan = cur.scan;
  // Only the cited page carries a highlight; the neighbours are run-up or continuation.
  const cited = (cur.span ?? null) as [number, number] | null;

  const turn = (delta: number) => {
    if (!pages) return;
    setPageIdx((i) => Math.min(pages.length - 1, Math.max(0, i + delta)));
    setScan(false);   // a turned page lands on its reading text, not its facsimile
    setPlain(false);
  };

  // Where the book lives, named by its host — "archive.org", not a raw URL. A
  // reader deciding whether to follow a link deserves to know where it goes.
  let host = "";
  try {
    if (url) host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    host = "";
  }

  const hasPage = leaf.kind === "leaf" && curText.length > 0;
  const [start, end] = (cited ?? [0, 0]) as [number, number];
  // Where the whole page IS the citation, there is nothing to un-dim, and offering to
  // "read the whole page" would be a button that does nothing.
  const hasContext = hasPage && !!cited && (start > 0 || end < curText.length);

  return (
    <div className="leaf-wrap">
      {/* ── The sheet ── */}
      <article className={`leaf ${plain ? "is-plain" : ""}`}>
        <header className="leaf-head">
          <span className="leaf-head-title">{leaf.short}</span>
          {cur.n ? <span className="leaf-head-folio">p. {cur.n}</span> : null}
        </header>

        {scan && curScan ? (
          <div className="leaf-scan">
            <Image
              src={curScan}
              alt={`The printed page ${cur.n} of ${leaf.title}, photographed from the book`}
              width={1300}
              height={2000}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 44rem"
            />
          </div>
        ) : hasPage && cited ? (
          // The cited page, with the passage found inside it and the rest dimmed.
          <div className="leaf-body" lang={leaf.lang}>
            <span className="ctx">{curText.slice(0, start)}</span>
            <mark className="cited">{curText.slice(start, end)}</mark>
            <span className="ctx">{curText.slice(end)}</span>
          </div>
        ) : hasPage ? (
          // A neighbour page: nothing on it is cited, so nothing is dimmed — the
          // whole page in full ink, there only to be read.
          <div className="leaf-body" lang={leaf.lang}>{curText}</div>
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

        {/* ── Our reading of it, on the sheet ──
            A quotation of six words alone on a large sheet reads as an empty
            page, and an empty page reads as a weak citation — when in fact the
            limit is the law, not the evidence. So where we may print only a
            fragment, our own account of what the book establishes comes up onto
            the sheet to sit beside it.

            IT MUST NEVER BE MISTAKEN FOR THE BOOK. The quotation keeps the book's
            voice — serif, ruled, full ink. This is set apart and labelled: it is
            us, talking about them. Paraphrase is ours to write freely; their
            sentences are not ours to lengthen. */}
        {leaf.kind !== "leaf" && leaf.establishes && (
          <section className="leaf-gloss">
            <p className="leaf-gloss-label">What this source establishes</p>
            <p className="leaf-gloss-body">{leaf.establishes}</p>
          </section>
        )}

        {/* ── Where the rest of it is ──
            A leaf that can only ever show a quotation must not dead-end. Stopping
            at six words and saying nothing more is a citation asking to be taken
            on trust, which is the exact habit this reader exists to break: if the
            law will not let us print the page, the least we owe is the door.

            Only on leaves with no page of their own. Where a facsimile is already
            on the sheet, the reader HAS the rest, and the link belongs in the
            footer with the other navigation, not in the middle of the evidence. */}
        {leaf.kind !== "leaf" && url && host && (
          <p className="leaf-onward">
            {leaf.kind === "unavailable"
              ? "Nobody here has opened this book. If you want to, it is at "
              : "This is as much of it as we may lawfully print. The rest is at "}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="leaf-onward-link"
            >
              {host}
              <span aria-hidden> ↗</span>
            </a>
            .
          </p>
        )}

        {cur.n && !scan ? <div className="leaf-folio">{cur.n}</div> : null}
      </article>

      {/* ── Turning the pages ──
          Where the build could reach the cited page's neighbours (public-domain or
          our own, and caste-free), the reader can leaf forward to follow a sentence
          that finishes overleaf, or back to see the run-up. The cited page is marked
          so it is never lost among its neighbours. */}
      {pages && pages.length > 1 && (
        <nav className="leaf-pager" aria-label="Turn the pages of this book">
          <button
            type="button"
            className="leaf-page-btn"
            onClick={() => turn(-1)}
            disabled={pageIdx === 0}
          >
            ← Previous page
          </button>
          <span className="leaf-pager-at">
            {cur.n ? `p. ${cur.n}` : `page ${pageIdx + 1}`}
            {cur.cited ? " · the cited page" : cited ? " · the passage continues" : ""}
          </span>
          <button
            type="button"
            className="leaf-page-btn"
            onClick={() => turn(1)}
            disabled={pageIdx === pages.length - 1}
          >
            Next page →
          </button>
        </nav>
      )}

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
        {curScan && (
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
          color: rgba(28,26,21,.58);
          filter: blur(.15px);
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

        /* Our gloss, on the sheet but never in the book's voice: no serif
           quotation face, no rule down the side, a label over it. The reader
           must be able to tell at a glance which words are Bayly's and which
           are ours. */
        .leaf-gloss {
          margin-top: 1.7rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(196,160,73,.28);
        }
        .leaf-gloss-label {
          font-family: var(--font-display), serif;
          font-size: .56rem;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: .6rem;
        }
        .leaf-gloss-body {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: .93rem;
          line-height: 1.72;
          color: rgba(28,26,21,.66);
        }

        /* The way onward, set on the sheet itself — quieter than the quotation
           it follows, but unmistakably a door. */
        .leaf-onward {
          margin-top: 1.5rem;
          padding-top: 1.1rem;
          border-top: 1px solid rgba(196,160,73,.28);
          font-family: var(--font-serif), Georgia, serif;
          font-size: .95rem;
          line-height: 1.7;
          color: rgba(28,26,21,.6);
        }
        .leaf-onward-link {
          color: var(--gold-dark);
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
          text-decoration-color: rgba(196,160,73,.55);
          white-space: nowrap;
          transition: color .3s ease, text-decoration-color .3s ease;
        }
        .leaf-onward-link:hover {
          color: #6f5620;
          text-decoration-color: var(--gold-dark);
        }
        .leaf-onward-link:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
          border-radius: 2px;
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

        /* ── The pager: turning to the neighbouring pages ── */
        .leaf-pager {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed rgba(196,160,73,.32);
        }
        .leaf-pager-at {
          font-family: var(--font-display), serif;
          font-size: .58rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-align: center;
          flex: 1;
        }
        .leaf-page-btn {
          font-family: var(--font-display), serif;
          font-size: .6rem;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--gold-dark);
          background: transparent;
          border: none;
          padding: .4rem .2rem;
          cursor: pointer;
          white-space: nowrap;
          transition: color .3s ease, opacity .3s ease;
        }
        .leaf-page-btn:hover:not(:disabled) { color: #6f5620; }
        .leaf-page-btn:disabled { opacity: .3; cursor: default; }
        .leaf-page-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 2px; }

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
