"use client";

import { useRef, useState } from "react";
import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "./useReveal";
import { PlanDrawing, type PlanRegion } from "./PlanDrawing";
import { AltarPhoto, type AltarSpot } from "./AltarPhoto";

/**
 * V — the climax: the building read as a creed, held for the peak of the
 * page on purpose, after the visitor has already seen the towers, heard the
 * bells, watched the light and looked up at the vault. The reading runs to
 * NINE numbers — four live in the measured floor plan (five doors, three ways
 * in, the fourteen of the centre path, one altar) and five wait at the altar
 * (twelve apostles at the tabernacle, five upper arches, nine flower-carvings,
 * four lower arches, the Trinity at the centre). Tapping (or hovering) a plan
 * reading lifts that region of the plan and dims the rest; three of the five
 * altar readings light up on the photograph the same way.
 *
 * SHAPE — plan, motto, altar. Two mirrored halves with the church's own
 * inscription standing full-width between them:
 *
 *   the measured plan  (left)  ·  its five readings   (right)
 *   ────────────  TEMPLVM SIT DVPLEX, ARA SED VNA  ────────────
 *   its four readings  (left)  ·  the altar photograph (right)
 *
 * ONE drawing only. A second SVG — a symbolic elevation of the altarpiece —
 * carried the altar numbers as its own interactive diagram; it was cut in July
 * 2026 because it invented what it could not measure. AltarpieceDrawing.tsx
 * stays in the repo, simply no longer imported.
 * Its readings did not go with it: they now sit beside a PHOTOGRAPH of the
 * reredos, and two of the four are mapped onto it. Why only two — AltarPhoto.tsx.
 *
 * ⚠ THE SOURCE MUST STAY VISIBLE. The whole reading comes from one handwritten
 * parish sheet, photographed July 2026 — how the parish reads its church, NOT
 * documented intent of the builders of 1855. That sheet used to be shown here as
 * a photograph; the image was dropped in July 2026 at the owner's request. The
 * fact now rests ENTIRELY on creedBody, which states it in prose. Do not edit
 * that provenance out of creedBody — with the photograph gone there is nothing
 * else carrying it. (`creed-note.jpg` is still in public/images/architecture/ if
 * the figure is ever wanted back.)
 */
/**
 * Which altar readings can be pointed at on the photograph. `flowers` and
 * `lowerArches` are deliberately absent — the nine bouquet-carvings cannot be
 * counted with any honesty (the same form repeats at three scales) and the
 * note's four base-row arches are not the register below the statues, which
 * holds twelve. They get no hotspot rather than a guessed one. KB 02 §4.7c has
 * both on its on-site camera list; add them here once someone has counted them.
 */
const ALTAR_SPOT: Partial<Record<string, AltarSpot>> = {
  apostles: "apostles",
  upperArches: "arches",
  trinity: "trinity",
};

export function Creed() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const a = t.architecture;
  useReveal(ref, lang);

  // Locked selection (click) and hover preview; the preview wins for display.
  // The plan and the altar photograph each own their own pair of the same
  // little state machine.
  const [active, setActive] = useState<PlanRegion | null>(null);
  const [hover, setHover] = useState<PlanRegion | null>(null);
  const shown = hover ?? active;
  const toggle = (r: PlanRegion) => setActive((prev) => (prev === r ? null : r));

  const [active2, setActive2] = useState<AltarSpot | null>(null);
  const [hover2, setHover2] = useState<AltarSpot | null>(null);
  const shown2 = hover2 ?? active2;
  const toggle2 = (s: AltarSpot) => setActive2((prev) => (prev === s ? null : s));

  return (
    <section
      ref={ref}
      /* ⚠ `overflow-clip`, NOT `overflow-hidden`, AND THE TWO STICKY PICTURES
         BELOW DEPEND ON IT BEING CLIP. `overflow: hidden` makes a box a scroll
         CONTAINER — it has a scrollport, it merely refuses to let anyone move
         it — and a `position: sticky` descendant is offset against its nearest
         scrollport rather than against the window. Inside an `overflow: hidden`
         section that scrollport never moves, so the sticky offset resolves to
         nothing on every frame and the element just scrolls away with the page.
         `overflow: clip` cuts at exactly the same edge (the padding box) but
         creates no scrollport, so the two things this section has always had to
         cut off — the rotated light shaft and the numeral hanging above the top
         edge — are still cut off, and the WINDOW stays the sticky scrollport.
         Nothing else moves with it: clip is not scrollable by the user or by
         script, and nothing here has ever scrolled this section by either. */
      className="relative section-padding cathedral-depth overflow-clip"
    >
      <div className="light-shaft absolute -top-10 left-[6%] w-[42%] h-[120%] -rotate-12" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.07] select-none">
        V
      </span>

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="reveal-item kicker text-gold! mb-6">{a.creedLabel}</p>
          {/* The display heading clamp — see the note in Bells.tsx. */}
          <h2 className="reveal-item font-display uppercase tracking-[0.03em] text-[clamp(1.85rem,7.4vw,2.25rem)] md:text-5xl lg:text-6xl text-white leading-tight">
            {a.creedTitle}
          </h2>
          <p className="reveal-item text-white/70 text-[0.98rem] md:text-lg leading-relaxed mt-7">
            {a.creedBody}
          </p>
        </div>

        {/* The interactive plan and its four readings.

            ── WHY THIS IS A FLEX COLUMN BELOW `lg` AND ONLY A GRID AT `lg` ────
            ⚠ DO NOT "SIMPLIFY" THIS BACK TO `grid grid-cols-1 lg:grid-cols-12`.
            It was exactly that, and that is what made this interaction dead on
            a phone.

            Stacked, the drawing sits ABOVE its five readings, and the third and
            fourth of them are the better part of a screen further down. So a
            reader tapping a reading lit a region of a plan that had long since
            gone off the top of the screen: the tap produced no visible result
            at all, on the one element of this page whose entire purpose is to
            answer "which part of the church is this number?".

            The cure is to hold the drawing still while the readings run past
            it. The obstacle is that a single-column CSS GRID gives every child
            its own ROW, and a sticky item's containing block is that row — a
            box exactly as tall as the item itself, with nowhere to travel.
            Sticky is not broken there; it is satisfied the instant it is
            applied and never moves again. A flex COLUMN puts both children in
            one containing block, the whole half-section, so the drawing has the
            readings' full height to stay put through.

            At `lg` the twelve-column grid comes back untouched, and the sticky
            is switched off with it. `items-start` moves to `lg:` for the same
            reason: in a flex COLUMN that word addresses the CROSS axis, so left
            unqualified it would shrink both children to their content width. */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 lg:items-start mt-12 md:mt-16">
          {/* ── THE DRAWING, HELD ───────────────────────────────────────────
              `top-16 md:top-20` is the fixed navbar's own height (`h-16
              md:h-20`) — the same pair the period bands on /priests stick at —
              so this panel tucks straight under it with no strip of scrolling
              text left showing between the two.

              IT HAS TO BE OPAQUE, AND IT HAS TO REACH THE SCREEN EDGES. The
              readings pass BEHIND it, and the frame inside is `bg-night-deep/40`
              — sixty per cent transparent, which over moving white serif copy
              is a ghost, not a background. `bg-navy` is the first stop of the
              section's own `cathedral-depth` gradient (navy → night-deep at
              72%), and this half sits in its top third, so the panel is within
              three or four values of the ground it is covering. `-mx-6 md:-mx-8`
              cancels `.section-padding`'s gutter (1.5rem, 2rem at `md`) so a
              card cannot slide past down the sides, and `px-6 md:px-8` puts the
              content back where it stood. The hairline along the bottom is what
              makes the edge read as a shelf rather than as a seam.

              `z-10` because the readings are LATER siblings: without it they
              paint over the panel instead of under it.

              All of it is off at `lg`, where the plan sits beside its list. */}
          <div className="reveal-item sticky top-16 z-10 -mx-6 border-b border-gold/10 bg-navy px-6 pt-3 pb-4 md:top-20 md:-mx-8 md:px-8 lg:static lg:z-auto lg:col-span-7 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:border-b-0 lg:bg-transparent">
            {/* ── THE HEIGHT CAP, WRITTEN AS A WIDTH ──────────────────────
                A held picture that eats the screen is no better than one that
                has scrolled away — the reader still cannot see a reading and
                its answer at the same time. This holds the plan to roughly
                45% of the screen, frame and citation together, and leaves the
                rest to the list.

                It is expressed as a max-WIDTH because the plan is an SVG with
                a viewBox 1400 × 1490 (`1400 + WEST_EXTENSION`) set to `w-full
                h-auto`: its height is a consequence of the width the frame
                gives it. Capping the height directly would leave the SVG at
                full width and letterbox the drawing inside its own frame,
                with dead gutters either side of it. Capping the width instead
                shrinks frame and drawing together, so the gold ring still fits
                the plan exactly. 36svh of picture wants 36svh × 1400/1490 of
                width, plus the frame's own padding — 1.5rem of it here, 4rem
                once `md:p-8` takes over.

                `svh`, not `vh`: this is a flowed element, not a sticky
                full-bleed stage, so it is sized to the screen WITH the address
                bar showing and cannot outgrow its budget when the bar retracts.

                ⚠ 0.94 IS THE DRAWING'S ASPECT RATIO. Change WEST_EXTENSION in
                PlanDrawing.tsx and it moves, and this cap goes with it.

                `p-3` below `md`, and the twenty pixels it gives back are not
                cosmetic. The plan is a viewBox 1400 units wide: every stroke,
                numeral and pier label in it is scaled by the width this box
                allows. On a 390px phone that is about 302px inside `p-5`, or a
                scale of 0.216 — so five per cent of frame width is five per
                cent on the size of every mark in the drawing. The frame still
                reads as a frame at 12px; on a monitor nothing changes.

                THE CAP ABOVE COSTS SOME OF THAT BACK, KNOWINGLY. On a 390×844
                phone the frame goes from the column's full 342px to about
                309px, so the drawing runs at a scale of 0.204 rather than
                0.227 and the pier labels come out near 10px rather than 11.4.
                That is a real loss and it is still the better trade: those
                labels are not what a reader taps for, and before this the
                four regions they stand among could not be seen lighting up at
                all. If the balance ever needs re-striking, move the 36svh —
                it is the only number in play. */}
            <div className="mx-auto max-w-[calc(36svh*0.94+1.5rem)] md:max-w-[calc(36svh*0.94+4rem)] lg:max-w-none rounded-[1.75rem] ring-1 ring-gold/15 bg-night-deep/40 p-3 md:p-8">
              <PlanDrawing
                title={a.planDrawTitle}
                active={shown}
                onSelect={toggle}
              />
            </div>
            {/* 0.6rem is 9.6px, and at 35% white on cathedral-dark this
                citation — the source of the whole drawing — was below both the
                size floor and the contrast floor at once. Size up, tracking
                down to hold the line length, opacity up; all three revert at
                `md`, where it is read on a monitor at a foot's distance. */}
            <p className="mt-5 text-center font-display text-[0.7rem] tracking-[0.12em] md:text-[0.6rem] md:tracking-[0.22em] uppercase text-white/55 md:text-white/35">
              {a.planNote}
            </p>
          </div>

          {/* The readings that live in the plan */}
          <div className="lg:col-span-5">
            <h3 className="reveal-item font-serif text-2xl md:text-3xl italic text-gradient-gold">
              {a.creedReadTitle}
            </h3>
            {/* ⚠ THIS LINE IS THE PAGE'S ONLY INSTRUCTION — it is the sentence
                that tells a reader the list below is interactive at all, and at
                0.6rem/9.6px it was the smallest type in the section. On touch
                it matters more than on a monitor, not less: the plan's own
                regions are far too fine to hit with a thumb, so on a phone
                these buttons ARE the interaction. Up to 11.2px, tracking cut to
                keep it on one line, designed values back at `md`. */}
            <p className="reveal-item mt-2 font-display text-[0.7rem] tracking-[0.14em] md:text-[0.6rem] md:tracking-[0.24em] uppercase text-gold/60">
              {a.creedReadHint}
            </p>

            <ul className="mt-7 space-y-3">
              {a.creedReadings.map((r) => {
                const on = active === r.anchor;
                return (
                  <li key={`${r.n}-${r.anchor}`} className="reveal-item">
                    <button
                      type="button"
                      onClick={() => toggle(r.anchor)}
                      onMouseEnter={() => setHover(r.anchor)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(r.anchor)}
                      onBlur={() => setHover(null)}
                      aria-pressed={on}
                      /* `gap-4` below `md`. The row is a 56px medallion, the
                         gap, and then the reading — and on a 342px screen the
                         card's own `p-4` leaves that reading 234px to work in.
                         Four pixels back off the gutter is a whole character a
                         line on the two grey lines beneath the title. */
                      className={`group w-full text-left flex items-center gap-4 md:gap-5 rounded-2xl border p-4 transition-all duration-300 ${
                        on
                          ? "border-gold/60 bg-gold/10"
                          : "border-white/10 hover:border-gold/30 hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-14 h-14 rounded-full grid place-items-center font-display text-2xl tabular-nums transition-colors duration-300 ${
                          on
                            ? "bg-gold text-navy"
                            : "border border-gold/40 text-gold group-hover:border-gold/70"
                        }`}
                      >
                        {r.n}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-serif text-[1.15rem] md:text-2xl text-white leading-snug">
                          {r.means}
                        </span>
                        <span className="block mt-0.5 text-sm text-white/55 leading-relaxed">
                          {r.what}
                        </span>
                        {/* The gloss. Serif italic so two small greys in a row
                            don't blur into one another — and that is exactly
                            why it cannot be `text-sm` on a phone as well: set
                            to the same 14px as the sans line above it,
                            Cormorant's small x-height makes it the harder of
                            the two to read, which is the wrong way round for
                            the sentence that carries the meaning. 15.2px on a
                            phone, back to the designed 14px at `md`. */}
                        <span className="block mt-2 font-serif italic text-[0.95rem] md:text-sm text-white/45 leading-relaxed">
                          {r.note}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── THE MOTTO — the hinge between the two halves of the reading ────
            Full width and centred on purpose: it used to be tucked under the
            plan's readings, where a column five cards long buried it. Standing
            alone between the plan and the altar it does the work of a chapter
            break, and it is the one line of this section the church says in its
            own voice rather than the parish's.

            KB Mismatch J9 — never say "cut into the foundation stone": the
            stone itself has never been inspected. */}
        <figure className="mt-16 md:mt-32 max-w-3xl mx-auto text-center">
          <div className="reveal-item mx-auto w-24 border-t border-gold/30" />
          {/* ⚠ THE INSCRIPTION OVERFLOWED THE SCREEN, AND THAT IS WHY THIS IS
              THE ONE PLACE ON THE PAGE WHERE MOBILE TYPE GOES DOWN HARD.
              `whitespace-pre-line` is load-bearing: the motto is authored as
              two lines and must break where the church breaks it. Its longer
              line is 32 characters of Cinzel caps, and at 18px with 0.12em of
              tracking that is roughly 420px — against the 342px a 390px phone
              actually has. So it wrapped anyway, in the middle of a clause,
              and the couplet read as four ragged lines. At 15.2px with the
              tracking pulled to 0.04em it sets in about 310px and breaks
              exactly where it was written to break. `md` keeps the drawn
              size and the drawn tracking. */}
          <blockquote className="reveal-item mt-12 font-display text-gold text-[0.95rem] tracking-[0.04em] md:text-2xl md:tracking-[0.12em] leading-[1.9] whitespace-pre-line">
            {a.motto}
          </blockquote>
          <figcaption className="reveal-item mt-8">
            <p className="font-serif italic text-white/75 text-[1.08rem] md:text-lg leading-relaxed">
              {a.mottoTr}
            </p>
            {/* 0.58rem is 9.3px — the smallest type in the section. */}
            <p className="mt-6 font-display text-[0.7rem] tracking-[0.14em] md:text-[0.58rem] md:tracking-[0.26em] uppercase text-white/55 md:text-white/40">
              {a.mottoCaption}
            </p>
          </figcaption>
          <div className="reveal-item mt-12 mx-auto w-24 border-t border-gold/30" />
        </figure>

        {/* The readings that wait at the altar, read against a photograph of
            the reredos rather than a drawing of it. Only two of the four are
            mapped — the other two have never been counted on site, so they are
            rendered as plain, unclickable text, with no affordance promising a
            highlight that cannot come. AltarPhoto.tsx has the reasoning.

            MIRRORED against the plan block above — numbers left, photograph
            right — so the two halves of the creed don't read as one long column
            of the same layout twice. The photograph still comes FIRST in the
            DOM, and is only moved by lg:order: on a phone both halves open with
            their picture and then explain it, which is the rhythm of the rest
            of the page.

            That DOM order is now load-bearing twice over: below `lg` the
            photograph is the STICKY child of a flex column, and a sticky item
            can only hold still through the siblings that come after it. Were
            the readings moved above it in source order to "fix" the mobile
            stack, the photograph would have nothing left to travel through and
            the interaction would go dead again. `lg:order` stays the only
            thing that mirrors this half on a monitor. */}
        {/* Flex below `lg`, grid at `lg` — the long note on the plan's half,
            above, has the whole reason. In short: a one-column grid makes every
            child its own row, and a sticky item cannot move inside a row that
            is exactly its own height. */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 lg:items-start mt-16 md:mt-32">
          {/* Held the same way as the plan, and for the same reason — see that
              panel's note. The one difference is the ground: this half sits in
              the bottom third of the section, where `cathedral-depth` has
              already run down to its night-deep stop, so the occluding panel is
              `bg-night-deep` rather than the plan's `bg-navy`. */}
          <div className="reveal-item sticky top-16 z-10 -mx-6 border-b border-gold/10 bg-night-deep px-6 pt-3 pb-4 md:top-20 md:-mx-8 md:px-8 lg:static lg:z-auto lg:col-span-7 lg:order-2 lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 lg:border-b-0 lg:bg-transparent">
            {/* The same height budget as the plan, arrived at the same way —
                cap the width, let the aspect ratio set the height, so the frame
                keeps hugging the picture instead of letterboxing it. 1.163 is
                the crop's own ratio (2140 × 1840; AltarPhoto.tsx sets it as an
                inline `aspectRatio` because the overlay's viewBox has to land
                on the pixels). 36svh of height therefore wants 36svh × 1.163
                of width, and AltarPhoto has no frame padding to add.

                On a 390×844 phone this cap does nothing at all — the crop is
                landscape, so at the column's full 342px it is already only
                294px tall, about 35svh. It earns its keep on short screens and
                in landscape, where the untouched photograph would take half the
                view and leave the readings a strip. */}
            <div className="mx-auto max-w-[calc(36svh*1.163)] lg:max-w-none">
              <AltarPhoto alt={a.altarPhotoAlt} active={shown2} onSelect={toggle2} />
            </div>
            {/* Same 9.6px / 35%-white correction as the plan's note above. */}
            <p className="mt-5 text-center font-display text-[0.7rem] tracking-[0.12em] md:text-[0.6rem] md:tracking-[0.22em] uppercase text-white/55 md:text-white/35">
              {a.altarPhotoNote}
            </p>
          </div>

          <div className="lg:col-span-5 lg:order-1">
            <h3 className="reveal-item font-serif text-2xl md:text-3xl italic text-gradient-gold">
              {a.creedAltarTitle}
            </h3>
            {/* The hint for the altar half — see the note on its twin above. */}
            <p className="reveal-item mt-2 font-display text-[0.7rem] tracking-[0.14em] md:text-[0.6rem] md:tracking-[0.24em] uppercase text-gold/60">
              {a.creedAltarHint}
            </p>

            <ul className="mt-7 space-y-3">
              {a.creed.map((c) => {
                const spot = ALTAR_SPOT[c.anchor];
                const on = spot !== undefined && active2 === spot;
                const body = (
                  <>
                    <span
                      className={`shrink-0 w-14 h-14 rounded-full grid place-items-center font-display text-2xl tabular-nums transition-colors duration-300 ${
                        on
                          ? "bg-gold text-navy"
                          : "border border-gold/40 text-gold group-hover:border-gold/70"
                      }`}
                    >
                      {c.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-[1.15rem] md:text-2xl text-white leading-snug">
                        {c.means}
                      </span>
                      <span className="block mt-0.5 text-sm text-white/55 leading-relaxed">
                        {c.what}
                      </span>
                      {/* Serif above sans on a phone — the note on the plan's
                          identical list, above, has the reasoning. */}
                      <span className="block mt-2 font-serif italic text-[0.95rem] md:text-sm text-white/45 leading-relaxed">
                        {c.note}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={`${c.n}-${c.anchor}`} className="reveal-item">
                    {spot ? (
                      <button
                        type="button"
                        onClick={() => toggle2(spot)}
                        onMouseEnter={() => setHover2(spot)}
                        onMouseLeave={() => setHover2(null)}
                        onFocus={() => setHover2(spot)}
                        onBlur={() => setHover2(null)}
                        aria-pressed={on}
                        className={`group w-full text-left flex items-center gap-4 md:gap-5 rounded-2xl border p-4 transition-all duration-300 ${
                          on
                            ? "border-gold/60 bg-gold/10"
                            : "border-white/10 hover:border-gold/30 hover:bg-white/3"
                        }`}
                      >
                        {body}
                      </button>
                    ) : (
                      <div className="w-full flex items-center gap-4 md:gap-5 rounded-2xl border border-white/10 p-4">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* The honest note — the two readings this page will not map, and
                why. 14px at 40% white on near-black is under 3:1; a caveat
                nobody can read is a caveat that is not there. Up a touch and
                brighter on a phone, still visibly quieter than the readings
                above it, and back to the designed values at `md`. */}
            <p className="reveal-item mt-6 text-[0.88rem] md:text-sm text-white/55 md:text-white/40 leading-relaxed">
              {a.creedAltarUncounted}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
