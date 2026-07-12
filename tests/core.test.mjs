import assert from "node:assert/strict";
import { before, test } from "node:test";

before(async () => {
  globalThis.window = globalThis;
  await import("../millennium-core.js");
});

const catalogs = {
  races: [{ id: "elfo", bonus: { hab: 3, pod: 2 } }],
  classes: [{ id: "mago", bonus: { pod: 3 } }],
  affinities: [{ id: "solar", bonus: { for: 1, pod: 1 } }],
  items: [
    { id: "armadura", categoryId: "armadura", bonus: { res: 1, def: 3 } },
    { id: "anel", categoryId: "acessorio", bonus: { for: 2 } },
  ],
};

test("unified stats keep base separate and derive defense from equipment", () => {
  const character = {
    raceId: "elfo",
    classId: "mago",
    affinityId: "solar",
    base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
    development: { for: 1, vel: 0, hab: 0, res: 0, pod: 0 },
    inventory: [
      { id: "armadura", instanceId: "armor-1", equipped: true, bonus: { def: 999 } },
      { id: "anel", instanceId: "ring-1", equipped: true, bonus: { for: 999 } },
    ],
  };
  const result = window.MILLENNIUM_CORE_31.calculateCharacterStats(character, catalogs);
  assert.deepEqual(result.base, { for: 4, vel: 4, hab: 4, res: 4, pod: 4 });
  assert.equal(result.total.for, 8);
  assert.equal(result.total.hab, 7);
  assert.equal(result.total.pod, 10);
  assert.equal(result.derived.def, 3);
  assert.equal(result.derived.hpMax, 35);
});

test("snapshot bonuses are never counted beside catalog bonuses", () => {
  const character = {
    raceId: "elfo",
    classId: "mago",
    affinityId: "solar",
    affinitySnapshot: { bonus: { for: 50, pod: 50 } },
    base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
  };
  const result = window.MILLENNIUM_CORE_31.calculateCharacterStats(character, catalogs);
  assert.equal(result.total.for, 5);
  assert.equal(result.total.pod, 10);
});

test("initial allocation accepts exactly 20 points between 2 and 6", () => {
  const valid = window.MILLENNIUM_CORE_31.validateBaseAllocation({ for: 4, vel: 4, hab: 4, res: 4, pod: 4 });
  const corrupted = window.MILLENNIUM_CORE_31.validateBaseAllocation({ for: 67, vel: 2, hab: 2, res: 2, pod: 2 });
  assert.equal(valid.valid, true);
  assert.equal(corrupted.valid, false);
});

test("migration preview is idempotent and never removes legacy data", () => {
  const legacy = { id: "u1", ownerId: "u1", story: "Memória", inventory: [{ id: "anel" }], base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 } };
  const preview = window.MILLENNIUM_CORE_31.migrationPreview(legacy);
  assert.equal(preview.migrated.migrationVersion, 31);
  assert.equal(preview.lore.history, "Memória");
  assert.equal(preview.counts.inventory, 1);
  assert.deepEqual(preview.legacy.inventory, legacy.inventory);
  const second = window.MILLENNIUM_CORE_31.migrationPreview(preview.migrated);
  assert.equal(second.alreadyMigrated, true);
});
