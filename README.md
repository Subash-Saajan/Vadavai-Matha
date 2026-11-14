# Vadavai Matha: Holy Family Shrine website

A bilingual (English and Tamil) website for the Holy Family Shrine at Vadakkankulam in Tamil Nadu, known locally as Vadavai Matha and "Little Rome".

**Live:** https://vadavai-matha.vercel.app

## What's on it

- The shrine's history, architecture, miracle accounts, priests and saints, with the sources listed on a references page
- Mass timings and feast days
- Gallery, FAQ, and a contact page with an interactive map

## How it's built

- Next.js (App Router) and TypeScript, with locale routing under `/[lang]` for English and Tamil
- Tailwind CSS, with GSAP, Lenis and Framer Motion for the scroll and entrance animations
- MapLibre GL for the map on the contact page
- SEO for both languages: per-locale metadata, JSON-LD structured data typed with `schema-dts`, sitemap and robots rules, and an audit of the history pages' citations
- Hosted on Vercel

## Run locally

```bash
npm install
npm run dev
```
