#!/usr/bin/env node
/**
 * build-registry.mjs — generates `registry/registry.json` and
 * `registry/README.md` by scanning the workspace source trees at run time.
 *
 * Usage: node scripts/build-registry.mjs
 *
 * The script is idempotent: its output depends only on the source files
 * present when it runs (no timestamps, stable sort order). Directories that
 * do not exist yet (e.g. packages/icons while icons are still being written)
 * are skipped silently, so it is always safe to run.
 *
 * CI should re-run this script whenever packages/ui or packages/icons change.
 */

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "registry");

/** Source trees that produce registry items. */
const ITEM_SOURCES = [
  { category: "component", dir: "packages/ui/src/components" },
  { category: "block", dir: "packages/ui/src/blocks" },
  { category: "ai", dir: "packages/ui/src/ai" },
  { category: "icon", dir: "packages/icons/src/icons" },
];

/** Shared internal lib files distributed alongside items. */
const LIB_SOURCES = ["packages/ui/src/lib", "packages/icons/src/lib"];

/** Design tokens copied into projects by `lumora init`. */
const TOKENS_PATH = "packages/ui/styles/lumora.css";

/** Node builtins / peer-managed modules that never become npmDeps. */
const isBuiltin = (name) => name.startsWith("node:");

/** List .ts/.tsx files in a directory; empty when the directory is absent. */
async function listSourceFiles(absDir) {
  let entries;
  try {
    entries = await readdir(absDir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((e) => e.isFile() && /\.(tsx|ts)$/.test(e.name) && !e.name.endsWith(".d.ts"))
    .map((e) => e.name)
    .sort();
}

/** Remove block comments and full-line // comments before import scanning. */
function stripComments(code) {
  return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

/**
 * Map a relative import specifier to a registry id.
 * "../lib/cn" → "lib/cn", "../components/button" → "button",
 * "../blocks/hero" → "block/hero", "./mail" (in icons/) → "icon/mail".
 * Returns null when the import does not map to a distributable file.
 */
function relToDepId(spec, ownCategory) {
  const norm = spec.replace(/\.(tsx|ts)$/, "");
  const seg = norm.match(/^(?:\.\.\/)+(lib|components|blocks|ai|icons)\/([\w.-]+)$/);
  if (seg) {
    const [, kind, name] = seg;
    if (kind === "lib") return `lib/${name}`;
    if (kind === "components") return name;
    if (kind === "blocks") return `block/${name}`;
    if (kind === "ai") return `ai/${name}`;
    if (kind === "icons") return `icon/${name}`;
  }
  const sibling = norm.match(/^\.\/([\w.-]+)$/);
  if (sibling) {
    const name = sibling[1];
    return ownCategory === "component" ? name : `${ownCategory}/${name}`;
  }
  return null;
}

/** Normalise a bare import to its package name ("motion/react" → "motion"). */
function toPackageName(spec) {
  const parts = spec.split("/");
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

/** Collect internal (registry) and npm dependencies from a source file. */
function collectDeps(code, ownCategory, fileLabel) {
  const internal = new Set();
  const npm = new Set();
  const importRe = /(?:^|\n)\s*(?:import|export)\s+(?:[^'"]*?\bfrom\s+)?["']([^"']+)["']/g;
  const clean = stripComments(code);
  for (let m; (m = importRe.exec(clean)); ) {
    const spec = m[1];
    if (spec.startsWith(".")) {
      const id = relToDepId(spec, ownCategory);
      if (id) internal.add(id);
      else console.warn(`  warn: ${fileLabel}: unmapped relative import "${spec}"`);
    } else if (!isBuiltin(spec)) {
      npm.add(toPackageName(spec));
    }
  }
  return {
    internalDeps: [...internal].sort(),
    npmDeps: [...npm].sort(),
  };
}

/**
 * First sentence of the first JSDoc block that immediately precedes an
 * `export` statement (skips prop-level JSDoc inside interfaces).
 */
function extractDescription(code) {
  const re = /\/\*\*((?:(?!\*\/)[\s\S])*?)\*\/\s*export\s/;
  const m = re.exec(code);
  if (!m) return "";
  const text = m[1]
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter((line) => line && !line.startsWith("@"))
    .join(" ");
  const sentence = text.match(/^.*?[.!?](?=\s|$)/);
  return (sentence ? sentence[0] : text).trim();
}

const README = `# Lumora UI registry

\`registry.json\` is the machine-readable index the \`lumora\` CLI reads to
resolve \`lumora add <name>\` requests. It is **generated** — never edit it by
hand. Regenerate with:

\`\`\`sh
node scripts/build-registry.mjs
\`\`\`

CI must re-run that script whenever anything in \`packages/ui/src/\` or
\`packages/icons/src/\` changes, and commit the result.

## Format

\`\`\`jsonc
{
  "name": "lumora",
  "version": 1,                       // registry schema version
  "tokens": { "path": "packages/ui/styles/lumora.css" },
  "lib": {
    // shared internal files, keyed by registry id
    "lib/cn": { "path": "packages/ui/src/lib/cn.ts", "npmDeps": ["clsx", "tailwind-merge"] }
  },
  "items": [
    {
      "name": "button",               // file name without extension
      "category": "component",        // component | block | ai | icon
      "path": "packages/ui/src/components/button.tsx",
      "description": "First JSDoc sentence of the exported component.",
      "internalDeps": ["lib/cn", "lib/motion"],  // registry ids to install too
      "npmDeps": ["class-variance-authority", "motion", "react"]
    }
  ]
}
\`\`\`

Notes:

- The registry stays **light**: only paths and metadata. File contents are
  fetched by the CLI from the same base the registry was loaded from — the
  raw GitHub URL in production, the checkout root in development.
- Registry ids: components are addressed by bare name (\`button\`); other
  categories are prefixed (\`block/hero\`, \`ai/prompt-bar\`, \`icon/mail\`).
- \`internalDeps\` are detected from each file's relative imports;
  \`npmDeps\` from its bare package imports (\`motion/react\` → \`motion\`).
  \`react\`/\`react-dom\` are listed but treated as peers by the CLI.
`;

async function main() {
  const items = [];
  for (const src of ITEM_SOURCES) {
    const absDir = path.join(ROOT, src.dir);
    for (const file of await listSourceFiles(absDir)) {
      const repoPath = `${src.dir}/${file}`;
      const code = await readFile(path.join(absDir, file), "utf8");
      const name = file.replace(/\.(tsx|ts)$/, "");
      const { internalDeps, npmDeps } = collectDeps(code, src.category, repoPath);
      const selfId = src.category === "component" ? name : `${src.category}/${name}`;
      items.push({
        name,
        category: src.category,
        path: repoPath,
        description: extractDescription(code),
        internalDeps: internalDeps.filter((id) => id !== selfId),
        npmDeps,
      });
    }
  }

  const order = { component: 0, block: 1, ai: 2, icon: 3 };
  items.sort(
    (a, b) => order[a.category] - order[b.category] || a.name.localeCompare(b.name),
  );

  const lib = {};
  for (const dir of LIB_SOURCES) {
    for (const file of await listSourceFiles(path.join(ROOT, dir))) {
      const code = await readFile(path.join(ROOT, dir, file), "utf8");
      const id = `lib/${file.replace(/\.(tsx|ts)$/, "")}`;
      const { npmDeps } = collectDeps(code, "component", `${dir}/${file}`);
      lib[id] = { path: `${dir}/${file}`, npmDeps };
    }
  }

  const registry = {
    name: "lumora",
    version: 1,
    tokens: { path: TOKENS_PATH },
    lib,
    items,
  };

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(
    path.join(OUT_DIR, "registry.json"),
    JSON.stringify(registry, null, 2) + "\n",
  );
  await writeFile(path.join(OUT_DIR, "README.md"), README);
  console.log(
    `registry: ${items.length} item(s), ${Object.keys(lib).length} lib file(s) → registry/registry.json`,
  );
}

main().catch((err) => {
  console.error(`build-registry failed: ${err?.message ?? err}`);
  process.exit(1);
});
