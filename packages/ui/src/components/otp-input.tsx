"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface OtpInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Number of digits. @default 6 */
  length?: number;
  /** Controlled code (digits only). */
  value?: string;
  /** Initial code when uncontrolled. */
  defaultValue?: string;
  /** Fires with the current code on every edit. */
  onChange?: (code: string) => void;
  /** Fires once the final digit lands. */
  onComplete?: (code: string) => void;
  /** Accessible name for the group. @default "One-time code" */
  label?: string;
  disabled?: boolean;
}

/**
 * One-time-code entry: one cell per digit, each popping on a snappy spring
 * as it fills while the accent ring tracks the active cell. Typing
 * auto-advances, Backspace retreats, and pasting a full code fans the
 * digits across the cells; `onComplete` fires with the finished code.
 */
export const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      label = "One-time code",
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const sanitize = (raw: string) => raw.replace(/\D/g, "").slice(0, length);

    const [internal, setInternal] = React.useState(() =>
      sanitize(defaultValue),
    );
    const code = value !== undefined ? sanitize(value) : internal;
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

    const setCode = (next: string) => {
      const clean = sanitize(next);
      if (value === undefined) setInternal(clean);
      onChange?.(clean);
      if (clean.length === length) onComplete?.(clean);
    };

    const focusCell = (index: number) => {
      inputRefs.current[Math.min(Math.max(index, 0), length - 1)]?.focus();
    };

    const handleInput = (index: number, raw: string) => {
      const digits = raw.replace(/\D/g, "");
      if (digits.length === 0) {
        setCode(code.slice(0, index));
        return;
      }
      const next = code.slice(0, index) + digits;
      setCode(next);
      focusCell(Math.min(next.length, length - 1));
    };

    const handleKeyDown = (
      index: number,
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      switch (event.key) {
        case "Backspace":
          event.preventDefault();
          if (code[index]) {
            setCode(code.slice(0, index));
          } else if (index > 0) {
            setCode(code.slice(0, index - 1));
            focusCell(index - 1);
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          focusCell(index - 1);
          break;
        case "ArrowRight":
          event.preventDefault();
          focusCell(index + 1);
          break;
        default:
          break;
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      const digits = sanitize(event.clipboardData.getData("text"));
      if (!digits) return;
      setCode(digits);
      focusCell(Math.min(digits.length, length - 1));
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        onPaste={handlePaste}
        className={cn(
          "flex items-center gap-2",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        {Array.from({ length }, (_, i) => {
          const char = code[i] ?? "";
          const isActive = focusedIndex === i;
          return (
            <motion.input
              key={i}
              ref={(node: HTMLInputElement | null) => {
                inputRefs.current[i] = node;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${i + 1} of ${length}`}
              value={char}
              disabled={disabled}
              onChange={(e) => handleInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={(e) => {
                // Keep entry contiguous: jump to the first empty cell.
                if (i > code.length) {
                  focusCell(code.length);
                  return;
                }
                setFocusedIndex(i);
                e.target.select();
              }}
              onBlur={() => setFocusedIndex(null)}
              animate={
                !reduceMotion && char
                  ? { scale: [1.08, 1] }
                  : { scale: 1 }
              }
              transition={reduceMotion ? { duration: 0 } : springs.snap}
              className={cn(
                "h-12 w-10 text-center text-lg font-medium tabular-nums caret-transparent",
                "rounded-[var(--lm-radius)] border bg-[var(--lm-surface)] text-[var(--lm-fg)]",
                "outline-none transition-colors duration-200",
                "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
                isActive
                  ? "border-[var(--lm-accent)]"
                  : char
                    ? "border-[var(--lm-border-strong)]"
                    : "border-[var(--lm-border)]",
              )}
            />
          );
        })}
      </div>
    );
  },
);
OtpInput.displayName = "OtpInput";
