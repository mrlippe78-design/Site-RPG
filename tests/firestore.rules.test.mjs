import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { readFile } from "node:fs/promises";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

const projectId = "demo-millennium-rpg";
const rules = await readFile(new URL("../firestore.rules", import.meta.url), "utf8");
let environment;

const initialCharacter = (uid) => ({
  ownerId: uid,
  playerName: "Escolhido",
  characterName: "",
  creationLocked: false,
  base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
  development: { for: 0, vel: 0, hab: 0, res: 0, pod: 0 },
  gold: 100,
  millenniumCoins: 250,
  gachaEnergy: 30,
  affinityAttempts: 3,
  pityCounter: 0,
  totalRolls: 0,
  totalRares: 0,
  prestige: 0,
  xp: 0,
  level: 1,
  freePoints: 0,
  seasonPassXp: 0,
  premiumPassUnlocked: false,
  affinityId: "",
  gachaVault: [],
  inventory: [],
  pets: [],
  titles: [],
  tokens: [],
  powers: [],
  techniques: [],
  rollHistory: [],
  activeActivities: [],
});

before(async () => {
  environment = await initializeTestEnvironment({ projectId, firestore: { rules } });
});

beforeEach(async () => {
  await environment.clearFirestore();
  await environment.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await setDoc(doc(db, "users", "player-a"), { role: "player", email: "a@example.invalid", displayName: "A" });
    await setDoc(doc(db, "users", "player-b"), { role: "player", email: "b@example.invalid", displayName: "B" });
    await setDoc(doc(db, "users", "intruder"), { role: "player", email: "x@example.invalid", displayName: "X" });
    await setDoc(doc(db, "users", "oracle"), { role: "admin", email: "oracle@example.invalid", displayName: "Oráculo" });
    await setDoc(doc(db, "admins", "oracle"), { active: true });
    await setDoc(doc(db, "characters", "player-a"), initialCharacter("player-a"));
  });
});

after(async () => {
  await environment.cleanup();
});

test("player cannot mint economy, affinity, pets, titles, or role", async () => {
  const db = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  await assertFails(updateDoc(doc(db, "characters", "player-a"), { gold: 999999 }));
  await assertFails(updateDoc(doc(db, "characters", "player-a"), { affinityId: "vazio" }));
  await assertFails(updateDoc(doc(db, "characters", "player-a"), { pets: [{ id: "secret" }] }));
  await assertFails(updateDoc(doc(db, "characters", "player-a"), { titles: [{ id: "oracle" }] }));
  await assertFails(updateDoc(doc(db, "users", "player-a"), { role: "admin" }));
});

test("technical creation accepts exactly 20 points and rejects attribute 67", async () => {
  const db = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  await assertSucceeds(updateDoc(doc(db, "characters", "player-a"), {
    characterName: "Ariadne",
    raceId: "humano",
    classId: "guerreiro",
    base: { for: 4, vel: 4, hab: 4, res: 4, pod: 4 },
    creationLocked: true,
  }));

  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "characters", "player-a"), initialCharacter("player-a"));
  });
  await assertFails(updateDoc(doc(db, "characters", "player-a"), {
    characterName: "Corrompido",
    raceId: "humano",
    classId: "guerreiro",
    base: { for: 67, vel: 2, hab: 2, res: 2, pod: 2 },
    creationLocked: true,
  }));
});

test("owner can update public profile fields but not another character", async () => {
  const db = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  await assertSucceeds(updateDoc(doc(db, "characters", "player-a"), { characterDescription: "Uma memória curta." }));
  await assertFails(getDoc(doc(db, "characters", "player-b")));
});

test("report enforces reporter, initial status, limits, and server timestamp", async () => {
  const db = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  await assertSucceeds(setDoc(doc(db, "reports", "report-ok"), {
    type: "bug",
    status: "recebido",
    reporterId: "player-a",
    reporterName: "A",
    targetId: "",
    title: "Falha visual",
    description: "A tela desalinhou.",
    createdAt: serverTimestamp(),
  }));
  await assertFails(setDoc(doc(db, "reports", "report-forged"), {
    type: "bug",
    status: "resolvido",
    reporterId: "player-b",
    reporterName: "B",
    targetId: "",
    title: "Forjado",
    description: "Tentativa inválida.",
    createdAt: serverTimestamp(),
  }));
});

test("direct messages are immutable and private to exact participants", async () => {
  const playerDb = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  const intruderDb = environment.authenticatedContext("intruder", { email: "x@example.invalid" }).firestore();
  const message = {
    senderId: "player-a",
    senderName: "A",
    targetId: "player-b",
    targetName: "B",
    participants: ["player-a", "player-b"],
    text: "Eco de teste",
    type: "private",
    clientId: "client-message-001",
    createdAt: serverTimestamp(),
  };
  await assertSucceeds(setDoc(doc(playerDb, "directMessages", "message-ok"), message));
  await assertFails(updateDoc(doc(playerDb, "directMessages", "message-ok"), { text: "reescrito" }));
  await assertFails(getDoc(doc(intruderDb, "directMessages", "message-ok")));
  await assertFails(setDoc(doc(playerDb, "directMessages", "message-forged"), { ...message, senderId: "player-b" }));
});

test("operation requests are pending-only and cannot self-approve", async () => {
  const db = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  await assertSucceeds(setDoc(doc(db, "operationRequests", "operation-001"), {
    ownerId: "player-a",
    type: "pass-claim",
    status: "pending",
    payload: { level: 5, track: "free" },
    idempotencyKey: "player-a:pass:free:5",
    createdAt: serverTimestamp(),
  }));
  await assertFails(updateDoc(doc(db, "operationRequests", "operation-001"), { status: "approved" }));
});

test("admin sensitive mutation requires an immutable audit in the same batch", async () => {
  const db = environment.authenticatedContext("oracle", { email: "oracle@example.invalid" }).firestore();
  await assertFails(updateDoc(doc(db, "characters", "player-a"), { gold: 500 }));

  const batch = writeBatch(db);
  batch.set(doc(db, "auditLogs", "audit-character-0001"), {
    adminId: "oracle",
    targetId: "player-a",
    field: "gold",
    previousValue: 100,
    nextValue: 500,
    reason: "Recompensa validada em teste de regras.",
    createdAt: serverTimestamp(),
  });
  batch.update(doc(db, "characters", "player-a"), { gold: 500, lastAuditId: "audit-character-0001" });
  await assertSucceeds(batch.commit());
  const snapshot = await getDoc(doc(db, "characters", "player-a"));
  assert.equal(snapshot.data().gold, 500);
});


test("conversation summary and immutable message are created atomically", async () => {
  const playerDb = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  const intruderDb = environment.authenticatedContext("intruder", { email: "x@example.invalid" }).firestore();
  const conversationId = "player-a__player-b";
  const clientId = "client-conversation-001";
  const conversationRef = doc(playerDb, "conversations", conversationId);
  const messageRef = doc(playerDb, "conversations", conversationId, "messages", clientId);
  const batch = writeBatch(playerDb);
  batch.set(conversationRef, {
    participantIds: ["player-a", "player-b"],
    participantNames: { "player-a": "A", "player-b": "B" },
    lastMessage: "Mensagem segura",
    lastMessageAt: serverTimestamp(),
    lastSenderId: "player-a",
    lastClientId: clientId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  batch.set(messageRef, {
    senderId: "player-a",
    senderName: "A",
    targetId: "player-b",
    targetName: "B",
    participants: ["player-a", "player-b"],
    text: "Mensagem segura",
    type: "private",
    clientId,
    conversationId,
    createdAt: serverTimestamp(),
  });
  await assertSucceeds(batch.commit());
  await assertFails(updateDoc(messageRef, { text: "reescrita" }));
  await assertFails(getDoc(doc(intruderDb, "conversations", conversationId)));

  const forged = writeBatch(playerDb);
  forged.update(conversationRef, {
    lastMessage: "Destino forjado",
    lastMessageAt: serverTimestamp(),
    lastSenderId: "player-a",
    lastClientId: "client-forged",
    updatedAt: serverTimestamp(),
  });
  forged.set(doc(playerDb, "conversations", conversationId, "messages", "client-forged"), {
    senderId: "player-a",
    senderName: "A",
    targetId: "intruder",
    targetName: "X",
    participants: ["intruder", "player-a"],
    text: "Destino forjado",
    type: "private",
    clientId: "client-forged",
    conversationId,
    createdAt: serverTimestamp(),
  });
  await assertFails(forged.commit());
});

test("creation requests let the player only accept or contest the Oracle proposal", async () => {
  const db = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  const baseRequest = {
    uid: "player-a",
    playerName: "A",
    characterName: "Ariadne",
    type: "power",
    status: "pendente",
    title: "Lança Solar",
    description: "Projétil de luz.",
    concept: "Condensar luz",
    function: "Ataque",
    manifestation: "Lança",
    range: "20 metros",
    duration: "Instantânea",
    cost: "Cansaço",
    limitations: "Uma vez por cena",
    countermeasures: "Cobertura",
    risks: "Cegueira",
    affinityId: "solar",
    example: "Disparo frontal",
    basePowerId: "",
    revision: 1,
    previousRequestId: "",
    xp: 0,
    createdAt: serverTimestamp(),
  };
  await assertSucceeds(setDoc(doc(db, "progressRequests", "power-new"), baseRequest));
  await assertFails(updateDoc(doc(db, "progressRequests", "power-new"), { status: "aprovado" }));
  await assertFails(updateDoc(doc(db, "progressRequests", "power-new"), {
    status: "pendente",
    description: "Player tentou reescrever.",
    revision: 2,
    updatedAt: serverTimestamp(),
  }));

  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "progressRequests", "power-proposal"), {
      ...baseRequest,
      status: "aguardando confirmação",
      proposedTitle: "Lança Solar Regulada",
      proposedDescription: "Versão balanceada pelo Oráculo.",
      createdAt: new Date(),
    });
  });
  await assertSucceeds(updateDoc(doc(db, "progressRequests", "power-proposal"), {
    status: "aceito pelo player",
    playerResponse: "Concordo com a versão apresentada pelo Oráculo.",
    playerRespondedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }));

  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "progressRequests", "power-contest"), {
      ...baseRequest,
      status: "aguardando confirmação",
      createdAt: new Date(),
    });
  });
  await assertSucceeds(updateDoc(doc(db, "progressRequests", "power-contest"), {
    status: "contestado pelo player",
    playerResponse: "A limitação contradiz o conceito original.",
    playerRespondedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }));
});

test("market and guild requests preserve current application fields with bounded rewards", async () => {
  const db = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  await assertSucceeds(setDoc(doc(db, "progressRequests", "market-001"), {
    uid: "player-a",
    playerName: "A",
    characterName: "Ariadne",
    type: "market",
    status: "pendente",
    marketId: "lamina-celeste",
    title: "Mercado - Lâmina Celeste",
    description: "Pedido de item.",
    rarity: "Raro",
    reward: "Lâmina Celeste",
    xp: 0,
    createdAt: serverTimestamp(),
  }));
  await assertFails(setDoc(doc(db, "progressRequests", "market-xp-forged"), {
    uid: "player-a",
    playerName: "A",
    characterName: "Ariadne",
    type: "market",
    status: "pendente",
    marketId: "lamina-celeste",
    title: "Mercado forjado",
    description: "Tentativa de XP.",
    xp: 999,
    createdAt: serverTimestamp(),
  }));
  await assertFails(setDoc(doc(db, "progressRequests", "guild-overflow"), {
    uid: "player-a",
    playerName: "A",
    characterName: "Ariadne",
    type: "guildMission",
    status: "pendente",
    guildId: "guild-a",
    guildName: "Guilda A",
    partyIds: ["player-a", "player-b", "p3", "p4", "p5"],
    title: "Missão excedente",
    description: "Party acima do limite.",
    rarity: "Raro",
    reward: "Registro",
    xp: 100,
    createdAt: serverTimestamp(),
  }));
});

test("private public-profile projection is visible only to owner and admin", async () => {
  const ownerDb = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  const otherDb = environment.authenticatedContext("player-b", { email: "b@example.invalid" }).firestore();
  const adminDb = environment.authenticatedContext("oracle", { email: "oracle@example.invalid" }).firestore();
  await assertSucceeds(setDoc(doc(ownerDb, "publicProfiles", "player-a"), {
    ownerId: "player-a",
    name: "Ariadne",
    player: "A",
    privacy: "private",
    updatedAt: serverTimestamp(),
  }));
  await assertSucceeds(getDoc(doc(ownerDb, "publicProfiles", "player-a")));
  await assertFails(getDoc(doc(otherDb, "publicProfiles", "player-a")));
  await assertSucceeds(getDoc(doc(adminDb, "publicProfiles", "player-a")));
});

test("admin can delete test records and a tombstone blocks profile recreation", async () => {
  const adminDb = environment.authenticatedContext("oracle", { email: "oracle@example.invalid" }).firestore();
  const playerDb = environment.authenticatedContext("player-a", { email: "a@example.invalid" }).firestore();
  await assertFails(deleteDoc(doc(playerDb, "characters", "player-a")));
  await assertSucceeds(deleteDoc(doc(adminDb, "characters", "player-a")));
  await assertSucceeds(setDoc(doc(adminDb, "deletedUsers", "player-a"), {
    uid: "player-a",
    displayName: "A",
    reason: "Conta de teste",
    deletedBy: "oracle",
    createdAt: serverTimestamp(),
  }));
  await environment.withSecurityRulesDisabled(async (context) => {
    await deleteDoc(doc(context.firestore(), "users", "player-a"));
  });
  await assertFails(setDoc(doc(playerDb, "users", "player-a"), {
    role: "player",
    email: "a@example.invalid",
    displayName: "A",
  }));
});

test("report review requires an audit record in the same batch", async () => {
  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "reports", "report-review"), {
      type: "bug",
      status: "recebido",
      reporterId: "player-a",
      reporterName: "A",
      targetId: "",
      title: "Falha",
      description: "Falha de teste.",
      createdAt: new Date(),
    });
  });
  const adminDb = environment.authenticatedContext("oracle", { email: "oracle@example.invalid" }).firestore();
  await assertFails(updateDoc(doc(adminDb, "reports", "report-review"), { status: "resolvido" }));
  const batch = writeBatch(adminDb);
  batch.set(doc(adminDb, "auditLogs", "audit-report-0001"), {
    adminId: "oracle",
    targetId: "report-review",
    field: "status",
    previousValue: "recebido",
    nextValue: "resolvido",
    reason: "Revisão administrativa do report.",
    createdAt: serverTimestamp(),
  });
  batch.update(doc(adminDb, "reports", "report-review"), {
    status: "resolvido",
    reviewedBy: "oracle",
    reviewedAt: serverTimestamp(),
    adminNote: "Resolvido em teste.",
    lastAuditId: "audit-report-0001",
    updatedAt: serverTimestamp(),
  });
  await assertSucceeds(batch.commit());
});
