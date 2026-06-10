"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { durations, eases } from "../lib/motion";

const alertVariants = cva(
  [
    "relative flex w-full gap-3 border p-4",
    "rounded-[var(--lm-radius)] text-sm",
  ],
  {
    variants: {
      tone: {
        neutral:
          "border-[var(--lm-border)] bg-[var(--lm-surface)] text-[var(--lm-fg)]",
        accent:
          "border-[var(--lm-accent)]/40 bg-[var(--lm-accent-soft)] text-[var(--lm-fg)]",
        positive:
          "border-[var(--lm-positive)]/40 bg-[var(--lm-surface)] text-[var(--lm-fg)]",
        negative:
          "border-[var(--lm-negative)]/40 bg-[var(--lm-surface)] text-[var(--lm-fg)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const toneIconClass: Record<string, string> = {
  neutral: "text-[var(--lm-fg-muted)]",
  accent: "text-[var(--lm-accent)]",
  positive: "text-[var(--lm-positive)]",
  negative: "text-[var(--lm-negative)]",
};

function DefaultGlyph({ tone }: { tone: AlertTone }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  switch (tone) {
    case "positive":
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4">
          <circle cx="8" cy="8" r="6.25" {...stroke} />
          <path d="m5.4 8.2 1.9 1.9 3.4-4" {...stroke} />
        </svg>
      );
    case "negative":
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4">
          <path d="M8 2 14.5 13.5h-13L8 2Z" {...stroke} />
          <path d="M8 6.5v3.2" {...stroke} />
          <circle cx="8" cy="11.7" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "accent":
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4">
          <path
            d="M8 1.8c.6 3.4 2.8 5.6 6.2 6.2-3.4.6-5.6 2.8-6.2 6.2C7.4 10.8 5.2 8.6 1.8 8 5.2 7.4 7.4 5.2 8 1.8Z"
            {...stroke}
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 16 16" className="h-4 w-4">
          <circle cx="8" cy="8" r="6.25" {...stroke} />
          <path d="M8 7.4v3.4" {...stroke} />
          <circle cx="8" cy="5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

type AlertTone = NonNullable<VariantProps<typeof alertVariants>["tone"]>;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  /** Bold first line of the callout. */
  title?: React.ReactNode;
  /** Override the default tone glyph. */
  icon?: React.ReactNode;
  /** Show a close control; dismissal collapses the height and fades out. @default false */
  dismissible?: boolean;
  /** Called after the user dismisses the alert. */
  onDismiss?: () => void;
}

/**
 * Tonal callout. The negative tone announces assertively (`role="alert"`),
 * everything else stays polite (`role="status"`). Dismissing collapses the
 * alert's height while it fades, so surrounding content settles softly;
 * under reduced motion it simply fades.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      tone = "neutral",
      title,
      icon,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion();
    const [open, setOpen] = React.useState(true);
    const resolvedTone: AlertTone = tone ?? "neutral";

    return (
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }
            }
            transition={{ duration: durations.base, ease: eases.out }}
            className="overflow-hidden"
          >
            <div
              ref={ref}
              role={resolvedTone === "negative" ? "alert" : "status"}
              className={cn(alertVariants({ tone }), className)}
              {...props}
            >
              <span
                aria-hidden
                className={cn("mt-0.5 shrink-0", toneIconClass[resolvedTone])}
              >
                {icon ?? <DefaultGlyph tone={resolvedTone} />}
              </span>
              <div className="min-w-0 flex-1">
                {title && (
                  <p className="font-semibold leading-snug text-[var(--lm-fg)]">
                    {title}
                  </p>
                )}
                {children && (
                  <div
                    className={cn(
                      "leading-relaxed text-[var(--lm-fg-muted)]",
                      title && "mt-1",
                    )}
                  >
                    {children}
                  </div>
                )}
              </div>
              {dismissible && (
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => {
                    setOpen(false);
                    onDismiss?.();
                  }}
                  className={cn(
                    "shrink-0 self-start rounded-[var(--lm-radius-sm)] p-1 -m-1",
                    "text-[var(--lm-fg-muted)] outline-none transition-colors duration-200 hover:text-[var(--lm-fg)]",
                    "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                  )}
                >
                  <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3">
                    <path
                      d="m3 3 6 6M9 3l-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);
Alert.displayName = "Alert";
