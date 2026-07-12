(function exposeMillenniumCore() {
  const ATTRIBUTE_KEYS = ["for", "vel", "hab", "res", "pod"];
  const ZERO_ATTRIBUTES = Object.freeze({ for: 0, vel: 0, hab: 0, res: 0, pod: 0 });

  const finite = (value) => Number.isFinite(Number(value)) ? Number(value) : 0;
  const attributes = (source = {}) => Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [key, finite(source?.[key])]));
  const add = (...sources) => Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [key, sources.reduce((sum, source) => sum + finite(source?.[key]), 0)]));
  const byId = (items, id) => (items || []).find((item) => item.id === id) || null;

  function officialEquipmentBonus(character, catalogs) {
    const itemCatalog = catalogs.items || [];
    const equipped = (character.inventory || []).filter((item) => item?.equipped);
    const sourceIds = new Set();
    const bonuses = [];
    let defense = 0;
    const duplicateInstances = [];

    equipped.forEach((instance) => {
      const sourceId = instance.catalogId || instance.itemId || instance.id;
      const official = byId(itemCatalog, sourceId);
      if (!official) return;
      const instanceKey = instance.instanceId || `${sourceId}:${bonuses.length}`;
      if (sourceIds.has(instanceKey)) {
        duplicateInstances.push(instanceKey);
        return;
      }
      sourceIds.add(instanceKey);
      bonuses.push(official.bonus || ZERO_ATTRIBUTES);
      if (["armadura", "escudo"].includes(official.categoryId)) defense += finite(official.bonus?.def);
    });

    return { bonus: add(...bonuses), defense, duplicateInstances };
  }

  function calculateCharacterStats(character = {}, catalogs = {}, context = {}) {
    const base = attributes(character.base);
    const development = attributes(character.development);
    const raceBonus = attributes(byId(catalogs.races, character.raceId)?.bonus);
    const classBonus = attributes(byId(catalogs.classes, character.classId)?.bonus);
    const affinityBonus = attributes(byId(catalogs.affinities, character.affinityId)?.bonus);
    const equipment = officialEquipmentBonus(character, catalogs);
    const equipmentBonus = equipment.bonus;
    const temporaryBonus = attributes(context.temporaryBonus || context.effects);
    const penalties = attributes(context.penalties);
    const positive = add(base, development, raceBonus, classBonus, affinityBonus, equipmentBonus, temporaryBonus);
    const total = Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [key, Math.max(0, positive[key] - penalties[key])]));
    const defense = Math.max(0, equipment.defense + finite(context.defenseBonus) - finite(context.defensePenalty));
    const hpMax = Math.max(1, 10 + total.res * 5 + finite(context.hpBonus));
    const ppMax = Math.max(0, 10 + total.pod * 3 + finite(context.ppBonus));

    return {
      base,
      development,
      raceBonus,
      classBonus,
      affinityBonus,
      equipmentBonus,
      temporaryBonus,
      penalties,
      total,
      derived: { def: defense, hpMax, ppMax },
      diagnostics: { duplicateEquipmentInstances: equipment.duplicateInstances },
    };
  }

  function validateBaseAllocation(base = {}) {
    const normalized = attributes(base);
    const values = ATTRIBUTE_KEYS.map((key) => normalized[key]);
    const integer = values.every(Number.isInteger);
    const withinRange = values.every((value) => value >= 2 && value <= 6);
    const spent = values.reduce((sum, value) => sum + value, 0);
    return { valid: integer && withinRange && spent === 20, integer, withinRange, spent, remaining: 20 - spent, normalized };
  }

  function diagnoseAttributeSources(character = {}, catalogs = {}, context = {}) {
    const stats = calculateCharacterStats(character, catalogs, context);
    const issues = [];
    const baseValues = ATTRIBUTE_KEYS.map((key) => finite(character.base?.[key]));
    if (baseValues.some((value) => !Number.isFinite(value))) issues.push({ code: "base-nan", severity: "critical", message: "A base contém um valor inválido." });
    if (baseValues.some((value) => value < 0)) issues.push({ code: "base-negative", severity: "critical", message: "A base contém atributo negativo." });
    if (baseValues.some((value) => value > 6)) issues.push({ code: "base-over-cap", severity: "critical", message: "A base contém atributo acima do limite inicial 6." });
    if (character.creationLocked && baseValues.reduce((sum, value) => sum + value, 0) !== 20) issues.push({ code: "base-sum", severity: "high", message: "A soma da base bloqueada não é 20." });
    if (finite(character.freePoints) < 0) issues.push({ code: "free-points-negative", severity: "critical", message: "Pontos de Desenvolvimento estão negativos." });
    if (stats.diagnostics.duplicateEquipmentInstances.length) issues.push({ code: "equipment-duplicate", severity: "high", message: "Um item equipado foi contado mais de uma vez.", instances: stats.diagnostics.duplicateEquipmentInstances });
    if (character.affinitySnapshot?.bonus && character.affinityId && JSON.stringify(attributes(character.affinitySnapshot.bonus)) === JSON.stringify(stats.affinityBonus)) {
      issues.push({ code: "snapshot-present", severity: "info", message: "Snapshot de afinidade preservado apenas para histórico; o cálculo usa o catálogo oficial." });
    }
    return { ok: !issues.some((issue) => ["critical", "high"].includes(issue.severity)), issues, stats };
  }

  function manifestationGrade(character = {}, statsResult = null) {
    const stats = statsResult || { total: attributes(character.base) };
    const total = ATTRIBUTE_KEYS.reduce((sum, key) => sum + finite(stats.total?.[key]), 0);
    const officialMilestones = finite(character.level) * 3
      + finite(character.prestige) / 20
      + finite(character.approvedMissionCount) * 2
      + finite(character.approvedPowerCount) * 4
      + finite(character.approvedTechniqueCount) * 2;
    const score = Math.max(0, total + officialMilestones);
    const grades = [
      { id: "latent", name: "Latente", threshold: 0 },
      { id: "awakened", name: "Desperto", threshold: 40 },
      { id: "ascending", name: "Ascendente", threshold: 70 },
      { id: "exceptional", name: "Excepcional", threshold: 105 },
      { id: "legendary", name: "Lendário", threshold: 150 },
      { id: "transcendent", name: "Transcendente", threshold: 220 },
    ];
    let current = grades[0];
    grades.forEach((grade) => { if (score >= grade.threshold) current = grade; });
    const next = grades[grades.indexOf(current) + 1] || current;
    const span = Math.max(1, next.threshold - current.threshold);
    const progress = current === next ? 100 : Math.min(100, Math.round(((score - current.threshold) / span) * 100));
    return { ...current, score: Math.round(score), next: next.name, progress };
  }

  function potentialProfile(statsResult) {
    const total = statsResult.total;
    const values = {
      potency: Math.round((total.for + total.pod) / 2),
      mobility: Math.round((total.vel + total.hab) / 2),
      control: Math.round((total.hab + total.pod) / 2),
      survival: Math.round((total.res + statsResult.derived.def) / 2),
      versatility: Math.round(ATTRIBUTE_KEYS.reduce((sum, key) => sum + total[key], 0) / ATTRIBUTE_KEYS.length),
    };
    const labels = { potency: "Potência", mobility: "Mobilidade", control: "Controle", survival: "Sobrevivência", versatility: "Versatilidade" };
    const sorted = Object.entries(values).sort((a, b) => b[1] - a[1]);
    return { values, dominant: labels[sorted[0][0]], developing: labels[sorted.at(-1)[0]] };
  }

  function migrationPreview(character = {}) {
    const legacy = structuredClone(character);
    const migrated = {
      ownerId: character.ownerId || character.id || "",
      playerName: character.playerName || character.displayName || "",
      characterName: character.characterName || "",
      pronouns: character.pronouns || "",
      apparentAge: character.apparentAge ?? character.characterAge ?? "",
      realAge: character.realAge ?? "",
      originType: character.originType || "Retornado",
      raceId: character.raceId || "humano",
      classId: character.classId || "guerreiro",
      cultureId: character.cultureId || "",
      professionId: character.professionId || "",
      kingdomId: character.kingdomId || "",
      regionId: character.regionId || "",
      currentLocation: character.currentLocation || "Limiar das Cortinas",
      affinityId: character.affinityId || "",
      base: attributes(character.base),
      development: attributes(character.development),
      level: finite(character.level) || 1,
      xp: finite(character.xp),
      prestige: finite(character.prestige),
      physicalState: character.physicalState || "Íntegro",
      essenceState: character.essenceState || "Plena",
      creationStatus: character.creationStatus || (character.creationLocked ? "registered" : "draft"),
      technicalCreationComplete: Boolean(character.technicalCreationComplete || character.creationLocked),
      narrativeCreationComplete: Boolean(character.narrativeCreationComplete),
      activeTitleId: character.activeTitleId || "",
      guildId: character.guildId || "",
      factionId: character.factionId || "",
      avatarUrl: character.avatarUrl || "",
      bannerUrl: character.bannerUrl || "",
      mediaFocus: character.mediaFocus || {
        avatar: { x: finite(character.avatarFocusX) || 50, y: finite(character.avatarFocusY) || 50, zoom: finite(character.avatarZoom) || 1 },
        banner: { x: finite(character.bannerFocusX) || 50, y: finite(character.bannerFocusY) || 50, zoom: finite(character.bannerZoom) || 1 },
      },
      migrationVersion: 31,
    };
    const lore = {
      description: character.characterDescription || "",
      personality: character.personality || "",
      history: character.story || "",
      primaryGoal: character.objective || "",
      fear: character.fear || "",
      playerLimits: character.playerLimits || "",
    };
    return {
      alreadyMigrated: finite(character.migrationVersion) >= 31,
      legacy,
      migrated,
      lore,
      counts: {
        inventory: (character.inventory || []).length,
        pets: (character.pets || []).length + (character.gachaVault || []).filter((item) => item.kind === "pet").length,
        titles: (character.titles || []).length,
        powers: (character.powers || []).length,
        techniques: (character.techniques || []).filter((entry) => entry?.name || entry?.description).length,
      },
    };
  }

  function publicProfileProjection(character = {}, catalogs = {}, profile = {}) {
    return {
      ownerId: character.ownerId || profile.id || "",
      name: character.characterName || "Personagem sem nome",
      player: profile.displayName || character.playerName || "Player",
      avatar: character.avatarUrl || "",
      banner: character.bannerUrl || "",
      title: character.activeTitleId || "",
      race: byId(catalogs.races, character.raceId)?.name || "",
      class: byId(catalogs.classes, character.classId)?.name || "",
      affinity: byId(catalogs.affinities, character.affinityId)?.name || "",
      culture: byId(catalogs.cultures, character.cultureId)?.name || character.culture || "",
      profession: byId(catalogs.professions, character.professionId)?.name || character.profession || "",
      kingdom: byId(catalogs.kingdoms, character.kingdomId)?.name || "",
      region: byId(catalogs.regions, character.regionId)?.name || "",
      guild: character.guildId || "",
      location: character.currentLocation || "",
      publicPhrase: character.publicPhrase || "",
      privacy: character.profilePublic === false ? "private" : "public",
    };
  }

  window.MILLENNIUM_CORE_31 = Object.freeze({
    ATTRIBUTE_KEYS,
    ZERO_ATTRIBUTES,
    calculateCharacterStats,
    validateBaseAllocation,
    diagnoseAttributeSources,
    manifestationGrade,
    potentialProfile,
    migrationPreview,
    publicProfileProjection,
  });
}());
