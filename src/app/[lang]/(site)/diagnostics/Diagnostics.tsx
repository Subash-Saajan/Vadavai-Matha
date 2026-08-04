"use client";

import { useEffect, useState } from "react";

import { bbClear, useFlightRecord } from "@/lib/blackbox";

/**
 * WHICH HERO PATH DOES THIS PHONE ACTUALLY TAKE?
 *
 * The mobile hero has two implementations and they differ by a factor of five
 * in memory: the WebCodecs film holds one VideoFrame at a time (~6 MB), the
 * WebP stills hold a window of nine (~32 MB, and 75 MB before today). Which one
 * runs is decided at runtime by `useScrubMedia`, silently, and the losing path
 * demotes itself through `onFail` without saying so anywhere.
 *
 * On a device that dies a second after painting, that is the difference between
 * the hero being the problem and the hero being irrelevant — and it had been
 * argued from documentation rather than measured. This page measures it. It
 * runs the SAME config the hero runs, against the SAME film, and prints what
 * the device says.
 *
 * It carries no photographs and no canvas, so it cannot itself be killed by the
 * thing being investigated — the point of putting it on its own route.
 *
 * Delete with lib/probe.ts once the cause is settled.
 */

const FILM_SRC = "/hero-frames/film.h264";
const FILM_INDEX_SRC = "/hero-frames/film.json";

type Row = { k: string; v: string; bad?: boolean; good?: boolean };

export function Diagnostics() {
  const [rows, setRows] = useState<Row[]>([]);
  const [done, setDone] = useState(false);
  /* The record of the page that died — read through a store rather than an
     effect so it is available on the first render and needs no setState. */
  const record = useFlightRecord();
  const [cleared, setCleared] = useState(false);
  const flight = cleared ? [] : record;

  useEffect(() => {
    let dead = false;
    const out: Row[] = [];
    const put = (k: string, v: string, flag?: "bad" | "good") => {
      out.push({ k, v, bad: flag === "bad", good: flag === "good" });
      if (!dead) setRows([...out]);
    };

    (async () => {
      // ── The device ──
      const dpr = window.devicePixelRatio || 1;
      put("screen", `${window.innerWidth}×${window.innerHeight} css`);
      put("devicePixelRatio", String(dpr));
      put(
        "canvas backing store",
        `${(window.innerWidth * Math.min(dpr, 2) * window.innerHeight * Math.min(dpr, 2) * 4 / 1048576).toFixed(1)} MB`,
      );
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        hardwareConcurrency?: number;
      };
      put("deviceMemory", nav.deviceMemory ? `${nav.deviceMemory} GB` : "not reported (Safari)");
      put("cores", String(nav.hardwareConcurrency ?? "?"));
      put("userAgent", navigator.userAgent);

      // ── Step 1: does WebCodecs exist at all? ──
      const hasVD = typeof window !== "undefined" && "VideoDecoder" in window;
      put("VideoDecoder in window", hasVD ? "YES" : "NO", hasVD ? "good" : "bad");
      if (!hasVD) {
        put("→ HERO PATH", "WebP stills — ~32 MB", "bad");
        setDone(true);
        return;
      }

      // ── Step 2: the film's own index ──
      let index: {
        codec: string;
        width: number;
        height: number;
        frames: [number, number, number][];
      };
      try {
        const r = await fetch(FILM_INDEX_SRC);
        index = await r.json();
        put("film.json", `${r.status} · ${index.codec} · ${index.width}×${index.height} · ${index.frames.length} frames`);
      } catch (e) {
        put("film.json", `FAILED — ${String(e)}`, "bad");
        put("→ HERO PATH", "WebP stills — ~32 MB", "bad");
        setDone(true);
        return;
      }

      const config: VideoDecoderConfig = {
        codec: index.codec,
        codedWidth: index.width,
        codedHeight: index.height,
        optimizeForLatency: true,
      };

      // ── Step 3: THE QUESTION. Does this device accept the hero's config? ──
      // Exactly what useScrubFilm asks, including passing no `description`.
      try {
        const support = await VideoDecoder.isConfigSupported(config);
        put(
          "isConfigSupported",
          support.supported ? "SUPPORTED" : "NOT SUPPORTED",
          support.supported ? "good" : "bad",
        );
        if (!support.supported) {
          put("→ HERO PATH", "WebP stills — ~32 MB", "bad");
          setDone(true);
          return;
        }
      } catch (e) {
        put("isConfigSupported", `THREW — ${String(e)}`, "bad");
        put("→ HERO PATH", "WebP stills — ~32 MB", "bad");
        setDone(true);
        return;
      }

      /* ── Step 4: supported is a claim, a decoded frame is a fact ──
         `isConfigSupported` can say yes and the decoder still emit nothing —
         which is the failure this whole investigation would miss, because the
         hero would sit on a path that never produces a picture. So actually
         decode the first keyframe and look at what comes out. One Range
         request, one frame, closed immediately. */
      try {
        const [off, len] = index.frames[0];
        const res = await fetch(FILM_SRC, {
          headers: { Range: `bytes=${off}-${off + len - 1}` },
        });
        put("range request", `${res.status} · ${(await res.clone().blob()).size} bytes`);
        const bytes = new Uint8Array(await res.arrayBuffer());

        const frame = await new Promise<VideoFrame | null>((resolve) => {
          const timer = setTimeout(() => resolve(null), 8000);
          let decoder: VideoDecoder;
          try {
            decoder = new VideoDecoder({
              output: (f) => {
                clearTimeout(timer);
                resolve(f);
              },
              error: (err) => {
                clearTimeout(timer);
                put("decoder error", String(err), "bad");
                resolve(null);
              },
            });
            decoder.configure(config);
            decoder.decode(
              new EncodedVideoChunk({
                type: "key",
                timestamp: 0,
                duration: 33333,
                data: bytes,
              }),
            );
            decoder.flush().catch(() => {});
          } catch (err) {
            clearTimeout(timer);
            put("configure/decode", `THREW — ${String(err)}`, "bad");
            resolve(null);
          }
        });

        if (frame) {
          put(
            "REAL DECODE",
            `OK — ${frame.displayWidth}×${frame.displayHeight} ${frame.format ?? ""}`,
            "good",
          );
          frame.close();
          put("→ HERO PATH", "WebCodecs film — ~6 MB", "good");
        } else {
          put("REAL DECODE", "produced no frame", "bad");
          put("→ HERO PATH", "WebP stills — ~32 MB", "bad");
        }
      } catch (e) {
        put("REAL DECODE", `FAILED — ${String(e)}`, "bad");
        put("→ HERO PATH", "WebP stills — ~32 MB", "bad");
      }

      setDone(true);
    })();

    return () => {
      dead = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="font-display text-2xl text-navy">Hero path diagnostics</h1>
      <p className="mt-2 text-sm text-text-muted">
        Which of the two mobile hero implementations this device actually runs,
        and why. Screenshot this whole page.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left font-mono text-[0.72rem] leading-relaxed">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gold/15 align-top">
                <td className="py-2 pr-4 whitespace-nowrap text-navy/70">{r.k}</td>
                <td
                  className={`py-2 break-all ${
                    r.bad
                      ? "font-bold text-red-700"
                      : r.good
                        ? "font-bold text-green-700"
                        : "text-navy"
                  }`}
                >
                  {r.v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-text-muted">
        {done ? "Finished." : "Running…"}
      </p>

      {/* ── The flight recorder ────────────────────────────────────────────
          What the page that died was doing, up to the last moment it managed
          to write. The FINAL ROW is the answer: how much was decoded, how far
          down the page, and whether frames were still advancing. */}
      <h2 className="mt-16 font-display text-xl text-navy">
        Last recorded page {flight.length ? `(${flight.length} entries)` : ""}
      </h2>

      {flight.length === 0 ? (
        <p className="mt-3 text-sm text-text-muted">
          Nothing recorded yet. Open{" "}
          <span className="font-mono text-navy">littlerome.net/?bb=1</span>,
          let it die, then come back here.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm text-text-muted">
            The last row is the moment before the crash. `frames` still rising
            means it was alive and ran out of something; `frames` stuck while
            `t` climbs means it froze first.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left font-mono text-[0.68rem]">
              <thead>
                <tr className="border-b border-gold/40 text-navy/60">
                  <th className="py-1 pr-3">t ms</th>
                  <th className="py-1 pr-3">what</th>
                  <th className="py-1 pr-3">img MB</th>
                  <th className="py-1 pr-3">canvas</th>
                  <th className="py-1 pr-3">imgs</th>
                  <th className="py-1 pr-3">DOM</th>
                  <th className="py-1 pr-3">scrollY</th>
                  <th className="py-1">frames</th>
                </tr>
              </thead>
              <tbody>
                {flight.map((e, i) => {
                  const last = i === flight.length - 1;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-gold/10 ${
                        last ? "bg-red-50 font-bold text-red-800" : "text-navy"
                      }`}
                    >
                      <td className="py-1 pr-3">{e.t}</td>
                      <td className="py-1 pr-3">{e.note ? `${e.label} ${e.note}` : e.label}</td>
                      <td className="py-1 pr-3">{e.imgMB ?? ""}</td>
                      <td className="py-1 pr-3">{e.canvasMB ?? ""}</td>
                      <td className="py-1 pr-3">{e.imgs ?? ""}</td>
                      <td className="py-1 pr-3">{e.el ?? ""}</td>
                      <td className="py-1 pr-3">{e.scrollY ?? ""}</td>
                      <td className="py-1">{e.frames ?? ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => {
              bbClear();
              setCleared(true);
            }}
            className="mt-5 rounded-full border border-gold/40 px-4 py-2 font-display text-xs uppercase tracking-widest text-navy"
          >
            Clear and stop recording
          </button>
        </>
      )}
    </section>
  );
}
