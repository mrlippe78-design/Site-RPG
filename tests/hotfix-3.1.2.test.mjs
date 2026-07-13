import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

globalThis.window = globalThis;
await import(`../millennium-backend.js?hotfix=${Date.now()}`);

const backend = globalThis.MILLENNIUM_BACKEND_31;
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const rules = await readFile(new URL("../firestore.rules", import.meta.url), "utf8");
const build = await readFile(new URL("../build-info.js", import.meta.url), "utf8");

test("build 3.2.1 is synchronized", () => {
  assert.match(build, /version:\s*"3\.2\.1"/);
  assert.match(build, /millennium-shell-v3\.2\.1/);
});

test("creation flow is controlled by the Oracle", () => {
  assert.equal(backend.creationStatusLabel("nerf solicitado"), "aguardando confirmação");
  assert.equal(backend.canRespondToCreation({ status: "aguardando confirmação" }), true);
  assert.equal(backend.creationPlayerResponseAllowed({ status: "aguardando confirmação" }, "accepted"), true);
  assert.equal(backend.creationPlayerResponseAllowed({ status: "pendente" }, "accepted"), false);
  assert.equal(backend.creationNeedsAdminAction({ status: "contestado pelo player" }), true);
  assert.equal(backend.canResubmitCreation({ status: "nerf solicitado" }), false);
  assert.match(app, /O player envia a ideia\. O Oráculo analisa, ajusta/);
  assert.match(app, /accept-creation-proposal/);
  assert.match(app, /contest-creation-proposal/);
  assert.doesNotMatch(app, /Ajustar e reenviar/);
});

test("ranking is derived from eligible registered sheets", () => {
  assert.match(app, /function rankingEligible\(/);
  assert.match(app, /\.filter\(rankingEligible\)/);
  assert.match(app, /Prestígio calculado automaticamente/);
  assert.doesNotMatch(app, /prestige:\s*Number\(values\.prestige/);
});

test("Oracle can manage classes and account lifecycle", () => {
  assert.match(app, /Classes salvas aqui aparecem automaticamente no Codex/);
  assert.match(app, /classOwnerCount\(item\.id\)/);
  assert.match(app, /admin-reset-character/);
  assert.match(app, /admin-suspend-account/);
  assert.match(app, /admin-ban-account/);
  assert.match(app, /admin-delete-account/);
  assert.match(rules, /match \/accountDeletionQueue\/\{uid\}/);
  assert.match(rules, /allow delete: if isAdmin\(\) && request\.auth\.uid != uid/);
  assert.match(rules, /function validCreationPlayerResponse\(/);
});
