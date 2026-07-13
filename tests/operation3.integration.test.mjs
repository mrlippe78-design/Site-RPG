import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("operation 3 assets load before app and are precached", async () => {
  const [html, sw] = await Promise.all([read("../index.html"), read("../service-worker.js")]);
  assert.ok(html.indexOf("millennium-backend.js") < html.indexOf("app.js"));
  assert.match(html, /backend\.css\?v=3\.2\.1/);
  assert.match(sw, /millennium-backend\.js/);
  assert.match(sw, /backend\.css/);
});

test("app uses conversation subcollections and keeps legacy reads only", async () => {
  const app = await read("../app.js");
  assert.match(app, /function openDirectConversation/);
  assert.match(app, /collection\("conversations"\)/);
  assert.match(app, /collection\("messages"\)/);
  assert.doesNotMatch(app, /addDoc\("directMessages"/);
  assert.match(app, /legacy-direct-messages/);
  assert.match(app, /loadOlderDirectMessages/);
});

test("creations, support, audit and migration dry-run are integrated", async () => {
  const app = await read("../app.js");
  assert.match(app, /creation-form-grid/);
  assert.match(app, /countermeasures/);
  assert.match(app, /reviewReport/);
  assert.match(app, /adminAuditReason/);
  assert.match(app, /previewMigrationPlan/);
  assert.match(app, /syncPublicProfileProjection/);
});

test("rules protect immutable messages and controlled player confirmation", async () => {
  const rules = await read("../firestore.rules");
  assert.match(rules, /validConversationCreate/);
  assert.match(rules, /validConversationUpdate/);
  assert.match(rules, /validCreationPlayerResponse/);
  assert.match(rules, /allow update: if false;/);
  assert.match(rules, /getAfter\(\/databases\/\$\(database\)\/documents\/conversations/);
});
