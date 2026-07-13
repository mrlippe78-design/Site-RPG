import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const rules = await readFile(new URL("../firestore.rules", import.meta.url), "utf8");
const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const serviceWorker = await readFile(new URL("../service-worker.js", import.meta.url), "utf8");
const build = await readFile(new URL("../build-info.js", import.meta.url), "utf8");

test("current build preserves account management in page and cache", () => {
  assert.match(build, /version:\s*"3\.3\.0"/);
  assert.match(index, /millennium-account-management\.js\?v=3\.3\.0/);
  assert.match(index, /account-management\.css\?v=3\.3\.0/);
  assert.match(serviceWorker, /millennium-account-management\.js/);
  assert.match(serviceWorker, /account-management\.css/);
});

test("Oracle panel separates reset moderation and definitive deletion", () => {
  assert.match(app, /admin-reset-character/);
  assert.match(app, /admin-suspend-account/);
  assert.match(app, /admin-ban-account/);
  assert.match(app, /admin-remove-restriction/);
  assert.match(app, /admin-delete-account/);
  assert.doesNotMatch(app, /data-action="admin-delete-player"/);
  assert.match(app, /EXCLUIR CONTA DEFINITIVAMENTE/);
  assert.match(app, /RESETAR FICHA/);
  assert.match(app, /adminOperationLocks/);
  assert.match(rules, /match \/adminOperationLocks\/\{uid\}/);
});

test("deleted accounts wait for manual Authentication removal without permanent email block", () => {
  assert.match(app, /accountDeletionQueue/);
  assert.match(app, /Firebase Console → Authentication → Users/);
  assert.match(app, /AUTH EXCLUÍDO/);
  assert.doesNotMatch(app, /collection\("deletedUsers"\)\.doc\(uid\)\.set/);
  assert.match(rules, /match \/accountDeletionQueue\/\{uid\}/);
  assert.match(rules, /!exists\(\/databases\/\$\(database\)\/documents\/accountDeletionQueue\/\$\(uid\)\)/);
  assert.match(rules, /match \/deletedUsers\/\{uid\}[\s\S]*allow create, update: if false/);
});

test("restricted players cannot use ordinary Firestore features", () => {
  assert.match(rules, /function accountIsActive\(\)/);
  assert.match(rules, /status == "suspended" && suspensionExpired\(\)/);
  assert.match(rules, /allow create: if accountIsActive\(\) && validReportCreate\(\)/);
  assert.match(rules, /allow create: if accountIsActive\(\) && validConversationCreate\(\)/);
  assert.match(app, /renderAccountRestrictionGate/);
  assert.match(app, /stopCharacterSubscription/);
  assert.match(app, /clearRouteSubscriptions/);
});
