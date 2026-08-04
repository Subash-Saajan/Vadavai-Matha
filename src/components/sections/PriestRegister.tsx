import Image from "next/image";

import {
  ALL_PRIESTS,
  ARCHIVE_ADDITIONS,
  BISHOPS,
  CHROME_TA,
  PERIODS,
  TENURE_PRESENT_TA,
  TOMBS,
  showTamilByName,
  tenureLabel,
  tenureLabelTa,
  tenureYears,
  type Priest,
} from "@/lib/priests";

import { cappedSizes } from "@/lib/imageSizes";

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
 *
 * TAMIL. `lang` comes down from the route. Every string resolves as
 * `ta && x.fooTa ? x.fooTa : x.foo`, the same pattern the acknowledgements page
 * uses, so a missing translation falls back to English and never to nothing.
 * The English below is left inline, untouched, and is what renders when
 * `lang === "en"`; the Tamil for this component's own chrome lives in
 * `CHROME_TA` in src/lib/priests.ts.
 *
 * ONE THING THE TAMIL VIEW DOES DIFFERENTLY, on purpose: the heading becomes
 * the Tamil name and the European name drops to the small line beneath it,
 * beside the other attested spellings. Nothing is lost — a reader searching
 * "Bergenthal" or "Faseuille" still finds the row — and the by-name the village
 * actually used (பரஞ்சோதிநாதர்) keeps its own line whenever it says something
 * the heading does not.
 */

type Lang = "en" | "ta";

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
 *
 * IT IS THE SAME ON A PHONE, AND DELIBERATELY SO. It is not motion: the width
 * is a percentage computed on the server and written once into the style
 * attribute, so there is no scroll trigger, no transform and nothing to gate to
 * desktop — sixty-nine of these cost the phone one static rule apiece. It is
 * also content rather than decoration in the design sense, the only mark on the
 * page that lets the fifty-four men with no surviving story be compared to each
 * other at all, so it would stay even if it did cost something.
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
function Plate({ priest, size, lang }: { priest: Priest; size: "sm" | "lg"; lang: Lang }) {
  const px = size === "lg" ? 104 : 46;
  const ta = lang === "ta";
  const shownName = (ta && priest.nameTa) || priest.name;

  if (priest.portrait) {
    return (
      <figure className="shrink-0" style={{ width: px }}>
        <div
          className="relative overflow-hidden rounded-full ring-1 ring-gold/45"
          style={{ width: px, height: px }}
        >
          <Image
            src={`/images/priests/${priest.portrait}.jpg`}
            alt={
              ta
                ? `${shownName}${priest.portraitFrom ? ` — ${priest.portraitFrom}` : ""}`
                : `${priest.name}${priest.portraitFrom ? `, from ${priest.portraitFrom}` : ""}`
            }
            width={px * 2}
            height={px * 2}
            sizes={cappedSizes(`${px}px`)}
            className="h-full w-full object-cover saturate-[0.88]"
          />
        </div>
        {size === "lg" && priest.portraitFrom ? (
          <figcaption className="mt-2 text-[0.7rem] leading-snug tracking-wide text-text-muted sm:text-[0.6rem]">
            {priest.portraitFrom}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (priest.plate && size === "lg") {
    return (
      /* ⚠ `.font-tamil` CARRIES A 66% size-adjust, so the declared size is not
         the rendered one. The plate was set at 0.66rem — 10.6px — which the
         face then draws at about SEVEN pixels. That is the honorific the
         village itself used for this man, standing in for a face nobody
         photographed, and it was the smallest thing on the page by a wide
         margin. 0.82rem renders near 8.7px, which the 104px roundel has room
         for (these names wrap to two or three lines either way). The desktop
         value is held at `sm:`, unchanged.

         The real fix is a larger declared size everywhere `.font-tamil` is
         used at label scale; that is a sitewide decision, not this page's. */
      <div
        className="flex shrink-0 items-center justify-center rounded-full border border-gold/45"
        style={{ width: px, height: px }}
      >
        <span className="font-tamil px-2.5 text-center text-[0.82rem] leading-tight text-gold-dark sm:text-[0.66rem]">
          {priest.plate}
        </span>
      </div>
    );
  }

  return null;
}

function Row({ priest, lang }: { priest: Priest; lang: Lang }) {
  const ta = lang === "ta";
  const life = priest.tier === "life";
  const plateSize = life ? "lg" : "sm";
  const hasPlate = Boolean(priest.portrait || (life && priest.plate));

  const heading = (ta && priest.nameTa) || priest.name;
  // In Tamil the Latin name joins the small line of attested spellings, so the
  // European form a reader may be searching for never leaves the page.
  const alsoLine = ta
    ? [priest.nameTa ? priest.name : null, priest.also].filter(Boolean).join(" · ")
    : priest.also;
  const byName = ta ? (showTamilByName(priest) ? priest.tamil : undefined) : priest.tamil;
  const prose = ta ? (priest.lifeTa ?? priest.noteTa ?? priest.life ?? priest.note) : (priest.life ?? priest.note);

  return (
    /* ── THE THREE-COLUMN ROW ON A 360px SCREEN ──────────────────────────────
       The track list was `1.6rem 1fr 4.5rem` with a 0.75rem gutter either side:
       25.6 + 12 + 12 + 72 = 121.6px of the 312px available spent before the
       name gets any. What that bought was a years column too narrow to hold the
       years at a readable size — see the note on the tenure label below — so
       both were losing.

       The numeral track comes down (it holds at most two digits, and 1.35rem is
       ample for two digits of Cinzel), the gutters tighten by 2px each, and the
       whole saving plus a little goes to the years. Net effect on the name
       column is about 6px; net effect on the years is that they can be read.
       Every `sm:` value is the one that was there, so nothing at 640px and
       above moves.

       ⚠ TAMIL GETS A WIDER YEARS TRACK, AND IT IS NOT A PREFERENCE.
       `tenureLabelTa` returns "2025 – இன்று வரை" for the serving priest — four
       digits, a dash, and then two Tamil words where English has none at all
       ("2025 – present" is one short word; "இன்று வரை" is two). Set
       `whitespace-nowrap` in a fixed 5.1rem track, that row overflowed its own
       cell on /ta at every breakpoint, desktop included.

       The track is widened AND the label is allowed to break after the dash —
       both, because either alone is not enough once the Tamil words are set at
       a size anyone can read (see the tenure figure below, where they are).
       At their proper size the phrase and the numerals together want more room
       than a sane years column has on a 360px screen, so the label may take a
       second line; what it may NOT do is split "இன்று வரை" itself, which is why
       the nowrap sits on that phrase rather than on the paragraph. A widened
       track alone would have squeezed the name column; a wrap alone would have
       stranded "வரை" on its own line. Written as a conditional rather than a `ta:` utility on
       purpose: `ta:` is a `:where()` variant and so adds no specificity, which
       means which of two equal grid-template utilities won would depend on the
       order Tailwind happened to emit them in. A branch cannot be ambiguous.
       Same reasoning as the `!` on the `short:md:` height in
       ChronicleCarousel. */
    /* ⚠ THE RULE BETWEEN TWO PRIESTS IS THE ONLY THING SEPARATING THEM, and at
       `gold/15` it was a 15%-alpha hairline over cream: about two steps of
       tone, invisible on any screen the sun is on. Sixty-nine entries with no
       visible boundary read as one continuous column of text, which is exactly
       the way a register stops being readable — the eye cannot tell where one
       man's paragraph ends and the next man's name begins. `gold/45` is still a
       hairline and still gold, not a grey table border; it is simply dark
       enough to be seen. */
    <li
      className={`grid gap-x-2.5 border-t border-gold/45 sm:gap-x-6 ${
        ta
          ? "grid-cols-[1.35rem_1fr_6.6rem] sm:grid-cols-[2rem_1fr_7.4rem]"
          : "grid-cols-[1.35rem_1fr_5.1rem] sm:grid-cols-[2rem_1fr_6rem]"
      } ${life ? "py-6 sm:py-7" : "py-4"}`}
    >
      <span className="pt-1 font-display text-[0.78rem] tabular-nums text-gold-dark/70">
        {priest.n}
      </span>

      <div className={hasPlate ? "flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 lg:gap-5" : undefined}>
        {hasPlate ? <Plate priest={priest} size={plateSize} lang={lang} /> : null}

        <div className="min-w-0">
          {/* ⚠ THE NAME WAS SMALLER THAN THE PARAGRAPH ABOUT HIM, AND ON THE
              ILLUMINATED ROWS IT WAS EXACTLY THE SAME SIZE. An ordinary row set
              the priest's name at 0.97rem (15.5px) over prose at `text-base`
              (16px); a `life` row set both at `text-lg`. On a page whose entire
              subject is sixty-nine names, the name is the one thing that must
              read as the heading of its row — a reader scanning for a man does
              not read the paragraphs, he reads the names down the left edge.

              Ordinary rows: name 17.3px over prose 16.8px. That looks like a
              narrow margin and is not — the name is Cinzel, a caps-only
              inscriptional face whose cap height fills the em, against
              Cormorant, which is drawn on old Garamond proportions with an
              unusually small x-height. At the same declared size Cinzel reads
              distinctly larger. (Same reason the serif body sits ABOVE the sans
              body everywhere else on this site — see Patroness.tsx.)

              Life rows: name 20px over prose 17.3px, so the twelve men with a
              documented life still open with a clear heading. All `sm:` values
              are the ones that were already there. */}
          <h3
            className={`${ta ? "font-tamil" : "font-display"} leading-snug text-navy ${
              life ? "text-[1.25rem] sm:text-2xl" : "text-[1.08rem] sm:text-lg"
            }`}
          >
            {heading}
          </h3>

          {/* The by-name the village used, and it is always Tamil — so it too
              is drawn at the 66% size-adjust: `text-sm` rendered near 9px. Up to
              a declared 1rem on a phone, which lands about 10.6px. */}
          {byName ? (
            <p className="font-tamil mt-0.5 text-[1rem] leading-snug text-navy/55 sm:text-sm">
              {byName}
            </p>
          ) : null}

          {/* The other attested spellings — "Bergenthal · Berghental" — which is
              exactly what a reader who arrived from a search engine is checking
              the row against. 0.68rem is 10.9px. */}
          {alsoLine ? (
            <p className="mt-1 text-[0.76rem] leading-snug tracking-wide text-text-muted sm:text-[0.68rem]">
              {alsoLine}
            </p>
          ) : null}

          {prose ? (
            <p
              className={`${ta ? "font-tamil" : "font-serif"} leading-relaxed text-navy/75 ${
                life ? "mt-3 text-[1.08rem] sm:text-xl" : "mt-2 text-[1.05rem] sm:text-lg"
              }`}
            >
              {prose}
            </p>
          ) : null}
        </div>
      </div>

      {/* ⚠ THE YEARS ARE HALF THE CONTENT OF THIS REGISTER AND THEY WERE THE
          SMALLEST TEXT IN THE ROW. For fifty-four of these sixty-nine men, the
          name and the span of years are the ONLY two things the parish still
          knows — and the years were set at 0.68rem, 10.9px, in tabular Cinzel:
          smaller than the row number beside them, smaller than the footnote of
          alternative spellings, smaller than everything except the photograph
          credit. "1751 – 1775" at that size is a thing you lean in for.

          0.76rem (12.2px) clears the 12px floor below which figures stop being
          read and start being reconstructed. It is nowrap in a fixed track, so
          the track above was widened to 5.1rem to take it; `sm:` restores both
          the size and the width that were there. */}
      {/* ⚠ THE TAMIL HALF OF THIS FIGURE DRAWS SMALLER THAN THE DIGITS BESIDE
          IT, FROM THE SAME DECLARATION. "2025 – இன்று வரை" is one string in two
          scripts, and the Tamil @font-face carries `size-adjust` (58% for the
          display cut, 66% for the small one — see globals.css). The digits and
          the dash are NOT in the Tamil unicode-range, so they fall through to
          Cinzel at full size; only the two Tamil words take the cut. At
          0.76rem that meant 12.2px numerals sitting next to 7px words in the
          same breath. There is no single font-size that fixes this, which is
          why the phrase is typeset as its own element.

          `1.5em` is RELATIVE, so it holds at both breakpoints without a second
          number: 0.76rem x 1.5 x 0.66 = 12.0px against the digits' 12.2px, and
          at `sm` 0.8rem x 1.5 x 0.66 = 12.7px against 12.8px. `font-tamil`
          rather than the inherited `font-display` so it takes the 66% SMALL
          cut, not the 58% heading one.

          The nowrap moved OFF the paragraph and ONTO the phrase. On the
          paragraph it forced the whole label onto one line and overflowed the
          cell; on the phrase it does the one thing that actually matters —
          keeps "இன்று வரை" whole — so the only place the label may break is
          after the dash, which is where a date range wants to break anyway.
          Every other row, in both languages, is digits and is unaffected. */}
      <div className="text-right">
        <p className="font-display text-[0.76rem] tabular-nums tracking-wide text-navy/60 sm:text-[0.8rem]">
          {ta ? (
            priest.current ? (
              <>
                {priest.from} –{" "}
                <span className="font-tamil whitespace-nowrap text-[1.5em]">
                  {TENURE_PRESENT_TA}
                </span>
              </>
            ) : (
              tenureLabelTa(priest)
            )
          ) : (
            tenureLabel(priest)
          )}
        </p>
        <TenureStroke years={tenureYears(priest)} />
      </div>
    </li>
  );
}

export function PriestRegister({ lang = "en" }: { lang?: Lang }) {
  const ta = lang === "ta";

  return (
    <>
      {PERIODS.map((period) => (
        <section key={period.numeral} id={`period-${period.numeral.toLowerCase()}`} className="scroll-mt-24">
          {/* Sticky band. `.period-band` (globals.css) takes it out of the
              reading column to the full width of the screen and fades it back
              to nothing over the width it gained, so rows disappear under a
              ground that has no edge rather than sliding behind a card. The
              padding it carries puts this text back exactly where the column
              had it.

              IT IS SET ON `cream-dark`, NOT `cream`, AND THAT IS THE POINT OF IT.
              At 95% cream on a cream page the band was the same colour as what
              it was covering: rows slid under an invisible edge and the reader
              had to infer where the heading stopped and the register began.
              `--cream-dark` (#e8dec9) is one step down from `--cream` (#f4eee1),
              the same pair the section grounds elsewhere on the site already
              use, so the band now reads as a band without becoming a dark bar
              across a bright page. The bottom rule comes up with it. */}
          <div className="period-band sticky top-16 z-30 border-b border-gold/40 bg-cream-dark/95 py-3 backdrop-blur-sm md:top-20">
            {/* "PERIOD III" at 0.6rem is 9.6px, thrown 0.3em apart — the one
                piece of wayfinding on a page sixty-nine rows long, and it was
                the least legible thing in the band that exists to carry it. Up
                to 10.9px with the tracking paying for the width. It is worse
                still in Tamil, where `.font-tamil`'s 66% size-adjust drew the
                same declared size at about 6px, so this correction helps both
                views; the tracking sits in the English branch because Tamil
                syllables are connected units and must not be spaced at all. */}
            <p
              className={`${
                ta ? "font-tamil" : "font-display uppercase tracking-[0.16em] md:tracking-[0.3em]"
              } text-[0.68rem] text-gold-dark md:text-[0.6rem]`}
            >
              {ta ? `${CHROME_TA.period} ${period.numeral}` : `Period ${period.numeral}`}
            </p>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className={`${ta ? "font-tamil" : "font-display"} text-xl leading-tight text-navy sm:text-2xl`}>
                {ta && period.titleTa ? period.titleTa : period.title}
              </h2>
              <span className="whitespace-nowrap font-display text-[0.76rem] tabular-nums tracking-wide text-navy/55 sm:text-[0.82rem]">
                {period.years}
              </span>
            </div>
          </div>

          <p className={`mt-6 ${ta ? "font-tamil" : "font-serif"} text-[1.08rem] leading-relaxed text-navy/75 sm:text-xl`}>
            {ta && period.turnTa ? period.turnTa : period.turn}
          </p>

          <ol className="mt-7 mb-12 sm:mt-8 sm:mb-16">
            {period.priests.map((p) => (
              <Row key={`${p.n}-${p.from}`} priest={p} lang={lang} />
            ))}
          </ol>
        </section>
      ))}

      {/* ── What the parish list leaves out ─────────────────────────────────
          Published as its own block rather than merged into the numbering,
          because the disagreement between the parish's list and the Jesuit
          archives is itself part of the record. */}
      <section id="archives" className="scroll-mt-24 border-t border-gold/30 pt-10 sm:pt-14">
        <h2 className={`${ta ? "font-tamil" : "font-display"} text-2xl leading-snug text-navy sm:text-3xl`}>
          {ta ? CHROME_TA.archivesTitle : "Names the archives add"}
        </h2>
        <p className={`mt-4 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}>
          {ta ? (
            CHROME_TA.archivesIntro
          ) : (
            <>
              The parish counted its own priests and the Jesuits in Rome kept their own
              registers, and the two do not quite agree. Six men are documented at
              Vadakkankulam by sources outside the parish and appear on no line of the
              list above. They are set down here rather than quietly slotted in.
            </>
          )}
        </p>

        <dl className="mt-8 space-y-7 sm:mt-10 sm:space-y-8">
          {ARCHIVE_ADDITIONS.map((a) => (
            <div key={a.name} className="border-l border-gold/30 pl-4 sm:pl-5">
              <dt className={`${ta ? "font-tamil" : "font-display"} text-lg leading-snug text-navy`}>
                {ta && a.nameTa ? a.nameTa : a.name}
                <span className="ml-2 text-[0.8rem] tabular-nums tracking-wide text-navy/50 sm:text-[0.75rem]">
                  {ta && "whenTa" in a && a.whenTa ? a.whenTa : a.when}
                </span>
              </dt>
              <dd className={`mt-2 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}>
                {ta && a.whatTa ? a.whatTa : a.what}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Bishops ──────────────────────────────────────────────────────── */}
      <section id="bishops" className="mt-14 scroll-mt-24 border-t border-gold/30 pt-10 sm:mt-20 sm:pt-14">
        <h2 className={`${ta ? "font-tamil" : "font-display"} text-2xl leading-snug text-navy sm:text-3xl`}>
          {ta ? CHROME_TA.bishopsTitle : "The bishops who acted here"}
        </h2>
        <p className={`mt-4 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}>
          {ta ? (
            CHROME_TA.bishopsIntro
          ) : (
            <>
              Four bishops did something at this church that the parish still lives
              inside: a foundation stone, a name, a decree, a flagstaff.
            </>
          )}
        </p>

        <ul className="mt-8 space-y-8 sm:mt-10 sm:space-y-9">
          {BISHOPS.map((b) => (
            <li key={b.name} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
              {b.portrait ? (
                <figure className="shrink-0" style={{ width: 76 }}>
                  <div
                    className="relative overflow-hidden rounded-full ring-1 ring-gold/45"
                    style={{ width: 76, height: 76 }}
                  >
                    <Image
                      src={`/images/priests/${b.portrait}.jpg`}
                      alt={
                        ta
                          ? `${b.nameTa ?? b.name}${b.portraitFrom ? ` — ${b.portraitFrom}` : ""}`
                          : `${b.name}${b.portraitFrom ? `, from ${b.portraitFrom}` : ""}`
                      }
                      width={152}
                      height={152}
                      sizes={cappedSizes("76px")}
                      className="h-full w-full object-cover saturate-[0.88]"
                    />
                  </div>
                </figure>
              ) : null}

              <div>
                <h3 className={`${ta ? "font-tamil" : "font-display"} text-lg leading-snug text-navy`}>
                  {ta && b.nameTa ? b.nameTa : b.name}
                </h3>
                {/* The bishop's office — "Vicar Apostolic of Madurai" — at
                    0.66rem is 10.6px of spaced Cinzel caps, and it is the line
                    that says who the man in the roundel actually was. Same
                    trade as everywhere else on this page: size up, tracking
                    down, no extra width used. */}
                <p
                  className={`mt-0.5 ${
                    ta
                      ? "font-tamil"
                      : "font-display uppercase tracking-[0.14em] md:tracking-[0.22em]"
                  } text-[0.72rem] text-gold-dark md:text-[0.66rem]`}
                >
                  {ta && b.roleTa ? b.roleTa : b.role}
                </p>
                <p className={`mt-2 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}>
                  {ta && b.whatTa ? b.whatTa : b.what}
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
      <section id="tombs" className="mt-14 scroll-mt-24 border-t border-gold/30 pt-10 sm:mt-20 sm:pt-14">
        <h2 className={`${ta ? "font-tamil" : "font-display"} text-2xl leading-snug text-navy sm:text-3xl`}>
          {ta ? CHROME_TA.tombsTitle : "They are buried here"}
        </h2>
        <p className={`mt-4 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}>
          {ta ? (
            CHROME_TA.tombsIntro
          ) : (
            <>
              Six dated stones stand in a row behind the church, the earliest from 1863
              and the latest from 2002, a hundred and forty years of this parish&apos;s
              priests along one wall. Two of the inscriptions were read and printed in
              1894, by a colonial survey of the European tombs of Tinnevelly, so those
              two can be quoted exactly.
            </>
          )}
        </p>

        <figure className="mt-8 sm:mt-10">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src="/images/priests/tombs.jpg"
              alt={
                ta
                  ? CHROME_TA.tombsCaption
                  : "Three whitewashed Gothic tomb monuments in a row against the church wall, each with a black inscribed plaque: Fr Dharmanathar, Fr Eugène Rossignol S.J., and Fr J. M. Nicholas."
              }
              fill
              sizes={cappedSizes("(min-width: 768px) 48rem, 100vw")}
              className="object-cover"
            />
          </div>
          {/* ⚠ TAMIL NEEDS A BIGGER NUMBER HERE TO RENDER THE SAME SIZE.
              `.font-tamil` resolves to "Kumudam Tamil", declared with
              `size-adjust: 66%` at the top of globals.css — so a Tamil glyph
              set at 0.8rem DRAWS AT 0.53rem, about 8.4px. The size-adjust is
              correct and deliberate (it stops Tamil rendering heavier than the
              Latin at matching sizes), but it means every small `text-[…]`
              this class meets is two-thirds of what it says. The Tamil branch
              therefore asks for ~1.5× to arrive at the same drawn size.
              The English branch is untouched at both widths. */}
          <figcaption
            className={`mt-3 leading-relaxed tracking-wide text-text-muted ${
              ta
                ? "font-tamil text-[1.2rem] sm:text-[1.08rem]"
                : "text-[0.8rem] sm:text-[0.72rem]"
            }`}
          >
            {ta ? (
              CHROME_TA.tombsCaption
            ) : (
              <>
                The row behind the church, July 2026. Left to right: Fr Dharmanathar
                (1880–1950), Fr Eugène Rossignol, S.J. (died 1863), and Fr J. M.
                Nicholas (1911–2002), a son of this village.
              </>
            )}
          </figcaption>
        </figure>

        <ul className="mt-10 space-y-6 sm:mt-12 sm:space-y-7">
          {TOMBS.map((t) => (
            <li key={t.name} className="border-l border-gold/30 pl-4 sm:pl-5">
              <p className={`${ta ? "font-tamil" : "font-display"} text-lg leading-snug text-navy`}>
                {ta && t.nameTa ? t.nameTa : t.name}
                <span className="ml-2 text-[0.8rem] tabular-nums tracking-wide text-navy/50 sm:text-[0.75rem]">
                  {t.died}
                </span>
              </p>
              {/* The two inscriptions Forbes printed in 1894 stay verbatim in
                  their own language in both views — a quoted stone is evidence,
                  not copy, and translating it would make it neither. */}
              {t.inscription ? (
                <p className="prose-quote mt-2 font-serif text-[1.05rem] leading-relaxed text-navy/80 md:text-lg">
                  “{t.inscription}”
                </p>
              ) : null}
              {t.note ? (
                <p className={`mt-2 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/70 md:text-lg`}>
                  {ta && t.noteTa ? t.noteTa : t.note}
                </p>
              ) : null}
              {t.worn ? (
                <p className={`mt-2 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/70 md:text-lg`}>
                  {ta ? (
                    CHROME_TA.tombWorn
                  ) : (
                    <>
                      The stone is worn past reading. Only the two dates can still be
                      made out.
                    </>
                  )}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
