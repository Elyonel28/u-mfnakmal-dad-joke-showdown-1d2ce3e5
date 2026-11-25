// Dad Joke Showdown — make.fun bounty u-mfnakmal-dad-joke-showdown-1d2ce3e5
// Writes exactly one dad joke (at most 200 characters) to /output/entry.txt.
// Node 22+ stdlib only; no dependencies, no network, no secrets.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked my phone charger why it keeps wandering off. It said it's just trying to stay current.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("joke must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JOKE + "\n", "utf8");

// Read it back: the file on disk must be exactly the joke plus one newline.
const roundTrip = readFileSync(outFile, "utf8");
if (roundTrip !== JOKE + "\n") {
  throw new Error("round-trip check failed: entry.txt does not match the joke");
}
console.log(
  `wrote entry.txt (${JOKE.length} chars, ${Buffer.byteLength(JOKE, "utf8")} bytes)`,
);
