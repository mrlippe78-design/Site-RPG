(function exposeMillenniumBackend31() {
  "use strict";

  const CREATION_STATUSES = Object.freeze({
    pending: "pendente",
    reviewing: "em análise",
    nerf: "nerf solicitado",
    approved: "aprovado",
    rejected: "reprovado",
  });

  const CREATION_FIELDS = Object.freeze([
    "type", "title", "concept", "function", "manifestation", "range", "duration",
    "cost", "limitations", "countermeasures", "risks", "affinityId", "description",
    "example", "basePowerId",
  ]);

  const REPORT_STATUSES = Object.freeze([
    "recebido", "em análise", "aguardando informação", "resolvido", "arquivado",
  ]);

  const normalizeText = (value, maximum = 5000) => String(value ?? "").trim().slice(0, maximum);

  function stablePair(a, b) {
    return [normalizeText(a, 128), normalizeText(b, 128)].filter(Boolean).sort();
  }

  function conversationIdFor(a, b) {
    const pair = stablePair(a, b);
    if (pair.length !== 2 || pair[0] === pair[1]) throw new Error("A conversa exige dois participantes diferentes.");
    return pair.join("__");
  }

  function exactParticipants(participants, a, b) {
    const left = [...new Set((participants || []).map((value) => normalizeText(value, 128)))].sort();
    const right = stablePair(a, b);
    return left.length === 2 && right.length === 2 && left.every((value, index) => value === right[index]);
  }

  function friendlyReportId(now = new Date(), random = Math.random) {
    const date = now instanceof Date ? now : new Date(now);
    const stamp = Number.isFinite(date.getTime()) ? date.toISOString().slice(0, 10).replace(/-/g, "") : "00000000";
    const suffix = Math.floor(Math.max(0, Math.min(0.999999, Number(random()) || 0)) * 1679616).toString(36).padStart(4, "0").toUpperCase();
    return `MR-${stamp}-${suffix}`;
  }

  function buildReportPayload({ type, user = {}, values = {}, context = {}, now = new Date(), random = Math.random } = {}) {
    const reportType = normalizeText(type, 40) || "bug";
    const description = normalizeText(values.description, 5000);
    if (!description) throw new Error("Descreva o ocorrido antes de enviar.");
    return {
      type: reportType,
      status: "recebido",
      reporterId: normalizeText(user.uid, 128),
      reporterName: normalizeText(user.name || user.displayName || user.email, 120),
      targetId: normalizeText(values.targetId, 128),
      title: normalizeText(values.title || (reportType === "bug" ? "Bug reportado" : "Denúncia"), 160),
      category: normalizeText(values.category || reportType, 80),
      description,
      steps: normalizeText(values.steps, 3000),
      expected: normalizeText(values.expected, 2000),
      actual: normalizeText(values.actual, 2000),
      device: normalizeText(values.device || context.device, 160),
      browser: normalizeText(values.browser || context.browser, 160),
      attachmentUrl: normalizeText(values.attachmentUrl, 1000),
      build: normalizeText(context.build, 80),
      route: normalizeText(context.route, 120),
      viewport: normalizeText(context.viewport, 80),
      userAgent: normalizeText(context.userAgent, 500),
      messageId: normalizeText(values.messageId, 160),
      source: normalizeText(values.source, 80),
      friendlyId: friendlyReportId(now, random),
    };
  }

  function canonicalCreationStatus(status) {
    const value = normalizeText(status, 80).toLowerCase();
    const map = {
      pending: CREATION_STATUSES.pending,
      pendente: CREATION_STATUSES.pending,
      reviewing: CREATION_STATUSES.reviewing,
      "em analise": CREATION_STATUSES.reviewing,
      "em análise": CREATION_STATUSES.reviewing,
      nerf: CREATION_STATUSES.nerf,
      "nerf solicitado": CREATION_STATUSES.nerf,
      nerf_solicitado: CREATION_STATUSES.nerf,
      approved: CREATION_STATUSES.approved,
      aprovado: CREATION_STATUSES.approved,
      rejected: CREATION_STATUSES.rejected,
      reprovado: CREATION_STATUSES.rejected,
    };
    return map[value] || value || CREATION_STATUSES.pending;
  }

  function sanitizeCreationPayload(values = {}, character = {}) {
    const payload = Object.fromEntries(CREATION_FIELDS.map((field) => [field, normalizeText(values[field], field === "description" ? 5000 : 1200)]));
    payload.type = payload.type === "technique" ? "technique" : "power";
    payload.title = normalizeText(values.title || values.name, 120);
    payload.affinityId = normalizeText(values.affinityId || character.affinityId, 80);
    payload.revision = Math.max(1, Number.parseInt(values.revision || 1, 10) || 1);
    payload.previousRequestId = normalizeText(values.previousRequestId, 160);
    const required = ["title", "concept", "function", "manifestation", "range", "duration", "cost", "limitations", "countermeasures", "risks", "description"];
    const missing = required.filter((field) => !payload[field]);
    if (payload.type === "technique" && !payload.basePowerId) missing.push("basePowerId");
    if (missing.length) throw new Error(`Complete os campos obrigatórios: ${[...new Set(missing)].join(", ")}.`);
    return payload;
  }

  function canResubmitCreation(request = {}) {
    return canonicalCreationStatus(request.status) === CREATION_STATUSES.nerf;
  }

  function creationStatusLabel(status) {
    return canonicalCreationStatus(status);
  }

  function buildDirectMessage({ sender = {}, target = {}, text, clientId, createdAt = new Date() } = {}) {
    const senderId = normalizeText(sender.uid || sender.id, 128);
    const targetId = normalizeText(target.uid || target.id, 128);
    const body = normalizeText(text, 2000);
    if (!senderId || !targetId || senderId === targetId) throw new Error("Selecione um destinatário válido.");
    if (!body) throw new Error("A mensagem não pode ficar vazia.");
    const participants = stablePair(senderId, targetId);
    return {
      senderId,
      senderName: normalizeText(sender.name || sender.displayName || sender.email, 120),
      targetId,
      targetName: normalizeText(target.name || target.displayName || target.email, 120),
      participants,
      text: body,
      type: "private",
      clientId: normalizeText(clientId, 160),
      conversationId: conversationIdFor(senderId, targetId),
      createdAt,
    };
  }

  function mergeMessages(serverMessages = [], optimisticMessages = []) {
    const byKey = new Map();
    [...optimisticMessages, ...serverMessages].forEach((message) => {
      if (!message) return;
      const key = message.clientId || message.id;
      if (!key) return;
      const previous = byKey.get(key) || {};
      byKey.set(key, { ...previous, ...message, pending: Boolean(message.pending && !previous.id), failed: Boolean(message.failed) });
    });
    return [...byKey.values()].sort((a, b) => {
      const left = new Date(a.createdAt?.toDate?.() || a.createdAt || 0).getTime() || 0;
      const right = new Date(b.createdAt?.toDate?.() || b.createdAt || 0).getTime() || 0;
      return left - right;
    });
  }

  class SubscriptionRegistry {
    constructor() {
      this.entries = new Map();
    }

    replace(name, unsubscribe) {
      this.remove(name);
      if (typeof unsubscribe === "function") this.entries.set(name, unsubscribe);
      return unsubscribe;
    }

    remove(name) {
      const unsubscribe = this.entries.get(name);
      if (typeof unsubscribe === "function") {
        try { unsubscribe(); } catch { /* no-op */ }
      }
      this.entries.delete(name);
    }

    clear() {
      [...this.entries.keys()].forEach((name) => this.remove(name));
    }

    get size() { return this.entries.size; }
    get names() { return [...this.entries.keys()]; }
  }

  function arrayDocumentPlan(character = {}, targetVersion = 3) {
    const uid = normalizeText(character.ownerId || character.id, 128);
    const mappings = [
      ["inventory", "inventory", "instanceId"],
      ["pets", "pets", "instanceId"],
      ["titles", "titles", "id"],
      ["powers", "powers", "id"],
      ["techniques", "techniques", "id"],
      ["activeActivities", "activities", "id"],
    ];
    const operations = [];
    mappings.forEach(([field, collection, idField]) => {
      (Array.isArray(character[field]) ? character[field] : []).forEach((entry, index) => {
        const id = normalizeText(entry?.[idField] || entry?.id || `${field}-${index + 1}`, 160);
        operations.push({
          mode: "upsert-if-missing",
          path: `characters/${uid}/${collection}/${id}`,
          sourceField: field,
          data: { ...entry, ownerId: uid, legacyIndex: index, migrationVersion: targetVersion },
        });
      });
    });
    const rootPatch = {
      migrationVersion: targetVersion,
      migrationState: "prepared",
      legacyArraysPreserved: true,
    };
    return {
      uid,
      fromVersion: Number(character.migrationVersion || 0),
      targetVersion,
      idempotencyKey: `${uid}:migration:${targetVersion}`,
      skip: !uid || Number(character.migrationVersion || 0) >= targetVersion,
      rootPatch,
      operations,
      counts: Object.fromEntries(mappings.map(([field]) => [field, Array.isArray(character[field]) ? character[field].length : 0])),
    };
  }

  function migrationRollbackPlan(plan = {}) {
    return {
      uid: plan.uid || "",
      targetVersion: plan.targetVersion || 3,
      deletePaths: (plan.operations || []).map((operation) => operation.path),
      rootPatch: {
        migrationVersion: plan.fromVersion || 0,
        migrationState: "rolled-back",
        legacyArraysPreserved: true,
      },
      destructiveLegacyDelete: false,
    };
  }

  window.MILLENNIUM_BACKEND_31 = Object.freeze({
    CREATION_STATUSES,
    CREATION_FIELDS,
    REPORT_STATUSES,
    normalizeText,
    stablePair,
    conversationIdFor,
    exactParticipants,
    friendlyReportId,
    buildReportPayload,
    canonicalCreationStatus,
    sanitizeCreationPayload,
    canResubmitCreation,
    creationStatusLabel,
    buildDirectMessage,
    mergeMessages,
    SubscriptionRegistry,
    arrayDocumentPlan,
    migrationRollbackPlan,
  });
}());
