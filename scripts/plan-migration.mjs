import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

globalThis.window = globalThis;
await import(`../millennium-backend.js?migration=${Date.now()}`);
const backend = globalThis.MILLENNIUM_BACKEND_31;

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "migration-dry-run.json";
if (!inputPath) {
  console.error("Uso: node scripts/plan-migration.mjs <export-anonimizado.json> [saida.json]");
  process.exitCode = 1;
} else {
  const source = JSON.parse(await readFile(resolve(inputPath), "utf8"));
  const characters = Array.isArray(source) ? source : Array.isArray(source.characters) ? source.characters : Object.values(source.characters || source);
  const plans = characters.map((character) => backend.arrayDocumentPlan(character, 3));
  const result = {
    generatedAt: new Date().toISOString(),
    dryRun: true,
    source: resolve(inputPath),
    characters: plans.length,
    skipped: plans.filter((plan) => plan.skip).length,
    operations: plans.reduce((sum, plan) => sum + plan.operations.length, 0),
    plans,
    rollbacks: plans.map(backend.migrationRollbackPlan),
    warning: "Este arquivo não executa escritas. Arrays antigos devem permanecer até validação posterior.",
  };
  await writeFile(resolve(outputPath), `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Plano dry-run criado: ${resolve(outputPath)}`);
  console.log(`Fichas: ${result.characters} · operações propostas: ${result.operations} · ignoradas: ${result.skipped}`);
}
