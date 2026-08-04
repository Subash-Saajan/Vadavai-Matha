"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/* ── SCRUBBING A <video> WITHOUT THRASHING THE MEDIA PIPELINE ──────────────
   This replaces a canvas that drew 150 WebP stills, and before that a
   WebCodecs VideoDecoder fed a raw H.264 elementary stream. Both put the
   pictures in the PAGE's memory, which is the thing iOS kills tabs over:
   decoded <img> bitmaps live in WebKit's decoded-image cache, which purges
   lazily and cannot be made to hand memory back on demand, and WebCodecs on
   iOS decodes inside the GPU process, where a failure terminates every tab
   in the browser rather than just this one. Safari 16.4–18.7 ships only a
   partial WebCodecs implementation anyway, and its isConfigSupported() is a
   string prefix match on the codec — so a decoder that VideoToolbox will
   refuse still reports `supported: true`, and the "fall back to stills"
   guard the old hook was built around could never be relied on to fire.

   A <video> hands all of that to the system media pipeline, which decodes
   into a small recycled set of frame buffers that iOS itself manages.

   ── WHY THE SEEKS ARE COALESCED, WHICH IS THE WHOLE POINT OF THIS FILE ──
   The reason the site moved OFF <video> for phones in the first place was
   that it scrubbed badly. It scrubbed badly because the old code did this,
   on every single ScrollTrigger tick:

       onUpdate: () => { if (video.readyState >= 2) video.currentTime = t }

   A scrub tick fires per animation frame. Setting `currentTime` starts an
   asynchronous seek — pipeline flush, then decode forward from the nearest
   keyframe — and a phone cannot retire those at 60 Hz. So each new value
   landed on an element that was still seeking to the last one, the queue
   grew, and the picture lagged the thumb and then jumped. That reads as
   "phones can't scrub video". They can; they cannot be asked to seek sixty
   times a second.

   So: never more than ONE seek in flight. New targets overwrite `pending`
   rather than queueing, and the next seek is issued when the last one
   lands — always to the LATEST position, never to a stale one. The scrub
   therefore runs at whatever rate the device can actually seek, and always
   towards where the reader currently is. Dropping intermediate positions is
   correct here: nobody can see a frame that was superseded 8 ms later.

   `video.seeking` is read rather than tracked in a local flag, because the
   element is the authority — a seek can also be started by something else,
   and a flag would then let us issue a second one on top of it. */

/* The hero's copy is gated on `ready`, so `ready` must not be hostage to a
   download on a slow connection. The poster is already painted underneath,
   so a hero that reveals its text before the video arrives looks exactly
   like one that was always a photograph. */
const READY_FLOOR_MS = 1200;

/* ── DON'T SPEND A SEEK ON A PICTURE THAT IS ALREADY ON SCREEN ─────────────
   The film is 30fps, so two times less than ~33ms apart resolve to the same
   frame. Seeking anyway costs a full pipeline flush (19–27ms on a Galaxy A55
   at the shipped encode) and shows the reader nothing new — and because only
   one seek runs at a time, that wasted slot delays the NEXT move, which is
   the one they can see. Half a frame is the threshold: below it we are
   already displaying the right picture. */
const FRAME_S = 1 / 30;
const MIN_SEEK_DELTA = FRAME_S / 2;


export function useScrubVideo({
  videoRef,
  src,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  /**
   * Which cut to scrub, or null when this device is not on a <video> path at
   * all (the WebCodecs film, or SSR before the engine is known). The choice
   * itself lives in useHeroMedia — this hook only ever drives what it is given.
   */
  src: string | null;
}) {
  const [ready, setReady] = useState(false);

  /** Written by the caller's ScrollTrigger; read here. 0–1 along the film. */
  const progressRef = useRef(0);
  /** Populated here so the caller can nudge us once per scrub tick. */
  const seekRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!src) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    /** Latest requested time, or null when there is nothing outstanding. */
    let pending: number | null = null;

    const flush = () => {
      if (cancelled || pending === null) return;
      // HAVE_CURRENT_DATA — below this a seek has nothing to seek within.
      if (video.seeking || video.readyState < 2) return;
      const t = pending;
      // Guard against NaN/Infinity duration on a half-loaded element.
      if (!Number.isFinite(t)) return;
      pending = null;
      // Already showing this picture — see MIN_SEEK_DELTA.
      if (Math.abs(t - video.currentTime) < MIN_SEEK_DELTA) return;
      video.currentTime = t;
    };

    const request = () => {
      const d = video.duration;
      if (!Number.isFinite(d) || d <= 0) return;
      // Land just inside the end: currentTime === duration is the "ended"
      // boundary, and some engines snap it back to 0.
      pending = Math.max(0, Math.min(d - 0.001, progressRef.current * d));
      flush();
    };
    seekRef.current = request;

    const announce = () => {
      if (!cancelled) setReady(true);
    };

    const onLoaded = () => {
      if (cancelled) return;
      announce();
      request();
    };

    /* `seeked` is the normal driver. The others are belt and braces: a seek
       that errors, or one the engine quietly abandons, would otherwise leave
       `video.seeking` true forever and wedge the scrub with no way back. */
    video.addEventListener("seeked", flush);
    video.addEventListener("timeupdate", flush);
    video.addEventListener("canplay", flush);
    video.addEventListener("error", flush);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("loadeddata", onLoaded);
    if (video.readyState >= 1) onLoaded();

    /* ── iOS WILL NOT ALWAYS PRELOAD, WHATEVER preload SAYS ────────────────
       `preload="auto"` is a hint, and iOS ignores it outright in Low Power
       Mode and sometimes on cellular. The element then sits at readyState 0
       and every seek above is skipped, so the hero stays on its poster and
       never moves — which looks exactly like the bug this file replaced.

       A muted, playsinline element is allowed to start without a gesture, so
       one play() immediately followed by pause() forces the pipeline to
       fetch and decode. It is inaudible and invisible (we pause within the
       same task, before a frame is presented), and it is a no-op on any
       browser that had already preloaded. Errors are swallowed on purpose:
       if autoplay is refused the gesture listener below covers it. */
    const kick = () => {
      if (cancelled || video.readyState >= 2) return;
      video.play().then(
        () => video.pause(),
        () => {}
      );
    };
    kick();

    // Last resort: the first time the reader touches the page, we are
    // allowed to do the above even under the strictest policy.
    const onGesture = () => kick();
    window.addEventListener("touchstart", onGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });

    const floor = window.setTimeout(announce, READY_FLOOR_MS);

    return () => {
      cancelled = true;
      seekRef.current = null;
      window.clearTimeout(floor);
      video.removeEventListener("seeked", flush);
      video.removeEventListener("timeupdate", flush);
      video.removeEventListener("canplay", flush);
      video.removeEventListener("error", flush);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("loadeddata", onLoaded);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("pointerdown", onGesture);
    };
  }, [src, videoRef]);

  /** Called by the caller's scrub: set progress, then ask for a seek. */
  const scrubTo = useCallback((progress: number) => {
    progressRef.current = progress;
    seekRef.current?.();
  }, []);

  return { ready, scrubTo };
}
