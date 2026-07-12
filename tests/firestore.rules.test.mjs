import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { readFile } from "node:fs/promises";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
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
