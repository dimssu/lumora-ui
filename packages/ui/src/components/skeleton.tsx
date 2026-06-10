"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render a paragraph of this many staggered-width lines instead of one rect. */
  lines?: number;
}

const lineWidths = ["100%", "86%", "95%", "78%"];

function Sweep({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={{ x: "-130%" }}
      animate={{ x: "130%" }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay }}
      style={{
        background:
          "linear-gradient(105deg, transparent 40%, var(--lm-border-strong) 50%, transparent 60%)",
      }}
    />
  );
}

/**
 * Loading placeholder: a soft surface block with a slow light sweep gliding
 * across on a 1.8s loop. Size it with className, or pass `lines` for a
 * paragraph of staggered-width rows. Purely decorative — hidden from
 * assistive tech, and a static block under reduced motion.
 */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ lines, className, ...props }, ref) => {
    const reduceMotion = useReducedMotion();

    if (lines !== undefined && lines > 0) {
      return (
        <div
          ref={ref}
          aria-hidden
          className={cn("flex w-full flex-col gap-2.5", className)}
          {...props}
        >
          {Array.from({ length: lines }, (_, i) => (
            <span
              key={i}
              className="relative block h-3.5 overflow-hidden rounded-[var(--lm-radius-sm)] bg-[var(--lm-surface-2)]"
              style={{
                width:
                  i === lines - 1 && lines > 1
                    ? "58%"
                    : lineWidths[i % lineWidths.length],
              }}
            >
              {!reduceMotion && <Sweep delay={i * 0.12} />}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-[var(--lm-radius-sm)] bg-[var(--lm-surface-2)]",
          className,
        )}
        {...props}
      >
        {!reduceMotion && <Sweep />}
      </div>
    );
  },
);
Skeleton.displayName = "Skeleton";
