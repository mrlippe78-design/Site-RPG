import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadJourney() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(await readFile(new URL("../millennium-journey.js", import.meta.url), "utf8"), context);
  return context.window.MILLENNIUM_JOURNEY_31;
}

test("new-player journey contains twelve essential steps and a single next action", async () => {
  const journey = await loadJourney();
  const result = journey.journeyProgress({}, {});
  assert.equal(result.total, 12);
  assert.equal(result.completed, 0);
  assert.equal(result.next.id, "premise");
  assert.equal(result.next.nav, "player-home");
});

test("technical registration and affinity advance the journey without requiring lore", async () => {
  const journey = await loadJourney();
  const character = {
    playerName: "Player",
    characterName: "Okan",
    raceId: "humano",
    classId: "guerreiro",
    kingdomId: "aurevia",
    regionId: "porto-millennium",
    cultureId: "aureviana",
    professionId: "ferreiro",
    base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
    technicalCreationComplete: true,
    affinityId: "fogo",
  };
  const result = journey.journeyProgress(character, { premiseSeen: true });
  assert.equal(result.steps.find((step) => step.id === "technical").done, true);
  assert.equal(result.steps.find((step) => step.id === "life").done, false);
  assert.equal(result.steps.find((step) => step.id === "affinity").done, true);
  assert.equal(result.next.id, "profile");
});

test("narrative progress is based on completed text fields and never grants combat data", async () => {
  const journey = await loadJourney();
  const result = journey.narrativeProgress({ description: "Presença pública", personality: "Reservado" });
  assert.equal(result.completed, 2);
  assert.equal(result.total, 25);
  assert.ok(result.percentage > 0 && result.percentage < 100);
  assert.equal("bonus" in result, false);
});

test("culture and profession catalogs cannot contain attribute bonuses", async () => {
  const journey = await loadJourney();
  const valid = journey.catalogIntegrity({
    cultures: [{ id: "c", name: "Cultura", languages: [], startingKnowledge: [] }],
    professions: [{ id: "p", name: "Ofício", activities: [], knowledge: [] }],
  });
  assert.equal(valid.ok, true);
  const invalid = journey.catalogIntegrity({
    cultures: [{ id: "c", name: "Cultura", languages: [], startingKnowledge: [], bonus: { for: 1 } }],
    professions: [{ id: "p", name: "Ofício", activities: [], knowledge: [], bonus: { hab: 1 } }],
  });
  assert.equal(invalid.ok, false);
  assert.deepEqual(Array.from(invalid.issues, (issue) => issue.code).sort(), ["culture-attribute-bonus", "profession-attribute-bonus"]);
});

test("catalog search handles accents, keywords and categories", async () => {
  const journey = await loadJourney();
  const entries = [
    { id: "medico", name: "Médico", category: "medicina", knowledge: ["anatomia"] },
    { id: "ferreiro", name: "Ferreiro", category: "artesanato", knowledge: ["metal"] },
  ];
  assert.equal(journey.catalogSearch(entries, "medico", "all")[0].id, "medico");
  assert.equal(journey.catalogSearch(entries, "metal", "artesanato")[0].id, "ferreiro");
  assert.equal(journey.catalogSearch(entries, "metal", "medicina").length, 0);
});
