import assert from "node:assert/strict";
import { before, test } from "node:test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { readdir } from "node:fs/promises";
import path from "node:path";

before(async () => {
  globalThis.window = globalThis;
  await import(`../millennium-world-alive.js?world=${Date.now()}`);
  await import(`../millennium-core.js?world=${Date.now()}`);
});

const world = () => globalThis.MILLENNIUM_WORLD_ALIVE_32;

test("four official classes are merged without deleting custom classes", () => {
  const content = { classes: [{ id: "custom", name: "Cartógrafo", bonus: { hab: 1 } }], items: [], gachaPets: [], kingdoms: [], regions: [], biomes: [], towerMaps: [] };
  world().applyCatalogs(content);
  assert.equal(content.classes.length, 5);
  assert.ok(content.classes.some((entry) => entry.id === "custom"));
  assert.deepEqual(content.classes.find((entry) => entry.id === "cacador").bonus, { hab: 2, vel: 1 });
  assert.deepEqual(content.classes.find((entry) => entry.id === "guardiao").bonus, { res: 2, for: 1 });
});

test("hourly pet rotation is deterministic and has no repeated entries", () => {
  const rarities = ["Incomum", "Épico", "Lendário", "Lendário", "Mítico", "Cósmico", "Celestial", "Secret"];
  const pool = Array.from({ length: 18 }, (_, index) => ({ id: `pet-${index}`, name: `Pet ${index}`, rarity: rarities[index % rarities.length] }));
  const at = Date.UTC(2026, 6, 12, 15, 20, 0);
  const first = world().selectBalancedRotation(pool, "pets", at);
  const same = world().selectBalancedRotation(pool, "pets", at + 1000);
  const next = world().selectBalancedRotation(pool, "pets", at + world().HOUR_MS);
  assert.deepEqual(first.featured.map((entry) => entry.id), same.featured.map((entry) => entry.id));
  assert.equal(new Set(first.featured.map((entry) => entry.id)).size, first.featured.length);
  assert.notDeepEqual(first.featured.map((entry) => entry.id), next.featured.map((entry) => entry.id));
  assert.equal(first.featured.length, 6);
});

test("countdown displays remaining minutes and seconds", () => {
  const now = Date.UTC(2026, 6, 12, 15, 17, 42);
  const end = Date.UTC(2026, 6, 12, 16, 0, 0);
  assert.equal(world().countdownParts(end, now).label, "42:18");
});

test("legacy equipment resolves by normalized name and produces official totals", () => {
  const content = {
    classes: [{ id: "guerreiro", bonus: { for: 2, res: 1 } }],
    races: [{ id: "demonio", bonus: { for: 2, vel: 1 } }],
    affinities: [{ id: "tempo", bonus: { for: 1, hab: 1, pod: 2 } }],
    items: [{ id: "espada-curta", name: "Espada Curta", bonus: {} }],
  };
  const character = {
    base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
    development: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
    raceId: "demonio", classId: "guerreiro", affinityId: "tempo",
    inventory: [{ instanceId: "legacy-1", name: "espada curta", equipped: true }],
    affinitySnapshot: { bonus: { for: 99 } },
  };
  const stats = globalThis.MILLENNIUM_CORE_31.calculateCharacterStats(character, content);
  assert.deepEqual(stats.total, { for: 9, vel: 5, hab: 5, res: 5, pod: 6 });
  assert.equal(stats.diagnostics.unresolvedEquipmentItems.length, 0);
});

test("seal sequences are stable and difficulty can increase length", () => {
  assert.deepEqual(world().sealSequence("run-a", 5), world().sealSequence("run-a", 5));
  assert.equal(world().sealSequence("run-b", 8).length, 8);
  assert.notDeepEqual(world().sealSequence("run-a", 5), world().sealSequence("run-b", 5));
});

test("mapped pet and location hero files are unique by content", async () => {
  const root = new URL("../", import.meta.url);
  const files = [
    ...Object.values(world().PET_ASSETS).map((entry) => entry.hero),
    ...Object.values(world().LOCATION_ASSETS).map((entry) => entry.hero),
  ];
  const uniquePaths = [...new Set(files)];
  assert.equal(files.length, uniquePaths.length, "the same path cannot be assigned twice");
  const hashes = [];
  for (const relative of uniquePaths) {
    const buffer = await readFile(new URL(relative, root));
    hashes.push(createHash("sha256").update(buffer).digest("hex"));
  }
  assert.equal(new Set(hashes).size, hashes.length, "different entries cannot reuse identical image bytes");
});

test("build includes world-alive module, ritual and bounded hunt rules", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const rules = await readFile(new URL("../firestore.rules", import.meta.url), "utf8");
  const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(index, /millennium-world-alive\.js\?v=3\.2\.0/);
  assert.match(index, /world-alive\.css\?v=3\.2\.0/);
  assert.match(app, /function startSealRitual/);
  assert.doesNotMatch(app, /transition\("showing"/);
  assert.doesNotMatch(app, /transition\("input"/);
  assert.match(app, /startGachaRotationTicker\(\)/);
  assert.match(app, /banner\.rotationMode === "fixed"/);
  assert.match(app, /rotationMode: values\.rotationMode \|\| "automatic"/);
  assert.match(app, /Persist first\. The reveal is only shown after Firestore confirms/);
  assert.match(app, /Nenhuma moeda foi consumida e nenhum prêmio foi entregue/);
  assert.match(app, /Nenhuma essência foi consumida e nenhuma afinidade foi aplicada/);
  assert.match(rules, /function ownerPetHuntStartUpdate\(/);
  assert.match(rules, /function ownerPetHuntCompleteUpdate\(/);
  assert.match(rules, /function ownerGachaInvokeUpdate\(/);
  assert.match(rules, /function ownerVaultManagementUpdate\(/);
  assert.match(rules, /lastSealRun/);
});
