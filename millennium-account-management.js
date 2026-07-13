(function exposeMillenniumAccountManagement() {
  const SUSPENSION_PRESETS = Object.freeze({
    "1h": 60 * 60 * 1000,
    "6h": 6 * 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
    "3d": 3 * 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  });

  const CHARACTER_SUBCOLLECTIONS = Object.freeze([
    "lore", "inventory", "pets", "titles", "powers", "techniques", "activities",
    "missions", "achievements", "discoveries", "history", "developmentLogs", "rewards",
    "minigameRuns",
  ]);

  const MODERATION_FIELDS = Object.freeze([
    "accountStatus", "suspendedUntil", "restrictionReason", "restrictedAt", "restrictedBy",
    "restrictionRemovedAt", "restrictionRemovedBy",
  ]);

  const asTime = (value) => {
    if (!value) return 0;
    if (typeof value?.toMillis === "function") return value.toMillis();
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  function normalizeStatus(profile = {}, now = Date.now()) {
    const raw = String(profile.accountStatus || profile.status || "active").toLowerCase();
    if (raw === "suspended") {
      const until = asTime(profile.suspendedUntil || profile.bannedUntil);
      if (until && until <= now) return "active";
    }
    if (["active", "suspended", "banned", "deletion_pending", "muted"].includes(raw)) return raw;
    return "active";
  }

  function isRestricted(profile = {}, now = Date.now()) {
    return ["suspended", "banned", "deletion_pending"].includes(normalizeStatus(profile, now));
  }

  function suspensionUntil(preset, now = Date.now(), customValue = "") {
    if (preset === "custom") {
      const custom = asTime(customValue);
      if (!custom || custom <= now) throw new Error("Escolha uma data futura para a suspensão.");
      return custom;
    }
    const duration = SUSPENSION_PRESETS[preset];
    if (!duration) throw new Error("Duração de suspensão inválida.");
    return now + duration;
  }

  function restrictionCountdown(profile = {}, now = Date.now()) {
    const status = normalizeStatus(profile, now);
    if (status !== "suspended") return { status, remainingMs: 0, label: "" };
    const remainingMs = Math.max(0, asTime(profile.suspendedUntil || profile.bannedUntil) - now);
    const totalSeconds = Math.ceil(remainingMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const label = days
      ? `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`
      : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return { status, remainingMs, label };
  }

  function validateOperation({ action, adminId, targetUid, targetRole, reason, confirmation }) {
    if (!adminId || !targetUid) throw new Error("Administrador ou alvo ausente.");
    if (adminId === targetUid) throw new Error("O Oráculo não pode executar esta ação sobre a própria conta.");
    if (targetRole === "admin") throw new Error("Contas administrativas exigem revisão fora deste painel.");
    if (!String(reason || "").trim()) throw new Error("Informe o motivo administrativo.");
    const required = {
      "character-reset": "RESETAR FICHA",
      "firestore-account-delete": "EXCLUIR CONTA DEFINITIVAMENTE",
    }[action];
    if (required && confirmation !== required) throw new Error(`Digite ${required} para confirmar.`);
    return true;
  }

  function operationRecord({ operationType, adminId, targetUid, targetEmail = "", reason, idempotencyKey, nowValue }) {
    return {
      operationType,
      adminId,
      targetUid,
      targetEmail,
      reason: String(reason || "").slice(0, 500),
      idempotencyKey,
      startedAt: nowValue,
      completedAt: null,
      status: "running",
      deletedDocuments: 0,
      failedDocuments: [],
      authDeletionRequired: operationType === "firestore-account-delete",
    };
  }

  function deletionQueueRecord({ uid, email, displayName, adminId, reason, nowValue, idempotencyKey }) {
    return {
      ownerId: uid,
      email: email || "",
      displayName: displayName || "Usuário removido",
      status: "awaiting-auth-delete",
      adminId,
      reason: String(reason || "").slice(0, 500),
      idempotencyKey,
      createdAt: nowValue,
      updatedAt: nowValue,
    };
  }

  function isPendingCharacterRequest(request = {}) {
    return ["pendente", "em análise", "aguardando resposta do player", "contestado pelo player"].includes(String(request.status || "").toLowerCase());
  }

  globalThis.MILLENNIUM_ACCOUNT_MANAGEMENT_321 = Object.freeze({
    SUSPENSION_PRESETS,
    CHARACTER_SUBCOLLECTIONS,
    MODERATION_FIELDS,
    asTime,
    normalizeStatus,
    isRestricted,
    suspensionUntil,
    restrictionCountdown,
    validateOperation,
    operationRecord,
    deletionQueueRecord,
    isPendingCharacterRequest,
  });
}());
