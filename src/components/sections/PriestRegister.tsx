import Image from "next/image";

import {
  ALL_PRIESTS,
  ARCHIVE_ADDITIONS,
  BISHOPS,
  PERIODS,
  TOMBS,
  tenureLabel,
  tenureYears,
  type Priest,
} from "@/lib/priests";

/**
 * The succession of parish priests, as a register.
 *
 * A server component on purpose — no state, no scroll listener, no GSAP. The
 * one piece of wayfinding a page of sixty-nine rows needs is "which century am
 * I in", and `position: sticky` on each period's band header does that in CSS:
 * the band holds under the navbar while its own rows scroll past, then the next
 * band pushes it off. If sticky ever fails (Lenis, `overflow-x` on body), the
 * band degrades to a plain heading and nothing breaks.
 *
 * THE ONE RULE THIS FILE EXISTS TO KEEP: a row that cannot be opened must not
 * look like it can. Fifty-four of these men left nothing but a name and a span
 * of years, so most rows are not links, carry no hover state and no chevron.
 * The alternative — making every row look clickable and half of them lead
 * nowhere — is the specific way pages like this waste a reader's time.
 */

/** Fr Thomassini's 1751–1775. Derived, not typed in, so the scale cannot drift
 *  out of step with the data. */
const MAX_TENURE = Math.max(...ALL_PRIESTS.map(tenureYears));

/**
 * The length of a pastorate, drawn.
 *
 * The one field every single priest has is how long he stayed, so this is the
 * mark that gives the fifty-four men with no surviving story real presence on
 * the page — their row is never empty. All strokes are flush right under the
 * years they encode, so they share a baseline and can be read against each
 * other: a dash for a single year, the full width for twenty-four.
 *
 * Decorative in the accessibility sense — it restates the years printed
 * directly above it — so it is hidden from screen readers rather than
 * announced twice.
 */
function TenureStroke({ years }: { years: number }) {
  const pct = Math.max(7, Math.round((years / MAX_TENURE) * 100));
  return (
    <span className="mt-1.5 block" aria-hidden="true">
      <span
        className="ml-auto block h-[2px] bg-gold-dark/40"
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

/**
 * The plate: a face where one survives, otherwise the Tamil name.
 *
 * No generated portraits. Where the parish has no likeness, the plate carries
 * the honorific the village actually used — Paranchodinadhar, Madurendranadher,
 * Pakkianadher. It is the one thing about these men that the archives in Rome
 * do not have, and it is a truer likeness than an invented face would be.
 */
function Plate({ priest, size }: { priest: Priest; size: "sm" | "lg" }) {
  const px = size === "lg" ? 104 : 46;

  if (priest.portrait) {
    return (
      <figure className="shrink-0" style={{ width: px }}>
        <div
          className="relative overflow-hidden rounded-full ring-1 ring-gold/45"
          style={{ width: px, height: px }}
        >
          <Image
            src={`/images/priests/${priest.portrait}.jpg`}
            alt={`${priest.name}${priest.portraitFrom ? `, from ${priest.portraitFrom}` : ""}`}
            width={px * 2}
            height={px * 2}
            sizes={`${px}px`}
            className="h-full w-full object-cover saturate-[0.88]"
          />
        </div>
        {size === "lg" && priest.portraitFrom ? (
          <figcaption className="mt-2 text-[0.6rem] leading-snug tracking-wide text-text-muted">
            {priest.portraitFrom}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (priest.plate && size === "lg") {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full border border-gold/45"
        style={{ width: px, height: px }}
      >
        <span className="font-tamil px-2.5 text-center text-[0.66rem] leading-tight text-gold-dark">
          {priest.plate}
        </span>
      </div>
    );
  }

  return null;
}

function Row({ priest }: { priest: Priest }) {
  const life = priest.tier === "life";
  const plateSize = life ? "lg" : "sm";
  const hasPlate = Boolean(priest.portrait || (life && priest.plate));

  return (
    <li
      className={`grid grid-cols-[1.6rem_1fr_4.5rem] gap-x-3 border-t border-gold/15 sm:grid-cols-[2rem_1fr_6rem] sm:gap-x-6 ${
        life ? "py-7" : "py-4"
      }`}
    >
      <span className="pt-1 font-display text-[0.78rem] tabular-nums text-gold-dark/70">
        {priest.n}
      </span>

      <div className={hasPlate ? "flex gap-4 sm:gap-5" : undefined}>
        {hasPlate ? <Plate priest={priest} size={plateSize} /> : null}

        <div className="min-w-0">
          <h3
            className={`font-display leading-snug text-navy ${
              life ? "text-lg sm:text-2xl" : "text-[0.97rem] sm:text-lg"
            }`}
          >
            {priest.name}
          </h3>

          {priest.tamil ? (
            <p className="font-tamil mt-0.5 text-sm leading-snug text-navy/55">
              {priest.tamil}
            </p>
          ) : null}

          {priest.also ? (
            <p className="mt-1 text-[0.68rem] leading-snug tracking-wide text-text-muted">
              {priest.also}
            </p>
          ) : null}

          {(priest.life ?? priest.note) ? (
            <p
              className={`font-serif leading-relaxed text-navy/75 ${
                life ? "mt-3 text-lg sm:text-xl" : "mt-2 text-base sm:text-lg"
              }`}
            >
              {priest.life ?? priest.note}
            </p>
          ) : null}
        </div>
      </div>

      <div className="text-right">
        <p className="whitespace-nowrap font-display text-[0.68rem] tabular-nums tracking-wide text-navy/60 sm:text-[0.8rem]">
          {tenureLabel(priest)}
        </p>
        <TenureStroke years={tenureYears(priest)} />
      </div>
    </li>
  );
}

export function PriestRegister() {
  return (
    <>
      {PERIODS.map((period) => (
        <section key={period.numeral} id={`period-${period.numeral.toLowerCase()}`} className="scroll-mt-24">
          {/* Sticky band. -mx/px so the cream ground reaches the column edges
              and rows disappear under it cleanly rather than beside it. */}
          <div className="sticky top-16 z-30 -mx-6 border-b border-gold/25 bg-cream/95 px-6 py-3 backdrop-blur-sm md:top-20">
            <p className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-gold-dark">
              Period {period.numeral}
            </p>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-xl leading-tight text-navy sm:text-2xl">
                {period.title}
              </h2>
              <span className="whitespace-nowrap font-display text-[0.7rem] tabular-nums tracking-wide text-navy/55 sm:text-[0.82rem]">
                {period.years}
              </span>
            </div>
          </div>

          <p className="mt-6 font-serif text-lg leading-relaxed text-navy/75 sm:text-xl">
            {period.turn}
          </p>

          <ol className="mt-8 mb-16">
            {period.priests.map((p) => (
              <Row key={`${p.n}-${p.from}`} priest={p} />
            ))}
          </ol>
        </section>
      ))}

      {/* ── What the parish list leaves out ─────────────────────────────────
          Published as its own block rather than merged into the numbering,
          because the disagreement between the parish's list and the Jesuit
          archives is itself part of the record. */}
      <section id="archives" className="scroll-mt-24 border-t border-gold/30 pt-14">
        <h2 className="font-display text-2xl leading-snug text-navy sm:text-3xl">
          Names the archives add
        </h2>
        <p className="mt-4 font-serif text-lg leading-relaxed text-navy/75">
          The parish counted its own priests and the Jesuits in Rome kept their own
          registers, and the two do not quite agree. Four men are documented at
          Vadakkankulam by sources outside the parish and appear on no line of the
          list above. They are set down here rather than quietly slotted in.
        </p>

        <dl className="mt-10 space-y-8">
          {ARCHIVE_ADDITIONS.map((a) => (
            <div key={a.name} className="border-l border-gold/30 pl-5">
              <dt className="font-display text-lg leading-snug text-navy">
                {a.name}
                <span className="ml-2 text-[0.75rem] tabular-nums tracking-wide text-navy/50">
                  {a.when}
                </span>
              </dt>
              <dd className="mt-2 font-serif text-lg leading-relaxed text-navy/75">
                {a.what}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Bishops ──────────────────────────────────────────────────────── */}
      <section id="bishops" className="mt-20 scroll-mt-24 border-t border-gold/30 pt-14">
        <h2 className="font-display text-2xl leading-snug text-navy sm:text-3xl">
          The bishops who acted here
        </h2>
        <p className="mt-4 font-serif text-lg leading-relaxed text-navy/75">
          Four bishops did something at this church that the parish still lives
          inside — a foundation stone, a name, a decree, a flagstaff.
        </p>

        <ul className="mt-10 space-y-9">
          {BISHOPS.map((b) => (
            <li key={b.name} className="flex gap-5">
              {b.portrait ? (
                <figure className="shrink-0" style={{ width: 76 }}>
                  <div
                    className="relative overflow-hidden rounded-full ring-1 ring-gold/45"
                    style={{ width: 76, height: 76 }}
                  >
                    <Image
                      src={`/images/priests/${b.portrait}.jpg`}
                      alt={`${b.name}${b.portraitFrom ? `, from ${b.portraitFrom}` : ""}`}
                      width={152}
                      height={152}
                      sizes="76px"
                      className="h-full w-full object-cover saturate-[0.88]"
                    />
                  </div>
                </figure>
              ) : null}

              <div>
                <h3 className="font-display text-lg leading-snug text-navy">{b.name}</h3>
                <p className="mt-0.5 font-display text-[0.66rem] uppercase tracking-[0.22em] text-gold-dark">
                  {b.role}
                </p>
                <p className="mt-2 font-serif text-lg leading-relaxed text-navy/75">
                  {b.what}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── The graveyard row ────────────────────────────────────────────────
          The close, and the page's whole argument in one photograph: three
          priests, 1863, 1950 and 2002, standing in a line against the same
          wall. Most of these men have no face — but they are not lost. */}
      <section id="tombs" className="mt-20 scroll-mt-24 border-t border-gold/30 pt-14">
        <h2 className="font-display text-2xl leading-snug text-navy sm:text-3xl">
          They are buried here
        </h2>
        <p className="mt-4 font-serif text-lg leading-relaxed text-navy/75">
          Six dated stones stand in a row behind the church, the earliest from 1863
          and the latest from 2002 — a hundred and forty years of this parish&apos;s
          priests along one wall. Two of the inscriptions were read and printed in
          1894, by a colonial survey of the European tombs of Tinnevelly, so those
          two can be quoted exactly.
        </p>

        <figure className="mt-10">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/priests/tombs.jpg"
              alt="Three whitewashed Gothic tomb monuments in a row against the church wall, each with a black inscribed plaque: Fr Dharmanathar, Fr Eugène Rossignol S.J., and Fr J. M. Nicholas."
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-[0.72rem] leading-relaxed tracking-wide text-text-muted">
            The row behind the church, July 2026. Left to right: Fr Dharmanathar
            (1880–1950), Fr Eugène Rossignol, S.J. (died 1863), and Fr J. M.
            Nicholas (1911–2002), a son of this village.
          </figcaption>
        </figure>

        <ul className="mt-12 space-y-7">
          {TOMBS.map((t) => (
            <li key={t.name} className="border-l border-gold/30 pl-5">
              <p className="font-display text-lg leading-snug text-navy">
                {t.name}
                <span className="ml-2 text-[0.75rem] tabular-nums tracking-wide text-navy/50">
                  {t.died}
                </span>
              </p>
              {t.inscription ? (
                <p className="prose-quote mt-2 font-serif text-lg leading-relaxed text-navy/80">
                  “{t.inscription}”
                </p>
              ) : null}
              {t.note ? (
                <p className="mt-2 font-serif text-lg leading-relaxed text-navy/70">
                  {t.note}
                </p>
              ) : null}
              {t.worn ? (
                <p className="mt-2 font-serif text-lg leading-relaxed text-navy/70">
                  The stone is worn past reading. Only the two dates can still be
                  made out.
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
