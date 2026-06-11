"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@lumora/ui";
import { useScrollSpy } from "./use-scroll-spy";

export interface DocsNavItem {
  id: string;
  label: string;
}

export interface DocsNavProps {
  items: DocsNavItem[];
}

/**
 * Sticky left index of the page's sections. The active section carries a
 * shared-element pill (layoutId) that glides between rows as you scroll,
 * mirroring the component sidebar. Driven by the same scroll-spy as the TOC.
 * Hidden below lg.
 */
export function DocsNav({ items }: DocsNavProps) {
  const reduceMotion = useReducedMotion();
  const activeId = useScrollSpy(items.map((i) => i.id));

  return (
    <nav
      aria-label="Sections"
      className="sticky top-16 hidden max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto py-12 pr-2 lg:flex"
    >
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
        Guide
      </p>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <div key={item.id} className="relative">
            {active && (
              <motion.span
                layoutId="docs-section-current"
                aria-hidden
                transition={reduceMotion ? { duration: 0 } : springs.glide}
                className="absolute inset-0 rounded-[var(--lm-radius-sm)] border-l-2 border-[var(--lm-accent)] bg-[var(--lm-accent-soft)]"
              />
            )}
            <a
              href={`#${item.id}`}
              aria-current={active ? "true" : undefined}
              className={`relative block rounded-[var(--lm-radius-sm)] px-3 py-1.5 text-sm outline-none transition-colors duration-[var(--lm-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] ${
                active
                  ? "font-medium text-[var(--lm-fg)]"
                  : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]"
              }`}
            >
              {item.label}
            </a>
          </div>
        );
      })}
    </nav>
  );
}
