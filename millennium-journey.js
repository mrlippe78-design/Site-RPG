(function exposeMillenniumJourney() {
  const ESSENTIAL_STEPS = Object.freeze([
    { id: "premise", label: "Conhecer a premissa", nav: "player-home", description: "Entenda o que é Millennium, a Interface do Oráculo e a diferença entre Retornado e Nativo." },
    { id: "identity", label: "Registrar identidade", nav: "character", description: "Informe player, personagem, pronomes e origem." },
    { id: "heritage", label: "Escolher herança", nav: "character", description: "Escolha uma das raças canônicas e veja seus bônus separados da base." },
    { id: "formation", label: "Escolher formação", nav: "character", description: "Escolha uma das quatro classes canônicas e compreenda sua função." },
    { id: "origin", label: "Definir origem", nav: "character", description: "Registre reino, região, cultura, ofício e localização inicial." },
    { id: "attributes", label: "Distribuir atributos", nav: "character", description: "Distribua exatamente 20 pontos-base entre FOR, VEL, HAB, RES e POD." },
    { id: "technical", label: "Confirmar registro", nav: "character", description: "Conclua a parte técnica sem exigir uma história longa." },
    { id: "affinity", label: "Revelar afinidade", nav: "roulette", description: "Descubra a assinatura elemental ou espiritual registrada pela Interface." },
    { id: "profile", label: "Revisar perfil", nav: "profile", description: "Confira como seu personagem aparece publicamente." },
    { id: "life", label: "Começar Dar Vida", nav: "character-life", description: "Registre essência, passado, direção, interpretação e limites narrativos." },
    { id: "creations", label: "Conhecer Criações", nav: "creations", description: "Entenda como poderes e técnicas passam pela análise do Oráculo." },
    { id: "codex", label: "Abrir o Codex", nav: "codex", description: "Consulte reinos, regiões, culturas, ofícios e regras do mundo." },
  ]);

  const NARRATIVE_FIELDS = Object.freeze([
    "description", "personality", "virtues", "flaws", "habits", "beliefs",
    "history", "originWorld", "milestones", "importantPeople", "traumas", "secrets",
    "primaryGoal", "secondaryGoal", "fear", "desire", "internalConflict",
    "speech", "moralLimits", "initialRelations", "publicPhrase",
    "playerLimits", "warningThemes", "consentThemes", "forbiddenThemes",
  ]);

  const normalizeText = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  function narrativeProgress(source = {}) {
    const completed = NARRATIVE_FIELDS.filter((field) => String(source[field] || "").trim().length >= 3).length;
    return {
      completed,
      total: NARRATIVE_FIELDS.length,
      percentage: Math.round((completed / NARRATIVE_FIELDS.length) * 100),
    };
  }

  function stepState(character = {}, context = {}) {
    const base = character.base || {};
    const baseKeys = ["for", "vel", "hab", "res", "pod"];
    const validBase = baseKeys.every((key) => Number.isInteger(Number(base[key])) && Number(base[key]) >= 2 && Number(base[key]) <= 6)
      && baseKeys.reduce((sum, key) => sum + Number(base[key] || 0), 0) === 20;
    const lore = context.lore || character.lore || {};
    const narrative = narrativeProgress(lore);
    const catalogVisited = context.catalogVisited || {};
    return {
      premise: Boolean(context.premiseSeen || character.onboardingPremiseSeen || context.tutorialSeen),
      identity: Boolean(character.playerName && character.characterName),
      heritage: Boolean(character.raceId),
      formation: Boolean(character.classId),
      origin: Boolean(character.kingdomId && character.regionId && (character.cultureId || character.culture) && (character.professionId || character.profession)),
      attributes: validBase,
      technical: Boolean(character.technicalCreationComplete || character.creationLocked),
      affinity: Boolean(character.affinityId),
      profile: Boolean(context.profileReviewed || character.profileReviewedAt || character.profilePublic),
      life: narrative.completed > 0 || Boolean(character.narrativeCreationComplete),
      creations: Boolean(context.creationsVisited || character.creationsIntroducedAt),
      codex: Boolean(context.codexVisited || catalogVisited.codex || character.codexIntroducedAt),
    };
  }

  function journeyProgress(character = {}, context = {}) {
    const state = stepState(character, context);
    const steps = ESSENTIAL_STEPS.map((step) => ({ ...step, done: Boolean(state[step.id]) }));
    const completed = steps.filter((step) => step.done).length;
    const next = steps.find((step) => !step.done) || steps.at(-1);
    return { steps, completed, total: steps.length, percentage: Math.round((completed / steps.length) * 100), next, complete: completed === steps.length };
  }

  function catalogSearch(entries = [], query = "", category = "all") {
    const needle = normalizeText(query);
    return entries.filter((entry) => {
      const categoryMatch = category === "all" || normalizeText(entry.category) === normalizeText(category) || normalizeText(entry.kingdomId) === normalizeText(category);
      if (!categoryMatch) return false;
      if (!needle) return true;
      const haystack = normalizeText([
        entry.name,
        entry.summary,
        entry.category,
        ...(entry.keywords || []),
        ...(entry.values || []),
        ...(entry.activities || []),
        ...(entry.knowledge || []),
      ].join(" "));
      return haystack.includes(needle);
    });
  }

  function catalogIntegrity(catalogs = {}) {
    const issues = [];
    const cultures = catalogs.cultures || [];
    const professions = catalogs.professions || [];
    const ids = new Set();
    [...cultures, ...professions].forEach((entry) => {
      if (!entry?.id || !entry?.name) issues.push({ code: "missing-identity", id: entry?.id || "unknown" });
      const scoped = `${cultures.includes(entry) ? "culture" : "profession"}:${entry?.id}`;
      if (ids.has(scoped)) issues.push({ code: "duplicate-id", id: scoped });
      ids.add(scoped);
    });
    cultures.forEach((entry) => {
      if (entry.bonus) issues.push({ code: "culture-attribute-bonus", id: entry.id });
      if (!Array.isArray(entry.languages) || !Array.isArray(entry.startingKnowledge)) issues.push({ code: "culture-incomplete", id: entry.id });
    });
    professions.forEach((entry) => {
      if (entry.bonus) issues.push({ code: "profession-attribute-bonus", id: entry.id });
      if (!Array.isArray(entry.activities) || !Array.isArray(entry.knowledge)) issues.push({ code: "profession-incomplete", id: entry.id });
    });
    return { ok: issues.length === 0, issues, cultureCount: cultures.length, professionCount: professions.length };
  }

  function nextMilestone(grade = {}) {
    if (grade.progress >= 100 || grade.next === grade.name) return "Grau máximo registrado";
    return `${Math.max(0, 100 - Number(grade.progress || 0))}% até ${grade.next}`;
  }

  window.MILLENNIUM_JOURNEY_31 = Object.freeze({
    ESSENTIAL_STEPS,
    NARRATIVE_FIELDS,
    normalizeText,
    narrativeProgress,
    stepState,
    journeyProgress,
    catalogSearch,
    catalogIntegrity,
    nextMilestone,
  });
}());
