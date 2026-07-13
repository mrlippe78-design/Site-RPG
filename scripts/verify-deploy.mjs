import http from "node:http";
import https from "node:https";

const args = process.argv.slice(2);
const valueFor = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};

const baseUrl = new URL(valueFor("--url", "https://mrlippe78-design.github.io/Site-RPG/"));
const expectedBuild = valueFor("--build", "3.4.0");
const expectedCommit = valueFor("--commit", "");
const attempts = Math.max(1, Number(valueFor("--attempts", "4")) || 4);
const waitMs = Math.max(0, Number(valueFor("--wait-ms", "15000")) || 15000);
const required = [
  "index.html",
  "build-info.js",
  "millennium-stability.js",
  "millennium-world-alive.js",
  "millennium-echoes.js",
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
  "echoes.css",
  "assets/first-awakening-portal.webp",
  "assets/maps/arena-das-sete-esferas.webp",
  "assets/maps/aurevia.webp",
  "assets/maps/noctheryn.webp",
  "assets/maps/deserto-de-vidro.webp",
  "assets/maps/sociedade-das-laminas.webp",
  "assets/maps/reino-do-pecado-partido.webp",
  "assets/pets/cronista-de-vidro.webp",
  "assets/pets/filha-da-cinza.webp",
  "assets/pets/oraculo-partido.webp",
  "assets/pets/herdeiro-dos-seis-veus.webp",
  "assets/pets/general-da-cicatriz.webp",
  "assets/pets/vazio-que-ri.webp",
  "service-worker.js",
  "manifest.webmanifest",
  "favicon.svg",
];

function requestText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http;
    const request = transport.get(url, {
      headers: { "cache-control": "no-cache", connection: "close", "user-agent": "millennium-deploy-check/3.2" },
    }, (response) => {
      if ([301, 302, 307, 308].includes(response.statusCode) && response.headers.location && redirects < 4) {
        response.resume();
        requestText(new URL(response.headers.location, url), redirects + 1).then(resolve, reject);
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve({
        ok: response.statusCode >= 200 && response.statusCode < 300,
        status: response.statusCode,
        text: Buffer.concat(chunks).toString("utf8"),
      }));
    });
    request.setTimeout(15000, () => request.destroy(new Error("timeout")));
    request.on("error", reject);
  });
}

const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

async function verifyOnce() {
  const failures = [];
  const responses = new Map();
  for (const file of required) {
    const url = new URL(file, baseUrl);
    url.searchParams.set("deploy-check", `${Date.now()}-${Math.random()}`);
    try {
      const response = await requestText(url);
      responses.set(file, response);
      if (!response.ok) failures.push(`${file}: HTTP ${response.status}`);
    } catch (error) {
      failures.push(`${file}: ${error.message}`);
    }
  }

  const indexText = responses.get("index.html")?.text || "";
  const build = indexText.match(/name="millennium-build"\s+content="([^"]+)"/)?.[1] || "ausente";
  const commit = indexText.match(/name="millennium-commit"\s+content="([^"]+)"/)?.[1] || "ausente";
  if (build !== expectedBuild) failures.push(`build publicado ${build}; esperado ${expectedBuild}`);
  if (expectedCommit && commit !== expectedCommit && !expectedCommit.startsWith(commit)) failures.push(`commit publicado ${commit}; esperado ${expectedCommit}`);

  const buildInfo = responses.get("build-info.js")?.text || "";
  const serviceWorker = responses.get("service-worker.js")?.text || "";
  const manifest = responses.get("manifest.webmanifest")?.text || "";
  if (!buildInfo.includes(`version: "${expectedBuild}"`)) failures.push("build-info.js não expõe o build esperado");
  if (!serviceWorker.includes(`MILLENNIUM_BUILD = "${expectedBuild}"`)) failures.push("service-worker.js não usa o build esperado");
  if (!manifest.includes(`"version": "${expectedBuild}"`)) failures.push("manifest.webmanifest não usa o build esperado");

  return { build, commit, failures };
}

let result;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  result = await verifyOnce();
  console.log(JSON.stringify({ attempt, attempts, url: baseUrl.href, expectedBuild, expectedCommit, ...result }, null, 2));
  if (!result.failures.length) break;
  if (attempt < attempts) await sleep(waitMs);
}

if (result?.failures.length) process.exitCode = 1;
