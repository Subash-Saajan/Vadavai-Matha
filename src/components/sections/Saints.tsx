"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/components/LocaleLink";
import { ResidentImage } from "@/components/ResidentImage";
import {
  gsap,
  revealY,
  revealStart,
  revealDuration,
  revealDelay,
} from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";

export function Saints() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const from = revealY();
      const reveal = (el: Element, delay = 0) =>
        gsap.fromTo(
          el,
          { y: from, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(1),
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 88%"),
              toggleActions: "play none none none",
            },
          }
        );

      headerRef.current
        ?.querySelectorAll(".reveal-item")
        .forEach((el, i) => reveal(el, revealDelay(i, 0.1)));

      gridRef.current
        ?.querySelectorAll(".saint-card")
        .forEach((el, i) => reveal(el, revealDelay(i, 0.15)));
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  const list = t.saints.list;

  return (
    <section
      id="saints"
      ref={sectionRef}
      className="section-padding bg-cream parchment-sheen relative overflow-hidden scroll-mt-24"
    >
      <div className="light-shaft absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[90%]" />

      <div className="relative max-w-4xl mx-auto">
        <div ref={headerRef} className="relative text-center max-w-2xl mx-auto mb-14">
          {/* V, not III — the Chronicle and the Fathers now stand between this
              section and the About. See the running order in the home page. */}
          <span className="section-numeral pointer-events-none absolute left-1/2 -translate-x-1/2 -top-24 text-[10rem] opacity-[0.06] select-none">
            V
          </span>
          <p className="reveal-item kicker justify-center mb-5">{t.saints.label}</p>
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl text-navy leading-[1.05] mb-6">
            {t.saints.title}
          </h2>
          <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
            {t.saints.intro}
          </p>
        </div>

        {/* ── TWO CARDS, SIDE BY SIDE ON A PHONE TOO ───────────────────────
            This was `grid-cols-1` until `sm`, so on a phone the two saints were
            full-width 3:4 portraits stacked — about 930px of card on a screen
            with 745px of viewport. Two men the page mentions in passing were
            taking up more room than the Chronicle, the Fathers or the parish
            calendar, purely because nobody had told the grid what to do below
            640px.

            Two-across is also simply the better composition for portraits:
            they read as a pair of framed pictures rather than as two posters
            queueing. Same 3:4 crop, so no face is cut differently — the card
            is just a third of the height.

            ⚠ THE CARD LOSES ITS PARAGRAPH BELOW `sm`, ON PURPOSE. At roughly
            164px wide there is no honest way to set three lines of body copy
            plus a name plus an epithet plus a date — it would be the 9px type
            this whole pass exists to remove. So the phone card carries the
            portrait, the name, the epithet and the feast, which is what a
            thumbnail is for; the paragraph is one tap away on the saint's own
            page, and the whole card has been that tap target since the arrow
            was added. */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:gap-7 md:gap-8">
          {list.map((s, i) => (
            <Link
              key={i}
              href={s.href}
              aria-label={s.name}
              className="saint-card group relative block aspect-3/4 rounded-2xl overflow-hidden bg-navy ring-1 ring-gold/20 shadow-xl sm:rounded-3xl"
            >
              {/* Portrait fills the whole card — the photo holder */}
              <ResidentImage
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 640px) 50vw, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Legibility + mood: darken the lower third, warm bloom up top */}
              <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/55 to-navy/5" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(196,160,73,0.18),transparent_60%)]" />

              {/* The feast tag is a floating pill from `sm` up. On the narrow
                  card it would be a nowrap date across a 164px box, so below
                  `sm` it moves into the caption block instead — see below. */}
              <p className="absolute top-4 left-1/2 hidden -translate-x-1/2 font-display text-[0.56rem] uppercase tracking-[0.3em] text-gold/90 bg-navy/40 backdrop-blur-sm px-3 py-1 rounded-full ring-1 ring-gold/25 whitespace-nowrap sm:block">
                {s.feast}
              </p>

              {/* Overlaid content */}
              <div className="absolute inset-x-0 bottom-0 p-3 text-center sm:p-6 md:p-7">
                <h3 className="text-[0.98rem] sm:text-xl md:text-2xl font-serif text-white leading-tight mb-1 sm:mb-1.5 transition-colors duration-500 group-hover:text-gold">
                  {s.name}
                </h3>
                <p className="text-[0.72rem] sm:text-xs italic text-gold/75 mb-2 sm:mb-3 font-serif">
                  {s.epithet}
                </p>
                <div className="w-10 h-px bg-gold/40 mx-auto mb-2 sm:mb-3" />

                {/* The feast, on the phone card only — it replaces both the
                    floating pill above and the paragraph, so the date survives
                    at a size somebody can read. */}
                <p className="font-display text-[0.62rem] uppercase tracking-widest text-gold/85 sm:hidden">
                  {s.feast}
                </p>

                <p className="hidden text-white/75 text-sm leading-relaxed line-clamp-3 sm:block">
                  {s.body}
                </p>
                {/* ⚠ VISIBLE AT REST ON TOUCH. This was `text-gold/0` until
                    hover — and a phone has no hover, so the only thing telling
                    the reader these cards are doors was invisible on the device
                    where the whole card is the tap target. It stays a hover
                    reveal from `md` up, where a pointer exists to reveal it,
                    and is hidden entirely on the narrow card, where the arrow
                    would cost more height than it earns. */}
                <span className="mt-4 hidden items-center gap-1.5 font-display text-[0.6rem] uppercase tracking-[0.25em] text-gold/80 transition-colors duration-500 sm:inline-flex md:text-gold/0 md:group-hover:text-gold/90">
                  {t.saints.readMore}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Hover gold edge + corner serifs */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-all duration-700" />
              <span className="pointer-events-none absolute top-3.5 left-3.5 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
              <span className="pointer-events-none absolute bottom-3.5 right-3.5 w-5 h-5 border-b border-r border-gold/0 group-hover:border-gold/50 transition-colors duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
