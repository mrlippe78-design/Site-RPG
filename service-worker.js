const MILLENNIUM_BUILD = "3.1.0";
const CACHE_NAME = `millennium-shell-v${MILLENNIUM_BUILD}`;
const APP_SHELL = [
  "./",
  "./index.html",
  `./build-info.js?v=${MILLENNIUM_BUILD}`,
  `./catalogs-3.1.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-core.js?v=${MILLENNIUM_BUILD}`,
  `./styles.css?v=${MILLENNIUM_BUILD}`,
  `./overrides.css?v=${MILLENNIUM_BUILD}`,
  `./content-v3.js?v=${MILLENNIUM_BUILD}`,
  `./app.js?v=${MILLENNIUM_BUILD}`,
  "./manifest.webmanifest",
  "./favicon.svg",
];

async function precacheAvailableShell() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.allSettled(APP_SHELL.map(async (path) => {
    const request = new Request(path, { cache: "reload" });
    const response = await fetch(request);
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    await cache.put(request, response);
  }));
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheAvailableShell());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("millennium-shell-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach((client) => client.postMessage({ type: "MILLENNIUM_ACTIVATED", build: MILLENNIUM_BUILD }));
  })());
});

async function networkFirst(request, fallbackPath = "") {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (fallbackPath ? await cache.match(fallbackPath) : undefined) || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request, "./index.html"));
    return;
  }
  if (["script", "style"].includes(event.request.destination)) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then(async (response) => {
    if (response.ok) (await caches.open(CACHE_NAME)).put(event.request, response.clone());
    return response;
  })));
});
