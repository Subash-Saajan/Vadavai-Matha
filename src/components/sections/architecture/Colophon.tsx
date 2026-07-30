"use client";

import { useRef } from "react";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";

/**
 * The closing band: who built it, and how we know any of this.
 *
 * Br Joseph Bergenthal is named here and in the page's JSON-LD. He is the one
 * fact this page has that the rest of the web does not — keep him.
 */
export function Colophon() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding cathedral-depth overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto text-center">
        <p className="reveal-item kicker justify-center text-gold! mb-6">
          {a.colophonLabel}
        </p>
        <h2 className="reveal-item font-display uppercase tracking-[0.03em] text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          {a.colophonTitle}
        </h2>

        <dl className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 text-left">
          {a.builders.map((b, i) => (
            <div
              key={i}
              className="reveal-item pt-5 border-t border-white/12"
            >
              {/* 0.6rem is 9.6px, and this is the label that says WHAT each
                  name did — without it the column is five names and no roles.
                  Up to 11.2px with the tracking cut to keep "Architect &
                  engineer" on one line; the drawn values at `md`. */}
              <dt className="font-display text-[0.7rem] tracking-[0.14em] md:text-[0.6rem] md:tracking-[0.26em] uppercase text-gold/80">
                {b.role}
              </dt>
              <dd className="mt-2 font-serif text-lg md:text-xl text-white/90 leading-snug">
                {b.name}
              </dd>
            </div>
          ))}
        </dl>

        {/* The bibliography line. 14px at 50% white on cathedral-dark is under
            3:1 — and this is the sentence that says where every claim on the
            page came from, so it has to survive being read outdoors on a
            phone. Same correction the home page makes to its honest note in
            Weeping.tsx: a touch larger and a touch brighter below `md`, still
            plainly quieter than everything above it. */}
        <p className="reveal-item mt-12 md:mt-16 max-w-3xl mx-auto text-[0.88rem] md:text-sm text-white/60 md:text-white/50 leading-relaxed">
          {a.sourcesNote}
        </p>

        <div className="reveal-item mt-10">
          {/* The page's one button, and it was 12px of Cinzel caps flung
              0.22em apart — at which width the label ("The sources behind this
              page") needed about 336px of the 342 a 390px phone has, and none
              of the 312 a 360px one has, so on a narrow Android it wrapped
              inside a pill drawn for one line. Bigger type, less tracking and a
              smaller gutter set it in roughly 300px. This mirrors what
              globals.css already does to every `.ui-label` on a phone; it is
              spelled out here because this element carries raw utilities rather
              than that class. The 56px height was already a good tap target. */}
          <Link
            href="/sources"
            className="inline-flex items-center gap-2 px-6 py-4 md:px-8 rounded-full bg-gold text-navy font-display text-[0.78rem] tracking-[0.12em] md:text-xs md:tracking-[0.22em] uppercase hover:bg-white transition-all duration-500 group"
          >
            {a.sourcesCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
