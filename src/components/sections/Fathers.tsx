"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { ALL_PRIESTS, TERM_COUNT, tenureLabel } from "@/lib/priests";

/**
 * IV · The Fathers of Vadavai — the home page's door into /priests.
 *
 * BEFORE THIS SECTION EXISTED, /priests WAS REACHABLE FROM NOWHERE. Not the
 * navbar, not the footer, not one link on one page: sixty-nine named men and
 * eleven surviving photographs, live on the site and orphaned from it. (It is
 * in the footer now too.)
 *
 * THE HOOK IS THE ASYMMETRY, NOT THE NUMBER. "Sixty-nine priests" is a
 * statistic and statistics slide off. "Eleven faces survive; fifty-four of them
 * are a name and a span of years" is a shape, and it is the true one — it is
 * what the register page is built around and what makes it worth opening. Do
 * not replace that sentence with something rounder.
 *
 * NO INVENTED FACES, here as on /priests. The row shows exactly the eleven
 * likenesses the parish actually holds, read from the data rather than typed in,
 * so a portrait found tomorrow appears here the day it is added and nothing goes
 * out of step. The fifty-four without one are represented by the counted rule
 * beneath the row, never by a placeholder head.
 */

// Read from the register itself — never hand-listed. `n` is the parish's own
// numbering, so the row runs in the order the succession does.
const FACES = ALL_PRIESTS.filter((p) => p.portrait).sort((a, b) => a.n - b.n);
const NAMELESS = TERM_COUNT - FACES.length;

export function Fathers() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRef.current?.querySelectorAll(".reveal-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          },
        );
      });

      // The faces arrive one after another, left to right — the succession
      // itself, drawn. Fast enough not to be a performance.
      const faces = rowRef.current?.querySelectorAll(".father-face");
      if (faces?.length) {
        gsap.fromTo(
          faces,
          { y: 26, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="parchment-sheen relative overflow-hidden bg-cream-dark section-padding" ref={sectionRef}>
      <div className="light-shaft absolute -top-16 right-[4%] h-[120%] w-[42%] -rotate-6" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 select-none text-[7rem] opacity-[0.06] md:left-12 md:text-[12rem]">
        IV
      </span>

      <div className="relative mx-auto max-w-5xl">
        <div ref={textRef} className="max-w-3xl">
          <p className="reveal-item kicker mb-5">{t.home.fathersLabel}</p>
          <h2 className="reveal-item font-serif text-4xl leading-[1.07] text-navy md:text-5xl">
            {t.home.fathersTitle}
          </h2>
          <p className="reveal-item mt-7 text-lg leading-relaxed text-text-muted">
            {t.home.fathersBody}
          </p>
          <p className="reveal-item mt-5 font-serif text-lg leading-relaxed text-navy/80">
            {t.home.fathersBody2}
          </p>
        </div>

        {/* ── The eleven faces ──────────────────────────────────────────────
            Faces hold attention like nothing else on this page, and these are
            the only real ones the site has. Slightly desaturated, as on the
            register, so a 19th-century plate and a modern photograph sit in one
            row without the modern one shouting. */}
        <div ref={rowRef} className="mt-14 flex flex-wrap items-end gap-x-3 gap-y-5 sm:gap-x-4">
          {FACES.map((p) => (
            <figure key={`${p.n}-${p.portrait}`} className="father-face group relative">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-gold/45 transition-all duration-500 group-hover:ring-gold sm:h-20 sm:w-20">
                <Image
                  src={`/images/priests/${p.portrait}.jpg`}
                  alt={p.name}
                  fill
                  sizes="80px"
                  className="object-cover saturate-[0.88] transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Name and years on hover only — eleven captions at rest would
                  turn a row of faces into a table. */}
              <figcaption className="pointer-events-none absolute -bottom-1 left-1/2 z-10 w-40 -translate-x-1/2 translate-y-full rounded-lg bg-navy px-3 py-2 text-center opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                <span className="block font-serif text-[0.78rem] leading-tight text-white">
                  {p.name}
                </span>
                <span className="mt-0.5 block font-display text-[0.6rem] tabular-nums text-gold/80">
                  {tenureLabel(p)}
                </span>
              </figcaption>
            </figure>
          ))}

          {/* The fifty-four who left no likeness, drawn as the register draws
              them: a rule, not a face. */}
          <div className="ml-1 flex min-w-[10rem] flex-1 flex-col justify-end pb-1.5">
            <span className="block h-px w-full bg-gold-dark/30" />
            <span className="mt-2 font-display text-[0.6rem] uppercase tracking-[0.22em] text-text-muted">
              + {NAMELESS} {t.home.fathersStat1}
            </span>
          </div>
        </div>

        {/* ── The three numbers ─────────────────────────────────────────────
            Concrete and checkable. TERM_COUNT is derived from the register, so
            the headline number on the home page can never drift from the page
            it is advertising. */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-y border-gold/25 py-8">
          {[
            { v: String(TERM_COUNT), k: t.home.fathersStat1 },
            { v: "1697", k: t.home.fathersStat2 },
            { v: String(FACES.length), k: t.home.fathersStat3 },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-3xl leading-none text-navy tabular-nums md:text-4xl">
                {s.v}
              </p>
              <p className="mt-2.5 font-display text-[0.58rem] uppercase leading-snug tracking-[0.2em] text-text-muted">
                {s.k}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/priests"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 font-display text-[0.7rem] uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-gold hover:text-navy"
          >
            {t.home.fathersCta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
