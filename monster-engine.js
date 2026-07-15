(function extendMillenniumMonsterEngine364(global) {
  "use strict";

  const base = global.MILLENNIUM_MONSTERS_364;
  if (!base) throw new Error("monster-system.js precisa carregar antes de monster-engine.js");

  const clone = (value) => {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const slug = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const title = (value) => String(value || "").split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");

  const enhancedSpecies = Object.freeze(base.species.map((entry) => Object.freeze({
    ...entry,
    assets: Object.freeze({ status: "ready-block-b", ...assetBundleForSpecies(entry.speciesId) }),
    implementationStatus: Object.freeze({ catalog: "ready", adapter: "ready", pixelArt: "ready-block-b", abilities: "ready-block-b", passives: "ready-block-b" }),
  })));
  const enhancedSpeciesById = new Map(enhancedSpecies.map((entry) => [entry.speciesId, entry]));
  function speciesForId(speciesId) { return enhancedSpeciesById.get(String(speciesId || "")) || null; }

  const RARITY_ORDER = Object.freeze(["Quebrado", "Comum", "Incomum", "Épico", "Lendário", "Mítico", "Cósmico", "Celestial", "Secret"]);
  const RARITY_XP = Object.freeze({ Quebrado: 0.85, Comum: 1, Incomum: 1.08, "Épico": 1.18, "Lendário": 1.32, "Mítico": 1.48, "Cósmico": 1.66, Celestial: 1.88, Secret: 2.12 });
  const RARITY_POWER = Object.freeze({ Quebrado: 0.9, Comum: 1, Incomum: 1.06, "Épico": 1.13, "Lendário": 1.21, "Mítico": 1.3, "Cósmico": 1.4, Celestial: 1.52, Secret: 1.66 });
  const CONDITION_MODIFIERS = Object.freeze({ healthy: 1, rested: 1.03, inspired: 1.04, tired: 0.94, injured: 0.86, grave: 0.7, lost: 0.5, dead: 0 });
  const EQUIPMENT_SLOTS = Object.freeze(["weapon", "armor", "accessory", "rune"]);

  const itemCatalog = Object.freeze([
    { itemId: "blade-ember", name: "Lâmina de Brasa", category: "equipment", slot: "weapon", rarity: "Comum", image: "assets/monster-items/blade-ember.webp", effects: [{ type: "stat_flat", stat: "attack", value: 12 }, { type: "element_percent", element: "Fogo", stat: "power", value: 0.06 }] },
    { itemId: "shell-iron", name: "Casco de Ferro", category: "equipment", slot: "armor", rarity: "Comum", image: "assets/monster-items/shell-iron.webp", effects: [{ type: "stat_flat", stat: "defense", value: 14 }, { type: "stat_flat", stat: "hp", value: 40 }] },
    { itemId: "amulet-mist", name: "Amuleto da Bruma", category: "equipment", slot: "accessory", rarity: "Incomum", image: "assets/monster-items/amulet-mist.webp", effects: [{ type: "stat_percent", stat: "speed", value: 0.08 }, { type: "stat_flat", stat: "control", value: 8 }] },
    { itemId: "rune-focus", name: "Runa de Foco", category: "equipment", slot: "rune", rarity: "Incomum", image: "assets/monster-items/rune-focus.webp", effects: [{ type: "stat_percent", stat: "power", value: 0.1 }, { type: "mode_stat_percent", mode: "boss", stat: "attack", value: 0.05 }] },
    { itemId: "fang-eclipse", name: "Presa do Eclipse", category: "equipment", slot: "weapon", rarity: "Épico", image: "assets/monster-items/fang-eclipse.webp", effects: [{ type: "stat_flat", stat: "attack", value: 24 }, { type: "stat_percent", stat: "speed", value: 0.06 }] },
    { itemId: "ward-verdant", name: "Guarda Verdejante", category: "equipment", slot: "armor", rarity: "Épico", image: "assets/monster-items/ward-verdant.webp", effects: [{ type: "stat_flat", stat: "defense", value: 22 }, { type: "stat_percent", stat: "hp", value: 0.1 }] },
    { itemId: "bell-echo", name: "Sino do Eco", category: "equipment", slot: "accessory", rarity: "Lendário", image: "assets/monster-items/bell-echo.webp", effects: [{ type: "stat_flat", stat: "control", value: 20 }, { type: "stat_percent", stat: "power", value: 0.08 }] },
    { itemId: "seal-quickening", name: "Selo da Celeridade", category: "equipment", slot: "rune", rarity: "Lendário", image: "assets/monster-items/seal-quickening.webp", effects: [{ type: "stat_percent", stat: "speed", value: 0.14 }, { type: "mode_stat_percent", mode: "arena", stat: "attack", value: 0.06 }] },
    { itemId: "xp-book-minor", name: "Livro Menor de XP", category: "book", rarity: "Quebrado", image: "assets/monster-items/xp-book-minor.webp", xp: 120 },
    { itemId: "xp-book-common", name: "Livro Comum de XP", category: "book", rarity: "Comum", image: "assets/monster-items/xp-book-common.webp", xp: 480 },
    { itemId: "xp-book-advanced", name: "Livro Avançado de XP", category: "book", rarity: "Incomum", image: "assets/monster-items/xp-book-advanced.webp", xp: 1500 },
    { itemId: "xp-book-superior", name: "Livro Superior de XP", category: "book", rarity: "Épico", image: "assets/monster-items/xp-book-superior.webp", xp: 4600 },
    { itemId: "xp-book-ancestral", name: "Tomo Ancestral", category: "book", rarity: "Lendário", image: "assets/monster-items/xp-book-ancestral.webp", xp: 14000 },
    { itemId: "ration-essence", name: "Ração de Essência", category: "food", rarity: "Comum", image: "assets/monster-items/ration-essence.webp", energy: 24, bond: 5 },
    ...RARITY_ORDER.map((rarity) => ({ itemId: `core-${slug(rarity)}`, name: `Núcleo ${rarity}`, category: "core", rarity, image: `assets/monster-items/core-${slug(rarity)}.webp` })),
  ].map((entry, index) => ({ ...entry, image: `assets/mundo-vivo-370/items/item-${String(index + 1).padStart(2, "0")}.webp` })));
  const itemByIdMap = new Map(itemCatalog.map((item) => [item.itemId, item]));


  function normalizeMonsterInstance(input = {}, options = {}) {
    const normalized = base.normalizeMonsterInstance(input, options);
    const unlockedAbilities = Array.isArray(input.unlockedAbilities) && input.unlockedAbilities.length
      ? clone(input.unlockedAbilities)
      : abilitiesForSpecies(normalized.speciesId).filter((entry) => entry.unlockStar <= normalized.stars).map((entry) => entry.abilityId);
    const learnedPassives = Array.isArray(input.learnedPassives) && input.learnedPassives.length
      ? clone(input.learnedPassives)
      : passivesForSpecies(normalized.speciesId).filter((entry) => entry.unlockStar <= normalized.stars).map((entry) => entry.passiveId);
    return {
      ...normalized,
      requiredXp: Math.max(1, Number(input.requiredXp || requiredXpForLevel(normalized.level, normalized.rarity)) || 1),
      shinyUnlocked: Boolean(input.shinyUnlocked || input.shiny || input.radiant || normalized.shiny),
      unlockedAbilities,
      learnedPassives,
      equippedAbilityIds: Array.isArray(input.equippedAbilityIds) && input.equippedAbilityIds.length ? clone(input.equippedAbilityIds) : clone(unlockedAbilities.slice(0, 3)),
      activePassiveIds: Array.isArray(input.activePassiveIds) && input.activePassiveIds.length ? clone(input.activePassiveIds) : clone(learnedPassives),
      bankedXp: Math.max(0, Number(input.bankedXp || 0) || 0),
      lastCareAt: String(input.lastCareAt || ""),
    };
  }

  function rarityIndex(rarity) {
    const normalized = base.normalizeRarity(rarity);
    return Math.max(0, RARITY_ORDER.indexOf(normalized));
  }

  function requiredXpForLevel(level, rarity = "Comum") {
    const safeLevel = Math.max(1, Math.floor(Number(level) || 1));
    const raw = 72 + Math.pow(safeLevel, 1.58) * 12.5;
    return Math.max(100, Math.round(raw * (RARITY_XP[base.normalizeRarity(rarity)] || 1)));
  }

  function assetBundleForSpecies(speciesId) {
    const id = String(speciesId || "rato-brasa");
    const speciesIndex = Math.max(0, base.species.findIndex((entry) => entry.speciesId === id));
    const sprite = `assets/mundo-vivo-370/monsters/monster-${String(speciesIndex + 1).padStart(2, "0")}.webp`;
    return Object.freeze({
      thumbnail: sprite, portrait: sprite, idle: sprite,
      battleAtlas: sprite, battleAtlasMeta: "",
      towerSprite: sprite, metadata: "",
    });
  }

  function itemById(itemId) {
    return itemByIdMap.get(String(itemId || "")) || null;
  }

  function createItemInstance(itemId, options = {}) {
    const definition = itemById(itemId);
    if (!definition) throw new Error(`Item de monstro desconhecido: ${itemId}`);
    const seed = String(options.seed || `${itemId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    return {
      instanceId: String(options.instanceId || `mi-${slug(itemId)}-${seed.replace(/[^a-z0-9]/gi, "").slice(-10)}`),
      itemId: definition.itemId,
      quantity: Math.max(1, Math.floor(Number(options.quantity) || 1)),
      acquiredAt: options.acquiredAt || new Date().toISOString(),
      source: options.source || "Sistema de Monstros",
      schemaVersion: 1,
    };
  }

  function createNativeInstance(speciesId, options = {}) {
    const definition = base.speciesForId(speciesId);
    if (!definition) throw new Error(`Espécie desconhecida: ${speciesId}`);
    const stars = clamp(options.stars || 1, 1, 7);
    const level = clamp(options.level || 1, 1, base.levelCapForStars(stars));
    const abilityIds = abilitiesForSpecies(definition.speciesId).filter((ability) => ability.unlockStar <= stars).map((ability) => ability.abilityId);
    const passiveIds = passivesForSpecies(definition.speciesId).filter((passive) => passive.unlockStar <= stars).map((passive) => passive.passiveId);
    return normalizeMonsterInstance({
      instanceId: options.instanceId || `monster-${definition.speciesId}-${String(options.seed || Math.random().toString(36).slice(2, 9))}`,
      speciesId: definition.speciesId,
      customName: options.customName || "",
      level,
      currentXp: Math.max(0, Number(options.currentXp) || 0),
      requiredXp: requiredXpForLevel(level, definition.rarity),
      stars,
      shiny: Boolean(options.shiny),
      shinyUnlocked: Boolean(options.shinyUnlocked || options.shiny),
      equipment: clone(options.equipment || []),
      unlockedAbilities: abilityIds,
      equippedAbilityIds: clone(options.equippedAbilityIds || abilityIds.slice(0, 3)),
      learnedPassives: passiveIds,
      bond: clamp(options.bond ?? 10, 0, 100),
      energy: clamp(options.energy ?? 100, 0, 100),
      condition: options.condition || "healthy",
      migrationStatus: "native",
      schemaVersion: 1,
    });
  }

  function effectDescription(effect = {}) {
    const pct = (value) => `${Math.round(Number(value || 0) * 100)}%`;
    if (effect.type === "damage") return `causa ${Math.round(effect.power || 0)}% de dano`;
    if (effect.type === "heal") return `restaura ${pct(effect.value)} da vida`;
    if (effect.type === "shield") return `concede escudo de ${pct(effect.value)} da vida máxima`;
    if (effect.type === "stat_percent") return `${effect.value >= 0 ? "+" : ""}${pct(effect.value)} em ${title(effect.stat)}`;
    if (effect.type === "stat_flat") return `${effect.value >= 0 ? "+" : ""}${effect.value} em ${title(effect.stat)}`;
    if (effect.type === "status") return `${Math.round((effect.chance ?? 1) * 100)}% de aplicar ${title(effect.status)} por ${effect.duration || 1} turno(s)`;
    if (effect.type === "mode_stat_percent") return `${pct(effect.value)} em ${title(effect.stat)} no modo ${title(effect.mode)}`;
    if (effect.type === "energy") return `${effect.value >= 0 ? "+" : ""}${effect.value} de energia`;
    return title(effect.type || "efeito");
  }

  function roleProfile(role = "") {
    const key = slug(role);
    if (/suporte|protecao/.test(key)) return { target: "ally_lowest_hp", basePower: 78, effect: { type: "heal", value: 0.18 } };
    if (/defesa/.test(key)) return { target: "self", basePower: 72, effect: { type: "shield", value: 0.22 } };
    if (/controle|debuff/.test(key)) return { target: "enemy", basePower: 92, effect: { type: "status", status: "weakened", chance: 0.45, duration: 2 } };
    if (/utilidade/.test(key)) return { target: "team", basePower: 84, effect: { type: "stat_percent", stat: "speed", value: 0.08, duration: 2 } };
    return { target: "enemy", basePower: 108, effect: { type: "damage", power: 108 } };
  }

  function buildAbilityRegistry() {
    const registry = {};
    base.species.forEach((species) => {
      const profile = roleProfile(species.role);
      const primaryId = species.abilityIds?.[0] || `${species.speciesId}-ataque`;
      registry[primaryId] = {
        abilityId: primaryId, speciesId: species.speciesId, name: title(primaryId), type: "active", unlockStar: 1,
        target: profile.target, element: species.element, power: profile.basePower + rarityIndex(species.rarity) * 7,
        energyCost: 20, cooldown: 0, effects: [profile.effect],
      };
      registry[`${species.speciesId}-tecnica-ii`] = {
        abilityId: `${species.speciesId}-tecnica-ii`, speciesId: species.speciesId, name: `Técnica de ${species.name}`, type: "active", unlockStar: 2,
        target: profile.target, element: species.element, power: profile.basePower + 42 + rarityIndex(species.rarity) * 8,
        energyCost: 34, cooldown: 1, effects: [profile.effect, { type: "stat_percent", stat: /defesa|protecao/.test(slug(species.role)) ? "defense" : "attack", value: 0.08, duration: 2 }],
      };
      registry[`${species.speciesId}-tecnica-iii`] = {
        abilityId: `${species.speciesId}-tecnica-iii`, speciesId: species.speciesId, name: `Manifestação de ${species.element}`, type: "active", unlockStar: 4,
        target: /suporte|defesa|protecao/.test(slug(species.role)) ? "team" : "all_enemies", element: species.element,
        power: profile.basePower + 72 + rarityIndex(species.rarity) * 9, energyCost: 48, cooldown: 2,
        effects: [{ ...profile.effect, value: Number(profile.effect.value || 0) * 1.35 || undefined, power: Number(profile.effect.power || 0) * 1.35 || undefined }],
      };
      registry[`${species.speciesId}-suprema`] = {
        abilityId: `${species.speciesId}-suprema`, speciesId: species.speciesId, name: `Suprema — ${species.name}`, type: "ultimate", unlockStar: 7,
        target: /suporte|defesa|protecao/.test(slug(species.role)) ? "team" : "all_enemies", element: species.element,
        power: 245 + rarityIndex(species.rarity) * 14, energyCost: 100, cooldown: 4,
        effects: [{ type: "damage", power: 245 + rarityIndex(species.rarity) * 14 }, { type: "status", status: "marked", chance: 0.65, duration: 2 }],
      };
    });
    return Object.freeze(registry);
  }

  function buildPassiveRegistry() {
    const registry = {};
    base.species.forEach((species) => {
      const primaryId = species.passiveIds?.[0] || `${species.speciesId}-instinto`;
      const role = slug(species.role);
      const stat = /defesa|protecao/.test(role) ? "defense" : /suporte|controle|debuff/.test(role) ? "power" : /assassino|cacador|alcance/.test(role) ? "speed" : "attack";
      registry[primaryId] = { passiveId: primaryId, speciesId: species.speciesId, name: title(primaryId), unlockStar: 1, trigger: "permanent", effects: [{ type: "stat_percent", stat, value: 0.05 + rarityIndex(species.rarity) * 0.005 }] };
      registry[`${species.speciesId}-passiva-elevada`] = { passiveId: `${species.speciesId}-passiva-elevada`, speciesId: species.speciesId, name: "Instinto Elevado", unlockStar: 3, trigger: "below_hp", condition: { stat: "hp", operator: "<=", value: 0.4 }, oncePerBattle: true, effects: [{ type: "shield", value: 0.16 }, { type: "stat_percent", stat: "attack", value: 0.08, duration: 2 }] };
      registry[`${species.speciesId}-especializacao`] = { passiveId: `${species.speciesId}-especializacao`, speciesId: species.speciesId, name: "Especialização do Vínculo", unlockStar: 6, trigger: "battle_start", effects: [{ type: "mode_stat_percent", mode: /suporte|defesa/.test(role) ? "boss" : "arena", stat, value: 0.1 }] };
    });
    return Object.freeze(registry);
  }

  const abilityRegistry = buildAbilityRegistry();
  const passiveRegistry = buildPassiveRegistry();

  function abilitiesForSpecies(speciesId) {
    return Object.values(abilityRegistry).filter((entry) => entry.speciesId === speciesId).sort((a, b) => a.unlockStar - b.unlockStar);
  }
  function passivesForSpecies(speciesId) {
    return Object.values(passiveRegistry).filter((entry) => entry.speciesId === speciesId).sort((a, b) => a.unlockStar - b.unlockStar);
  }
  function abilityDescription(ability) {
    const effectText = (ability.effects || []).map(effectDescription).join("; ");
    return `${ability.name}: ${effectText}. Custo ${ability.energyCost || 0} de energia${ability.cooldown ? `, recarga ${ability.cooldown}` : ""}.`;
  }
  function passiveDescription(passive) {
    return `${passive.name}: ${(passive.effects || []).map(effectDescription).join("; ")}.`;
  }

  function normalizeEquipmentInput(instance, inventory = []) {
    const byInstance = new Map((inventory || []).map((entry) => [entry.instanceId, entry]));
    return (instance.equipment || []).map((equip) => {
      const inventoryEntry = byInstance.get(equip.itemInstanceId || equip.instanceId) || equip;
      const definition = itemById(equip.itemId || inventoryEntry.itemId);
      return definition ? { ...inventoryEntry, ...equip, definition } : null;
    }).filter(Boolean);
  }

  function applyStatEffect(stats, effect, definition, mode = "general") {
    const stat = effect.stat;
    if (!(stat in stats)) return;
    if (effect.type === "stat_flat") stats[stat] += Number(effect.value || 0);
    if (effect.type === "stat_percent") stats[stat] *= 1 + Number(effect.value || 0);
    if (effect.type === "element_percent" && definition.element === effect.element) stats[stat] *= 1 + Number(effect.value || 0);
    if (effect.type === "mode_stat_percent" && (effect.mode === mode || effect.mode === "all")) stats[stat] *= 1 + Number(effect.value || 0);
  }

  function calculateMonsterStats(monsterInput, monsterInventory = [], modeModifiers = {}) {
    const monster = normalizeMonsterInstance(monsterInput);
    const definition = base.speciesForId(monster.speciesId) || base.species[0];
    const level = clamp(monster.level, 1, base.levelCapForStars(monster.stars));
    const stars = clamp(monster.stars, 1, 7);
    const rarityPower = RARITY_POWER[definition.rarity] || 1;
    const starPower = 1 + (stars - 1) * 0.075;
    const bondPower = 1 + clamp(monster.bond, 0, 100) * 0.0005;
    const conditionPower = CONDITION_MODIFIERS[monster.condition] ?? 1;
    const stats = {};
    Object.entries(definition.baseAttributes || {}).forEach(([stat, value]) => {
      const growth = Number(definition.growth?.[stat] || 0);
      stats[stat] = (Number(value || 0) + growth * (level - 1)) * rarityPower * starPower * bondPower * conditionPower;
    });
    const equipment = normalizeEquipmentInput(monster, monsterInventory);
    equipment.forEach((entry) => (entry.definition.effects || []).forEach((effect) => applyStatEffect(stats, effect, definition, modeModifiers.mode || "general")));
    passivesForSpecies(monster.speciesId).filter((passive) => passive.unlockStar <= stars && passive.trigger === "permanent").forEach((passive) => (passive.effects || []).forEach((effect) => applyStatEffect(stats, effect, definition, modeModifiers.mode || "general")));
    Object.entries(modeModifiers.stats || {}).forEach(([stat, modifier]) => { if (stat in stats) stats[stat] *= 1 + Number(modifier || 0); });
    Object.keys(stats).forEach((stat) => { stats[stat] = Math.max(0, Math.round(stats[stat] * 10) / 10); });
    const totalPower = Math.round((stats.hp || 0) * 0.22 + (stats.attack || 0) * 1.7 + (stats.defense || 0) * 1.35 + (stats.speed || 0) * 1.1 + (stats.power || 0) * 1.45 + (stats.control || 0) * 1.05);
    return { monster, definition, stats, totalPower, equipment, modifiers: { rarityPower, starPower, bondPower, conditionPower, mode: modeModifiers.mode || "general" } };
  }

  function applyXp(monsterInput, xpAmount) {
    const monster = normalizeMonsterInstance(monsterInput);
    const definition = base.speciesForId(monster.speciesId) || base.species[0];
    const cap = base.levelCapForStars(monster.stars);
    let level = clamp(monster.level, 1, cap);
    let currentXp = Math.max(0, Number(monster.currentXp) || 0);
    let remaining = Math.max(0, Math.floor(Number(xpAmount) || 0));
    let levelsGained = 0;
    if (level >= cap) return { monster: { ...monster, requiredXp: requiredXpForLevel(level, definition.rarity) }, appliedXp: 0, overflowXp: remaining, levelsGained: 0, blocked: true, reason: "level-cap" };
    while (remaining > 0 && level < cap) {
      const required = requiredXpForLevel(level, definition.rarity);
      const needed = Math.max(1, required - currentXp);
      const spent = Math.min(remaining, needed);
      currentXp += spent;
      remaining -= spent;
      if (currentXp >= required) { level += 1; levelsGained += 1; currentXp = 0; }
    }
    const atCap = level >= cap;
    const next = { ...monster, level, currentXp: atCap ? 0 : currentXp, requiredXp: requiredXpForLevel(level, definition.rarity), unlockedAbilities: abilitiesForSpecies(monster.speciesId).filter((entry) => entry.unlockStar <= monster.stars).map((entry) => entry.abilityId), learnedPassives: passivesForSpecies(monster.speciesId).filter((entry) => entry.unlockStar <= monster.stars).map((entry) => entry.passiveId) };
    return { monster: next, appliedXp: Math.max(0, Math.floor(Number(xpAmount) || 0) - remaining), overflowXp: remaining, levelsGained, blocked: false, reachedCap: atCap };
  }

  function ascensionRequirements(monsterInput) {
    const monster = normalizeMonsterInstance(monsterInput);
    const definition = base.speciesForId(monster.speciesId) || base.species[0];
    const currentStars = clamp(monster.stars, 1, 7);
    if (currentStars >= 7) return { maxed: true, levelRequired: base.levelCapForStars(7), coreId: "", coreCount: 0, fragments: 0, materialId: "", materialCount: 0, gold: 0 };
    const rarity = definition.rarity;
    const rIndex = rarityIndex(rarity);
    return {
      maxed: false,
      nextStars: currentStars + 1,
      levelRequired: base.levelCapForStars(currentStars),
      coreId: `core-${slug(rarity)}`,
      coreCount: 1 + Math.floor((currentStars - 1) / 2),
      fragments: 12 + currentStars * 8 + rIndex * 4,
      materialId: currentStars >= 4 ? "essence-ascendant" : "essence-awakening",
      materialCount: 2 + currentStars * 2 + Math.floor(rIndex / 2),
      gold: 80 + currentStars * currentStars * 45 + rIndex * 35,
    };
  }

  function resourceCount(resources = {}, kind, id) {
    if (kind === "core") return Number(resources.cores?.[id] || 0);
    if (kind === "fragment") return Number(resources.fragments?.[id] || 0);
    return Number(resources.materials?.[id] || 0);
  }

  function canAscend(monsterInput, resources = {}, gold = 0) {
    const monster = normalizeMonsterInstance(monsterInput);
    const req = ascensionRequirements(monster);
    if (req.maxed) return { ok: false, reason: "max-stars", requirements: req };
    if (monster.level < req.levelRequired) return { ok: false, reason: "level", requirements: req };
    if (resourceCount(resources, "core", req.coreId) < req.coreCount) return { ok: false, reason: "core", requirements: req };
    if (resourceCount(resources, "fragment", monster.speciesId) < req.fragments) return { ok: false, reason: "fragments", requirements: req };
    if (resourceCount(resources, "material", req.materialId) < req.materialCount) return { ok: false, reason: "material", requirements: req };
    if (Number(gold || 0) < req.gold) return { ok: false, reason: "gold", requirements: req };
    return { ok: true, reason: "ready", requirements: req };
  }

  function ascendMonster(monsterInput, resourcesInput = {}, gold = 0) {
    const monster = normalizeMonsterInstance(monsterInput);
    const check = canAscend(monster, resourcesInput, gold);
    if (!check.ok) return { ok: false, ...check, monster, resources: clone(resourcesInput), gold: Number(gold || 0) };
    const req = check.requirements;
    const resources = clone(resourcesInput || {});
    resources.cores = { ...(resources.cores || {}), [req.coreId]: resourceCount(resources, "core", req.coreId) - req.coreCount };
    resources.fragments = { ...(resources.fragments || {}), [monster.speciesId]: resourceCount(resources, "fragment", monster.speciesId) - req.fragments };
    resources.materials = { ...(resources.materials || {}), [req.materialId]: resourceCount(resources, "material", req.materialId) - req.materialCount };
    const stars = monster.stars + 1;
    const unlockedAbilities = abilitiesForSpecies(monster.speciesId).filter((entry) => entry.unlockStar <= stars).map((entry) => entry.abilityId);
    const learnedPassives = passivesForSpecies(monster.speciesId).filter((entry) => entry.unlockStar <= stars).map((entry) => entry.passiveId);
    return { ok: true, requirements: req, resources, gold: Number(gold || 0) - req.gold, monster: { ...monster, stars, requiredXp: requiredXpForLevel(monster.level, base.speciesForId(monster.speciesId)?.rarity), unlockedAbilities, learnedPassives, equippedAbilityIds: [...new Set([...(monster.equippedAbilityIds || []), ...unlockedAbilities])].slice(0, 3) } };
  }

  function applyCareAction(monsterInput, action) {
    const monster = normalizeMonsterInstance(monsterInput);
    const next = { ...monster };
    const result = { action, consumedItemId: "", xp: 0, message: "" };
    if (action === "rest") { next.energy = clamp(next.energy + 28, 0, 100); next.condition = next.condition === "injured" ? "tired" : "rested"; result.message = "O monstro descansou e recuperou energia."; }
    else if (action === "interact") { next.bond = clamp(next.bond + 7, 0, 100); result.message = "O vínculo respondeu à interação."; }
    else if (action === "feed") { next.energy = clamp(next.energy + 24, 0, 100); next.bond = clamp(next.bond + 5, 0, 100); next.condition = "healthy"; result.consumedItemId = "ration-essence"; result.message = "A Ração de Essência restaurou o monstro."; }
    else if (action === "train") {
      if (next.energy < 15) return { ok: false, monster, reason: "energy", message: "Energia insuficiente para treinar." };
      next.energy = clamp(next.energy - 15, 0, 100); next.bond = clamp(next.bond + 2, 0, 100);
      next.nextBookXpBonus = clamp(Number(next.nextBookXpBonus || 0) + 0.05, 0, 0.25);
      next.lastTrainingAt = new Date().toISOString();
      result.xp = 0;
      result.message = `Treino concluído: o próximo Livro de XP recebeu +${Math.round(next.nextBookXpBonus * 100)}% de eficiência.`;
    } else return { ok: false, monster, reason: "unknown-action", message: "Ação de cuidado desconhecida." };
    return { ok: true, monster: next, ...result };
  }

  function starterInventory() {
    return [
      createItemInstance("blade-ember", { instanceId: "demo-eq-blade", source: "Kit inicial" }),
      createItemInstance("shell-iron", { instanceId: "demo-eq-shell", source: "Kit inicial" }),
      createItemInstance("amulet-mist", { instanceId: "demo-eq-amulet", source: "Kit inicial" }),
      createItemInstance("rune-focus", { instanceId: "demo-eq-rune", source: "Kit inicial" }),
      createItemInstance("xp-book-minor", { instanceId: "demo-book-minor", quantity: 5, source: "Kit inicial" }),
      createItemInstance("xp-book-common", { instanceId: "demo-book-common", quantity: 3, source: "Kit inicial" }),
      createItemInstance("ration-essence", { instanceId: "demo-food", quantity: 4, source: "Kit inicial" }),
    ];
  }

  function starterResources(speciesIds = []) {
    return {
      cores: Object.fromEntries(RARITY_ORDER.map((rarity) => [`core-${slug(rarity)}`, rarity === "Comum" || rarity === "Incomum" ? 3 : 1])),
      fragments: Object.fromEntries(speciesIds.map((id) => [id, 80])),
      materials: { "essence-awakening": 30, "essence-ascendant": 12 },
    };
  }

  const api = Object.freeze({
    ...base,
    species: enhancedSpecies,
    speciesForId,
    normalizeMonsterInstance,
    engineVersion: 1,
    rarityOrder: RARITY_ORDER,
    equipmentSlots: EQUIPMENT_SLOTS,
    conditionModifiers: CONDITION_MODIFIERS,
    itemCatalog,
    itemById,
    createItemInstance,
    createNativeInstance,
    assetBundleForSpecies,
    abilityRegistry,
    passiveRegistry,
    abilitiesForSpecies,
    passivesForSpecies,
    abilityDescription,
    passiveDescription,
    effectDescription,
    requiredXpForLevel,
    calculateMonsterStats,
    applyXp,
    ascensionRequirements,
    canAscend,
    ascendMonster,
    applyCareAction,
    starterInventory,
    starterResources,
    slug,
  });

  global.MILLENNIUM_MONSTERS_364 = api;
})(window);
