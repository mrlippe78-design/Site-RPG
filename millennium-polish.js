(function exposeMillenniumPolish31() {
  "use strict";

  const MINIGAME_STATES = Object.freeze([
    "idle", "preparing", "running", "paused", "resolving", "completed", "cancelled", "failed",
  ]);

  const VALID_TRANSITIONS = Object.freeze({
    idle: ["preparing", "cancelled"],
    preparing: ["running", "cancelled", "failed"],
    running: ["paused", "resolving", "cancelled", "failed"],
    paused: ["running", "cancelled", "failed"],
    resolving: ["completed", "failed"],
    completed: [],
    cancelled: [],
    failed: [],
  });

  const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, Number(value) || 0));
  const clean = (value, maximum = 360) => String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maximum);
  const stripAccents = (value) => clean(value, 1000).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function createLifecycle(initial = "idle", now = () => Date.now()) {
    if (!MINIGAME_STATES.includes(initial)) throw new Error(`Estado de minigame inválido: ${initial}`);
    let current = initial;
    const history = [{ state: current, at: now(), reason: "initial" }];
    return Object.freeze({
      get state() { return current; },
      get terminal() { return ["completed", "cancelled", "failed"].includes(current); },
      history,
      can(next) { return Boolean(VALID_TRANSITIONS[current]?.includes(next)); },
      transition(next, reason = "") {
        if (!MINIGAME_STATES.includes(next)) throw new Error(`Estado de minigame inválido: ${next}`);
        if (!VALID_TRANSITIONS[current]?.includes(next)) throw new Error(`Transição inválida: ${current} → ${next}`);
        current = next;
        history.push({ state: current, at: now(), reason: clean(reason, 160) });
        return current;
      },
    });
  }

  function stableHash(value = "") {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function escapeXml(value = "") {
    return String(value).replace(/[<>&"']/g, (character) => ({
      "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
    })[character]);
  }

  function fallbackVisual(kind = "record", item = {}) {
    const id = clean(item.id || item.name || item.title || kind, 128) || kind;
    const label = clean(item.name || item.title || item.id || "Registro", 52) || "Registro";
    const seed = stableHash(`${kind}:${id}`);
    const hue = seed % 360;
    const hue2 = (hue + 34 + (seed % 71)) % 360;
    const symbol = ({
      race: "✦", races: "✦", class: "⚔", classes: "⚔", affinity: "◈", affinities: "◈",
      kingdom: "♜", kingdoms: "♜", region: "⌖", regions: "⌖", npc: "◇", npcs: "◇",
      bestiary: "☽", biome: "⌁", biomes: "⌁", event: "✺", events: "✺", lore: "☷",
      profession: "⚒", culture: "✧", map: "⌖", pet: "◆", item: "◊",
    })[kind] || "◈";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${escapeXml(label)}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="hsl(${hue} 29% 11%)"/><stop offset="1" stop-color="hsl(${hue2} 35% 20%)"/></linearGradient><radialGradient id="r"><stop stop-color="hsla(${hue2} 72% 68%/.34)"/><stop offset="1" stop-color="transparent"/></radialGradient></defs><rect width="640" height="360" fill="url(#g)"/><rect width="640" height="360" fill="url(#r)"/><path d="M0 296 Q160 232 320 292 T640 278 V360 H0Z" fill="rgba(0,0,0,.35)"/><circle cx="320" cy="150" r="78" fill="none" stroke="hsla(${hue2} 60% 72%/.48)" stroke-width="3"/><circle cx="320" cy="150" r="58" fill="none" stroke="hsla(${hue2} 60% 72%/.18)"/><text x="320" y="178" text-anchor="middle" font-size="82" fill="hsl(${hue2} 58% 77%)">${symbol}</text><text x="320" y="304" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="rgba(246,235,207,.9)">${escapeXml(label)}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function visualFor(item = {}, options = {}) {
    const kind = clean(options.kind || "record", 48).toLowerCase();
    const hero = clean(item.imageHero || item.imageUrl || item.heroUrl || "", 2000);
    const thumbnail = clean(item.imageThumbnail || item.thumbnailUrl || "", 2000);
    const fallback = clean(item.fallbackUrl || item.imageFallback || "", 2000) || fallbackVisual(kind, item);
    return Object.freeze({
      hero: hero || thumbnail || fallback,
      thumbnail: thumbnail || hero || fallback,
      fallback,
      alt: clean(item.altText || item.name || item.title || item.id || `Registro de ${kind}`, 180),
      focusX: clamp(item.focusX ?? 50, 0, 100),
      focusY: clamp(item.focusY ?? 50, 0, 100),
      zoom: clamp(item.zoom ?? 1, 0.5, 3),
    });
  }

  function compactText(value, maximum = 220) {
    const text = clean(value, 5000);
    if (text.length <= maximum) return text;
    const shortened = text.slice(0, Math.max(1, maximum - 1));
    const boundary = shortened.lastIndexOf(" ");
    return `${shortened.slice(0, boundary > maximum * 0.65 ? boundary : shortened.length).trim()}…`;
  }

  function codexPresentation(tab, item = {}, context = {}) {
    const category = context.category || {};
    const ownerCount = Number(context.ownerCount || 0);
    const bonus = clean(context.bonusText || "", 120);
    const title = clean(item.name || item.title || item.id || "Registro", 140);
    const meta = [];
    const add = (label, value) => { if (clean(value, 120)) meta.push({ label, value: clean(value, 120) }); };
    const summaryCandidates = [item.summary, item.description, item.passive, item.role, item.domain];

    if (tab === "affinities") {
      add("Categoria", category.name || item.categoryId);
      add("Raridade", item.rarity || category.rarity);
      add("Bônus", bonus);
      add("Portadores", `${ownerCount}`);
      add("Domínio", item.domain);
      add("Limite", item.limitations || item.weaknesses || item.prohibitedUses);
      return { title, summary: compactText(item.summary || item.description || item.passive || "Afinidade registrada pela Interface.", 210), meta };
    }
    if (tab === "categories") {
      add("Raridade", item.rarity);
      add("Peso", item.weight);
      add("Afinidades", context.affinityCount);
      add("Portadores", `${ownerCount}`);
    } else if (["races", "classes"].includes(tab)) {
      add("Bônus", bonus);
      add(tab === "classes" ? "Função" : "Passiva", tab === "classes" ? item.role : item.passive);
      if (tab === "races") {
        add("Origem", item.origin);
        add("Habitat", item.habitat || item.biome);
        add("Símbolo", item.symbolism);
      }
    } else if (tab === "bestiary") {
      add("Região", item.region);
      add("Fraqueza", item.weakness);
      add("Drops", item.drops);
    } else if (tab === "regions") {
      add("Reino", context.kingdomName);
      add("Ambiente", item.environment || item.climate);
    } else if (tab === "kingdoms") {
      add("Governo", item.government || item.ruler);
      add("Clima", item.climate);
    } else if (tab === "events") {
      add("Estado", item.status);
      add("Modificador", item.modifier);
      add("Recompensa", item.reward);
    } else {
      add("Tipo", item.rarity || item.region || item.role || item.era || item.id);
    }
    return { title, summary: compactText(summaryCandidates.find(Boolean) || "Registro preservado pelo Codex.", 220), meta };
  }

  function createCompletionGuard(initialKeys = []) {
    const keys = new Set((initialKeys || []).filter(Boolean).map(String));
    return Object.freeze({
      has(key) { return keys.has(String(key)); },
      claim(key) {
        const normalized = clean(key, 200);
        if (!normalized || keys.has(normalized)) return false;
        keys.add(normalized);
        return true;
      },
      release(key) { keys.delete(String(key)); },
      values() { return [...keys]; },
    });
  }

  function diagnosticSnapshot(input = {}) {
    const images = Array.isArray(input.images) ? input.images : [];
    const imageStats = images.reduce((result, image) => {
      result.total += 1;
      if (image.complete && Number(image.naturalWidth || 0) > 0) result.loaded += 1;
      else result.failed += 1;
      return result;
    }, { total: 0, loaded: 0, failed: 0 });
    return Object.freeze({
      build: clean(input.build || "unknown", 64),
      commit: clean(input.commit || "dev", 64),
      route: clean(input.route || "", 128),
      listeners: Math.max(0, Number(input.listeners || 0)),
      renders: Math.max(0, Number(input.renders || 0)),
      lastRenderMs: Math.max(0, Number(input.lastRenderMs || 0)),
      reads: Math.max(0, Number(input.reads || 0)),
      writes: Math.max(0, Number(input.writes || 0)),
      focused: clean(input.focused || "", 128),
      online: Boolean(input.online),
      serviceWorker: clean(input.serviceWorker || "indisponível", 80),
      images: imageStats,
      minigames: Array.isArray(input.minigames) ? input.minigames.map((game) => ({
        mode: clean(game.mode || "", 48), state: clean(game.state || "idle", 32), timers: Math.max(0, Number(game.timers || 0)),
      })) : [],
    });
  }

  function installImageFallback(root, resolver = fallbackVisual) {
    if (!root?.addEventListener) return () => {};
    const handler = (event) => {
      const image = event.target;
      if (!image || image.tagName !== "IMG" || image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.src = image.dataset.fallbackSrc || resolver(image.dataset.visualKind || "record", {
        id: image.dataset.visualId || image.alt || "record", name: image.alt || "Registro",
      });
      image.classList.add("image-fallback-applied");
    };
    root.addEventListener("error", handler, true);
    return () => root.removeEventListener("error", handler, true);
  }

  window.MILLENNIUM_POLISH_31 = Object.freeze({
    MINIGAME_STATES,
    VALID_TRANSITIONS,
    clamp,
    clean,
    stripAccents,
    createLifecycle,
    stableHash,
    fallbackVisual,
    visualFor,
    compactText,
    codexPresentation,
    createCompletionGuard,
    diagnosticSnapshot,
    installImageFallback,
  });
}());
