"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, springs } from "../lib/motion";

export interface AnimatedTabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AnimatedTabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: AnimatedTabItem[];
  /** Controlled active value. */
  value?: string;
  /** Initial value when uncontrolled. Defaults to the first enabled item. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * Tabs where the active pill slides between triggers as a shared element
 * and the panel cross-fades with a small drift. Arrow keys, Home and End
 * move and select; with reduced motion both effects fall back to opacity.
 */
export function AnimatedTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: AnimatedTabsProps) {
  const reduceMotion = useReducedMotion();
  const baseId = React.useId();
  const tabRefs = React.useRef(new Map<string, HTMLButtonElement>());

  const firstEnabled = items.find((item) => !item.disabled)?.value;
  const [internal, setInternal] = React.useState(defaultValue ?? firstEnabled);
  const active = value ?? internal;

  const select = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.filter((item) => !item.disabled);
    if (enabled.length === 0) return;
    const index = enabled.findIndex((item) => item.value === active);
    let next: string | undefined;
    switch (event.key) {
      case "ArrowRight":
        next = enabled[(index + 1) % enabled.length]?.value;
        break;
      case "ArrowLeft":
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
      tabRefs.current.get(next)?.focus();
    }
  };

  const activeItem = items.find((item) => item.value === active);

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-max items-center gap-1 p-1",
          "rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)]",
        )}
      >
        {items.map((item) => {
          const selected = item.value === active;
          return (
            <button
              key={item.value}
              ref={(node) => {
                if (node) tabRefs.current.set(item.value, node);
                else tabRefs.current.delete(item.value);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              className={cn(
                "relative px-3.5 py-1.5 text-sm font-medium outline-none transition-colors duration-200",
                "rounded-[var(--lm-radius-full)]",
                "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
                "disabled:pointer-events-none disabled:opacity-50",
                selected
                  ? "text-[var(--lm-fg)]"
                  : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
              )}
            >
              {selected && (
                <motion.span
                  aria-hidden
                  layoutId={`${baseId}-pill`}
                  transition={reduceMotion ? { duration: 0 } : springs.glide}
                  className={cn(
                    "absolute inset-0 rounded-[var(--lm-radius-full)]",
                    "border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)]",
                  )}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {activeItem && (
          <motion.div
            key={activeItem.value}
            role="tabpanel"
            id={`${baseId}-panel-${activeItem.value}`}
            aria-labelledby={`${baseId}-tab-${activeItem.value}`}
            tabIndex={0}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={
              reduceMotion ? { duration: durations.fast } : springs.drift
            }
            className={cn(
              "outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
            )}
          >
            {activeItem.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
