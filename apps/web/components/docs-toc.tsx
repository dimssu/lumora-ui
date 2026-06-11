"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { springs } from "@lumora/ui";
import { useScrollSpy } from "./use-scroll-spy";

export interface DocsTocItem {
  id: string;
  label: string;
}

export interface DocsTocProps {
  items: DocsTocItem[];
}

/** Desktop right-rail "On this page" with a scroll-spy active marker. */
export function DocsToc({ items }: DocsTocProps) {
  const reduceMotion = useReducedMotion();
  const activeId = useScrollSpy(items.map((i) => i.id));

  return (
    <aside
      aria-label="On this page"
      className="sticky top-16 hidden max-h-[calc(100vh-4rem)] overflow-y-auto py-12 pl-2 xl:block"
    >
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
        On this page
      </p>
      <ul className="border-l border-[var(--lm-border)]">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id} className="relative -ml-px">
              {active && (
                <motion.span
                  layoutId="docs-toc-current"
                  aria-hidden
                  transition={reduceMotion ? { duration: 0 } : springs.glide}
                  className="absolute -left-px top-0 h-full w-px bg-[var(--lm-accent)]"
                />
              )}
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className={`relative block py-1.5 pl-4 text-[13px] leading-snug outline-none transition-colors duration-[var(--lm-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] ${
                  active
                    ? "font-medium text-[var(--lm-fg)]"
                    : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/** Below xl: a compact disclosure that collapses the TOC into a top dropdown. */
export function DocsTocMobile({ items }: DocsTocProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const activeId = useScrollSpy(items.map((i) => i.id));
  const activeLabel =
    items.find((i) => i.id === activeId)?.label ?? "Overview";

  return (
    <div className="mb-10 xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] px-4 py-2.5 text-left text-sm outline-none transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
            On this page
          </span>
          <span className="truncate text-[var(--lm-fg)]">{activeLabel}</span>
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduceMotion ? { duration: 0 } : springs.snap}
          className="text-[var(--lm-fg-muted)]"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-2 flex flex-col gap-0.5 rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-1.5">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-[var(--lm-radius-sm)] px-3 py-1.5 text-sm outline-none transition-colors duration-[var(--lm-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] ${
                    item.id === activeId
                      ? "bg-[var(--lm-accent-soft)] font-medium text-[var(--lm-fg)]"
                      : "text-[var(--lm-fg-muted)] hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
