"use client";

import { Phone, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import {
  PHONE,
  PARISH_PRIEST,
  RELIGIOUS_HOUSES,
  DIOCESE,
  ADDRESS,
} from "@/lib/contact";

/**
 * Whom to call, and — just as important — whom NOT to call.
 *
 * A register of names on ruled lines rather than a grid of cards. The parish
 * office is the opening entry; the rest follow beneath it. The three religious
 * houses are set apart at the foot, clearly labelled as *not* the parish
 * office, because pilgrims routinely dial a convent looking for the priest —
 * which also keeps the parish's NAP unambiguous.
 *
 * The parish priest has no published mobile. We do not invent one.
 */

function Entry({
  label,
  name,
  note,
  phone,
  e164,
  href,
  cta,
  lead = false,
}: {
  label: string;
  name: string;
  note?: string;
  phone?: string;
  e164?: string;
  href?: string;
  cta?: string;
  lead?: boolean;
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 px-6 md:px-8 ${lead ? "py-8" : "py-6"}`}>
      <p className="md:w-40 shrink-0 font-display text-[0.58rem] uppercase tracking-[0.3em] text-gold-dark">
        {label}
      </p>

      <div className="flex-1 min-w-0">
        <p className={`font-serif text-navy leading-snug ${lead ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {name}
        </p>
        {note && <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{note}</p>}
        {href && cta && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm text-gold-dark hover:text-navy transition-colors"
          >
            {cta}
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </a>
        )}
      </div>

      {phone && e164 && (
        <a
          href={`tel:${e164}`}
          className={`group shrink-0 inline-flex items-center gap-2.5 tabular-nums transition-colors ${
            lead ? "text-gold-dark hover:text-navy text-2xl md:text-3xl" : "text-navy hover:text-gold-dark text-lg"
          }`}
        >
          <Phone className={lead ? "w-5 h-5" : "w-4 h-4"} aria-hidden="true" />
          {phone}
        </a>
      )}
    </div>
  );
}

export function Directory() {
  const { t } = useLang();

  return (
    <section className="section-padding relative overflow-hidden parchment-swell">
      <div className="light-shaft absolute -top-16 -left-10 w-[45%] h-[120%] rotate-6" aria-hidden="true" />
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[11rem] opacity-[0.05] select-none">
        IV
      </span>

      <div className="relative max-w-6xl mx-auto">
        <header className="text-center mb-14 reveal max-w-xl mx-auto">
          <p className="kicker justify-center mb-5">{t.contact.directory.heading}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy leading-snug">
            {t.contact.directory.intro}
          </h2>
        </header>

        <div className="reveal relative bg-white/95 backdrop-blur-sm rounded-2xl ring-1 ring-gold/15 shadow-lg overflow-hidden divide-y divide-gold/12">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent z-10" aria-hidden="true" />

          <Entry
            lead
            label={t.contact.directory.office}
            name={ADDRESS.name}
            note={t.contact.directory.officeNote}
            phone={PHONE.display}
            e164={PHONE.e164}
          />
          <Entry
            label={t.contact.directory.priest}
            name={PARISH_PRIEST}
            note={t.contact.directory.priestNote}
          />
          <Entry
            label={t.contact.directory.chapel}
            name={t.contact.visit.chapel}
            note={t.contact.directory.chapelNote}
          />
          <Entry
            label={t.contact.directory.diocese}
            name={DIOCESE.name}
            note={`${DIOCESE.address} · ${t.contact.directory.dioceseNote}`}
            href={DIOCESE.contactUrl}
            cta={t.contact.directory.dioceseCta}
          />
        </div>

        {/* Set apart, dimmer, and labelled as not the parish. */}
        <div className="reveal mt-8 pl-6 border-l-2 border-gold/25">
          <p className="font-display text-[0.58rem] uppercase tracking-[0.3em] text-navy/50 mb-4">
            {t.contact.directory.houses}
          </p>
          <ul className="space-y-3">
            {RELIGIOUS_HOUSES.map((h) => (
              <li key={h.name} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                <span className="text-[0.9rem] text-navy/70 leading-snug">{h.name}</span>
                <a
                  href={`tel:${h.e164}`}
                  className="text-sm text-text-muted hover:text-gold-dark transition-colors tabular-nums shrink-0"
                >
                  {h.phone}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.72rem] text-text-muted/90 leading-relaxed italic max-w-lg">
            {t.contact.directory.housesNote}
          </p>
        </div>
      </div>
    </section>
  );
}
