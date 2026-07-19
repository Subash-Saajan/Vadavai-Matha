// gen-scrub-frames.mjs — extract the mobile scrub frame sequences from the
// site's scroll films (home hero + architecture peel film).
//
// Desktop scrubs the real <video> with currentTime, but phones can't (every
// currentTime set is a full seek — pipeline flush + decode from the nearest
// keyframe), so on touch devices useScrubMedia draws these pre-extracted
// frames onto a <canvas> instead (the Apple product-page technique).
//
// Frames are center-cropped to 4:5 (576×720 of the 1280×720 source) because
// phones only ever see that center slice through object-cover anyway — the
// crop doubles effective sharpness and halves the payload. 150 frames at
// quality 60 ≈ 6.4 MB, less than the 7.9 MB video mobile used to download.
//
// If a film changes, re-run this and keep FRAME_COUNT in the component that
// renders it (Hero.tsx / PeelFilm.tsx) in sync with the printed frame count.
//
// Usage:  node scripts/gen-scrub-frames.mjs [hero|peel|all]   (default: all)

import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, statSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, "..");

const FRAME_STEP = 4; // every 4th of the ~600 source frames → ~150 frames
const CROP = "crop=576:720:352:0"; // center 4:5 slice of 1280×720
const QUALITY = "60";

const JOBS = {
  hero: { src: "public/hero-video.mp4", out: "public/hero-frames" },
  peel: { src: "public/peel-film.mp4", out: "public/peel-frames" },
};

const pick = process.argv[2] ?? "all";
const names = pick === "all" ? Object.keys(JOBS) : [pick];
if (names.some((n) => !JOBS[n])) {
  throw new Error(`Unknown job "${pick}" — use hero, peel or all`);
}

for (const name of names) {
  const src = resolve(ROOT, JOBS[name].src);
  const out = resolve(ROOT, JOBS[name].out);

  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  // The scrub sequence (portrait crop, mobile only).
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error",
    "-i", src,
    "-vf", `select=not(mod(n\\,${FRAME_STEP})),${CROP}`,
    "-vsync", "0",
    "-c:v", "libwebp", "-q:v", QUALITY,
    resolve(out, "f%03d.webp"),
  ], { stdio: "inherit" });

  // Full-frame poster (first frame, landscape) — painted under both the
  // desktop video and the mobile canvas so the section has pixels before
  // either is ready.
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error",
    "-i", src,
    "-frames:v", "1",
    "-c:v", "libwebp", "-q:v", "75",
    resolve(out, "poster.webp"),
  ], { stdio: "inherit" });

  const files = readdirSync(out);
  const total = files.reduce((s, f) => s + statSync(resolve(out, f)).size, 0);
  console.log(
    `${name}: ${files.length - 1} frames + poster, ` +
    `${(total / 1024 / 1024).toFixed(1)} MB → ${JOBS[name].out}/`
  );
}
