import test from "node:test";
import assert from "node:assert/strict";

globalThis.window = globalThis;
await import(`../millennium-account-management.js?test=${Date.now()}`);
const account = globalThis.MILLENNIUM_ACCOUNT_MANAGEMENT_321;

test("suspension presets and custom dates are deterministic", () => {
  const now = Date.parse("2026-07-13T12:00:00Z");
  assert.equal(account.suspensionUntil("1h", now), now + 3600000);
  assert.equal(account.suspensionUntil("7d", now), now + 7 * 86400000);
  assert.equal(account.suspensionUntil("custom", now, "2026-07-20T12:00:00Z"), Date.parse("2026-07-20T12:00:00Z"));
  assert.throws(() => account.suspensionUntil("custom", now, "2026-07-12T12:00:00Z"));
});

test("expired suspension becomes active without changing moderation fields", () => {
  const now = Date.parse("2026-07-13T12:00:00Z");
  assert.equal(account.normalizeStatus({ accountStatus: "suspended", suspendedUntil: "2026-07-13T11:00:00Z" }, now), "active");
  assert.equal(account.normalizeStatus({ accountStatus: "suspended", suspendedUntil: "2026-07-13T13:00:00Z" }, now), "suspended");
  assert.equal(account.isRestricted({ accountStatus: "banned" }, now), true);
  assert.equal(account.isRestricted({ accountStatus: "active" }, now), false);
});

test("administrative operations reject self-target and missing confirmation", () => {
  const base = { action: "character-reset", adminId: "oracle", targetUid: "player", targetRole: "player", reason: "Teste" };
  assert.equal(account.validateOperation({ ...base, confirmation: "RESETAR FICHA" }), true);
  assert.throws(() => account.validateOperation({ ...base, confirmation: "APAGAR" }));
  assert.throws(() => account.validateOperation({ ...base, targetUid: "oracle", confirmation: "RESETAR FICHA" }));
  assert.throws(() => account.validateOperation({ ...base, targetRole: "admin", confirmation: "RESETAR FICHA" }));
});

test("deletion queue does not block a future account with another UID", () => {
  const record = account.deletionQueueRecord({ uid: "old-uid", email: "a@example.invalid", displayName: "A", adminId: "oracle", reason: "Teste", nowValue: "server-time", idempotencyKey: "op-1" });
  assert.equal(record.ownerId, "old-uid");
  assert.equal(record.status, "awaiting-auth-delete");
  assert.equal(record.email, "a@example.invalid");
  assert.ok(!Object.hasOwn(record, "blockedEmail"));
});

test("reset coverage includes all known character subcollections", () => {
  for (const name of ["lore", "inventory", "pets", "powers", "techniques", "activities", "missions", "minigameRuns"]) {
    assert.ok(account.CHARACTER_SUBCOLLECTIONS.includes(name), `${name} should be reset`);
  }
});
