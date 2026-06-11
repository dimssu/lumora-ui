import type { Metadata } from "next";
import Link from "next/link";
import { Alert, Badge, Kbd, Separator } from "@lumora/ui";
import { CodeBlock } from "../../components/code-block";
import { DocsChat } from "../../components/docs-chat";
import { DocsNav } from "../../components/docs-nav";
import { DocsToc, DocsTocMobile } from "../../components/docs-toc";
import { SpringDemos } from "../../components/spring-demos";
import { TokenSwatches } from "../../components/token-swatches";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Install Lumora, wire the tokens, learn the motion language, and stream into the AI components.",
};

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "install", label: "Installation" },
  { id: "theming", label: "Theming & tokens" },
  { id: "motion", label: "Motion language" },
  { id: "anatomy", label: "Component anatomy" },
  { id: "ai", label: "AI components" },
  { id: "accessibility", label: "Accessibility" },
  { id: "next-steps", label: "Next steps" },
];

const installCode = `# scaffold tokens + Tailwind wiring (recommended first run)
npx lumora-ui@latest init

# then own the source, one component at a time
npx lumora-ui@latest add button animated-tooltip block/hero`;

const workspaceCode = `# inside a monorepo where @lumora/ui is a workspace package
pnpm add @lumora/ui @lumora/icons motion`;

const globalsCode = `@import "tailwindcss";
@import "@lumora/ui/styles.css";

/* let Tailwind see the classes inside installed components */
@source "./components/lumora";`;

const themeTokensCode = `:root {
  --lm-bg: #09090b;          /* surfaces */
  --lm-surface: #101014;
  --lm-fg: #f3f1ec;          /* type */
  --lm-fg-muted: #8e8e96;
  --lm-accent: #dcc28a;      /* the lumen */
  --lm-glow: rgba(220, 194, 138, 0.35);
  --lm-radius: 10px;         /* squared-soft radii */
}`;

const lightThemeCode = `<!-- dark is the resting state; light is one attribute -->
<html data-theme="light">

/* or retheme the lumen to the dusk accent entirely */
:root {
  --lm-accent: #9a8bd0;
  --lm-glow: rgba(154, 139, 208, 0.35);
}`;

const motionCode = `import { springs } from "@lumora/ui/lib/motion";

// every component defaults to one of these three
springs.snap;  // stiffness 480 — hovers, presses, magnetic pulls
springs.drift; // stiffness 260 — tooltips, reveals, entrances
springs.glide; // stiffness 170 — layout shifts, shared elements

<motion.div transition={springs.drift} />`;

const importCode = `// 1 — deep imports: individually addressable, tree-shakable
import { Button } from "@lumora/ui/components/button";
import { Hero } from "@lumora/ui/blocks/hero";
import { CommandMenu } from "@lumora/ui/ai/command-menu";

// 2 — the barrel: same APIs, still tree-shaken
import { Button, Hero, CommandMenu } from "@lumora/ui";

// 3 — CLI source: components copied into your own repo
import { Button } from "@/components/lumora/button";`;

const chatCode = `import { ChatWidget } from "@lumora/ui/ai/chat-widget";

// return an AsyncIterable<string> and the widget streams it
async function* onSend(text: string) {
  const reply = await draftReply(text); // your model call
  for (const chunk of reply) {
    yield chunk;
  }
}

<ChatWidget onSend={onSend} title="Ask Lumora" />`;

/* ── small server-rendered prose primitives ──────────────────────────── */

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={`${id}-heading`}
      className="group/heading scroll-mt-24 text-2xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-[28px]"
    >
      <a
        href={`#${id}`}
        className="relative inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
      >
        {children}
        <span
          aria-hidden
          className="text-[var(--lm-accent)] opacity-0 transition-opacity duration-[var(--lm-duration-fast)] group-hover/heading:opacity-100 group-focus-within/heading:opacity-100"
        >
          #
        </span>
      </a>
    </h2>
  );
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24"
      id={id}
    >
      {eyebrow && (
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
          {eyebrow}
        </p>
      )}
      <SectionHeading id={id}>{title}</SectionHeading>
      <div className="mt-5 flex flex-col gap-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-[var(--lm-fg-muted)]">
      {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--lm-fg)]">
      {children}
    </code>
  );
}

const nextSteps = [
  {
    href: "/components",
    label: "Component gallery",
    body: "Every component, block, and AI surface — live, filterable, with copy-ready source.",
  },
  {
    href: "/icons",
    label: "Icon set",
    body: "Animated line icons that settle on the same springs as everything else.",
  },
  {
    href: "/skill",
    label: "Agent skill",
    body: "Teach a coding agent to compose full pages from the real catalog.",
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[13rem_minmax(0,1fr)_14rem] xl:gap-10">
      {/* left: section nav */}
      <DocsNav items={sections} />

      {/* center: prose */}
      <div className="min-w-0 py-14 sm:py-20 lg:max-w-[46rem]">
        <header>
          <div className="flex items-center gap-3">
            <Badge variant="accent" size="sm" dot pulse>
              v1 · stable
            </Badge>
            <span className="text-xs text-[var(--lm-fg-faint)]">
              React 18.2+ · Tailwind v4
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-5xl">
            Documentation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--lm-fg-muted)] sm:text-lg">
            Everything from install to glow — wiring, tokens, the motion
            language, and the AI surfaces. Press <Kbd combo="mod+k" /> anywhere
            to jump.
          </p>
        </header>

        <div className="mt-12">
          <DocsTocMobile items={sections} />
        </div>

        <div className="flex flex-col gap-16">
          <Section id="introduction" title="Introduction" eyebrow="Overview">
            <P>
              Lumora UI is a premium, motion-first React component library —{" "}
              <em className="text-[var(--lm-fg)] not-italic">
                interfaces that glow.
              </em>{" "}
              Dark-first surfaces, one champagne accent we call{" "}
              <strong className="font-medium text-[var(--lm-fg)]">
                the lumen
              </strong>
              , and three named springs that make every screen move as one body.
            </P>
            <P>
              The philosophy is quiet by default and expensive in the details:
              generous whitespace, borders you barely notice, and at most one
              glowing element per viewport. Components style themselves
              exclusively through CSS variables and ship accessibility — keyboard
              paths, focus rings, reduced-motion fallbacks — as table stakes, not
              opt-ins.
            </P>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Own the source", "Install components as .tsx — no black box, no runtime dependency."],
                ["Token-driven", "One --lm-* variable sheet, two themes, zero hardcoded hex."],
                ["Motion as a system", "Three springs drive every interaction across the library."],
                ["AI-native", "Command menu, chat widget, and selection toolbar are first-class."],
              ].map(([title, body]) => (
                <li
                  key={title}
                  className="rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-4"
                >
                  <p className="text-sm font-medium text-[var(--lm-fg)]">
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="install" title="Installation" eyebrow="Setup">
            <P>
              Start with the CLI. <Code>init</Code> wires Tailwind and the design
              tokens into your app; <Code>add</Code> copies component source
              straight into your repo — no styling fights, no version drift.
            </P>
            <CodeBlock caption="terminal" code={installCode} />
            <P>
              <Code>init</Code> writes the token import into your global
              stylesheet and points a Tailwind <Code>@source</Code> at the
              installed components, so the classes inside them are always
              generated:
            </P>
            <CodeBlock caption="app/globals.css" code={globalsCode} />
            <P>
              Working inside a monorepo where Lumora lives as a workspace
              package? Skip the copy step and depend on it directly — the same
              components, imported from <Code>@lumora/ui</Code>:
            </P>
            <CodeBlock caption="terminal — workspace" code={workspaceCode} />
            <Alert title="Requirements" tone="neutral">
              React 18.2+, Tailwind CSS v4, and <Code>motion</Code>. The small
              utilities — <Code>clsx</Code>, <Code>tailwind-merge</Code>,{" "}
              <Code>class-variance-authority</Code> — come along quietly.
            </Alert>
          </Section>

          <Section id="theming" title="Theming & tokens" eyebrow="Foundations">
            <P>
              Every component reads from a small set of CSS variables — never a
              hard-coded hex. Surfaces, strokes, type, radii, shadows, and one
              accent: the lumen, a champagne glow used at most once per viewport.
            </P>
            <TokenSwatches />
            <CodeBlock caption="lumora.css (excerpt)" code={themeTokensCode} />
            <P>
              Dark is the resting state. Set <Code>data-theme=&quot;light&quot;</Code>{" "}
              on any ancestor for the built-in light theme — the floating toggle
              on this site does exactly that — or override the variables to make
              the system fully yours.
            </P>
            <CodeBlock caption="theming" code={lightThemeCode} />
          </Section>

          <Section id="motion" title="Motion language" eyebrow="Foundations">
            <P>
              Three named springs drive the entire library, so every screen
              moves as one body. Micro-interactions stay under 450ms, entrances
              breathe exactly once, and ambient loops run slow and low-contrast.
              Tap a chip below to feel each one.
            </P>
            <SpringDemos />
            <CodeBlock caption="lib/motion.ts" code={motionCode} />
          </Section>

          <Section id="anatomy" title="Component anatomy" eyebrow="Usage">
            <P>
              Every component is individually addressable and exports a single{" "}
              <Code>&lt;Name&gt;Props</Code> interface. There are three honest
              ways to pull one in, and they share the same API surface:
            </P>
            <CodeBlock caption="import patterns" code={importCode} />
            <P>
              Prefer <strong className="font-medium text-[var(--lm-fg)]">deep
              imports</strong> for the leanest cold starts; reach for the barrel
              when you&rsquo;re importing a handful at once. Apps that ran{" "}
              <Code>lumora add</Code> import from their own{" "}
              <Code>components/lumora</Code> path — the CLI rewrites relative
              imports to your configured aliases, so nothing changes downstream.
            </P>
          </Section>

          <Section id="ai" title="AI components" eyebrow="Surfaces">
            <P>
              The command menu, chat widget, and selection toolbar are
              first-class components. The chat widget streams whatever you give
              it: return a <Code>Promise&lt;string&gt;</Code> for a single reply
              or an <Code>AsyncIterable&lt;string&gt;</Code> to stream chunks into
              the assistant bubble as they arrive. Handlers stay
              backend-agnostic — wire them to any endpoint.
            </P>
            <CodeBlock caption="streaming onSend" code={chatCode} />
            <P>
              Below, the same widget wired to a local async generator — no
              network, no model, just the streaming contract:
            </P>
            <DocsChat />
          </Section>

          <Section id="accessibility" title="Accessibility" eyebrow="Foundations">
            <P>
              Accessibility is non-negotiable in Lumora — these behaviors ship in
              every component rather than as opt-ins:
            </P>
            <ul className="flex flex-col gap-3">
              {[
                "Keyboard first: tabs arrow-key navigate, the command menu is fully drivable without a pointer, dialogs trap and restore focus, switches answer to Space and Enter.",
                "Visible focus: every interactive element carries a focus-visible ring in the accent tone — including the ones inside blocks.",
                "Reduced motion: ambient and looping animation stops entirely under prefers-reduced-motion; marquees become grids, beams disappear, and interaction feedback falls back to opacity.",
                "Honest semantics: real buttons, role=switch, aria-expanded on disclosures, aria-live on streaming chat logs, and aria-hidden on every decorative layer.",
                "Labels throughout: icons are decorative by default and gain role=img with a label the moment you name them.",
              ].map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--lm-fg-muted)]"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lm-accent)]"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="next-steps" title="Next steps" eyebrow="Keep going">
            <P>
              You&rsquo;re wired up. Browse what&rsquo;s there, or hand the whole
              library to your agent.
            </P>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {nextSteps.map((step) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="group flex flex-col rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-5 outline-none transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
                >
                  <span className="flex items-center justify-between text-sm font-medium text-[var(--lm-fg)]">
                    {step.label}
                    <span
                      aria-hidden
                      className="text-[var(--lm-fg-faint)] transition-transform duration-[var(--lm-duration-fast)] group-hover:translate-x-0.5 group-hover:text-[var(--lm-accent)]"
                    >
                      →
                    </span>
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
                    {step.body}
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        </div>

        <Separator className="mt-16" />
        <footer className="mt-8 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[var(--lm-fg-muted)]">
            Found a rough edge? The catalog is the source of truth.
          </p>
          <Link
            href="/components"
            className="font-medium text-[var(--lm-accent)] outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] rounded-[var(--lm-radius-sm)]"
          >
            Browse all components →
          </Link>
        </footer>
      </div>

      {/* right: on this page */}
      <DocsToc items={sections} />
    </div>
  );
}
