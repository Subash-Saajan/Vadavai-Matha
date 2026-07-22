// gen-scrub-frames.mjs — extract the mobile scrub frame sequences from the
// site's scroll films (home hero + architecture peel film).
//
// Desktop scrubs the real <video> with currentTime, but phones can't (every
// currentTime set is a full seek — pipeline flush + decode from the nearest
// keyframe), so on touch devices useScrubMedia draws these pre-extracted
// frames onto a <canvas> instead (the Apple product-page technique).
//
// The hero frames come straight from the 4K drone master (IMG_3548.MP4 in
// the project root, one level above website/) rather than the compressed
// delivery video, so they don't inherit its H.264 artifacts. The master
// plays forward (church → sky); the site scrubs it in reverse, so hero
// frames are renamed back-to-front after extraction. It also carries a
// bogus -90° rotation flag (drone quirk) that -display_rotation 0 clears —
// without it every frame comes out sideways.
//
// The delivery video itself is also derived from the master (1080p30,
// reversed, dense keyframes for scrubbing, rotation flag cleared):
//
//   ffmpeg -display_rotation 0 -i ../IMG_3548.MP4 -map 0:0 \
//     -vf "fps=30,scale=1920:1080,reverse" -c:v libx264 -crf 24 \
//     -preset slow -g 15 -pix_fmt yuv420p -movflags +faststart -an \
//     public/hero-video.mp4     (copied to public/peel-film.mp4 while the
//                                real AI peel film is pending)
//
// Frames are center-cropped to 4:5 (phones only ever see that center slice
// through object-cover) and scaled to 864×1080 WebP. If a film changes,
// re-run this and keep FRAME_COUNT in Hero.tsx / PeelFilm.tsx in sync with
// the printed frame count.
//
// Usage:  node scripts/gen-scrub-frames.mjs [hero|peel|all]   (default: all)

import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, renameSync, statSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, "..");

// Center 4:5 slice at any source size, then a size that keeps ~150 frames
// around 10 MB while staying sharp on 3× phone screens.
const CROP = "crop=ih*0.8:ih:(iw-ih*0.8)/2:0";
const SIZE = "scale=864:1080";
const QUALITY = "68";

const JOBS = {
  hero: {
    src: "../IMG_3548.MP4", // 4K 60 fps master, project root
    out: "public/hero-frames",
    step: 8, // ~1197 source frames → ~150
    reversed: true,
    inputArgs: ["-display_rotation", "0"],
    mapArgs: ["-map", "0:0"], // skip the attached-thumbnail stream
    posterSeek: ["-sseof", "-0.3"], // site starts where the master ends
  },
  peel: {
    src: "public/peel-film.mp4", // already reversed 1080p30 stand-in
    out: "public/peel-frames",
    step: 4, // ~599 source frames → ~150
    reversed: false,
    inputArgs: [],
    mapArgs: [],
    posterSeek: [],
  },
};

const pick = process.argv[2] ?? "all";
const names = pick === "all" ? Object.keys(JOBS) : [pick];
if (names.some((n) => !JOBS[n])) {
  throw new Error(`Unknown job "${pick}" — use hero, peel or all`);
}

for (const name of names) {
  const job = JOBS[name];
  const src = resolve(ROOT, job.src);
  const out = resolve(ROOT, job.out);

  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  // The scrub sequence (portrait crop, mobile only).
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error",
    ...job.inputArgs,
    "-i", src,
    ...job.mapArgs,
    "-vf", `select=not(mod(n\\,${job.step})),${CROP},${SIZE}`,
    "-vsync", "0",
    "-c:v", "libwebp", "-q:v", QUALITY,
    resolve(out, "f%03d.webp"),
  ], { stdio: "inherit" });

  if (job.reversed) {
    const frames = readdirSync(out).filter((f) => /^f\d+\.webp$/.test(f)).sort();
    const n = frames.length;
    for (const f of frames) renameSync(resolve(out, f), resolve(out, `tmp-${f}`));
    frames.forEach((f, i) => {
      renameSync(
        resolve(out, `tmp-${f}`),
        resolve(out, `f${String(n - i).padStart(3, "0")}.webp`)
      );
    });
  }

  // Full-frame poster (the site's first frame, landscape) — painted under
  // both the desktop video and the mobile canvas so the section has pixels
  // before either is ready.
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error",
    ...job.inputArgs,
    ...job.posterSeek,
    "-i", src,
    ...job.mapArgs,
    "-frames:v", "1",
    "-vf", "scale=1920:-2",
    "-c:v", "libwebp", "-q:v", "78",
    resolve(out, "poster.webp"),
  ], { stdio: "inherit" });

  const files = readdirSync(out);
  const total = files.reduce((s, f) => s + statSync(resolve(out, f)).size, 0);
  console.log(
    `${name}: ${files.length - 1} frames + poster, ` +
    `${(total / 1024 / 1024).toFixed(1)} MB → ${JOBS[name].out}/`
  );
}
