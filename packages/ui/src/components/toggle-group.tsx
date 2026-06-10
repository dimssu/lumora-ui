"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface ToggleGroupItem {
  value: string;
  /** Visible text; optional when `icon` plus an `ariaLabel` is enough. */
  label?: React.ReactNode;
  /** Leading glyph; pair with `ariaLabel` when used alone. */
  icon?: React.ReactNode;
  /** Accessible name for icon-only items. */
  ariaLabel?: string;
  disabled?: boolean;
}

interface ToggleGroupBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  items: ToggleGroupItem[];
  /** @default "md" */
  size?: "sm" | "md";
}

export interface ToggleGroupSingleProps extends ToggleGroupBaseProps {
  /** One pressed item at most; the backplate glides between them. @default "single" */
  type?: "single";
  /** Controlled pressed value ("" for none). */
  value?: string;
  /** Initial pressed value when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface ToggleGroupMultipleProps extends ToggleGroupBaseProps {
  /** Any number of items may be pressed at once. */
  type: "multiple";
  /** Controlled pressed values. */
  value?: string[];
  /** Initial pressed values when uncontrolled. */
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupProps =
  | ToggleGroupSingleProps
  | ToggleGroupMultipleProps;

/**
 * Pressed-button group: in single mode a raised backplate glides between
 * pressed items as a shared element on `springs.snap`; in multiple mode
 * each item simply latches. One roving tab stop, arrow keys move focus
 * without toggling, Space/Enter press.
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (props, ref) => {
    const {
      items,
      type = "single",
      value,
      defaultValue,
      onValueChange,
      size = "md",
      className,
      onKeyDown,
      ...rest
    } = props as ToggleGroupBaseProps & {
      type?: "single" | "multiple";
      value?: string | string[];
      defaultValue?: string | string[];
      onValueChange?: ((value: string) => void) | ((value: string[]) => void);
      onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    };

    const reduceMotion = useReducedMotion();
    const baseId = React.useId();
    const groupRef = React.useRef<HTMLDivElement>(null);

    const toArray = (input: string | string[] | undefined): string[] =>
      input === undefined ? [] : Array.isArray(input) ? input : input ? [input] : [];

    const [internal, setInternal] = React.useState<string[]>(() =>
      toArray(defaultValue),
    );
    const pressed = value !== undefined ? toArray(value) : internal;

    const firstEnabled = items.find((item) => !item.disabled)?.value;
    const [focusedValue, setFocusedValue] = React.useState<string | undefined>(
      undefined,
    );
    const tabbable =
      focusedValue !== undefined &&
      items.some((item) => !item.disabled && item.value === focusedValue)
        ? focusedValue
        : firstEnabled;

    const toggle = (itemValue: string) => {
      let next: string[];
      if (type === "single") {
        next = pressed.includes(itemValue) ? [] : [itemValue];
      } else {
        next = pressed.includes(itemValue)
          ? pressed.filter((v) => v !== itemValue)
          : [...pressed, itemValue];
      }
      if (value === undefined) setInternal(next);
      if (type === "single") {
        (onValueChange as ((v: string) => void) | undefined)?.(next[0] ?? "");
      } else {
        (onValueChange as ((v: string[]) => void) | undefined)?.(next);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
        return;
      const buttons = Array.from(
        groupRef.current?.querySelectorAll<HTMLButtonElement>(
          "button[data-lm-toggle]:not(:disabled)",
        ) ?? [],
      );
      if (buttons.length === 0) return;
      event.preventDefault();
      const current = buttons.findIndex(
        (button) => button === document.activeElement,
      );
      let nextIndex: number;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = buttons.length - 1;
      else if (event.key === "ArrowRight" || event.key === "ArrowDown")
        nextIndex = (current + 1) % buttons.length;
      else nextIndex = (current - 1 + buttons.length) % buttons.length;
      buttons[nextIndex]?.focus();
    };

    return (
      <div
        ref={(node) => {
          groupRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="group"
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex w-max items-center gap-1 p-1",
          "rounded-[var(--lm-radius)] border border-[var(--lm-border)] bg-[var(--lm-surface)]",
          className,
        )}
        {...rest}
      >
        {items.map((item) => {
          const isPressed = pressed.includes(item.value);
          return (
            <button
              key={item.value}
              type="button"
              data-lm-toggle
              aria-pressed={isPressed}
              aria-label={item.ariaLabel}
              tabIndex={item.value === tabbable ? 0 : -1}
              disabled={item.disabled}
              onFocus={() => setFocusedValue(item.value)}
              onClick={() => toggle(item.value)}
              className={cn(
                "relative inline-flex items-center justify-center gap-1.5 font-medium",
                "rounded-[var(--lm-radius-sm)] outline-none transition-colors duration-200",
                size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
                "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
                "disabled:pointer-events-none disabled:opacity-50",
                isPressed
                  ? "text-[var(--lm-fg)]"
                  : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
                // Multiple mode has no shared backplate; latch each item.
                type === "multiple" && isPressed && "bg-[var(--lm-surface-2)]",
              )}
            >
              {type === "single" && isPressed && (
                <motion.span
                  aria-hidden
                  layoutId={`${baseId}-backplate`}
                  transition={reduceMotion ? { duration: 0 } : springs.snap}
                  className={cn(
                    "absolute inset-0 rounded-[var(--lm-radius-sm)]",
                    "border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)] shadow-[var(--lm-shadow-sm)]",
                  )}
                />
              )}
              {item.icon && (
                <span aria-hidden className="relative [&>svg]:h-4 [&>svg]:w-4">
                  {item.icon}
                </span>
              )}
              {item.label && <span className="relative">{item.label}</span>}
            </button>
          );
        })}
      </div>
    );
  },
);
ToggleGroup.displayName = "ToggleGroup";
