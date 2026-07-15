(function extendMillenniumMonsterEconomy364(global) {
  "use strict";

  const base = global.MILLENNIUM_MONSTERS_364;
  if (!base?.engineVersion) throw new Error("monster-engine.js precisa carregar antes de monster-economy.js");

  const clone = (value) => {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  };
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const nowIso = () => new Date().toISOString();

  const INVOCATION_CATEGORY_RATES = Object.freeze([
    Object.freeze({ id: "monster", label: "Monstro", weight: 25, percentage: 25 }),
    Object.freeze({ id: "book", label: "Livros de XP", weight: 30, percentage: 30 }),
    Object.freeze({ id: "equipment", label: "Equipamentos e runas", weight: 18, percentage: 18 }),
    Object.freeze({ id: "progression", label: "Núcleos e materiais", weight: 12, percentage: 12 }),
    Object.freeze({ id: "gold", label: "PO", weight: 8, percentage: 8 }),
    Object.freeze({ id: "coins", label: "MC", weight: 3, percentage: 3 }),
    Object.freeze({ id: "consumable", label: "Consumíveis e energia", weight: 4, percentage: 4 }),
  ]);

  const RARITY_WEIGHTS = Object.freeze({
    Quebrado: 4600,
    Comum: 3100,
    Incomum: 1550,
    "Épico": 560,
    "Lendário": 145,
    "Mítico": 36,
    "Cósmico": 7,
    Celestial: 1.5,
    Secret: 0.5,
  });
  const DUPLICATE_FRAGMENTS = Object.freeze({
    Quebrado: 6,
    Comum: 10,
    Incomum: 16,
    "Épico": 26,
    "Lendário": 42,
    "Mítico": 68,
    "Cósmico": 105,
    Celestial: 165,
    Secret: 260,
  });
  const RARE_MONSTER_RARITIES = new Set(["Épico", "Lendário", "Mítico", "Cósmico", "Celestial", "Secret"]);
  const MONSTER_PITY_MAX = 30;
  const SHINY_CHANCE = 0.015;

  const additionalItems = Object.freeze([
    Object.freeze({ itemId: "claw-storm", name: "Garra da Tempestade", category: "equipment", slot: "weapon", rarity: "Épico", image: "assets/monster-items/claw-storm.webp", origin: ["Invocação dos Monstros", "Arena"], effects: [{ type: "stat_flat", stat: "attack", value: 22 }, { type: "stat_percent", stat: "speed", value: 0.07 }] }),
    Object.freeze({ itemId: "carapace-abyss", name: "Carapaça do Abismo", category: "equipment", slot: "armor", rarity: "Lendário", image: "assets/monster-items/carapace-abyss.webp", origin: ["Invocação dos Monstros", "Masmorra"], effects: [{ type: "stat_flat", stat: "defense", value: 28 }, { type: "stat_percent", stat: "hp", value: 0.12 }] }),
    Object.freeze({ itemId: "eye-prism", name: "Olho Prismático", category: "equipment", slot: "accessory", rarity: "Épico", image: "assets/monster-items/eye-prism.webp", origin: ["Invocação dos Monstros", "Cartografia"], effects: [{ type: "stat_flat", stat: "control", value: 18 }, { type: "stat_percent", stat: "power", value: 0.09 }] }),
    Object.freeze({ itemId: "rune-bastion", name: "Runa do Bastião", category: "equipment", slot: "rune", rarity: "Incomum", image: "assets/monster-items/rune-bastion.webp", origin: ["Invocação dos Monstros", "Tower Defense"], effects: [{ type: "stat_percent", stat: "defense", value: 0.1 }, { type: "mode_stat_percent", mode: "tower", stat: "hp", value: 0.08 }] }),
    Object.freeze({ itemId: "spear-starlight", name: "Presa da Luz Estelar", category: "equipment", slot: "weapon", rarity: "Mítico", image: "assets/monster-items/spear-starlight.webp", origin: ["Invocação dos Monstros", "Boss Mundial"], effects: [{ type: "stat_flat", stat: "attack", value: 38 }, { type: "stat_percent", stat: "power", value: 0.12 }] }),
    Object.freeze({ itemId: "mantle-night", name: "Manto da Noite Viva", category: "equipment", slot: "armor", rarity: "Mítico", image: "assets/monster-items/mantle-night.webp", origin: ["Invocação dos Monstros", "Arena"], effects: [{ type: "stat_percent", stat: "hp", value: 0.16 }, { type: "stat_percent", stat: "speed", value: 0.08 }] }),
    Object.freeze({ itemId: "hourglass-echo", name: "Ampulheta dos Ecos", category: "equipment", slot: "accessory", rarity: "Celestial", image: "assets/monster-items/hourglass-echo.webp", origin: ["Invocação dos Monstros", "Evento"], effects: [{ type: "stat_flat", stat: "control", value: 34 }, { type: "stat_percent", stat: "power", value: 0.16 }] }),
    Object.freeze({ itemId: "seal-worldbreaker", name: "Selo Rompe-Mundos", category: "equipment", slot: "rune", rarity: "Secret", image: "assets/monster-items/seal-worldbreaker.webp", origin: ["Invocação dos Monstros", "Boss Mundial"], effects: [{ type: "stat_percent", stat: "attack", value: 0.18 }, { type: "mode_stat_percent", mode: "boss", stat: "power", value: 0.15 }] }),
    Object.freeze({ itemId: "ration-moon", name: "Ração da Lua Azul", category: "food", rarity: "Incomum", image: "assets/monster-items/ration-moon.webp", origin: ["Invocação dos Monstros", "Alquimia"], energy: 42, bond: 8 }),
  ]);

  const itemCatalog = Object.freeze([...base.itemCatalog, ...additionalItems]);
  const itemMap = new Map(itemCatalog.map((item) => [item.itemId, item]));
  const itemById = (itemId) => itemMap.get(String(itemId || "")) || null;

  const resourceCatalog = Object.freeze([
    Object.freeze({ resourceId: "essence-awakening", name: "Essência do Despertar", rarity: "Comum", image: "assets/monster-items/material-awakening.webp", purpose: "Ascensões iniciais", routes: ["Invocação dos Monstros", "Masmorra"] }),
    Object.freeze({ resourceId: "essence-ascendant", name: "Essência Ascendente", rarity: "Épico", image: "assets/monster-items/material-ascendant.webp", purpose: "Ascensões avançadas", routes: ["Invocação dos Monstros", "Boss Mundial"] }),
    Object.freeze({ resourceId: "essence-defense", name: "Essência da Fortaleza", rarity: "Incomum", image: "assets/monster-items/material-defense.webp", purpose: "Melhorias defensivas", routes: ["Tower Defense", "Invocação dos Monstros"] }),
    Object.freeze({ resourceId: "seal-resonance", name: "Selo de Ressonância", rarity: "Incomum", image: "assets/monster-items/material-seal.webp", purpose: "Passivas e runas", routes: ["Ritual dos Selos", "Invocação dos Monstros"] }),
    Object.freeze({ resourceId: "relic-map", name: "Relíquia Cartográfica", rarity: "Raro", image: "assets/monster-items/material-map.webp", purpose: "Exploração e equipamentos", routes: ["Cartografia", "Masmorra"] }),
    Object.freeze({ resourceId: "alchemy-catalyst", name: "Catalisador Instável", rarity: "Épico", image: "assets/monster-items/material-alchemy.webp", purpose: "Alimentos e mutações", routes: ["Alquimia", "Invocação dos Monstros"] }),
    Object.freeze({ resourceId: "precision-emblem", name: "Emblema de Precisão", rarity: "Raro", image: "assets/monster-items/material-precision.webp", purpose: "Melhorias ofensivas", routes: ["Prova da Mira", "Arena"] }),
    Object.freeze({ resourceId: "boss-core-dust", name: "Pó de Núcleo de Chefe", rarity: "Lendário", image: "assets/monster-items/material-boss.webp", purpose: "Ascensão de raridades altas", routes: ["Boss Mundial", "Masmorra"] }),
  ]);
  const resourceMap = new Map(resourceCatalog.map((entry) => [entry.resourceId, entry]));
  const resourceById = (resourceId) => resourceMap.get(String(resourceId || "")) || null;

  function hashSeed(seed) {
    let h = 2166136261 >>> 0;
    const text = String(seed || "millennium-3.6.4");
    for (let index = 0; index < text.length; index += 1) {
      h ^= text.charCodeAt(index);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function createRng(seed) {
    let state = hashSeed(seed) || 1;
    return function random() {
      state += 0x6D2B79F5;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function weightedPick(entries, random) {
    const usable = entries.filter((entry) => Number(entry.weight || 0) > 0);
    const total = usable.reduce((sum, entry) => sum + Number(entry.weight || 0), 0);
    if (!total) return usable[0] || null;
    let cursor = random() * total;
    for (const entry of usable) {
      cursor -= Number(entry.weight || 0);
      if (cursor <= 0) return entry;
    }
    return usable[usable.length - 1] || null;
  }

  function speciesPool(options = {}) {
    const minimumRare = options.rareOnly === true;
    return base.species.filter((species) => !minimumRare || RARE_MONSTER_RARITIES.has(species.rarity));
  }

  function pickSpecies(random, options = {}) {
    const pool = speciesPool(options);
    const rarityEntries = [...new Set(pool.map((species) => species.rarity))].map((rarity) => ({ rarity, weight: RARITY_WEIGHTS[rarity] || 1 }));
    const pickedRarity = weightedPick(rarityEntries, random)?.rarity || pool[0]?.rarity;
    const candidates = pool.filter((species) => species.rarity === pickedRarity);
    return candidates[Math.floor(random() * candidates.length)] || pool[0] || base.species[0];
  }

  function quantityByRarity(rarity, random, baseMinimum = 1) {
    const index = Math.max(0, base.rarityOrder.indexOf(rarity));
    return Math.max(baseMinimum, baseMinimum + Math.floor(random() * (2 + Math.max(0, 5 - Math.floor(index / 2)))));
  }

  function rewardId(seed, index) {
    return `mir-${hashSeed(`${seed}:${index}`).toString(36)}-${index}`;
  }

  function makeMonsterReward(random, seed, index, options = {}) {
    const species = pickSpecies(random, { rareOnly: options.rareOnly });
    const shiny = random() < SHINY_CHANCE;
    return {
      rewardId: rewardId(seed, index),
      category: "monster",
      kind: "monster",
      rarity: species.rarity,
      speciesId: species.speciesId,
      name: species.name,
      description: `${species.element} · ${species.role}`,
      image: base.assetBundleForSpecies(species.speciesId).thumbnail,
      shiny,
      quantity: 1,
      forced: Boolean(options.forced),
    };
  }

  function makeBookReward(random, seed, index) {
    const pool = itemCatalog.filter((item) => item.category === "book");
    const entries = pool.map((item) => ({ item, weight: ({ Quebrado: 46, Comum: 30, Incomum: 16, "Épico": 6.5, "Lendário": 1.5 })[item.rarity] || 1 }));
    const item = weightedPick(entries, random)?.item || pool[0];
    const quantity = item.rarity === "Quebrado" ? 2 + Math.floor(random() * 3) : item.rarity === "Comum" ? 1 + Math.floor(random() * 2) : 1;
    return { rewardId: rewardId(seed, index), category: "book", kind: "monster-item", rarity: item.rarity, itemId: item.itemId, name: item.name, description: `+${item.xp.toLocaleString("pt-BR")} XP`, image: item.image, quantity };
  }

  function makeEquipmentReward(random, seed, index) {
    const pool = itemCatalog.filter((item) => item.category === "equipment");
    const entries = pool.map((item) => ({ item, weight: RARITY_WEIGHTS[item.rarity] || 1 }));
    const item = weightedPick(entries, random)?.item || pool[0];
    return { rewardId: rewardId(seed, index), category: "equipment", kind: "monster-item", rarity: item.rarity, itemId: item.itemId, name: item.name, description: (item.effects || []).map(base.effectDescription).join("; "), image: item.image, quantity: 1 };
  }

  function makeProgressionReward(random, seed, index) {
    if (random() < 0.52) {
      const corePool = itemCatalog.filter((item) => item.category === "core");
      const entries = corePool.map((item) => ({ item, weight: RARITY_WEIGHTS[item.rarity] || 1 }));
      const item = weightedPick(entries, random)?.item || corePool[0];
      return { rewardId: rewardId(seed, index), category: "core", kind: "monster-resource", rarity: item.rarity, itemId: item.itemId, name: item.name, description: "Material de ascensão por raridade", image: item.image, quantity: quantityByRarity(item.rarity, random, 1) };
    }
    const entries = resourceCatalog.map((resource) => ({ resource, weight: RARITY_WEIGHTS[resource.rarity] || 30 }));
    const resource = weightedPick(entries, random)?.resource || resourceCatalog[0];
    return { rewardId: rewardId(seed, index), category: "material", kind: "monster-resource", rarity: resource.rarity, resourceId: resource.resourceId, name: resource.name, description: resource.purpose, image: resource.image, quantity: quantityByRarity(resource.rarity, random, 2) };
  }

  function makeCurrencyReward(random, seed, index, category) {
    if (category === "gold") {
      const amount = 18 + Math.floor(random() * 38);
      return { rewardId: rewardId(seed, index), category: "gold", kind: "currency", rarity: "Comum", name: `${amount} PO`, description: "Pequena reserva para progressão", image: "assets/monster-items/currency-po.webp", amount, quantity: amount };
    }
    const amount = 2 + Math.floor(random() * 5);
    return { rewardId: rewardId(seed, index), category: "coins", kind: "currency", rarity: "Incomum", name: `${amount} MC`, description: "Retorno raro de Millennium Coins", image: "assets/monster-items/currency-mc.webp", amount, quantity: amount };
  }

  function makeConsumableReward(random, seed, index) {
    const itemId = random() < 0.72 ? "ration-essence" : "ration-moon";
    const item = itemById(itemId);
    return { rewardId: rewardId(seed, index), category: "consumable", kind: "monster-item", rarity: item.rarity, itemId: item.itemId, name: item.name, description: `Recupera ${item.energy} energia e concede ${item.bond} vínculo`, image: item.image, quantity: 1 + Math.floor(random() * 2) };
  }

  function makeReward(category, random, seed, index, options = {}) {
    if (category === "monster") return makeMonsterReward(random, seed, index, options);
    if (category === "book") return makeBookReward(random, seed, index);
    if (category === "equipment") return makeEquipmentReward(random, seed, index);
    if (category === "progression") return makeProgressionReward(random, seed, index);
    if (category === "gold" || category === "coins") return makeCurrencyReward(random, seed, index, category);
    return makeConsumableReward(random, seed, index);
  }

  function rollMonsterInvocation(options = {}) {
    const quantity = clamp(Math.floor(Number(options.quantity) || 1), 1, 10);
    const seed = String(options.seed || `invocation-${Date.now()}`);
    const random = createRng(seed);
    const pityMax = Math.max(1, Math.floor(Number(options.pityMax || MONSTER_PITY_MAX)));
    let pity = Math.max(0, Math.floor(Number(options.pity || 0)));
    const rewards = [];

    for (let index = 0; index < quantity; index += 1) {
      const forceRare = pity + 1 >= pityMax;
      let category = forceRare ? "monster" : weightedPick(INVOCATION_CATEGORY_RATES, random)?.id || "monster";
      const reward = makeReward(category, random, seed, index, { rareOnly: forceRare, forced: forceRare });
      rewards.push(reward);
      if (reward.category === "monster" && RARE_MONSTER_RARITIES.has(reward.rarity)) pity = 0;
      else pity += 1;
    }

    if (quantity === 10 && !rewards.some((reward) => reward.category === "monster")) {
      const index = rewards.length - 1;
      rewards[index] = makeMonsterReward(random, seed, index, { forced: true });
      if (RARE_MONSTER_RARITIES.has(rewards[index].rarity)) pity = 0;
    }

    return Object.freeze({
      version: 1,
      seed,
      quantity,
      rewards: Object.freeze(rewards.map((reward) => Object.freeze(reward))),
      pityBefore: Math.max(0, Math.floor(Number(options.pity || 0))),
      pityAfter: pity,
      pityMax,
      guaranteedMonster: quantity === 10,
      generatedAt: nowIso(),
    });
  }

  function createEconomyItemInstance(itemId, options = {}) {
    const definition = itemById(itemId);
    if (!definition) throw new Error(`Item de monstro desconhecido: ${itemId}`);
    const seed = String(options.seed || `${itemId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
    return {
      instanceId: String(options.instanceId || `mi-${base.slug(itemId)}-${hashSeed(seed).toString(36)}`),
      itemId,
      quantity: Math.max(1, Math.floor(Number(options.quantity) || 1)),
      acquiredAt: options.acquiredAt || nowIso(),
      source: options.source || "Invocação dos Monstros",
      schemaVersion: 1,
    };
  }

  function mergeStackableItem(inventory, reward, seed) {
    const definition = itemById(reward.itemId);
    const stackable = definition?.category !== "equipment";
    if (stackable) {
      const existingIndex = inventory.findIndex((entry) => entry.itemId === reward.itemId);
      if (existingIndex >= 0) {
        inventory[existingIndex] = { ...inventory[existingIndex], quantity: Math.max(0, Number(inventory[existingIndex].quantity || 0)) + Math.max(1, Number(reward.quantity || 1)) };
        return;
      }
    }
    const copies = stackable ? 1 : Math.max(1, Number(reward.quantity || 1));
    for (let index = 0; index < copies; index += 1) {
      inventory.push(createEconomyItemInstance(reward.itemId, {
        seed: `${seed}:${reward.rewardId}:${index}`,
        quantity: stackable ? reward.quantity : 1,
        source: "Invocação dos Monstros",
      }));
    }
  }

  function applyInvocationRewards(characterInput = {}, invocation, options = {}) {
    const character = clone(characterInput || {});
    const rewards = Array.isArray(invocation?.rewards) ? invocation.rewards : [];
    const cost = Math.max(0, Number(options.cost || 0));
    const coinsBefore = Math.max(0, Number(character.millenniumCoins || 0));
    if (coinsBefore < cost) return { ok: false, reason: "insufficient-coins", patch: {}, summary: null };

    const nativeMonsters = Array.isArray(character.monsterInstances) ? character.monsterInstances : [];
    const legacyMonsters = [...(character.gachaVault || []).filter((entry) => entry.kind === "pet"), ...(character.pets || [])]
      .map((entry) => base.normalizeMonsterInstance(entry))
      .filter((entry, index, list) => list.findIndex((candidate) => candidate.speciesId === entry.speciesId) === index)
      .slice(0, 25);
    const monsters = (nativeMonsters.length ? nativeMonsters : legacyMonsters)
      .map((entry) => base.normalizeMonsterInstance(entry));
    const inventory = Array.isArray(character.monsterInventory) ? clone(character.monsterInventory) : [];
    const resources = {
      cores: { ...(character.monsterResources?.cores || {}) },
      fragments: { ...(character.monsterResources?.fragments || {}) },
      materials: { ...(character.monsterResources?.materials || {}) },
    };
    const ownedBySpecies = new Map(monsters.map((monster, index) => [monster.speciesId, index]));
    const summary = { newMonsters: 0, duplicates: 0, shinyUnlocked: 0, fragments: 0, items: 0, gold: 0, coins: 0, resources: 0 };

    for (const reward of rewards) {
      if (reward.category === "monster") {
        const existingIndex = ownedBySpecies.get(reward.speciesId);
        if (existingIndex === undefined) {
          const monster = base.createNativeInstance(reward.speciesId, {
            instanceId: `monster-${reward.speciesId}-${hashSeed(`${invocation.seed}:${reward.rewardId}`).toString(36)}`,
            shiny: Boolean(reward.shiny),
            shinyUnlocked: Boolean(reward.shiny),
            seed: `${invocation.seed}:${reward.rewardId}`,
          });
          monster.history = [{ id: `mh-${hashSeed(reward.rewardId).toString(36)}`, type: "Invocação", detail: `Vínculo iniciado pela Invocação dos Monstros${reward.shiny ? " em forma Shiny" : ""}.`, createdAt: invocation.generatedAt || nowIso() }];
          monsters.push(monster);
          ownedBySpecies.set(monster.speciesId, monsters.length - 1);
          summary.newMonsters += 1;
        } else {
          const existing = { ...monsters[existingIndex] };
          const fragmentAmount = DUPLICATE_FRAGMENTS[reward.rarity] || 10;
          resources.fragments[reward.speciesId] = Math.max(0, Number(resources.fragments[reward.speciesId] || 0)) + fragmentAmount;
          summary.duplicates += 1;
          summary.fragments += fragmentAmount;
          if (reward.shiny && !existing.shinyUnlocked) {
            existing.shinyUnlocked = true;
            existing.history = [...(existing.history || []), { id: `mh-shiny-${hashSeed(reward.rewardId).toString(36)}`, type: "Forma Shiny", detail: "Uma duplicata rara desbloqueou a forma Shiny.", createdAt: invocation.generatedAt || nowIso() }];
            monsters[existingIndex] = existing;
            summary.shinyUnlocked += 1;
          }
        }
        continue;
      }
      if (["book", "equipment", "consumable"].includes(reward.category)) {
        mergeStackableItem(inventory, reward, invocation.seed);
        summary.items += Math.max(1, Number(reward.quantity || 1));
        continue;
      }
      if (reward.category === "core") {
        resources.cores[reward.itemId] = Math.max(0, Number(resources.cores[reward.itemId] || 0)) + Math.max(1, Number(reward.quantity || 1));
        summary.resources += Math.max(1, Number(reward.quantity || 1));
        continue;
      }
      if (reward.category === "material") {
        resources.materials[reward.resourceId] = Math.max(0, Number(resources.materials[reward.resourceId] || 0)) + Math.max(1, Number(reward.quantity || 1));
        summary.resources += Math.max(1, Number(reward.quantity || 1));
        continue;
      }
      if (reward.category === "gold") summary.gold += Math.max(0, Number(reward.amount || 0));
      if (reward.category === "coins") summary.coins += Math.max(0, Number(reward.amount || 0));
    }

    const historyEntry = {
      id: `monster-gacha-${hashSeed(invocation.seed).toString(36)}`,
      seed: invocation.seed,
      quantity: invocation.quantity,
      pityBefore: invocation.pityBefore,
      pityAfter: invocation.pityAfter,
      cost,
      results: rewards.map((reward) => ({ rewardId: reward.rewardId, category: reward.category, rarity: reward.rarity, name: reward.name, speciesId: reward.speciesId || "", itemId: reward.itemId || "", resourceId: reward.resourceId || "", quantity: reward.quantity || reward.amount || 1, shiny: Boolean(reward.shiny) })),
      createdAt: invocation.generatedAt || nowIso(),
      receiptVersion: 1,
    };
    const legacyHistoryEntries = rewards.map((reward) => ({
      id: reward.rewardId,
      kind: reward.category === "monster" ? "monster" : reward.kind,
      name: reward.name,
      rarity: reward.rarity,
      shiny: Boolean(reward.shiny),
      stars: reward.category === "monster" ? 1 : 0,
      createdAt: invocation.generatedAt || nowIso(),
    }));

    const patch = {
      monsterEconomyVersion: 1,
      monsterSchemaVersion: Math.max(1, Number(character.monsterSchemaVersion || 1)),
      monsterInstances: monsters,
      monsterInventory: inventory,
      monsterResources: resources,
      monsterGachaPity: { rareMonster: Math.max(0, Number(invocation.pityAfter || 0)), max: Math.max(1, Number(invocation.pityMax || MONSTER_PITY_MAX)) },
      monsterGachaHistory: [historyEntry, ...(character.monsterGachaHistory || [])].slice(0, 80),
      monsterFirstTenClaimed: Boolean(character.monsterFirstTenClaimed || invocation.quantity === 10),
      gold: Math.max(0, Number(character.gold || 0)) + summary.gold,
      millenniumCoins: coinsBefore - cost + summary.coins,
      gachaHistory: [...(character.gachaHistory || []), ...legacyHistoryEntries].slice(-120),
    };

    return { ok: true, patch, summary, receipt: historyEntry };
  }

  function calculateMonsterStats(monsterInput, monsterInventory = [], modeModifiers = {}) {
    const baseline = base.calculateMonsterStats(monsterInput, monsterInventory, modeModifiers);
    const monster = base.normalizeMonsterInstance(monsterInput);
    const stats = { ...baseline.stats };
    const extraIds = new Set(additionalItems.filter((item) => item.category === "equipment").map((item) => item.itemId));
    const inventoryByInstance = new Map((monsterInventory || []).map((entry) => [entry.instanceId, entry]));
    const extraEquipment = (monster.equipment || []).map((equip) => {
      const inventoryEntry = inventoryByInstance.get(equip.itemInstanceId || equip.instanceId) || equip;
      const definition = itemById(equip.itemId || inventoryEntry.itemId);
      return definition && extraIds.has(definition.itemId) ? { ...inventoryEntry, ...equip, definition } : null;
    }).filter(Boolean);
    for (const equipped of extraEquipment) {
      for (const effect of equipped.definition.effects || []) {
        if (!(effect.stat in stats)) continue;
        if (effect.type === "stat_flat") stats[effect.stat] += Number(effect.value || 0);
        if (effect.type === "stat_percent") stats[effect.stat] *= 1 + Number(effect.value || 0);
        if (effect.type === "element_percent" && baseline.definition.element === effect.element) stats[effect.stat] *= 1 + Number(effect.value || 0);
        if (effect.type === "mode_stat_percent" && (effect.mode === modeModifiers.mode || effect.mode === "all")) stats[effect.stat] *= 1 + Number(effect.value || 0);
      }
    }
    Object.keys(stats).forEach((stat) => { stats[stat] = Math.max(0, Math.round(stats[stat] * 10) / 10); });
    const totalPower = Math.round((stats.hp || 0) * 0.22 + (stats.attack || 0) * 1.7 + (stats.defense || 0) * 1.35 + (stats.speed || 0) * 1.1 + (stats.power || 0) * 1.45 + (stats.control || 0) * 1.05);
    return { ...baseline, stats, totalPower, equipment: [...baseline.equipment, ...extraEquipment] };
  }

  function applyFoodItem(monsterInput, itemId) {
    const monster = base.normalizeMonsterInstance(monsterInput);
    const item = itemById(itemId);
    if (!item || item.category !== "food") return { ok: false, monster, reason: "invalid-food", message: "Alimento inválido." };
    return {
      ok: true,
      monster: {
        ...monster,
        energy: clamp(monster.energy + Number(item.energy || 0), 0, 100),
        bond: clamp(monster.bond + Number(item.bond || 0), 0, 100),
        condition: ["injured", "grave", "lost", "dead"].includes(monster.condition) ? monster.condition : "healthy",
        lastCareAt: nowIso(),
      },
      consumedItemId: item.itemId,
      message: `${item.name} aplicado: +${Number(item.energy || 0)} energia e +${Number(item.bond || 0)} vínculo.`,
    };
  }

  function invocationPoolSummary() {
    return {
      categories: INVOCATION_CATEGORY_RATES.map((entry) => ({ ...entry })),
      species: base.species.map((species) => ({ speciesId: species.speciesId, name: species.name, rarity: species.rarity, element: species.element, role: species.role, image: base.assetBundleForSpecies(species.speciesId).thumbnail })),
      items: itemCatalog.map((item) => ({ itemId: item.itemId, name: item.name, category: item.category, rarity: item.rarity, image: item.image })),
      resources: resourceCatalog.map((resource) => ({ ...resource })),
      pityMax: MONSTER_PITY_MAX,
      tenfoldGuarantee: true,
      shinyChance: SHINY_CHANCE,
    };
  }

  const api = Object.freeze({
    ...base,
    economyVersion: 1,
    itemCatalog,
    itemById,
    resourceCatalog,
    resourceById,
    invocationCategoryRates: INVOCATION_CATEGORY_RATES,
    rarityWeights: RARITY_WEIGHTS,
    duplicateFragments: DUPLICATE_FRAGMENTS,
    monsterPityMax: MONSTER_PITY_MAX,
    shinyChance: SHINY_CHANCE,
    createRng,
    createItemInstance: createEconomyItemInstance,
    calculateMonsterStats,
    applyFoodItem,
    rollMonsterInvocation,
    applyInvocationRewards,
    invocationPoolSummary,
  });

  global.MILLENNIUM_MONSTERS_364 = api;
})(window);
