"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface DialogProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  /** Whether the dialog is open (controlled). */
  open: boolean;
  /** Called with `false` when Escape or the overlay asks to close. */
  onOpenChange?: (open: boolean) => void;
  /** Optional heading; also labels the dialog for assistive tech. */
  title?: string;
}

/**
 * Modal dialog: the page dims behind a blurred overlay while the panel
 * breathes in from 96% scale with a slight upward drift. Escape and
 * overlay clicks close it; focus moves into the panel on open and
 * returns to the trigger on close. Under reduced motion it simply fades.
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  className,
  children,
  ...props
}: DialogProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const lastActive = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    lastActive.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const frame = requestAnimationFrame(() => panelRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange?.(false);
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusable.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || active === panel || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || active === panel || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastActive.current?.focus();
    };
  }, [open, onOpenChange]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[var(--lm-overlay)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.base, ease: eases.out }}
            onClick={() => onOpenChange?.(false)}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            className={cn(
              "relative w-full max-w-md rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]",
              "bg-[var(--lm-surface)] p-6 shadow-[var(--lm-shadow)] outline-none",
            )}
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }
            }
            animate={
              reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }
            }
            transition={springs.drift}
          >
            <div className={className} {...props}>
              {title && (
                <h2
                  id={titleId}
                  className="mb-3 text-base font-semibold text-[var(--lm-fg)]"
                >
                  {title}
                </h2>
              )}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
