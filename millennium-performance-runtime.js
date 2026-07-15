(function registerMillenniumPerformanceRuntime364(global) {
  "use strict";

  const BUILD = "3.7.0";
  const loadedAssets = new Set();
  const pendingAssets = new Map();
  const queue = [];
  const observers = new Set();
  let activeLoads = 0;
  let longTasks = 0;
  let resourceBytes = 0;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
  const media = {
    reducedMotion: global.matchMedia?.("(prefers-reduced-motion: reduce)") || null,
    coarsePointer: global.matchMedia?.("(pointer: coarse)") || null,
  };

  function profile() {
    const saveData = Boolean(connection?.saveData);
    const effectiveType = String(connection?.effectiveType || "unknown");
    const memory = Number(navigator.deviceMemory || 0);
    const cores = Number(navigator.hardwareConcurrency || 0);
    const reducedMotion = Boolean(media.reducedMotion?.matches);
    const constrainedNetwork = saveData || ["slow-2g", "2g"].includes(effectiveType);
    const constrainedDevice = (memory > 0 && memory <= 4) || (cores > 0 && cores <= 4);
    const tier = constrainedNetwork || constrainedDevice ? "economy" : "standard";
    return Object.freeze({
      build: BUILD,
      tier,
      saveData,
      effectiveType,
      memory,
      cores,
      reducedMotion,
      coarsePointer: Boolean(media.coarsePointer?.matches),
      maxConcurrentLoads: tier === "economy" ? 2 : 4,
      maxCanvasDpr: tier === "economy" ? 1.25 : 2,
      animationFps: reducedMotion ? 0 : tier === "economy" ? 6 : 10,
    });
  }

  function applyProfile() {
    const current = profile();
    const html = document.documentElement;
    html.dataset.runtimeTier = current.tier;
    html.dataset.reducedMotion = current.reducedMotion ? "reduce" : "full";
    if (document.body) document.body.dataset.dataEconomy = current.tier === "economy" ? "on" : "off";
    global.dispatchEvent(new CustomEvent("millennium:performance-profile", { detail: current }));
    return current;
  }

  function normalizeUrl(url) {
    try {
      return new URL(String(url || ""), document.baseURI).href;
    } catch {
      return String(url || "");
    }
  }

  function drainQueue() {
    const current = profile();
    while (activeLoads < current.maxConcurrentLoads && queue.length) {
      const task = queue.shift();
      if (!task) continue;
      activeLoads += 1;
      Promise.resolve()
        .then(task.run)
        .then(task.resolve, task.reject)
        .finally(() => {
          activeLoads = Math.max(0, activeLoads - 1);
          drainQueue();
        });
    }
  }

  function enqueue(key, run) {
    if (loadedAssets.has(key)) return Promise.resolve({ url: key, cached: true });
    if (pendingAssets.has(key)) return pendingAssets.get(key);
    const promise = new Promise((resolve, reject) => queue.push({ key, run, resolve, reject }));
    pendingAssets.set(key, promise);
    promise.finally(() => pendingAssets.delete(key));
    drainQueue();
    return promise;
  }

  function preloadImage(url, options = {}) {
    const key = normalizeUrl(url);
    if (!key) return Promise.resolve(null);
    return enqueue(key, () => new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.loading = "eager";
      if (options.fetchPriority && "fetchPriority" in image) image.fetchPriority = options.fetchPriority;
      image.onload = async () => {
        try { await image.decode?.(); } catch { /* decoding fallback */ }
        loadedAssets.add(key);
        resolve({ url: key, width: image.naturalWidth, height: image.naturalHeight, cached: false });
      };
      image.onerror = () => reject(new Error(`Falha ao carregar asset: ${key}`));
      image.src = key;
    }));
  }

  function preloadJson(url) {
    const key = normalizeUrl(url);
    if (!key) return Promise.resolve(null);
    return enqueue(key, async () => {
      const response = await fetch(key, { cache: "force-cache", credentials: "same-origin" });
      if (!response.ok) throw new Error(`Falha ao carregar catálogo: HTTP ${response.status}`);
      const data = await response.json();
      loadedAssets.add(key);
      return { url: key, data, cached: false };
    });
  }

  function assetSetForMonster(speciesId, mode = "profile") {
    const id = String(speciesId || "").replace(/[^a-z0-9-]/gi, "");
    if (!id) return [];
    const root = `assets/monsters/${id}`;
    if (mode === "battle") return [`${root}/battle-atlas.webp`, `${root}/battle-atlas.json`, `${root}/thumbnail.webp`];
    if (mode === "tower") return [`${root}/tower-sprite.webp`, `${root}/thumbnail.webp`];
    if (mode === "collection") return [`${root}/thumbnail.webp`];
    return [`${root}/portrait.webp`, `${root}/idle.webp`, `${root}/thumbnail.webp`];
  }

  function preloadMonster(speciesId, mode = "profile") {
    const assets = assetSetForMonster(speciesId, mode);
    if (profile().tier === "economy" && mode === "profile") assets.splice(1, 1);
    return Promise.allSettled(assets.map((asset) => asset.endsWith(".json") ? preloadJson(asset) : preloadImage(asset, { fetchPriority: mode === "battle" ? "high" : "low" })));
  }

  function prepareImages(root = document) {
    root.querySelectorAll?.("img").forEach((image) => {
      if (!image.hasAttribute("decoding")) image.decoding = "async";
      const insideCriticalAuth = Boolean(image.closest(".auth-hero-media"));
      if (!insideCriticalAuth && !image.hasAttribute("loading")) image.loading = "lazy";
      if (!insideCriticalAuth && "fetchPriority" in image && !image.fetchPriority) image.fetchPriority = "low";
    });
  }

  function observeImages(root = document) {
    prepareImages(root);
    if (!("MutationObserver" in global)) return () => {};
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches?.("img")) prepareImages({ querySelectorAll: () => [node] });
          prepareImages(node);
        }
      }
    });
    observer.observe(root.documentElement || root, { childList: true, subtree: true });
    observers.add(observer);
    return () => { observer.disconnect(); observers.delete(observer); };
  }

  function setVisibility(hidden = document.hidden) {
    const next = hidden ? "hidden" : "visible";
    if (document.documentElement.dataset.documentVisibility === next) return false;
    document.documentElement.dataset.documentVisibility = next;
    global.dispatchEvent(new CustomEvent(hidden ? "millennium:runtime-suspend" : "millennium:runtime-resume", {
      detail: { reason: "visibility", at: Date.now() },
    }));
    return true;
  }

  function installPerformanceObservers() {
    if (!("PerformanceObserver" in global)) return;
    try {
      const longTaskObserver = new PerformanceObserver((list) => { longTasks += list.getEntries().length; });
      longTaskObserver.observe({ type: "longtask", buffered: true });
      observers.add(longTaskObserver);
    } catch { /* unsupported entry type */ }
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => { resourceBytes += Number(entry.transferSize || 0); });
      });
      resourceObserver.observe({ type: "resource", buffered: true });
      observers.add(resourceObserver);
    } catch { /* unsupported entry type */ }
  }

  function report() {
    return Object.freeze({
      profile: profile(),
      loadedAssetCount: loadedAssets.size,
      pendingAssetCount: pendingAssets.size,
      queuedAssetCount: queue.length,
      activeLoads,
      longTasks,
      observedTransferBytes: resourceBytes,
      hidden: document.hidden,
    });
  }

  function dispose() {
    observers.forEach((observer) => observer.disconnect?.());
    observers.clear();
    queue.splice(0, queue.length);
    pendingAssets.clear();
  }

  media.reducedMotion?.addEventListener?.("change", applyProfile);
  connection?.addEventListener?.("change", applyProfile);
  document.addEventListener("visibilitychange", () => setVisibility(document.hidden), { passive: true });

  const api = Object.freeze({
    version: 1,
    build: BUILD,
    profile,
    applyProfile,
    preloadImage,
    preloadJson,
    preloadMonster,
    assetSetForMonster,
    prepareImages,
    observeImages,
    setVisibility,
    report,
    dispose,
  });

  global.MILLENNIUM_PERFORMANCE_364 = api;
  applyProfile();
  observeImages(document);
  installPerformanceObservers();
  setVisibility(document.hidden);
})(window);
