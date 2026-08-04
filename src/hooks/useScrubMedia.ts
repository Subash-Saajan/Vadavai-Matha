"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { probe } from "@/lib/probe";

import { useScrubFilm } from "./useScrubFilm";

/* ── THE PHONE MEMORY BUDGET, AND WHY THIS IS NOT A PLAIN PRELOAD ──────────
   iOS Safari does not run a page out of memory the way a desktop browser
   does. It kills it: the WebContent process is jetsammed and the reader gets
   "This page couldn't load — Reload to try again", with no console, no error
   and no clue as to which page element was to blame. Chrome on Android and
   every desktop browser survive the same page, so it is invisible unless you
   are holding an iPhone.

   The hero is exactly the shape that trips it. This loader used to fetch all
   150 frames up front and hold every Image alive for the life of the page.
   Encoded that is a harmless ~16 MB — but WebKit caches the DECODED bitmap of
   each frame it draws, and a decoded 864×1080 frame is 3.6 MB. Scrub through
   the whole film and the tab is asked to hold something like 540 MB of
   bitmaps, on top of the canvas backing store and the rest of the page. Its
   decoded-image cache does purge under pressure, but not at the rate a fast
   scrub fills it, and the tab dies mid-scroll. Add the ten or fifty other
   tabs a real reader keeps open and the ceiling is lower still.

   Three rules keep it bounded, and none of them changes a pixel of what is
   actually drawn:

   1. PHONES DRAW EVERY STEP-th FRAME. The scrub maps ~120vh of scroll onto
      the film, so at 150 frames the film advances one raw frame per ~6.4px
      of scroll. The caller's frame mapping is untouched: it keeps asking for
      frame 97, and `draw` renders the nearest one that is resident. See the
      note on STEP itself for how coarse that is allowed to get and why.
   2. ONLY A WINDOW AROUND THE PLAYHEAD IS RESIDENT. Frames outside it are
      dropped for the collector, so the ceiling is the window, not the film —
      and the window is deliberately lopsided, long ahead of the playhead and
      short behind it, for the reasons at KEEP_BEHIND below. On a hard flick
      the scrub can outrun the window; that is what
      the nearest-resident search in `draw` is for — it shows the closest
      frame it has and self-heals as the next ones land.
   3. NOTHING IS HELD WHILE THE HERO IS OFF SCREEN OR THE TAB IS HIDDEN. Once
      the reader is past the hero — i.e. for the whole rest of the home page —
      the sequence costs nothing. The canvas keeps its last bitmap, so coming
      back shows the frame you left on while the window refills behind it.

   Re-fetching an evicted frame is a disk-cache hit, not a network round trip:
   /hero-frames is served with a day of max-age (see next.config.ts), which is
   what makes eviction cheap enough to be this aggressive. */
/* ── HOW COARSE THE FILM IS ALLOWED TO GET, AND WHY IT IS NO LONGER 3 ──────
   At STEP 3 the film changed picture once per ~19px of scroll. On a flick
   that is invisible; on the SLOW TAIL of a small swipe — the scrub carries on
   gliding for about a second after the thumb lifts — it is one visible jump
   every few tenths of a second, which does not read as a coarse film. It
   reads as a film that is loading. That tail is where a scroll-scrubbed hero
   is looked at hardest, because it is the only time the reader is still.

   STEP 2 halves the jump to ~13px. Every other constant here is a multiple of
   STEP, so the number of live images — and therefore the memory ceiling this
   whole file exists to defend — is UNCHANGED by moving it. What moves is:

     · BANDWIDTH. The full film is ~8 MB at 2 against ~5 MB at 3. (It is ~16 MB
       at 1, on a site whose readers are largely on Indian mobile data, which
       is the only reason this is not 1.)
     · WINDOW REACH. The resident window covers half as much scroll distance,
       so a hard flick falls out of it sooner and leans on the nearest-resident
       search in `draw`. That path already exists and self-heals.

   If the film is ever re-cut, the number to keep in view is frames-per-pixel,
   not the frame count: 150 frames over 120vh is what makes ~6.4px a frame. */
const STEP = 2;
/** Raw-index reach of the resident window, ahead of and behind the playhead. */
const AHEAD = 14 * STEP;
const BEHIND = 4 * STEP;
/* ── THE WINDOW IS NOT SYMMETRIC, BECAUSE THE SCROLL IS NOT ───────────────
   This used to be one `KEEP = 16 * STEP` applied to |i - at|, which quietly
   made the trailing half of the window the most expensive thing on the page.
   Frames are only ever FETCHED from `at - BEHIND` to `at + AHEAD` — four steps
   back, fourteen forward — but eviction let anything within sixteen steps
   either side survive. So as the playhead advanced it towed sixteen steps of
   already-shown frames behind it, none of which is drawn again unless the
   reader scrolls back up, and each of which is 3.56 MB of decoded bitmap.

   Resident count was AHEAD + KEEP + 1 ≈ 31 frames ≈ 110 MB. On the iPhone XR
   this measurement started from — 414pt at DPR 2, 3 GB of RAM — that is MORE
   THAN ALL FIFTY-TWO IMAGES ON THE HOME PAGE COMBINED (91 MB), and the film's
   cost is the one number on this page that does not shrink on a smaller
   screen: a phone with a modest viewport gets modest images and the same
   enormous film.

   Splitting the threshold in two costs nothing visible. Ahead of the playhead
   nothing changes at all — KEEP_AHEAD is exactly AHEAD, so every frame this
   loader bothers to fetch survives long enough to be drawn (which is why the
   two must never drift apart: a KEEP smaller than AHEAD would evict frames in
   the same pass that requested them, and the film would stall at speed).
   Behind it we keep six steps instead of sixteen — enough that a small
   correction back up the page is still instant, and past that the reader is
   scrolling back through the film, where a re-fetch is a disk-cache hit by
   design (see the max-age note at the head of this file).

   Resident count: ~31 frames → ~21. 110 MB → 75 MB, no pixel changed. */
const KEEP_AHEAD = AHEAD;
const KEEP_BEHIND = 6 * STEP;
/** Concurrent fetches — enough to stay ahead of a scroll, polite to the page. */
const IN_FLIGHT = 6;

/**
 * Default focal track: plain centre-cover, every frame. Module-level so the
 * default is referentially stable — an inline `() => 0.5` would be a new
 * function on every render and would rebuild the loader effect with it.
 */
const CENTRE = () => 0.5;

/**
 * Picks how a scroll-scrubbed film renders and wires the mobile path.
 *
 * Desktop (≥768px, same breakpoint as useLenis) scrubs the real <video> via
 * currentTime — smooth there, with Lenis feeding it eased wheel deltas. Touch
 * devices instead draw a pre-extracted WebP frame sequence onto a <canvas>
 * (the Apple product-page technique): every currentTime set is a full async
 * seek through the media pipeline, which stutters on phones no matter how the
 * file is encoded — and this way the multi-MB video never downloads on mobile
 * at all. Sequences are generated by scripts/gen-scrub-frames.mjs.
 *
 * The caller renders <video> only when mode === "video" and <canvas> only
 * when mode === "canvas", waits for mediaReady, then drives frames from its
 * own ScrollTrigger scrub:
 *
 *   frameTargetRef.current = frame;
 *   drawRef.current?.();
 */
export function useScrubMedia({
  videoRef,
  canvasRef,
  frameCount,
  frameSrc,
  filmSrc,
  filmIndexSrc,
  focusXAt = CENTRE,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  frameCount: number;
  /** Module-level constant, so the loader effect never re-runs. */
  frameSrc: (i: number) => string;
  /**
   * The WebCodecs film and its build-time index. Supply both and a touch device
   * that can decode video will use them INSTEAD of the stills above — same
   * pictures, sharper, a fraction of the bytes, and memory that can actually be
   * handed back (see the head of useScrubFilm.ts). Leave them out and the
   * stills are the only mobile path, exactly as before.
   */
  filmSrc?: string;
  filmIndexSrc?: string;
  /**
   * Horizontal focal point of the SOURCE frame, 0–1, that should land in the
   * middle of the canvas — the canvas equivalent of `object-position`, and
   * therefore mobile-only (the desktop <video> path ignores it). 0.5 is plain
   * centre-cover; above 0.5 slides the image left to bring something that
   * sits right of frame-centre into the middle. Clamped so the crop can never
   * run past an edge of the frame.
   *
   * It is asked PER FRAME, not once, because the subject of a moving film
   * moves within it: a single number can only be right at one point of the
   * pan. Must be a module-level constant or a stable useCallback — it is an
   * effect dependency, and a fresh arrow per render would rebuild the loader.
   */
  focusXAt?: (frame: number) => number;
}) {
  const [mode, setMode] = useState<"video" | "film" | "canvas" | null>(null);
  const [mediaReady, setMediaReady] = useState(false);

  const frameTargetRef = useRef(0);
  const drawRef = useRef<(() => void) | null>(null);

  const hasFilm = !!filmSrc && !!filmIndexSrc;

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setMode("video");
      return;
    }
    /* Chosen optimistically on a one-line feature check rather than awaiting
       `isConfigSupported`, so nothing is delayed by a probe. The film path
       verifies the codec for real once it has the index, and demotes itself to
       the stills through `onFilmFail` if anything about it does not hold —
       which is also the route taken if the film 404s or the decoder errors
       mid-scroll. Demotion is one-way: `failedRef` inside useScrubFilm makes
       sure a demoted hero cannot flip back and re-download the film. */
    // Diagnostic override — see lib/probe.ts. No flag, no change.
    if (probe("nofilm")) {
      setMode("canvas");
      return;
    }
    setMode(hasFilm && "VideoDecoder" in window ? "film" : "canvas");
  }, [hasFilm]);

  const onFilmFail = useCallback(() => setMode("canvas"), []);

  const { ready: filmReady } = useScrubFilm({
    canvasRef,
    frameTargetRef,
    drawRef,
    active: mode === "film",
    manifestSrc: filmIndexSrc ?? "",
    filmSrc: filmSrc ?? "",
    frameCount,
    focusXAt,
    onFail: onFilmFail,
  });

  useEffect(() => {
    if (filmReady) setMediaReady(true);
  }, [filmReady]);

  // ── Desktop: wait for video metadata (duration) before wiring the scrub ──
  useEffect(() => {
    if (mode !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setMediaReady(true);
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, [mode, videoRef]);

  // ── Mobile: size the canvas and stream the frame sequence in ──
  useEffect(() => {
    if (mode !== "canvas") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Lives for exactly as long as this effect — a ref would outlive the
    // canvas it belongs to and keep its frames alive with it.
    const frames: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    const pending = new Set<number>();
    let inFlight = 0;
    let drawn = -1;
    let cancelled = false;
    /* Is the hero on screen and the tab in front? While it is not, the film
       holds nothing — see rule 3 above. */
    let resident = true;

    /* A scroll-scrubbed film is motion like any other, so a reader who has
       asked for less of it gets the opening frame and nothing after it — which
       is the poster already underneath the canvas, so nothing shifts and they
       carry none of this memory. Read once: `mediaReady` still fires below or
       the hero's copy would never be revealed. */
    const still =
      probe("stillonly") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const want = () =>
      Math.max(0, Math.min(frameCount - 1, Math.round(frameTargetRef.current)));

    /* The one place the asymmetry is expressed. `at` is where the playhead is,
       `i` the frame being judged: ahead of the playhead we hold everything we
       fetched, behind it only a short tail. See the note on the constants. */
    const inWindow = (i: number, at: number) =>
      i >= at - KEEP_BEHIND && i <= at + KEEP_AHEAD;

    const draw = () => {
      const want0 = want();
      // Nearest loaded frame, so scrubbing ahead of the network shows the
      // closest image instead of freezing (and self-heals as frames arrive).
      let idx = -1;
      for (let d = 0; d < frameCount && idx < 0; d++) {
        if (want0 - d >= 0 && frames[want0 - d]) idx = want0 - d;
        else if (want0 + d < frameCount && frames[want0 + d]) idx = want0 + d;
      }
      if (idx < 0 || idx === drawn) return;
      const img = frames[idx] as HTMLImageElement;
      // Same geometry as the video's object-cover, with focusXAt standing in
      // for object-position's x. Put focusXAt(idx)*dw under the canvas centre,
      // then clamp into [cw - dw, 0] so the frame still covers edge to edge.
      // The focus is asked for the frame ACTUALLY drawn, not the one wanted:
      // during a fast flick those differ, and pairing a frame with another
      // frame's focus is a visible sideways twitch.
      const { width: cw, height: ch } = canvas;
      const focusX = focusXAt(idx);
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = Math.max(Math.min(cw - dw, 0), Math.min(0, cw / 2 - focusX * dw));
      ctx.drawImage(img, dx, (ch - dh) / 2, dw, dh);
      drawn = idx;
    };

    const size = () => {
      // Render at native density (capped at 3×) — capping lower makes the
      // browser upscale the canvas element itself, which visibly softens
      // the film on flagship phones. One full-screen canvas at 3× is only
      // ~12 MB of backing store; drawImage cost is unaffected by dpr here.
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width === w && canvas.height === h) return; // address-bar churn
      canvas.width = w;
      canvas.height = h;
      drawn = -1; // resizing wipes the bitmap — force a redraw
      draw();
    };
    size();
    window.addEventListener("resize", size);

    /* Plain Image objects + one canvas, never ImageBitmaps: an ImageBitmap is
       decoded the moment it exists and stays that way until it is CLOSED, so a
       sequence of them cannot be reclaimed by dropping references and is the
       very pile of bitmaps this loader exists to avoid. A frame that lands
       after the playhead has already moved past its window is dropped on
       arrival rather than stored and evicted later.

       ⚠ A FRAME IS NOT RESIDENT UNTIL IT IS DECODED, AND THAT IS THE WHOLE
       POINT OF `ready`.

       `onload` fires when the BYTES have arrived. The pixels do not exist yet
       — a WebP is still compressed at that moment — and the thing that
       decompresses it is the first `drawImage` that asks for it, ON THE MAIN
       THREAD, synchronously, inside whatever frame happened to need it. An
       864×1080 WebP is 5–15 ms on a mid-range phone: a dropped frame, landing
       at the exact instant a new picture appears.

       It never showed up on a flick, because a dropped frame inside fast
       motion is invisible. It showed up on the slow tail, where every new
       picture arrived with a hitch attached, and the two together read as a
       film loading one frame at a time rather than playing.

       `decode()` does that work off the main thread and resolves when the
       bitmap is ready, so the first `drawImage` is a copy. It also implies
       the load, hence no `onload` here. Rejection (a 404, a corrupt file)
       settles exactly as a load failure did: the frame is simply never
       resident and the nearest-resident search covers for it.

       Memory is unchanged in principle and higher in practice: the ceiling
       was always "every image in the window, decoded" (see the head of this
       file), but frames the playhead skipped past used to escape being
       decoded at all. Anything that widens the resident window now costs what
       it says it costs. */
    const load = (i: number) => {
      pending.add(i);
      inFlight++;
      const img = new window.Image();
      img.decoding = "async";
      const settle = () => {
        pending.delete(i);
        inFlight--;
        pump();
      };
      const ready = () => {
        // `decode()` REJECTS on a 404 or a corrupt file and both branches land
        // here, so a frame is only resident if it actually decoded. Without
        // this a broken image would be stored, `draw` would pick it as the
        // nearest and mark it drawn, and the canvas would hold whatever was on
        // it — with no error anywhere. `onerror` used to make that impossible.
        const ok = img.complete && img.naturalWidth > 0;
        if (ok && !cancelled && resident && inWindow(i, want())) {
          frames[i] = img;
          draw();
        }
        settle();
      };
      img.src = frameSrc(i);
      if (img.decode) img.decode().then(ready, ready);
      else {
        img.onload = ready;
        img.onerror = settle;
      }
    };

    const request = (i: number) => {
      if (i < 0 || i >= frameCount || frames[i] || pending.has(i)) return;
      load(i);
    };

    /* Runs after every scrub tick and every time a frame lands: drop what the
       playhead has left behind, then fetch what it is about to want, nearest
       first. Requests are snapped to a FIXED grid of multiples of STEP — if the
       grid moved with the playhead, a slow scroll would fetch 30, then 31, then
       32 and hold three near-identical images where one was intended. */
    const pump = () => {
      if (cancelled || still) return;
      const at = want();
      for (let i = 0; i < frameCount; i++) {
        if (frames[i] && (!resident || !inWindow(i, at))) frames[i] = null;
      }
      if (!resident) return;

      const lastOnGrid = Math.floor((frameCount - 1) / STEP) * STEP;
      const base = Math.min(Math.round(at / STEP) * STEP, lastOnGrid);
      for (let d = 0; d <= AHEAD && inFlight < IN_FLIGHT; d += STEP) {
        request(base + d);
        if (d > 0 && d <= BEHIND) request(base - d);
      }
      // The grid stops short of the final frame; pin it so the film's last
      // composition is the one that actually lands at the end of the scrub.
      if (at > lastOnGrid) request(frameCount - 1);
    };

    // The consumer's every scrub tick: draw with what is here, then move the
    // window. Internal callers (a frame landing, a resize) only draw — pumping
    // from there would recurse.
    drawRef.current = () => {
      draw();
      pump();
    };

    /* Frame 0 gates the hero's entrance animations, so it is fetched on its own
       before the window opens — and setMediaReady runs even if it 404s, because
       a missing file must not leave the hero's copy invisible forever. */
    const first = new window.Image();
    first.decoding = "async";
    const firstReady = () => {
      if (cancelled) return;
      // `complete` and a real width is how a decoded image is told from one
      // whose decode() rejected — the two share this handler.
      if (first.complete && first.naturalWidth) frames[0] = first;
      setMediaReady(true);
      draw();
      pump();
    };
    first.src = frameSrc(0);
    if (first.decode) first.decode().then(firstReady, firstReady);
    else {
      first.onload = firstReady;
      first.onerror = firstReady;
    }

    /* Residency: on screen AND in front. A viewport of slack either side of the
       hero keeps a reader lingering at the boundary from thrashing the cache;
       the visibility half matters because backgrounding a tab is exactly when
       iOS goes looking for memory to reclaim, and the tab holding less is the
       tab it is less likely to discard. */
    let onScreen = true;
    let visible = true;
    const settleResidency = () => {
      resident = onScreen && visible;
      pump();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        settleResidency();
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(canvas);

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      settleResidency();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      drawRef.current = null;
      window.removeEventListener("resize", size);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      // Leaving the page must not leave 33 decoded frames behind it.
      frames.fill(null);
    };
  }, [mode, frameCount, frameSrc, canvasRef, focusXAt]);

  return { mode, mediaReady, frameTargetRef, drawRef };
}
