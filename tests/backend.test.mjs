import assert from "node:assert/strict";
import { test } from "node:test";

globalThis.window = globalThis;
await import(`../millennium-backend.js?test=${Date.now()}`);
const backend = globalThis.MILLENNIUM_BACKEND_31;

test("conversation ids and participants are deterministic", () => {
  assert.equal(backend.conversationIdFor("player-b", "player-a"), "player-a__player-b");
  assert.equal(backend.conversationIdFor("player-a", "player-b"), "player-a__player-b");
  assert.equal(backend.exactParticipants(["player-b", "player-a"], "player-a", "player-b"), true);
  assert.equal(backend.exactParticipants(["player-a", "intruder"], "player-a", "player-b"), false);
});

test("report payload is bounded and receives a friendly id", () => {
  const payload = backend.buildReportPayload({
    type: "bug",
    user: { uid: "player-a", name: "A" },
    values: { title: "Falha", description: "A tela fechou.", steps: "Abrir o Codex" },
    context: { build: "3.1.0", route: "codex", viewport: "390x844" },
    now: new Date("2026-07-12T10:00:00Z"),
    random: () => 0,
  });
  assert.equal(payload.reporterId, "player-a");
  assert.equal(payload.status, "recebido");
  assert.equal(payload.friendlyId, "MR-20260712-0000");
  assert.equal(payload.route, "codex");
});

test("creation payload requires counterplay and base power for a technique", () => {
  const common = {
    title: "Lança Solar", concept: "Condensar luz", function: "Ataque", manifestation: "Lança",
    range: "20 metros", duration: "Instantânea", cost: "Cansaço", limitations: "Uma vez por cena",
    countermeasures: "Cobertura", risks: "Cegueira", description: "Projétil de luz.",
  };
  const power = backend.sanitizeCreationPayload({ ...common, type: "power" }, { affinityId: "solar" });
  assert.equal(power.affinityId, "solar");
  assert.throws(() => backend.sanitizeCreationPayload({ ...common, type: "technique" }, { affinityId: "solar" }), /basePowerId/);
  const technique = backend.sanitizeCreationPayload({ ...common, type: "technique", basePowerId: "poder-solar" }, { affinityId: "solar" });
  assert.equal(technique.type, "technique");
});

test("optimistic messages are replaced by server messages using clientId", () => {
  const merged = backend.mergeMessages(
    [{ id: "server-1", clientId: "client-1", text: "Confirmada", createdAt: "2026-01-01T00:00:01Z" }],
    [{ id: "client-1", clientId: "client-1", text: "Pendente", pending: true, createdAt: "2026-01-01T00:00:00Z" }],
  );
  assert.equal(merged.length, 1);
  assert.equal(merged[0].text, "Confirmada");
  assert.equal(merged[0].pending, false);
  assert.equal(merged[0].id, "server-1");
});

test("subscription registry replaces and clears listeners", () => {
  const registry = new backend.SubscriptionRegistry();
  const calls = [];
  registry.replace("chat", () => calls.push("first"));
  registry.replace("chat", () => calls.push("second"));
  assert.deepEqual(calls, ["first"]);
  assert.equal(registry.size, 1);
  registry.clear();
  assert.deepEqual(calls, ["first", "second"]);
  assert.equal(registry.size, 0);
});

test("migration plan is idempotent and preserves legacy arrays", () => {
  const character = {
    ownerId: "player-a",
    migrationVersion: 0,
    inventory: [{ instanceId: "sword-1", name: "Espada" }],
    pets: [{ instanceId: "pet-1", name: "Corvo" }],
    powers: [{ id: "power-1", name: "Fogo" }],
  };
  const plan = backend.arrayDocumentPlan(character, 3);
  assert.equal(plan.skip, false);
  assert.equal(plan.operations.length, 3);
  assert.equal(plan.rootPatch.legacyArraysPreserved, true);
  assert.equal(backend.arrayDocumentPlan({ ...character, migrationVersion: 3 }, 3).skip, true);
  const rollback = backend.migrationRollbackPlan(plan);
  assert.equal(rollback.destructiveLegacyDelete, false);
  assert.equal(rollback.deletePaths.length, 3);
});
