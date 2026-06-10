"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface AnnouncementBarProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "id" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  /** When set, dismissal is remembered in localStorage under this key. */
  id?: string;
  /** @default "neutral" */
  tone?: "neutral" | "accent";
  /** Optional trailing link; its arrow nudges forward on hover. */
  link?: { label: React.ReactNode; href: string };
  /** Hide the dismiss button entirely. @default true */
  dismissible?: boolean;
  /** Called after the bar is dismissed. */
  onDismiss?: () => void;
}

const STORAGE_PREFIX = "lumora-announcement:";

/**
 * Slim top banner that slides down on mount and, when dismissed,
 * collapses its height and fades away. Give it an `id` and the dismissal
 * sticks across visits via localStorage.
 */
export function AnnouncementBar({
  id,
  tone = "neutral",
  link,
  dismissible = true,
  onDismiss,
  className,
  children,
  ...props
}: AnnouncementBarProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      try {
        if (window.localStorage.getItem(STORAGE_PREFIX + id) === "1") return;
      } catch {
        // localStorage unavailable — show anyway.
      }
    }
    setVisible(true);
  }, [id]);

  const dismiss = () => {
    setVisible(false);
    if (id) {
      try {
        window.localStorage.setItem(STORAGE_PREFIX + id, "1");
      } catch {
        // Best effort; the bar still closes for this visit.
      }
    }
    onDismiss?.();
  };

  return (
    <AnimatePresence initial>
      {visible && (
        <motion.div
          role="status"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -12, height: "auto" }
          }
          animate={
            reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, height: "auto" }
          }
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }
          }
          transition={
            reduceMotion
              ? { duration: durations.fast }
              : {
                  y: springs.drift,
                  opacity: { duration: durations.base, ease: [...eases.out] },
                  height: { duration: durations.base, ease: [...eases.out] },
                }
          }
          className={cn("w-full overflow-hidden", className)}
          {...props}
        >
          <div
            className={cn(
              "flex w-full items-center justify-center gap-3 px-4 py-2 text-sm",
              "border-b",
              tone === "accent"
                ? "border-[var(--lm-border)] bg-[var(--lm-accent-soft)] text-[var(--lm-fg)]"
                : "border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-fg-muted)]",
            )}
          >
            <span className="min-w-0 truncate">{children}</span>

            {link && (
              <a
                href={link.href}
                className={cn(
                  "group flex shrink-0 items-center gap-1 font-medium outline-none",
                  "rounded-[var(--lm-radius-sm)] transition-colors duration-200",
                  tone === "accent"
                    ? "text-[var(--lm-accent)] hover:brightness-110"
                    : "text-[var(--lm-fg)] hover:text-[var(--lm-accent)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-[var(--lm-ease-out)] group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </a>
            )}

            {dismissible && (
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={dismiss}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--lm-radius-sm)] outline-none",
                  "text-[var(--lm-fg-faint)] transition-colors duration-200",
                  "hover:bg-[var(--lm-surface-2)] hover:text-[var(--lm-fg)]",
                  "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                )}
              >
                <svg
                  aria-hidden
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
