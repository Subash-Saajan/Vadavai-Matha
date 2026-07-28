"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { CHRONICLE_FRAMES } from "@/lib/chronicle";
import { ChronicleHeader } from "./ChronicleHeader";

/**
 * VARIANT C — the open book.
 *
 * One spread at a time: the painting on the left leaf, the moment set as prose
 * on the right, and a page turned to reach the next year.
 *
 * WHY THIS ONE IS ARGUABLE. /history is already built as a book — narrative
 * prose above the line, footnotes and citation chips below it — and this is the
 * only one of the three variants whose FORM says so before a word is read. A
 * reader who turns two pages here knows exactly what kind of page the link
 * leads to. That is the case for it.
 *
 * AND WHY IT MIGHT NOT BE. It shows ONE moment at rest where the strip shows
 * three and the hairline shows seven, so a reader who scrolls past without
 * touching anything takes away 1680 and nothing else. Everything this variant
 * has to say is behind an interaction. Weigh that against the atmosphere before
 * choosing it.
 *
 * THE LAST PAGE IS THE DOOR, and it is a real page in the count (`p. 8 of 8`)
 * rather than a button bolted under the book — a reader who turns to the end of
 * a book expects to find the end of the book there.
 *
 * THE TURN IS NOT A SIMULATION. There is no two-phase fold with a mirrored
 * backface: the leaf swings in from the edge it was turned from, and the
 * content is already React-swapped when it does. A half-rendered stale page
 * during a fold is far more noticeable than an honest swing.
 */
export function ChronicleBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  // Which way the last turn went, so the leaf swings in from the correct edge.
  const dirRef = useRef(1);
  const { t, lang } = useLang();

  const frames = t.home.chronicleFrames;
  // Frames plus the closing page.
  const pageCount = frames.length + 1;
  const isDoor = page === frames.length;

  const turn = useCallback(
    (delta: number) => {
      setPage((p) => {
        const next = Math.min(pageCount - 1, Math.max(0, p + delta));
        if (next !== p) dirRef.current = delta;
        return next;
      });
    },
    [pageCount],
  );

  // The book itself arrives once, on scroll.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bookRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bookRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  // The turn. Keyed on `page`, so it also runs for a jump from the year tabs.
  useEffect(() => {
    const leaf = leafRef.current;
    if (!leaf) return;
    const forward = dirRef.current >= 0;
    const tween = gsap.fromTo(
      leaf,
      {
        rotateY: forward ? 22 : -22,
        opacity: 0,
        transformOrigin: forward ? "left center" : "right center",
      },
      { rotateY: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, [page]);

  const frame = isDoor ? null : frames[page];
  const meta = isDoor ? null : CHRONICLE_FRAMES[page];

  return (
    <section
      ref={sectionRef}
      className="parchment-sheen section-padding relative overflow-hidden bg-cream"
    >
      <div className="light-shaft absolute -top-16 right-[6%] h-[120%] w-[40%] -rotate-6" />

      {/* Trailing `!`, not leading — this is Tailwind v4, where the important
          modifier goes at the end. `!max-w-5xl` silently does nothing. */}
      <ChronicleHeader className="max-w-5xl!" />

      <div className="mx-auto mt-14 max-w-5xl px-6">
        <div ref={bookRef} className="perspective-container">
          {/* ── The book block ───────────────────────────────────────────────
              A single sheet of cream over a navy shadow, with the gutter drawn
              down the middle on desktop. On a phone there is no spread — a
              phone has one page — so the leaves stack and the gutter is hidden. */}
          <div className="relative overflow-hidden rounded-2xl bg-cream-dark shadow-2xl ring-1 ring-gold/25">
            <div
              ref={leafRef}
              className="grid grid-cols-1 will-change-transform md:grid-cols-2"
            >
              {/* ── Left leaf: the painting ─────────────────────────────── */}
              <div className="relative border-b border-gold/20 bg-navy md:border-b-0 md:border-r">
                {isDoor ? (
                  <div className="relative flex aspect-[4/3] items-center justify-center md:aspect-auto md:h-full md:min-h-[26rem]">
                    <Image
                      src="/images/history/great-two-nave-church-5.jpg"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 32rem"
                      className="object-cover opacity-35"
                    />
                    <div className="absolute inset-0 bg-navy/45" />
                    <svg
                      viewBox="0 0 100 140"
                      fill="none"
                      aria-hidden="true"
                      className="relative h-28 w-20 text-gold/50"
                    >
                      <path
                        d="M50 4v132M14 40h72"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[26rem]">
                    <Image
                      src={`/images/history/${meta!.photo}`}
                      alt={frame!.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 32rem"
                      className="object-cover"
                      priority={page === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy/55 to-transparent" />
                    {/* The year, struck into the plate. */}
                    <p className="absolute bottom-6 left-7 font-display text-3xl tracking-[0.1em] text-gold tabular-nums drop-shadow-lg md:text-4xl">
                      {frame!.year}
                    </p>
                  </div>
                )}
              </div>

              {/* ── Right leaf: the prose ───────────────────────────────── */}
              <div className="relative flex flex-col justify-between bg-cream px-8 py-10 md:min-h-[26rem] md:px-12 md:py-12">
                {/* The gutter shadow, drawn on the inner edge of the text leaf
                    so the two pages read as one sheet folded, not two cards. */}
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-linear-to-r from-navy/12 to-transparent md:block" />

                <div className="relative">
                  {/* Running head, as a book has. */}
                  <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-gold/25 pb-3">
                    <p className="font-display text-[0.55rem] uppercase tracking-[0.28em] text-gold-dark">
                      {isDoor ? t.nav.history : frame!.chapter}
                    </p>
                    <p className="font-display text-[0.55rem] uppercase tracking-[0.2em] text-text-muted tabular-nums">
                      {page + 1} / {pageCount}
                    </p>
                  </div>

                  {isDoor ? (
                    <>
                      <h3 className="font-serif text-3xl leading-tight text-navy md:text-4xl">
                        {t.home.chronicleDoorTitle}
                      </h3>
                      <p className="mt-5 font-serif text-lg leading-relaxed text-text-muted">
                        {t.home.chronicleDoorBody}
                      </p>
                      <Link
                        href="/history"
                        className="group mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-display text-[0.7rem] uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-gold hover:text-navy"
                      >
                        {t.home.chronicleCta}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="mb-3 font-display text-lg text-gold-dark tabular-nums md:hidden">
                        {frame!.year}
                      </p>
                      <h3 className="font-serif text-3xl leading-tight text-navy md:text-[2.1rem]">
                        {frame!.title}
                      </h3>
                      {/* A drop-cap opening, because this leaf is set as a book
                          page and a book page opens like one. */}
                      <p className="mt-5 font-serif text-lg leading-relaxed text-text-muted [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:font-display [&::first-letter]:text-5xl [&::first-letter]:leading-[0.85] [&::first-letter]:text-gold-dark">
                        {frame!.line}
                      </p>
                      <Link
                        href={meta!.href}
                        className="group mt-7 inline-flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:text-gold-dark"
                      >
                        {t.home.chronicleCta}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ── The corner ───────────────────────────────────────────────
                A lifted page corner over the foot of the right leaf. It is the
                affordance that says "this turns" without a line of copy, and it
                is the same action as the › button — so it is decorative to
                assistive tech, which gets the labelled buttons below instead. */}
            {page < pageCount - 1 && (
              <button
                type="button"
                onClick={() => turn(1)}
                tabIndex={-1}
                aria-hidden="true"
                className="group absolute bottom-0 right-0 hidden h-16 w-16 md:block"
              >
                <span className="absolute bottom-0 right-0 h-0 w-0 border-b-[3.5rem] border-l-[3.5rem] border-b-cream-dark border-l-transparent transition-all duration-500 group-hover:border-b-[4.5rem] group-hover:border-l-[4.5rem]" />
                <span className="absolute bottom-1.5 right-1.5 h-3 w-3 rotate-45 border-b border-r border-gold/50 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              </button>
            )}
          </div>

          {/* ── The controls ───────────────────────────────────────────────
              Under the book, not on it: a year you can jump to is worth more
              than a page you must reach in order, and the years are the whole
              argument of this section. */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => turn(-1)}
                disabled={page === 0}
                aria-label={t.history.navPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-navy transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => turn(1)}
                disabled={page === pageCount - 1}
                aria-label={t.history.navNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 text-navy transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-navy disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {frames.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    dirRef.current = i >= page ? 1 : -1;
                    setPage(i);
                  }}
                  aria-current={i === page ? "true" : undefined}
                  className={`font-display text-[0.8rem] tabular-nums transition-colors duration-300 ${
                    i === page
                      ? "text-gold-dark underline decoration-gold decoration-2 underline-offset-[6px]"
                      : "text-navy/45 hover:text-navy"
                  }`}
                >
                  {f.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
