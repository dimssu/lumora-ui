"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { eases, springs } from "../lib/motion";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Completion from 0 to 100. Ignored when `indeterminate`. @default 0 */
  value?: number;
  /** Loop a traveling lumen segment instead of a determinate fill. */
  indeterminate?: boolean;
  /** Blend the fill from the lumen into the dusk accent. */
  gradient?: boolean;
}

/**
 * Progress bar: the determinate fill glides to each new value on a weighty
 * spring; `indeterminate` sends a soft lumen segment traveling the track on
 * a slow loop (a static mid-fill under reduced motion).
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      indeterminate = false,
      gradient = false,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const clamped = Math.min(100, Math.max(0, value));

    const fillClass = gradient
      ? "bg-[linear-gradient(90deg,var(--lm-accent),var(--lm-accent-2))]"
      : "bg-[var(--lm-accent)]";

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
        className={cn(
          "relative h-1.5 w-full overflow-hidden",
          "rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)]",
          className,
        )}
        {...props}
      >
        {indeterminate ? (
          reduceMotion ? (
            <div
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-[30%] w-2/5 rounded-[var(--lm-radius-full)]",
                fillClass,
              )}
            />
          ) : (
            <motion.div
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 w-2/5 rounded-[var(--lm-radius-full)]",
                fillClass,
              )}
              animate={{ x: ["-100%", "250%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 0.2,
                ease: eases.inOut,
              }}
            />
          )
        ) : (
          <motion.div
            aria-hidden
            className={cn(
              "absolute inset-y-0 left-0 rounded-[var(--lm-radius-full)]",
              fillClass,
            )}
            initial={false}
            animate={{ width: `${clamped}%` }}
            transition={reduceMotion ? { duration: 0 } : springs.glide}
          />
        )}
      </div>
    );
  },
);
Progress.displayName = "Progress";
