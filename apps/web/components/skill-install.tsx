"use client";

import * as React from "react";
import { AnimatedTabs, Button } from "@lumora/ui";
import { CodeBlock } from "./code-block";

const ZIP_PATH = "/lumora-builder-skill.zip";

/** Hero CTA: the library Button, accent + shimmer, pointed at the zip. */
export function SkillDownloadButton() {
  return (
    <Button
      variant="accent"
      size="lg"
      shimmer
      onClick={() => window.location.assign(ZIP_PATH)}
    >
      Download the skill
      <span aria-hidden>↓</span>
    </Button>
  );
}

function ClaudeCodeInstall() {
  return (
    <div className="space-y-4 pt-4">
      <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
        Unzip the download into your skills directory — globally for every
        project, or per-project alongside the code:
      </p>
      <CodeBlock
        caption="terminal — global"
        code={`unzip lumora-builder-skill.zip -d ~/.claude/skills/
# → ~/.claude/skills/lumora-builder/SKILL.md`}
      />
      <CodeBlock
        caption="terminal — per-project"
        code={`unzip lumora-builder-skill.zip -d .claude/skills/
# → .claude/skills/lumora-builder/SKILL.md`}
      />
      <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
        That&rsquo;s the whole install. Next time you ask for a page —
        &ldquo;build a pricing section with Lumora&rdquo; — the skill triggers
        automatically and the agent composes from the real catalog.
      </p>
    </div>
  );
}

function ClaudeAppsInstall() {
  return (
    <div className="space-y-4 pt-4">
      <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
        In the Claude web or desktop app, upload the zip once and it&rsquo;s
        available in every conversation:
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
        <li>
          Open{" "}
          <span className="font-medium text-[var(--lm-fg)]">
            Settings → Capabilities → Skills
          </span>
          .
        </li>
        <li>
          Choose{" "}
          <span className="font-medium text-[var(--lm-fg)]">Upload skill</span>{" "}
          and pick{" "}
          <code className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1.5 py-0.5 font-mono text-xs">
            lumora-builder-skill.zip
          </code>
          .
        </li>
        <li>
          Ask for a Lumora screen — the skill loads on its own whenever a
          request matches.
        </li>
      </ol>
    </div>
  );
}

/** Two-tab install guide using the library's AnimatedTabs. */
export function SkillInstallTabs() {
  return (
    <AnimatedTabs
      items={[
        {
          value: "claude-code",
          label: "Claude Code",
          content: <ClaudeCodeInstall />,
        },
        {
          value: "claude-apps",
          label: "Claude apps (web & desktop)",
          content: <ClaudeAppsInstall />,
        },
      ]}
    />
  );
}
