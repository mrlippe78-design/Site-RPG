import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const sw = await readFile(new URL("../service-worker.js", import.meta.url), "utf8");
const catalogs = await readFile(new URL("../catalogs-3.1.js", import.meta.url), "utf8");

test("Operation 2 modules load before the application and are precached", () => {
  assert.match(index, /millennium-journey\.js\?v=3\.3\.0/);
  assert.ok(index.indexOf("millennium-journey.js") < index.indexOf("app.js"));
  assert.match(sw, /millennium-journey\.js\?v=\$\{MILLENNIUM_BUILD\}/);
  assert.match(index, /journey\.css\?v=3\.3\.0/);
});

test("all new journey routes have explicit renderers", () => {
  for (const route of ["character-life", "creations", "cultures", "professions"]) {
    assert.match(app, new RegExp(`(?:"${route}"|${route}):\\s*render`));
  }
  assert.match(app, /function renderCultureCatalog\(/);
  assert.match(app, /function renderProfessionCatalog\(/);
  assert.match(app, /function renderCreationsIntroduction\(/);
});

test("technical creation, Dar Vida and old-character origin completion remain separate", () => {
  assert.match(app, /data-form="character"/);
  assert.match(app, /data-form="character-life"/);
  assert.match(app, /data-form="character-origin-completion"/);
  assert.match(app, /function newPlayerMode\(/);
  assert.match(app, /saveCharacterCorePatch/);
  assert.match(app, /saveCharacterLorePatch/);
  assert.match(app, /saveOriginCompletion/);
});

test("manifestation and potential are derived through the central core", () => {
  assert.match(app, /MILLENNIUM_CORE_31\.manifestationGrade/);
  assert.match(app, /MILLENNIUM_CORE_31\.potentialProfile/);
  assert.match(app, /Grau de Manifestação/);
  assert.match(app, /Perfil de Potencial/);
});

test("canonical catalogs provide cultures and at least twenty-five professions", () => {
  const professionCalls = [...catalogs.matchAll(/profession\("/g)].length;
  const cultureCalls = [...catalogs.matchAll(/culture\("/g)].length;
  assert.ok(professionCalls >= 25, `expected at least 25 professions, found ${professionCalls}`);
  assert.ok(cultureCalls >= 8, `expected at least 8 cultures, found ${cultureCalls}`);
  assert.doesNotMatch(catalogs, /bonus\s*:/i);
});
