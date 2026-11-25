"use client";

/* ── THE DESKTOP FILM IS DOWNLOADED WHOLE, THEN SCRUBBED FROM MEMORY ───────
   The desktop hero used to hand `/hero-video.mp4` straight to a <video> with
   `preload="auto"`. The browser then STREAMS it: it fetches byte ranges as it
   sees fit, and a seek to a time it has not downloaded yet waits on the
   network. A reader who scrolls faster than the download outruns it, and the
   scrub stalls, catches up, stalls again. That is what "it feels laggy" was
   on a monitor (owner, 25 Nov 2026), and it was worst on exactly the visit
   that matters most, the first one.

   So the film is fetched in full, behind the loading screen, into a Blob, and
   the <video> is given a blob: URL. Every seek after that is a decode from
   memory: no request, no stall, at any scroll speed. The owner's rule for the
   trade: "a 2–3 second loading screen is fine, but once they start using it,
   it should be smooth as butter".

   One download per page session. The blob URL lives in module scope, so
   coming back to the home page by client-side navigation finds it ready and
   shows no loading screen at all, and a second Hero mount (React StrictMode
   in development) joins the request already in flight instead of starting
   another. A returning visitor within the file's max-age (a day, see
   next.config.ts) gets it from the HTTP cache in milliseconds. */

type Listener = (fraction: number) => void;

let filmUrl: string | null = null;
let inflight: Promise<string> | null = null;
let controller: AbortController | null = null;
let lastFraction = 0;
const listeners = new Set<Listener>();

function emit(fraction: number) {
  lastFraction = fraction;
  for (const l of listeners) l(fraction);
}

/** The blob: URL if the film has already been downloaded this session. */
export function cachedHeroFilm(): string | null {
  return filmUrl;
}

/**
 * Download the film once and resolve with a blob: URL. `onProgress` gets
 * 0–1 when the server sends a Content-Length, and nothing otherwise (the
 * loading screen then shows an indeterminate line). Call the returned
 * `unsubscribe` on unmount; it does not cancel the download.
 */
export function loadHeroFilm(
  src: string,
  onProgress?: Listener,
): { promise: Promise<string>; unsubscribe: () => void } {
  if (filmUrl) {
    onProgress?.(1);
    return { promise: Promise.resolve(filmUrl), unsubscribe: () => {} };
  }

  if (onProgress) {
    listeners.add(onProgress);
    if (lastFraction > 0) onProgress(lastFraction);
  }

  if (!inflight) {
    controller = new AbortController();
    const { signal } = controller;
    inflight = (async () => {
      const res = await fetch(src, { signal });
      if (!res.ok || !res.body) throw new Error(`hero film: HTTP ${res.status}`);
      const total = Number(res.headers.get("content-length")) || 0;
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.byteLength;
        if (total) emit(Math.min(1, received / total));
      }
      const blob = new Blob(chunks as BlobPart[], { type: "video/mp4" });
      filmUrl = URL.createObjectURL(blob);
      emit(1);
      return filmUrl;
    })();
    // A failed or abandoned download must not poison the next attempt.
    inflight.catch(() => {
      inflight = null;
      lastFraction = 0;
    });
  }

  return {
    promise: inflight,
    unsubscribe: () => {
      if (onProgress) listeners.delete(onProgress);
    },
  };
}

/** Give up on a download that is taking too long (the caller falls back to
    streaming the file the old way). */
export function abandonHeroFilm() {
  controller?.abort();
  controller = null;
  inflight = null;
  lastFraction = 0;
}
