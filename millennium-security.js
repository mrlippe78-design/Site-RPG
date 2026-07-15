(function exposeMillenniumSecurity() {
  const CONFIG = window.MILLENNIUM_SECURITY_CONFIG || {};
  const BUILD = window.MILLENNIUM_BUILD_INFO?.version || CONFIG.version || "3.6.4-r3";
  const FIRESTORE_CONTRACT = "3.6.4-r3-gacha-sync";
  const SENSITIVE_FIELDS = new Set([
    "gold", "millenniumCoins", "affinityAttempts", "pityCounter", "totalRolls",
    "totalRares", "prestige", "rollHistory", "affinityId", "affinitySnapshot",
    "gachaVault", "inventory", "gachaHistory", "gachaFragments", "gachaEnergy",
    "gachaEnergyUpdatedAt", "activeActivities", "huntCompletionKeys", "huntHistory",
    "minigameCompletionKeys", "minigameProgress", "minigameStats", "minigameHistory",
    "lastAimRun", "lastTowerRun", "lastSealRun", "lastCartographyRun",
    "lastAlchemyRun", "seasonPassXp", "passMissionClaims", "passClaims",
    "premiumPassUnlocked", "marketHistory", "tokens", "titles", "pets", "shopHistory",
    "minigameEventAttempts", "monsterSchemaVersion", "monsterInstances", "monsterInventory",
    "monsterResources", "monsterTeams", "monsterEconomyVersion", "monsterGachaPity",
    "monsterGachaHistory", "monsterFirstTenClaimed", "monsterDungeon", "monsterDungeonHistory",
    "monsterArena", "monsterArenaHistory", "arenaDefenseSnapshot", "arenaFragments",
    "arenaShopPurchases", "arenaShopHistory", "monsterWorldBoss", "monsterWorldBossHistory",
  ]);
  const RESTORABLE_FIELDS = [...SENSITIVE_FIELDS];
  const SUMMARY_FIELDS = Object.freeze([
    ["gold", "gold", 0],
    ["millenniumCoins", "coins", 0],
    ["affinityAttempts", "attempts", 0],
    // Fichas anteriores ao sistema de energia nao possuem o campo. O restante
    // do site e as regras sempre trataram essa ausencia como a carga cheia.
    ["gachaEnergy", "energy", 30],
    ["pityCounter", "pity", 0],
    ["totalRolls", "rolls", 0],
    ["totalRares", "rares", 0],
    ["seasonPassXp", "passXp", 0],
  ]);
  const runtime = {
    installed: false,
    originalWriteDoc: null,
    user: null,
    profile: null,
    role: "player",
    profileUnsub: null,
    character: null,
    bridgeInstalled: false,
    alertUnsub: null,
    pendingAlert: false,
    snapshotVerifyPromise: null,
    snapshotVerifiedUid: "",
    snapshotVerifyTimer: 0,
    shellTimer: 0,
    lastIntent: { action: "", form: "", at: 0 },
    sessionId: sessionStorage.getItem("millennium:security-session") || randomId("session"),
    deniedSignals: new Map(),
    modalOpen: false,
    observer: null,
  };
  sessionStorage.setItem("millennium:security-session", runtime.sessionId);
  window.MILLENNIUM_SECURITY_ACTIVE_LISTENERS = 0;
  window.MILLENNIUM_SECURITY_VERIFICATIONS = 0;

  function randomId(prefix = "sec") {
    const bytes = new Uint8Array(12);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
    return `${prefix}-${Date.now().toString(36)}-${[...bytes].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
  }

  function db() {
    return window.firebase?.firestore ? firebase.firestore() : null;
  }

  function authUser() {
    return window.firebase?.auth ? firebase.auth().currentUser : null;
  }

  function serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  function timestampFromMillis(value) {
    return firebase.firestore.Timestamp.fromMillis(value);
  }

  function asMillis(value) {
    if (!value) return 0;
    if (typeof value?.toMillis === "function") return value.toMillis();
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value;
    return Date.parse(value) || 0;
  }

  function normalizedValue(value) {
    if (typeof value?.toMillis === "function") return value.toMillis();
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) return value.map(normalizedValue);
    if (value && typeof value === "object") {
      return Object.keys(value).sort().reduce((result, key) => {
        result[key] = normalizedValue(value[key]);
        return result;
      }, {});
    }
    return value;
  }

  function stableStringify(value) {
    return JSON.stringify(normalizedValue(value));
  }

  function fingerprint(value) {
    const text = stableStringify(value);
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `fnv1a-${(hash >>> 0).toString(16).padStart(8, "0")}-${text.length}`;
  }

  function cloneForFirestore(value) {
    if (Array.isArray(value)) return value.map(cloneForFirestore);
    if (value && typeof value === "object") {
      if (typeof value.toDate === "function" || value instanceof Date) return value;
      return Object.keys(value).reduce((result, key) => {
        if (value[key] !== undefined) result[key] = cloneForFirestore(value[key]);
        return result;
      }, {});
    }
    return value;
  }

  function snapshotState(character = {}) {
    return RESTORABLE_FIELDS.reduce((result, key) => {
      if (Object.prototype.hasOwnProperty.call(character, key)) result[key] = cloneForFirestore(character[key]);
      return result;
    }, {});
  }

  function numeric(value) {
    const number = Number(value || 0);
    return Number.isFinite(number) ? number : NaN;
  }

  function summary(character = {}) {
    const result = {};
    SUMMARY_FIELDS.forEach(([source, target, fallback]) => {
      result[target] = numeric(character[source] ?? fallback);
    });
    result.inventoryCount = Array.isArray(character.inventory) ? character.inventory.length : 0;
    result.vaultCount = Array.isArray(character.gachaVault) ? character.gachaVault.length : 0;
    result.tokenCount = Array.isArray(character.tokens) ? character.tokens.length : 0;
    result.titleCount = Array.isArray(character.titles) ? character.titles.length : 0;
    result.petCount = Array.isArray(character.pets) ? character.pets.length : 0;
    result.monsterCount = Array.isArray(character.monsterInstances) ? character.monsterInstances.length : 0;
    result.monsterInventoryCount = Array.isArray(character.monsterInventory) ? character.monsterInventory.length : 0;
    result.arenaFragments = numeric(character.arenaFragments);
    result.premiumPass = character.premiumPassUnlocked === true;
    return result;
  }

  function delta(before, after) {
    const result = {};
    Object.keys(after).forEach((key) => {
      if (typeof after[key] === "number" && typeof before[key] === "number") result[key] = after[key] - before[key];
    });
    result.premiumPassChanged = before.premiumPass !== after.premiumPass;
    return result;
  }

  function changedSensitiveFields(patch = {}) {
    return Object.keys(patch).filter((key) => SENSITIVE_FIELDS.has(key));
  }

  function rememberIntent(event) {
    const button = event.target?.closest?.("[data-action]");
    if (!button) return;
    runtime.lastIntent = { action: String(button.dataset.action || "").slice(0, 80), form: "", at: Date.now() };
  }

  function rememberForm(event) {
    const form = event.target?.closest?.("form[data-form]");
    if (!form) return;
    runtime.lastIntent = { action: "", form: String(form.dataset.form || "").slice(0, 80), at: Date.now() };
  }

  function resolveAction(patch = {}, options = {}) {
    if (options.securityAction) return String(options.securityAction).slice(0, 80);
    const recent = Date.now() - runtime.lastIntent.at <= 20000 ? runtime.lastIntent : {};
    const declared = recent.action || recent.form || "";
    if (declared) return declared;
    if (Object.prototype.hasOwnProperty.call(patch, "premiumPassUnlocked")) return "premium-pass";
    if (Object.prototype.hasOwnProperty.call(patch, "gachaHistory") || Object.prototype.hasOwnProperty.call(patch, "pityCounter")) return "gacha";
    if (Object.prototype.hasOwnProperty.call(patch, "minigameHistory")) return "minigame-reward";
    if (Object.prototype.hasOwnProperty.call(patch, "monsterInstances") || Object.prototype.hasOwnProperty.call(patch, "monsterInventory")) return "monster-operation";
    if (Object.prototype.hasOwnProperty.call(patch, "arenaFragments")) return "monster-arena";
    if (Object.prototype.hasOwnProperty.call(patch, "shopHistory")) return "fragment-shop";
    if (Object.prototype.hasOwnProperty.call(patch, "huntHistory")) return "hunt-reward";
    if (Object.prototype.hasOwnProperty.call(patch, "marketHistory")) return "market-operation";
    if (Object.prototype.hasOwnProperty.call(patch, "seasonPassXp")) return "pass-progress";
    if (Object.prototype.hasOwnProperty.call(patch, "inventory")) return "inventory-operation";
    if (Object.prototype.hasOwnProperty.call(patch, "gachaVault")) return "vault-operation";
    return "economy-update";
  }

  function analyzeMutation(beforeCharacter, afterCharacter, patch, action) {
    const before = summary(beforeCharacter);
    const after = summary(afterCharacter);
    const changes = delta(before, after);
    const reasons = [];
    const lowerAction = String(action || "").toLowerCase();
    const marketAction = /market|auction|refund|trade|listing/.test(lowerAction);
    const rewardAction = /gift|admin|mission|hunt|reward/.test(lowerAction);

    ["gold", "coins", "attempts", "energy", "pity", "rolls", "rares", "passXp"].forEach((field) => {
      if (!Number.isFinite(after[field]) || after[field] < 0) reasons.push({ severity: "critical", code: `invalid-${field}`, detail: `${field} inválido` });
    });
    if (after.energy > 30) reasons.push({ severity: "critical", code: "energy-overflow", detail: "energia acima do limite" });
    if (after.pity > 30) reasons.push({ severity: "critical", code: "pity-overflow", detail: "pity acima do limite" });
    if (changes.rolls > 10) reasons.push({ severity: "critical", code: "roll-burst", detail: `${changes.rolls} giros em uma gravação` });
    if (changes.vaultCount > 10) reasons.push({ severity: "critical", code: "vault-burst", detail: `${changes.vaultCount} pets adicionados` });
    if (changes.inventoryCount > 25) reasons.push({ severity: "critical", code: "inventory-burst", detail: `${changes.inventoryCount} itens adicionados` });
    if (!marketAction && changes.coins > 5000) reasons.push({ severity: "critical", code: "coin-spike", detail: `+${changes.coins} MC` });
    if (!marketAction && !rewardAction && changes.gold > 250000) reasons.push({ severity: "critical", code: "gold-spike", detail: `+${changes.gold} PO` });
    if (changes.passXp > 5000) reasons.push({ severity: "critical", code: "pass-xp-spike", detail: `+${changes.passXp} XP de passe` });
    if (!marketAction && changes.coins > 250) reasons.push({ severity: "high", code: "coin-anomaly", detail: `+${changes.coins} MC` });
    if (!marketAction && !rewardAction && changes.gold > 25000) reasons.push({ severity: "high", code: "gold-anomaly", detail: `+${changes.gold} PO` });
    if (changes.inventoryCount > 12) reasons.push({ severity: "high", code: "inventory-anomaly", detail: `+${changes.inventoryCount} itens` });
    if (changes.passXp > 1500) reasons.push({ severity: "high", code: "pass-xp-anomaly", detail: `+${changes.passXp} XP de passe` });
    if (changes.premiumPassChanged && after.premiumPass && changes.gold !== -1000 && !/admin|gift/.test(lowerAction)) {
      reasons.push({ severity: "high", code: "premium-pass-without-cost", detail: "passe premium liberado sem custo esperado" });
    }
    if (/minigame/.test(lowerAction) && changes.coins > 25) reasons.push({ severity: "high", code: "minigame-reward-overflow", detail: `recompensa de ${changes.coins} MC` });

    const critical = reasons.some((entry) => entry.severity === "critical");
    return {
      blocked: reasons.length > 0,
      severity: critical ? "critical" : reasons.length ? "high" : "normal",
      reasons,
      before,
      after,
      delta: changes,
      changedFields: changedSensitiveFields(patch),
    };
  }

  function incidentTitle(analysis) {
    const first = analysis.reasons[0];
    return first ? `Alteração econômica bloqueada: ${first.detail}` : "Alteração econômica bloqueada";
  }

  function incidentPayload({ uid, incidentId, analysis, action, autoAction, strike, character, source = "client-integrity" }) {
    return {
      incidentId,
      uid,
      characterName: String(character?.characterName || "").slice(0, 120),
      type: analysis.reasons[0]?.code || "integrity-mismatch",
      title: incidentTitle(analysis),
      category: "integridade-economica",
      severity: analysis.severity,
      status: "pending_review",
      source,
      action: String(action || "economy-update").slice(0, 80),
      autoAction,
      strike,
      changedFields: analysis.changedFields.slice(0, 40),
      reasons: analysis.reasons.slice(0, 10),
      before: analysis.before,
      attempted: analysis.after,
      delta: analysis.delta,
      build: BUILD,
      clientSessionId: runtime.sessionId,
      userAgent: navigator.userAgent.slice(0, 500),
      route: location.hash.slice(0, 120),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  }

  function restrictionPatch({ incidentId, analysis, strike }) {
    const now = Date.now();
    const fullSuspension = analysis.severity === "critical" || strike >= Number(CONFIG.suspensionStrikeThreshold || 2);
    const quarantineUntil = now + Number(CONFIG.economyQuarantineMinutes || 60) * 60000;
    const patch = {
      economyQuarantineUntil: timestampFromMillis(quarantineUntil),
      economyQuarantineReason: incidentTitle(analysis).slice(0, 500),
      securityStrikeCount: strike,
      lastSecurityIncidentId: incidentId,
      securityRestrictedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    if (fullSuspension) {
      const suspendedUntil = now + Number(CONFIG.automaticSuspensionHours || 6) * 3600000;
      Object.assign(patch, {
        accountStatus: "suspended",
        status: "suspended",
        suspendedUntil: timestampFromMillis(suspendedUntil),
        bannedUntil: timestampFromMillis(suspendedUntil),
        restrictionReason: `Análise automática de integridade · ${incidentId}`,
        moderationReason: `Análise automática de integridade · ${incidentId}`,
        restrictedAt: serverTimestamp(),
        restrictedBy: "security-system",
      });
    }
    return { patch, autoAction: fullSuspension ? "full_suspension" : "economy_quarantine" };
  }

  function receiptPayload({ receiptId, uid, action, beforeRevision, afterRevision, before, after, changes, changedFields }) {
    return {
      receiptId,
      ownerId: uid,
      action: String(action || "economy-update").slice(0, 80),
      build: BUILD,
      idempotencyKey: `${runtime.sessionId}:${receiptId}`.slice(0, 200),
      clientSessionId: runtime.sessionId,
      beforeRevision,
      afterRevision,
      before,
      after,
      delta: changes,
      changedFields: changedFields.slice(0, 40),
      createdAt: serverTimestamp(),
    };
  }

  async function secureOwnerCharacterWrite(collection, id, data, options = {}) {
    const database = db();
    const user = authUser();
    if (!database || !user || collection !== "characters" || user.uid !== id) return runtime.originalWriteDoc(collection, id, data, options);
    if (runtime.role === "admin") {
      const result = await runtime.originalWriteDoc(collection, id, data, options);
      if (changedSensitiveFields(data).length) await refreshSnapshotAsAdmin(id).catch(() => {});
      return result;
    }
    const sensitive = changedSensitiveFields(data);
    if (!sensitive.length) return runtime.originalWriteDoc(collection, id, data, options);

    const characterRef = database.collection("characters").doc(id);
    const receiptId = randomId("receipt");
    const incidentId = randomId("SEC");
    const action = resolveAction(data, options);
    let transactionResult = { blocked: false };

    try {
      transactionResult = await database.runTransaction(async (transaction) => {
        const userRef = database.collection("users").doc(id);
        const receiptRef = database.collection("economyReceipts").doc(receiptId);
        const snapshotRef = database.collection("securitySnapshots").doc(id);
        const incidentRef = database.collection("securityIncidents").doc(incidentId);
        const characterSnap = await transaction.get(characterRef);
        const userSnap = await transaction.get(userRef);
        if (!characterSnap.exists) return { fallback: true, blocked: false };
        const beforeCharacter = characterSnap.data() || {};
        const userData = userSnap.data() || {};
        const quarantineUntil = asMillis(userData.economyQuarantineUntil);
        if (quarantineUntil > Date.now()) {
          return { blocked: true, quarantined: true, until: quarantineUntil, incidentId: userData.lastSecurityIncidentId || "" };
        }

        const afterCharacter = { ...beforeCharacter, ...cloneForFirestore(data), ownerId: beforeCharacter.ownerId || id };
        const analysis = analyzeMutation(beforeCharacter, afterCharacter, data, action);
        if (analysis.blocked) {
          const strike = Math.max(0, Number(userData.securityStrikeCount || 0)) + 1;
          const restriction = restrictionPatch({ incidentId, analysis, strike });
          transaction.set(incidentRef, incidentPayload({
            uid: id,
            incidentId,
            analysis,
            action,
            autoAction: restriction.autoAction,
            strike,
            character: beforeCharacter,
          }));
          transaction.set(userRef, restriction.patch, { merge: true });
          return { blocked: true, incidentId, analysis, autoAction: restriction.autoAction };
        }

        const beforeRevision = Math.max(0, Number(beforeCharacter.economyRevision || 0));
        const afterRevision = beforeRevision + 1;
        const beforeSummary = summary(beforeCharacter);
        const afterSummary = summary(afterCharacter);
        const changes = delta(beforeSummary, afterSummary);
        const state = snapshotState(afterCharacter);
        const securityPatch = {
          ...cloneForFirestore(data),
          economyRevision: afterRevision,
          lastEconomyReceiptId: receiptId,
          lastEconomyAction: String(action).slice(0, 80),
          lastEconomyAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        transaction.set(receiptRef, receiptPayload({
          receiptId,
          uid: id,
          action,
          beforeRevision,
          afterRevision,
          before: beforeSummary,
          after: afterSummary,
          changes,
          changedFields: sensitive,
        }));
        transaction.set(characterRef, securityPatch, { merge: true });
        transaction.set(snapshotRef, {
          ownerId: id,
          revision: afterRevision,
          receiptId,
          action: String(action).slice(0, 80),
          fingerprint: fingerprint(state),
          state,
          lastAuditId: afterCharacter.lastAuditId || "",
          bootstrap: false,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        return { blocked: false, receiptId, afterRevision };
      });
    } catch (error) {
      await recordDeniedIncident({ action, data, error }).catch(() => {});
      throw error;
    }

    if (transactionResult.fallback) return runtime.originalWriteDoc(collection, id, data, options);
    if (transactionResult.quarantined) {
      openSecurityCenter();
      const until = new Date(transactionResult.until).toLocaleString("pt-BR");
      throw securityError(`Economia em quarentena até ${until}. O restante da conta continua disponível.`);
    }
    if (transactionResult.blocked) {
      openSecurityCenter();
      const label = transactionResult.autoAction === "full_suspension" ? "A conta foi suspensa para análise." : "A economia foi colocada em quarentena por uma hora.";
      throw securityError(`${label} Incidente ${transactionResult.incidentId}.`);
    }
    return undefined;
  }

  function securityError(message) {
    const error = new Error(message);
    error.code = "millennium/security-quarantine";
    return error;
  }

  async function refreshSnapshotAsAdmin(uid) {
    const database = db();
    if (!database || runtime.role !== "admin") return;
    const characterSnap = await database.collection("characters").doc(uid).get();
    if (!characterSnap.exists) return;
    const character = characterSnap.data() || {};
    const state = snapshotState(character);
    await database.collection("securitySnapshots").doc(uid).set({
      ownerId: uid,
      revision: Math.max(0, Number(character.economyRevision || 0)),
      receiptId: character.lastEconomyReceiptId || "admin-audit",
      action: "admin-audit-refresh",
      fingerprint: fingerprint(state),
      state,
      lastAuditId: character.lastAuditId || "",
      bootstrap: false,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  }

  async function bootstrapOrVerifySnapshot(uid, providedCharacter = null, providedProfile = null) {
    const database = db();
    if (!database || !uid || runtime.role === "admin") return;
    if (runtime.snapshotVerifiedUid === uid) return;
    if (runtime.snapshotVerifyPromise) return runtime.snapshotVerifyPromise;
    const character = providedCharacter || runtime.character;
    const profile = providedProfile || runtime.profile;
    if (!character || !profile) return;

    runtime.snapshotVerifyPromise = (async () => {
      window.MILLENNIUM_SECURITY_VERIFICATIONS = Math.max(0, Number(window.MILLENNIUM_SECURITY_VERIFICATIONS || 0)) + 1;
      const status = String(profile.accountStatus || profile.status || "active").toLowerCase();
      if (["suspended", "banned", "deletion_pending"].includes(status)) return;
      const snapshotSnap = await database.collection("securitySnapshots").doc(uid).get();
      const currentState = snapshotState(character);
      const currentFingerprint = fingerprint(currentState);
      if (!snapshotSnap.exists) {
        await database.collection("securitySnapshots").doc(uid).set({
          ownerId: uid,
          revision: Math.max(0, Number(character.economyRevision || 0)),
          receiptId: character.lastEconomyReceiptId || "bootstrap",
          action: "bootstrap",
          fingerprint: currentFingerprint,
          state: currentState,
          lastAuditId: character.lastAuditId || "",
          bootstrap: true,
          updatedAt: serverTimestamp(),
        });
        runtime.snapshotVerifiedUid = uid;
        return;
      }
      const saved = snapshotSnap.data() || {};
      if (saved.fingerprint === currentFingerprint && Number(saved.revision || 0) === Number(character.economyRevision || 0)) {
        runtime.snapshotVerifiedUid = uid;
        return;
      }
      if (character.lastAuditId && character.lastAuditId !== saved.lastAuditId) {
        await database.collection("securitySnapshots").doc(uid).set({
          ownerId: uid,
          revision: Math.max(0, Number(character.economyRevision || 0)),
          receiptId: character.lastEconomyReceiptId || "admin-audit",
          action: "trusted-admin-sync",
          fingerprint: currentFingerprint,
          state: currentState,
          lastAuditId: character.lastAuditId,
          bootstrap: false,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        runtime.snapshotVerifiedUid = uid;
        return;
      }
      await restoreMismatch(uid, character, saved, profile);
      runtime.snapshotVerifiedUid = uid;
    })().finally(() => { runtime.snapshotVerifyPromise = null; });
    return runtime.snapshotVerifyPromise;
  }

  function scheduleSnapshotVerification() {
    if (!runtime.user || runtime.role === "admin" || !runtime.profile || !runtime.character) return;
    if (runtime.snapshotVerifiedUid === runtime.user.uid || runtime.snapshotVerifyPromise) return;
    if (runtime.snapshotVerifyTimer) window.clearTimeout(runtime.snapshotVerifyTimer);
    runtime.snapshotVerifyTimer = window.setTimeout(() => {
      runtime.snapshotVerifyTimer = 0;
      bootstrapOrVerifySnapshot(runtime.user.uid, runtime.character, runtime.profile).catch((error) => console.warn("Security snapshot:", error));
    }, 800);
  }

  async function restoreMismatch(uid, character, savedSnapshot, profile) {
    const database = db();
    const safeState = savedSnapshot.state && typeof savedSnapshot.state === "object" ? savedSnapshot.state : null;
    if (!database || !safeState) return;
    const incidentId = randomId("SEC");
    const receiptId = randomId("receipt");
    const before = summary(character);
    const restoredCharacter = { ...character, ...cloneForFirestore(safeState) };
    const after = summary(restoredCharacter);
    const analysis = {
      blocked: true,
      severity: "high",
      reasons: [{ severity: "high", code: "snapshot-mismatch", detail: "estado econômico diferente do último registro legítimo" }],
      before,
      after,
      delta: delta(before, after),
      changedFields: RESTORABLE_FIELDS.filter((key) => stableStringify(character[key]) !== stableStringify(safeState[key])),
    };
    const strike = Math.max(0, Number(profile.securityStrikeCount || 0)) + 1;
    const restriction = restrictionPatch({ incidentId, analysis, strike });
    await database.runTransaction(async (transaction) => {
      const characterRef = database.collection("characters").doc(uid);
      const userRef = database.collection("users").doc(uid);
      const snapshotRef = database.collection("securitySnapshots").doc(uid);
      const incidentRef = database.collection("securityIncidents").doc(incidentId);
      const receiptRef = database.collection("economyReceipts").doc(receiptId);
      const freshCharacterSnap = await transaction.get(characterRef);
      const freshUserSnap = await transaction.get(userRef);
      const freshSnapshotSnap = await transaction.get(snapshotRef);
      if (!freshCharacterSnap.exists || !freshSnapshotSnap.exists) return;
      const freshCharacter = freshCharacterSnap.data() || {};
      const freshSnapshot = freshSnapshotSnap.data() || {};
      const restoredState = freshSnapshot.state || safeState;
      const restored = { ...freshCharacter, ...cloneForFirestore(restoredState) };
      const beforeRevision = Math.max(0, Number(freshCharacter.economyRevision || 0));
      const afterRevision = beforeRevision + 1;
      const beforeSummary = summary(freshCharacter);
      const afterSummary = summary(restored);
      const localAnalysis = {
        ...analysis,
        before: beforeSummary,
        after: afterSummary,
        delta: delta(beforeSummary, afterSummary),
      };
      transaction.set(incidentRef, incidentPayload({
        uid,
        incidentId,
        analysis: localAnalysis,
        action: "automatic-integrity-restore",
        autoAction: restriction.autoAction,
        strike,
        character: freshCharacter,
        source: "snapshot-verifier",
      }));
      transaction.set(userRef, restriction.patch, { merge: true });
      transaction.set(receiptRef, receiptPayload({
        receiptId,
        uid,
        action: "integrity-restore",
        beforeRevision,
        afterRevision,
        before: beforeSummary,
        after: afterSummary,
        changes: delta(beforeSummary, afterSummary),
        changedFields: localAnalysis.changedFields,
      }));
      transaction.set(characterRef, {
        ...cloneForFirestore(restoredState),
        economyRevision: afterRevision,
        lastEconomyReceiptId: receiptId,
        lastEconomyAction: "integrity-restore",
        lastEconomyAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
      transaction.set(snapshotRef, {
        ownerId: uid,
        revision: afterRevision,
        receiptId,
        action: "integrity-restore",
        fingerprint: fingerprint(restoredState),
        state: cloneForFirestore(restoredState),
        lastAuditId: freshCharacter.lastAuditId || "",
        bootstrap: false,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      void freshUserSnap;
    });
  }

  async function recordDeniedIncident({ action, data, error }) {
    const database = db();
    const user = authUser();
    if (!database || !user || runtime.role === "admin") return;
    const code = String(error?.code || error?.message || "denied").slice(0, 160);
    if (!/permission|denied|failed-precondition|security/i.test(code)) return;
    const signature = `${action}:${code}`;
    const previous = runtime.deniedSignals.get(signature) || 0;
    if (Date.now() - previous < 60000) return;
    runtime.deniedSignals.set(signature, Date.now());
    const incidentId = randomId("SEC");
    await database.collection("securityIncidents").doc(incidentId).set({
      incidentId,
      uid: user.uid,
      characterName: "",
      type: "compatibility-denied",
      title: "Operação recusada por compatibilidade de dados",
      category: "compatibilidade-legada",
      severity: "warning",
      status: "resolved",
      source: "firestore-denial",
      action: String(action || "unknown").slice(0, 80),
      autoAction: "compatibility_log",
      strike: Number(runtime.profile?.securityStrikeCount || 0),
      changedFields: changedSensitiveFields(data).slice(0, 40),
      reasons: [{ severity: "warning", code: "legacy-compatibility-denied", detail: code }],
      before: {},
      attempted: {},
      delta: {},
      build: BUILD,
      clientSessionId: runtime.sessionId,
      userAgent: navigator.userAgent.slice(0, 500),
      route: location.hash.slice(0, 120),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  function installWriteGuard() {
    if (runtime.installed || typeof window.writeDoc !== "function") return false;
    runtime.originalWriteDoc = window.writeDoc;
    const guarded = async function millenniumGuardedWriteDoc(collection, id, data, options = {}) {
      if (collection === "characters" && changedSensitiveFields(data).length) {
        if (runtime.role === "admin" || authUser()?.uid !== id) {
          const result = await runtime.originalWriteDoc(collection, id, data, options);
          if (runtime.role === "admin") await refreshSnapshotAsAdmin(id).catch(() => {});
          return result;
        }
        return secureOwnerCharacterWrite(collection, id, data, options);
      }
      return runtime.originalWriteDoc(collection, id, data, options);
    };
    window.writeDoc = guarded;
    try { writeDoc = guarded; } catch { /* global binding unavailable */ }
    runtime.installed = true;
    return true;
  }

  function roleFromProfile(profile = {}) {
    return profile.role === "admin" ? "admin" : "player";
  }

  function stopAlertListener() {
    if (runtime.alertUnsub) {
      try { runtime.alertUnsub(); } catch { /* no-op */ }
    }
    runtime.alertUnsub = null;
    runtime.pendingAlert = false;
    window.MILLENNIUM_SECURITY_ACTIVE_LISTENERS = 0;
  }

  function updateAlertDot() {
    const dot = document.querySelector("#securityCenterButton .security-alert-dot");
    if (dot) dot.hidden = !runtime.pendingAlert;
  }

  function startAlertListener() {
    const database = db();
    if (!database || !runtime.user || runtime.alertUnsub) {
      updateAlertDot();
      return;
    }
    const query = runtime.role === "admin"
      ? database.collection("securityIncidents").where("status", "==", "pending_review").limit(1)
      : database.collection("securityIncidents").where("uid", "==", runtime.user.uid).where("status", "==", "pending_review").limit(1);
    runtime.alertUnsub = query.onSnapshot((snapshot) => {
      runtime.pendingAlert = !snapshot.empty;
      updateAlertDot();
    }, () => {
      runtime.pendingAlert = false;
      updateAlertDot();
    });
    window.MILLENNIUM_SECURITY_ACTIVE_LISTENERS = 1;
  }

  function installStateBridge() {
    if (runtime.bridgeInstalled) return;
    runtime.bridgeInstalled = true;
    window.addEventListener("millennium:profile", (event) => {
      const detail = event.detail || {};
      if (!runtime.user || detail.uid !== runtime.user.uid) return;
      const previousRole = runtime.role;
      runtime.profile = detail.profile || null;
      runtime.role = detail.role === "admin" ? "admin" : roleFromProfile(runtime.profile || {});
      injectSecurityShell();
      if (previousRole !== runtime.role) {
        stopAlertListener();
        startAlertListener();
      }
      scheduleSnapshotVerification();
    });
    window.addEventListener("millennium:character", (event) => {
      const detail = event.detail || {};
      if (!runtime.user || detail.uid !== runtime.user.uid) return;
      runtime.character = detail.character || null;
      scheduleSnapshotVerification();
    });
  }

  function watchAuthentication() {
    if (!window.firebase?.auth) return;
    installStateBridge();
    firebase.auth().onAuthStateChanged((user) => {
      stopAlertListener();
      if (runtime.snapshotVerifyTimer) window.clearTimeout(runtime.snapshotVerifyTimer);
      runtime.snapshotVerifyTimer = 0;
      runtime.snapshotVerifyPromise = null;
      runtime.snapshotVerifiedUid = "";
      runtime.user = user;
      runtime.profile = null;
      runtime.character = null;
      runtime.role = "player";
      if (!user) {
        removeSecurityShell();
        return;
      }
      injectSecurityShell();
      startAlertListener();
    });
  }

  function formatDate(value) {
    const millis = asMillis(value);
    return millis ? new Date(millis).toLocaleString("pt-BR") : "—";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function activeQuarantine() {
    const until = asMillis(runtime.profile?.economyQuarantineUntil);
    return until > Date.now() ? until : 0;
  }

  function injectSecurityShell() {
    const topActions = document.querySelector(".top-actions");
    if (topActions && !document.querySelector("#securityCenterButton")) {
      const button = document.createElement("button");
      button.id = "securityCenterButton";
      button.className = "icon-button security-center-button";
      button.type = "button";
      button.title = runtime.role === "admin" ? "Incidentes de segurança" : "Central de integridade";
      button.setAttribute("aria-label", button.title);
      button.innerHTML = `⌾<span class="security-alert-dot" hidden></span>`;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openSecurityCenter();
      });
      topActions.appendChild(button);
    }
    const button = document.querySelector("#securityCenterButton");
    if (button) button.title = runtime.role === "admin" ? "Incidentes de segurança" : "Central de integridade";
    renderQuarantineBanner();
    injectRestrictionAppeal();
    updateAlertDot();
  }

  function removeSecurityShell() {
    document.querySelector("#securityCenterButton")?.remove();
    document.querySelector("#securityQuarantineBanner")?.remove();
    document.querySelector("#securityRestrictionAppeal")?.remove();
    closeSecurityCenter();
  }

  function renderQuarantineBanner() {
    const host = document.querySelector("#globalNotice") || document.querySelector("#viewHost");
    if (!host) return;
    const until = activeQuarantine();
    let banner = document.querySelector("#securityQuarantineBanner");
    if (!until) {
      banner?.remove();
      return;
    }
    if (!banner) {
      banner = document.createElement("section");
      banner.id = "securityQuarantineBanner";
      banner.className = "security-quarantine-banner";
      host.prepend(banner);
    }
    banner.innerHTML = `<div><strong>Economia em quarentena</strong><span>Compras, gacha, mercado e alterações de inventário estão pausados até ${escapeHtml(new Date(until).toLocaleString("pt-BR"))}.</span></div><button class="ghost-button" type="button" data-security-open>Ver incidente e recorrer</button>`;
    banner.querySelector("[data-security-open]")?.addEventListener("click", openSecurityCenter);
  }

  function injectRestrictionAppeal() {
    const card = document.querySelector(".restriction-card");
    if (!card || document.querySelector("#securityRestrictionAppeal")) return;
    const button = document.createElement("button");
    button.id = "securityRestrictionAppeal";
    button.className = "primary-button";
    button.type = "button";
    button.textContent = "Consultar incidente e enviar recurso";
    button.addEventListener("click", openSecurityCenter);
    const logout = card.querySelector('[data-action="logout"]');
    card.insertBefore(button, logout || null);
  }

  async function refreshAlertDot() {
    startAlertListener();
    updateAlertDot();
  }

  function ensureSecurityModal() {
    let modal = document.querySelector("#millenniumSecurityModal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "millenniumSecurityModal";
    modal.className = "security-modal";
    modal.hidden = true;
    modal.innerHTML = `<div class="security-modal-card" role="dialog" aria-modal="true" aria-labelledby="securityModalTitle"><button class="icon-button security-modal-close" type="button" data-security-action="close" aria-label="Fechar">×</button><div id="securityModalBody"></div></div>`;
    modal.addEventListener("click", handleSecurityModalClick);
    modal.addEventListener("submit", handleSecurityModalSubmit);
    document.body.appendChild(modal);
    return modal;
  }

  async function openSecurityCenter() {
    if (!runtime.user) return;
    const modal = ensureSecurityModal();
    modal.hidden = false;
    runtime.modalOpen = true;
    document.body.classList.add("security-modal-open");
    const body = modal.querySelector("#securityModalBody");
    body.innerHTML = `<div class="security-loading"><span class="security-orbit">⌾</span><p>Consultando os registros do Oráculo...</p></div>`;
    try {
      if (runtime.role === "admin") await renderAdminSecurityCenter(body);
      else await renderPlayerSecurityCenter(body);
    } catch (error) {
      body.innerHTML = `<section class="security-center"><p class="eyebrow">Central de Integridade</p><h2 id="securityModalTitle">Não foi possível carregar os registros</h2><p>${escapeHtml(error?.message || "Falha de conexão.")}</p></section>`;
    }
  }

  function closeSecurityCenter() {
    const modal = document.querySelector("#millenniumSecurityModal");
    if (modal) modal.hidden = true;
    runtime.modalOpen = false;
    document.body.classList.remove("security-modal-open");
  }

  async function incidentListForCurrentUser() {
    const database = db();
    const snapshot = await database.collection("securityIncidents").where("uid", "==", runtime.user.uid).limit(50).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).sort((a, b) => asMillis(b.createdAt) - asMillis(a.createdAt));
  }

  async function renderPlayerSecurityCenter(host) {
    const database = db();
    const incidents = await incidentListForCurrentUser();
    const appealSnap = await database.collection("securityAppeals").doc(runtime.user.uid).get();
    const appeal = appealSnap.exists ? appealSnap.data() : null;
    const appCheck = window.MILLENNIUM_APP_CHECK_STATE || {};
    const quarantine = activeQuarantine();
    host.innerHTML = `<section class="security-center">
      <p class="eyebrow">Central de Integridade</p>
      <h2 id="securityModalTitle">Registro protegido pelo Oráculo</h2>
      <div class="security-status-grid">
        <article><span>App Check</span><strong class="${appCheck.enabled ? "ok" : "pending"}">${appCheck.enabled ? "Ativo" : "Configuração pendente"}</strong><small>${escapeHtml(appCheck.enabled ? "Token de origem habilitado." : "A chave pública ainda precisa ser inserida pelo administrador.")}</small></article>
        <article><span>Economia</span><strong class="${quarantine ? "danger" : "ok"}">${quarantine ? "Em quarentena" : "Operacional"}</strong><small>${quarantine ? `Até ${escapeHtml(new Date(quarantine).toLocaleString("pt-BR"))}` : "Recibos únicos e snapshot ativo."}</small></article>
        <article><span>Alertas</span><strong>${incidents.filter((item) => item.status === "pending_review").length}</strong><small>Incidentes aguardando análise.</small></article>
      </div>
      <div class="security-section-heading"><div><p class="eyebrow">Histórico</p><h3>Incidentes da conta</h3></div></div>
      <div class="security-incident-list">${incidents.length ? incidents.map(renderIncidentCard).join("") : `<div class="security-empty"><strong>Nenhuma irregularidade registrada.</strong><p>As operações econômicas legítimas continuam sendo acompanhadas por recibos únicos.</p></div>`}</div>
      <form class="security-appeal-form" data-security-form="appeal">
        <p class="eyebrow">Recurso interno</p><h3>Explique o que aconteceu</h3>
        <label><span>Incidente</span><select name="incidentId" required>${incidents.filter((item) => ["pending_review", "confirmed"].includes(item.status)).map((item) => `<option value="${escapeHtml(item.id)}" ${appeal?.incidentId === item.id ? "selected" : ""}>${escapeHtml(item.incidentId || item.id)} · ${escapeHtml(item.title || item.type)}</option>`).join("") || `<option value="general">Revisão geral da conta</option>`}</select></label>
        <label><span>Mensagem ao Oráculo</span><textarea name="message" maxlength="3000" required placeholder="Descreva a ação realizada, horário aproximado e qualquer erro que apareceu.">${escapeHtml(appeal?.message || "")}</textarea></label>
        <button class="primary-button" type="submit">${appeal ? "Atualizar recurso" : "Enviar recurso"}</button>
        ${appeal ? `<small>Estado atual: ${escapeHtml(appeal.status || "submitted")} · atualizado em ${escapeHtml(formatDate(appeal.updatedAt || appeal.createdAt))}</small>` : ""}
      </form>
    </section>`;
  }

  function renderIncidentCard(incident) {
    const reasons = Array.isArray(incident.reasons) ? incident.reasons : [];
    return `<article class="security-incident severity-${escapeHtml(incident.severity || "warning")}">
      <header><div><span>${escapeHtml(incident.incidentId || incident.id)}</span><h4>${escapeHtml(incident.title || incident.type || "Incidente")}</h4></div><strong>${escapeHtml(incident.status || "pending_review")}</strong></header>
      <p>${reasons.length ? reasons.map((entry) => escapeHtml(entry.detail || entry.code)).join(" · ") : "Registro técnico preservado para análise."}</p>
      <footer><span>${escapeHtml(incident.action || "operação")}</span><span>${escapeHtml(formatDate(incident.createdAt))}</span><span>${escapeHtml(incident.autoAction || "log_only")}</span></footer>
    </article>`;
  }

  function securityDisplayValue(value) {
    if (value === undefined) return "—";
    if (value === null) return "nulo";
    if (typeof value === "boolean") return value ? "sim" : "não";
    if (typeof value === "number") return Number.isInteger(value) ? value.toLocaleString("pt-BR") : value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
    if (Array.isArray(value)) return `${value.length} registro(s)`;
    if (typeof value === "object") return `${Object.keys(value).length} campo(s)`;
    return String(value).slice(0, 100);
  }

  function securityResourceLabel(incident) {
    const fields = Array.isArray(incident.changedFields) ? incident.changedFields : [];
    if (fields.length) return fields.slice(0, 4).join(", ");
    return incident.category || incident.type || "registro econômico";
  }

  function securityComparisonRows(incident) {
    const legitimate = incident.before || {};
    const received = incident.attempted || {};
    const differences = incident.delta || {};
    const preferred = Array.isArray(incident.changedFields) ? incident.changedFields : [];
    const fields = [...new Set([...preferred, ...Object.keys(differences), ...Object.keys(legitimate), ...Object.keys(received)])]
      .filter((field) => Object.prototype.hasOwnProperty.call(legitimate, field) || Object.prototype.hasOwnProperty.call(received, field))
      .slice(0, 10);
    if (!fields.length) return `<tr><td colspan="4">Comparação numérica indisponível; os motivos técnicos continuam preservados.</td></tr>`;
    return fields.map((field) => `<tr><th scope="row">${escapeHtml(field)}</th><td>${escapeHtml(securityDisplayValue(legitimate[field]))}</td><td>${escapeHtml(securityDisplayValue(received[field]))}</td><td>${escapeHtml(securityDisplayValue(differences[field]))}</td></tr>`).join("");
  }

  async function renderAdminSecurityCenter(host) {
    const database = db();
    const snapshot = await database.collection("securityIncidents").orderBy("createdAt", "desc").limit(60).get();
    const incidents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const pending = incidents.filter((item) => item.status === "pending_review").length;
    const critical = incidents.filter((item) => item.severity === "critical").length;
    host.innerHTML = `<section class="security-center admin-security-center oracle-security-console">
      <div class="oracle-security-masthead"><div><p class="eyebrow">Oráculo · Integridade</p><h2 id="securityModalTitle">Incidentes, recursos e snapshots</h2><p>Compare o estado legítimo com o valor recebido antes de liberar, restaurar ou confirmar uma infração.</p></div><span class="oracle-security-eye" aria-hidden="true">◉</span></div>
      <div class="security-status-grid">
        <article><span>Pendentes</span><strong class="${pending ? "danger" : "ok"}">${pending}</strong><small>Aguardando decisão administrativa.</small></article>
        <article><span>Críticos carregados</span><strong class="${critical ? "danger" : "ok"}">${critical}</strong><small>Dentro dos últimos ${incidents.length} registros.</small></article>
        <article><span>App Check</span><strong class="${window.MILLENNIUM_APP_CHECK_STATE?.enabled ? "ok" : "pending"}">${window.MILLENNIUM_APP_CHECK_STATE?.enabled ? "Ativo" : "Pendente"}</strong><small>Consulte SECURITY_SETUP.md antes de exigir tokens.</small></article>
      </div>
      <div class="security-admin-list">${incidents.length ? incidents.map(renderAdminIncidentCard).join("") : `<div class="security-empty"><strong>Nenhum incidente.</strong><p>A fila de integridade está limpa.</p></div>`}</div>
    </section>`;
  }

  function renderAdminIncidentCard(incident) {
    const status = incident.status || "pending_review";
    return `<article class="security-admin-incident severity-${escapeHtml(incident.severity || "warning")}" data-incident-id="${escapeHtml(incident.id)}">
      <header><div><span>${escapeHtml(incident.incidentId || incident.id)}</span><h3>${escapeHtml(incident.title || incident.type)}</h3><small>${escapeHtml(incident.characterName || incident.uid)} · ${escapeHtml(formatDate(incident.createdAt))}</small></div><strong>${escapeHtml(status)}</strong></header>
      <dl class="security-decision-ledger">
        <div><dt>Ação</dt><dd>${escapeHtml(incident.action || "—")}</dd></div>
        <div><dt>Severidade</dt><dd>${escapeHtml(incident.severity || "warning")}</dd></div>
        <div><dt>Decisão</dt><dd>${escapeHtml(status)}</dd></div>
        <div><dt>Recurso afetado</dt><dd>${escapeHtml(securityResourceLabel(incident))}</dd></div>
      </dl>
      <div class="security-comparison-scroll"><table class="security-comparison-table"><caption>Comparação entre snapshot legítimo, valor recebido e diferença</caption><thead><tr><th>Campo</th><th>Valor legítimo</th><th>Valor recebido</th><th>Diferença</th></tr></thead><tbody>${securityComparisonRows(incident)}</tbody></table></div>
      <div class="security-admin-details"><p><b>Resposta automática:</b> ${escapeHtml(incident.autoAction || "log_only")}</p><p><b>Motivos:</b> ${escapeHtml((incident.reasons || []).map((entry) => entry.detail || entry.code).join(" · ") || "—")}</p></div>
      <div class="security-admin-actions" aria-label="Decisões do incidente">
        <button class="ghost-button" type="button" data-security-action="release" data-incident="${escapeHtml(incident.id)}">Liberar</button>
        <button class="primary-button" type="button" data-security-action="restore" data-incident="${escapeHtml(incident.id)}">Restaurar snapshot</button>
        <button class="danger-button" type="button" data-security-action="confirm" data-incident="${escapeHtml(incident.id)}">Confirmar infração</button>
        <button class="danger-button" type="button" data-security-action="extend" data-incident="${escapeHtml(incident.id)}">Suspender 6h</button>
        <button class="text-button" type="button" data-security-action="bug" data-incident="${escapeHtml(incident.id)}">Marcar como bug</button>
        <button class="text-button" type="button" data-security-action="appeal" data-incident="${escapeHtml(incident.id)}">Ver recurso</button>
      </div>
      <div class="security-appeal-preview" data-appeal-for="${escapeHtml(incident.id)}"></div>
    </article>`;
  }

  async function handleSecurityModalSubmit(event) {
    const form = event.target.closest('[data-security-form="appeal"]');
    if (!form) return;
    event.preventDefault();
    const formData = new FormData(form);
    const incidentId = String(formData.get("incidentId") || "general").slice(0, 160);
    const message = String(formData.get("message") || "").trim().slice(0, 3000);
    if (!message) return;
    const database = db();
    const ref = database.collection("securityAppeals").doc(runtime.user.uid);
    const existing = await ref.get();
    const payload = {
      uid: runtime.user.uid,
      incidentId,
      message,
      status: "submitted",
      updatedAt: serverTimestamp(),
    };
    if (!existing.exists) payload.createdAt = serverTimestamp();
    await ref.set(payload, { merge: true });
    await renderPlayerSecurityCenter(document.querySelector("#securityModalBody"));
  }

  async function handleSecurityModalClick(event) {
    const button = event.target.closest("[data-security-action]");
    if (!button) {
      if (event.target.id === "millenniumSecurityModal") closeSecurityCenter();
      return;
    }
    const action = button.dataset.securityAction;
    if (action === "close") {
      closeSecurityCenter();
      return;
    }
    if (runtime.role !== "admin") return;
    const incidentId = button.dataset.incident;
    if (!incidentId) return;
    const confirmations = {
      restore: "Restaurar o último snapshot legítimo e liberar as restrições desta conta?",
      confirm: "Confirmar este incidente como infração?",
      extend: "Aplicar suspensão administrativa de 6 horas?",
      release: "Liberar a conta e encerrar a quarentena após esta revisão?",
      bug: "Marcar este incidente como bug ou falso positivo e liberar a conta?",
    };
    if (confirmations[action] && !window.confirm(confirmations[action])) return;
    button.disabled = true;
    try {
      await adminIncidentAction(action, incidentId);
      await renderAdminSecurityCenter(document.querySelector("#securityModalBody"));
      refreshAlertDot();
    } catch (error) {
      window.alert(error?.message || "Não foi possível concluir a revisão.");
    } finally {
      button.disabled = false;
    }
  }

  async function adminIncidentAction(action, incidentId) {
    const database = db();
    const incidentRef = database.collection("securityIncidents").doc(incidentId);
    const incidentSnap = await incidentRef.get();
    if (!incidentSnap.exists) throw new Error("Incidente não encontrado.");
    const incident = { id: incidentSnap.id, ...incidentSnap.data() };
    const uid = incident.uid;
    if (action === "appeal") {
      const appeal = await database.collection("securityAppeals").doc(uid).get();
      const host = document.querySelector(`[data-appeal-for="${CSS.escape(incidentId)}"]`);
      if (host) host.innerHTML = appeal.exists ? `<strong>Recurso do jogador</strong><p>${escapeHtml(appeal.data().message || "")}</p><small>${escapeHtml(formatDate(appeal.data().updatedAt || appeal.data().createdAt))}</small>` : `<small>Nenhum recurso enviado.</small>`;
      return;
    }
    if (action === "restore") {
      const snapshot = await database.collection("securitySnapshots").doc(uid).get();
      if (!snapshot.exists || !snapshot.data().state) throw new Error("Snapshot legítimo não encontrado.");
      await window.writeDoc("characters", uid, {
        ...cloneForFirestore(snapshot.data().state),
        economyRevision: Math.max(0, Number(snapshot.data().revision || 0)),
        lastEconomyReceiptId: snapshot.data().receiptId || "admin-restore",
        lastEconomyAction: "admin-restore",
      }, { reason: `Restauração de segurança do incidente ${incident.incidentId || incidentId}.` });
      await releaseSecurityRestriction(uid, incident);
      await incidentRef.set({ status: "restored", reviewedBy: runtime.user.uid, reviewedAt: serverTimestamp(), resolution: "Snapshot legítimo restaurado pelo Oráculo.", updatedAt: serverTimestamp() }, { merge: true });
      return;
    }
    if (action === "release" || action === "bug") {
      await releaseSecurityRestriction(uid, incident);
      await incidentRef.set({ status: action === "bug" ? "false_positive" : "resolved", reviewedBy: runtime.user.uid, reviewedAt: serverTimestamp(), resolution: action === "bug" ? "Marcado como bug ou falso positivo." : "Jogador liberado após revisão.", updatedAt: serverTimestamp() }, { merge: true });
      return;
    }
    if (action === "confirm") {
      await incidentRef.set({ status: "confirmed", reviewedBy: runtime.user.uid, reviewedAt: serverTimestamp(), resolution: "Infração confirmada pelo Oráculo.", updatedAt: serverTimestamp() }, { merge: true });
      return;
    }
    if (action === "extend") {
      const until = new Date(Date.now() + Number(CONFIG.automaticSuspensionHours || 6) * 3600000);
      await window.writeDoc("users", uid, {
        accountStatus: "suspended",
        status: "suspended",
        suspendedUntil: until,
        bannedUntil: until,
        restrictionReason: `Suspensão administrativa após análise · ${incident.incidentId || incidentId}`,
        moderationReason: `Suspensão administrativa após análise · ${incident.incidentId || incidentId}`,
        restrictedAt: serverTimestamp(),
        restrictedBy: runtime.user.uid,
      }, { reason: `Suspensão de segurança confirmada no incidente ${incident.incidentId || incidentId}.` });
      await incidentRef.set({ status: "confirmed", reviewedBy: runtime.user.uid, reviewedAt: serverTimestamp(), resolution: "Suspensão administrativa de 6 horas aplicada.", updatedAt: serverTimestamp() }, { merge: true });
    }
  }

  async function releaseSecurityRestriction(uid, incident) {
    await window.writeDoc("users", uid, {
      accountStatus: "active",
      status: "active",
      suspendedUntil: null,
      bannedUntil: null,
      restrictionReason: "",
      moderationReason: "",
      economyQuarantineUntil: null,
      economyQuarantineReason: "",
      restrictionRemovedAt: serverTimestamp(),
      restrictionRemovedBy: runtime.user.uid,
    }, { reason: `Liberação após revisão do incidente ${incident.incidentId || incident.id}.` });
  }

  function installObservers() {
    document.addEventListener("click", rememberIntent, true);
    document.addEventListener("submit", rememberForm, true);
    runtime.observer = new MutationObserver(() => {
      if (!runtime.installed) installWriteGuard();
      if (!runtime.user || runtime.shellTimer) return;
      runtime.shellTimer = window.setTimeout(() => {
        runtime.shellTimer = 0;
        injectSecurityShell();
      }, 120);
    });
    runtime.observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  async function initialize() {
    installObservers();
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      installWriteGuard();
      if (window.firebase?.auth) {
        window.clearInterval(timer);
        watchAuthentication();
      } else if (attempts > 200) {
        window.clearInterval(timer);
      }
    }, 50);
  }

  async function ensureReady() {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      if (runtime.installed || installWriteGuard()) return true;
      await new Promise((resolve) => window.setTimeout(resolve, 25));
    }
    return runtime.installed;
  }

  const securityApi = Object.freeze({
    contractVersion: FIRESTORE_CONTRACT,
    ensureReady,
    open: openSecurityCenter,
    close: closeSecurityCenter,
    snapshotState,
    fingerprint,
    analyzeMutation,
    bootstrapOrVerifySnapshot,
  });

  window.MILLENNIUM_SECURITY_364 = securityApi;
  window.MILLENNIUM_SECURITY_363 = securityApi;

  initialize();
}());
