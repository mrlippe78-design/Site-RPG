import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

globalThis.window = globalThis;
await import(`../millennium-echoes.js?echoes=${Date.now()}`);
const echoes = globalThis.MILLENNIUM_ECHOES_33;

test("ten seasonal visual packages are available and gold is specific to Awakening", () => {
  assert.equal(echoes.themes.length, 10);
  assert.deepEqual(echoes.themes.map((theme) => theme.name), ["Despertar", "Eclipse", "Abismo", "Floresta Viva", "Sangue Antigo", "Constelação", "Inverno Oco", "Ferrugem", "Pecado Partido", "Véu Espiritual"]);
  assert.equal(echoes.themeById("awakening").palette.primary, "#d8b45d");
  assert.notEqual(echoes.themeById("eclipse").palette.primary, "#d8b45d");
});

test("theme customizations override a preset without mutating it", () => {
  const original = echoes.themeById("eclipse").palette.primary;
  const custom = echoes.resolvedTheme({ seasonTheme: "eclipse", seasonThemePrimary: "#123456", seasonThemeAnimation: "reduced" });
  assert.equal(custom.palette.primary, "#123456");
  assert.equal(custom.animation, "reduced");
  assert.equal(echoes.themeById("eclipse").palette.primary, original);
});

test("cartography boards are deterministic, solvable and only allow adjacent moves", () => {
  const board = echoes.cartographyBoard("map-a", 3);
  assert.deepEqual(board, echoes.cartographyBoard("map-a", 3));
  assert.equal(board.length, 9);
  assert.deepEqual([...board].sort((a, b) => a - b), [0,1,2,3,4,5,6,7,8]);
  const empty = board.indexOf(0);
  const illegal = board.findIndex((_, index) => Math.abs(Math.floor(index / 3) - Math.floor(empty / 3)) + Math.abs((index % 3) - (empty % 3)) > 1);
  assert.deepEqual(echoes.cartographyMove(board, illegal), board);
});

test("alchemy evaluates exact order and partial attempts", () => {
  const challenge = echoes.alchemyChallenge("brew-a");
  assert.equal(challenge.ingredients.length, 4);
  assert.equal(challenge.clues.length, 3);
  assert.deepEqual(echoes.evaluateAlchemy(challenge.recipe, challenge.recipe), { correct: 4, total: 4, passed: true, score: 10000 });
  const reversed = [...challenge.recipe].reverse();
  assert.equal(echoes.evaluateAlchemy(reversed, challenge.recipe).passed, false);
});

test("current build preserves 3.3 leisure navigation and the presence fix", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const rules = await readFile(new URL("../firestore.rules", import.meta.url), "utf8");
  assert.match(index, /millennium-echoes\.js\?v=3\.4\.0/);
  assert.match(index, /echoes\.css\?v=3\.4\.0/);
  assert.match(app, /label: "Obrigatório"/);
  assert.match(app, /label: "Recomendado"/);
  assert.match(app, /label: "Opcional"/);
  assert.match(app, /label: "Lazer"/);
  assert.match(app, /function startCartography/);
  assert.match(app, /function startAlchemy/);
  assert.doesNotMatch(app, /function stopPresenceTracking\(\)\s*\{\s*stopPresenceTracking\(\)/);
  assert.match(app, /window\.clearInterval\(state\.presenceTimer\)/);
  assert.match(rules, /lastCartographyRun/);
  assert.match(rules, /lastAlchemyRun/);
  assert.match(rules, /themePreference/);
});
