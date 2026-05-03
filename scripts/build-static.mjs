import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const outputDir = path.join(rootDir, "dist");

const requiredEntries = [
  "index.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "assets",
];

const optionalEntries = ["_headers", "_redirects"];

async function copyEntry(entry) {
  const source = path.join(rootDir, entry);
  const target = path.join(outputDir, entry);
  await cp(source, target, { recursive: true });
}

async function exists(entry) {
  try {
    await stat(path.join(rootDir, entry));
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") return false;
    throw error;
  }
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const entry of requiredEntries) {
  if (!(await exists(entry))) {
    throw new Error(`Missing required public entry: ${entry}`);
  }

  await copyEntry(entry);
}

for (const entry of optionalEntries) {
  if (await exists(entry)) {
    await copyEntry(entry);
  }
}

console.log(`Built static site in ${path.relative(rootDir, outputDir)}`);
