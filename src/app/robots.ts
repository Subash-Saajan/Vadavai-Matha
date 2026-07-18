import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt — which never existed until now (see the note in sitemap.ts).
 *
 * The deliberate decision here is to WELCOME the AI crawlers.
 *
 * The reflex across the web in the last few years has been to block GPTBot and
 * friends, because a commercial publisher loses when an AI answers instead of
 * sending the click. A shrine is the exact inverse: the goal is that someone
 * asking ChatGPT "what is the Little Rome of India?" or "when is the
 * Vadakkankulam feast?" is told, correctly, about this shrine. Being read IS
 * the win. Blocking these agents would forfeit it.
 *
 * They are listed by name rather than left to `*` because the intent should be
 * legible to the next person who edits this file — and because a future
 * blanket-block should have to consciously delete a line that says why.
 *
 * Note these are separate agents with separate jobs:
 *   OAI-SearchBot / ChatGPT-User  — answer-time retrieval and citation
 *   GPTBot / ClaudeBot / CCBot    — corpus crawling
 *   Google-Extended               — gates AI Overviews & Gemini grounding.
 *                                   It is NOT Googlebot; blocking it does not
 *                                   affect ordinary Search ranking, and
 *                                   allowing it is what admits us to AI
 *                                   Overviews.
 *   Bingbot                       — the index behind Copilot and, in part,
 *                                   ChatGPT search. Not optional here.
 */
const AI_AGENTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  // Google (AI Overviews / Gemini grounding — distinct from Googlebot)
  "Google-Extended",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Apple (Siri / Apple Intelligence)
  "Applebot",
  "Applebot-Extended",
  // Microsoft
  "bingbot",
  // Common Crawl — the corpus a great many models are still trained from
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: AI_AGENTS,
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Declares the canonical hostname. We serve the apex; www redirects to it.
    host: SITE_URL,
  };
}
