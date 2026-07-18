"use client";

import { useRef } from "react";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";

/**
 * V — the twin bells the towers were raised to carry.
 *
 * The 1861 Lyon/Burdin bells, their long carriage by sea, and the older bell of
 * the 1752 chapel that was rung at the 1803 apparition. The footnote keeps the
 * page honest: the account is the parish's own record; the Burdin foundry itself
 * is independently documented in the Lyon archives. Do not drop that caveat.
 */
export function Bells() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      className="relative section-padding cathedral-depth overflow-hidden"
    >
      <div className="light-shaft absolute -top-10 right-[8%] w-[40%] h-[120%] rotate-12" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.07] select-none">
        V
      </span>

      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="reveal-item kicker text-gold! mb-6">{a.bellsLabel}</p>
          <h2 className="reveal-item font-display uppercase tracking-[0.03em] text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            {a.bellsTitle}
          </h2>
          <p className="reveal-item text-white/70 text-lg leading-relaxed mt-7">
            {a.bellsBody}
          </p>
        </div>

        {/* The three beats of the bells' journey, along one gold hairline */}
        <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 md:border-t border-gold/25">
          {a.bellsBeats.map((b, i) => (
            <li key={i} className="reveal-item relative md:pt-10 md:pr-6">
              <span className="hidden md:block absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-gold" />
              <p className="font-display text-3xl md:text-4xl tabular-nums text-gradient-gold leading-none">
                {b.year}
              </p>
              <h3 className="mt-4 font-serif text-2xl text-white">{b.title}</h3>
              <p className="mt-2 text-white/60 leading-relaxed">{b.body}</p>
            </li>
          ))}
        </ol>

        {/* The older bell — the one that rang the 1803 miracle */}
        <div className="reveal-item mt-20 max-w-3xl mx-auto text-center">
          <div className="cross-rule max-w-xs mx-auto mb-9">
            <span className="text-gold text-lg">✦</span>
          </div>
          <p className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-gold/70">
            {a.bellsOlderLead}
          </p>
          <p className="mt-5 font-serif italic text-white/85 text-xl md:text-2xl leading-relaxed">
            {a.bellsOlder}
          </p>
        </div>

        <p className="reveal-item mt-16 pt-6 border-t border-white/10 max-w-3xl mx-auto text-center text-xs text-white/40 leading-relaxed">
          {a.bellsFootnote}
        </p>
      </div>
    </section>
  );
}
