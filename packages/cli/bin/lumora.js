#!/usr/bin/env node
// @ts-check

/**
 * lumora — installer CLI for Lumora UI. Interfaces that glow.
 *
 * Components are distributed as source: `lumora add` copies the .tsx files
 * (plus the shared lib files they need) straight into your project and
 * rewrites their relative imports to your configured aliases. There is no
 * runtime dependency on this package.
 *
 * Commands:
 *   lumora init            scaffold lumora.json, dirs, and design tokens
 *   lumora add <name...>   copy components and their deps into your project
 *   lumora list            show everything available in the registry
 *
 * This file is the single source of truth (plain ESM + JSDoc types, checked
 * by `tsc --noEmit` via checkJs) — there is no src/ or build step.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const VERSION = "0.1.0";
const CONFIG_FILE = "lumora.json";
const DEFAULT_REGISTRY_URL =
  "https://raw.githubusercontent.com/dimssu/lumora-ui/main/registry/registry.json";
const BASE_NPM_DEPS = [
  "motion",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
];
/** Managed by the user's framework — never listed as "still needed". */
const PEER_DEPS = new Set(["react", "react-dom"]);

/* ───────────────────────────── types ───────────────────────────── */

/**
 * @typedef {"component" | "block" | "ai" | "icon"} Category
 *
 * @typedef {object} RegistryItem
 * @property {string} name
 * @property {Category} category
 * @property {string} path repo-relative path to the source file
 * @property {string} description
 * @property {string[]} internalDeps registry ids ("lib/cn", "button", "block/hero", …)
 * @property {string[]} npmDeps
 *
 * @typedef {object} RegistryLibEntry
 * @property {string} path
 * @property {string[]} [npmDeps]
 *
 * @typedef {object} Registry
 * @property {string} name
 * @property {number} version
 * @property {{ path: string }} tokens
 * @property {Record<string, RegistryLibEntry>} lib
 * @property {RegistryItem[]} items
 *
 * @typedef {{ type: "local", root: string } | { type: "remote", base: string }} RegistrySource
 *
 * @typedef {object} Config
 * @property {string} componentDir
 * @property {string} iconDir
 * @property {{ components: string, icons: string }} aliases
 *
 * @typedef {object} InstallUnit
 * @property {string} id registry id
 * @property {Category | "lib"} category
 * @property {string} sourcePath repo-relative source path
 * @property {string[]} npmDeps
 */

/* ──────────────────────────── output ───────────────────────────── */

const useColor = Boolean(process.stdout.isTTY) && !process.env.NO_COLOR;

/**
 * @param {number} open @param {number} close
 * @returns {(s: string) => string}
 */
const paint = (open, close) => (s) =>
  useColor ? `\x1b[${open}m${s}\x1b[${close}m` : s;

const bold = paint(1, 22);
const dim = paint(2, 22);
const red = paint(31, 39);
const green = paint(32, 39);
const yellow = paint(33, 39);
const cyan = paint(36, 39);

/** @param {string} msg */
const ok = (msg) => console.log(`${green("✓")} ${msg}`);
/** @param {string} msg */
const warn = (msg) => console.log(`${yellow("!")} ${msg}`);
/** @param {string} msg */
const note = (msg) => console.log(dim(`  ${msg}`));
/** @param {string} title */
const heading = (title) => console.log(`\n${bold(title)}\n`);

/**
 * @param {string} msg
 * @returns {never}
 */
function fail(msg) {
  console.error(`${red("error")} ${msg}`);
  process.exit(1);
}

/* ─────────────────────────── arg parsing ───────────────────────── */

/** @type {string[]} */
const positionals = [];
/** @type {Set<string>} */
const flags = new Set();
for (const arg of process.argv.slice(2)) {
  if (arg.startsWith("--")) flags.add(arg.slice(2));
  else positionals.push(arg);
}
const command = positionals.shift();

/* ────────────────────────── fs utilities ───────────────────────── */

/**
 * Walk up from `startDir` looking for `name`; return the full path or null.
 * @param {string} startDir @param {string} name
 * @returns {string | null}
 */
function findUp(startDir, name) {
  let dir = path.resolve(startDir);
  for (;;) {
    const candidate = path.join(dir, name);
    if (existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/**
 * Detect the package manager from the nearest lockfile.
 * @param {string} cwd
 * @returns {"pnpm" | "yarn" | "bun" | "npm"}
 */
function detectPackageManager(cwd) {
  /** @type {Array<["pnpm" | "yarn" | "bun" | "npm", string]>} */
  const lockfiles = [
    ["pnpm", "pnpm-lock.yaml"],
    ["yarn", "yarn.lock"],
    ["bun", "bun.lockb"],
    ["bun", "bun.lock"],
    ["npm", "package-lock.json"],
  ];
  let dir = path.resolve(cwd);
  for (;;) {
    for (const [pm, file] of lockfiles) {
      if (existsSync(path.join(dir, file))) return pm;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return "npm";
    dir = parent;
  }
}

/**
 * The install command for a package manager.
 * @param {"pnpm" | "yarn" | "bun" | "npm"} pm @param {string[]} packages
 */
function installCommand(pm, packages) {
  const verb = pm === "npm" ? "install" : "add";
  return `${pm} ${verb} ${packages.join(" ")}`;
}

/* ──────────────────────────── config ───────────────────────────── */

/** @type {Config} */
const DEFAULT_CONFIG = {
  componentDir: "components/lumora",
  iconDir: "components/icons",
  aliases: {
    components: "@/components/lumora",
    icons: "@/components/icons",
  },
};

/**
 * Fill any missing config fields with defaults (aliases derive from dirs).
 * @param {Partial<Config> & { aliases?: Partial<Config["aliases"]> }} raw
 * @returns {Config}
 */
function normalizeConfig(raw) {
  const componentDir =
    typeof raw.componentDir === "string"
      ? raw.componentDir
      : DEFAULT_CONFIG.componentDir;
  const iconDir =
    typeof raw.iconDir === "string" ? raw.iconDir : DEFAULT_CONFIG.iconDir;
  /** @param {string} dir */
  const aliasFor = (dir) => "@/" + dir.replace(/^\.?\//, "");
  return {
    componentDir,
    iconDir,
    aliases: {
      components: raw.aliases?.components ?? aliasFor(componentDir),
      icons: raw.aliases?.icons ?? aliasFor(iconDir),
    },
  };
}

/* ──────────────────────────── registry ─────────────────────────── */

/**
 * Base URL that registry paths are resolved against
 * ("…/registry/registry.json" → "…/").
 * @param {string} url
 */
function baseOfUrl(url) {
  const suffix = "registry/registry.json";
  return url.endsWith("/" + suffix)
    ? url.slice(0, url.length - suffix.length)
    : url.slice(0, url.lastIndexOf("/") + 1);
}

/**
 * Repo root for a local registry file (the parent of its registry/ dir).
 * @param {string} file
 */
function rootOfRegistryFile(file) {
  const dir = path.dirname(file);
  return path.basename(dir) === "registry" ? path.dirname(dir) : dir;
}

/**
 * Find a development checkout's registry: next to this script
 * (packages/cli/bin → repo root) or upward from the working directory.
 * @returns {string | null}
 */
function findLocalRegistry() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, "..", "..", "..", "registry", "registry.json"),
  ];
  let dir = process.cwd();
  for (;;) {
    candidates.push(path.join(dir, "registry", "registry.json"));
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return candidates.find((c) => existsSync(c)) ?? null;
}

/**
 * @param {string} url
 * @returns {Promise<Registry>}
 */
async function fetchRegistryJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${url} responded with ${res.status}`);
  return /** @type {Promise<Registry>} */ (res.json());
}

/**
 * Resolve the registry: $LUMORA_REGISTRY override (URL or file path), else
 * the published GitHub registry, else a local checkout (development).
 * @returns {Promise<{ registry: Registry, source: RegistrySource }>}
 */
async function loadRegistry() {
  const env = process.env.LUMORA_REGISTRY;
  if (env) {
    if (/^https?:\/\//.test(env)) {
      return {
        registry: await fetchRegistryJson(env),
        source: { type: "remote", base: baseOfUrl(env) },
      };
    }
    const file = path.resolve(env);
    if (!existsSync(file)) fail(`LUMORA_REGISTRY points to a missing file: ${file}`);
    return {
      registry: JSON.parse(await readFile(file, "utf8")),
      source: { type: "local", root: rootOfRegistryFile(file) },
    };
  }
  try {
    return {
      registry: await fetchRegistryJson(DEFAULT_REGISTRY_URL),
      source: { type: "remote", base: baseOfUrl(DEFAULT_REGISTRY_URL) },
    };
  } catch (err) {
    const local = findLocalRegistry();
    if (local) {
      note(`registry: using local ${local}`);
      return {
        registry: JSON.parse(await readFile(local, "utf8")),
        source: { type: "local", root: rootOfRegistryFile(local) },
      };
    }
    const reason = err instanceof Error ? err.message : String(err);
    return fail(
      `could not load the Lumora registry (${reason}). ` +
        `Set LUMORA_REGISTRY to a registry.json URL or file path.`,
    );
  }
}

/**
 * Read a registry-referenced source file from disk or over HTTP.
 * @param {RegistrySource} source @param {string} relPath
 * @returns {Promise<string>}
 */
async function loadSourceFile(source, relPath) {
  if (source.type === "local") {
    return readFile(path.join(source.root, relPath), "utf8");
  }
  const url = source.base + relPath;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`failed to download ${url} (${res.status})`);
  return res.text();
}

/* ─────────────────────── resolution & rewrite ──────────────────── */

/** @param {RegistryItem} item */
const idOf = (item) =>
  item.category === "component" ? item.name : `${item.category}/${item.name}`;

/**
 * Where an installed file lands inside the user's project.
 * @param {InstallUnit} unit @param {Config} config @param {string} projectRoot
 */
function targetFor(unit, config, projectRoot) {
  const file = path.basename(unit.sourcePath);
  switch (unit.category) {
    case "icon":
      return path.join(projectRoot, config.iconDir, file);
    case "block":
      return path.join(projectRoot, config.componentDir, "blocks", file);
    case "ai":
      return path.join(projectRoot, config.componentDir, "ai", file);
    case "lib": {
      const dir = unit.id === "lib/icon" ? config.iconDir : config.componentDir;
      return path.join(projectRoot, dir, "lib", file);
    }
    default:
      return path.join(projectRoot, config.componentDir, file);
  }
}

/**
 * Map a relative import specifier to its aliased path in the user's project.
 * Returns null when the specifier should be left untouched.
 * @param {string} spec @param {Category | "lib"} category @param {Config} config
 * @returns {string | null}
 */
function mapImport(spec, category, config) {
  const norm = spec.replace(/\.(tsx|ts)$/, "");
  const m = norm.match(/^(?:\.\.?\/)+(lib|components|blocks|ai|icons)\/([\w.-]+)$/);
  const { components, icons } = config.aliases;
  if (m) {
    const kind = m[1];
    const name = m[2];
    if (kind === "lib") {
      const fromIcons = category === "icon" || (category === "lib" && name === "icon");
      return `${fromIcons ? icons : components}/lib/${name}`;
    }
    if (kind === "components") return `${components}/${name}`;
    if (kind === "blocks") return `${components}/blocks/${name}`;
    if (kind === "ai") return `${components}/ai/${name}`;
    if (kind === "icons") return `${icons}/${name}`;
  }
  const sibling = norm.match(/^\.\/([\w.-]+)$/);
  if (sibling) {
    if (category === "component") return `${components}/${sibling[1]}`;
    if (category === "block") return `${components}/blocks/${sibling[1]}`;
    if (category === "ai") return `${components}/ai/${sibling[1]}`;
    if (category === "icon") return `${icons}/${sibling[1]}`;
  }
  return null;
}

/**
 * Rewrite every relative import in a source file to the configured aliases.
 * @param {string} content @param {Category | "lib"} category @param {Config} config
 */
function rewriteImports(content, category, config) {
  return content.replace(
    /(\bfrom\s+["'])(\.\.?\/[^"']+)(["'])/g,
    (full, pre, spec, post) => {
      const mapped = mapImport(spec, category, config);
      return mapped ? `${pre}${mapped}${post}` : full;
    },
  );
}

/**
 * Resolve requested names (plus transitive internal deps) to install units.
 * @param {Registry} registry @param {string[]} names
 * @returns {InstallUnit[]}
 */
function resolveInstallUnits(registry, names) {
  /** @type {Map<string, InstallUnit>} */
  const plan = new Map();
  /** @type {string[]} */
  const queue = names.map((n) => n.replace(/^component\//, ""));
  /** @type {string[]} */
  const missing = [];

  while (queue.length > 0) {
    const id = queue.shift();
    if (!id || plan.has(id)) continue;

    if (id.startsWith("lib/")) {
      const lib = registry.lib[id];
      if (!lib) {
        missing.push(id);
        continue;
      }
      plan.set(id, {
        id,
        category: "lib",
        sourcePath: lib.path,
        npmDeps: lib.npmDeps ?? [],
      });
      continue;
    }

    const m = /^(block|ai|icon)\/(.+)$/.exec(id);
    const category = /** @type {Category} */ (m?.[1] ?? "component");
    const name = m?.[2] ?? id;
    const item = registry.items.find(
      (i) => i.category === category && i.name === name,
    );
    if (!item) {
      const elsewhere = registry.items
        .filter((i) => i.name === name)
        .map((i) => idOf(i));
      missing.push(
        elsewhere.length > 0
          ? `${id} ${dim(`(did you mean ${elsewhere.join(" or ")}?)`)}`
          : id,
      );
      continue;
    }
    plan.set(id, {
      id,
      category: item.category,
      sourcePath: item.path,
      npmDeps: item.npmDeps,
    });
    queue.push(...item.internalDeps);
  }

  if (missing.length > 0) {
    fail(
      `not in the registry: ${missing.join(", ")}\n` +
        `       Run ${cyan("lumora list")} to see what's available.`,
    );
  }
  return [...plan.values()];
}

/* ──────────────────────────── commands ─────────────────────────── */

async function cmdInit() {
  const cwd = process.cwd();
  heading("Lumora UI — init");

  const pm = detectPackageManager(cwd);
  ok(`Detected package manager: ${bold(pm)}`);

  // 1. Config file.
  const configPath = path.join(cwd, CONFIG_FILE);
  /** @type {Config} */
  let config = DEFAULT_CONFIG;
  if (existsSync(configPath)) {
    config = normalizeConfig(JSON.parse(await readFile(configPath, "utf8")));
    warn(`${CONFIG_FILE} already exists — keeping your settings.`);
  } else {
    await writeFile(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2) + "\n");
    ok(`Created ${CONFIG_FILE}`);
  }

  // 2. Directories.
  await mkdir(path.join(cwd, config.componentDir, "lib"), { recursive: true });
  await mkdir(path.join(cwd, config.iconDir), { recursive: true });
  ok(`Ensured ${config.componentDir}/ and ${config.iconDir}/`);

  // 3. Design tokens.
  const cssTarget = path.join(cwd, config.componentDir, "lumora.css");
  const cssRel = path.relative(cwd, cssTarget);
  if (existsSync(cssTarget) && !flags.has("overwrite")) {
    note(`${cssRel} already exists, left untouched (use --overwrite to refresh)`);
  } else {
    try {
      const { registry, source } = await loadRegistry();
      const css = await loadSourceFile(source, registry.tokens.path);
      await writeFile(cssTarget, css);
      ok(`Copied design tokens → ${cssRel}`);
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      warn(`Could not copy lumora.css (${reason}) — rerun init when online.`);
    }
  }

  // 4. Wiring instructions.
  heading("Next steps");
  console.log(`  1. Install the runtime dependencies:`);
  console.log(`       ${cyan(installCommand(pm, BASE_NPM_DEPS))}\n`);
  console.log(`  2. Import the design tokens once in your global stylesheet:`);
  console.log(`       ${cyan(`@import "./${config.componentDir}/lumora.css";`)}`);
  note(`adjust the relative path to where your globals.css lives`);
  console.log(`\n  3. Make sure Tailwind scans the installed components:`);
  console.log(`       Tailwind v4 — covered automatically when ${config.componentDir}/ is inside a scanned source root;`);
  console.log(`       otherwise add ${cyan(`@source "./${config.componentDir}";`)} to your CSS.`);
  console.log(`       Tailwind v3 — add ${cyan(`"./${config.componentDir}/**/*.{ts,tsx}"`)} to \`content\`.`);
  console.log(`\n  4. Add your first component:`);
  console.log(`       ${cyan("npx lumora add button")}\n`);
}

/** @param {string[]} names */
async function cmdAdd(names) {
  if (names.length === 0) {
    fail(`nothing to add. Usage: ${cyan("lumora add <name...>")} — e.g. ${cyan("lumora add button block/hero icon/mail")}`);
  }
  const cwd = process.cwd();
  const configPath = findUp(cwd, CONFIG_FILE);
  if (!configPath) {
    fail(`no ${CONFIG_FILE} found. Run ${cyan("lumora init")} first.`);
  }
  const projectRoot = path.dirname(configPath);
  const config = normalizeConfig(JSON.parse(await readFile(configPath, "utf8")));
  const { registry, source } = await loadRegistry();
  const units = resolveInstallUnits(registry, names);

  heading(`Adding ${units.length} file(s)`);
  const overwrite = flags.has("overwrite");
  /** @type {Set<string>} */
  const npmDeps = new Set();
  let written = 0;
  let skipped = 0;

  for (const unit of units) {
    for (const dep of unit.npmDeps) {
      if (!PEER_DEPS.has(dep)) npmDeps.add(dep);
    }
    const target = targetFor(unit, config, projectRoot);
    const rel = path.relative(cwd, target) || target;
    if (existsSync(target) && !overwrite) {
      if (names.includes(unit.id)) {
        warn(`${rel} already exists — skipped (pass ${cyan("--overwrite")} to replace)`);
      } else {
        note(`${unit.id} already installed (${rel})`);
      }
      skipped += 1;
      continue;
    }
    const raw = await loadSourceFile(source, unit.sourcePath);
    const content = rewriteImports(raw, unit.category, config);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content);
    ok(`${unit.id} → ${rel}`);
    written += 1;
  }

  console.log();
  console.log(dim(`${written} written, ${skipped} skipped.`));
  if (npmDeps.size > 0) {
    const pm = detectPackageManager(projectRoot);
    console.log(`\nMake sure these npm packages are installed:\n`);
    console.log(`  ${cyan(installCommand(pm, [...npmDeps].sort()))}\n`);
  }
  if (!existsSync(path.join(projectRoot, config.componentDir, "lumora.css"))) {
    warn(`design tokens not found — run ${cyan("lumora init")} to copy lumora.css.`);
  }
}

async function cmdList() {
  const { registry } = await loadRegistry();
  /** @type {Array<[Category, string]>} */
  const groups = [
    ["component", "Components"],
    ["block", "Blocks"],
    ["ai", "AI"],
    ["icon", "Icons"],
  ];
  for (const [category, label] of groups) {
    const items = registry.items
      .filter((item) => item.category === category)
      .sort((a, b) => a.name.localeCompare(b.name));
    if (items.length === 0) continue;
    heading(`${label} ${dim(`(${items.length})`)}`);
    const width = Math.max(...items.map((item) => idOf(item).length));
    for (const item of items) {
      console.log(`  ${cyan(idOf(item).padEnd(width + 2))}${dim(item.description)}`);
    }
  }
  console.log(
    `\n${dim(`${registry.items.length} item(s).`)} Install with ${cyan("lumora add <name>")}\n`,
  );
}

function printHelp() {
  console.log(`
${bold("lumora")} ${dim(`v${VERSION}`)} — installer for Lumora UI. ${dim("Interfaces that glow.")}

${bold("Usage")}
  lumora <command> [options]

${bold("Commands")}
  ${cyan("init")}              Set up ${CONFIG_FILE}, dirs, and design tokens
  ${cyan("add <name...>")}     Copy components into your project
                    ${dim("names: button · block/hero · ai/chat-widget · icon/mail")}
  ${cyan("list")}              Show every component in the registry
  ${cyan("help")}              Show this message

${bold("Options")}
  ${cyan("--overwrite")}       Replace files that already exist
  ${cyan("--version")}         Print the CLI version

${bold("Environment")}
  ${cyan("LUMORA_REGISTRY")}   registry.json URL or file path ${dim("(overrides the default)")}

${bold("Examples")}
  npx lumora init
  npx lumora add button animated-tooltip
  npx lumora add block/hero icon/mail --overwrite
`);
}

/* ───────────────────────────── main ────────────────────────────── */

async function main() {
  if (command === "version" || flags.has("version")) {
    console.log(VERSION);
    return;
  }
  if (!command || command === "help" || flags.has("help")) {
    printHelp();
    return;
  }
  switch (command) {
    case "init":
      await cmdInit();
      break;
    case "add":
      await cmdAdd(positionals);
      break;
    case "list":
      await cmdList();
      break;
    default:
      fail(`unknown command "${command}". Run ${cyan("lumora help")}.`);
  }
}

main().catch((err) => {
  console.error(`${red("error")} ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
