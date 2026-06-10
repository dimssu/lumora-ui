"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Number of stars. @default 5 */
  count?: number;
  /** Controlled rating. */
  value?: number;
  /** Initial rating when uncontrolled. @default 0 */
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** Allow half-star precision via pointer position and arrow keys. */
  allowHalf?: boolean;
  /** Display-only: no pointer or keyboard interaction. */
  readOnly?: boolean;
  /** Accessible name. @default "Rating" */
  label?: string;
}

const starPath =
  "M12 2.6l2.83 5.93 6.37.86-4.66 4.42 1.18 6.38L12 17.07l-5.72 3.12 1.18-6.38L2.8 9.39l6.37-.86L12 2.6z";

function Star({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <path d={starPath} fill="currentColor" />
    </svg>
  );
}

/**
 * Star rating with slider semantics: hovering previews the fill sweeping up
 * to the pointer with a tiny per-star stagger, clicking commits with a pop
 * on the chosen star, and arrow keys adjust the value in steps (halves with
 * `allowHalf`). Read-only mode renders a labelled static image.
 */
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      count = 5,
      value,
      defaultValue = 0,
      onValueChange,
      allowHalf = false,
      readOnly = false,
      label = "Rating",
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const step = allowHalf ? 0.5 : 1;

    const [internal, setInternal] = React.useState(defaultValue);
    const current = value ?? internal;
    const [hovered, setHovered] = React.useState<number | null>(null);
    const [pop, setPop] = React.useState<{ index: number; key: number }>({
      index: -1,
      key: 0,
    });

    const display = hovered ?? current;

    const commit = (next: number) => {
      const clamped = Math.min(count, Math.max(0, next));
      if (value === undefined) setInternal(clamped);
      onValueChange?.(clamped);
    };

    const valueAt = (
      index: number,
      event: React.PointerEvent<HTMLSpanElement>,
    ) => {
      if (!allowHalf) return index + 1;
      const rect = event.currentTarget.getBoundingClientRect();
      return event.clientX - rect.left < rect.width / 2
        ? index + 0.5
        : index + 1;
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
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
        case "Home":
          next = 0;
          break;
        case "End":
          next = count;
          break;
        default:
          return;
      }
      event.preventDefault();
      commit(next);
    };

    const valueText = `${current} of ${count} stars`;

    return (
      <div
        ref={ref}
        role={readOnly ? "img" : "slider"}
        aria-label={readOnly ? `${label}: ${valueText}` : label}
        tabIndex={readOnly ? undefined : 0}
        aria-valuemin={readOnly ? undefined : 0}
        aria-valuemax={readOnly ? undefined : count}
        aria-valuenow={readOnly ? undefined : current}
        aria-valuetext={readOnly ? undefined : valueText}
        onKeyDown={readOnly ? undefined : onKeyDown}
        onMouseLeave={readOnly ? undefined : () => setHovered(null)}
        className={cn(
          "inline-flex items-center gap-0.5 outline-none",
          !readOnly &&
            "rounded-[var(--lm-radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
          className,
        )}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => {
          const fill = Math.min(1, Math.max(0, display - i));
          return (
            <motion.span
              // Re-key the popped star so a repeat click replays the pop.
              key={pop.index === i ? `star-${i}-pop-${pop.key}` : `star-${i}`}
              animate={
                !reduceMotion && pop.index === i
                  ? { scale: [1.25, 1] }
                  : { scale: 1 }
              }
              transition={reduceMotion ? { duration: 0 } : springs.snap}
              onPointerMove={
                readOnly
                  ? undefined
                  : (e) => setHovered(valueAt(i, e))
              }
              onPointerDown={
                readOnly
                  ? undefined
                  : (e) => {
                      commit(valueAt(i, e));
                      setPop((p) => ({ index: i, key: p.key + 1 }));
                    }
              }
              className={cn(
                "relative block h-5 w-5",
                !readOnly && "cursor-pointer",
              )}
            >
              <Star className="absolute inset-0 h-full w-full text-[var(--lm-fg-faint)]" />
              <motion.span
                aria-hidden
                className="absolute inset-y-0 left-0 overflow-hidden"
                initial={false}
                animate={{ width: `${fill * 100}%` }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: durations.fast,
                        ease: eases.out,
                        delay: i * 0.02,
                      }
                }
              >
                <Star className="h-5 w-5 text-[var(--lm-accent)]" />
              </motion.span>
            </motion.span>
          );
        })}
      </div>
    );
  },
);
Rating.displayName = "Rating";
