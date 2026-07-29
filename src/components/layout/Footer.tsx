"use client";

import { Link } from "@/components/LocaleLink";
import { useLang } from "./LanguageProvider";
// Never retype the phone number. NAP consistency is what lets Google and AI
// assistants merge every mention of this shrine into a single place.
import { PHONE } from "@/lib/contact";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative cathedral-depth text-white overflow-hidden">
      {/* Warm ember glow rising from the seam */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-gold/10 blur-3xl pointer-events-none animate-ember" />
      <div className="light-shaft absolute -top-10 right-[8%] w-[40%] h-[120%] -rotate-12" />

      {/* top hairline */}
      <div className="relative h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12">
        {/* At md the brand takes its own full row above the three columns; at
            lg it becomes the first of four equal twelfths-of-three. */}
        <div className="md:col-span-3 lg:col-span-3">
          <div className="flex items-center gap-3 mb-2">
            <svg width="14" height="22" viewBox="0 0 13 20" fill="none" className="text-gold" aria-hidden="true">
              <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="font-display text-2xl tracking-[0.16em] uppercase">
              Little Rome
            </span>
          </div>
          <p className="text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-5 ml-7">
            Our Lady of Assumption
          </p>
          <p className="text-white/75 max-w-sm leading-relaxed font-serif text-lg">
            {t.footer.tagline}
          </p>
        </div>

        {/* 1 — the story. Who we are and how we got here. */}
        <div className="lg:col-span-3">
          <p className="font-display text-[0.65rem] uppercase tracking-[0.32em] text-gold mb-5">
            {t.footer.shrine}
          </p>
          <ul className="space-y-2.5 text-white/80 text-sm">
            <li><Link href="/history" className="hover:text-gold transition-colors">{t.nav.history}</Link></li>
            {/* /priests was reachable from nowhere on this site until July 2026
                — not the navbar, not here, not one link on one page. It has a
                section on the home page now; this is its second way in. */}
            <li><Link href="/priests" className="hover:text-gold transition-colors">{t.nav.priests}</Link></li>
            <li><Link href="/architecture" className="hover:text-gold transition-colors">{t.nav.architecture}</Link></li>
            {/* Both saint pages had the same problem /priests did: reachable
                only from a card on the home page. */}
            <li><Link href="/saints/john-de-britto" className="hover:text-gold transition-colors">{t.nav.britto}</Link></li>
            <li><Link href="/saints/devasahayam-pillai" className="hover:text-gold transition-colors">{t.nav.devasahayam}</Link></li>
          </ul>
        </div>

        {/* 2 — the practical column. Everything a pilgrim planning a trip needs. */}
        <div className="lg:col-span-3">
          <p className="font-display text-[0.65rem] uppercase tracking-[0.32em] text-gold mb-5">
            {t.footer.visit}
          </p>
          <ul className="space-y-2.5 text-white/80 text-sm">
            <li><Link href="/mass-timings" className="hover:text-gold transition-colors">{t.nav.mass}</Link></li>
            <li><Link href="/mass-timings#festivals" className="hover:text-gold transition-colors">{t.nav.festivals}</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">{t.nav.contact}</Link></li>
            <li>
              <a
                href={`tel:${PHONE.e164}`}
                className="hover:text-gold transition-colors tabular-nums"
              >
                {PHONE.display}
              </a>
            </li>
            <li className="text-white/60 leading-relaxed">{t.contact.address}</li>
          </ul>
        </div>

        {/* 3 — where the claims come from. Sources, answers, and the people who
            found the documents. Provenance kept apart from devotion on purpose. */}
        <div className="lg:col-span-3">
          <p className="font-display text-[0.65rem] uppercase tracking-[0.32em] text-gold mb-5">
            {t.footer.record}
          </p>
          <ul className="space-y-2.5 text-white/80 text-sm">
            <li><Link href="/sources" className="hover:text-gold transition-colors">{t.nav.sources}</Link></li>
            <li><Link href="/faq" className="hover:text-gold transition-colors">{t.nav.faq}</Link></li>
            {/* Beside the sources they made findable, not in a column of their
                own — /sources names the documents, this names the people. */}
            <li><Link href="/acknowledgements" className="hover:text-gold transition-colors">{t.nav.acknowledgements}</Link></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {year} Vadakankulam Matha Church · {t.footer.rights}</p>
          <p className="font-serif italic text-white/75">In faith, in stillness, in light.</p>
          {/* Builder credit only — no claim over the content, which belongs to
              the parish. nofollow keeps a site-wide outbound footer link from
              reading as a link scheme to Google. */}
          <p className="text-[0.65rem] text-white/35">
            {t.footer.builtBy}{" "}
            <a
              href="https://subashsaajan.site"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-gold transition-colors"
            >
              Subash Saajan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
