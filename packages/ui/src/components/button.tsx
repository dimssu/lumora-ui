"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "font-medium outline-none transition-colors duration-200",
    "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        solid:
          "bg-[var(--lm-fg)] text-[var(--lm-bg)] hover:bg-[var(--lm-fg)]/90",
        accent:
          "bg-[var(--lm-accent)] text-[var(--lm-accent-fg)] hover:brightness-110",
        outline:
          "border border-[var(--lm-border-strong)] text-[var(--lm-fg)] hover:bg-[var(--lm-surface-2)] hover:border-[var(--lm-border-strong)]",
        ghost:
          "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)] hover:bg-[var(--lm-surface-2)]",
        glow: [
          "bg-[var(--lm-surface)] text-[var(--lm-fg)] border border-[var(--lm-border)]",
          "shadow-[var(--lm-shadow-glow)] hover:border-[var(--lm-border-strong)]",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--lm-radius-sm)]",
        md: "h-10 px-4 text-sm rounded-[var(--lm-radius)]",
        lg: "h-12 px-6 text-base rounded-[var(--lm-radius)]",
        icon: "h-10 w-10 rounded-[var(--lm-radius)]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export interface ButtonProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof motion.button>,
      "children"
    >,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  /** Sweep a soft light across the button on hover. */
  shimmer?: boolean;
}

/**
 * The Lumora button. Presses physically sink (scale + spring), variants
 * stay quiet until hovered. `variant="glow"` carries the brand lumen.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shimmer = false, children, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), shimmer && "overflow-hidden", className)}
        whileTap={reduceMotion ? undefined : { scale: 0.965 }}
        transition={springs.snap}
        {...props}
      >
        {children}
        {shimmer && !reduceMotion && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ x: "-130%" }}
            animate={{ x: "130%" }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4, ease: "linear" }}
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.14) 50%, transparent 60%)",
            }}
          />
        )}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
