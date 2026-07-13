(function exposeMillenniumCore() {
  "use strict";

  const ATTRIBUTE_KEYS = Object.freeze(["for", "vel", "hab", "res", "pod"]);
  const WORLD = window.MILLENNIUM_WORLD_ALIVE_32 || { itemMatch: (instance, catalog) => (catalog || []).find((item) => item?.id === (instance?.catalogId || instance?.itemId || instance?.sourceId || instance?.id)) || null };
  const ZERO_ATTRIBUTES = Object.freeze({ for: 0, vel: 0, hab: 0, res: 0, pod: 0 });
  const BASE_MIN = 0;
  const BASE_MAX = Number.POSITIVE_INFINITY;
  const BASE_TOTAL = 20;

  function numeric(value) {
    if (typeof value === "string" && value.trim() === "") return { valid: false, value: 0 };
    const parsed = Number(value);
    return Number.isFinite(parsed) ? { valid: true, value: parsed } : { valid: false, value: 0 };
  }

  const finite = (value, fallback = 0) => {
    const parsed = numeric(value);
    return parsed.valid ? parsed.value : fallback;
  };

  const byId = (items, id) => (items || []).find((item) => item?.id === id) || null;

  function rawAttributes(source = {}) {
    return Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [key, source?.[key]]));
  }

  function attributes(source = {}, options = {}) {
    const minimum = Number.isFinite(options.min) ? options.min : Number.NEGATIVE_INFINITY;
    const maximum = Number.isFinite(options.max) ? options.max : Number.POSITIVE_INFINITY;
    const integer = Boolean(options.integer);
    return Object.fromEntries(ATTRIBUTE_KEYS.map((key) => {
      const parsed = numeric(source?.[key]);
      if (!parsed.valid) return [key, finite(options.fallback, 0)];
      const normalized = integer ? Math.trunc(parsed.value) : parsed.value;
      return [key, Math.max(minimum, Math.min(maximum, normalized))];
    }));
  }

  function add(...sources) {
    return Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [
      key,
      sources.reduce((sum, source) => sum + finite(source?.[key]), 0),
    ]));
  }

  function inspectAttributeMap(source, options = {}) {
    const minimum = Number.isFinite(options.min) ? options.min : Number.NEGATIVE_INFINITY;
    const maximum = Number.isFinite(options.max) ? options.max : Number.POSITIVE_INFINITY;
    const requireInteger = Boolean(options.integer);
    const requireAll = options.requireAll !== false;
    const sourceMap = source && typeof source === "object" && !Array.isArray(source) ? source : {};
    const missingKeys = requireAll ? ATTRIBUTE_KEYS.filter((key) => !(key in sourceMap)) : [];
    const unexpectedKeys = Object.keys(sourceMap).filter((key) => !ATTRIBUTE_KEYS.includes(key));
    const invalidKeys = [];
    const nonIntegerKeys = [];
    const belowMinimumKeys = [];
    const aboveMaximumKeys = [];
    const normalized = {};

    ATTRIBUTE_KEYS.forEach((key) => {
      const parsed = numeric(sourceMap[key]);
      if (!parsed.valid) {
        invalidKeys.push(key);
        normalized[key] = 0;
        return;
      }
      normalized[key] = parsed.value;
      if (requireInteger && !Number.isInteger(parsed.value)) nonIntegerKeys.push(key);
      if (parsed.value < minimum) belowMinimumKeys.push(key);
      if (parsed.value > maximum) aboveMaximumKeys.push(key);
    });

    return {
      valid: !missingKeys.length
        && !unexpectedKeys.length
        && !invalidKeys.length
        && !nonIntegerKeys.length
        && !belowMinimumKeys.length
        && !aboveMaximumKeys.length,
      normalized,
      missingKeys,
      unexpectedKeys,
      invalidKeys,
      nonIntegerKeys,
      belowMinimumKeys,
      aboveMaximumKeys,
    };
  }

  function officialEquipmentBonus(character = {}, catalogs = {}) {
    const itemCatalog = catalogs.items || [];
    const inventory = Array.isArray(character.inventory) ? character.inventory : [];
    const equipped = inventory.filter((item) => item?.equipped);
    const seenInstances = new Set();
    const bonuses = [];
    const duplicateInstances = [];
    const unresolvedItems = [];
    let defense = 0;

    equipped.forEach((instance, index) => {
      const sourceId = instance.catalogId || instance.itemId || instance.sourceId || instance.id || "";
      const official = WORLD.itemMatch(instance, itemCatalog) || byId(itemCatalog, sourceId);
      const instanceKey = instance.instanceId || instance.uid || instance.inventoryId || "";

      if (instanceKey && seenInstances.has(instanceKey)) {
        duplicateInstances.push(instanceKey);
        return;
      }
      if (instanceKey) seenInstances.add(instanceKey);
      if (!official) {
        unresolvedItems.push({ index, sourceId, instanceId: instanceKey, name: instance.name || "" });
        return;
      }

      bonuses.push(official.bonus || ZERO_ATTRIBUTES);
      if (["armadura", "escudo"].includes(official.categoryId)) {
        defense += finite(official.bonus?.def);
      }
    });

    return {
      bonus: add(...bonuses),
      defense,
      duplicateInstances,
      unresolvedItems,
    };
  }

  function calculateCharacterStats(character = {}, catalogs = {}, context = {}) {
    const baseInspection = inspectAttributeMap(character.base, {
      min: 0,
      integer: true,
      requireAll: true,
    });
    const developmentInspection = inspectAttributeMap(character.development || ZERO_ATTRIBUTES, {
      min: 0,
      integer: true,
      requireAll: true,
    });

    // Corrupted values are quarantined for calculations, but retained in raw diagnostics.
    // Nothing is silently written back to Firestore.
    const base = attributes(character.base, { min: 0, integer: true });
    const development = attributes(character.development, { min: 0, integer: true });
    const race = byId(catalogs.races, character.raceId);
    const classEntry = byId(catalogs.classes, character.classId);
    const affinity = byId(catalogs.affinities, character.affinityId);
    const raceBonus = attributes(race?.bonus);
    const classBonus = attributes(classEntry?.bonus);
    const affinityBonus = attributes(affinity?.bonus);
    const equipment = officialEquipmentBonus(character, catalogs);
    const equipmentBonus = equipment.bonus;
    const temporaryBonus = attributes(context.temporaryBonus || context.effects);
    const penalties = attributes(context.penalties, { min: 0 });
    const positive = add(base, development, raceBonus, classBonus, affinityBonus, equipmentBonus, temporaryBonus);
    const total = Object.fromEntries(ATTRIBUTE_KEYS.map((key) => [key, Math.max(0, positive[key] - penalties[key])]));
    const defense = Math.max(0, equipment.defense + finite(context.defenseBonus) - finite(context.defensePenalty));
    const hpMax = Math.max(1, 10 + total.res * 5 + finite(context.hpBonus));
    const ppMax = Math.max(0, 10 + total.pod * 3 + finite(context.ppBonus));

    const unresolvedCatalogs = [];
    if (character.raceId && !race) unresolvedCatalogs.push({ type: "race", id: character.raceId });
    if (character.classId && !classEntry) unresolvedCatalogs.push({ type: "class", id: character.classId });
    if (character.affinityId && !affinity) unresolvedCatalogs.push({ type: "affinity", id: character.affinityId });

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
      raw: {
        base: rawAttributes(character.base),
        development: rawAttributes(character.development),
      },
      diagnostics: {
        baseInspection,
        developmentInspection,
        quarantinedBaseKeys: [
          ...baseInspection.invalidKeys,
          ...baseInspection.nonIntegerKeys,
          ...baseInspection.belowMinimumKeys,
          ...baseInspection.aboveMaximumKeys,
        ].filter((value, index, list) => list.indexOf(value) === index),
        duplicateEquipmentInstances: equipment.duplicateInstances,
        unresolvedEquipmentItems: equipment.unresolvedItems,
        unresolvedCatalogs,
      },
    };
  }

  function validateBaseAllocation(base = {}) {
    const inspection = inspectAttributeMap(base, {
      min: BASE_MIN,
      integer: true,
      requireAll: true,
    });
    const values = ATTRIBUTE_KEYS.map((key) => inspection.normalized[key] || 0);
    const spent = values.reduce((sum, value) => sum + value, 0);
    const errors = [];

    if (inspection.missingKeys.length) errors.push(`Faltam atributos: ${inspection.missingKeys.join(", ")}.`);
    if (inspection.unexpectedKeys.length) errors.push("A base contém campos de atributo não reconhecidos.");
    if (inspection.invalidKeys.length) errors.push("Use somente números válidos nos cinco atributos.");
    if (inspection.nonIntegerKeys.length) errors.push("Atributos-base aceitam apenas números inteiros.");
    if (inspection.belowMinimumKeys.length) errors.push("Atributos-base não podem ser negativos.");
    if (spent !== BASE_TOTAL) errors.push(`Distribua exatamente ${BASE_TOTAL} pontos-base.`);

    return {
      ...inspection,
      valid: inspection.valid && spent === BASE_TOTAL,
      integer: !inspection.nonIntegerKeys.length,
      withinRange: !inspection.belowMinimumKeys.length,
      spent,
      remaining: BASE_TOTAL - spent,
      normalized: inspection.normalized,
      errors,
    };
  }

  function validateDevelopmentSpend(character = {}, attribute) {
    const errors = [];
    if (!ATTRIBUTE_KEYS.includes(attribute)) errors.push("Atributo de desenvolvimento desconhecido.");
    if (!character.creationLocked) errors.push("A ficha técnica precisa estar bloqueada antes da evolução.");

    const freePoints = numeric(character.freePoints);
    if (!freePoints.valid || !Number.isInteger(freePoints.value) || freePoints.value < 1) {
      errors.push("Nenhum Ponto de Desenvolvimento válido está disponível.");
    }

    const inspection = inspectAttributeMap(character.development || ZERO_ATTRIBUTES, {
      min: 0,
      integer: true,
      requireAll: true,
    });
    if (!inspection.valid) errors.push("A distribuição de desenvolvimento atual está inconsistente.");

    const previous = ATTRIBUTE_KEYS.includes(attribute) ? inspection.normalized[attribute] : 0;
    return {
      valid: errors.length === 0,
      errors,
      attribute,
      previous,
      next: previous + 1,
      freePoints: freePoints.valid ? freePoints.value : 0,
      nextFreePoints: freePoints.valid ? freePoints.value - 1 : 0,
      development: inspection.normalized,
    };
  }

  function diagnoseAttributeSources(character = {}, catalogs = {}, context = {}) {
    const stats = calculateCharacterStats(character, catalogs, context);
    const issues = [];
    const base = stats.diagnostics.baseInspection;
    const development = stats.diagnostics.developmentInspection;
    const rawBaseValues = ATTRIBUTE_KEYS.map((key) => numeric(character.base?.[key]));
    const rawBaseSum = rawBaseValues.every((entry) => entry.valid)
      ? rawBaseValues.reduce((sum, entry) => sum + entry.value, 0)
      : null;

    if (base.missingKeys.length) issues.push({ code: "base-missing", severity: "critical", message: `A base não possui todos os cinco atributos (${base.missingKeys.join(", ")}).`, keys: base.missingKeys });
    if (base.invalidKeys.length) issues.push({ code: "base-invalid", severity: "critical", message: "A base contém valor vazio, NaN ou infinito.", keys: base.invalidKeys });
    if (base.nonIntegerKeys.length) issues.push({ code: "base-non-integer", severity: "critical", message: "A base contém valor fracionário.", keys: base.nonIntegerKeys });
    if (base.belowMinimumKeys.length) issues.push({ code: "base-below-min", severity: "critical", message: "A base contém atributo abaixo do mínimo permitido.", keys: base.belowMinimumKeys });
    if (character.creationLocked && rawBaseSum !== BASE_TOTAL) issues.push({ code: "base-sum", severity: "high", message: `A soma da base bloqueada é ${rawBaseSum ?? "inválida"}; o esperado é ${BASE_TOTAL}.` });

    if (development.missingKeys.length || development.invalidKeys.length || development.nonIntegerKeys.length || development.belowMinimumKeys.length) {
      issues.push({ code: "development-invalid", severity: "critical", message: "Os Pontos de Desenvolvimento possuem estrutura ou valores inválidos." });
    }

    const freePoints = numeric(character.freePoints);
    if (!freePoints.valid || !Number.isInteger(freePoints.value)) issues.push({ code: "free-points-invalid", severity: "critical", message: "O saldo de Pontos de Desenvolvimento não é um inteiro válido." });
    else if (freePoints.value < 0) issues.push({ code: "free-points-negative", severity: "critical", message: "Pontos de Desenvolvimento estão negativos." });

    if (stats.diagnostics.duplicateEquipmentInstances.length) issues.push({ code: "equipment-duplicate", severity: "high", message: "Uma mesma instância equipada foi contada mais de uma vez.", instances: stats.diagnostics.duplicateEquipmentInstances });
    if (stats.diagnostics.unresolvedEquipmentItems.length) issues.push({ code: "equipment-unresolved", severity: "warning", message: "Há equipamento equipado sem item correspondente no catálogo. Use a associação de item legado no painel do Oráculo.", items: stats.diagnostics.unresolvedEquipmentItems });
    if (stats.diagnostics.unresolvedCatalogs.length) issues.push({ code: "catalog-reference-missing", severity: "high", message: "A ficha referencia raça, classe ou afinidade inexistente no catálogo atual.", references: stats.diagnostics.unresolvedCatalogs });

    if (character.affinitySnapshot?.bonus && character.affinityId) {
      issues.push({ code: "snapshot-present", severity: "info", message: "Snapshot de afinidade preservado apenas para histórico; o cálculo usa o catálogo oficial." });
    }
    if (character.attributes || character.stats || character.totalAttributes) {
      issues.push({ code: "legacy-total-present", severity: "info", message: "Foi encontrado um mapa legado de totais. Ele não participa do cálculo oficial." });
    }

    return {
      ok: !issues.some((issue) => ["critical", "high"].includes(issue.severity)),
      issues,
      stats,
      summary: {
        critical: issues.filter((issue) => issue.severity === "critical").length,
        high: issues.filter((issue) => issue.severity === "high").length,
        info: issues.filter((issue) => issue.severity === "info").length,
      },
    };
  }

  function manifestationGrade(character = {}, statsResult = null) {
    const stats = statsResult || { total: attributes(character.base, { min: 0, integer: true }) };
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

  function potentialProfile(statsResult = {}) {
    const total = attributes(statsResult.total, { min: 0 });
    const defense = Math.max(0, finite(statsResult.derived?.def));
    const values = {
      potency: Math.round((total.for + total.pod) / 2),
      mobility: Math.round((total.vel + total.hab) / 2),
      control: Math.round((total.hab + total.pod) / 2),
      survival: Math.round((total.res + defense) / 2),
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
      base: attributes(character.base, { min: 0, integer: true }),
      development: attributes(character.development, { min: 0, integer: true }),
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
    BASE_MIN,
    BASE_MAX,
    BASE_TOTAL,
    calculateCharacterStats,
    validateBaseAllocation,
    validateDevelopmentSpend,
    diagnoseAttributeSources,
    manifestationGrade,
    potentialProfile,
    migrationPreview,
    publicProfileProjection,
  });
}());
