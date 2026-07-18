import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/faq";
import { faqPage, graph, trailTo } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Questions & Answers.
 *
 * A plain server component — no GSAP, no client hooks — because this page's job
 * is to be read, quoted and lifted, not to perform. That also means it can
 * export its own metadata without the server/client split the other routes need.
 *
 * The FAQPage graph is fed the *same strings the page renders* (src/lib/faq.ts),
 * so the answer a crawler reads and the answer a pilgrim reads are by
 * construction the same text. The most common way sites get FAQ markup wrong is
 * emitting one answer to Google and showing another to the reader.
 */
export const metadata: Metadata = pageMetadata("faq");

const jsonLd = graph(faqPage(FAQS), trailTo("faq"));

export default function FaqRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-cream text-navy">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <p className="font-display tracking-[0.28em] text-xs md:text-sm uppercase text-gold-dark">
            Little Rome
          </p>
          <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05]">
            Questions &amp; Answers
          </h1>
          <div className="leaf-rule my-8" />
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-navy/75">
            The things pilgrims write and telephone to ask — the feast, the Mass
            timings, the road from Nagercoil, the saint who was baptised here.
            Answered plainly, and with the sources named.
          </p>

          <dl className="mt-16 space-y-12">
            {FAQS.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-xl md:text-2xl leading-snug text-navy">
                  {f.q}
                </dt>
                <dd className="mt-4 font-serif text-lg md:text-xl leading-relaxed text-navy/80">
                  {f.a}
                </dd>
                {f.source ? (
                  <p className="mt-3 text-xs md:text-sm tracking-wide text-navy/45">
                    {f.source}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>

          <div className="leaf-rule my-14" />

          <p className="font-serif text-lg leading-relaxed text-navy/70">
            Every historical claim above rests on a document, and we say which —
            including where the evidence is thin.{" "}
            <Link
              href="/sources"
              className="text-gold-dark underline underline-offset-4 decoration-gold/50 hover:decoration-gold-dark transition-colors"
            >
              See our sources and further reading
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
