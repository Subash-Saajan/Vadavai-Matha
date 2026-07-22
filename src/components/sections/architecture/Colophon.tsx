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

        <dl className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 text-left">
          {a.builders.map((b, i) => (
            <div
              key={i}
              className="reveal-item pt-5 border-t border-white/12"
            >
              <dt className="font-display text-[0.6rem] uppercase tracking-[0.26em] text-gold/80">
                {b.role}
              </dt>
              <dd className="mt-2 font-serif text-lg md:text-xl text-white/90 leading-snug">
                {b.name}
              </dd>
            </div>
          ))}
        </dl>

        <p className="reveal-item mt-16 max-w-3xl mx-auto text-sm text-white/50 leading-relaxed">
          {a.sourcesNote}
        </p>

        <div className="reveal-item mt-10">
          <Link
            href="/sources"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-navy font-display text-xs uppercase tracking-[0.22em] hover:bg-white transition-all duration-500 group"
          >
            {a.sourcesCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
