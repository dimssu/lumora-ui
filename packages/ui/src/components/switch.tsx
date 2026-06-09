"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial state when uncontrolled. @default false */
  defaultChecked?: boolean;
  /** Fires with the next state on every toggle. */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Accessible toggle: the knob slides across the track on a snappy spring
 * (layout animation) while the track crossfades to the accent. Works
 * controlled or uncontrolled; Space and Enter toggle it from the keyboard.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const [internal, setInternal] = React.useState(defaultChecked);
    const isChecked = checked ?? internal;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={(e) => {
          const next = !isChecked;
          if (checked === undefined) setInternal(next);
          onCheckedChange?.(next);
          onClick?.(e);
        }}
        className={cn(
          "inline-flex h-6 w-11 shrink-0 items-center rounded-[var(--lm-radius-full)] border p-0.5",
          "outline-none transition-colors duration-300",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
          "disabled:pointer-events-none disabled:opacity-50",
          isChecked
            ? "justify-end border-[var(--lm-accent)] bg-[var(--lm-accent)]"
            : "justify-start border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)]",
          className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          layout={!reduceMotion}
          transition={springs.snap}
          className={cn(
            "h-[18px] w-[18px] rounded-[var(--lm-radius-full)] shadow-[var(--lm-shadow-sm)]",
            "transition-colors duration-300",
            isChecked ? "bg-[var(--lm-accent-fg)]" : "bg-[var(--lm-fg-muted)]",
          )}
        />
      </button>
    );
  },
);
Switch.displayName = "Switch";
