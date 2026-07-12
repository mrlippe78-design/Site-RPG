const args = process.argv.slice(2);
const valueFor = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};

const baseUrl = new URL(valueFor("--url", "https://mrlippe78-design.github.io/Site-RPG/"));
const expectedBuild = valueFor("--build", "3.1.0");
const expectedCommit = valueFor("--commit", "");
const required = [
  "index.html",
  "build-info.js",
  "catalogs-3.1.js",
  "millennium-core.js",
  "content-v3.js",
  "app.js",
  "styles.css",
  "overrides.css",
  "service-worker.js",
  "manifest.webmanifest",
  "favicon.svg",
];

const failures = [];
const responses = new Map();

function requestText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http;
    const request = transport.get(url, {
      headers: { "cache-control": "no-cache", connection: "close", "user-agent": "millennium-deploy-check/3.1" },
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

for (const path of required) {
  const url = new URL(path, baseUrl);
  url.searchParams.set("deploy-check", Date.now().toString());
  try {
    const response = await requestText(url);
    responses.set(path, response);
    if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  } catch (error) {
    failures.push(`${path}: ${error.message}`);
  }
}

const indexResponse = responses.get("index.html");
const indexText = indexResponse?.ok ? indexResponse.text : "";
const build = indexText.match(/name="millennium-build"\s+content="([^"]+)"/)?.[1] || "ausente";
const commit = indexText.match(/name="millennium-commit"\s+content="([^"]+)"/)?.[1] || "ausente";
if (build !== expectedBuild) failures.push(`build publicado ${build}; esperado ${expectedBuild}`);
if (expectedCommit && commit !== expectedCommit && !expectedCommit.startsWith(commit)) {
  failures.push(`commit publicado ${commit}; esperado ${expectedCommit}`);
}

console.log(JSON.stringify({ url: baseUrl.href, expectedBuild, expectedCommit, build, commit, failures }, null, 2));
if (failures.length) process.exitCode = 1;
import http from "node:http";
import https from "node:https";
