import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { GalleryPlates } from "@/components/sections/GalleryPlates";
import { PageHero } from "@/components/sections/PageHero";
import { CHROME, CHROME_TA, PLATES, PLATE_COUNT } from "@/lib/gallery";
import { localePath } from "@/lib/locale";
import { graph, imageGallery, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

/**
 * /gallery — the photographs.
 *
 * WHY THE SITE NEEDED THIS PAGE. Between them the routes of this site carry
 * about forty photographs of a church that almost nothing on the open web has
 * pictures of — and every one of them was a thumbnail inside a paragraph, a
 * tile in a mosaic that swaps itself as you scroll, or a hero cropped to a
 * letterbox. There was no URL at which you could simply LOOK at the building.
 * There is now, and the pictures are the content rather than the decoration.
 *
 * WHAT IS IN IT AND WHAT IS DELIBERATELY OUT is settled in lib/gallery.ts, at
 * length: the fifty-eight painted illustrations belonging to /history are held
 * back, as are the design cut-outs, the backdrops, the priest roundels and
 * three near-duplicates. Read that note before adding anything here.
 *
 * ⚠ `/gallery` WAS A 301 TO /architecture until this page shipped, and that
 * redirect has been removed from next.config.ts. If this route is ever retired
 * again, retire it the same way — a redirect, not a 404.
 *
 * Everything renders on the server except GalleryPlates, which is a client
 * component for two reasons and no others: the reveal on scroll that every
 * other content route already loads, and the <dialog> lightbox. The plates
 * themselves, the captions and the six chapter headings are in the server HTML,
 * so the page is fully readable and fully indexable with JavaScript off.
 *
 * TAMIL. Chapter titles, captions and the page's own chrome all carry `…Ta`
 * siblings in lib/gallery.ts and fall back to English where one is missing. The
 * captions lifted from lib/i18n.ts are the tamil-localize skill's own verified
 * strings; the ones written for this page have NOT yet been through that skill
 * and should be, before they are treated as settled.
 */
export const generateMetadata = localizedMetadata("gallery");

export default async function GalleryRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";
  const ta = lang === "ta";
  const C = ta ? CHROME_TA : CHROME;
  const L = (p: string) => localePath(lang, p);

  /* Built per-locale inside the component: a module-level graph is evaluated
     once at import, before any locale exists, so /ta would emit English
     captions to a crawler while showing Tamil ones to a reader. */
  const jsonLd = graph(
    imageGallery(
      PLATES.map((p) => ({
        url: p.src,
        caption: ta && p.captionTa ? p.captionTa : p.caption,
        width: p.w,
        height: p.h,
      })),
      lang,
    ),
    trailTo("gallery", lang),
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        label={C.heroLabel}
        title={C.heroTitle}
        intro={C.heroIntro}
        image="/images/fest-noon.jpg"
        alt={C.heroAlt}
        /* A 16:9 photograph in a letterbox hero loses most of its height, and a
           centred crop on this one keeps sky. Held low, so what survives is the
           chariot and the spires rather than the cloud above them. */
        imagePosition="object-[center_62%]"
      />

      <section className="bg-cream text-navy">
        <div className="pt-12 pb-16 md:pt-20 md:pb-28">
          <div className="mx-auto max-w-3xl px-6">
            <p
              className={`${
                ta ? "font-tamil" : "font-serif"
              } text-[1.15rem] leading-relaxed text-navy/80 md:text-2xl`}
            >
              {C.lead(PLATE_COUNT)}
            </p>

            <div className="leaf-rule my-8 md:my-10" />

            <p
              className={`${
                ta ? "font-tamil" : "font-serif"
              } text-[1.05rem] leading-relaxed text-navy/70 md:text-lg`}
            >
              {C.note}
            </p>
          </div>

          <div className="mt-10 md:mt-12">
            <GalleryPlates lang={lang} />
          </div>

          {/* The ask. Same candour /priests and /sources trade on, and here it
              is also the only way the gap gets closed: the pictures this page
              is missing are in the village's own phones and albums. */}
          <div className="mx-auto mt-16 max-w-3xl px-6 md:mt-24">
            <div className="leaf-rule mb-8 md:mb-10" />
            <p
              className={`${
                ta ? "font-tamil" : "font-serif"
              } text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}
            >
              {C.askLead}{" "}
              {/* `py-2 -my-2`: an inline call to action, so its hit area was the
                  17px line box. Vertical padding on an inline box overflows the
                  line rather than growing it — the target reaches 44px and the
                  paragraph's leading is untouched. Same fix as /priests. */}
              <Link
                href={L("/contact")}
                className="-my-2 py-2 text-gold-dark underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold-dark"
              >
                {C.askLink}
              </Link>
              {C.askTail}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
