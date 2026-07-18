"use client";

import { Phone } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { PHONE } from "@/lib/contact";

/**
 * Shown instead of the form when someone chooses "a sick call".
 *
 * A person whose mother is dying should not be filling in a textarea and
 * waiting for an email to be read. So this purpose has no form at all: it
 * gives them the number, large, and one button that dials it.
 */
export function SickCallPanel() {
  const { t } = useLang();

  return (
    <div className="relative bg-oxblood text-white rounded-2xl shadow-xl ring-1 ring-gold/25 p-10 md:p-14 overflow-hidden">
      <div className="light-shaft absolute -top-10 right-0 w-1/2 h-[140%] -rotate-12" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />

      <div className="relative">
        <p className="font-serif text-3xl md:text-4xl mb-5 leading-tight">
          {t.contact.sickCall.title}
        </p>
        <p className="text-white/70 leading-relaxed max-w-lg">{t.contact.sickCall.body}</p>

        <a
          href={`tel:${PHONE.e164}`}
          className="group mt-10 inline-flex flex-col gap-1"
          aria-label={`${t.contact.sickCall.cta}: ${PHONE.international}`}
        >
          <span className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-gold-light/80">
            {t.contact.sickCall.cta}
          </span>
          <span className="flex items-center gap-4 font-serif text-4xl md:text-5xl tabular-nums text-white group-hover:text-gold-light transition-colors">
            <Phone className="w-7 h-7 shrink-0 text-gold-light" aria-hidden="true" />
            {PHONE.display}
          </span>
        </a>
      </div>
    </div>
  );
}
