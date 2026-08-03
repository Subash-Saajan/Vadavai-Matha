"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { stripLocale } from "@/lib/locale";

/* How far up the screen the hero's bottom edge must travel before the bar
   solidifies, as a share of the viewport. At 50% the bar begins its fade once
   the section below the hero has risen to fill half the screen — a touch early,
   so the change has settled by the time that section is fully in view. */
const SOLIDIFY_AT = 50;

/* A slender engraved Latin cross — the wordmark's devotional mark. */
function CrossMark({ className = "" }: { className?: string }) {
  return (
    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" className={className} aria-hidden="true">
      <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* A top-level entry is either a plain link or a group that opens a small panel.
   Groups exist because the bar is full: five slots is all this layout carries
   at the tracking the wordmark wants, and there are a dozen pages. */
type NavLink = { href: string; label: string };
type NavItem = NavLink | { label: string; children: NavLink[] };

const isGroup = (item: NavItem): item is { label: string; children: NavLink[] } =>
  "children" in item;

export function Navbar() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /* Which desktop dropdown is showing, by its label. One at a time. */
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  /* Hrefs are written in their canonical English form; the pathname carries the
     locale prefix on /ta. Compare like for like. */
  const here = stripLocale(pathname);

  useEffect(() => {
    // On a page with a full-bleed hero (the home video), the bar stays
    // transparent over the hero and solidifies as the section beneath it comes
    // up. Elsewhere: the usual short threshold.
    const hero = document.querySelector("[data-nav-hero]");

    if (!hero) {
      const onScroll = () => setScrolled(window.scrollY > 60);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Raising the root's top edge to mid-viewport means the hero stops
    // intersecting once its bottom crosses that line — i.e. once the next
    // section has claimed the lower half of the screen.
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: `-${SOLIDIFY_AT}% 0px 0px 0px` }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);

  /* Escape closes the dropdown, as a menu should. */
  useEffect(() => {
    if (!openGroup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openGroup]);

  const links: NavItem[] = [
    { href: "/", label: t.nav.home },
    { href: "/history", label: t.nav.history },
    { href: "/mass-timings", label: t.nav.mass },
    /* The building and the men who served in it, under the same heading the
       footer already files them under. */
    {
      label: t.footer.shrine,
      /* ⚠ /gallery IS DELIBERATELY NOT HERE (owner's call, August 2026). It was
         added to this panel when the page shipped and taken out again — the bar
         is the site's scarcest surface and the photographs are not what it
         should spend a slot on. The page is reached from the footer's Shrine
         column and from the "Open Gallery" link under the home page's mosaic,
         which is where a reader who wants pictures is already looking. Do not
         put it back without asking. */
      children: [
        { href: "/architecture", label: t.nav.architecture },
        { href: "/priests", label: t.nav.priests },
      ],
    },
    { href: "/contact", label: t.nav.contact },
  ];

  /* Shared with the mobile drawer, where the same links appear flattened. */
  const linkTone = scrolled
    ? "text-navy/70 hover:text-navy"
    : "text-white/80 hover:text-white";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? /* `bg-cream/95` on a phone, `/80` from `md`. The bar carries no
               backdrop-filter below `md` any more — it was the site's only
               per-frame filter that is on screen for the whole of every scroll
               — so the opacity does the work the blur was doing. See the note
               on `.navbar-blur` in globals.css; the two must change together. */
            "navbar-blur bg-cream/95 border-b border-gold/15 md:bg-cream/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
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
              Little Rome
            </span>
            <span
              className={`hidden md:block mt-0.5 text-[0.55rem] tracking-[0.4em] uppercase transition-colors ${
                scrolled ? "text-gold-dark/70" : "text-gold/80"
              }`}
            >
              Our Lady of Assumption
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-2">
          {links.map((l) => {
            // Tamil needs the size back and the tracking gone: 0.72rem through
            // the 66% cut is ~7px, and 0.24em pulls connected Tamil syllables
            // apart into something that reads as broken rather than spaced.
            const face =
              "group relative px-4 py-2 font-display text-[0.72rem] tracking-[0.24em] uppercase ta:text-[0.98rem] ta:tracking-[0.04em] ta:normal-case transition-colors";

            if (!isGroup(l)) {
              return (
                <Link key={l.href} href={l.href} className={`${face} ${linkTone}`}>
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute inset-x-4 bottom-1 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
              );
            }

            const showing = openGroup === l.label;
            /* Standing on one of its pages tints the heading gold, so the bar
               still says where you are once the panel is shut. */
            const inside = l.children.some((c) => here === c.href);

            return (
              <div
                key={l.label}
                className="relative"
                onPointerEnter={() => setOpenGroup(l.label)}
                onPointerLeave={() => setOpenGroup(null)}
                onFocus={() => setOpenGroup(l.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node))
                    setOpenGroup(null);
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenGroup(showing ? null : l.label)}
                  aria-expanded={showing}
                  aria-haspopup="true"
                  className={`${face} flex items-center gap-1.5 ${
                    inside
                      ? scrolled
                        ? "text-gold-dark"
                        : "text-gold"
                      : linkTone
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 relative z-10 transition-transform duration-300 ${
                      showing ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`absolute inset-x-4 bottom-1 h-px bg-gold transition-transform origin-left duration-300 ${
                      showing || inside ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>

                {/* The panel is always cream-on-navy, never transparent — it
                    can open over the hero video, where nothing else is legible.
                    pt-1 bridges the gap so the pointer never leaves the group. */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-1 transition-all duration-300 ${
                    showing
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="min-w-60 navbar-blur bg-cream/95 border border-gold/20 rounded-sm shadow-[0_18px_40px_-24px_rgba(20,28,48,0.55)] py-2">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        /* Without this the panel stays open over the page you
                           just landed on — the pointer never leaves it. */
                        onClick={() => setOpenGroup(null)}
                        className={`block px-5 py-2.5 font-display text-[0.7rem] tracking-[0.2em] uppercase ta:text-[0.95rem] ta:tracking-[0.04em] ta:normal-case transition-colors ${
                          here === c.href
                            ? "text-gold-dark"
                            : "text-navy/75 hover:text-navy hover:bg-gold/10"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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
            /* `p-3` around a 20px icon is a 44px target — Apple's minimum, and
               Android's 48dp is within a hair of it. At `p-2` this was 36px:
               the one control a phone visitor has for the whole site, and the
               easiest thing on the page to miss. */
            className={`lg:hidden p-3 -mr-1 rounded-full ${
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
          open ? "max-h-140" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col">
          {links.map((l) => {
            const row =
              "py-3.5 px-2 text-navy/80 hover:text-gold-dark border-b border-gold/10 last:border-0 font-display text-sm tracking-[0.18em] uppercase ta:text-[1.05rem] ta:tracking-[0.04em] ta:normal-case transition-colors";

            if (!isGroup(l)) {
              return (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={row}>
                  {l.label}
                </Link>
              );
            }

            /* No accordion in the drawer — a drawer is already a list, and two
               children behind another tap would only hide them again. The
               heading names the group; the pages sit under it, indented. */
            return (
              <div key={l.label} className="border-b border-gold/10 last:border-0 py-3">
                <p className="px-2 pt-0.5 pb-1 font-display text-[0.6rem] tracking-[0.32em] uppercase text-gold-dark/70 ta:text-[0.8rem] ta:tracking-[0.04em] ta:normal-case">
                  {l.label}
                </p>
                {l.children.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className={`block pl-5 pr-2 py-2.5 font-display text-sm tracking-[0.18em] uppercase ta:text-[1.05rem] ta:tracking-[0.04em] ta:normal-case transition-colors ${
                      here === c.href
                        ? "text-gold-dark"
                        : "text-navy/80 hover:text-gold-dark"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
