(function exposeMillenniumEchoes(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.MILLENNIUM_ECHOES_33 = Object.freeze(api);
}(typeof globalThis !== "undefined" ? globalThis : window, function millenniumEchoesFactory() {
  "use strict";

  const THEMES = [
    ["awakening", "Despertar", "Dourado, preto e luz ritual", "#d8b45d", "#17120d", "#f0d58a", "#b44a45", "#6f9b73", "assets/first-awakening-portal.webp", "runes"],
    ["eclipse", "Eclipse", "Vermelho escuro, preto e cinzas", "#8f3038", "#151216", "#c68a72", "#d2555d", "#76937c", "assets/maps/reino-do-pecado-partido.webp", "mist"],
    ["abyss", "Abismo", "Azul profundo, roxo e vazio", "#4c5f9e", "#100f1c", "#9b83cf", "#b14e70", "#688f8a", "assets/maps/mar-de-vidro-negro.webp", "void"],
    ["living-forest", "Floresta Viva", "Verde musgo, madeira e névoa", "#58765b", "#151a16", "#a39165", "#a44f48", "#78a274", "assets/maps/floresta-viva.webp", "leaves"],
    ["ancient-blood", "Sangue Antigo", "Carmesim, ferro e pergaminho", "#933d43", "#1c1515", "#b8946d", "#ca5d5d", "#738d70", "assets/maps/sociedade-das-laminas.webp", "embers"],
    ["constellation", "Constelação", "Azul noturno, prata e estrelas", "#536c9f", "#111522", "#b7c4dc", "#bf5969", "#6f9a91", "assets/maps/noctheryn.webp", "stars"],
    ["hollow-winter", "Inverno Oco", "Branco gasto, azul-gelo e ruínas", "#7e9da5", "#151a1d", "#c8d5d5", "#ae5960", "#71988e", "assets/maps/cordilheira-dente-branco.webp", "snow"],
    ["rust", "Ferrugem", "Cobre, carvão e máquinas", "#9b5f3e", "#191513", "#c18b62", "#b94f43", "#758d6c", "assets/maps/arena-das-sete-esferas.webp", "sparks"],
    ["broken-sin", "Pecado Partido", "Vinho, preto e vidro", "#733646", "#160f15", "#aa7085", "#c64f59", "#728c79", "assets/maps/reino-do-pecado-partido.webp", "glass"],
    ["spirit-veil", "Véu Espiritual", "Azul pálido, fumaça e símbolos", "#718fa2", "#11171b", "#b6ccd1", "#bd5c68", "#6f9b90", "assets/maps/cruzamento-das-cortinas.webp", "spirits"],
  ].map(([id, name, description, primary, secondary, accent, danger, success, background, menuEffect]) => ({
    id,
    name,
    description,
    palette: { primary, secondary, accent, danger, success },
    background,
    loginArt: background,
    cardTexture: "stone",
    buttonStyle: "solid",
    icons: "runes",
    music: { main: id, codex: "whispers", gacha: "summoning", rarity: "ritual" },
    animation: "normal",
    menuEffect,
    homeHighlight: "season",
  }));

  function themeById(id) {
    return THEMES.find((theme) => theme.id === id) || THEMES[1];
  }

  function resolvedTheme(settings = {}) {
    const base = themeById(settings.seasonTheme || "eclipse");
    const custom = (key, fallback) => String(settings[key] || "").trim() || fallback;
    return {
      ...base,
      description: custom("seasonThemeDescription", base.description),
      palette: {
        primary: custom("seasonThemePrimary", base.palette.primary),
        secondary: custom("seasonThemeSecondary", base.palette.secondary),
        accent: custom("seasonThemeAccent", base.palette.accent),
        danger: custom("seasonThemeDanger", base.palette.danger),
        success: custom("seasonThemeSuccess", base.palette.success),
      },
      background: custom("seasonThemeBackground", base.background),
      loginArt: custom("seasonThemeLoginArt", base.loginArt),
      cardTexture: custom("seasonThemeCardTexture", base.cardTexture),
      buttonStyle: custom("seasonThemeButtonStyle", base.buttonStyle),
      icons: custom("seasonThemeIcons", base.icons),
      animation: custom("seasonThemeAnimation", base.animation),
      menuEffect: custom("seasonThemeMenuEffect", base.menuEffect),
      homeHighlight: custom("seasonThemeHomeHighlight", base.homeHighlight),
      music: {
        main: custom("seasonThemeMainMusic", base.music.main),
        codex: custom("seasonThemeCodexMusic", base.music.codex),
        gacha: custom("seasonThemeGachaMusic", base.music.gacha),
        rarity: custom("seasonThemeRaritySounds", base.music.rarity),
      },
    };
  }

  function hashSeed(seed) {
    let hash = 2166136261;
    for (const char of String(seed || "millennium")) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function randomFromSeed(seed) {
    let value = hashSeed(seed) || 1;
    return () => {
      value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function cartographyMove(board = [], index = -1) {
    const next = [...board];
    const empty = next.indexOf(0);
    const size = Math.sqrt(next.length);
    if (!Number.isInteger(size) || index < 0 || index >= next.length || empty < 0) return next;
    const adjacent = Math.abs(Math.floor(index / size) - Math.floor(empty / size)) + Math.abs((index % size) - (empty % size)) === 1;
    if (!adjacent) return next;
    [next[index], next[empty]] = [next[empty], next[index]];
    return next;
  }

  function cartographyBoard(seed = "map", size = 3) {
    const count = Math.max(3, Math.min(4, Number(size) || 3));
    let board = [...Array(count * count - 1)].map((_, index) => index + 1).concat(0);
    const random = randomFromSeed(seed);
    let empty = board.length - 1;
    for (let step = 0; step < count * count * 14; step += 1) {
      const row = Math.floor(empty / count);
      const col = empty % count;
      const candidates = [row > 0 ? empty - count : -1, row < count - 1 ? empty + count : -1, col > 0 ? empty - 1 : -1, col < count - 1 ? empty + 1 : -1].filter((index) => index >= 0);
      const chosen = candidates[Math.floor(random() * candidates.length)];
      board = cartographyMove(board, chosen);
      empty = chosen;
    }
    return board;
  }

  function cartographySolved(board = []) {
    return board.every((value, index) => value === (index === board.length - 1 ? 0 : index + 1));
  }

  const INGREDIENTS = [
    { id: "ember", name: "Cinza Rubra", heat: 4, essence: 1, toxicity: 1, stability: 2 },
    { id: "dew", name: "Orvalho Lunar", heat: 0, essence: 4, toxicity: 0, stability: 4 },
    { id: "moss", name: "Musgo de Ossos", heat: 1, essence: 2, toxicity: 2, stability: 3 },
    { id: "glass", name: "Pó de Vidro Negro", heat: 2, essence: 3, toxicity: 3, stability: 1 },
  ];

  function alchemyChallenge(seed = "alchemy") {
    const random = randomFromSeed(seed);
    const recipe = [...INGREDIENTS].sort(() => random() - 0.5).map((ingredient) => ingredient.id);
    const byId = Object.fromEntries(INGREDIENTS.map((ingredient) => [ingredient.id, ingredient]));
    return {
      ingredients: INGREDIENTS.map((ingredient) => ({ ...ingredient })),
      recipe,
      clues: [
        `Comece por ${byId[recipe[0]].name}, a base que estabiliza a mistura.`,
        `${byId[recipe[1]].name} deve vir antes de ${byId[recipe[2]].name}.`,
        `Finalize com ${byId[recipe[3]].name}; antecipá-lo rompe o recipiente.`,
      ],
    };
  }

  function evaluateAlchemy(selection = [], recipe = []) {
    const total = recipe.length;
    const correct = recipe.reduce((sum, ingredient, index) => sum + (selection[index] === ingredient ? 1 : 0), 0);
    const passed = total > 0 && correct === total;
    return { correct, total, passed, score: total ? Math.round((correct / total) * 10000) : 0 };
  }

  return { themes: THEMES, themeById, resolvedTheme, cartographyBoard, cartographyMove, cartographySolved, alchemyChallenge, evaluateAlchemy };
}));
