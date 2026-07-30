"use client";

import { useRef } from "react";
import { useLang } from "@/components/layout/LanguageProvider";
import { PURPOSES, URGENT_PURPOSE, type Purpose } from "@/lib/contact";

/**
 * "Why have you come?" — the page's spine, now printed at the head of the form
 * rather than standing as a section of its own.
 *
 * The visitor answers the question in a sentence: *I have come to offer a
 * Mass.* The seven purposes are the seven clauses that can complete it, set
 * beneath in inscriptional caps; touching one typesets it into the line and
 * reshapes the fieldset directly below. Nothing scrolls, nothing appears from
 * nowhere — the form is already there, asking to be filled in.
 *
 * Under the surface it is a real ARIA radiogroup with roving tabindex: one Tab
 * stop, arrow keys between the words. It is labelled by the section's own
 * heading, which is the question it answers.
 */
export function PurposeSelector({
  value,
  onChange,
  labelledBy,
}: {
  value: Purpose;
  onChange: (p: Purpose) => void;
  /** id of the heading this radiogroup answers. */
  labelledBy: string;
}) {
  const { t } = useLang();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = t.contact.purpose;

  const labels: Record<Purpose, { title: string; note: string; phrase: string }> = {
    visit: { title: p.visit, note: p.visitNote, phrase: p.visitPhrase },
    "mass-intention": {
      title: p.massIntention,
      note: p.massIntentionNote,
      phrase: p.massIntentionPhrase,
    },
    sacrament: { title: p.sacrament, note: p.sacramentNote, phrase: p.sacramentPhrase },
    certificate: { title: p.certificate, note: p.certificateNote, phrase: p.certificatePhrase },
    "sick-call": { title: p.sickCall, note: p.sickCallNote, phrase: p.sickCallPhrase },
    offering: { title: p.offering, note: p.offeringNote, phrase: p.offeringPhrase },
    other: { title: p.other, note: p.otherNote, phrase: p.otherPhrase },
  };

  /** Arrow keys move the selection, as in any native radio group. */
  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    const forward = e.key === "ArrowRight" || e.key === "ArrowDown";
    const next = (index + (forward ? 1 : -1) + PURPOSES.length) % PURPOSES.length;
    onChange(PURPOSES[next]);
    refs.current[next]?.focus();
  }

  const activeIndex = PURPOSES.indexOf(value);
  const urgent = value === URGENT_PURPOSE;

  return (
    <div className="text-center">
      {/* The sentence. The clause carries the gold; the words around it stay
          navy. Held to a readable measure — the section is far wider. */}
      <p className="reveal mx-auto max-w-3xl font-serif text-navy text-2xl md:text-4xl leading-[1.25] text-balance">
        {p.sentenceLead}{" "}
        <span
          /* Remounting on every change replays the swap. */
          key={value}
          className={`clause-swap relative inline-block transition-colors duration-500 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-linear-to-r after:from-transparent after:to-transparent ${
            urgent ? "text-oxblood after:via-oxblood" : "text-gold-dark after:via-gold"
          }`}
        >
          {labels[value].phrase}
        </span>
        {p.sentenceTail && ` ${p.sentenceTail}`}.
      </p>

      {/* The seven clauses. */}
      {/* SEVEN TAP TARGETS THAT WRAP ONTO FOUR ROWS ON A PHONE, and they are
          how a pilgrim tells the parish what they want. Two things had to give:

          · the labels were `text-[0.66rem] tracking-[0.2em]` — 10.6px of
            Cinzel caps carrying a fifth of their width in air. Larger and
            tighter is more legible and NARROWER, so more of the seven fit per
            row and fewer rows are needed.
          · `gap-y-1` is 4px between rows of stacked 44px targets. The targets
            themselves are compliant, but 4px between two of them is inside the
            slop of a moving thumb, and choosing "a sick call" by accident is a
            worse mistake here than on any other page. 6px on mobile.

          Both revert at `md`, where the row fits on one line anyway. */}
      <div
        role="radiogroup"
        aria-labelledby={labelledBy}
        className="reveal mt-8 flex flex-wrap items-center justify-center gap-y-1.5 md:gap-y-1"
      >
        {PURPOSES.map((purpose, i) => {
          const selected = value === purpose;
          const isUrgent = purpose === URGENT_PURPOSE;

          return (
            <div key={purpose} className="flex items-center">
              <button
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={i === activeIndex ? 0 : -1}
                onClick={() => onChange(purpose)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`group relative min-h-11 px-3 md:px-3.5 py-2 font-display text-[0.72rem] tracking-[0.1em] md:text-[0.66rem] md:tracking-[0.2em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:rounded-sm ${
                  isUrgent
                    ? selected
                      ? "text-oxblood"
                      : "text-oxblood/70 hover:text-oxblood"
                    : selected
                      ? "text-navy"
                      : "text-text-muted hover:text-navy"
                }`}
              >
                {labels[purpose].title}

                {/* The rule beneath a word draws itself in on hover and stays
                    struck once the word is in the sentence. */}
                <span
                  aria-hidden="true"
                  /* Inset must track the button's own horizontal padding, or
                     the rule under a chosen word overhangs it. */
                  className={`absolute inset-x-3 md:inset-x-3.5 bottom-1.5 origin-center transition-transform duration-300 ease-out ${
                    isUrgent ? "bg-oxblood" : "bg-gold"
                  } ${selected ? "h-0.5 scale-x-100" : "h-px scale-x-0 group-hover:scale-x-100"}`}
                />
              </button>

              {i < PURPOSES.length - 1 && (
                <span aria-hidden="true" className="text-gold/40 text-[0.55rem] md:text-[0.5rem] select-none">
                  ✦
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* What the chosen clause means in practice. Cormorant, so it sits a
          step above the sans on a phone rather than level with it. */}
      <p
        className={`mt-7 font-serif text-[1.05rem] md:text-xl leading-snug ${
          urgent ? "text-oxblood" : "text-text-muted"
        }`}
      >
        {labels[value].note}
      </p>
    </div>
  );
}
