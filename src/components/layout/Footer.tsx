"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Soft gold glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="font-serif text-2xl tracking-wide">
              Vadakankulam Matha
            </span>
          </div>
          <p className="text-white/60 max-w-sm leading-relaxed">{t.footer.tagline}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
            {t.footer.explore}
          </p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link href="/history" className="hover:text-gold transition-colors">{t.nav.history}</Link></li>
            <li><Link href="/festivals" className="hover:text-gold transition-colors">{t.nav.festivals}</Link></li>
            <li><Link href="/gallery" className="hover:text-gold transition-colors">{t.nav.gallery}</Link></li>
            <li><Link href="/mass-timings" className="hover:text-gold transition-colors">{t.nav.mass}</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
            {t.footer.connect}
          </p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link href="/contact" className="hover:text-gold transition-colors">{t.nav.contact}</Link></li>
            <li className="text-white/50">{t.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Vadakankulam Matha Church · {t.footer.rights}</p>
          <p className="font-serif italic">In faith, in stillness, in light.</p>
        </div>
      </div>
    </footer>
  );
}
