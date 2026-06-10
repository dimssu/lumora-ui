"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface StepperStep {
  label: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  steps: StepperStep[];
  /** Zero-based index of the step in progress. @default 0 */
  activeStep?: number;
  /** When provided, steps become clickable buttons. */
  onStepClick?: (index: number) => void;
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}

function CheckGlyph({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M3 8.5l3.5 3.5L13 4.5"
        initial={{ pathLength: reduceMotion ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: durations.base, ease: [...eases.out], delay: 0.1 }
        }
      />
    </svg>
  );
}

/**
 * Step indicator whose connector lines fill with the lumen as steps
 * complete, numbers crossfading into a drawn-in check. The active node
 * carries a soft lumen ring; steps become clickable via `onStepClick`.
 */
export function Stepper({
  steps,
  activeStep = 0,
  onStepClick,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const horizontal = orientation === "horizontal";

  return (
    <div
      role="list"
      aria-label="Progress"
      className={cn(
        "flex",
        horizontal ? "w-full flex-row items-start" : "flex-col",
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const completed = index < activeStep;
        const active = index === activeStep;
        const last = index === steps.length - 1;

        const node = (
          <motion.span
            aria-hidden
            animate={
              active && !reduceMotion
                ? { boxShadow: "0 0 0 5px var(--lm-accent-soft), 0 0 18px var(--lm-glow)" }
                : { boxShadow: "0 0 0 0px transparent" }
            }
            transition={springs.drift}
            className={cn(
              "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
              "transition-colors duration-[var(--lm-duration)]",
              completed
                ? "border-[var(--lm-accent)] bg-[var(--lm-accent)] text-[var(--lm-accent-fg)]"
                : active
                  ? "border-[var(--lm-accent)] bg-[var(--lm-surface)] text-[var(--lm-accent)]"
                  : "border-[var(--lm-border-strong)] bg-[var(--lm-surface)] text-[var(--lm-fg-muted)]",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {completed ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
                  transition={reduceMotion ? { duration: durations.fast } : springs.snap}
                  className="flex items-center justify-center"
                >
                  <CheckGlyph reduceMotion={reduceMotion} />
                </motion.span>
              ) : (
                <motion.span
                  key="number"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.6 }}
                  transition={reduceMotion ? { duration: durations.fast } : springs.snap}
                >
                  {index + 1}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        );

        const text = (
          <span
            className={cn(
              "flex min-w-0 flex-col",
              horizontal ? "mt-2 items-center text-center" : "pt-1.5",
            )}
          >
            <span
              className={cn(
                "text-xs font-medium",
                active || completed
                  ? "text-[var(--lm-fg)]"
                  : "text-[var(--lm-fg-muted)]",
              )}
            >
              {step.label}
            </span>
            {step.description && (
              <span className="mt-0.5 text-[11px] text-[var(--lm-fg-faint)]">
                {step.description}
              </span>
            )}
          </span>
        );

        const content = onStepClick ? (
          <button
            type="button"
            onClick={() => onStepClick(index)}
            aria-current={active ? "step" : undefined}
            className={cn(
              "flex shrink-0 rounded-[var(--lm-radius)] outline-none",
              horizontal ? "flex-col items-center" : "flex-row items-start gap-3",
              "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lm-bg)]",
            )}
          >
            {node}
            {text}
          </button>
        ) : (
          <span
            aria-current={active ? "step" : undefined}
            className={cn(
              "flex shrink-0",
              horizontal ? "flex-col items-center" : "flex-row items-start gap-3",
            )}
          >
            {node}
            {text}
          </span>
        );

        const connector = !last && (
          <span
            aria-hidden
            className={cn(
              "relative overflow-hidden bg-[var(--lm-border)]",
              horizontal
                ? "mt-4 h-px min-w-6 flex-1"
                : "ml-4 h-6 w-px",
            )}
          >
            <motion.span
              className={cn(
                "absolute inset-0 bg-[var(--lm-accent)]",
                horizontal ? "origin-left" : "origin-top",
              )}
              initial={false}
              animate={
                horizontal
                  ? { scaleX: completed ? 1 : 0 }
                  : { scaleY: completed ? 1 : 0 }
              }
              transition={reduceMotion ? { duration: 0 } : springs.glide}
            />
          </span>
        );

        return (
          <React.Fragment key={index}>
            <div role="listitem" className={cn(horizontal ? "shrink-0" : "flex gap-0 flex-col")}>
              {content}
            </div>
            {connector}
          </React.Fragment>
        );
      })}
    </div>
  );
}
