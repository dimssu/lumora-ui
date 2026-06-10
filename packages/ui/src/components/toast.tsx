"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export type ToastVariant = "default" | "positive" | "negative";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** @default "default" */
  variant?: ToastVariant;
  /** Action button rendered after the text. */
  action?: { label: string; onClick: () => void };
  /** Auto-dismiss delay in ms; pass `Infinity` to keep it. @default 5000 */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: number;
  variant: ToastVariant;
  duration: number;
}

/* ── tiny external store so toast() works from anywhere ───────── */

let nextId = 0;
let snapshot: ToastItem[] = [];
const listeners = new Set<() => void>();
const emptySnapshot: ToastItem[] = [];

function update(next: ToastItem[]) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function dismiss(id?: number) {
  update(id === undefined ? [] : snapshot.filter((t) => t.id !== id));
}

function createToast(options: ToastOptions): number {
  const id = ++nextId;
  update([
    ...snapshot,
    { variant: "default", duration: 5000, ...options, id },
  ]);
  return id;
}

/**
 * Fire a toast from anywhere — components, event handlers, async code.
 * Returns an id usable with `toast.dismiss(id)`.
 */
export const toast = Object.assign(createToast, { dismiss });

/* ── presentation ──────────────────────────────────────────────── */

const variantBar: Record<ToastVariant, string> = {
  default: "bg-[var(--lm-accent)]",
  positive: "bg-[var(--lm-positive)]",
  negative: "bg-[var(--lm-negative)]",
};

function ToastCard({ item }: { item: ToastItem }) {
  const reduceMotion = useReducedMotion();
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const remaining = React.useRef(item.duration);
  const startedAt = React.useRef<number | null>(null);

  const pause = React.useCallback(() => {
    clearTimeout(timer.current);
    if (startedAt.current !== null) {
      remaining.current -= Date.now() - startedAt.current;
      startedAt.current = null;
    }
  }, []);

  const resume = React.useCallback(() => {
    if (!Number.isFinite(item.duration)) return;
    startedAt.current = Date.now();
    timer.current = setTimeout(
      () => dismiss(item.id),
      Math.max(0, remaining.current),
    );
  }, [item.duration, item.id]);

  React.useEffect(() => {
    resume();
    return () => clearTimeout(timer.current);
  }, [resume]);

  return (
    <motion.li
      layout={!reduceMotion}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }
      }
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 32 }}
      transition={springs.drift}
      onMouseEnter={pause}
      onMouseLeave={resume}
      className={cn(
        "pointer-events-auto relative flex w-80 items-start gap-3 overflow-hidden p-4",
        "rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-0.5",
          variantBar[item.variant],
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--lm-fg)]">{item.title}</p>
        {item.description && (
          <p className="mt-1 text-xs leading-relaxed text-[var(--lm-fg-muted)]">
            {item.description}
          </p>
        )}
        {item.action && (
          <button
            type="button"
            onClick={() => {
              item.action?.onClick();
              dismiss(item.id);
            }}
            className={cn(
              "mt-2 text-xs font-medium text-[var(--lm-accent)] outline-none",
              "rounded-[var(--lm-radius-sm)] transition-opacity duration-150 hover:opacity-80",
              "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-surface)]",
            )}
          >
            {item.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => dismiss(item.id)}
        className={cn(
          "shrink-0 rounded-[var(--lm-radius-sm)] p-1 text-[var(--lm-fg-faint)] outline-none",
          "transition-colors duration-150 hover:text-[var(--lm-fg)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-surface)]",
        )}
      >
        <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3">
          <path
            d="m3 3 6 6m0-6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </motion.li>
  );
}

export interface ToasterProps {
  /** Extra classes on the fixed stack container. */
  className?: string;
}

/**
 * Toast outlet: mount once near the app root. New toasts drift up from
 * below into a bottom-right stack that reflows on a layout spring; hovering
 * a toast pauses its auto-dismiss timer, exits slide right and fade.
 */
export function Toaster({ className }: ToasterProps) {
  const [mounted, setMounted] = React.useState(false);
  const items = React.useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => emptySnapshot,
  );

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <ol
      className={cn(
        "pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((item) => (
          <ToastCard key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </ol>,
    document.body,
  );
}
