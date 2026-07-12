import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const css = await readFile(new URL("../polish.css", import.meta.url), "utf8");
const rules = await readFile(new URL("../firestore.rules", import.meta.url), "utf8");
const build = await readFile(new URL("../build-info.js", import.meta.url), "utf8");

test("hotfix bumps the public build and cache", () => {
  assert.match(build, /version:\s*"3\.1\.2"/);
  assert.match(build, /millennium-shell-v3\.1\.2/);
});

test("aim game creates targets immediately and forces mobile visibility", () => {
  assert.match(app, /addTarget\(\);\s*\n\s*const firstWave/);
  assert.match(css, /\.aim-target\s*\{[\s\S]*z-index:\s*4;[\s\S]*opacity:\s*1;/);
});

test("Firestore rules restore bounded affinity, gift and minigame operations", () => {
  for (const name of [
    "ownerAffinityRollUpdate",
    "ownerAffinityChoiceUpdate",
    "ownerGiftClaimUpdate",
    "ownerMinigameResultUpdate",
  ]) assert.match(rules, new RegExp(`function ${name}\\(`));
  assert.match(rules, /spent >= 1 && spent <= 10/);
  assert.match(rules, /nextCoins <= oldCoins \+ 5000/);
  assert.match(rules, /request\.resource\.data\.get\("pendingGift", null\) == null/);
});
