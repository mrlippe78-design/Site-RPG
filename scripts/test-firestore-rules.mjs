import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const runtime = path.join(tmpdir(), "millennium-firebase-3.4");
const home = path.join(runtime, "home");
const cache = path.join(runtime, "cache");
const config = path.join(runtime, "config");
const emulators = path.join(runtime, "emulators");
for (const directory of [runtime, home, cache, config, emulators]) mkdirSync(directory, { recursive: true });

const firebaseCli = path.join(root, "node_modules", "firebase-tools", "lib", "bin", "firebase.js");
const environment = {
  ...process.env,
  HOME: home,
  USERPROFILE: home,
  XDG_CACHE_HOME: cache,
  XDG_CONFIG_HOME: config,
  FIREBASE_EMULATORS_PATH: emulators,
  NO_UPDATE_NOTIFIER: "1",
  CI: "1",
};

const child = spawn(process.execPath, [
  firebaseCli,
  "emulators:exec",
  "--project", "demo-millennium-rpg",
  "--only", "firestore",
  "node --test tests/firestore.rules.test.mjs",
], {
  cwd: root,
  env: environment,
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error(`Não foi possível iniciar o Firebase Emulator: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  if (signal) console.error(`Firebase Emulator interrompido por ${signal}.`);
  process.exitCode = code ?? 1;
});
