"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

interface RadioGroupContextValue {
  selected: string | undefined;
  select: (value: string) => void;
  pulse: number;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled selected value. */
  value?: string;
  /** Initial value when uncontrolled. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Layout and arrow-key axis. @default "vertical" */
  orientation?: "horizontal" | "vertical";
}

/**
 * Radio group: selecting an item pops the inner dot in on a snappy spring
 * while a soft lumen ring expands outward once and fades. One roving tab
 * stop; arrow keys move and select in a single gesture.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      orientation = "vertical",
      className,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const groupRef = React.useRef<HTMLDivElement>(null);
    const [internal, setInternal] = React.useState(defaultValue);
    const [pulse, setPulse] = React.useState(0);
    const selected = value ?? internal;

    const select = React.useCallback(
      (next: string) => {
        if (value === undefined) setInternal(next);
        setPulse((p) => p + 1);
        onValueChange?.(next);
      },
      [value, onValueChange],
    );

    // When nothing is selected yet, the first enabled radio holds the tab stop.
    React.useEffect(() => {
      if (selected !== undefined) return;
      const radios = groupRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="radio"]:not(:disabled)',
      );
      radios?.forEach((radio, index) => {
        radio.tabIndex = index === 0 ? 0 : -1;
      });
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      const forward =
        orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      const backward =
        orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      if (![forward, backward, "Home", "End"].includes(event.key)) return;
      const radios = Array.from(
        groupRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="radio"]:not(:disabled)',
        ) ?? [],
      );
      if (radios.length === 0) return;
      event.preventDefault();
      const current = radios.findIndex(
        (radio) => radio === document.activeElement,
      );
      let nextIndex: number;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = radios.length - 1;
      else if (event.key === forward)
        nextIndex = (current + 1) % radios.length;
      else nextIndex = (current - 1 + radios.length) % radios.length;
      radios[nextIndex]?.click();
      radios[nextIndex]?.focus();
    };

    const context = React.useMemo(
      () => ({ selected, select, pulse }),
      [selected, select, pulse],
    );

    return (
      <RadioGroupContext.Provider value={context}>
        <div
          ref={(node) => {
            groupRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          role="radiogroup"
          aria-orientation={orientation}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex gap-3",
            orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export interface RadioItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Value this item contributes to the group. */
  value: string;
  /** Muted helper line under the label. */
  description?: React.ReactNode;
}

/**
 * One option inside a `RadioGroup`. The dot pops in with `springs.snap`
 * and a lumen ring blooms outward once on selection.
 */
export const RadioItem = React.forwardRef<HTMLButtonElement, RadioItemProps>(
  (
    { value, description, className, children, onClick, disabled, ...props },
    ref,
  ) => {
    const context = React.useContext(RadioGroupContext);
    if (!context) {
      throw new Error("RadioItem must be rendered inside a RadioGroup.");
    }
    const reduceMotion = useReducedMotion();
    const labelId = React.useId();
    const descriptionId = `${labelId}-description`;
    const isSelected = context.selected === value;

    return (
      <div className={cn("flex items-start gap-2.5", className)}>
        <button
          ref={ref}
          type="button"
          role="radio"
          aria-checked={isSelected}
          aria-labelledby={children ? labelId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={isSelected ? 0 : -1}
          disabled={disabled}
          onClick={(e) => {
            if (!isSelected) context.select(value);
            onClick?.(e);
          }}
          className={cn(
            "relative inline-flex h-5 w-5 shrink-0 items-center justify-center",
            "rounded-[var(--lm-radius-full)] border outline-none",
            "transition-colors duration-200",
            "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
            "disabled:pointer-events-none disabled:opacity-50",
            isSelected
              ? "border-[var(--lm-accent)]"
              : "border-[var(--lm-border-strong)] bg-[var(--lm-surface)] hover:border-[var(--lm-fg-faint)]",
          )}
          {...props}
        >
          <motion.span
            aria-hidden
            className="h-2.5 w-2.5 rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)]"
            initial={false}
            animate={
              reduceMotion
                ? { opacity: isSelected ? 1 : 0, scale: 1 }
                : { scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }
            }
            transition={reduceMotion ? { duration: 0 } : springs.snap}
          />
          {isSelected && context.pulse > 0 && !reduceMotion && (
            <motion.span
              key={context.pulse}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[var(--lm-radius-full)] bg-[var(--lm-glow)]"
              initial={{ scale: 0.6, opacity: 0.7 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: durations.slow, ease: eases.out }}
            />
          )}
        </button>
        {(children || description) && (
          <span className="grid gap-0.5 pt-px">
            {children && (
              <span
                id={labelId}
                onClick={() => {
                  if (!disabled && !isSelected) context.select(value);
                }}
                className={cn(
                  "cursor-pointer select-none text-sm leading-tight text-[var(--lm-fg)]",
                  disabled && "pointer-events-none opacity-50",
                )}
              >
                {children}
              </span>
            )}
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
        )}
      </div>
    );
  },
);
RadioItem.displayName = "RadioItem";
