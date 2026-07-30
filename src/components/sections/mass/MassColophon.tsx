"use client";

import { useRef } from "react";
import { Phone } from "lucide-react";

import { useLang } from "@/components/layout/LanguageProvider";
import { useReveal } from "@/hooks/useReveal";
import { PHONE } from "@/lib/contact";

/**
 * The closing note — not a call to action.
 *
 * /architecture ends on a Colophon rather than a "come and see" panel, at the
 * owner's request, and this page ends the same way. What it does carry is the
 * one practical caveat every time on this page is subject to: hours move for a
 * feast or a funeral, and someone travelling four hours to get here should be
 * told to ring first. The telephone number is the site's single source (PHONE
 * in lib/contact.ts) — never retyped.
 */
export function MassColophon() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useLang();
  const c = t.mass.colophon;

  useReveal(ref, lang);

  /* `py-20` was 80px of cream above and below on a phone as well as on a
     monitor, and this is the last thing on a page that is already long. The
     padding is hard-coded here rather than taken from `.section-padding`, so
     that utility's own mobile block never reached this section. */
  return (
    <section ref={ref} className="parchment-sheen relative overflow-hidden bg-cream px-6 py-14 md:py-28">
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="cross-rule reveal-item mx-auto mb-7 max-w-xs md:mb-9">
          <span className="text-lg text-gold">✦</span>
        </div>

        <p className="reveal-item ui-label text-gold-dark">
          {c.lead}
        </p>
        <p className="reveal-item mt-5 font-serif text-[1.08rem] leading-relaxed text-navy/80 md:text-2xl">
          {c.body}
        </p>

        {/* The button already clears the touch floor at `min-h-12` (48px). What
            was too small was the NUMBER inside it — 14px, on the one control on
            this page a pilgrim uses when the times here might not hold. It is
            read aloud off the screen as often as it is tapped. */}
        <a
          href={`tel:${PHONE.e164}`}
          className="reveal-item group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-navy px-7 text-white transition-colors duration-500 hover:bg-gold hover:text-navy md:mt-9"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span className="ui-label">{t.contact.actions.call}</span>
          <span className="text-[0.95rem] font-medium tabular-nums md:text-sm">
            {PHONE.display}
          </span>
        </a>
      </div>
    </section>
  );
}
