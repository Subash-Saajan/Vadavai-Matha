"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";

// Bilingual holding page for littlerome.net. Self-contained branding —
// deliberately kept apart from the main vadavaimatha.net dictionary.
const copy = {
  en: {
    eyebrow: "Holy Family Shrine · Vadakkankulam",
    centenary: "100 Years of",
    title: "Little Rome",
    tagline:
      "A sanctuary of faith in the heart of South India — devotion five centuries deep.",
    status: "Our website goes live on August 7, 2026 — stay tuned!",
    blessing: "Pray for us, O Holy Mother of God.",
  },
  ta: {
    eyebrow: "திருக்குடும்பத் திருத்தலம் · வடக்கன்குளம்",
    centenary: "100 ஆண்டுகள்",
    title: "சின்ன ரோமாபுரி",
    tagline:
      "தென்னிந்தியாவின் இதயத்தில் விசுவாசத்தின் புகலிடம் — ஐந்து நூற்றாண்டுகளாக ஆழ வேரூன்றிய பக்தி.",
    status: "எங்கள் இணையதளம் 2026 ஆகஸ்ட் 7 அன்று வெளியாகும் — காத்திருங்கள்!",
    blessing: "இறைவனின் தூய அன்னையே, எங்களுக்காக வேண்டிக்கொள்ளும்.",
  },
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function ComingSoon() {
  const { lang, toggle } = useLang();
  const c = copy[lang];

  return (
    <main className="relative min-h-screen overflow-hidden bg-navy text-white">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/church-interior.jpeg"
          alt=""
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 parallax-overlay" />
      </div>

      {/* Soft gold glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/15 blur-3xl pointer-events-none" />

      {/* Language toggle */}
      <button
        onClick={toggle}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium uppercase tracking-widest bg-white/10 text-white hover:bg-gold hover:text-navy backdrop-blur transition-all"
        aria-label="Toggle language"
      >
        <Globe className="w-3.5 h-3.5" />
        {lang === "en" ? "தமிழ்" : "English"}
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.p
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-gold mb-6"
        >
          {c.eyebrow}
        </motion.p>

        <motion.p
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-serif italic text-2xl md:text-4xl text-gold/85 mb-2"
        >
          {c.centenary}
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-serif text-gradient-gold text-6xl md:text-8xl lg:text-9xl leading-none mb-8"
        >
          {c.title}
        </motion.h1>

        <motion.div
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="ornament-divider w-48 md:w-72 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
        </motion.div>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-xl text-base md:text-lg text-white/70 leading-relaxed mb-12"
        >
          {c.tagline}
        </motion.p>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gold/30 bg-white/5 backdrop-blur max-w-[92vw]"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="text-xs md:text-sm tracking-[0.15em] uppercase text-white/90 text-center">
            {c.status}
          </span>
        </motion.div>
      </div>

      {/* Footer blessing */}
      <motion.p
        custom={5}
        variants={fade}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 inset-x-0 z-10 text-center px-6 font-serif italic text-sm text-white/45"
      >
        {c.blessing}
      </motion.p>
    </main>
  );
}
