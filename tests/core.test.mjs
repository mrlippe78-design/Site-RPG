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

test("allocation rejects missing, fractional, and wrong total values with useful errors", () => {
  const missing = window.MILLENNIUM_CORE_31.validateBaseAllocation({ for: 4, vel: 4, hab: 4, res: 4 });
  const fractional = window.MILLENNIUM_CORE_31.validateBaseAllocation({ for: 3.5, vel: 4, hab: 4, res: 4, pod: 4.5 });
  const nineteen = window.MILLENNIUM_CORE_31.validateBaseAllocation({ for: 3, vel: 4, hab: 4, res: 4, pod: 4 });
  assert.equal(missing.valid, false);
  assert.ok(missing.errors.some((message) => message.includes("Faltam")));
  assert.equal(fractional.valid, false);
  assert.ok(fractional.errors.some((message) => message.includes("inteiros")));
  assert.equal(nineteen.valid, false);
  assert.equal(nineteen.spent, 19);
  assert.equal(nineteen.remaining, 1);
});

test("corrupted base values are diagnosed and quarantined from effective totals", () => {
  const character = {
    creationLocked: true,
    raceId: "elfo",
    classId: "mago",
    base: { for: 67, vel: 2, hab: 2, res: 2, pod: 2 },
    development: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
    freePoints: 0,
  };
  const result = window.MILLENNIUM_CORE_31.calculateCharacterStats(character, catalogs);
  const diagnostic = window.MILLENNIUM_CORE_31.diagnoseAttributeSources(character, catalogs);
  assert.equal(result.raw.base.for, 67);
  assert.equal(result.base.for, 6);
  assert.ok(result.diagnostics.quarantinedBaseKeys.includes("for"));
  assert.equal(diagnostic.ok, false);
  assert.ok(diagnostic.issues.some((issue) => issue.code === "base-over-cap"));
  assert.ok(diagnostic.issues.some((issue) => issue.code === "base-sum"));
});

test("invalid development and free point balances block point spending", () => {
  const validCharacter = {
    creationLocked: true,
    development: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
    freePoints: 2,
  };
  const valid = window.MILLENNIUM_CORE_31.validateDevelopmentSpend(validCharacter, "for");
  const noPoints = window.MILLENNIUM_CORE_31.validateDevelopmentSpend({ ...validCharacter, freePoints: 0 }, "for");
  const invalidDevelopment = window.MILLENNIUM_CORE_31.validateDevelopmentSpend({
    ...validCharacter,
    development: { for: -1, vel: 0, hab: 0, res: 0, pod: 0 },
  }, "for");
  assert.equal(valid.valid, true);
  assert.equal(valid.next, 1);
  assert.equal(valid.nextFreePoints, 1);
  assert.equal(noPoints.valid, false);
  assert.equal(invalidDevelopment.valid, false);
});

test("duplicate equipped instances are counted once and reported", () => {
  const character = {
    base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
    development: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
    inventory: [
      { id: "anel", instanceId: "same", equipped: true },
      { id: "anel", instanceId: "same", equipped: true },
    ],
  };
  const result = window.MILLENNIUM_CORE_31.calculateCharacterStats(character, catalogs);
  assert.equal(result.equipmentBonus.for, 2);
  assert.deepEqual(result.diagnostics.duplicateEquipmentInstances, ["same"]);
});

test("missing official catalog references are visible in diagnostics", () => {
  const character = {
    creationLocked: true,
    raceId: "apagada",
    classId: "mago",
    affinityId: "inexistente",
    base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
    development: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
    freePoints: 0,
  };
  const diagnostic = window.MILLENNIUM_CORE_31.diagnoseAttributeSources(character, catalogs);
  assert.equal(diagnostic.ok, false);
  assert.ok(diagnostic.issues.some((issue) => issue.code === "catalog-reference-missing"));
});
