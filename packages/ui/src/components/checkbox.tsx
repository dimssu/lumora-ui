"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial state when uncontrolled. @default false */
  defaultChecked?: boolean;
  /** Fires with the next state on every toggle. */
  onCheckedChange?: (checked: boolean) => void;
  /** Show a dash instead of a check, for "some selected". @default false */
  indeterminate?: boolean;
  /** Field label rendered beside the box and wired via `aria-labelledby`. */
  label?: React.ReactNode;
  /** Muted helper line under the label, wired via `aria-describedby`. */
  description?: React.ReactNode;
}

/**
 * Accessible checkbox: checking fills the box with the lumen, pops it with
 * a tiny scale breath, and draws the check stroke in along its path; the
 * `indeterminate` state shows a dash instead. Works controlled or
 * uncontrolled; under reduced motion the mark simply fades.
 */
export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      indeterminate = false,
      label,
      description,
      onClick,
      disabled,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const autoId = React.useId();
    const id = idProp ?? autoId;
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const [internal, setInternal] = React.useState(defaultChecked);
    const isChecked = checked ?? internal;
    const marked = isChecked || indeterminate;

    const instant = { duration: 0 } as const;

    const box = (
      <button
        ref={ref}
        id={id}
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : isChecked}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={(e) => {
          const next = !isChecked;
          if (checked === undefined) setInternal(next);
          onCheckedChange?.(next);
          onClick?.(e);
        }}
        className={cn(
          "relative inline-flex h-5 w-5 shrink-0 items-center justify-center",
          "rounded-[var(--lm-radius-sm)] border outline-none",
          "transition-colors duration-200",
          "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
          "disabled:pointer-events-none disabled:opacity-50",
          marked
            ? "border-[var(--lm-accent)] bg-[var(--lm-accent)]"
            : "border-[var(--lm-border-strong)] bg-[var(--lm-surface)] hover:border-[var(--lm-fg-faint)]",
          !label && className,
        )}
        {...props}
      >
        <motion.span
          aria-hidden
          className="flex items-center justify-center"
          initial={false}
          animate={
            reduceMotion
              ? { scale: 1 }
              : { scale: marked ? [0.7, 1] : 1 }
          }
          transition={reduceMotion ? instant : springs.snap}
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-[var(--lm-accent-fg)]">
            {indeterminate ? (
              <motion.path
                d="M2.5 6h7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={
                  reduceMotion
                    ? instant
                    : { duration: durations.fast, ease: eases.out }
                }
              />
            ) : (
              <motion.path
                d="M2 6.5 4.8 9 10 3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={
                  reduceMotion
                    ? { opacity: isChecked ? 1 : 0 }
                    : {
                        pathLength: isChecked ? 1 : 0,
                        opacity: isChecked ? 1 : 0,
                      }
                }
                transition={
                  reduceMotion
                    ? instant
                    : { duration: durations.base, ease: eases.out }
                }
              />
            )}
          </svg>
        </motion.span>
      </button>
    );

    if (!label) return box;

    return (
      <div className={cn("flex items-start gap-2.5", className)}>
        {box}
        <span className="grid gap-0.5 pt-px">
          <label
            id={labelId}
            htmlFor={id}
            className={cn(
              "cursor-pointer select-none text-sm leading-tight text-[var(--lm-fg)]",
              disabled && "pointer-events-none opacity-50",
            )}
          >
            {label}
          </label>
          {description && (
            <span
              id={descriptionId}
              className={cn(
                "text-xs leading-snug text-[var(--lm-fg-muted)]",
                disabled && "opacity-50",
              )}
            >
              {description}
            </span>
          )}
        </span>
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
