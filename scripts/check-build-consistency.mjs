import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const requiredFiles = [
  "index.html",
  "build-info.js",
  "millennium-stability.js",
  "millennium-world-alive.js",
  "catalogs-3.1.js",
  "millennium-core.js",
  "millennium-journey.js",
  "millennium-backend.js",
  "millennium-polish.js",
  "content-v3.js",
  "app.js",
  "styles.css",
  "overrides.css",
  "journey.css",
  "backend.css",
  "polish.css",
  "world-alive.css",
  "service-worker.js",
  "manifest.webmanifest",
  "favicon.svg",
];

const failures = [];
const texts = new Map();

for (const relative of requiredFiles) {
  const absolute = path.join(root, relative);
  try {
    await access(absolute);
    texts.set(relative, await readFile(absolute, "utf8"));
  } catch {
    failures.push(`arquivo obrigatório ausente: ${relative}`);
  }
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
const expectedBuild = packageJson.version;
const expectMatch = (file, expression, description) => {
  const text = texts.get(file) || "";
  const value = text.match(expression)?.[1] || "";
  if (value !== expectedBuild) failures.push(`${file}: ${description} é "${value || "ausente"}", esperado "${expectedBuild}"`);
};

expectMatch("index.html", /name="millennium-build"\s+content="([^"]+)"/, "meta de build");
expectMatch("build-info.js", /version:\s*"([^"]+)"/, "versão exposta");
expectMatch("content-v3.js", /MILLENNIUM_BUILD\s*=\s*"([^"]+)"/, "versão de conteúdo");
expectMatch("service-worker.js", /MILLENNIUM_BUILD\s*=\s*"([^"]+)"/, "versão do Service Worker");
expectMatch("manifest.webmanifest", /"version"\s*:\s*"([^"]+)"/, "versão do manifesto");

const index = texts.get("index.html") || "";
for (const file of ["styles.css", "overrides.css", "journey.css", "backend.css", "polish.css", "world-alive.css", "build-info.js", "millennium-stability.js", "millennium-world-alive.js", "catalogs-3.1.js", "millennium-core.js", "millennium-journey.js", "millennium-backend.js", "millennium-polish.js", "content-v3.js", "app.js"]) {
  if (!index.includes(`${file}?v=${expectedBuild}`)) failures.push(`index.html: referência versionada ausente para ${file}`);
}

const serviceWorker = texts.get("service-worker.js") || "";
for (const file of ["build-info.js", "millennium-stability.js", "millennium-world-alive.js", "catalogs-3.1.js", "millennium-core.js", "millennium-journey.js", "millennium-backend.js", "millennium-polish.js", "content-v3.js", "app.js", "styles.css", "overrides.css", "journey.css", "backend.css", "polish.css", "world-alive.css"]) {
  if (!serviceWorker.includes(`./${file}?v=\${MILLENNIUM_BUILD}`)) failures.push(`service-worker.js: precache versionado ausente para ${file}`);
}

const relativeAssetPattern = /(?:["'(]|url\()\.?\/?(assets\/[A-Za-z0-9_./-]+)/g;
for (const [file, text] of texts) {
  for (const match of text.matchAll(relativeAssetPattern)) {
    const relative = match[1];
    try {
      await access(path.join(root, relative));
    } catch {
      failures.push(`${file}: referência local ausente ${relative}`);
    }
  }
}

const requiredAssets = [
  "assets/first-awakening-portal.webp",
  "assets/maps/cruzamento-das-cortinas.webp",
  "assets/maps/aldeia-das-folhas-douradas.webp",
  "assets/maps/arena-das-sete-esferas.webp",
  "assets/maps/sociedade-das-laminas.webp",
  "assets/maps/reino-do-pecado-partido.webp",
  "assets/pets/cronista-de-vidro.webp",
  "assets/pets/filha-da-cinza.webp",
];
for (const relative of requiredAssets) {
  try { await access(path.join(root, relative)); }
  catch { failures.push(`asset obrigatório ausente: ${relative}`); }
}

const result = { expectedBuild, requiredFiles: requiredFiles.length, requiredAssets: requiredAssets.length, failures };
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
