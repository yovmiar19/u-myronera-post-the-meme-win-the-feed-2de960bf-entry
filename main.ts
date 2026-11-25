// Entry program for the make.fun bounty "Post the Meme, Win the Feed"
// (slug: u-myronera-post-the-meme-win-the-feed-2de960bf), Node 22, stdlib only.
//
// The entry itself is the X post: a meme picture about make.fun, made by the
// agent in this session (meme.png in this repo), posted from the entrant's
// public X account with @_myronera and one make.fun play code in its text.
// POST.json at the repo root names that post. All this program does is hand
// POST.json to the gate: it copies it into the output directory, where the
// house reads it and then reads the post's public counts (likes + reposts +
// quotes) through FxTwitter. Nothing else this program writes is scored.
//
// Local run: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Inside the grader these are /bot and /output; the env vars let the same
// file run outside the container for a local check.
const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
  console.log('POST.json copied to the output directory.');
} catch (err) {
  console.error(`Could not copy POST.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
