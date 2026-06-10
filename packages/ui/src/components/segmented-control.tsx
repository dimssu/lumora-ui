"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface SegmentedControlItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: SegmentedControlItem[];
  /** Controlled selected value. */
  value?: string;
  /** Initial value when uncontrolled. Defaults to the first enabled item. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** @default "md" */
  size?: "sm" | "md";
}

/**
 * Pill segment switcher: the raised pill glides between segments as a
 * shared element on a snappy spring. Behaves as a radiogroup — arrow keys
 * rove focus and select in one move; works controlled or uncontrolled.
 */
export const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      items,
      value,
      defaultValue,
      onValueChange,
      size = "md",
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const baseId = React.useId();
    const segmentRefs = React.useRef(new Map<string, HTMLButtonElement>());

    const firstEnabled = items.find((item) => !item.disabled)?.value;
    const [internal, setInternal] = React.useState(
      defaultValue ?? firstEnabled,
    );
    const selected = value ?? internal;

    const select = (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const enabled = items.filter((item) => !item.disabled);
      if (enabled.length === 0) return;
      const index = enabled.findIndex((item) => item.value === selected);
      let next: string | undefined;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = enabled[(index + 1) % enabled.length]?.value;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          next = enabled[(index - 1 + enabled.length) % enabled.length]?.value;
          break;
        case "Home":
          next = enabled[0]?.value;
          break;
        case "End":
          next = enabled[enabled.length - 1]?.value;
          break;
        default:
          return;
      }
      event.preventDefault();
      if (next !== undefined) {
        select(next);
        segmentRefs.current.get(next)?.focus();
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className={cn(
          "inline-flex w-max items-center gap-1 p-1",
          "rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)]",
          className,
        )}
        {...props}
      >
        {items.map((item) => {
          const isSelected = item.value === selected;
          return (
            <button
              key={item.value}
              ref={(node) => {
                if (node) segmentRefs.current.set(item.value, node);
                else segmentRefs.current.delete(item.value);
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              className={cn(
                "relative font-medium outline-none transition-colors duration-200",
                "rounded-[var(--lm-radius-full)]",
                size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
                "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
                "disabled:pointer-events-none disabled:opacity-50",
                isSelected
                  ? "text-[var(--lm-fg)]"
                  : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
              )}
            >
              {isSelected && (
                <motion.span
                  aria-hidden
                  layoutId={`${baseId}-pill`}
                  transition={reduceMotion ? { duration: 0 } : springs.snap}
                  className={cn(
                    "absolute inset-0 rounded-[var(--lm-radius-full)]",
                    "border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)] shadow-[var(--lm-shadow-sm)]",
                  )}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  },
);
SegmentedControl.displayName = "SegmentedControl";
