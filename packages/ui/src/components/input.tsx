"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  /** Field label; rests in the placeholder position and floats on focus/value. */
  label: string;
  /** Validation message rendered below the field in the negative tone. */
  error?: string;
}

/**
 * Floating-label text input: the label sits where a placeholder would,
 * then rises and shrinks once the field is focused or filled, while a
 * 1px accent underline draws in from the left. Under reduced motion the
 * label and underline switch states instantly.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      id: idProp,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const autoId = React.useId();
    const id = idProp ?? autoId;
    const errorId = `${id}-error`;

    const [focused, setFocused] = React.useState(false);
    const [filled, setFilled] = React.useState(() =>
      Boolean(value ?? defaultValue),
    );
    const hasValue =
      value !== undefined ? String(value).length > 0 : filled;
    const floating = focused || hasValue;

    const instant = { duration: 0 } as const;

    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "relative border-b",
            error ? "border-[var(--lm-negative)]" : "border-[var(--lm-border)]",
          )}
        >
          <input
            ref={ref}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => {
              setFilled(e.target.value.length > 0);
              onChange?.(e);
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-12 w-full bg-transparent pt-4 text-sm text-[var(--lm-fg)] outline-none",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
            {...props}
          />
          <motion.label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-0 top-3.5 origin-left text-sm",
              "transition-colors duration-200",
              error
                ? "text-[var(--lm-negative)]"
                : focused
                  ? "text-[var(--lm-accent)]"
                  : "text-[var(--lm-fg-muted)]",
            )}
            animate={floating ? { y: -14, scale: 0.75 } : { y: 0, scale: 1 }}
            transition={reduceMotion ? instant : springs.snap}
          >
            {label}
          </motion.label>
          <motion.span
            aria-hidden
            className={cn(
              "absolute inset-x-0 bottom-[-1px] h-px origin-left",
              error ? "bg-[var(--lm-negative)]" : "bg-[var(--lm-accent)]",
            )}
            animate={{ scaleX: focused ? 1 : 0 }}
            transition={
              reduceMotion
                ? instant
                : { duration: durations.base, ease: eases.out }
            }
          />
        </div>
        <AnimatePresence initial={false}>
          {error && (
            <motion.p
              id={errorId}
              className="mt-1.5 text-xs text-[var(--lm-negative)]"
              initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
              transition={
                reduceMotion
                  ? instant
                  : { duration: durations.fast, ease: eases.out }
              }
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
Input.displayName = "Input";
