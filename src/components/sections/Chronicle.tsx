/**
 * III · The Chronicle — the home page's door into /history.
 *
 * WHY THE SECTION EXISTS. Before it, the home page had six sections after the
 * hero pointing at three destinations, two of which were the same page, and
 * /history — eight chapters, fifty-eight sourced moments, fifty-nine paintings —
 * appeared on it nowhere at all. The single richest thing this parish owns was
 * invisible from its own front door.
 *
 * THE FORM WAS CHOSEN BY EYE. Three presentations were built and looked at side
 * by side — a strip, a hairline timeline and an open book — and the strip won.
 * It then stopped being scroll-scrubbed and became a real carousel, for the
 * reasons at the head of chronicle/ChronicleCarousel.tsx.
 *
 * The two rejected presentations are still on disk, unimported and costing the
 * bundle nothing: chronicle/ChronicleHairline.tsx and chronicle/ChronicleBook.tsx,
 * along with the superseded chronicle/ChronicleFilm.tsx. They can be deleted
 * whenever you are sure — this repository has no git history to recover them
 * from, which is the only reason they are still here.
 */
export { ChronicleCarousel as Chronicle } from "./chronicle/ChronicleCarousel";
