"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cappedSizes } from "@/lib/imageSizes";
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
  const [zoom, setZoom] = useState(false);     // …that page, opened full-screen
  const [big, setBig] = useState(false);       // …and magnified past the fit

  const zoomRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

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
    setZoom(false);   // and never on the previous page's facsimile, enlarged
    setBig(false);
  };

  /* ── OPENING AND CLOSING THE ENLARGED FACSIMILE ──────────────────────────
     The overlay is a real <dialog> driven with showModal(), and it is a
     <dialog> precisely so that the accessibility is the platform's rather than
     ours: the browser puts it in the top layer (so no ancestor's overflow,
     transform or z-index can clip it), marks everything behind it inert, gives
     it an implicit role="dialog" + aria-modal, closes it on Escape, and keeps
     Tab inside it. Hand-rolling that list is how lightboxes end up unusable
     with a keyboard, and it is the reason this component gains no dependency.

     Two things the platform does NOT give us, and both are done here:

       · THE PAGE BEHIND STILL SCROLLS. A modal dialog stops pointer events
         reaching the document but not wheel or touch scrolling, so without
         this the reader pans the facsimile, hits its edge, and the history
         page underneath starts moving. `overflow: hidden` goes on BOTH the
         root and the body because this site's viewport scrollbox is
         ambiguous: globals.css sets `overflow-x: hidden` on <body>, which is
         enough to make the body the propagating element on some passes, so
         locking only one of the two is a coin toss. The padding compensates
         for the scrollbar the lock removes — without it the whole document
         jumps ~15px sideways at the moment the overlay opens, and again when
         it closes.

       · LENIS DOES NOT KNOW THE DIALOG EXISTS. The smooth-scroll instance
         (desktop only, see hooks/useLenis) drives window.scrollTo off its own
         rAF loop and would happily keep scrolling the locked document. It is
         stopped for as long as the overlay is up and started again after.
         `.stop()` is idempotent and the instance is simply absent on touch,
         where useLenis never runs — hence the optional call.

     Focus goes to Close, not to the image: it is the one control every reader
     needs and the one screen readers should announce after the dialog's own
     name. On close we hand focus back to the thumbnail that opened it, so a
     keyboard reader lands where they left rather than at the top of the page.
     Browsers largely do this restoration themselves; doing it explicitly costs
     one line and removes the "largely". */
  useEffect(() => {
    const dlg = zoomRef.current;
    if (!dlg) return;

    if (!zoom) {
      if (dlg.open) dlg.close();
      return;
    }

    if (!dlg.open) dlg.showModal();
    closeRef.current?.focus();

    const root = document.documentElement;
    const body = document.body;
    const prevRootOverflow = root.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPad = body.style.paddingRight;
    const gutter = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    const lenis = (window as unknown as {
      __lenis?: { start(): void; stop(): void };
    }).__lenis;
    lenis?.stop();

    return () => {
      root.style.overflow = prevRootOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPad;
      lenis?.start();
    };
  }, [zoom]);

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
          /* ── THE FACSIMILE, AND THE WAY INTO IT ──────────────────────────
             The scan is about 1300×2000 and lands here roughly 325px wide on a
             phone. It scales correctly — the sheet never pushes the document
             sideways — but at that size the printed text is a texture, not
             words, and this is the one page on the site whose entire argument
             is "here is the actual leaf, check us". A facsimile nobody can read
             makes the argument in form and refuses it in substance.

             So the photograph is itself the control: the whole image is one
             large button that opens the full-screen reader below. A button and
             not a div with a click handler, because that is what makes it
             reachable by Tab, operable by Enter and Space, and announced as
             something you can do rather than something you can look at. */
          <div className="leaf-scan">
            <button
              ref={openerRef}
              type="button"
              className="leaf-scan-open"
              onClick={() => setZoom(true)}
              aria-label={`Enlarge the photographed page${cur.n ? ` ${cur.n}` : ""} of ${leaf.title} — opens a full-screen view you can magnify and pan`}
            >
              <Image
                src={curScan}
                alt={`The printed page ${cur.n} of ${leaf.title}, photographed from the book`}
                width={1300}
                height={2000}
                className="w-full h-auto"
                sizes={cappedSizes("(max-width: 768px) 100vw, 44rem")}
              />
              {/* The cue is inside the button so it can never drift away from
                  the thing it describes, and aria-hidden because the button's
                  own label already says all of this at greater length. */}
              <span className="leaf-scan-cue" aria-hidden>
                Enlarge <span className="leaf-scan-cue-mark">⤢</span>
              </span>
            </button>
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

        {/* ── Where this stops ──
            A leaf that can only ever show a quotation must not dead-end. Stopping
            at six words and saying nothing more is a citation asking to be taken
            on trust, which is the exact habit this reader exists to break — so
            the sheet always says why it stops where it does.

            What changed: it used to end in a door to the whole volume. For books
            it no longer does. The parish will not put the rest of these volumes
            on its own website (see the full-volume rule in lib/sources.ts), so
            `url` arrives undefined for a book and defined only for a document
            that IS the thing cited — a homily, a diocesan page, a census record.
            The sentence stayed; only the door went.

            Only on leaves with no page of their own. Where a facsimile is already
            on the sheet, the reader HAS the page, and there is nothing to say. */}
        {leaf.kind !== "leaf" && (
          <p className="leaf-onward">
            {url && host ? (
              <>
                {leaf.kind === "unavailable"
                  ? "Nobody here has opened this. If you want to, it is at "
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
              </>
            ) : leaf.kind === "unavailable" ? (
              "Nobody here has opened this book. What it is cited for is written above, and no more than that is claimed."
            ) : (
              "This is as much of the book as this site prints. It is named in full in the bibliography below."
            )}
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

      {/* ── THE FACSIMILE, FULL SCREEN ──────────────────────────────────────
          Mounted whenever this page HAS a scan, not only while the scan is on
          the sheet, so that turning back and forth never remounts it. A
          <dialog> that has not been shown is `display: none` under the UA
          stylesheet, which is also the whole of the no-JavaScript story: with
          scripting off nothing here renders, the sheet above is byte-for-byte
          what it always was, and the reader loses only a control that could
          never have worked anyway.

          ⚠ The base .leaf-zoom rule below must therefore NEVER set `display`.
          An author rule beats the UA rule, so a bare `display: flex` on the
          element would pin the overlay open over every reference page on the
          site. The layout lives on `.leaf-zoom[open]`. */}
      {curScan && (
        <dialog
          ref={zoomRef}
          className="leaf-zoom"
          aria-label={`The photographed page${cur.n ? ` ${cur.n}` : ""} of ${leaf.title}, enlarged`}
          onClose={() => {
            setZoom(false);
            setBig(false);
            openerRef.current?.focus();
          }}
        >
          <div className="leaf-zoom-bar">
            <div className="leaf-zoom-said">
              <p className="leaf-zoom-title">
                {leaf.short}
                {cur.n ? ` · p. ${cur.n}` : ""}
              </p>
              {/* Hidden below 640px, where it would take a third of the bar to
                  say two things a phone reader cannot use: there is no Escape
                  key, and dragging is what a finger does anyway. What replaces
                  it on a phone is the Magnify button, which is the only part of
                  this line that carries information a gesture does not. */}
              <p className="leaf-zoom-hint">Drag or scroll to explore · Esc to close</p>
            </div>
            <div className="leaf-zoom-acts">
              {/* Pinch-zoom is the obvious gesture and it works — this app sets
                  no `user-scalable=no`, and the stage permits pinch through
                  touch-action. But a gesture is not an interface: it is
                  invisible, it is unavailable to anyone driving the page from a
                  keyboard, and it is unavailable to a mouse. This button is the
                  same capability said out loud, and it is what makes the
                  enlargement accessible rather than merely possible. */}
              <button
                type="button"
                className="leaf-zoom-btn"
                aria-pressed={big}
                onClick={() => setBig((v) => !v)}
              >
                {big ? "Fit the page" : "Magnify"}
              </button>
              <button
                ref={closeRef}
                type="button"
                className="leaf-zoom-btn leaf-zoom-btn--close"
                onClick={() => setZoom(false)}
              >
                Close<span aria-hidden> ✕</span>
              </button>
            </div>
          </div>

          {/* The scroll container, and the ONLY thing in the overlay that
              scrolls. Panning a magnified page happens strictly inside this
              box: `overscroll-behavior: contain` stops the gesture chaining out
              to the document when it reaches an edge, and the document is
              locked besides. tabIndex + role/label because a scrollable region
              that cannot be focused cannot be scrolled with the arrow keys —
              the keyboard equivalent of dragging. */}
          <div
            className={`leaf-zoom-stage ${big ? "is-big" : ""}`}
            data-lenis-prevent
            tabIndex={0}
            role="region"
            aria-label="The photographed page — scroll or pinch to read it closely"
          >
            {/* `sizes` is deliberately a flat 1300px rather than a viewport
                share. This is the one place on the site where we WANT the
                largest rendition the source can give: told "100vw", a 360px
                phone picks a 640w or 1080w candidate and the reader magnifies
                straight into the resampling. Told 1300px, it fetches the scan
                at the resolution it was photographed. next/image is still lazy
                by default, so the fetch happens when the dialog first opens and
                not on page load. */}
            <Image
              src={curScan}
              alt={`The printed page ${cur.n} of ${leaf.title}, photographed from the book`}
              width={1300}
              height={2000}
              className="leaf-zoom-img"
              sizes={cappedSizes("1300px")}
            />
          </div>
        </dialog>
      )}

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
          /* THE ONE PLACE ON THIS SITE WHERE AN UNBREAKABLE WORD IS LIKELY.
             This is not our prose — it is transcribed page text out of French,
             Latin, Portuguese and Tamil books, including compound place-names,
             archival shelfmarks and OCR that occasionally welds two words
             together. Auto-hyphenation is turned OFF below 640px (see the
             media query at the foot of this sheet, where justification goes
             with it), which removes the only thing breaking long tokens on the
             narrowest measure we set. The .leaf sheet clips rather than scrolls, so the
             failure mode was silently losing the end of a line rather than a
             visible overflow — worse, on a page whose entire argument is that
             you can see the passage in full. */
          overflow-wrap: break-word;
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
          overflow-wrap: break-word;
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

        /* ── FRAMING THE FACSIMILE — AND A RULE THAT NEVER ONCE APPLIED ──────
           ⚠ This was written as ".leaf-scan :global(img)" and stayed that way
           from the day the reference reader was built until 30 July 2026.
           :global() is CSS-Modules / styled-jsx syntax. This component ships a
           PLAIN <style> element, so the browser parses its contents as ordinary
           CSS, does not recognise :global as a selector, and — per the CSS
           error-handling rules — discards the ENTIRE rule, declarations and all.
           The facsimile has therefore been an unframed photograph lying on the
           parchment for the whole life of the page, with the CSS that should
           have framed it sitting in the file looking correct.

           Nothing in this <style> block ever needed :global. The block is not
           scoped by anything; every selector in it is already global. Do not
           put it back, in any form, anywhere in this file.

           The declarations the invalid selector was swallowing specified a
           neutral 10%-ink hairline. That was drawn before this sheet settled on
           gold rules, and it is now the only grey line anywhere on it — the
           running head, the gloss, the translation panel, the pager and the
           buttons are all rgba(196,160,73,·). Since the rule is being brought to
           life for the first time, it is brought to life in the hand the sheet
           actually uses, so the change desktop readers see is a gold hairline
           seating the photograph on the paper rather than a grey box appearing
           around it. The added display:block closes the inline-image gap that
           was quietly padding the space beneath the scan. */
        .leaf-scan img {
          display: block;
          border: 1px solid rgba(196,160,73,.38);
          border-radius: 1px;
        }

        /* The photograph is the button. Everything a <button> brings by default
           — its own font, background, border, padding, centring — has to come
           off, or the frame above sits inside a second, browser-drawn one. */
        .leaf-scan-open {
          display: block;
          position: relative;
          width: 100%;
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          font: inherit;
          color: inherit;
          text-align: left;
          cursor: zoom-in;
        }
        .leaf-scan-open:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
        .leaf-scan-open:hover .leaf-scan-cue { background: rgba(250,246,234,.98); color: #6f5620; }

        /* Set as a printer's mark on the corner of the plate rather than a
           floating web badge: engraved caps, gold, on the sheet's own paper. */
        .leaf-scan-cue {
          position: absolute;
          right: .5rem;
          bottom: .5rem;
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          padding: .42rem .7rem .36rem;
          background: rgba(250,246,234,.92);
          border: 1px solid rgba(196,160,73,.5);
          border-radius: 9999px;
          font-family: var(--font-display), serif;
          font-size: .58rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--gold-dark);
          box-shadow: 0 2px 8px -4px rgba(28,26,21,.4);
          transition: background .3s ease, color .3s ease;
        }
        .leaf-scan-cue-mark { font-size: .9rem; line-height: 1; letter-spacing: 0; }

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

        /* ══ THE ENLARGED FACSIMILE ═══════════════════════════════════════════
           A reading room, not a lightbox. The chrome is the sheet's own paper
           with the sheet's own gold hairline under it; only the surround behind
           the plate is dark, and it is a warm ink-brown mixed from --ink rather
           than a generic black scrim, so opening this does not feel like leaving
           the site. */
        .leaf-zoom {
          /* ⚠ NO display DECLARATION HERE — see the note beside the markup. The
             UA rule "dialog:not([open]) { display: none }" is all that keeps
             this overlay shut, and any author display declaration outranks it. */
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          /* The UA stylesheet letterboxes dialogs: max-width/max-height of
             calc(100% - 6px - 2em) plus auto margins. All four are overridden
             because the whole point of this overlay is the largest reading area
             the device has. */
          max-width: 100%;
          max-height: 100%;
          margin: 0;
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--ink);
          overflow: hidden;
        }
        .leaf-zoom[open] { display: flex; flex-direction: column; }
        .leaf-zoom::backdrop { background: rgba(24,20,12,.88); }

        .leaf-zoom-bar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: .8rem;
          padding: .5rem .75rem;
          background: var(--paper);
          border-bottom: 1px solid rgba(196,160,73,.45);
          box-shadow: 0 4px 18px -10px rgba(28,26,21,.7);
        }
        /* min-width: 0 is what lets a long book title wrap instead of forcing
           the bar wider than the dialog. The dialog clips rather than scrolls,
           so a failure here would hide the controls, not reveal them. */
        .leaf-zoom-said { min-width: 0; }
        .leaf-zoom-title {
          font-family: var(--font-display), serif;
          font-size: .62rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--gold-dark);
          overflow-wrap: break-word;
        }
        .leaf-zoom-hint {
          margin-top: .18rem;
          font-family: var(--font-serif), Georgia, serif;
          font-size: .82rem;
          font-style: italic;
          color: var(--text-muted);
          overflow-wrap: break-word;
        }
        .leaf-zoom-acts { flex: 0 0 auto; display: flex; align-items: center; gap: .4rem; }

        /* The same pill as .leaf-btn, but born at the touch size instead of
           growing into it in the media query: this control set only ever exists
           on top of a photograph the reader is trying to hold still, and a
           28px target there is a mis-tap that closes the page they opened. */
        .leaf-zoom-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          min-width: 44px;
          padding: .35rem .95rem;
          font-family: var(--font-display), serif;
          font-size: .66rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--gold-dark);
          background: transparent;
          border: 1px solid rgba(196,160,73,.42);
          border-radius: 9999px;
          cursor: pointer;
          white-space: nowrap;
          transition: background .3s ease, color .3s ease, border-color .3s ease;
        }
        .leaf-zoom-btn:hover { background: rgba(196,160,73,.1); border-color: var(--gold); }
        .leaf-zoom-btn[aria-pressed="true"] {
          background: rgba(196,160,73,.16);
          border-color: var(--gold);
          color: #6f5620;
        }
        .leaf-zoom-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; }
        .leaf-zoom-btn--close { border-color: rgba(196,160,73,.6); }

        /* ── The stage: the only scrolling box in the overlay ──
           The min-height of 0 is load-bearing. A flex item's default min-height is
           auto, i.e. "never smaller than my content" — the 2000px-tall image —
           so without it the stage grows past the dialog, the dialog clips it,
           and the bottom of the page becomes unreachable while the box that was
           supposed to scroll never does.

           touch-action names pinch-zoom explicitly. The app sets no
           user-scalable=no (the viewport export in [lang]/layout.tsx carries
           only themeColor), so the browser's own two-finger zoom is available
           here and this simply declines to swallow it. */
        .leaf-zoom-stage {
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          overflow: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-x pan-y pinch-zoom;
          padding: .55rem;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(196,160,73,.1), transparent 70%),
            linear-gradient(180deg, #2a2418 0%, #1b1710 100%);
        }
        .leaf-zoom-stage:focus-visible { outline: 2px solid var(--gold); outline-offset: -4px; }

        /* The auto margin — NOT justify/align-content — is what centres the
           plate. Centring a flex item that overflows its container with
           justify-content makes the overflow unreachable on the leading side:
           the reader can scroll right to the edge of the page but never left to
           the margin, which on a scanned book page is where the folio and the
           binding are. Auto margins collapse to zero the moment the item stops
           fitting, so the same declaration centres a small plate and lets a
           large one scroll in both directions. */
        .leaf-zoom-img {
          margin: auto;
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          background: #fff;
          border: 1px solid rgba(196,160,73,.38);
          box-shadow: 0 18px 50px -26px rgba(0,0,0,.9);
        }
        /* Magnified: every constraint off, so the plate renders at the size it
           was photographed (about 1300px across — three and a half times what a
           360px phone was showing) and the stage scrolls to it. min-width keeps
           a wide desktop from leaving the plate stranded in the middle at less
           than the width already available. */
        .leaf-zoom-stage.is-big { padding: 0; }
        .leaf-zoom-stage.is-big .leaf-zoom-img {
          max-width: none;
          max-height: none;
          min-width: 100%;
          border: 0;
          box-shadow: none;
        }

        @media (max-width: 640px) {
          /* Justified text needs width to avoid rivers; a phone hasn't got it. */
          .leaf-body { text-align: left; hyphens: manual; }
          .leaf-folio { bottom: .8rem; font-size: .74rem; }

          /* ── The printer's marks ──
             Running head, folio, imprint, and the three section labels: every
             one of them was set between 0.56rem and 0.64rem, i.e. 9.0px to
             10.2px, and every one of them keeps its width here because the
             tracking comes off by roughly as much as the size goes on. The
             running head in particular is the only thing on the sheet that
             says WHICH BOOK you are looking at. */
          .leaf-head-title { font-size: .7rem; letter-spacing: .16em; }
          .leaf-head-folio { font-size: .7rem; letter-spacing: .1em; }
          .leaf-gloss-label { font-size: .66rem; letter-spacing: .16em; }
          .leaf-trans-label { font-size: .66rem; letter-spacing: .16em; }
          .leaf-cite-imprint { font-size: .72rem; letter-spacing: .08em; }

          /* Serif secondary prose, brought onto the site's mobile serif step.
             Cormorant's small x-height is why these sit above where the sans
             equivalents would — see the note in Patroness. */
          .leaf-onward { font-size: 1.02rem; }
          .leaf-partial { font-size: .95rem; }
          .leaf-rights { font-size: .98rem; }

          /* ── THE TWO CONTROLS THAT ARE THE POINT OF THE COMPONENT ──
             "Read the whole page" and "See the actual page" are not chrome:
             the first is the escape hatch out of the dimmed context (and the
             accessibility escape hatch out of blurred low-contrast text), the
             second is the facsimile. They were 9.6px caps in a pill about 31px
             tall — two thirds of a legible size and two thirds of a usable
             target. 44px minimum, and the padding becomes horizontal only so
             the height comes from the box rather than from guesswork.
             A max-width of 100% so a long label wraps inside the pill instead
             of widening it past the sheet. */
          .leaf-btn {
            display: inline-flex;
            align-items: center;
            min-height: 44px;
            max-width: 100%;
            font-size: .72rem;
            letter-spacing: .12em;
            padding: .35rem 1.05rem;
          }

          /* ── THE PAGER, WHICH IS WHERE THIS PAGE COULD SCROLL SIDEWAYS ──
             Two nowrap buttons and a centred caption in one space-between row.
             At the desktop sizes that row measures about 250px and just fits a
             360px phone; enlarge the buttons to a legible size and it does not,
             and because neither the pager nor .ref-inner clips, the overflow
             would have gone to the DOCUMENT — the whole page scrolling
             sideways, which is the worst defect a phone layout has.

             Three things stop it, and all three are needed:
               · the caption is given order 3 and a 100% basis, so it drops onto
                 its own line and the two buttons share the first;
               · white-space returns to normal, so a long label wraps inside its
                 own button rather than pushing the row wider;
               · max-width 48% is the hard guarantee — two buttons plus a gap
                 can never exceed the container whatever the label says or
                 whatever font actually loads. */
          .leaf-pager { flex-wrap: wrap; gap: .1rem .6rem; }
          .leaf-pager-at {
            order: 3;
            flex: 1 0 100%;
            font-size: .66rem;
            letter-spacing: .1em;
          }
          .leaf-page-btn {
            display: inline-flex;
            align-items: center;
            min-height: 44px;
            max-width: 48%;
            white-space: normal;
            font-size: .68rem;
            letter-spacing: .08em;
            padding: .4rem .1rem;
          }

          /* ── The way into the enlarged facsimile, and the room itself ──
             Same rule as everything else on this sheet: size up, tracking down,
             so nothing gets wider than what it replaces. The cue was 9.3px caps
             sitting on a photograph — the least legible place on the page to put
             the smallest type on it. */
          .leaf-scan-cue {
            font-size: .7rem;
            letter-spacing: .12em;
            padding: .46rem .8rem .4rem;
          }
          .leaf-zoom-title { font-size: .7rem; letter-spacing: .1em; }
          .leaf-zoom-hint { display: none; }
          .leaf-zoom-bar { gap: .5rem; padding: .45rem .55rem; }
          .leaf-zoom-acts { gap: .35rem; }
          .leaf-zoom-btn {
            font-size: .72rem;
            letter-spacing: .09em;
            padding: .35rem .75rem;
          }
          .leaf-zoom-stage { padding: .35rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ctx, .leaf-btn, .leaf-scan-cue, .leaf-zoom-btn { transition: none; }
        }
      `}</style>
    </div>
  );
}
