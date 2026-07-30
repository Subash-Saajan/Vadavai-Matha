"use client";

import { Link } from "@/components/LocaleLink";
import { useLang } from "./LanguageProvider";
// Never retype the phone number. NAP consistency is what lets Google and AI
// assistants merge every mention of this shrine into a single place.
import { PHONE } from "@/lib/contact";

/* ── The three navigation columns, set once ───────────────────────────────
   Repeated verbatim three times before, which is how the 10.4px column heads
   came to be 10.4px in three places. The mobile corrections are the two
   defects the footer had, and they are the two every footer has:

   1. THE HEADS WERE 10.4px. `text-[0.65rem]` with `tracking-[0.32em]` is
      Cinzel caps under the 12px floor with a third of an em of air after each
      letter — "The Shrine" reads as spaced-out shapes on a phone. Up a step,
      tracking down to pay for the width.
   2. THE LINKS WERE NOT TAP TARGETS. 14px text on `space-y-2.5` gives a row
      about 21px tall with a 10px gutter: eleven links, none of them reaching
      half of the 44px minimum, stacked close enough that a thumb lands
      between two of them. One of those links is the parish TELEPHONE NUMBER,
      which is the single most consequential thing in this footer.

      The fix is `py-2` on the anchor itself, NOT on the `<li>` — the padded
      box has to be the link's own box or the space around the words is dead.
      Row spacing drops to `space-y-1` at the same time, because the padding
      supplies the separation and leaving both would only push the columns
      down the page. 15px text + 16px of padding is a ~53px target on a 4px
      gutter, which no longer overlaps its neighbour. Desktop restores
      `py-0` / `space-y-2.5` / 14px exactly. */
const COL_HEAD =
  "font-display text-[0.72rem] tracking-[0.18em] md:text-[0.65rem] md:tracking-[0.32em] uppercase text-gold mb-4 md:mb-5";
const COL_LIST =
  "space-y-1 md:space-y-2.5 text-white/80 text-[0.95rem] md:text-sm";
const COL_LINK =
  "inline-block py-2 md:py-0 hover:text-gold transition-colors";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative cathedral-depth text-white overflow-hidden">
      {/* Warm ember glow rising from the seam.
          `hidden md:block` below the breakpoint, and it is the same finding as
          the Patroness halo: `animate-ember` is a 6s `infinite` keyframe on a
          680px circle carrying `blur-3xl`, so a phone re-rasterises a 64px
          gaussian over an area larger than its own screen, forever, on every
          page of the site — the footer is in every layout, and an animation
          does not stop when it scrolls out of view. At 680px against a 390px
          viewport almost none of the shape is visible anyway; what reads on a
          phone is a faint warm cast, which the `.light-shaft` beside it still
          gives for the cost of a static gradient. */}
      <div className="hidden md:block absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-gold/10 blur-3xl pointer-events-none animate-ember" />
      <div className="light-shaft absolute -top-10 right-[8%] w-[40%] h-[120%] -rotate-12" />

      {/* top hairline */}
      <div className="relative h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-10 md:gap-12">
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
          {/* 0.6rem is 9.6px, and it was 9.6px on a phone too — the dedication
              under the wordmark, the line that says whose shrine this is, set
              smaller than any legibility floor and then pulled apart by 0.4em
              on the narrowest screen we serve. Up to 10.9px and the tracking
              comes in to pay for the width, so the line does not get longer. */}
          <p className="text-[0.68rem] tracking-[0.2em] md:text-[0.6rem] md:tracking-[0.4em] uppercase text-gold mb-5 ml-7">
            Our Lady of Assumption
          </p>
          <p className="text-white/75 max-w-sm leading-relaxed font-serif text-[1.05rem] md:text-lg">
            {t.footer.tagline}
          </p>
        </div>

        {/* 1 — the story. Who we are and how we got here. */}
        <div className="lg:col-span-3">
          <p className={COL_HEAD}>
            {t.footer.shrine}
          </p>
          <ul className={COL_LIST}>
            <li><Link href="/history" className={COL_LINK}>{t.nav.history}</Link></li>
            {/* /priests was reachable from nowhere on this site until July 2026
                — not the navbar, not here, not one link on one page. It has a
                section on the home page now; this is its second way in. */}
            <li><Link href="/priests" className={COL_LINK}>{t.nav.priests}</Link></li>
            <li><Link href="/architecture" className={COL_LINK}>{t.nav.architecture}</Link></li>
            {/* Both saint pages had the same problem /priests did: reachable
                only from a card on the home page. */}
            <li><Link href="/saints/john-de-britto" className={COL_LINK}>{t.nav.britto}</Link></li>
            <li><Link href="/saints/devasahayam-pillai" className={COL_LINK}>{t.nav.devasahayam}</Link></li>
          </ul>
        </div>

        {/* 2 — the practical column. Everything a pilgrim planning a trip needs. */}
        <div className="lg:col-span-3">
          <p className={COL_HEAD}>
            {t.footer.visit}
          </p>
          <ul className={COL_LIST}>
            <li><Link href="/mass-timings" className={COL_LINK}>{t.nav.mass}</Link></li>
            <li><Link href="/mass-timings#festivals" className={COL_LINK}>{t.nav.festivals}</Link></li>
            <li><Link href="/contact" className={COL_LINK}>{t.nav.contact}</Link></li>
            <li>
              {/* The one link in this footer a pilgrim taps while standing in a
                  road. It gets the same padded target as the rest. */}
              <a
                href={`tel:${PHONE.e164}`}
                className={`${COL_LINK} tabular-nums`}
              >
                {PHONE.display}
              </a>
            </li>
            {/* Not a link, so it carries its own top space back — `space-y-1`
                assumes the padded anchors above are supplying the gutter. */}
            <li className="pt-2 md:pt-0 text-white/60 leading-relaxed">{t.contact.address}</li>
          </ul>
        </div>

        {/* 3 — where the claims come from. Sources, answers, and the people who
            found the documents. Provenance kept apart from devotion on purpose. */}
        <div className="lg:col-span-3">
          <p className={COL_HEAD}>
            {t.footer.record}
          </p>
          <ul className={COL_LIST}>
            <li><Link href="/sources" className={COL_LINK}>{t.nav.sources}</Link></li>
            <li><Link href="/faq" className={COL_LINK}>{t.nav.faq}</Link></li>
            {/* Beside the sources they made findable, not in a column of their
                own — /sources names the documents, this names the people. */}
            <li><Link href="/acknowledgements" className={COL_LINK}>{t.nav.acknowledgements}</Link></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        {/* The small print, which on a phone was the smallest type on the site
            after the footer heads: 12px for the copyright and 10.4px at 35%
            white for the credit. Contrast and size compound — 10.4px at
            35% opacity over a near-black ground is not quiet, it is absent.
            Both go up a step below `md` and the credit's ink comes up with it;
            desktop keeps 12px / 10.4px / 35% unchanged. */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[0.78rem] md:text-xs text-white/60">
          <p>© {year} Vadakankulam Matha Church · {t.footer.rights}</p>
          <p className="font-serif italic text-white/75">In faith, in stillness, in light.</p>
          {/* Builder credit only — no claim over the content, which belongs to
              the parish. nofollow keeps a site-wide outbound footer link from
              reading as a link scheme to Google. */}
          <p className="text-[0.72rem] md:text-[0.65rem] text-white/55 md:text-white/35">
            {t.footer.builtBy}{" "}
            <a
              href="https://subashsaajan.site"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-block py-2 md:py-0 hover:text-gold transition-colors"
            >
              Subash Saajan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
