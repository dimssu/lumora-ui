"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Total number of pages. */
  count: number;
  /** Controlled current page (1-based). */
  page?: number;
  /** Initial page when uncontrolled. @default 1 */
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. @default 1 */
  siblingCount?: number;
}

type PageToken = number | "ellipsis-start" | "ellipsis-end";

function buildRange(count: number, page: number, siblings: number): PageToken[] {
  // first + last + current + siblings on both sides + two ellipsis slots
  const total = siblings * 2 + 5;
  if (count <= total) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, count - 1);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < count - 1;
  const tokens: PageToken[] = [1];
  if (showLeftEllipsis) tokens.push("ellipsis-start");
  // Keep the window a constant width so the control never jumps.
  const start = showLeftEllipsis ? left : 2;
  const end = showRightEllipsis ? right : count - 1;
  for (let i = start; i <= end; i++) tokens.push(i);
  if (showRightEllipsis) tokens.push("ellipsis-end");
  tokens.push(count);
  return tokens;
}

/**
 * Page switcher: the active pill glides between numbers as a shared
 * element on `springs.snap`, and the prev/next arrows nudge outward on
 * hover. Long ranges collapse to ellipses around the current page while
 * the first and last pages stay pinned.
 */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      count,
      page,
      defaultPage = 1,
      onPageChange,
      siblingCount = 1,
      className,
      "aria-label": ariaLabel = "Pagination",
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const baseId = React.useId();
    const [internal, setInternal] = React.useState(defaultPage);
    const current = Math.min(Math.max(page ?? internal, 1), Math.max(count, 1));

    const goTo = (next: number) => {
      const clamped = Math.min(Math.max(next, 1), count);
      if (clamped === current) return;
      if (page === undefined) setInternal(clamped);
      onPageChange?.(clamped);
    };

    const tokens = buildRange(count, current, Math.max(siblingCount, 0));

    const itemClass = cn(
      "relative inline-flex h-9 min-w-9 items-center justify-center px-1 text-sm",
      "rounded-[var(--lm-radius)] outline-none transition-colors duration-200",
      "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
      "disabled:pointer-events-none disabled:opacity-40",
    );

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={current <= 1}
          onClick={() => goTo(current - 1)}
          className={cn(
            itemClass,
            "group text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
          )}
        >
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className={cn(
              "h-3 w-3",
              !reduceMotion &&
                "transition-transform duration-200 ease-[var(--lm-ease-out)] group-hover:-translate-x-0.5",
            )}
          >
            <path
              d="M7.5 2.5 4 6l3.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {tokens.map((token) => {
          if (typeof token !== "number") {
            return (
              <span
                key={token}
                aria-hidden
                className="inline-flex h-9 min-w-9 items-end justify-center pb-2.5 text-sm tracking-widest text-[var(--lm-fg-faint)]"
              >
                …
              </span>
            );
          }
          const isCurrent = token === current;
          return (
            <button
              key={token}
              type="button"
              aria-label={`Page ${token}`}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => goTo(token)}
              className={cn(
                itemClass,
                isCurrent
                  ? "font-medium text-[var(--lm-accent-fg)]"
                  : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)] hover:bg-[var(--lm-surface-2)]",
              )}
            >
              {isCurrent && (
                <motion.span
                  aria-hidden
                  layoutId={`${baseId}-pill`}
                  transition={reduceMotion ? { duration: 0 } : springs.snap}
                  className="absolute inset-0 rounded-[var(--lm-radius)] bg-[var(--lm-accent)] shadow-[var(--lm-shadow-sm)]"
                />
              )}
              <span className="relative">{token}</span>
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Next page"
          disabled={current >= count}
          onClick={() => goTo(current + 1)}
          className={cn(
            itemClass,
            "group text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
          )}
        >
          <svg
            aria-hidden
            viewBox="0 0 12 12"
            className={cn(
              "h-3 w-3",
              !reduceMotion &&
                "transition-transform duration-200 ease-[var(--lm-ease-out)] group-hover:translate-x-0.5",
            )}
          >
            <path
              d="M4.5 2.5 8 6 4.5 9.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
    );
  },
);
Pagination.displayName = "Pagination";
