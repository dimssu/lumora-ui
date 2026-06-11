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

function Step({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3.5">
      <span
        aria-hidden
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-xs font-semibold text-[var(--lm-fg)]"
      >
        {n}
      </span>
      <div className="min-w-0 flex-1 space-y-3">{children}</div>
    </li>
  );
}

function ClaudeCodeInstall() {
  return (
    <div className="pt-4">
      <ol className="flex flex-col gap-5">
        <Step n={1}>
          <p className="text-sm font-medium text-[var(--lm-fg)]">
            Pick a destination
          </p>
          <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            Unzip into your skills directory — globally for every project, or
            per-project alongside the code.
          </p>
        </Step>
        <Step n={2}>
          <p className="text-sm font-medium text-[var(--lm-fg)]">
            Unzip it there
          </p>
          <CodeBlock
            caption="terminal — global (all projects)"
            code={`unzip lumora-builder-skill.zip -d ~/.claude/skills/
# → ~/.claude/skills/lumora-builder/SKILL.md`}
          />
          <CodeBlock
            caption="terminal — per-project (this repo only)"
            code={`unzip lumora-builder-skill.zip -d .claude/skills/
# → .claude/skills/lumora-builder/SKILL.md`}
          />
        </Step>
        <Step n={3}>
          <p className="text-sm font-medium text-[var(--lm-fg)]">
            Just ask
          </p>
          <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            Next time you ask for a page —{" "}
            <span className="text-[var(--lm-fg)]">
              &ldquo;build a pricing section with Lumora&rdquo;
            </span>{" "}
            — the skill triggers automatically and the agent composes from the
            real catalog.
          </p>
        </Step>
      </ol>
    </div>
  );
}

function ClaudeAppsInstall() {
  return (
    <div className="pt-4">
      <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
        In the Claude web or desktop app, upload the zip once and it&rsquo;s
        available in every conversation.
      </p>
      <ol className="mt-5 flex flex-col gap-5">
        <Step n={1}>
          <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            Open{" "}
            <span className="font-medium text-[var(--lm-fg)]">
              Settings → Capabilities → Skills
            </span>
            .
          </p>
        </Step>
        <Step n={2}>
          <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            Choose{" "}
            <span className="font-medium text-[var(--lm-fg)]">
              Upload skill
            </span>{" "}
            and pick{" "}
            <code className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1.5 py-0.5 font-mono text-xs">
              lumora-builder-skill.zip
            </code>
            .
          </p>
        </Step>
        <Step n={3}>
          <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            Ask for a Lumora screen — the skill loads on its own whenever a
            request matches.
          </p>
        </Step>
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
