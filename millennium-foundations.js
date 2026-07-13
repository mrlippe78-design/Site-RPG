(function exposeMillenniumFoundations(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.MILLENNIUM_FOUNDATIONS_34 = Object.freeze(api);
}(typeof globalThis !== "undefined" ? globalThis : window, function millenniumFoundationsFactory() {
  "use strict";

  const MINIGAME_LEVELS = Object.freeze([
    { id: 1, name: "Nível 1", scoreFactor: 0.75, complexity: 0, rewardFactor: 1 },
    { id: 2, name: "Nível 2", scoreFactor: 1, complexity: 1, rewardFactor: 1.12 },
    { id: 3, name: "Nível 3", scoreFactor: 1.3, complexity: 2, rewardFactor: 1.28 },
  ]);

  const MUSIC_TRACKS = Object.freeze([
    { id: "awakening", name: "Primeiro Despertar", mood: "Ritual e esperança", drone: [73.42, 110, 146.83], melody: [220, 261.63, 293.66, 329.63, 293.66, 246.94, 220, 196], interval: 3200, filter: 840 },
    { id: "eclipse", name: "Coroa do Eclipse", mood: "Tensão e presságio", drone: [58.27, 87.31, 116.54], melody: [174.61, 207.65, 233.08, 196, 155.56, 146.83], interval: 3500, filter: 690 },
    { id: "abyss", name: "Fundo Sem Nome", mood: "Vazio e profundidade", drone: [55, 82.41, 123.47], melody: [164.81, 196, 233.08, 174.61, 146.83, 130.81], interval: 3900, filter: 620 },
    { id: "living-forest", name: "Raízes que Escutam", mood: "Bosque e névoa", drone: [65.41, 98, 146.83], melody: [196, 246.94, 293.66, 261.63, 220, 174.61], interval: 3450, filter: 920 },
    { id: "ancient-blood", name: "Juramento Carmesim", mood: "Ferro e memória", drone: [65.41, 98, 130.81], melody: [196, 207.65, 261.63, 233.08, 174.61, 155.56], interval: 3000, filter: 760 },
    { id: "constellation", name: "Mapa das Sete Luzes", mood: "Estrelas e descoberta", drone: [82.41, 123.47, 185], melody: [246.94, 329.63, 392, 369.99, 293.66, 246.94], interval: 3700, filter: 1080 },
    { id: "hollow-winter", name: "Ruínas sob o Gelo", mood: "Frio e silêncio", drone: [82.41, 123.47, 164.81], melody: [246.94, 329.63, 369.99, 293.66, 246.94, 220], interval: 3600, filter: 1040 },
    { id: "rust", name: "Máquinas sem Identidade", mood: "Cobre e marcha", drone: [73.42, 110, 146.83], melody: [220, 293.66, 349.23, 329.63, 261.63, 220], interval: 2850, filter: 900 },
    { id: "broken-sin", name: "Vidro de um Pecado", mood: "Vinho e tragédia", drone: [61.74, 92.5, 138.59], melody: [185, 220, 277.18, 246.94, 207.65, 164.81], interval: 3300, filter: 720 },
    { id: "spirit-veil", name: "Vozes do Véu", mood: "Espíritos e fumaça", drone: [69.3, 103.83, 155.56], melody: [207.65, 277.18, 311.13, 246.94, 207.65, 185], interval: 3800, filter: 970 },
    { id: "codex-whispers", name: "Sussurros do Codex", mood: "Leitura e mistério", drone: [55, 110, 164.81], melody: [220, 233.08, 293.66, 261.63, 196], interval: 4400, filter: 780 },
    { id: "summoning", name: "Círculo de Invocação", mood: "Gacha e descoberta", drone: [73.42, 146.83, 220], melody: [293.66, 369.99, 440, 329.63, 392, 293.66], interval: 2500, filter: 1180 },
  ]);

  function clampLevel(level) {
    return Math.max(1, Math.min(3, Number(level) || 1));
  }

  function minigameProgress(character = {}, mode = "aim", difficultyId = "facil") {
    const entry = character.minigameProgress?.[mode]?.[difficultyId] || {};
    const unlockedLevel = clampLevel(entry.unlockedLevel || 1);
    return {
      unlockedLevel,
      bestScores: { ...(entry.bestScores || {}) },
      clearedLevels: [...new Set(entry.clearedLevels || [])].map(Number).filter((value) => value >= 1 && value <= 3),
    };
  }

  function minigameTarget(difficulty = {}, level = 1) {
    const stage = MINIGAME_LEVELS[clampLevel(level) - 1];
    return Math.max(1, Math.round(Number(difficulty.minScore || 1) * stage.scoreFactor));
  }

  function isMinigameLevelUnlocked(character, mode, difficultyId, level) {
    return clampLevel(level) <= minigameProgress(character, mode, difficultyId).unlockedLevel;
  }

  function recordMinigameProgress(character, mode, difficulty, level, score) {
    const stage = clampLevel(level);
    const previous = minigameProgress(character, mode, difficulty.id);
    const target = minigameTarget(difficulty, stage);
    const passed = Number(score || 0) >= target;
    const unlockedLevel = passed ? Math.min(3, Math.max(previous.unlockedLevel, stage + 1)) : previous.unlockedLevel;
    const clearedLevels = passed ? [...new Set([...previous.clearedLevels, stage])].sort() : previous.clearedLevels;
    const entry = {
      unlockedLevel,
      bestScores: { ...previous.bestScores, [stage]: Math.max(Number(previous.bestScores[stage] || 0), Number(score || 0)) },
      clearedLevels,
    };
    return {
      passed,
      target,
      unlockedNext: passed && stage < 3 && previous.unlockedLevel < stage + 1,
      progress: {
        ...(character.minigameProgress || {}),
        [mode]: {
          ...(character.minigameProgress?.[mode] || {}),
          [difficulty.id]: entry,
        },
      },
    };
  }

  function techniqueSlotsForLevel(level) {
    return Math.max(0, Math.floor(Math.max(1, Number(level) || 1) / 5));
  }

  function nextTechniqueLevel(level) {
    const safe = Math.max(1, Number(level) || 1);
    return (Math.floor(safe / 5) + 1) * 5;
  }

  function xpForNextLevel(level) {
    const safeLevel = Math.max(1, Math.floor(Number(level) || 1));
    return 100 + (safeLevel - 1) * 50;
  }

  function progressionSnapshot(character = {}, levelMax = 99) {
    const maximum = Math.max(1, Math.floor(Number(levelMax) || 99));
    const level = Math.max(1, Math.min(maximum, Math.floor(Number(character.level) || 1)));
    const required = xpForNextLevel(level);
    const storedProgress = Math.max(0, Math.floor(Number(character.levelProgressXp) || 0));
    const progressXp = level >= maximum ? 0 : Math.min(storedProgress, required - 1);
    return {
      level,
      levelMax: maximum,
      totalXp: Math.max(0, Math.floor(Number(character.xp) || 0)),
      progressXp,
      requiredXp: required,
      remainingXp: level >= maximum ? 0 : Math.max(0, required - progressXp),
      percentage: level >= maximum ? 100 : Math.round((progressXp / required) * 100),
      freePoints: Math.max(0, Math.floor(Number(character.freePoints) || 0)),
    };
  }

  function applyApprovedXp(character = {}, approvedXp = 0, levelMax = 99) {
    const gain = Math.max(0, Math.floor(Number(approvedXp) || 0));
    const before = progressionSnapshot(character, levelMax);
    let level = before.level;
    let progressXp = before.progressXp + gain;
    let gainedLevels = 0;

    while (level < before.levelMax && progressXp >= xpForNextLevel(level)) {
      progressXp -= xpForNextLevel(level);
      level += 1;
      gainedLevels += 1;
    }
    if (level >= before.levelMax) progressXp = 0;

    return {
      xp: before.totalXp + gain,
      level,
      levelProgressXp: progressXp,
      freePoints: before.freePoints + gainedLevels,
      gainedLevels,
      gainedAttributePoints: gainedLevels,
      unlockedTechniqueLevels: Array.from({ length: gainedLevels }, (_, index) => before.level + index + 1).filter((value) => value % 5 === 0),
      before,
      after: progressionSnapshot({
        xp: before.totalXp + gain,
        level,
        levelProgressXp: progressXp,
        freePoints: before.freePoints + gainedLevels,
      }, before.levelMax),
    };
  }

  function validateAttributeAllocation(character = {}, allocation = {}) {
    const keys = ["for", "vel", "hab", "res", "pod"];
    const normalized = Object.fromEntries(keys.map((key) => [key, Math.max(0, Math.floor(Number(allocation?.[key]) || 0))]));
    const hasInvalid = keys.some((key) => !Number.isInteger(Number(allocation?.[key] ?? 0)) || Number(allocation?.[key] ?? 0) < 0);
    const points = keys.reduce((sum, key) => sum + normalized[key], 0);
    const freePoints = Math.max(0, Math.floor(Number(character.freePoints) || 0));
    const errors = [];
    if (hasInvalid) errors.push("Use apenas números inteiros não negativos na distribuição.");
    if (points < 1) errors.push("Distribua pelo menos um ponto antes de enviar.");
    if (points > freePoints) errors.push(`A distribuição usa ${points} ponto(s), mas somente ${freePoints} estão disponíveis.`);
    return { valid: !errors.length, errors, allocation: normalized, points, freePoints };
  }

  function inspectBaseAllocation(base = {}) {
    const keys = ["for", "vel", "hab", "res", "pod"];
    const source = base && typeof base === "object" && !Array.isArray(base) ? base : {};
    const normalized = Object.fromEntries(keys.map((key) => [key, Number(source[key])]));
    const exactKeys = Object.keys(source).length === keys.length && Object.keys(source).every((key) => keys.includes(key));
    const integers = keys.every((key) => Number.isInteger(normalized[key]));
    const nonNegative = keys.every((key) => normalized[key] >= 0);
    const total = keys.reduce((sum, key) => sum + (Number.isFinite(normalized[key]) ? normalized[key] : 0), 0);
    return { valid: exactKeys && integers && nonNegative && total === 20, normalized, total, exactKeys, integers, nonNegative };
  }

  function attributeRedistributionEligibility(character = {}) {
    const inspection = inspectBaseAllocation(character.base || {});
    const status = String(character.attributeRedistributionStatus || "").toLowerCase();
    const used = character.attributeRedistributionUsed === true || ["approved", "completed"].includes(status);
    const pending = status === "requested";
    const currentRules = Number(character.attributeRulesVersion || 0) >= 2;
    const explicitlyAvailable = ["available", "required", "rejected"].includes(status);
    const legacy = !currentRules;
    return {
      eligible: !used && (legacy || explicitlyAvailable || !inspection.valid),
      required: !inspection.valid,
      pending,
      used,
      legacy,
      status: status || (legacy ? "available" : "not_required"),
      reason: !inspection.valid ? "A base armazenada não segue a regra dos 20 pontos." : legacy ? "Ficha criada antes da regra de distribuição livre." : explicitlyAvailable ? "Redistribuição liberada pelo Oráculo." : "Ficha já criada sob a regra atual.",
      inspection,
    };
  }

  function validateBaseRedistribution(character = {}, proposedBase = {}) {
    const eligibility = attributeRedistributionEligibility(character);
    const proposed = inspectBaseAllocation(proposedBase);
    const errors = [];
    if (!eligibility.eligible) errors.push(eligibility.used ? "A redistribuição extraordinária já foi utilizada." : "Esta ficha não é elegível para redistribuição.");
    if (eligibility.pending) errors.push("Já existe uma redistribuição aguardando o Oráculo.");
    if (!proposed.exactKeys) errors.push("Informe exatamente os cinco atributos-base.");
    if (!proposed.integers) errors.push("Use somente números inteiros.");
    if (!proposed.nonNegative) errors.push("Atributos-base não podem ser negativos.");
    if (proposed.total !== 20) errors.push(`A nova base soma ${proposed.total}; distribua exatamente 20 pontos.`);
    return { valid: !errors.length, errors, proposedBase: proposed.normalized, eligibility, total: proposed.total };
  }

  function affinityGuide(affinity = {}, category = {}) {
    const domain = String(affinity.domain || affinity.description || "Manifestação ainda não descrita.").trim();
    const limitations = String(affinity.limitations || affinity.limit || "Todo uso exige alcance, custo, condição e contramedida definidos.").trim();
    const categoryName = category.name || affinity.categoryId || "Afinidade";
    return {
      ...affinity,
      description: domain,
      domain,
      limitations,
      powerFoundation: `Use ${affinity.name || "esta afinidade"} como origem e linguagem de um único Poder central. A afinidade não é uma técnica pronta nem concede controle ilimitado.`,
      techniqueGuide: `Cada técnica é uma aplicação específica desse Poder: ataque, defesa, mobilidade, suporte ou utilidade. Novos espaços são liberados nos níveis 5, 10, 15 e assim por diante.`,
      usageExample: `Exemplo: um Poder de ${categoryName.toLowerCase()} define a manifestação principal; cada técnica registra alcance, custo, duração, risco e resposta possível.`,
    };
  }

  function enrichAffinities(affinities = [], categories = []) {
    const byId = Object.fromEntries(categories.map((category) => [category.id, category]));
    return affinities.map((affinity) => affinityGuide(affinity, byId[affinity.categoryId] || {}));
  }

  function musicTrack(id) {
    return MUSIC_TRACKS.find((track) => track.id === id) || MUSIC_TRACKS[0];
  }

  function themePackage(theme, settings = {}) {
    const prefix = `themePackage_${theme.id}_`;
    const stored = settings.themePackages?.[theme.id] || {};
    return {
      id: theme.id,
      name: stored.name || theme.name,
      description: stored.description || settings[`${prefix}description`] || theme.description,
      palette: { ...theme.palette, ...(stored.palette || {}) },
      background: stored.background || theme.background,
      loginArt: stored.loginArt || theme.loginArt,
      music: { ...theme.music, ...(stored.music || {}) },
      updatedAt: stored.updatedAt || "",
    };
  }

  return {
    minigameLevels: MINIGAME_LEVELS,
    musicTracks: MUSIC_TRACKS,
    clampLevel,
    minigameProgress,
    minigameTarget,
    isMinigameLevelUnlocked,
    recordMinigameProgress,
    techniqueSlotsForLevel,
    nextTechniqueLevel,
    xpForNextLevel,
    progressionSnapshot,
    applyApprovedXp,
    validateAttributeAllocation,
    inspectBaseAllocation,
    attributeRedistributionEligibility,
    validateBaseRedistribution,
    affinityGuide,
    enrichAffinities,
    musicTrack,
    themePackage,
  };
}));
