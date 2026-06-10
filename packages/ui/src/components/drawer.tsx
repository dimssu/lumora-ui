"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface DrawerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
  > {
  /** Whether the drawer is open (controlled). */
  open: boolean;
  /** Called with `false` when Escape, the overlay, or a drag asks to close. */
  onOpenChange?: (open: boolean) => void;
  /** Edge the panel slides from. @default "right" */
  side?: "left" | "right" | "bottom";
  /** Optional heading; also labels the drawer for assistive tech. */
  title?: string;
}

/**
 * Side panel: it glides in from its edge over a blurred overlay and can be
 * dragged back out — release past 30% of its size (or with a flick) and it
 * dismisses. Escape and overlay clicks close it; focus is trapped inside
 * and returns to the trigger on close. Under reduced motion it fades and
 * dragging is disabled.
 */
export function Drawer({
  open,
  onOpenChange,
  side = "right",
  title,
  className,
  children,
  ...props
}: DrawerProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const lastActive = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();

  React.useEffect(() => setMounted(true), []);

  // Focus trap + scroll lock + Escape, mirroring Dialog.
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

  const axis = side === "bottom" ? "y" : "x";
  const hidden =
    side === "left"
      ? { x: "-100%" }
      : side === "right"
        ? { x: "100%" }
        : { y: "100%" };

  const onDragEnd = (_event: PointerEvent, info: PanInfo) => {
    const panel = panelRef.current;
    if (!panel) return;
    const size = side === "bottom" ? panel.offsetHeight : panel.offsetWidth;
    // Offset toward the panel's own edge counts as a dismissal gesture.
    const offset =
      side === "left"
        ? -info.offset.x
        : side === "right"
          ? info.offset.x
          : info.offset.y;
    const velocity =
      side === "left"
        ? -info.velocity.x
        : side === "right"
          ? info.velocity.x
          : info.velocity.y;
    if (offset > size * 0.3 || velocity > 500) onOpenChange?.(false);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
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
              "absolute flex flex-col overflow-auto outline-none",
              "border-[var(--lm-border)] bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
              side === "left" &&
                "inset-y-0 left-0 w-80 max-w-[85vw] border-r",
              side === "right" &&
                "inset-y-0 right-0 w-80 max-w-[85vw] border-l",
              side === "bottom" &&
                "inset-x-0 bottom-0 max-h-[85vh] rounded-t-[var(--lm-radius-lg)] border-t",
            )}
            initial={reduceMotion ? { opacity: 0 } : hidden}
            animate={reduceMotion ? { opacity: 1 } : { x: 0, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : hidden}
            transition={springs.glide}
            drag={reduceMotion ? false : axis}
            dragConstraints={
              axis === "x" ? { left: 0, right: 0 } : { top: 0, bottom: 0 }
            }
            dragElastic={
              side === "left"
                ? { left: 0.6, right: 0 }
                : side === "right"
                  ? { left: 0, right: 0.6 }
                  : { top: 0, bottom: 0.6 }
            }
            onDragEnd={reduceMotion ? undefined : onDragEnd}
          >
            {side === "bottom" && (
              <div
                aria-hidden
                className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-[var(--lm-radius-full)] bg-[var(--lm-border-strong)]"
              />
            )}
            <div className={cn("flex-1 p-6", className)} {...props}>
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
