(function exposeMillenniumVividMinigames(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.MILLENNIUM_MINIGAMES_VIVID_364 = Object.freeze(api);
}(typeof globalThis !== "undefined" ? globalThis : window, function vividMinigamesFactory() {
  "use strict";

  const VERSION = 1;
  const MODES = Object.freeze(["aim", "seals", "cartography", "alchemy", "dungeon", "arena", "boss", "tower"]);

  function hashSeed(seed = "millennium") {
    let hash = 2166136261;
    for (const char of String(seed)) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function randomFromSeed(seed = "millennium") {
    let value = hashSeed(seed) || 1;
    return () => {
      value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, Number(value) || 0));
  }

  function normalizeEvent(input = {}) {
    const mode = MODES.includes(String(input.mode || "")) ? String(input.mode) : "aim";
    const startsAt = String(input.startsAt || "");
    const endsAt = String(input.endsAt || "");
    const reward = String(input.reward || "Recompensa temática").slice(0, 180);
    return {
      id: String(input.id || `event-${hashSeed(`${mode}:${input.name || "evento"}:${startsAt}`)}`).slice(0, 100),
      name: String(input.name || "Evento do Oráculo").slice(0, 100),
      description: String(input.description || "Uma anomalia altera temporariamente este modo.").slice(0, 500),
      mode,
      status: ["draft", "scheduled", "active", "ended", "archived"].includes(input.status) ? input.status : "draft",
      startsAt,
      endsAt,
      banner: String(input.banner || "").slice(0, 500),
      metric: String(input.metric || "score").slice(0, 40),
      attemptLimit: clamp(input.attemptLimit || 3, 1, 99),
      scoreMultiplier: clamp(input.scoreMultiplier || 1, 0.25, 5),
      timeModifier: clamp(input.timeModifier || 0, -120, 300),
      difficultyModifier: clamp(input.difficultyModifier || 0, -3, 6),
      reward,
      version: Math.max(1, Number(input.version || 1)),
      updatedAt: String(input.updatedAt || new Date().toISOString()),
    };
  }

  function isEventActive(event, now = Date.now()) {
    const item = normalizeEvent(event);
    if (!['active', 'scheduled'].includes(item.status)) return false;
    const start = Date.parse(item.startsAt) || 0;
    const end = Date.parse(item.endsAt) || Number.POSITIVE_INFINITY;
    return now >= start && now < end;
  }

  function eventsForMode(events = [], mode = "aim", now = Date.now()) {
    return events.map(normalizeEvent).filter((event) => event.mode === mode && isEventActive(event, now));
  }

  function modeModifier(events = [], mode = "aim", now = Date.now()) {
    return eventsForMode(events, mode, now).reduce((result, event) => ({
      scoreMultiplier: result.scoreMultiplier * event.scoreMultiplier,
      timeModifier: result.timeModifier + event.timeModifier,
      difficultyModifier: result.difficultyModifier + event.difficultyModifier,
      events: [...result.events, event],
    }), { scoreMultiplier: 1, timeModifier: 0, difficultyModifier: 0, events: [] });
  }

  function createAimConfig(seed, difficulty = {}, level = 1, events = []) {
    const random = randomFromSeed(seed);
    const modifier = modeModifier(events, "aim");
    const stage = clamp(level, 1, 3);
    const multiplier = Math.max(0.7, Number(difficulty.multiplier || 1));
    const seconds = clamp((difficulty.id === "god-slayer" ? 48 : 44) - (stage - 1) * 5 + modifier.timeModifier, 20, 120);
    return {
      seed: String(seed),
      seconds,
      magazine: clamp(8 - Math.floor(multiplier / 2), 4, 8),
      reloadMs: clamp(1250 - multiplier * 70, 620, 1250),
      spawnMs: clamp(900 - multiplier * 85 - (stage - 1) * 100, 220, 900),
      targetLifeMs: clamp(2100 - multiplier * 130 - (stage - 1) * 140, 650, 2100),
      maxTargets: clamp(3 + Math.round(multiplier), 3, 8),
      drift: 0.12 + random() * 0.08 + multiplier * 0.015,
      scoreMultiplier: modifier.scoreMultiplier,
      eventNames: modifier.events.map((event) => event.name),
    };
  }

  function createSealConfig(seed, difficulty = {}, level = 1, events = []) {
    const modifier = modeModifier(events, "seals");
    const base = ({ noob: 3, facil: 4, medio: 5, hard: 6, pesadelo: 7, "god-slayer": 8 })[difficulty.id] || 4;
    return {
      seed: String(seed),
      rounds: clamp(2 + Number(level || 1), 3, 5),
      baseLength: clamp(base + Number(level || 1) - 1 + modifier.difficultyModifier, 3, 12),
      corruptionPerError: clamp(38 + Math.max(0, Number(difficulty.multiplier || 1) - 1) * 5, 34, 60),
      scoreMultiplier: modifier.scoreMultiplier,
      eventNames: modifier.events.map((event) => event.name),
    };
  }

  function makePath(size, random) {
    const path = [[0, 0]];
    let x = 0;
    let y = 0;
    while (x < size - 1 || y < size - 1) {
      if (x >= size - 1) y += 1;
      else if (y >= size - 1) x += 1;
      else if (random() > 0.5) x += 1;
      else y += 1;
      path.push([x, y]);
    }
    return path;
  }

  function createCartographyExpedition(seed, difficulty = {}, level = 1, events = []) {
    const random = randomFromSeed(seed);
    const modifier = modeModifier(events, "cartography");
    const size = clamp(6 + Number(level || 1), 7, 9);
    const path = makePath(size, random);
    const safe = new Set(path.map(([x, y]) => `${x}:${y}`));
    const cells = [];
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const key = `${x}:${y}`;
        let type = "ground";
        if (!safe.has(key)) {
          const roll = random();
          if (roll < 0.19) type = "wall";
          else if (roll < 0.28) type = "trap";
          else if (roll < 0.37) type = "relic";
        }
        cells.push({ x, y, type, discovered: x <= 1 && y <= 1, collected: false });
      }
    }
    const guaranteedRelicPoints = [path[Math.max(1, Math.floor(path.length / 3))], path[Math.max(2, Math.floor(path.length * 2 / 3))]];
    guaranteedRelicPoints.forEach(([x, y]) => {
      const cell = cells.find((entry) => entry.x === x && entry.y === y);
      if (cell && !(x === size - 1 && y === size - 1)) cell.type = "relic";
    });
    const relicCells = cells.filter((cell) => cell.type === "relic");
    const relics = relicCells.length;
    return {
      seed: String(seed),
      size,
      cells,
      player: { x: 0, y: 0 },
      exit: { x: size - 1, y: size - 1 },
      relicTarget: Math.min(2, relics),
      relics: 0,
      damage: 0,
      moves: 0,
      remaining: clamp(105 - (Number(level || 1) - 1) * 12 + modifier.timeModifier, 45, 180),
      scoreMultiplier: modifier.scoreMultiplier,
      eventNames: modifier.events.map((event) => event.name),
    };
  }

  const DIRECTIONS = Object.freeze({ up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] });

  function revealAround(session) {
    const range = 1;
    session.cells.forEach((cell) => {
      const distance = Math.abs(cell.x - session.player.x) + Math.abs(cell.y - session.player.y);
      if (distance <= range) cell.discovered = true;
    });
  }

  function moveCartography(session, direction) {
    const delta = DIRECTIONS[direction];
    if (!session || !delta) return { moved: false, session };
    const x = session.player.x + delta[0];
    const y = session.player.y + delta[1];
    const cell = session.cells.find((item) => item.x === x && item.y === y);
    if (!cell || cell.type === "wall") return { moved: false, blocked: true, session };
    session.player = { x, y };
    session.moves += 1;
    let event = "move";
    if (cell.type === "trap" && !cell.collected) {
      cell.collected = true;
      session.damage += 1;
      event = "trap";
    }
    if (cell.type === "relic" && !cell.collected) {
      cell.collected = true;
      session.relics += 1;
      event = "relic";
    }
    revealAround(session);
    const reachedExit = x === session.exit.x && y === session.exit.y;
    return { moved: true, event, reachedExit, complete: reachedExit && session.relics >= session.relicTarget, session };
  }

  const LAB_INGREDIENTS = Object.freeze([
    { id: "ember", name: "Cinza Rubra", heat: 18, stability: -10, essence: 5, glyph: "▲" },
    { id: "dew", name: "Orvalho Lunar", heat: -12, stability: 18, essence: 8, glyph: "●" },
    { id: "moss", name: "Musgo de Ossos", heat: 2, stability: 12, essence: 4, glyph: "✦" },
    { id: "glass", name: "Vidro Negro", heat: 7, stability: -16, essence: 11, glyph: "◆" },
    { id: "salt", name: "Sal de Aurora", heat: -3, stability: 22, essence: 6, glyph: "✧" },
    { id: "ichor", name: "Ícor do Abismo", heat: 14, stability: -24, essence: 15, glyph: "☽" },
  ]);

  function createAlchemyLab(seed, difficulty = {}, level = 1, events = []) {
    const random = randomFromSeed(seed);
    const modifier = modeModifier(events, "alchemy");
    const count = clamp(3 + Number(level || 1), 4, 6);
    const ingredients = [...LAB_INGREDIENTS]
      .map((item) => ({ item, sort: random() }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, count)
      .map(({ item }) => ({ ...item }));
    const recipe = [...ingredients]
      .map((item) => ({ item, sort: random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item.id);
    const targetHeat = clamp(42 + Math.round((random() - 0.5) * 20) + modifier.difficultyModifier * 2, 28, 70);
    const potentialStability = clamp(50 + ingredients.reduce((sum, item) => sum + item.stability, 0), 20, 100);
    const targetStability = clamp(Math.min(potentialStability, 50 + Number(difficulty.multiplier || 1) * 4), 35, 78);
    return {
      seed: String(seed),
      ingredients,
      recipe,
      selection: [],
      heat: 35,
      targetHeat,
      targetStability,
      stability: 50,
      essence: 0,
      brewed: false,
      scoreMultiplier: modifier.scoreMultiplier,
      eventNames: modifier.events.map((event) => event.name),
      clues: [
        `${ingredients.find((item) => item.id === recipe[0])?.name} inicia a reação.`,
        `${ingredients.find((item) => item.id === recipe.at(-1))?.name} deve selar o caldeirão.`,
        `Mantenha o calor próximo de ${targetHeat}° e a estabilidade acima de ${targetStability}%.`,
      ],
    };
  }

  function addAlchemyIngredient(session, ingredientId) {
    if (!session || session.selection.includes(ingredientId)) return session;
    const item = session.ingredients.find((entry) => entry.id === ingredientId);
    if (!item) return session;
    session.selection.push(ingredientId);
    session.heat = clamp(session.heat + item.heat, 0, 100);
    session.stability = clamp(session.stability + item.stability, 0, 100);
    session.essence += item.essence;
    return session;
  }

  function adjustAlchemyHeat(session, delta) {
    if (!session) return session;
    session.heat = clamp(session.heat + Number(delta || 0), 0, 100);
    session.stability = clamp(session.stability - Math.abs(Number(delta || 0)) * 0.35, 0, 100);
    return session;
  }

  function evaluateAlchemyLab(session) {
    const total = session.recipe.length;
    const correct = session.recipe.reduce((sum, id, index) => sum + (session.selection[index] === id ? 1 : 0), 0);
    const orderRatio = total ? correct / total : 0;
    const heatDistance = Math.abs(session.heat - session.targetHeat);
    const heatRatio = clamp(1 - heatDistance / 45, 0, 1);
    const stabilityRatio = clamp(session.stability / Math.max(1, session.targetStability), 0, 1);
    const score = Math.round((orderRatio * 0.55 + heatRatio * 0.25 + stabilityRatio * 0.2) * 10000 * session.scoreMultiplier);
    return {
      correct,
      total,
      heatDistance,
      passed: correct === total && heatDistance <= 10 && session.stability >= session.targetStability,
      score,
    };
  }

  const DEFAULT_EVENTS = Object.freeze([
    normalizeEvent({ id: "echoes-precision", name: "Noite dos Mil Olhos", mode: "aim", status: "draft", metric: "score", scoreMultiplier: 1.15, reward: "Emblemas de Precisão adicionais" }),
    normalizeEvent({ id: "seal-corruption", name: "Ritual Corrompido", mode: "seals", status: "draft", metric: "rounds", difficultyModifier: 1, reward: "Selos de Ressonância" }),
    normalizeEvent({ id: "lost-atlas", name: "Atlas sem Lua", mode: "cartography", status: "draft", metric: "relics", reward: "Relíquias Cartográficas" }),
    normalizeEvent({ id: "unstable-moon", name: "Lua Instável", mode: "alchemy", status: "draft", metric: "quality", scoreMultiplier: 1.1, reward: "Catalisadores Instáveis" }),
  ]);

  return {
    version: VERSION,
    modes: MODES,
    defaultEvents: DEFAULT_EVENTS,
    hashSeed,
    randomFromSeed,
    normalizeEvent,
    isEventActive,
    eventsForMode,
    modeModifier,
    createAimConfig,
    createSealConfig,
    createCartographyExpedition,
    moveCartography,
    createAlchemyLab,
    addAlchemyIngredient,
    adjustAlchemyHeat,
    evaluateAlchemyLab,
  };
}));
