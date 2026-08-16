// Build the tiny webfont used for a name in a non-Latin script.
//
//   npm run subset:cn            # reads profile.nameCn from src/data.js
//   npm run subset:cn -- 张三     # or pass the characters directly
//   npm run subset:cn -- 张三 --family "Noto Sans SC"
//
// Why this exists: Astro's font pipeline subsets by character *set*, and the
// smallest CJK set on offer is the whole simplified-Chinese range — several
// megabytes for what is usually two or three glyphs. Google's CSS API will cut
// a font down to an exact string, which is what this asks for. The result is
// normally 2–4 KB.
//
// Fonts served by Google Fonts are open source (Noto and most others are under
// the SIL Open Font License), so self-hosting the subset is fine; keep the
// licence in mind if you point this at something else.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "public/fonts/cjk-name-subset.woff2");

// A modern browser UA is required: Google serves woff2 to browsers that
// support it and the much larger ttf to everything else.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const args = process.argv.slice(2);
const familyIndex = args.indexOf("--family");
const family = familyIndex === -1 ? "Noto Serif SC" : args[familyIndex + 1];
const text = args
  .filter((a, i) => !a.startsWith("--") && !(familyIndex !== -1 && i === familyIndex + 1))
  .join("");

async function nameFromData() {
  const source = await readFile(resolve(root, "src/data.js"), "utf8");
  return source.match(/nameCn:\s*["'`](.*?)["'`]/)?.[1] ?? "";
}

const characters = text || (await nameFromData());

if (!characters) {
  console.error(
    "Nothing to subset. Set `nameCn` in src/data.js, or pass the characters:\n" +
      "  npm run subset:cn -- 张三",
  );
  process.exit(1);
}

const cssUrl =
  "https://fonts.googleapis.com/css2?family=" +
  encodeURIComponent(`${family}:wght@400`) +
  "&text=" +
  encodeURIComponent(characters);

const css = await fetch(cssUrl, { headers: { "User-Agent": UA } }).then((r) => {
  if (!r.ok) {
    throw new Error(
      `Google Fonts returned ${r.status} for "${family}". Check the family ` +
        `name — it must match the one on fonts.google.com exactly.`,
    );
  }
  return r.text();
});

const fontUrl = css.match(/url\((https:[^)]+)\)/)?.[1];
if (!fontUrl) throw new Error(`No font URL in the response:\n${css}`);

const font = Buffer.from(
  await fetch(fontUrl, { headers: { "User-Agent": UA } }).then((r) =>
    r.arrayBuffer(),
  ),
);

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, font);

console.log(
  `Wrote public/fonts/cjk-name-subset.woff2 — ${characters} in ${family}, ` +
    `${(font.length / 1024).toFixed(1)} KB.`,
);
