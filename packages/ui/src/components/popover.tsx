"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export type PopoverSide = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  /** Content of the trigger button. */
  trigger: React.ReactNode;
  /** Panel content. */
  children: React.ReactNode;
  /** Preferred side; flips if there is not enough viewport room. @default "bottom" */
  side?: PopoverSide;
  /** Controlled open state. */
  open?: boolean;
  /** Initial state when uncontrolled. @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Classes on the floating panel. */
  className?: string;
  /** Classes on the trigger button. */
  triggerClassName?: string;
}

const sidePosition: Record<PopoverSide, string> = {
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2 origin-top",
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom",
  left: "right-full top-1/2 -translate-y-1/2 mr-2 origin-right",
  right: "left-full top-1/2 -translate-y-1/2 ml-2 origin-left",
};

const sideOffset: Record<PopoverSide, { x?: number; y?: number }> = {
  bottom: { y: -6 },
  top: { y: 6 },
  left: { x: 6 },
  right: { x: -6 },
};

const GAP = 8;

/**
 * Anchored floating panel: opens from its trigger with a drift-and-scale
 * breath out of the anchor side, flipping to the opposite side when the
 * viewport is too tight. Focus moves into the panel on open and returns to
 * the trigger on close; Escape, outside clicks and focus-out dismiss it.
 */
export function Popover({
  trigger,
  children,
  side = "bottom",
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  triggerClassName,
}: PopoverProps) {
  const reduceMotion = useReducedMotion();
  const panelId = React.useId();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open ?? internal;
  const [resolvedSide, setResolvedSide] = React.useState<PopoverSide>(side);

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternal(next);
    onOpenChange?.(next);
  };

  // Collision flip + focus-in, measured before paint so it never flickers.
  React.useLayoutEffect(() => {
    if (!isOpen) return;
    const anchor = triggerRef.current?.getBoundingClientRect();
    const panel = panelRef.current;
    let next = side;
    if (anchor && panel) {
      const h = panel.offsetHeight + GAP;
      const w = panel.offsetWidth + GAP;
      const room: Record<PopoverSide, boolean> = {
        bottom: anchor.bottom + h <= window.innerHeight,
        top: anchor.top - h >= 0,
        right: anchor.right + w <= window.innerWidth,
        left: anchor.left - w >= 0,
      };
      const opposite: Record<PopoverSide, PopoverSide> = {
        bottom: "top",
        top: "bottom",
        left: "right",
        right: "left",
      };
      if (!room[side] && room[opposite[side]]) next = opposite[side];
    }
    setResolvedSide(next);
    panelRef.current?.focus({ preventScroll: true });
  }, [isOpen, side]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onKeyDown={(e) => {
        if (e.key === "Escape" && isOpen) {
          e.stopPropagation();
          close(true);
        }
      }}
      onBlur={(e) => {
        if (
          isOpen &&
          (!(e.relatedTarget instanceof Node) ||
            !wrapperRef.current?.contains(e.relatedTarget))
        ) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        onClick={() => setOpen(!isOpen)}
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 px-4 text-sm font-medium",
          "rounded-[var(--lm-radius)] border border-[var(--lm-border-strong)] text-[var(--lm-fg)]",
          "outline-none transition-colors duration-200 hover:bg-[var(--lm-surface-2)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
          triggerClassName,
        )}
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            tabIndex={-1}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, ...sideOffset[resolvedSide] }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, x: 0, y: 0 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, ...sideOffset[resolvedSide] }
            }
            transition={springs.drift}
            className={cn(
              "absolute z-50 w-64 p-4",
              sidePosition[resolvedSide],
              "rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)] shadow-[var(--lm-shadow)]",
              "text-sm text-[var(--lm-fg)] outline-none",
              className,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
