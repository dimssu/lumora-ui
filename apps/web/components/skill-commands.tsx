"use client";

import * as React from "react";
import { AnimatedTabs } from "@lumora/ui";
import { CodeBlock } from "./code-block";

/* A: natural-language prompts grounded in the skill's real recipes. */
const prompts: { prompt: string; result: string }[] = [
  {
    prompt: "Build me a landing page with Lumora",
    result:
      "Composes Navbar → Hero → FeatureBento → Pricing → Testimonials → Faq → CtaBanner → Footer, with the lumen owned by the Hero above the fold.",
  },
  {
    prompt: "Create a dashboard shell with Lumora",
    result:
      "Frames a Sidebar + Topbar around a SpotlightCard + NumberTicker stat row and AnimatedTabs, with the command menu on ⌘K.",
  },
  {
    prompt: "Add an AI docs page using Lumora",
    result:
      "Wraps prose in SelectionToolbar, wires CommandMenu for search, and floats a ChatWidget bottom-right — all handlers left backend-agnostic.",
  },
  {
    prompt: "Make a pricing section with a monthly/yearly toggle",
    result:
      "Drops in the Pricing block with its period switch, and lets one highlighted tier carry the lumen.",
  },
  {
    prompt: "Use Lumora's motion language here",
    result:
      "Routes every interaction through springs.snap / drift / glide so the screen settles as one body — no custom physics.",
  },
  {
    prompt: "Recolor this to the dusk accent",
    result:
      "Overrides --lm-accent and --lm-glow to the secondary dusk tones; nothing hardcodes hex, so the retheme is one variable.",
  },
  {
    prompt: "Which Lumora component fits a testimonials wall?",
    result:
      "Consults the catalog and points you at the Testimonials block (or Marquee for a scrolling logo wall) with its import path.",
  },
  {
    prompt: "Wire a ChatWidget to my streaming endpoint",
    result:
      "Returns an AsyncIterable<string> from onSend so chunks stream into the assistant bubble — typing indicator and scroll handled.",
  },
];

/* B: the real CLI commands, pulled from packages/cli/README.md. */
const cliCommands: { command: string; caption: string; note: string }[] = [
  {
    command: "npx lumora-ui@latest init",
    caption: "terminal — set up",
    note: "Wires Tailwind and the design tokens, writes lumora.json, and creates the component directories.",
  },
  {
    command: "npx lumora-ui@latest add button animated-tooltip",
    caption: "terminal — add components",
    note: "Copies component source into your repo, pulling any shared lib files and rewriting imports to your aliases.",
  },
  {
    command: "npx lumora-ui@latest add block/hero ai/command-menu icon/mail",
    caption: "terminal — add by category",
    note: "Blocks, AI surfaces, and icons are addressed by prefix — block/, ai/, icon/.",
  },
  {
    command: "npx lumora-ui@latest list",
    caption: "terminal — browse",
    note: "Pretty-prints the whole registry by category, each with its one-line description.",
  },
];

function AskGroup() {
  return (
    <ul className="flex flex-col gap-3 pt-4">
      {prompts.map(({ prompt, result }) => (
        <li
          key={prompt}
          className="rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-4 transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)]"
        >
          <p className="flex items-start gap-2.5 text-[15px] font-medium text-[var(--lm-fg)]">
            <span
              aria-hidden
              className="mt-0.5 select-none font-mono text-sm text-[var(--lm-accent)]"
            >
              &ldquo;
            </span>
            <span>{prompt}</span>
          </p>
          <p className="mt-1.5 pl-[1.4rem] text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            {result}
          </p>
        </li>
      ))}
    </ul>
  );
}

function CliGroup() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {cliCommands.map(({ command, caption, note }) => (
        <div key={command} className="flex flex-col gap-2">
          <CodeBlock caption={caption} code={command} />
          <p className="px-1 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
            {note}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Two-group commands explorer: plain-English prompts and the real CLI. */
export function SkillCommands() {
  return (
    <AnimatedTabs
      items={[
        {
          value: "ask",
          label: "Ask your agent",
          content: <AskGroup />,
        },
        {
          value: "cli",
          label: "CLI commands",
          content: <CliGroup />,
        },
      ]}
    />
  );
}
