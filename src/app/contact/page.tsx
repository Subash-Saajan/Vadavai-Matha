"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { images } from "@/lib/images";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = [
        formRef.current,
        infoRef.current,
      ].filter(Boolean) as HTMLElement[];

      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });

      // Map parallax
      if (mapRef.current) {
        gsap.to(mapRef.current.querySelector(".map-img"), {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });
    return () => ctx.revert();
  }, [lang]);

  return (
    <>
      <PageHero
        label={t.contact.label}
        title={t.contact.title}
        intro={t.contact.intro}
        image={images.churchSpire}
      />

      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                  {lang === "en" ? "Address" : "முகவரி"}
                </p>
                <p className="text-navy text-lg leading-relaxed">{t.contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                  {lang === "en" ? "Phone" : "தொலைபேசி"}
                </p>
                <a href={`tel:${t.contact.phone}`} className="text-navy text-lg hover:text-gold-dark transition-colors">
                  {t.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">
                  {lang === "en" ? "Email" : "மின்னஞ்சல்"}
                </p>
                <a href={`mailto:${t.contact.email}`} className="text-navy text-lg hover:text-gold-dark transition-colors">
                  {t.contact.email}
                </a>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://maps.google.com/?q=Vadakancherry+Matha+Church"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-sm tracking-wide hover:bg-gold hover:text-navy transition-all duration-500 group"
              >
                {t.contact.directions}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-navy text-xl font-serif">
                  {lang === "en" ? "Thank you. We'll be in touch." : "நன்றி. நாங்கள் உங்களைத் தொடர்பு கொள்வோம்."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2">
                    {t.contact.formName}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-cream-dark/50 border border-gold/20 focus:border-gold rounded-xl px-4 py-3 text-navy outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2">
                    {t.contact.formEmail}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-cream-dark/50 border border-gold/20 focus:border-gold rounded-xl px-4 py-3 text-navy outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-text-muted mb-2">
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full bg-cream-dark/50 border border-gold/20 focus:border-gold rounded-xl px-4 py-3 text-navy outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-navy text-white text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-navy transition-all duration-500"
                >
                  {t.contact.formSubmit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map / location image with parallax */}
      <section ref={mapRef} className="relative h-[60vh] overflow-hidden">
        <div className="map-img absolute inset-0 scale-110 will-change-transform">
          <Image
            src={images.churchSunset}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/40" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">
              {lang === "en" ? "Find Us" : "எங்களைக் கண்டறியுங்கள்"}
            </p>
            <p className="font-serif text-3xl md:text-4xl text-white max-w-2xl">
              {t.contact.address}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
