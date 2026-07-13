const MILLENNIUM_BUILD = "3.4.0";
const CACHE_PREFIX = "millennium-shell-v";
const CACHE_NAME = `${CACHE_PREFIX}${MILLENNIUM_BUILD}`;
const NETWORK_TIMEOUT_MS = 8000;

const REQUIRED_SHELL = [
  "./",
  "./index.html",
  `./build-info.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-stability.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-world-alive.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-echoes.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-foundations.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-account-management.js?v=${MILLENNIUM_BUILD}`,
  `./catalogs-3.1.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-core.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-journey.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-backend.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-polish.js?v=${MILLENNIUM_BUILD}`,
  `./styles.css?v=${MILLENNIUM_BUILD}`,
  `./overrides.css?v=${MILLENNIUM_BUILD}`,
  `./journey.css?v=${MILLENNIUM_BUILD}`,
  `./backend.css?v=${MILLENNIUM_BUILD}`,
  `./polish.css?v=${MILLENNIUM_BUILD}`,
  `./world-alive.css?v=${MILLENNIUM_BUILD}`,
  `./account-management.css?v=${MILLENNIUM_BUILD}`,
  `./echoes.css?v=${MILLENNIUM_BUILD}`,
  `./content-v3.js?v=${MILLENNIUM_BUILD}`,
  `./app.js?v=${MILLENNIUM_BUILD}`,
  "./manifest.webmanifest",
  "./favicon.svg",
];

const OPTIONAL_SHELL = [
  "./assets/first-awakening-portal.webp",
  "./assets/maps/cruzamento-das-cortinas.webp",
  "./assets/maps/aldeia-das-folhas-douradas.webp",
  "./assets/maps/arena-das-sete-esferas.webp",
  "./assets/maps/sociedade-das-laminas.webp",
  "./assets/maps/reino-do-pecado-partido.webp",
  "./assets/pets/cronista-de-vidro.webp",
  "./assets/pets/filha-da-cinza.webp",
  "./assets/pets/oraculo-partido.webp",
  "./assets/pets/herdeiro-dos-seis-veus.webp",
  "./assets/pets/general-da-cicatriz.webp",
  "./assets/pets/vazio-que-ri.webp",
  "./assets/maps/aurevia.webp",
  "./assets/maps/deserto-de-vidro.webp",
  "./assets/maps/pantano-sinos-afogados.webp",
];

async function fetchWithTimeout(request, timeout = NETWORK_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRequired(path) {
  const request = new Request(path, { cache: "reload" });
  const response = await fetchWithTimeout(request);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return { request, response };
}

async function precacheShell() {
  const cache = await caches.open(CACHE_NAME);
  const required = await Promise.all(REQUIRED_SHELL.map(fetchRequired));
  await Promise.all(required.map(({ request, response }) => cache.put(request, response)));

  await Promise.allSettled(OPTIONAL_SHELL.map(async (path) => {
    const { request, response } = await fetchRequired(path);
    await cache.put(request, response);
  }));
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheShell());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach((client) => client.postMessage({ type: "MILLENNIUM_ACTIVATED", build: MILLENNIUM_BUILD }));
  })());
});

async function networkFirst(request, fallbackPath = "") {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetchWithTimeout(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request))
      || (fallbackPath ? await cache.match(fallbackPath) : undefined)
      || Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetchWithTimeout(request)
    .then(async (response) => {
      if (response.ok) await cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await network) || Response.error();
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetchWithTimeout(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    return Response.error();
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
  if (event.request.destination === "image") {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }
  event.respondWith(cacheFirst(event.request));
});
