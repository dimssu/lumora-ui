"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder"> {
  /** Field label; rests in the placeholder position and floats on focus/value. */
  label: string;
  /** Validation message rendered below the field in the negative tone. */
  error?: string;
  /** Grow with content instead of scrolling. @default true */
  autoGrow?: boolean;
  /** Stop growing after this many rows; overflow scrolls beyond it. */
  maxRows?: number;
}

/**
 * Floating-label textarea: the label rests where a placeholder would, then
 * rises and shrinks once the field is focused or filled while a 1px accent
 * underline draws in from the left. With `autoGrow` the field stretches to
 * fit its content (capped by `maxRows`); under reduced motion the label and
 * underline switch states instantly.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      autoGrow = true,
      maxRows,
      id: idProp,
      rows = 3,
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

    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [focused, setFocused] = React.useState(false);
    const [filled, setFilled] = React.useState(() =>
      Boolean(value ?? defaultValue),
    );
    const hasValue =
      value !== undefined ? String(value).length > 0 : filled;
    const floating = focused || hasValue;

    const instant = { duration: 0 } as const;

    const resize = React.useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoGrow) return;
      el.style.height = "auto";
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight) || 20;
      const padding =
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const max =
        maxRows !== undefined
          ? maxRows * lineHeight + padding
          : Number.POSITIVE_INFINITY;
      const next = Math.min(el.scrollHeight, max);
      el.style.height = `${next}px`;
      el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden";
    }, [autoGrow, maxRows]);

    // Keep height in sync with controlled value changes and first paint.
    React.useLayoutEffect(() => {
      resize();
    }, [resize, value]);

    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "relative border-b",
            error ? "border-[var(--lm-negative)]" : "border-[var(--lm-border)]",
          )}
        >
          <textarea
            ref={(node) => {
              innerRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={id}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => {
              setFilled(e.target.value.length > 0);
              resize();
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
              "w-full bg-transparent pb-2 pt-6 text-sm leading-relaxed text-[var(--lm-fg)] outline-none",
              autoGrow ? "resize-none" : "resize-y",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
            {...props}
          />
          <motion.label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-0 top-[22px] origin-left text-sm",
              "transition-colors duration-200",
              error
                ? "text-[var(--lm-negative)]"
                : focused
                  ? "text-[var(--lm-accent)]"
                  : "text-[var(--lm-fg-muted)]",
            )}
            animate={floating ? { y: -18, scale: 0.75 } : { y: 0, scale: 1 }}
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
Textarea.displayName = "Textarea";
