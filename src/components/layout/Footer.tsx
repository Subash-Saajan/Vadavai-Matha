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

      The fix is padding on the anchor itself, NOT on the `<li>` — the padded
      box has to be the link's own box or the space around the words is dead.
      Row spacing drops to `space-y-0.5` at the same time, because the padding
      supplies the separation and leaving both would only push the columns
      down the page. Desktop restores `py-0` / `space-y-2.5` / 14px exactly.

   The mobile column now runs at 13.6px on `py-1.5`: a ~33px target on a 2px
   gutter. Under the 44px guideline and deliberately so — the footer moved to
   two columns to stop being a full screen of scrolling, and a 53px row eleven
   times over is most of what made it that tall. 33px with clear separation is
   the trade; the phone number keeps the taller target below, because that one
   gets tapped from a roadside. */
const COL_HEAD =
  "font-display text-[0.7rem] tracking-[0.14em] md:text-[0.65rem] md:tracking-[0.32em] uppercase text-gold mb-2.5 md:mb-5";
const COL_LIST =
  "space-y-0.5 md:space-y-2.5 text-white/80 text-[0.85rem] md:text-sm";
const COL_LINK =
  "inline-block py-1.5 md:py-0 hover:text-gold transition-colors";

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

      {/* Two columns on a phone, not one. Stacked, the four blocks ran to
          roughly a screen and a half of nothing but links — you scrolled past
          the footer the way you scroll past a page. Paired, the whole thing
          fits inside one viewport.

          The placement is explicit rather than left to auto-flow: the story
          column is the tall one (five links), so it takes both rows of the
          left side and Visit / The Record stack down the right. Auto-flow
          would have put The Record back under the story column and left a
          ragged hole. All of it is `md:`-reset — the 3-across and 12-across
          desktop grids are untouched. */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-9 md:py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-x-6 gap-y-7 md:gap-12">
        {/* At md the brand takes its own full row above the three columns; at
            lg it becomes the first of four equal twelfths-of-three. */}
        <div className="col-span-2 md:col-span-3 lg:col-span-3">
          <div className="flex items-center gap-3 mb-1.5 md:mb-2">
            <svg width="14" height="22" viewBox="0 0 13 20" fill="none" className="text-gold" aria-hidden="true">
              <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="font-display text-xl md:text-2xl tracking-[0.16em] uppercase">
              Little Rome
            </span>
          </div>
          {/* 0.6rem is 9.6px, and it was 9.6px on a phone too — the dedication
              under the wordmark, the line that says whose shrine this is, set
              smaller than any legibility floor and then pulled apart by 0.4em
              on the narrowest screen we serve. Up to 10.9px and the tracking
              comes in to pay for the width, so the line does not get longer. */}
          <p className="text-[0.68rem] tracking-[0.2em] md:text-[0.6rem] md:tracking-[0.4em] uppercase text-gold mb-3 md:mb-5 ml-7">
            Our Lady of Assumption
          </p>
          <p className="text-white/75 max-w-sm leading-relaxed font-serif text-[0.95rem] md:text-lg">
            {t.footer.tagline}
          </p>
        </div>

        {/* 1 — the story. Who we are and how we got here. The five-link column,
            so on a phone it holds the whole left side. */}
        <div className="row-span-2 md:row-span-1 lg:col-span-3">
          <p className={COL_HEAD}>
            {t.footer.shrine}
          </p>
          <ul className={COL_LIST}>
            <li><Link href="/history" className={COL_LINK}>{t.nav.history}</Link></li>
            <li><Link href="/miracle" className={COL_LINK}>{t.nav.miracle}</Link></li>
            {/* /priests was reachable from nowhere on this site until July 2026
                — not the navbar, not here, not one link on one page. It has a
                section on the home page now; this is its second way in. */}
            <li><Link href="/priests" className={COL_LINK}>{t.nav.priests}</Link></li>
            <li><Link href="/architecture" className={COL_LINK}>{t.nav.architecture}</Link></li>
            <li><Link href="/gallery" className={COL_LINK}>{t.nav.gallery}</Link></li>
            {/* Both saint pages had the same problem /priests did: reachable
                only from a card on the home page. */}
            <li><Link href="/saints/john-de-britto" className={COL_LINK}>{t.nav.britto}</Link></li>
            <li><Link href="/saints/devasahayam-pillai" className={COL_LINK}>{t.nav.devasahayam}</Link></li>
          </ul>
        </div>

        {/* 2 — the practical column. Everything a pilgrim planning a trip needs. */}
        <div className="col-start-2 md:col-start-auto lg:col-span-3">
          <p className={COL_HEAD}>
            {t.footer.visit}
          </p>
          <ul className={COL_LIST}>
            <li><Link href="/mass-timings" className={COL_LINK}>{t.nav.mass}</Link></li>
            <li><Link href="/mass-timings#festivals" className={COL_LINK}>{t.nav.festivals}</Link></li>
            <li><Link href="/contact" className={COL_LINK}>{t.nav.contact}</Link></li>
            <li>
              {/* The one link in this footer a pilgrim taps while standing in a
                  road. It keeps the full-size target the rest of the column
                  gave up, which is why the padding is spelled out here instead
                  of coming from COL_LINK. */}
              <a
                href={`tel:${PHONE.e164}`}
                className="inline-block py-2.5 md:py-0 hover:text-gold transition-colors tabular-nums"
              >
                {PHONE.display}
              </a>
            </li>
            {/* Not a link, so it carries its own top space back — `space-y-0.5`
                assumes the padded anchors above are supplying the gutter. */}
            <li className="pt-1.5 md:pt-0 text-[0.78rem] md:text-sm text-white/60 leading-relaxed">{t.contact.address}</li>
          </ul>
        </div>

        {/* 3 — where the claims come from. Sources, answers, and the people who
            found the documents. Provenance kept apart from devotion on purpose. */}
        <div className="col-start-2 md:col-start-auto lg:col-span-3">
          <p className={COL_HEAD}>
            {t.footer.record}
          </p>
          <ul className={COL_LIST}>
            <li><Link href="/sources" className={COL_LINK}>{t.nav.sources}</Link></li>
            <li><Link href="/faq" className={COL_LINK}>{t.nav.faq}</Link></li>
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
        {/* Three lines that were three rows with a 12px gutter between them and
            16px of anchor padding inside the last one — a stacked block taller
            than some of the link columns above it, for the least important
            type on the page. On a phone the three now sit as one tight
            centred group: the motto leads (it is the only line anyone reads),
            the copyright and the credit share a row under it, and the credit's
            tap padding comes off since nobody arrives here to reach it.
            `md:` puts back the left / centre / right row unchanged. */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-3 text-center md:text-left text-[0.72rem] md:text-xs text-white/60">
          <p className="order-2 md:order-0">
            © {year} Vadakankulam Matha Church · {t.footer.rights}
          </p>
          <p className="order-1 md:order-0 font-serif italic text-white/75">
            In faith, in stillness, in light.
          </p>
          {/* Builder credit only — no claim over the content, which belongs to
              the parish. nofollow keeps a site-wide outbound footer link from
              reading as a link scheme to Google.

              Desktop was 0.65rem — 10.4px, and the one line on the page set
              SMALLER on a monitor than on a phone, which is backwards. 0.72rem
              is 11.5px: a step up, and still under the 12px copyright beside
              it, so the row keeps its hierarchy. The ink is left at 35% —
              size and contrast compound, and this line is meant to be found
              rather than read. */}
          <p className="order-3 md:order-0 text-[0.68rem] md:text-[0.72rem] text-white/45 md:text-white/35">
            {t.footer.builtBy}{" "}
            <a
              href="https://subashsaajan.site"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-block hover:text-gold transition-colors"
            >
              Subash Saajan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
