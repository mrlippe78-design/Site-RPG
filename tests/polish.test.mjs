import assert from "node:assert/strict";
import { test } from "node:test";

globalThis.window = globalThis;
await import(`../millennium-polish.js?test=${Date.now()}`);
const polish = globalThis.MILLENNIUM_POLISH_31;

test("minigame lifecycle only accepts declared transitions", () => {
  let clock = 100;
  const lifecycle = polish.createLifecycle("idle", () => clock += 10);
  assert.equal(lifecycle.state, "idle");
  assert.equal(lifecycle.transition("preparing", "selected"), "preparing");
  assert.equal(lifecycle.transition("running", "ready"), "running");
  assert.equal(lifecycle.transition("paused", "user"), "paused");
  assert.equal(lifecycle.transition("running", "resume"), "running");
  assert.equal(lifecycle.transition("resolving", "finish"), "resolving");
  assert.equal(lifecycle.transition("completed", "reward"), "completed");
  assert.equal(lifecycle.terminal, true);
  assert.throws(() => lifecycle.transition("running"), /Transição inválida/);
  assert.equal(lifecycle.history.length, 7);
});

test("fallback visuals are deterministic and category-specific", () => {
  const raceA = polish.fallbackVisual("race", { id: "elfo", name: "Elfo" });
  const raceB = polish.fallbackVisual("race", { id: "elfo", name: "Elfo" });
  const map = polish.fallbackVisual("map", { id: "elfo", name: "Elfo" });
  assert.equal(raceA, raceB);
  assert.notEqual(raceA, map);
  assert.match(raceA, /^data:image\/svg\+xml/);
});

test("codex presentation separates affinity metadata from narrative summary", () => {
  const result = polish.codexPresentation("affinities", {
    id: "fogo",
    name: "Fogo",
    summary: "Controle térmico e combustão.",
    domain: "Calor e chamas",
    limitations: "Exige fonte de energia",
  }, {
    category: { name: "Elemental", rarity: "Comum" },
    ownerCount: 7,
    bonusText: "+1 POD",
  });
  assert.equal(result.title, "Fogo");
  assert.equal(result.summary, "Controle térmico e combustão.");
  assert.deepEqual(result.meta.map((entry) => entry.label), ["Categoria", "Raridade", "Bônus", "Portadores", "Domínio", "Limite"]);
  assert.doesNotMatch(result.summary, /7 player/);
});

test("completion guard refuses duplicate reward keys", () => {
  const guard = polish.createCompletionGuard(["run-a"]);
  assert.equal(guard.claim("run-a"), false);
  assert.equal(guard.claim("run-b"), true);
  assert.equal(guard.has("run-b"), true);
  guard.release("run-b");
  assert.equal(guard.has("run-b"), false);
});

test("diagnostic snapshot counts loaded and failed images without exposing values", () => {
  const snapshot = polish.diagnosticSnapshot({
    build: "3.1.0",
    commit: "abc123",
    route: "codex",
    listeners: 3,
    reads: 14,
    writes: 2,
    online: true,
    images: [
      { complete: true, naturalWidth: 100 },
      { complete: false, naturalWidth: 0 },
    ],
    minigames: [{ mode: "tower", state: "paused", timers: 4 }],
  });
  assert.deepEqual(snapshot.images, { total: 2, loaded: 1, failed: 1 });
  assert.equal(snapshot.minigames[0].state, "paused");
  assert.equal(snapshot.listeners, 3);
});
