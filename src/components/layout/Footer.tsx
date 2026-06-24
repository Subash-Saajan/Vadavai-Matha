"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <svg width="14" height="22" viewBox="0 0 13 20" fill="none" className="text-gold" aria-hidden="true">
              <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="font-display text-2xl tracking-[0.16em] uppercase">
              Vadakankulam Matha
            </span>
          </div>
          <p className="text-[0.6rem] tracking-[0.45em] uppercase text-gold/80 mb-5 ml-7">
            Little Rome
          </p>
          <p className="text-white/55 max-w-sm leading-relaxed font-serif text-lg">
            {t.footer.tagline}
          </p>
        </div>

        <div>
          <p className="font-display text-[0.65rem] uppercase tracking-[0.32em] text-gold mb-5">
            {t.footer.explore}
          </p>
          <ul className="space-y-2.5 text-white/65 text-sm">
            <li><Link href="/history" className="hover:text-gold transition-colors">{t.nav.history}</Link></li>
            <li><Link href="/mass-timings#festivals" className="hover:text-gold transition-colors">{t.nav.festivals}</Link></li>
            <li><Link href="/gallery" className="hover:text-gold transition-colors">{t.nav.gallery}</Link></li>
            <li><Link href="/mass-timings" className="hover:text-gold transition-colors">{t.nav.mass}</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-[0.65rem] uppercase tracking-[0.32em] text-gold mb-5">
            {t.footer.connect}
          </p>
          <ul className="space-y-2.5 text-white/65 text-sm">
            <li><Link href="/contact" className="hover:text-gold transition-colors">{t.nav.contact}</Link></li>
            <li className="text-white/45 leading-relaxed">{t.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Vadakankulam Matha Church · {t.footer.rights}</p>
          <p className="font-serif italic text-white/55">In faith, in stillness, in light.</p>
        </div>
      </div>
    </footer>
  );
}
