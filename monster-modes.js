(function extendMillenniumMonsterModes364(global) {
  "use strict";

  const base = global.MILLENNIUM_MONSTERS_364;
  if (!base?.engineVersion || !base?.economyVersion) throw new Error("monster-modes.js exige monster-engine.js e monster-economy.js");

  const clone = (value) => typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
  const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
  const nowIso = () => new Date().toISOString();
  const hashSeed = (value = "") => {
    let hash = 2166136261;
    for (const char of String(value)) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
    return hash >>> 0;
  };
  const rngFor = (seed) => {
    let state = hashSeed(seed) || 0x9e3779b9;
    return () => { state += 0x6D2B79F5; let t = state; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  };

  const ELEMENT_GROUPS = Object.freeze({
    Fogo: "fogo", Cinzas: "fogo", Solar: "fogo",
    Natureza: "natureza", Veneno: "natureza", Pântano: "natureza",
    Metal: "metal", Trovão: "metal", Oficina: "metal",
    Lunar: "luz", Luz: "luz", Halo: "luz",
    Eclipse: "sombra", Vazio: "sombra", Sombras: "sombra",
    Névoa: "arcano", Eco: "arcano", Som: "arcano", Prisma: "arcano",
  });
  const ADVANTAGES = Object.freeze({ fogo: "natureza", natureza: "metal", metal: "arcano", arcano: "luz", luz: "sombra", sombra: "fogo" });
  function elementMultiplier(attacker, defender) {
    const a = ELEMENT_GROUPS[attacker] || "arcano";
    const d = ELEMENT_GROUPS[defender] || "arcano";
    if (ADVANTAGES[a] === d) return 1.22;
    if (ADVANTAGES[d] === a) return 0.82;
    return 1;
  }

  const DUNGEON_PHASES = Object.freeze([
    { id: "dungeon-01", phase: 1, name: "Mandíbula da Cripta", element: "Cinzas", role: "Ataque", speciesId: "sapo-cinzas", image: "assets/bosses/dungeon-01-rato-rei.webp", power: 0.82, rounds: 15, rewardTier: 1, materialId: "essence-awakening", material: 3 },
    { id: "dungeon-02", phase: 2, name: "Sentinela do Musgo Negro", element: "Natureza", role: "Defesa", speciesId: "javali-musgo", image: "assets/bosses/dungeon-02-corvo-ponte.webp", power: 1.05, rounds: 16, rewardTier: 1, materialId: "essence-defense", material: 3 },
    { id: "dungeon-03", phase: 3, name: "Sino Faminto", element: "Som", role: "Controle", speciesId: "urso-sineiro", image: "assets/bosses/dungeon-03-sino-faminto.webp", power: 1.28, rounds: 17, rewardTier: 2, materialId: "seal-resonance", material: 3 },
    { id: "dungeon-04", phase: 4, name: "Hidra das Águas Mortas", element: "Veneno", role: "Debuff", speciesId: "hidra-pantano", image: "assets/bosses/dungeon-04-hidra-aguas-mortas.webp", power: 1.58, rounds: 18, rewardTier: 2, materialId: "alchemy-catalyst", material: 2 },
    { id: "dungeon-05", phase: 5, name: "Dragão da Forja Afundada", element: "Metal", role: "Ataque", speciesId: "dragao-oficina", image: "assets/bosses/dungeon-05-dragao-forja.webp", power: 1.92, rounds: 19, rewardTier: 3, materialId: "essence-ascendant", material: 2 },
    { id: "dungeon-06", phase: 6, name: "Fenrir do Portão Partido", element: "Eclipse", role: "Assassino", speciesId: "fenrir-mil-pegadas", image: "assets/bosses/dungeon-06-fenrir-portao.webp", power: 2.34, rounds: 20, rewardTier: 3, materialId: "boss-core-dust", material: 1 },
    { id: "dungeon-07", phase: 7, name: "Leviatã do Vidro Negro", element: "Vazio", role: "Controle", speciesId: "leviata-vidro-negro", image: "assets/bosses/dungeon-07-leviata-vidro-negro.webp", power: 2.82, rounds: 21, rewardTier: 4, materialId: "boss-core-dust", material: 2 },
    { id: "dungeon-08", phase: 8, name: "Devorador do Último Eclipse", element: "Eclipse", role: "Ataque", speciesId: "devorador-ultimo-eclipse", image: "assets/bosses/dungeon-08-devorador-eclipse.webp", power: 3.45, rounds: 22, rewardTier: 5, materialId: "boss-core-dust", material: 3 },
  ]);

  const WORLD_BOSS = Object.freeze({
    id: "boss-aurora-devourer",
    name: "Arauto da Aurora Devorada",
    element: "Vazio",
    speciesId: "devorador-ultimo-eclipse",
    maxRounds: 18,
    image: "assets/bosses/world-aurora-devourer.webp",
    modifiers: { hp: 18, attack: 0.28, defense: 0.92 },
  });

  const ARENA_LEAGUES = Object.freeze([
    { id: "cinza", name: "Cinza", min: 0 }, { id: "ferro", name: "Ferro", min: 400 },
    { id: "ouro", name: "Ouro", min: 900 }, { id: "eclipse", name: "Eclipse", min: 1600 },
    { id: "oraculo", name: "Oráculo", min: 2600 },
  ]);
  const ARENA_SHOP = Object.freeze([
    { offerId: "arena-book-advanced", name: "Livro Avançado de XP", cost: 45, type: "item", itemId: "xp-book-advanced", quantity: 1, limit: 8 },
    { offerId: "arena-book-superior", name: "Livro Superior de XP", cost: 120, type: "item", itemId: "xp-book-superior", quantity: 1, limit: 4 },
    { offerId: "arena-core-epic", name: "Núcleo Épico", cost: 160, type: "core", itemId: "core-epico", quantity: 1, limit: 3 },
    { offerId: "arena-rune-speed", name: "Selo da Celeridade", cost: 220, type: "item", itemId: "seal-quickening", quantity: 1, limit: 1 },
    { offerId: "arena-eye-prism", name: "Olho Prismático", cost: 280, type: "item", itemId: "eye-prism", quantity: 1, limit: 1 },
    { offerId: "arena-fragments", name: "Fragmentos da espécie ativa", cost: 70, type: "active-fragments", quantity: 12, limit: 6 },
  ]);

  function leagueFor(points = 0) {
    return [...ARENA_LEAGUES].reverse().find((entry) => Number(points || 0) >= entry.min) || ARENA_LEAGUES[0];
  }

  function snapshotMonster(monsterInput, inventory = [], mode = "arena") {
    const monster = base.normalizeMonsterInstance(monsterInput);
    const calc = base.calculateMonsterStats(monster, inventory, { mode });
    const abilityIds = (monster.equippedAbilityIds || []).filter((id) => base.abilityRegistry[id]).slice(0, 3);
    const abilities = (abilityIds.length ? abilityIds : base.abilitiesForSpecies(monster.speciesId).filter((entry) => entry.unlockStar <= monster.stars).slice(0, 3).map((entry) => entry.abilityId));
    return {
      instanceId: monster.instanceId,
      speciesId: monster.speciesId,
      name: monster.customName || monster.displayName || monster.speciesName,
      speciesName: monster.speciesName,
      rarity: monster.rarity,
      element: monster.element,
      role: monster.role,
      level: monster.level,
      stars: monster.stars,
      shiny: Boolean(monster.shiny),
      image: base.assetBundleForSpecies(monster.speciesId).thumbnail,
      stats: clone(calc.stats),
      totalPower: calc.totalPower,
      abilityIds: abilities,
      passiveIds: (monster.activePassiveIds || monster.learnedPassives || []).filter((id) => base.passiveRegistry[id]),
      snapshotVersion: 1,
    };
  }

  function createTeamSnapshot(monsters = [], inventory = [], mode = "arena", metadata = {}) {
    const members = monsters.slice(0, 3).map((monster) => snapshotMonster(monster, inventory, mode));
    return {
      snapshotId: `snapshot-${hashSeed(`${metadata.ownerId || "local"}:${metadata.seed || nowIso()}`).toString(36)}`,
      ownerId: String(metadata.ownerId || ""),
      ownerName: String(metadata.ownerName || "Desafiante"),
      mode,
      members,
      totalPower: members.reduce((sum, member) => sum + member.totalPower, 0),
      createdAt: metadata.createdAt || nowIso(),
      version: 1,
    };
  }

  function syntheticCombatant(speciesId, name, scale, mode, index = 0) {
    const species = base.speciesForId(speciesId) || base.species[0];
    const level = clamp(Math.round(18 + scale * 18), 1, 150);
    const stars = clamp(Math.ceil(scale * 1.45), 1, 7);
    const instance = base.createNativeInstance(species.speciesId, { instanceId: `synthetic-${speciesId}-${index}`, customName: name, level, stars, bond: 55, energy: 100 });
    const snapshot = snapshotMonster(instance, [], mode);
    const factor = Math.max(0.55, scale);
    snapshot.name = name;
    Object.keys(snapshot.stats).forEach((key) => { snapshot.stats[key] = Math.max(1, Math.round(snapshot.stats[key] * factor)); });
    snapshot.totalPower = Math.round(snapshot.totalPower * factor);
    return snapshot;
  }

  function createDungeonBoss(phase) {
    const boss = syntheticCombatant(phase.speciesId, phase.name, phase.power, "boss", phase.phase);
    boss.image = phase.image || boss.image;
    boss.stats.hp = Math.round(boss.stats.hp * (2.4 + phase.phase * 0.16));
    boss.stats.defense = Math.round(boss.stats.defense * 1.18);
    boss.totalPower = Math.round(boss.totalPower * 1.65);
    boss.boss = true;
    return boss;
  }

  function combatState(snapshot, side, index) {
    const maxHp = Math.max(1, Math.round(snapshot.stats.hp || 1));
    return {
      ...clone(snapshot), side, index, maxHp, hp: maxHp, shield: 0, energy: 42,
      cooldowns: {}, statuses: {}, defeated: false, passiveFlags: {}, damageDone: 0, healingDone: 0,
    };
  }

  function chooseTarget(team, kind = "lowest") {
    const alive = team.filter((unit) => !unit.defeated && unit.hp > 0);
    if (!alive.length) return null;
    if (kind === "lowest") return [...alive].sort((a, b) => a.hp / a.maxHp - b.hp / b.maxHp)[0];
    return alive[0];
  }

  function pickAbility(unit, round) {
    const candidates = (unit.abilityIds || []).map((id) => base.abilityRegistry[id]).filter(Boolean)
      .filter((ability) => Number(unit.cooldowns[ability.abilityId] || 0) <= 0 && unit.energy >= Number(ability.energyCost || 0));
    if (!candidates.length) return null;
    return [...candidates].sort((a, b) => Number(b.power || 0) - Number(a.power || 0))[round % Math.min(2, candidates.length)];
  }

  function applyDamage(attacker, defender, power, random, element) {
    const attack = Number(attacker.stats.attack || 1);
    const magic = Number(attacker.stats.power || 1);
    const defense = Math.max(1, Number(defender.stats.defense || 1));
    const multiplier = elementMultiplier(element || attacker.element, defender.element);
    const critChance = clamp(0.05 + Number(attacker.stats.speed || 0) / 1800, 0.05, 0.28);
    const critical = random() < critChance;
    const variance = 0.9 + random() * 0.2;
    const raw = ((attack * 0.72 + magic * 0.42) * (Number(power || 100) / 100) * multiplier * variance * (critical ? 1.55 : 1));
    const mitigated = Math.max(1, raw * (100 / (100 + defense * 1.8)));
    let damage = Math.round(mitigated);
    if (defender.statuses.weakened) damage = Math.round(damage * 1.12);
    if (defender.shield > 0) {
      const absorbed = Math.min(defender.shield, damage);
      defender.shield -= absorbed;
      damage -= absorbed;
    }
    defender.hp = Math.max(0, defender.hp - damage);
    if (defender.hp <= 0) defender.defeated = true;
    attacker.damageDone += damage;
    return { damage, critical, multiplier };
  }

  function applyAbility(unit, allies, enemies, ability, random, log, round) {
    const targetEnemy = chooseTarget(enemies, "lowest");
    const targetAlly = chooseTarget(allies, "lowest") || unit;
    unit.energy = clamp(unit.energy - Number(ability.energyCost || 0), 0, 100);
    unit.cooldowns[ability.abilityId] = Math.max(0, Number(ability.cooldown || 0) + 1);
    const effects = ability.effects || [];
    const targets = ability.target === "all_enemies" ? enemies.filter((entry) => !entry.defeated) : ability.target === "team" ? allies.filter((entry) => !entry.defeated) : [ability.target === "self" ? unit : ability.target === "ally_lowest_hp" ? targetAlly : targetEnemy].filter(Boolean);
    let totalDamage = 0;
    for (const target of targets) {
      for (const effect of effects) {
        if (effect.type === "damage") {
          const result = applyDamage(unit, target, Number(effect.power || ability.power || 100), random, ability.element || unit.element);
          totalDamage += result.damage;
          log.push({ round, type: "damage", actor: unit.name, target: target.name, ability: ability.name, value: result.damage, critical: result.critical, effective: result.multiplier > 1.05 });
        } else if (effect.type === "heal") {
          const amount = Math.max(1, Math.round(target.maxHp * Number(effect.value || 0.12) + Number(unit.stats.power || 0) * 0.35));
          const actual = Math.min(amount, target.maxHp - target.hp);
          target.hp += actual; unit.healingDone += actual;
          log.push({ round, type: "heal", actor: unit.name, target: target.name, ability: ability.name, value: actual });
        } else if (effect.type === "shield") {
          const amount = Math.max(1, Math.round(target.maxHp * Number(effect.value || 0.12)));
          target.shield += amount;
          log.push({ round, type: "shield", actor: unit.name, target: target.name, ability: ability.name, value: amount });
        } else if (effect.type === "status" && random() <= Number(effect.chance ?? 1)) {
          target.statuses[effect.status || "marked"] = Math.max(1, Number(effect.duration || 1));
          log.push({ round, type: "status", actor: unit.name, target: target.name, ability: ability.name, status: effect.status || "marked" });
        } else if (effect.type === "stat_percent") {
          const stat = effect.stat || "attack";
          target.stats[stat] = Math.max(1, Number(target.stats[stat] || 1) * (1 + Number(effect.value || 0)));
          log.push({ round, type: "buff", actor: unit.name, target: target.name, ability: ability.name, status: stat });
        }
      }
    }
    if (!effects.some((effect) => effect.type === "damage") && targetEnemy && !["team", "self", "ally_lowest_hp"].includes(ability.target)) {
      const result = applyDamage(unit, targetEnemy, Number(ability.power || 80), random, ability.element || unit.element);
      totalDamage += result.damage;
      log.push({ round, type: "damage", actor: unit.name, target: targetEnemy.name, ability: ability.name, value: result.damage, critical: result.critical, effective: result.multiplier > 1.05 });
    }
    return totalDamage;
  }

  function tickUnit(unit) {
    Object.keys(unit.cooldowns).forEach((id) => { unit.cooldowns[id] = Math.max(0, unit.cooldowns[id] - 1); });
    Object.keys(unit.statuses).forEach((id) => { unit.statuses[id] -= 1; if (unit.statuses[id] <= 0) delete unit.statuses[id]; });
    unit.energy = clamp(unit.energy + 18, 0, 100);
  }

  function triggerBelowHpPassive(unit, log, round) {
    if (unit.passiveFlags.belowHp || unit.hp / unit.maxHp > 0.4) return;
    const passive = (unit.passiveIds || []).map((id) => base.passiveRegistry[id]).find((entry) => entry?.trigger === "below_hp");
    if (!passive) return;
    unit.passiveFlags.belowHp = true;
    for (const effect of passive.effects || []) {
      if (effect.type === "shield") unit.shield += Math.round(unit.maxHp * Number(effect.value || 0));
      if (effect.type === "stat_percent" && effect.stat in unit.stats) unit.stats[effect.stat] *= 1 + Number(effect.value || 0);
    }
    log.push({ round, type: "passive", actor: unit.name, target: unit.name, ability: passive.name, value: unit.shield });
  }

  function simulateBattle(teamASnapshot, teamBSnapshot, options = {}) {
    const seed = String(options.seed || `${teamASnapshot.snapshotId}:${teamBSnapshot.snapshotId}:${Date.now()}`);
    const random = rngFor(seed);
    const teamA = (teamASnapshot.members || []).map((entry, index) => combatState(entry, "a", index));
    const teamB = (teamBSnapshot.members || []).map((entry, index) => combatState(entry, "b", index));
    const maxRounds = Math.max(1, Number(options.maxRounds || 18));
    const log = [];
    let round = 0;
    while (round < maxRounds && teamA.some((unit) => !unit.defeated) && teamB.some((unit) => !unit.defeated)) {
      round += 1;
      const order = [...teamA, ...teamB].filter((unit) => !unit.defeated).sort((a, b) => Number(b.stats.speed || 0) - Number(a.stats.speed || 0) || random() - 0.5);
      for (const unit of order) {
        if (unit.defeated) continue;
        const allies = unit.side === "a" ? teamA : teamB;
        const enemies = unit.side === "a" ? teamB : teamA;
        if (!enemies.some((entry) => !entry.defeated)) break;
        tickUnit(unit);
        if (unit.statuses.frozen && random() < 0.6) { log.push({ round, type: "skip", actor: unit.name, status: "frozen" }); continue; }
        const ability = pickAbility(unit, round);
        if (ability) applyAbility(unit, allies, enemies, ability, random, log, round);
        else {
          const target = chooseTarget(enemies, "lowest");
          const result = applyDamage(unit, target, 88, random, unit.element);
          log.push({ round, type: "damage", actor: unit.name, target: target.name, ability: "Ataque básico", value: result.damage, critical: result.critical, effective: result.multiplier > 1.05 });
        }
        [...teamA, ...teamB].forEach((entry) => triggerBelowHpPassive(entry, log, round));
      }
    }
    const aliveA = teamA.filter((unit) => !unit.defeated);
    const aliveB = teamB.filter((unit) => !unit.defeated);
    const hpA = teamA.reduce((sum, unit) => sum + unit.hp, 0);
    const hpB = teamB.reduce((sum, unit) => sum + unit.hp, 0);
    const winner = aliveA.length && !aliveB.length ? "a" : aliveB.length && !aliveA.length ? "b" : hpA >= hpB ? "a" : "b";
    return {
      seed, mode: options.mode || "arena", rounds: round, winner, log,
      teams: { a: teamA, b: teamB },
      summary: {
        damageA: teamA.reduce((sum, unit) => sum + unit.damageDone, 0),
        damageB: teamB.reduce((sum, unit) => sum + unit.damageDone, 0),
        healingA: teamA.reduce((sum, unit) => sum + unit.healingDone, 0),
        healingB: teamB.reduce((sum, unit) => sum + unit.healingDone, 0),
        remainingHpA: hpA, remainingHpB: hpB,
      },
      resultHash: hashSeed(JSON.stringify({ seed, winner, round, hpA, hpB, log: log.map((entry) => [entry.round, entry.actor, entry.target, entry.value || 0]) })).toString(16),
    };
  }

  function simulateDungeon(teamSnapshot, phaseInput, options = {}) {
    const phase = typeof phaseInput === "number" ? DUNGEON_PHASES.find((entry) => entry.phase === phaseInput) : phaseInput;
    if (!phase) throw new Error("Fase de masmorra inválida.");
    const boss = createDungeonBoss(phase);
    const bossSnapshot = { snapshotId: `boss-${phase.id}`, ownerId: "dungeon", ownerName: phase.name, mode: "boss", members: [boss], totalPower: boss.totalPower, version: 1 };
    const battle = simulateBattle(teamSnapshot, bossSnapshot, { seed: options.seed || `${teamSnapshot.snapshotId}:${phase.id}`, mode: "boss", maxRounds: phase.rounds });
    const victory = battle.winner === "a";
    const random = rngFor(`${battle.seed}:loot`);
    const fragmentSpecies = teamSnapshot.members[Math.floor(random() * Math.max(1, teamSnapshot.members.length))]?.speciesId || "rato-brasa";
    const rewards = {
      materials: { [phase.materialId]: victory ? phase.material + Math.floor(random() * 2) : 1 },
      fragments: { [fragmentSpecies]: victory ? 5 + phase.rewardTier * 3 : 2 },
      gold: victory ? 18 + phase.phase * 7 : 5,
      coins: victory && phase.phase >= 5 && random() < 0.18 ? 1 : 0,
      arenaFragments: 0,
    };
    return { ...battle, phase, victory, rewards, score: Math.max(0, Math.round(battle.summary.damageA * (victory ? 1.2 : 0.55) + battle.summary.remainingHpA)) };
  }

  function simulateWorldBoss(teamSnapshot, options = {}) {
    const boss = syntheticCombatant(WORLD_BOSS.speciesId, WORLD_BOSS.name, 5.8, "boss", 99);
    boss.image = WORLD_BOSS.image;
    boss.stats.hp = 999999999;
    boss.maxHp = boss.stats.hp;
    boss.stats.attack = 72;
    boss.stats.power = 64;
    boss.stats.speed = 12;
    boss.stats.defense = 58;
    const bossSnapshot = { snapshotId: WORLD_BOSS.id, ownerId: "world-boss", ownerName: WORLD_BOSS.name, mode: "boss", members: [boss], totalPower: boss.totalPower, version: 1 };
    const battle = simulateBattle(teamSnapshot, bossSnapshot, { seed: options.seed || `${teamSnapshot.snapshotId}:${WORLD_BOSS.id}`, mode: "boss", maxRounds: WORLD_BOSS.maxRounds });
    const damage = battle.summary.damageA;
    return { ...battle, boss: WORLD_BOSS, damage, victory: false, score: damage, rewards: { materials: { "boss-core-dust": damage >= 1000 ? 2 : 1 }, fragments: {}, gold: Math.min(80, 10 + Math.floor(damage / 250)), coins: damage >= 5000 ? 1 : 0 } };
  }

  function arenaPointsDelta(result, attackerPower, defenderPower) {
    const expected = 1 / (1 + Math.pow(10, (defenderPower - attackerPower) / 1200));
    const actual = result.winner === "a" ? 1 : 0;
    return Math.round(18 + (actual - expected) * 28);
  }

  function buildAiOpponent(index = 0, points = 0) {
    const random = rngFor(`arena-ai:${index}:${Math.floor(points / 100)}`);
    const league = leagueFor(points);
    const pool = base.species.filter((entry) => entry.rarity !== "Secret" || points >= 1800);
    const members = [];
    for (let slot = 0; slot < 3; slot += 1) {
      const species = pool[Math.floor(random() * pool.length)] || pool[0];
      const scale = 0.72 + points / 2200 + index * 0.06 + random() * 0.18;
      members.push(syntheticCombatant(species.speciesId, species.name, scale, "arena", slot));
    }
    return {
      snapshotId: `arena-ai-${index}-${Math.floor(points / 100)}`,
      ownerId: `oracle-ai-${index}`,
      ownerName: ["Guardião de Cinzas", "Vigia de Ferro", "Oráculo Partido", "Herdeira do Eclipse", "Campeão do Abismo"][index % 5],
      mode: "arena",
      members,
      totalPower: members.reduce((sum, member) => sum + member.totalPower, 0),
      arenaPoints: Math.max(0, points + (index - 2) * 90),
      league: league.name,
      createdAt: nowIso(),
      version: 1,
      artificial: true,
    };
  }

  function applyModeRewards(characterInput, rewards = {}) {
    const character = clone(characterInput || {});
    const resources = clone(character.monsterResources || { cores: {}, fragments: {}, materials: {} });
    resources.cores = { ...(resources.cores || {}) };
    resources.fragments = { ...(resources.fragments || {}) };
    resources.materials = { ...(resources.materials || {}) };
    Object.entries(rewards.materials || {}).forEach(([id, amount]) => { resources.materials[id] = Number(resources.materials[id] || 0) + Number(amount || 0); });
    Object.entries(rewards.fragments || {}).forEach(([id, amount]) => { resources.fragments[id] = Number(resources.fragments[id] || 0) + Number(amount || 0); });
    return {
      monsterResources: resources,
      gold: Number(character.gold || 0) + Number(rewards.gold || 0),
      millenniumCoins: Number(character.millenniumCoins || 0) + Number(rewards.coins || 0),
      arenaFragments: Number(character.arenaFragments || 0) + Number(rewards.arenaFragments || 0),
    };
  }

  const api = Object.freeze({
    ...base,
    modesVersion: 1,
    dungeonPhases: DUNGEON_PHASES,
    worldBoss: WORLD_BOSS,
    arenaLeagues: ARENA_LEAGUES,
    arenaShop: ARENA_SHOP,
    hashSeed,
    rngFor,
    elementMultiplier,
    leagueFor,
    snapshotMonster,
    createTeamSnapshot,
    buildAiOpponent,
    simulateBattle,
    simulateDungeon,
    simulateWorldBoss,
    arenaPointsDelta,
    applyModeRewards,
  });

  global.MILLENNIUM_MONSTERS_364 = api;
})(window);
