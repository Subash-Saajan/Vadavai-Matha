"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ── WHY THE PHONE DECODES A VIDEO ITSELF INSTEAD OF LOADING PICTURES ──────
   The frame sequence this replaces works, and it is still here as the fallback
   (useScrubMedia). It has one flaw that no amount of tuning fixes: it cannot
   give memory back.

   An <img> hands its decoded bitmap to WebKit's decoded-image cache. Dropping
   every reference to the Image marks that bitmap reclaimable — it does not
   reclaim it. WebKit purges under pressure, at its own pace, and a fast scrub
   fills the cache faster than it drains. That is the whole reason the sequence
   loader carries a resident window, an eviction pass and sixty lines of notes
   about how wide the window may be: it is negotiating for memory it does not
   own. Measured on the iPhone XR this work started from, the negotiated
   ceiling was about 110 MB — more than every one of the fifty-two images on
   the home page put together, and the one figure that does NOT shrink on a
   smaller screen. That is what was killing the tab.

   A VideoFrame is owned. `close()` frees it, immediately and definitely. So
   this hook holds NO frames at all between scroll ticks: each decoded picture
   is drawn onto the canvas and closed in the same callback, and the only
   pixels still alive are the canvas backing store — about 6 MB on that XR,
   whatever the film's length or resolution. The memory question stops being a
   negotiation and becomes a constant.

   It is also smaller and sharper at the same time. Fifty of these frames
   differ from their neighbour by a few pixels of drone drift, and inter-frame
   compression is exactly the thing WebP cannot do: 150 stills at 864×1080 is
   14.7 MB, the same film at 1080×1350 is 3.93 MB. Fifty-six per cent more
   pixels for seventy-three per cent less data.

   WebCodecs is Safari 16.4+ (March 2023), Chrome 94+. Anything older — or any
   device where `configure()` throws — falls back to the sequence, which is why
   `onFail` exists and why the WebP frames are still generated and shipped. */

/** The build-time index written by scripts/gen-scrub-frames.mjs. */
type FilmIndex = {
  /** e.g. "avc1.640028", read out of the stream's own SPS at build time. */
  codec: string;
  width: number;
  height: number;
  gop: number;
  /** Per picture: [byte offset, byte length, 1 if a keyframe]. */
  frames: [number, number, number][];
};

/* Timestamps are a decoder bookkeeping device here, not a clock — nothing ever
   plays this at speed. A frame's index is recovered by dividing by this, so it
   only has to be consistent between submit and output. */
const TICK = 33_333;

/* How many pictures may be in the decoder's queue at once. A hard flick can ask
   for a jump of eighty frames; submitting all of them would spend a long time
   decoding pictures the playhead has already gone past. A little over one GOP
   keeps the queue honest — the output callback pumps again, so a long seek
   still completes, just in checkable steps. */
const MAX_QUEUE = 12;

/* The hero's copy is gated on `ready`, so `ready` must not be hostage to a
   4 MB download on a slow Indian mobile connection. The poster is already
   painted underneath the canvas, so a hero that reveals its text before the
   film arrives looks exactly like one that was always a photograph. */
const READY_FLOOR_MS = 1200;

export function useScrubFilm({
  canvasRef,
  frameTargetRef,
  drawRef,
  active,
  manifestSrc,
  filmSrc,
  frameCount,
  focusX = 0.5,
  onFail,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** Written by the caller's scrub; read here. Same contract as useScrubMedia. */
  frameTargetRef: RefObject<number>;
  /** Populated here so the caller's ScrollTrigger can nudge us per tick. */
  drawRef: RefObject<(() => void) | null>;
  active: boolean;
  manifestSrc: string;
  filmSrc: string;
  frameCount: number;
  focusX?: number;
  /** Called once if this path cannot run, so the caller can drop to the stills. */
  onFail: () => void;
}) {
  const [ready, setReady] = useState(false);
  // Kept in a ref as well: the effect must be able to read "have we already
  // given up" without taking `failed` as a dependency and re-running itself.
  const failedRef = useRef(false);

  useEffect(() => {
    if (!active || failedRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (typeof window === "undefined" || !("VideoDecoder" in window)) {
      failedRef.current = true;
      onFail();
      return;
    }

    let cancelled = false;
    const abort = new AbortController();
    let decoder: VideoDecoder | null = null;
    let index: FilmIndex | null = null;
    let bytes: Uint8Array | null = null;
    /** How much of the film has actually arrived — see the streaming note. */
    let received = 0;
    /* Local, not the `ready` state: the output callback closes over the value
       from the render that created it, which is false forever. */
    let announced = false;

    const announce = () => {
      if (announced || cancelled) return;
      announced = true;
      setReady(true);
    };

    const fail = () => {
      if (failedRef.current || cancelled) return;
      failedRef.current = true;
      onFail();
    };

    // ── Canvas geometry: identical cover maths to the stills path ──
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      drawn = -1; // resizing wipes the bitmap
    };

    const paint = (frame: VideoFrame) => {
      const { width: cw, height: ch } = canvas;
      const iw = frame.displayWidth;
      const ih = frame.displayHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = Math.max(Math.min(cw - dw, 0), Math.min(0, cw / 2 - focusX * dw));
      ctx.drawImage(frame, dx, (ch - dh) / 2, dw, dh);
    };

    // ── Decoder bookkeeping ──
    /** Keyframe index of the GOP currently loaded in the decoder. */
    let gopStart = -1;
    /** Last picture index handed to decode(). */
    let submitted = -1;
    /** Last picture index actually painted. */
    let drawn = -1;
    /** Lowest output index allowed to paint on this run. See `pump`. */
    let floor = -1;
    /** Hero on screen AND tab in front — see the residency note below. */
    let live = true;

    const want = () =>
      Math.max(0, Math.min(frameCount - 1, Math.round(frameTargetRef.current)));

    /** The keyframe a given picture must be decoded from. */
    const keyFor = (i: number) => {
      let k = i;
      while (k > 0 && !index!.frames[k][2]) k--;
      return k;
    };

    const configure = () => {
      decoder!.configure({
        codec: index!.codec,
        codedWidth: index!.width,
        codedHeight: index!.height,
        // Emit each picture as soon as it exists rather than buffering for
        // playback smoothness — this is a scrub, latency IS the quality.
        optimizeForLatency: true,
      });
    };

    const submit = (i: number) => {
      const [off, len, key] = index!.frames[i];
      decoder!.decode(
        new EncodedVideoChunk({
          type: key ? "key" : "delta",
          timestamp: i * TICK,
          duration: TICK,
          // Annex-B: parameter sets ride in-band with every keyframe, which is
          // why configure() above passes no `description`.
          data: bytes!.subarray(off, off + len),
        })
      );
      submitted = i;
    };

    /** Is every byte of picture i on the wire yet? */
    const havePicture = (i: number) => {
      const [off, len] = index!.frames[i];
      return off + len <= received;
    };

    const pump = () => {
      if (cancelled || !decoder || !index || !bytes) return;
      if (decoder.state === "closed") return;
      /* Without this, a scroll tick arriving while the hero is off screen would
         walk straight past the residency reset below and configure the decoder
         again — holding a hardware decoder open for a section nobody is
         looking at, which is the one thing residency exists to prevent. */
      if (!live) return;

      const target = want();
      if (drawn === target && submitted >= target) return;

      const key = keyFor(target);

      /* Two ways to reach a picture. If it is in the GOP already loaded and
         ahead of what has been submitted, keep feeding — that is the ordinary
         forward scrub and it costs one decode per picture. Otherwise the
         decoder has to be rewound to a keyframe, which is what reset() is: it
         throws away queued work and output, and (per spec) leaves the decoder
         unconfigured, hence the immediate re-configure.

         `floor` is the difference between the two in what gets PAINTED. Running
         forward, every picture decoded is a picture the scrub is passing
         through, so painting them all is the film gliding. Rewinding, the
         pictures between the keyframe and the destination are scaffolding the
         reader must never see — paint those and a backward flick flashes
         forwards from the keyframe first. So a rewind paints only its
         destination. */
      if (key === gopStart && target > submitted) {
        floor = -1;
      } else {
        decoder.reset();
        configure();
        gopStart = key;
        submitted = key - 1;
        floor = target;
        drawn = -1;
      }

      const stop = Math.min(target, submitted + MAX_QUEUE);
      while (submitted < stop && havePicture(submitted + 1)) submit(submitted + 1);
    };

    drawRef.current = () => pump();

    size();
    window.addEventListener("resize", size);

    /* Residency, matching the stills path: hold nothing while the hero is off
       screen or the tab is in the background. There is far less to hold here —
       no frame ever outlives its output callback — but a decoder is a hardware
       resource and iOS is happiest when a backgrounded tab is not sitting on
       one. The canvas keeps its last bitmap, so coming back shows the frame you
       left on. */
    let onScreen = true;
    let visible = true;
    const settleResidency = () => {
      live = onScreen && visible;
      if (!decoder || decoder.state === "closed") return;
      if (!live && decoder.state === "configured") {
        decoder.reset();
        gopStart = -1;
        submitted = -1;
      } else if (live && decoder.state === "unconfigured" && index) {
        configure();
        pump();
      }
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

    const readyTimer = window.setTimeout(announce, READY_FLOOR_MS);

    (async () => {
      try {
        const manifestRes = await fetch(manifestSrc, { signal: abort.signal });
        if (!manifestRes.ok) throw new Error(`film index ${manifestRes.status}`);
        index = (await manifestRes.json()) as FilmIndex;
        if (cancelled) return;

        if (index.frames.length !== frameCount) {
          throw new Error(
            `film has ${index.frames.length} pictures, caller expects ${frameCount}`
          );
        }

        // A decoder that reports the config unsupported is a clean, early "use
        // the stills instead" — much better than letting configure() throw.
        const support = await VideoDecoder.isConfigSupported({
          codec: index.codec,
          codedWidth: index.width,
          codedHeight: index.height,
        });
        if (cancelled) return;
        if (!support.supported) throw new Error(`codec ${index.codec} unsupported`);

        decoder = new VideoDecoder({
          output: (frame) => {
            const i = Math.round(frame.timestamp / TICK);
            if (!cancelled && i >= floor && i >= drawn) {
              paint(frame);
              drawn = i;
              announce();
            }
            // ⚠ ALWAYS, on every path. This one call is the reason this file
            // exists; a missed close leaks a full-resolution bitmap per frame.
            frame.close();
            pump();
          },
          error: () => fail(),
        });
        configure();

        /* The film is read as a STREAM, not awaited whole. Pictures are decoded
           as soon as their bytes have landed (`havePicture`), so the scrub is
           live from the first GOP instead of after four megabytes — which on a
           mobile connection is the difference between a hero that works and one
           that is a still photograph for ten seconds. */
        const filmRes = await fetch(filmSrc, { signal: abort.signal });
        if (!filmRes.ok) throw new Error(`film ${filmRes.status}`);

        const total = Number(filmRes.headers.get("content-length")) || 0;
        if (filmRes.body && total > 0) {
          bytes = new Uint8Array(total);
          const reader = filmRes.body.getReader();
          for (;;) {
            const { done, value } = await reader.read();
            if (done || cancelled) break;
            bytes.set(value, received);
            received += value.length;
            pump();
          }
        } else {
          // No content-length (a proxy stripped it): fall back to the whole
          // buffer at once. Correct, just not progressive.
          const whole = new Uint8Array(await filmRes.arrayBuffer());
          if (cancelled) return;
          bytes = whole;
          received = whole.length;
          pump();
        }
      } catch (err) {
        if (cancelled || (err as Error)?.name === "AbortError") return;
        fail();
      }
    })();

    return () => {
      cancelled = true;
      abort.abort();
      window.clearTimeout(readyTimer);
      drawRef.current = null;
      window.removeEventListener("resize", size);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (decoder && decoder.state !== "closed") decoder.close();
      decoder = null;
      bytes = null;
      index = null;
    };
    // `onFail` must be a stable useCallback at the call site — an inline arrow
    // would rebuild the decoder and re-download the film on every render.
  }, [active, canvasRef, drawRef, frameTargetRef, frameCount, manifestSrc, filmSrc, focusX, onFail]);

  return { ready };
}
