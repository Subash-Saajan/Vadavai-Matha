"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";
import { useReveal } from "./useReveal";

/**
 * III — what you'd hear approaching the church: the twin bells the towers
 * were raised to carry.
 *
 * The 1861 French bells, their long carriage by sea, and the older bell of the
 * 1752 chapel that was rung at the 1803 apparition. The photograph is primary
 * evidence: the bell's crown is cast "Vve Grégoire de Valence (Drôme) —
 * Donateur Casimir Grégoire", which corrects the single-web-source "Burdin of
 * Lyon" account (KB file 04, open question 16 — inscriptions never inspected
 * until this photo). That correction now lives inline in the "Cast in France"
 * beat, stated plainly once — do not drop it, and do not reintroduce Lyon as
 * fact.
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
        III
      </span>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="reveal-item kicker text-gold! mb-6">{a.bellsLabel}</p>
            <h2 className="reveal-item font-display uppercase tracking-[0.03em] text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {a.bellsTitle}
            </h2>
            <p className="reveal-item text-white/70 text-lg leading-relaxed mt-7">
              {a.bellsBody}
            </p>
          </div>

          {/* The bell itself, photographed looking up its tower shaft */}
          <figure className="lg:col-span-5 reveal-item">
            <div className="relative w-full aspect-3/4 max-w-sm mx-auto">
              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25">
                <Image
                  src="/images/architecture/bell.jpg"
                  alt={a.bellsCaption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 35vw"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
                <PhotoOrnaments />
              </div>
            </div>
            <figcaption className="mt-4 text-center font-display text-[0.62rem] uppercase tracking-[0.24em] text-white/45">
              {a.bellsCaption}
            </figcaption>
          </figure>
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
      </div>
    </section>
  );
}
