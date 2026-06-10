"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip text or content. */
  content: React.ReactNode;
  /** The single element the tooltip is anchored to. */
  children: React.ReactElement;
  /** Preferred side; flips automatically when the viewport is tight. @default "top" */
  side?: TooltipSide;
  /** Milliseconds of hover before showing. @default 300 */
  delay?: number;
  /** Extra classes for the tooltip bubble. */
  className?: string;
}

const SIDE_CLASS: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const OPPOSITE: Record<TooltipSide, TooltipSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const RISE: Record<TooltipSide, { x: number; y: number }> = {
  top: { x: 0, y: 5 },
  bottom: { x: 0, y: -5 },
  left: { x: 5, y: 0 },
  right: { x: -5, y: 0 },
};

/**
 * Anchored tooltip that waits `delay` ms, then drifts in with a slight
 * rise toward its anchor. Flips to the opposite side when the viewport
 * is tight, and never intercepts the pointer.
 */
export function Tooltip({
  content,
  children,
  side = "top",
  delay = 300,
  className,
}: TooltipProps) {
  const reduceMotion = useReducedMotion();
  const id = React.useId();
  const anchorRef = React.useRef<HTMLSpanElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = React.useState(false);
  const [resolvedSide, setResolvedSide] = React.useState<TooltipSide>(side);

  const show = React.useCallback(
    (immediate = false) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => {
          const rect = anchorRef.current?.getBoundingClientRect();
          let next = side;
          if (rect) {
            const room = 56;
            if (side === "top" && rect.top < room) next = "bottom";
            if (side === "bottom" && window.innerHeight - rect.bottom < room)
              next = "top";
            if (side === "left" && rect.left < 160) next = "right";
            if (side === "right" && window.innerWidth - rect.right < 160)
              next = "left";
            if (next !== side && next !== OPPOSITE[side]) next = side;
          }
          setResolvedSide(next);
          setOpen(true);
        },
        immediate ? 0 : delay,
      );
    },
    [delay, side],
  );

  const hide = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }, []);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const child = React.cloneElement(
    children as React.ReactElement<{ "aria-describedby"?: string }>,
    { "aria-describedby": open ? id : undefined },
  );

  const rise = RISE[resolvedSide];

  return (
    <span
      ref={anchorRef}
      className="relative inline-flex"
      onMouseEnter={() => show()}
      onMouseLeave={hide}
      onFocusCapture={() => show(true)}
      onBlurCapture={hide}
    >
      {child}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            id={id}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: rise.x, y: rise.y, scale: 0.96 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, x: 0, y: 0, scale: 1 }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: rise.x, y: rise.y, scale: 0.96 }
            }
            transition={springs.drift}
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap",
              "rounded-[var(--lm-radius-sm)] px-2.5 py-1.5 text-xs font-medium",
              "border border-[var(--lm-border)] bg-[var(--lm-surface-2)]",
              "text-[var(--lm-fg)] shadow-[var(--lm-shadow)]",
              SIDE_CLASS[resolvedSide],
              className,
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
