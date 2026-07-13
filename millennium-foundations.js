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
    affinityGuide,
    enrichAffinities,
    musicTrack,
    themePackage,
  };
}));
