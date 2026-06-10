"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@lumora/ui";

export interface DocsSidebarGroup {
  label: string;
  items: { slug: string; title: string }[];
}

export interface DocsSidebarProps {
  groups: DocsSidebarGroup[];
}

/**
 * Sticky, independently scrollable index of every component, grouped by
 * category. The current page carries a shared-element highlight
 * (layoutId) that glides between rows as you navigate. Hidden below lg.
 */
export function DocsSidebar({ groups }: DocsSidebarProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const current = pathname?.split("/").filter(Boolean).pop();
  const listRef = React.useRef<HTMLElement>(null);

  /* Keep the active row in view when arriving deep in the list. */
  React.useEffect(() => {
    const active = listRef.current?.querySelector('[aria-current="page"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [current]);

  return (
    <nav
      ref={listRef}
      aria-label="All components"
      className="sticky top-16 hidden max-h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-2 lg:block"
    >
      {groups.map((group) => (
        <div key={group.label} className="mb-7">
          <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)]">
            {group.label}
          </p>
          <ul className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = item.slug === current;
              return (
                <li key={item.slug} className="relative">
                  {active && (
                    <motion.span
                      layoutId="docs-sidebar-current"
                      aria-hidden
                      transition={reduceMotion ? { duration: 0 } : springs.glide}
                      className="absolute inset-0 rounded-[var(--lm-radius-sm)] border-l-2 border-[var(--lm-accent)] bg-[var(--lm-accent-soft)]"
                    />
                  )}
                  <Link
                    href={`/components/${item.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-[var(--lm-radius-sm)] px-3 py-1.5 text-sm outline-none transition-colors duration-[var(--lm-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] ${
                      active
                        ? "font-medium text-[var(--lm-fg)]"
                        : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
