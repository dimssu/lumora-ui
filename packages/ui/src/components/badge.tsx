"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

const badgeVariants = cva(
  [
    "inline-flex items-center whitespace-nowrap font-medium",
    "rounded-[var(--lm-radius-full)] border",
  ],
  {
    variants: {
      variant: {
        neutral:
          "border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-[var(--lm-fg-muted)]",
        accent:
          "border-transparent bg-[var(--lm-accent-soft)] text-[var(--lm-accent)]",
        positive:
          "border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-positive)]",
        negative:
          "border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-negative)]",
        outline:
          "border-[var(--lm-border-strong)] bg-transparent text-[var(--lm-fg)]",
      },
      size: {
        sm: "h-5 gap-1.5 px-2 text-[11px]",
        md: "h-6 gap-2 px-2.5 text-xs",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Lead with a small status dot in the variant's tone. */
  dot?: boolean;
  /** Loop a soft expanding ring around the dot (implies `dot`). */
  pulse?: boolean;
}

/**
 * Status chip: a quiet pill whose optional dot can breathe a slow expanding
 * ring to mark live state. The ring stays still under reduced motion.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, size, dot = false, pulse = false, children, ...props },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const showDot = dot || pulse;

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {showDot && (
          <span aria-hidden className="relative flex h-1.5 w-1.5 shrink-0">
            {pulse && !reduceMotion && (
              <motion.span
                className="absolute inset-0 rounded-[var(--lm-radius-full)] bg-current"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{
                  duration: durations.ambient,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  ease: eases.out,
                }}
              />
            )}
            <span className="relative h-1.5 w-1.5 rounded-[var(--lm-radius-full)] bg-current" />
          </span>
        )}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";

export { badgeVariants };
