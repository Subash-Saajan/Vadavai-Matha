"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "@/hooks/useReveal";

/**
 * III — THE MONTHLY REGISTER.
 *
 * The same seven entries the old page showed, and nothing has been added to
 * them: an English Mass, a Malayalam Mass, a Tamil Mass, Divine Mercy, two
 * processions and the Sahaya Matha church. What changed is that they were a
 * plain white three-column table — the visual weight of a spreadsheet, on a
 * page about a shrine — and they are now read as what they actually are: a
 * ruled register, entries in the order the month brings them.
 *
 * THE CANDLELIGHT PRIMITIVES ARE REUSED, NOT REBUILT. `.leaf-rule` and
 * `.entry-glow` were written in globals.css for /contact's directory, which is
 * the same object — a list of rows where one lights as you touch it. A second
 * copy of those gradients would be a second thing to keep in step.
 *
 * The section is dark because the page needed a dark band here: the day and the
 * week are both cream, and the annual feast that follows puts a navy plate on
 * cream. Without this the whole page is one tone until the very end.
 */
export function TheRegister() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const r = t.mass.register;
  const [lit, setLit] = useState<number | null>(null);

  useReveal(ref, lang);

  return (
    <section
      ref={ref}
      id="devotions"
      className="cathedral-depth section-padding relative scroll-mt-24 overflow-hidden"
    >
      {/* The vault, far down and almost out — this is a ground, not a picture.
          `unoptimized` is not used: it is a plain decorative still and wants
          the same treatment as every other photograph on the site. */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]" aria-hidden="true">
        <Image
          src="/images/vault-chandelier.jpg"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/70 via-night-deep/85 to-night-deep" />
      </div>
      <div className="light-shaft absolute -top-10 right-[6%] h-[120%] w-[42%] rotate-12" />

      <span
        className="section-numeral pointer-events-none absolute -top-6 left-4 select-none text-[7rem] opacity-[0.08] md:left-12 md:text-[12rem]"
        aria-hidden="true"
      >
        III
      </span>

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-9 max-w-2xl md:mb-14">
          <p className="reveal-item kicker text-gold! mb-5">{r.label}</p>
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-tight text-white md:text-5xl lg:text-6xl">
            {r.title}
          </h2>
          <p className="reveal-item mt-5 text-[0.98rem] leading-relaxed text-white/65 md:mt-6 md:text-lg">
            {r.body}
          </p>
        </header>

        {/* The register itself. Rows carry their own numeral, as a ledger
            does — it is what makes seven near-identical lines countable.

            The opening rule sits OUTSIDE the <ol>: a list may only contain
            <li> children, and a stray <span> in there is invalid markup that
            assistive tech reads as an orphan. Every other rule is the one
            closing its own entry. */}
        <div className="reveal-item relative">
          <span className="leaf-rule block" aria-hidden="true" />
          <ol>
            {t.mass.devotions.map((d, i) => (
            <li
              key={`${d.when}-${d.service}-${i}`}
              className="relative"
              onMouseEnter={() => setLit(i)}
              onMouseLeave={() => setLit((cur) => (cur === i ? null : cur))}
              onFocus={() => setLit(i)}
              onBlur={() => setLit((cur) => (cur === i ? null : cur))}
            >
              <span
                className={`entry-glow transition-opacity duration-700 ${
                  lit === i ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-12 items-baseline gap-x-4 gap-y-1 px-1 py-5 md:gap-x-6 md:py-6">
                {/* The ledger numeral was 0.62rem at 0.2em — 9.9px of Cinzel
                    caps, under the ~11px floor where small display type stops
                    being read and starts being guessed at. Up, and the tracking
                    comes in to pay for the width, which is the same trade the
                    `.kicker` and `.ui-label` mobile blocks in globals.css make.
                    It is aria-hidden decoration, but it is also the only thing
                    that makes seven near-identical rows countable. */}
                <span
                  className="col-span-12 font-display text-[0.7rem] tabular-nums tracking-[0.12em] text-gold/45 md:col-span-1 md:text-[0.62rem] md:tracking-[0.2em]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="col-span-7 ui-label leading-relaxed text-white md:col-span-4">
                  {d.when}
                </span>

                {/* The hour holds its size on a phone while the prose around
                    it comes down — 18.4px of Cormorant, which with that face's
                    small x-height reads about like 16px of the sans. It shares
                    a line with the day, and it is the half of the row somebody
                    is actually looking for. */}
                <span className="col-span-5 whitespace-nowrap text-right font-serif text-[1.15rem] tabular-nums text-gold-light md:col-span-2 md:text-left md:text-xl">
                  {d.time}
                </span>

                <span className="col-span-12 font-serif text-[1.05rem] leading-snug text-white/75 md:col-span-5 md:text-lg">
                  {d.service}
                </span>
              </div>

              <span className="leaf-rule block" aria-hidden="true" />
            </li>
            ))}
          </ol>
        </div>

        <p className="reveal-item mt-8 max-w-2xl text-sm italic leading-relaxed text-white/45">
          {t.mass.devotionsNote}
        </p>
      </div>
    </section>
  );
}
