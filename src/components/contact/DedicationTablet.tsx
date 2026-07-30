"use client";

import { useLang } from "@/components/layout/LanguageProvider";
import { OrnamentFrame } from "@/components/ornaments/CornerOrnament";
import { ADDRESS, PHONE } from "@/lib/contact";

/**
 * A lapidary dedication tablet, set on a white plaque like a foundation stone.
 *
 * The village has been called Little Rome since 1926, and Cinzel — the site's
 * display face — is a Roman inscriptional letter, so the shrine's identity is
 * set here the way it would be cut into the lintel: readable normal spelling
 * and plain years, in inscriptional capitals.
 *
 * The visible line stays `aria-hidden` with a fuller `sr-only` reading beside
 * it (a screen reader hears "Founded 1685 by St John de Britto", not the short
 * "FOUNDED · 1685"), and every searchable fact — name, address, telephone —
 * also appears below in ordinary text that Google and ChatGPT can read.
 */

/** Renders an inscription line with a fuller reading for assistive tech. */
function Epigraph({ carved, plain }: { carved: string; plain: string }) {
  return (
    <span className="block">
      <span aria-hidden="true">{carved}</span>
      <span className="sr-only">{plain}</span>
    </span>
  );
}

export function DedicationTablet() {
  const { t, lang } = useLang();

  return (
    <section className="section-padding relative overflow-hidden bg-cream parchment-sheen">
      <div className="light-shaft absolute -top-16 right-0 w-[46%] h-[120%] -rotate-6" aria-hidden="true" />
      <span className="section-numeral pointer-events-none absolute -top-4 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        I
      </span>

      <div className="relative max-w-6xl mx-auto">
        {/* The cartouche: a white plaque with a double gold rule, lifted off
            the section so it reads as a tablet rather than blending in.

            The plaque spans the page's one column width, like every other
            section; the inscription itself is held to a lapidary measure in
            the middle of it, the way a carved stone is cut. */}
        <div className="reveal relative bg-white/85 backdrop-blur-sm rounded-2xl shadow-xl px-5 py-10 md:px-16 md:py-20 text-center">
          <div className="absolute inset-0 border border-gold/30 rounded-2xl" aria-hidden="true" />
          <OrnamentFrame variant={2} className="text-gold-dark/75" />

          <div className="relative mx-auto max-w-2xl">
            <p className="kicker justify-center mb-7 md:mb-8">{t.contact.tablet.dedication}</p>

            {/* A cut inscription, so the tracking is the point — but tracking
                is also what makes a line too wide to fit. On a 300px measure
                "HOLY · FAMILY · SHRINE" at 0.14em and the postcode line at
                0.2em both broke in the wrong places (a village name split
                across two lines does not read as lapidary, it reads as a bug).
                The letterspacing eases on mobile only; every size is
                untouched, and `md` is the stone as drawn. */}
            <h2 className="font-display text-navy leading-[1.35] text-[1.35rem] md:text-[1.9rem] tracking-[0.08em] md:tracking-[0.14em]">
              <Epigraph carved="HOLY · FAMILY · SHRINE" plain="Holy Family Shrine" />
              <span className="block mt-3.5 font-serif text-gradient-gold-deep text-2xl md:text-[2.05rem] leading-tight tracking-normal italic">
                {t.contact.tablet.patroness}
              </span>
              <span className="block mt-5 md:mt-6 text-[0.95rem] md:text-[1.15rem] tracking-[0.12em] md:tracking-[0.2em] text-navy/70">
                <Epigraph carved="VADAKKANKULAM · 627116" plain="Vadakkankulam 627116" />
              </span>
            </h2>

            <div className="cross-rule my-8 md:my-9" aria-hidden="true">
              <svg width="11" height="17" viewBox="0 0 13 20" fill="none" className="shrink-0">
                <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>

            {/* The three dates that make this church what it is. 0.62rem at
                0.3em is 9.9px carrying a third of its width in air, and
                "A · SHRINE · SINCE · 1993" is 25 characters: on a phone it did
                not fit the plaque and wrapped onto a second line, breaking the
                three-line rhythm the whole tablet is built on. Size up,
                tracking down — it fits again AND it can be read. */}
            <div className="font-display text-[0.68rem] tracking-[0.16em] md:text-[0.7rem] md:tracking-[0.3em] text-gold-dark/85 space-y-3">
              <Epigraph carved="FOUNDED · 1685" plain={t.contact.tablet.founded} />
              <Epigraph carved="CHINNA · ROMAPURI · 1926" plain={t.contact.tablet.littleRome} />
              <Epigraph carved="A · SHRINE · SINCE · 1993" plain={t.contact.tablet.shrineSince} />
            </div>

            {/* Cormorant italic. It sits ABOVE the sans on a phone, not level
                with it — the face's x-height is small enough that matching the
                numbers makes the serif the hardest thing on the page to read.
                The Tamil branch is left exactly as it was. */}
            <p
              className={`mt-9 md:mt-10 font-serif italic text-navy/60 ${lang === "ta" ? "text-lg" : "text-[1.08rem] md:text-xl"}`}
            >
              {t.contact.tablet.prayerLine}
            </p>
          </div>
        </div>

        {/* The plain reading. This is what search engines and AI assistants
            actually index, and what a visitor copies into their phone. */}
        <address className="reveal not-italic mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-7 md:gap-8 text-center sm:text-left">
          {/* The postal address stays at the sans default. It is one of the two
              things on this page a visitor copies by hand, so it does not take
              the phone build's step down with the rest of the body copy. */}
          <p className="text-text-muted leading-relaxed max-w-sm mx-auto sm:mx-0">
            {t.contact.address}
          </p>
          <a
            href={`tel:${PHONE.e164}`}
            className="group shrink-0 mx-auto sm:mx-0"
            aria-label={`${t.contact.actions.call}: ${PHONE.international}`}
          >
            <span className="block font-display text-[0.66rem] tracking-[0.18em] md:text-[0.6rem] md:tracking-[0.32em] uppercase text-gold-dark mb-2">
              {ADDRESS.name}
            </span>
            <span className="block font-serif text-2xl md:text-3xl text-navy group-hover:text-gold-dark transition-colors tabular-nums">
              {PHONE.display}
            </span>
          </a>
        </address>
      </div>
    </section>
  );
}
