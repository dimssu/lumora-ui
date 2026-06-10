"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface SliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  /** Controlled value. */
  value?: number;
  /** Initial value when uncontrolled. @default min */
  defaultValue?: number;
  /** @default 0 */
  min?: number;
  /** @default 100 */
  max?: number;
  /** @default 1 */
  step?: number;
  onValueChange?: (value: number) => void;
  /** Show a floating value bubble above the thumb while dragging or focused. */
  bubble?: boolean;
  /** Format the bubble text. @default String(value) */
  formatValue?: (value: number) => string;
  disabled?: boolean;
}

/**
 * Range slider: the accent-filled track follows a thumb that swells on a
 * snappy spring while dragged, with an optional value bubble floating above
 * it. Arrows nudge by a step, PageUp/Down by ten, Home/End jump to the rail
 * ends; pointer drags snap to the nearest step.
 */
export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      bubble = false,
      formatValue = (v) => String(v),
      disabled,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const trackRef = React.useRef<HTMLDivElement>(null);
    const thumbRef = React.useRef<HTMLDivElement>(null);

    const [internal, setInternal] = React.useState(defaultValue ?? min);
    const current = value ?? internal;

    const [dragging, setDragging] = React.useState(false);
    const [focused, setFocused] = React.useState(false);

    const clamp = (raw: number) => {
      const snapped = Math.round((raw - min) / step) * step + min;
      // Avoid floating-point drift like 0.30000000000000004.
      const precise = Number(snapped.toFixed(6));
      return Math.min(max, Math.max(min, precise));
    };

    const commit = (next: number) => {
      const clamped = clamp(next);
      if (clamped === current) return;
      if (value === undefined) setInternal(clamped);
      onValueChange?.(clamped);
    };

    const valueFromPointer = (clientX: number) => {
      const track = trackRef.current;
      if (!track) return current;
      const rect = track.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      return min + ratio * (max - min);
    };

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
      commit(valueFromPointer(event.clientX));
      thumbRef.current?.focus();
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      commit(valueFromPointer(event.clientX));
    };

    const stopDragging = () => setDragging(false);

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      let next: number | undefined;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = current + step;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = current - step;
          break;
        case "PageUp":
          next = current + step * 10;
          break;
        case "PageDown":
          next = current - step * 10;
          break;
        case "Home":
          next = min;
          break;
        case "End":
          next = max;
          break;
        default:
          return;
      }
      event.preventDefault();
      commit(next);
    };

    const percent = max === min ? 0 : ((current - min) / (max - min)) * 100;
    const showBubble = bubble && (dragging || focused);
    const instant = { duration: 0 } as const;
    const positionSpring = dragging || reduceMotion ? instant : springs.snap;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-6 w-full touch-none select-none items-center",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        {...props}
      >
        <div
          ref={trackRef}
          className="relative h-1.5 w-full overflow-hidden rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)]"
        >
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)]"
            animate={{ width: `${percent}%` }}
            transition={positionSpring}
          />
        </div>

        <motion.div
          className="pointer-events-none absolute top-1/2"
          style={{ translateY: "-50%", translateX: "-50%" }}
          animate={{ left: `${percent}%` }}
          transition={positionSpring}
        >
          <motion.div
            ref={thumbRef}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={ariaLabel}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={current}
            aria-disabled={disabled || undefined}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            animate={{ scale: !reduceMotion && dragging ? 1.25 : 1 }}
            transition={reduceMotion ? instant : springs.snap}
            className={cn(
              "pointer-events-auto h-4 w-4 rounded-[var(--lm-radius-full)]",
              "border border-[var(--lm-border-strong)] bg-[var(--lm-fg)] shadow-[var(--lm-shadow-sm)]",
              "outline-none focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
            )}
          />
          <AnimatePresence>
            {showBubble && (
              <motion.div
                aria-hidden
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.9 }
                }
                animate={
                  reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
                }
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.9 }
                }
                transition={springs.drift}
                className={cn(
                  "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap",
                  "rounded-[var(--lm-radius-sm)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)]",
                  "px-1.5 py-0.5 text-xs font-medium tabular-nums text-[var(--lm-fg)] shadow-[var(--lm-shadow-sm)]",
                )}
              >
                {formatValue(current)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  },
);
Slider.displayName = "Slider";
