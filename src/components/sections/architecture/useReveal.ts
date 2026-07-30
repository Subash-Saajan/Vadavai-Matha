"use client";

/**
 * The house reveal now lives at `@/hooks/useReveal` — /mass-timings became the
 * second page to use it, and a hook shared by two pages should not sit inside
 * one page's folder. Re-exported here so every existing import on /architecture
 * keeps working unchanged.
 */
export { useReveal } from "@/hooks/useReveal";
