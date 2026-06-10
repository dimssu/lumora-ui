"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

export interface BreadcrumbItem {
  label: React.ReactNode;
  /** Omit on the current page; it renders as plain text with `aria-current`. */
  href?: string;
}

export interface BreadcrumbsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  /** Collapse the middle into an ellipsis when there are more items. @default 4 */
  maxVisible?: number;
  /** Separator glyph between items. @default "/" */
  separator?: React.ReactNode;
}

function Crumb({ item, current }: { item: BreadcrumbItem; current: boolean }) {
  if (current || !item.href) {
    return (
      <span
        aria-current={current ? "page" : undefined}
        className="px-0.5 text-sm font-medium text-[var(--lm-fg)]"
      >
        {item.label}
      </span>
    );
  }
  return (
    <a
      href={item.href}
      className={cn(
        "group relative rounded-[var(--lm-radius-sm)] px-0.5 text-sm text-[var(--lm-fg-muted)] outline-none",
        "transition-colors duration-200 hover:text-[var(--lm-fg)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
      )}
    >
      {item.label}
      <span
        aria-hidden
        className={cn(
          "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--lm-accent)] opacity-70",
          "transition-transform duration-[var(--lm-duration)] ease-[var(--lm-ease-out)]",
          "group-hover:scale-x-100 group-focus-visible:scale-x-100",
        )}
      />
    </a>
  );
}

/**
 * Path trail where hovering a link slides a soft lumen underline in from
 * the left. Long trails collapse their middle into an ellipsis button
 * that expands inline with a width-and-fade reveal.
 */
export function Breadcrumbs({
  items,
  maxVisible = 4,
  separator = "/",
  className,
  ...props
}: BreadcrumbsProps) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = React.useState(false);
  const collapsed = items.length > maxVisible;

  // When collapsed, keep the first crumb and the trailing (maxVisible - 1).
  const tailStart = collapsed ? items.length - (maxVisible - 1) : 1;
  const folded = collapsed ? items.slice(1, tailStart) : [];

  const sep = (
    <span aria-hidden className="select-none text-[var(--lm-fg-faint)]">
      {separator}
    </span>
  );

  const crumbAt = (index: number) => {
    const item = items[index];
    if (!item) return null;
    return <Crumb item={item} current={index === items.length - 1} />;
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-2">
        <li className="flex items-center gap-2">{crumbAt(0)}</li>

        {collapsed && !expanded && (
          <li className="flex items-center gap-2">
            {sep}
            <button
              type="button"
              aria-label={`Show ${folded.length} more levels`}
              aria-expanded={false}
              onClick={() => setExpanded(true)}
              className={cn(
                "flex h-6 items-center rounded-[var(--lm-radius-sm)] px-1.5 outline-none",
                "text-[var(--lm-fg-muted)] transition-colors duration-200",
                "hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)]",
                "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
              )}
            >
              <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <circle cx="3" cy="8" r="1.2" />
                <circle cx="8" cy="8" r="1.2" />
                <circle cx="13" cy="8" r="1.2" />
              </svg>
            </button>
          </li>
        )}

        {collapsed && expanded && (
          <motion.li
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: durations.base, ease: [...eases.out] }
            }
            className="overflow-hidden"
          >
            <ol className="flex items-center gap-2 whitespace-nowrap">
              {folded.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {sep}
                  <Crumb item={item} current={false} />
                </li>
              ))}
            </ol>
          </motion.li>
        )}

        {items.slice(tailStart).map((_, i) => {
          const index = tailStart + i;
          return (
            <li key={index} className="flex items-center gap-2">
              {sep}
              {crumbAt(index)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
