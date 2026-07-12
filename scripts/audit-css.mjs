import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const files = ["styles.css", "overrides.css", "journey.css", "backend.css", "polish.css"];
const selectorOwners = new Map();
const summary = {};

for (const file of files) {
  const text = await readFile(path.join(root, file), "utf8");
  const withoutComments = text.replace(/\/\*[\s\S]*?\*\//g, "");
  const selectors = [...withoutComments.matchAll(/(^|})\s*([^@}{][^{]+)\{/gm)]
    .flatMap((match) => match[2].split(","))
    .map((selector) => selector.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const counts = new Map();
  for (const selector of selectors) {
    counts.set(selector, (counts.get(selector) || 0) + 1);
    if (!selectorOwners.has(selector)) selectorOwners.set(selector, new Set());
    selectorOwners.get(selector).add(file);
  }
  summary[file] = {
    bytes: Buffer.byteLength(text),
    selectors: selectors.length,
    repeatedInsideFile: [...counts.values()].filter((count) => count > 1).length,
    importantDeclarations: (text.match(/!important/g) || []).length,
    mediaQueries: (text.match(/@media/g) || []).length,
  };
}

const crossFileDuplicates = [...selectorOwners]
  .filter(([, owners]) => owners.size > 1)
  .map(([selector, owners]) => ({ selector, files: [...owners] }))
  .sort((a, b) => b.files.length - a.files.length || a.selector.localeCompare(b.selector));

const result = {
  generatedAt: new Date().toISOString(),
  files: summary,
  crossFileDuplicateCount: crossFileDuplicates.length,
  crossFileDuplicates: crossFileDuplicates.slice(0, 80),
  policy: "Operation 4 keeps legacy selectors for compatibility and centralizes new Codex, minigame, diagnostic and accessibility rules in polish.css.",
};
await writeFile(path.join(root, "qa", "operation4-css-audit.json"), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ files: summary, crossFileDuplicateCount: result.crossFileDuplicateCount }, null, 2));
