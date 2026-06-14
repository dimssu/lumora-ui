"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  Badge,
  CommandMenu,
  springs,
  useCommandMenu,
  type CommandMenuItem,
} from "@lumora/ui";
import { CodeIcon, SearchIcon, SendIcon, SparkleIcon } from "@lumora/icons";

interface SurfaceProps {
  icon: React.ReactNode;
  title: string;
  body: string;
  preview: React.ReactNode;
}

function Surface({ icon, title, body, preview }: SurfaceProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={springs.drift}
      className="flex flex-col gap-5 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-6"
    >
      <div className="flex h-[140px] items-center justify-center overflow-hidden rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-4">
        {preview}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-[var(--lm-radius)] bg-[var(--lm-accent-soft)] text-[var(--lm-accent)]"
          >
            {icon}
          </span>
          <h3 className="text-base font-semibold text-[var(--lm-fg)]">
            {title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export function LandingAi() {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const { open, setOpen, toggle } = useCommandMenu();

  const commandItems: CommandMenuItem[] = React.useMemo(
    () => [
      {
        id: "browse",
        label: "Browse components",
        hint: "60 live",
        group: "Navigate",
        onSelect: () => router.push("/components"),
      },
      {
        id: "docs",
        label: "Read the docs",
        hint: "Setup",
        group: "Navigate",
        onSelect: () => router.push("/docs"),
      },
      {
        id: "command-menu",
        label: "Command Menu",
        keywords: ["palette", "search", "cmdk"],
        group: "AI surfaces",
        onSelect: () => router.push("/components/command-menu"),
      },
      {
        id: "chat-widget",
        label: "Chat Widget",
        keywords: ["streaming", "assistant"],
        group: "AI surfaces",
        onSelect: () => router.push("/components/chat-widget"),
      },
      {
        id: "selection-toolbar",
        label: "Selection Toolbar",
        keywords: ["highlight", "actions"],
        group: "AI surfaces",
        onSelect: () => router.push("/components/selection-toolbar"),
      },
    ],
    [router],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Badge variant="accent" size="sm" className="mb-5">
          <SparkleIcon size={12} />
          AI-native
        </Badge>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          AI surfaces, built in
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
          The interface layer modern products expect — a command palette, a
          streaming chat, an inline selection toolbar — shipped as first-class
          components, not bolt-ons.
        </p>
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            className="group inline-flex items-center gap-3 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-4 py-2 text-sm text-[var(--lm-fg-muted)] outline-none transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] hover:text-[var(--lm-fg)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
          >
            <SearchIcon size={15} />
            Open the command menu
            <kbd className="rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)] px-1.5 py-0.5 text-[11px] text-[var(--lm-fg-faint)]">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        items={commandItems}
        placeholder="Search components and pages…"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Surface
          icon={<SearchIcon size={16} />}
          title="Command Menu"
          body="A ⌘K palette with fuzzy search, full keyboard control, and focus restore. Try the button above."
          preview={
            <div className="w-full rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-2 text-left text-xs">
              <div className="mb-1.5 border-b border-[var(--lm-border)] px-1 pb-1.5 text-[var(--lm-fg-faint)]">
                Type a command…
              </div>
              {["Browse components", "Read the docs"].map((label, i) => (
                <div
                  key={label}
                  className={[
                    "rounded-[var(--lm-radius-sm)] px-2 py-1.5",
                    i === 0
                      ? "bg-[var(--lm-surface-2)] text-[var(--lm-fg)]"
                      : "text-[var(--lm-fg-muted)]",
                  ].join(" ")}
                >
                  {label}
                </div>
              ))}
            </div>
          }
        />

        <Surface
          icon={<SendIcon size={16} />}
          title="Chat Widget"
          body="A docked assistant that streams replies chunk by chunk — return a string or an async iterable from onSend."
          preview={
            <div className="flex w-full flex-col gap-2 text-xs">
              <div className="max-w-[80%] self-end rounded-[var(--lm-radius)] bg-[var(--lm-accent-soft)] px-2.5 py-1.5 text-[var(--lm-accent)]">
                How do I theme it?
              </div>
              <div className="flex max-w-[85%] items-center gap-1 self-start rounded-[var(--lm-radius)] bg-[var(--lm-surface)] px-2.5 py-1.5 text-[var(--lm-fg-muted)]">
                Flip one CSS variable
                <motion.span
                  aria-hidden
                  animate={reduceMotion ? undefined : { opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="inline-block h-3 w-1 rounded-full bg-[var(--lm-accent)]"
                />
              </div>
            </div>
          }
        />

        <Surface
          icon={<CodeIcon size={16} />}
          title="Selection Toolbar"
          body="Highlight any text and a floating action pill rises to meet it — onAction receives the action id and the selection."
          preview={
            <div className="relative text-xs">
              <p className="text-[var(--lm-fg-muted)]">
                Select{" "}
                <span className="rounded-[2px] bg-[var(--lm-accent-soft)] px-0.5 text-[var(--lm-fg)]">
                  this phrase
                </span>{" "}
                to act on it.
              </p>
              <motion.div
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={springs.drift}
                className="mt-2 inline-flex items-center gap-2 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-2.5 py-1 text-[var(--lm-fg-muted)] shadow-[var(--lm-shadow-sm)]"
              >
                <span>Explain</span>
                <span className="text-[var(--lm-fg-faint)]">·</span>
                <span>Rewrite</span>
                <span className="text-[var(--lm-fg-faint)]">·</span>
                <span className="text-[var(--lm-accent)]">Ask AI</span>
              </motion.div>
            </div>
          }
        />
      </div>
    </section>
  );
}
