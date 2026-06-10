import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardBody, CardHeader, CardTitle } from "@lumora/ui";
import {
  SkillDownloadButton,
  SkillInstallTabs,
} from "../../components/skill-install";

export const metadata: Metadata = {
  title: "Agent skill",
  description:
    "Download lumora-builder, the agent skill that teaches coding agents to compose full pages from Lumora UI — recipes, motion rules, tokens, and the complete catalog.",
};

const contents = [
  {
    file: "SKILL.md",
    title: "Composition & motion rules",
    body: "How pages are assembled and how they move: which block owns each section, the one-lumen-per-viewport rule, and the three named springs every interaction settles on.",
  },
  {
    file: "references/component-catalog.md",
    title: "The full catalog",
    body: "Every component, block, and AI surface with its import path and the props that matter — the same names the registry and CLI use, so nothing is guessed.",
  },
  {
    file: "references/page-recipes.md",
    title: "Ready page recipes",
    body: "Copy-pasteable JSX skeletons for a full landing page, a dashboard shell, and an AI-enhanced docs page. Swap the copy, keep the physics.",
  },
] as const;

export default function SkillPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
          lumora-builder · agent skill
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-5xl">
          Teach your agent Lumora
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--lm-fg-muted)] sm:text-lg">
          One small download turns a coding agent into a Lumora specialist.
          The skill carries our composition recipes, the motion language, the
          token system, and the complete component catalog — so when you ask
          for a landing page or a dashboard, the agent composes it from the
          real library instead of improvising.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <SkillDownloadButton />
          <p className="text-xs text-[var(--lm-fg-faint)]">
            Three markdown files, zipped. No build step.
          </p>
        </div>
      </header>

      <section aria-labelledby="install-heading" className="mt-20">
        <h2
          id="install-heading"
          className="text-2xl font-semibold text-[var(--lm-fg)]"
        >
          Install it
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          Two ways in, both under a minute.
        </p>
        <div className="mt-6">
          <SkillInstallTabs />
        </div>
      </section>

      <section aria-labelledby="inside-heading" className="mt-20">
        <h2
          id="inside-heading"
          className="text-2xl font-semibold text-[var(--lm-fg)]"
        >
          What&rsquo;s inside
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {contents.map((entry) => (
            <Card key={entry.file} variant="lift" className="h-full">
              <CardHeader>
                <p className="font-mono text-xs text-[var(--lm-fg-faint)]">
                  {entry.file}
                </p>
                <CardTitle className="mt-2">{entry.title}</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
                  {entry.body}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-heading" className="mt-20">
        <h2
          id="how-heading"
          className="text-2xl font-semibold text-[var(--lm-fg)]"
        >
          How it works
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          Skills are plain instruction folders. When a request matches the
          skill&rsquo;s description — building screens with Lumora — the agent
          loads SKILL.md and pulls in the reference files as it needs them.
          Nothing in the zip executes: it&rsquo;s markdown the agent reads,
          which also means it works with any agent that supports the skills
          format. The catalog mirrors the{" "}
          <Link
            href="/components"
            className="rounded-[var(--lm-radius-sm)] font-medium text-[var(--lm-accent)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
          >
            component gallery
          </Link>
          , so what the agent builds is what you see here.
        </p>
      </section>
    </div>
  );
}
