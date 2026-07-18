// nano.mjs — minimal Gemini (Nano Banana / Imagen) image generation + editing helper.
// Usage:
//   node scripts/nano.mjs --model gemini-2.5-flash-image --prompt "..." --out file.png [--img in1.jpg --img in2.jpg]
// Reads GOOGLE_API_KEY from website/.env.local. No deps (Node 18+ fetch).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, "..");

function loadKey() {
  const env = readFileSync(resolve(ROOT, ".env.local"), "utf8");
  const m = env.match(/^GOOGLE_API_KEY=(.+)$/m);
  if (!m) throw new Error("GOOGLE_API_KEY not found in .env.local");
  return m[1].trim();
}

function parseArgs(argv) {
  const out = { imgs: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--model") out.model = argv[++i];
    else if (a === "--prompt") out.prompt = argv[++i];
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--img") out.imgs.push(argv[++i]);
  }
  return out;
}

const mimeOf = (p) =>
  p.toLowerCase().endsWith(".png") ? "image/png" :
  p.toLowerCase().endsWith(".webp") ? "image/webp" : "image/jpeg";

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const model = args.model || "gemini-2.5-flash-image";
  if (!args.prompt) throw new Error("--prompt required");
  if (!args.out) throw new Error("--out required");
  const key = loadKey();

  const parts = [];
  for (const p of args.imgs) {
    const abs = resolve(ROOT, p);
    const data = readFileSync(abs).toString("base64");
    parts.push({ inline_data: { mime_type: mimeOf(p), data } });
  }
  parts.push({ text: args.prompt });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const t0 = Date.now();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts }] }),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error(`HTTP ${res.status}`);
    console.error(JSON.stringify(json, null, 2).slice(0, 1200));
    process.exit(1);
  }

  const cand = json.candidates?.[0];
  const outParts = cand?.content?.parts || [];
  const imgPart = outParts.find((p) => p.inlineData || p.inline_data);
  const textPart = outParts.find((p) => p.text);

  if (!imgPart) {
    console.error("No image returned. Finish reason:", cand?.finishReason);
    if (textPart) console.error("Model text:", textPart.text?.slice(0, 600));
    console.error("Raw:", JSON.stringify(json, null, 2).slice(0, 1000));
    process.exit(2);
  }

  const inline = imgPart.inlineData || imgPart.inline_data;
  const buf = Buffer.from(inline.data, "base64");
  const outAbs = resolve(ROOT, args.out);
  mkdirSync(dirname(outAbs), { recursive: true });
  writeFileSync(outAbs, buf);

  const ms = Date.now() - t0;
  console.log(`OK  model=${model}  ${(buf.length / 1024).toFixed(0)}KB  ${ms}ms  -> ${args.out}`);
  if (json.usageMetadata) console.log("usage:", JSON.stringify(json.usageMetadata));
}

main().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
