#!/usr/bin/env node
/**
 * Packages the lumora-builder skill into a downloadable zip for the docs
 * site: skills/lumora-builder/ → apps/web/public/lumora-builder-skill.zip.
 *
 * Idempotent — removes any previous archive before writing a fresh one.
 * Uses the system `zip` binary so the archive keeps the folder structure
 * (`lumora-builder/SKILL.md`, `lumora-builder/references/…`) agents expect.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(repoRoot, "skills");
const skillDir = join(skillsDir, "lumora-builder");
const publicDir = join(repoRoot, "apps", "web", "public");
const outFile = join(publicDir, "lumora-builder-skill.zip");

if (!existsSync(join(skillDir, "SKILL.md"))) {
  console.error(`build-skill-zip: skill not found at ${skillDir}`);
  process.exit(1);
}

mkdirSync(publicDir, { recursive: true });
rmSync(outFile, { force: true });

try {
  // cwd = skills/ so entries are rooted at lumora-builder/ inside the zip.
  execFileSync(
    "zip",
    ["-r", "-X", outFile, "lumora-builder", "-x", "*.DS_Store"],
    { cwd: skillsDir, stdio: ["ignore", "pipe", "pipe"] },
  );
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(
      "build-skill-zip: the `zip` binary is not installed or not on PATH.\n" +
        "Install it (macOS ships it by default; on Debian/Ubuntu: " +
        "`apt-get install zip`) and re-run `node scripts/build-skill-zip.mjs`.",
    );
  } else {
    console.error(
      `build-skill-zip: zip failed${error.stderr ? `\n${error.stderr}` : ""}`,
    );
  }
  process.exit(1);
}

const size = statSync(outFile).size;
console.log(
  `build-skill-zip: wrote ${outFile} (${(size / 1024).toFixed(1)} kB)`,
);
