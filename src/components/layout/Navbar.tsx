"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "./LanguageProvider";

/* A slender engraved Latin cross — the wordmark's devotional mark. */
function CrossMark({ className = "" }: { className?: string }) {
  return (
    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/home", label: t.nav.home },
    { href: "/history", label: t.nav.history },
    { href: "/mass-timings", label: t.nav.mass },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "navbar-blur bg-cream/80 border-b border-gold/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/home" className="flex items-center gap-3 group">
          <CrossMark
            className={`transition-all duration-500 group-hover:-translate-y-0.5 ${
              scrolled ? "text-gold-dark" : "text-gold"
            }`}
          />
          <span className="leading-none">
            <span
              className={`block font-display text-[0.95rem] md:text-base tracking-[0.22em] uppercase transition-colors ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              Vadakankulam Matha
            </span>
            <span
              className={`hidden md:block mt-0.5 text-[0.55rem] tracking-[0.45em] uppercase transition-colors ${
                scrolled ? "text-gold-dark/70" : "text-gold/80"
              }`}
            >
              Little Rome
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative px-4 py-2 font-display text-[0.72rem] tracking-[0.24em] uppercase transition-colors ${
                scrolled
                  ? "text-navy/70 hover:text-navy"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-x-4 bottom-1 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          ))}
        </div>

        {/* Right side: lang toggle + mobile menu */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.65rem] font-display uppercase tracking-[0.2em] transition-all ${
              scrolled
                ? "bg-navy/5 text-navy hover:bg-gold hover:text-navy"
                : "bg-white/10 text-white hover:bg-gold hover:text-navy backdrop-blur"
            }`}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "தமிழ்" : "English"}
          </button>

          <button
            onClick={() => setOpen((s) => !s)}
            className={`lg:hidden p-2 rounded-full ${
              scrolled ? "text-navy" : "text-white"
            }`}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out bg-cream border-t border-gold/10 ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3.5 px-2 text-navy/80 hover:text-gold-dark border-b border-gold/10 last:border-0 font-display text-sm tracking-[0.18em] uppercase transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
