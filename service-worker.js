const CACHE_NAME = "millennium-shell-v33";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=20260711-forged33",
  "./overrides.css?v=20260711-forged33",
  "./content-v3.js?v=20260711-forged33",
  "./app.js?v=20260711-forged33",
  "./assets/first-awakening-portal.png",
  "./manifest.webmanifest",
  "./favicon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
    return;
  }
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && ["script", "style"].includes(event.request.destination)) {
    event.respondWith(fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    if (url.origin === self.location.origin) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  })));
});
