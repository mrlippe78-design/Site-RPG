import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

globalThis.window = globalThis;
await import(`../millennium-foundations.js?foundations=${Date.now()}`);
const foundations = globalThis.MILLENNIUM_FOUNDATIONS_34;

test("every difficulty has three sequential internal levels", () => {
  assert.deepEqual(foundations.minigameLevels.map((level) => level.id), [1, 2, 3]);
  const difficulty = { id: "facil", minScore: 2000 };
  assert.deepEqual([1, 2, 3].map((level) => foundations.minigameTarget(difficulty, level)), [1500, 2000, 2600]);
});

test("a good score unlocks only the next internal level", () => {
  const character = {};
  const difficulty = { id: "facil", minScore: 2000 };
  const first = foundations.recordMinigameProgress(character, "seals", difficulty, 1, 1500);
  assert.equal(first.passed, true);
  assert.equal(first.unlockedNext, true);
  assert.equal(first.progress.seals.facil.unlockedLevel, 2);
  const secondCharacter = { minigameProgress: first.progress };
  assert.equal(foundations.isMinigameLevelUnlocked(secondCharacter, "seals", "facil", 2), true);
  assert.equal(foundations.isMinigameLevelUnlocked(secondCharacter, "seals", "facil", 3), false);
});

test("a low score preserves the best score without unlocking", () => {
  const difficulty = { id: "hard", minScore: 6000 };
  const result = foundations.recordMinigameProgress({}, "aim", difficulty, 1, 4499);
  assert.equal(result.passed, false);
  assert.equal(result.progress.aim.hard.unlockedLevel, 1);
  assert.equal(result.progress.aim.hard.bestScores[1], 4499);
});

test("technique spaces unlock every five character levels", () => {
  assert.equal(foundations.techniqueSlotsForLevel(1), 0);
  assert.equal(foundations.techniqueSlotsForLevel(4), 0);
  assert.equal(foundations.techniqueSlotsForLevel(5), 1);
  assert.equal(foundations.techniqueSlotsForLevel(10), 2);
  assert.equal(foundations.techniqueSlotsForLevel(29), 5);
  assert.equal(foundations.nextTechniqueLevel(10), 15);
});

test("all affinities receive power, technique and limitation guidance", () => {
  const enriched = foundations.enrichAffinities([
    { id: "fogo", name: "Fogo", categoryId: "elemental", domain: "Calor e chama.", limit: "Exige combustível." },
    { id: "eco", name: "Eco", categoryId: "espiritual" },
  ], [{ id: "elemental", name: "Elemental" }, { id: "espiritual", name: "Espiritual" }]);
  for (const affinity of enriched) {
    assert.ok(affinity.description);
    assert.ok(affinity.limitations);
    assert.match(affinity.powerFoundation, /único Poder central/);
    assert.match(affinity.techniqueGuide, /níveis 5, 10, 15/);
  }
});

test("jukebox exposes multiple distinct seasonal tracks", () => {
  assert.ok(foundations.musicTracks.length >= 10);
  assert.equal(new Set(foundations.musicTracks.map((track) => track.id)).size, foundations.musicTracks.length);
  assert.equal(foundations.musicTrack("eclipse").name, "Coroa do Eclipse");
});

test("3.4 integration contains live ranking, pass and safe save paths", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const rules = await readFile(new URL("../firestore.rules", import.meta.url), "utf8");
  const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(index, /millennium-foundations\.js\?v=3\.4\.0/);
  assert.match(app, /routeCollection\("rankings"/);
  assert.match(app, /"pass"[\s\S]*subscribeOwnRequests/);
  assert.match(app, /saveLocalFormDraft\(form\);[\s\S]*scheduleRender/);
  assert.match(app, /Promise\.allSettled/);
  assert.match(rules, /match \/rankings\/\{uid\}/);
  assert.match(rules, /ownerPassMissionClaimUpdate/);
  assert.match(rules, /minigameProgress/);
});
