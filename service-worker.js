const MILLENNIUM_BUILD = "3.6.4-r3";
const PIXEL_ART_REVISION = "pixel-art-2";
const UI_PATCH_REVISION = "firebase-gacha-sync-r3";
const CACHE_PREFIX = "millennium-";
const SHELL_CACHE = `millennium-shell-v${MILLENNIUM_BUILD}-${UI_PATCH_REVISION}`;
// A revisão separada força a troca do cache de imagens sem alterar a versão
// funcional do site. Isso evita que instalações antigas conservem artes
// anteriores em URLs que precisaram permanecer estáveis.
const ASSET_CACHE = `millennium-assets-v${MILLENNIUM_BUILD}-${PIXEL_ART_REVISION}`;
const DATA_CACHE = `millennium-data-v${MILLENNIUM_BUILD}`;
// Alias preservado para validadores e clientes legados; o runtime usa caches separados.
const CACHE_NAME = SHELL_CACHE;
const NETWORK_TIMEOUT_MS = 8000;
const MAX_ASSET_ENTRIES = 180;
const MAX_DATA_ENTRIES = 40;

const REQUIRED_SHELL = [
  "./",
  "./index.html",
  `./millennium-security-config.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-security-bootstrap.js?v=${MILLENNIUM_BUILD}`,
  `./build-info.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-performance-runtime.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-stability.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-world-alive.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-echoes.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-foundations.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-account-management.js?v=${MILLENNIUM_BUILD}`,
  `./monster-system.js?v=${MILLENNIUM_BUILD}`,
  `./monster-engine.js?v=${MILLENNIUM_BUILD}`,
  `./monster-economy.js?v=${MILLENNIUM_BUILD}`,
  `./monster-modes.js?v=${MILLENNIUM_BUILD}`,
  `./minigames-vivid.js?v=${MILLENNIUM_BUILD}`,
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
  `./security.css?v=${MILLENNIUM_BUILD}`,
  `./css/tokens.css?v=${MILLENNIUM_BUILD}`,
  `./css/reset.css?v=${MILLENNIUM_BUILD}`,
  `./css/typography.css?v=${MILLENNIUM_BUILD}`,
  `./css/layout.css?v=${MILLENNIUM_BUILD}`,
  `./css/components.css?v=${MILLENNIUM_BUILD}`,
  `./css/charts.css?v=${MILLENNIUM_BUILD}`,
  `./css/responsive.css?v=${MILLENNIUM_BUILD}`,
  `./css/accessibility.css?v=${MILLENNIUM_BUILD}`,
  `./css/themes/awakening.css?v=${MILLENNIUM_BUILD}`,
  `./css/themes/oracle.css?v=${MILLENNIUM_BUILD}`,
  `./css/themes/corruption.css?v=${MILLENNIUM_BUILD}`,
  `./css/shell.css?v=${MILLENNIUM_BUILD}`,
  `./css/auth-awakening.css?v=${MILLENNIUM_BUILD}`,
  `./css/home-center.css?v=${MILLENNIUM_BUILD}`,
  `./css/profile-hero.css?v=${MILLENNIUM_BUILD}`,
  `./css/oracle-console.css?v=${MILLENNIUM_BUILD}`,
  `./css/ranking-hero.css?v=${MILLENNIUM_BUILD}`,
  `./css/secondary-modules.css?v=${MILLENNIUM_BUILD}`,
  `./css/assets.css?v=${MILLENNIUM_BUILD}`,
  `./css/performance.css?v=${MILLENNIUM_BUILD}`,
  `./css/monsters.css?v=${MILLENNIUM_BUILD}`,
  `./css/monster-economy.css?v=${MILLENNIUM_BUILD}`,
  `./css/monster-modes.css?v=${MILLENNIUM_BUILD}`,
  `./css/minigames-vivid.css?v=${MILLENNIUM_BUILD}`,
  `./content-v3.js?v=${MILLENNIUM_BUILD}`,
  `./app.js?v=${MILLENNIUM_BUILD}`,
  `./millennium-security.js?v=${MILLENNIUM_BUILD}`,
  "./manifest.webmanifest",
  "./favicon.svg",
];

// Artes não críticas não participam da instalação. Esta lista existe apenas como
// contrato de compatibilidade e documentação de recursos carregados sob demanda.
const OPTIONAL_SHELL = [];
const ON_DEMAND_ASSETS = Object.freeze([
  "./assets/awakening/aurora-despertos-hero-16x9.webp",
  "./assets/awakening/aurora-despertos-hero-mobile.webp",
  "./assets/awakening/sigilo-primeiro-despertar.svg",
  "./assets/monsters/monster-species-3.6.4.json",
  "./assets/monsters/placeholder-monster.svg",
  "./assets/placeholders/banner-16x9.svg",
  "./assets/placeholders/portrait-4x5.svg",
  "./assets/placeholders/pet-card-3x4.svg",
  "./assets/placeholders/map-16x9.svg",
  "./assets/placeholders/thumbnail-4x3.svg",
  "./assets/placeholders/sigil-1x1.svg",
]);

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
  const request = new Request(path, { cache: "reload", credentials: "same-origin" });
  const response = await fetchWithTimeout(request);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return { request, response };
}

async function trimCache(cacheName, maximum) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maximum) return;
  await Promise.all(keys.slice(0, keys.length - maximum).map((request) => cache.delete(request)));
}

async function putBounded(cacheName, request, response, maximum) {
  if (!response?.ok || response.type === "opaque") return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
  await trimCache(cacheName, maximum);
}

async function precacheShell() {
  const cache = await caches.open(SHELL_CACHE);
  const required = await Promise.all(REQUIRED_SHELL.map(fetchRequired));
  await Promise.all(required.map(({ request, response }) => cache.put(request, response)));
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheShell());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keep = new Set([SHELL_CACHE, ASSET_CACHE, DATA_CACHE]);
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME && !keep.has(key))
      .map((key) => caches.delete(key)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach((client) => client.postMessage({ type: "MILLENNIUM_ACTIVATED", build: MILLENNIUM_BUILD }));
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }
  if (event.data?.type !== "CACHE_URLS" || !Array.isArray(event.data.urls)) return;
  event.waitUntil((async () => {
    const urls = event.data.urls.slice(0, 12);
    for (const raw of urls) {
      try {
        const url = new URL(String(raw || ""), self.location.origin);
        if (url.origin !== self.location.origin) continue;
        const request = new Request(url.href, { credentials: "same-origin" });
        const response = await fetchWithTimeout(request);
        await putBounded(ASSET_CACHE, request, response, MAX_ASSET_ENTRIES);
      } catch { /* aquecimento é opcional */ }
    }
  })());
});

async function networkFirst(request, fallbackPath = "") {
  const cache = await caches.open(SHELL_CACHE);
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

async function staleWhileRevalidate(request, cacheName = ASSET_CACHE, maximum = MAX_ASSET_ENTRIES) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetchWithTimeout(request)
    .then(async (response) => {
      await putBounded(cacheName, request, response, maximum);
      return response;
    })
    .catch(() => null);
  return cached || (await network) || Response.error();
}

async function cacheFirstBounded(request, cacheName, maximum) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetchWithTimeout(request);
    await putBounded(cacheName, request, response, maximum);
    return response;
  } catch {
    return Response.error();
  }
}

function isMonsterAsset(url) {
  return url.pathname.includes("/assets/monsters/")
    || url.pathname.includes("/assets/monster-items/")
    || url.pathname.includes("/assets/tower-defense/")
    || url.pathname.includes("/assets/bosses/")
    || url.pathname.includes("/assets/maps/");
}

function isVersionedCatalog(url) {
  return url.pathname.endsWith(".json") && (
    url.pathname.includes("/assets/monsters/")
    || url.pathname.includes("/assets/monster-items/")
    || url.pathname.includes("/assets/awakening/")
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "./index.html"));
    return;
  }

  if (["script", "style"].includes(request.destination)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isVersionedCatalog(url)) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE, MAX_DATA_ENTRIES));
    return;
  }

  if (isMonsterAsset(url)) {
    event.respondWith(cacheFirstBounded(request, ASSET_CACHE, MAX_ASSET_ENTRIES));
    return;
  }

  if (event.request.destination === "image") {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  if (request.destination === "font") {
    event.respondWith(staleWhileRevalidate(request, ASSET_CACHE, MAX_ASSET_ENTRIES));
    return;
  }

  event.respondWith(cacheFirstBounded(request, DATA_CACHE, MAX_DATA_ENTRIES));
});
