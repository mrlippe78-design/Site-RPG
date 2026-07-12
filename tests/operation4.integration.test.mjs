import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("operation 4 modules and CSS load before the application and are precached", async () => {
  const [html, sw] = await Promise.all([read("../index.html"), read("../service-worker.js")]);
  assert.ok(html.indexOf("millennium-polish.js") < html.indexOf("app.js"));
  assert.match(html, /polish\.css\?v=3\.1\.0/);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /id="mainContent"/);
  assert.match(sw, /millennium-polish\.js/);
  assert.match(sw, /polish\.css/);
  assert.match(sw, /assets\/first-awakening-portal\.webp/);
});

test("required local WebP art exists and is reasonably bounded", async () => {
  const assets = [
    "assets/first-awakening-portal.webp",
    "assets/maps/arena-das-sete-esferas.webp",
    "assets/maps/sociedade-das-laminas.webp",
    "assets/maps/reino-do-pecado-partido.webp",
    "assets/pets/cronista-de-vidro.webp",
    "assets/pets/filha-da-cinza.webp",
  ];
  for (const relative of assets) {
    const url = new URL(`../${relative}`, import.meta.url);
    await access(url);
    const data = await readFile(url);
    const info = await stat(url);
    assert.equal(data.subarray(8, 12).toString("ascii"), "WEBP", `${relative} must be WebP`);
    assert.ok(info.size < 500_000, `${relative} should stay below 500 KB`);
  }
});

test("Codex cards use summaries, metadata, lazy thumbnails and explicit detail actions", async () => {
  const app = await read("../app.js");
  assert.match(app, /codex-card-summary/);
  assert.match(app, /loading="lazy" decoding="async"/);
  assert.match(app, /Abrir registro/);
  assert.match(app, /role="tablist"/);
  assert.match(app, /codexScrollByTab/);
  const codexBlock = app.slice(app.indexOf("function renderCodexResults"), app.indexOf("function filterCodexItems"));
  assert.ok(codexBlock.length > 0, "Codex renderer block should be present");
  assert.doesNotMatch(codexBlock, /player\(s\).*item\.passive/s);
});

test("minigames expose lifecycle, cancellation, pause and idempotency guards", async () => {
  const app = await read("../app.js");
  assert.match(app, /POLISH\.createLifecycle\("preparing"\)/);
  assert.match(app, /minigameCompletionKeys/);
  assert.match(app, /huntCompletionKeys/);
  assert.match(app, /resolvingActivityIds/);
  assert.match(app, /tower-toggle-pause/);
  assert.match(app, /resizeTowerCanvas/);
  assert.match(app, /window\.removeEventListener\("resize"/);
});

test("accessibility and diagnostics are integrated", async () => {
  const [app, css] = await Promise.all([read("../app.js"), read("../polish.css")]);
  assert.match(app, /trapModalFocus/);
  assert.match(app, /event\.key === "Escape"/);
  assert.match(app, /currentDiagnosticSnapshot/);
  assert.match(app, /download-diagnostics/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /focus-visible/);
  assert.match(css, /min-height: var\(--op4-touch\)/);
});
