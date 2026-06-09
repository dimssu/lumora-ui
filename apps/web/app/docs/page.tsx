import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "../../components/code-block";
import { DocsChat } from "../../components/docs-chat";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Install Lumora, wire the tokens, learn the motion language, and stream into the AI components.",
};

const toc = [
  { id: "install", label: "Install" },
  { id: "init", label: "Init" },
  { id: "theming", label: "Tokens & theming" },
  { id: "motion", label: "Motion language" },
  { id: "ai", label: "AI components" },
  { id: "accessibility", label: "Accessibility" },
];

const installCode = `# the workspace packages
pnpm add @lumora/ui @lumora/icons motion

# or own the source, one component at a time
npx lumora@latest add button animated-tooltip`;

const initCode = `npx lumora@latest init`;

const globalsCode = `@import "tailwindcss";
@import "@lumora/ui/styles.css";

/* let Tailwind see classes inside the installed components */
@source "./components/lumora";`;

const themeTokensCode = `:root {
  --lm-bg: #09090b;          /* surfaces */
  --lm-surface: #101014;
  --lm-fg: #f3f1ec;          /* type */
  --lm-fg-muted: #8e8e96;
  --lm-accent: #dcc28a;      /* the lumen */
  --lm-glow: rgba(220, 194, 138, 0.35);
  --lm-radius: 10px;         /* squared-soft radii */
  --lm-shadow-glow: 0 0 0 1px var(--lm-border-strong),
                    0 8px 40px var(--lm-glow);
}`;

const lightThemeCode = `<!-- dark is the resting state; light is one attribute -->
<html data-theme="light">

/* or retheme the lumen entirely */
:root {
  --lm-accent: #8ab4dc;
  --lm-glow: rgba(138, 180, 220, 0.35);
}`;

const motionCode = `import { springs, eases, durations } from "@lumora/ui";

// every component defaults to one of these three
springs.snap;  // stiffness 480 — hovers, presses, magnetic pulls
springs.drift; // stiffness 260 — tooltips, reveals, entrances
springs.glide; // stiffness 170 — layout shifts, shared elements

<motion.div transition={springs.drift} … />`;

const chatCode = `import { ChatWidget } from "@lumora/ui/ai/chat-widget";

// return an AsyncIterable<string> and the widget streams it
async function* onSend(text: string) {
  const reply = await draftReply(text); // your model call
  for (const chunk of reply) {
    yield chunk;
  }
}

<ChatWidget onSend={onSend} title="Ask Lumora" />`;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="scroll-mt-24" id={id}>
      <h2
        id={`${id}-heading`}
        className="text-2xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--lm-fg-muted)]">
      {children}
    </p>
  );
}

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--lm-fg)] sm:text-5xl">
          Documentation
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--lm-fg-muted)] sm:text-lg">
          Everything you need to go from install to glow: wiring, tokens, the
          motion language, and the AI surfaces.
        </p>
        <nav aria-label="On this page" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {toc.map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`#${entry.id}`}
                  className="inline-block rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-3 py-1.5 text-xs font-medium text-[var(--lm-fg-muted)] outline-none transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mt-16 flex flex-col gap-16">
        <Section id="install" title="Install">
          <P>
            Two ways in. Add the workspace packages for the fastest start, or
            use the CLI to copy component source straight into your repo — no
            black-box dependency, no styling fights.
          </P>
          <CodeBlock caption="terminal" code={installCode} />
          <P>
            Lumora needs React 18.2+, Tailwind CSS v4, and{" "}
            <code className="font-mono text-[var(--lm-fg)]">motion</code>.
            Everything else —{" "}
            <code className="font-mono text-[var(--lm-fg)]">clsx</code>,{" "}
            <code className="font-mono text-[var(--lm-fg)]">
              tailwind-merge
            </code>
            ,{" "}
            <code className="font-mono text-[var(--lm-fg)]">
              class-variance-authority
            </code>{" "}
            — comes along quietly.
          </P>
        </Section>

        <Section id="init" title="Init">
          <P>
            One command wires Tailwind and the design tokens into your app,
            then you add components as you need them.
          </P>
          <CodeBlock caption="terminal" code={initCode} />
          <P>
            Init writes the token import into your global stylesheet and
            points a Tailwind <code className="font-mono text-[var(--lm-fg)]">@source</code>{" "}
            at the installed components, so the classes inside them are always
            generated:
          </P>
          <CodeBlock caption="app/globals.css" code={globalsCode} />
        </Section>

        <Section id="theming" title="Tokens & theming">
          <P>
            Every component reads from a small set of CSS variables — never a
            hard-coded hex. Surfaces, strokes, type, radii, shadows, and one
            accent: <strong className="text-[var(--lm-fg)]">the lumen</strong>,
            a champagne glow used at most once per viewport.
          </P>
          <CodeBlock caption="lumora.css (excerpt)" code={themeTokensCode} />
          <P>
            Dark is the resting state. Set{" "}
            <code className="font-mono text-[var(--lm-fg)]">
              data-theme=&quot;light&quot;
            </code>{" "}
            on any ancestor for the built-in light theme — the floating toggle
            on this site does exactly that — or override the variables to make
            the system fully yours.
          </P>
          <CodeBlock caption="theming" code={lightThemeCode} />
        </Section>

        <Section id="motion" title="Motion language">
          <P>
            Three named springs drive the entire library, so every screen
            moves as one body. Micro-interactions stay under 450ms, entrances
            breathe exactly once, and ambient loops run slow and
            low-contrast.
          </P>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                name: "snap",
                detail: "Hovers, presses, magnetic pulls. Fast settle, no wobble.",
              },
              {
                name: "drift",
                detail: "Tooltips, popovers, reveals. One soft breath on entry.",
              },
              {
                name: "glide",
                detail: "Layout shifts and shared elements. Long and deliberate.",
              },
            ].map((spring) => (
              <div
                key={spring.name}
                className="rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-5"
              >
                <h3 className="font-mono text-sm font-semibold text-[var(--lm-fg)]">
                  springs.{spring.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
                  {spring.detail}
                </p>
              </div>
            ))}
          </div>
          <CodeBlock caption="lib/motion.ts" code={motionCode} />
        </Section>

        <Section id="ai" title="AI components">
          <P>
            The command menu, chat widget, and selection toolbar are
            first-class components. The chat widget streams whatever you give
            it: return a{" "}
            <code className="font-mono text-[var(--lm-fg)]">
              Promise&lt;string&gt;
            </code>{" "}
            for a single reply or an{" "}
            <code className="font-mono text-[var(--lm-fg)]">
              AsyncIterable&lt;string&gt;
            </code>{" "}
            to stream chunks into the assistant bubble as they arrive.
          </P>
          <CodeBlock caption="streaming onSend" code={chatCode} />
          <P>
            Below, the same widget wired to a local async generator — no
            network, no model, just the streaming contract:
          </P>
          <DocsChat />
        </Section>

        <Section id="accessibility" title="Accessibility">
          <P>
            Accessibility is non-negotiable in Lumora — these behaviors ship
            in every component rather than as opt-ins:
          </P>
          <ul className="flex max-w-2xl flex-col gap-3">
            {[
              "Keyboard first: tabs arrow-key navigate, the command menu is fully drivable without a pointer, dialogs trap and restore focus, switches answer to Space and Enter.",
              "Visible focus: every interactive element carries a focus-visible ring in the accent tone — including the ones inside blocks.",
              "Reduced motion: ambient and looping animation stops entirely under prefers-reduced-motion; marquees become grids, beams disappear, and interaction feedback falls back to opacity.",
              "Honest semantics: real buttons, role=switch, aria-expanded on disclosures, aria-live on streaming chat logs, and aria-hidden on every decorative layer (including marquee loop copies).",
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
      </div>
    </div>
  );
}
