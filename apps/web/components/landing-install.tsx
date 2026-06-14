"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Button, springs } from "@lumora/ui";
import { CodeBlock } from "./code-block";

interface Step {
  caption: string;
  title: string;
  body: string;
  code: string;
}

const steps: Step[] = [
  {
    caption: "terminal",
    title: "Initialize",
    body: "Wire up tokens, the motion springs, and the cn helper in one pass.",
    code: "npx lumora-ui@latest init",
  },
  {
    caption: "terminal",
    title: "Add what you need",
    body: "Components land as source in your repo — own the code from minute one.",
    code: "npx lumora-ui@latest add button hero command-menu",
  },
  {
    caption: "app/page.tsx",
    title: "Compose",
    body: "Import and arrange. The props are shaped like your content.",
    code: 'import { Hero } from "@lumora/ui/blocks/hero";\n\nexport default function Page() {\n  return <Hero headline="Ship the glow" />;\n}',
  },
];

export function LandingInstall() {
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          Ship in three commands
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
          No registry account, no lock-in. Initialize, add the pieces you want,
          and compose.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...springs.drift, delay: i * 0.08 }}
            className="flex flex-col gap-4 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-6"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-[var(--lm-radius)] bg-[var(--lm-accent-soft)] text-sm font-semibold text-[var(--lm-accent)]"
              >
                {i + 1}
              </span>
              <h3 className="text-base font-semibold text-[var(--lm-fg)]">
                {step.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
              {step.body}
            </p>
            <CodeBlock
              code={step.code}
              caption={step.caption}
              className="mt-auto"
            />
          </motion.li>
        ))}
      </ol>

      <div className="mt-10 flex justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/docs")}
        >
          Read the full guide
        </Button>
      </div>
    </section>
  );
}
