"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";
import { Button } from "../components/button";

export type PricingPeriod = "monthly" | "yearly";

export interface PricingTier {
  name: string;
  description: string;
  /** Price per month on monthly billing. */
  monthly: number;
  /** Price per month on yearly billing. */
  yearly: number;
  features: string[];
  ctaLabel: string;
  /** Carries the lumen glow and the "Most loved" tag. */
  highlighted?: boolean;
}

export interface PricingProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading. @default "Simple, honest pricing" */
  heading?: string;
  /** Supporting line under the heading. */
  subheading?: string;
  /** Tiers in display order. @default three demo tiers */
  tiers?: PricingTier[];
  /** Billing period selected on mount. @default "monthly" */
  defaultPeriod?: PricingPeriod;
  /** Called when a tier's CTA is pressed. */
  onTierSelect?: (tier: PricingTier, period: PricingPeriod) => void;
}

const defaultTiers: PricingTier[] = [
  {
    name: "Spark",
    description: "For side projects finding their light.",
    monthly: 0,
    yearly: 0,
    features: [
      "All core components",
      "Dark & light themes",
      "Community gallery access",
      "MIT-licensed source",
    ],
    ctaLabel: "Start for free",
  },
  {
    name: "Studio",
    description: "For teams shipping polished product every week.",
    monthly: 24,
    yearly: 19,
    features: [
      "Everything in Spark",
      "All landing blocks",
      "Figma-ready token kit",
      "Priority issue triage",
      "Unlimited team seats",
    ],
    ctaLabel: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Atelier",
    description: "For studios that want a hand on the lighting rig.",
    monthly: 79,
    yearly: 64,
    features: [
      "Everything in Studio",
      "Custom theme engineering",
      "Motion audit each quarter",
      "Dedicated support channel",
    ],
    ctaLabel: "Talk to us",
  },
];

const periods: PricingPeriod[] = ["monthly", "yearly"];

/**
 * Three-tier pricing with a segmented billing toggle: a single pill slides
 * between monthly and yearly while every price crossfades to its new value.
 * The middle tier carries the lumen glow.
 */
export function Pricing({
  heading = "Simple, honest pricing",
  subheading = "Pay for polish, not seats. Switch billing any time — yearly saves around 20%.",
  tiers = defaultTiers,
  defaultPeriod = "monthly",
  onTierSelect,
  className,
  ...props
}: PricingProps) {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const [period, setPeriod] = React.useState<PricingPeriod>(defaultPeriod);

  return (
    <section
      className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}
      {...props}
    >
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
            {subheading}
          </p>
        )}
      </div>

      {/* Billing toggle */}
      <div
        role="group"
        aria-label="Billing period"
        className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-1"
      >
        {periods.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={period === p}
            onClick={() => setPeriod(p)}
            className={cn(
              "relative rounded-[var(--lm-radius-full)] px-4 py-1.5 text-sm font-medium capitalize outline-none",
              "transition-colors duration-[var(--lm-duration-fast)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
              period === p
                ? "text-[var(--lm-fg)]"
                : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
            )}
          >
            {period === p && (
              <motion.span
                aria-hidden
                layoutId={`${uid}-period-pill`}
                transition={reduceMotion ? { duration: 0 } : springs.snap}
                className="absolute inset-0 rounded-[var(--lm-radius-full)] bg-[var(--lm-surface-2)] border border-[var(--lm-border-strong)]"
              />
            )}
            <span className="relative z-10">{p}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className={cn(
              "relative flex flex-col rounded-[var(--lm-radius-lg)] border bg-[var(--lm-surface)] p-6",
              tier.highlighted
                ? "border-[var(--lm-border-strong)] shadow-[var(--lm-shadow-glow)]"
                : "border-[var(--lm-border)]",
            )}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)] px-3 py-0.5 text-xs font-semibold text-[var(--lm-accent-fg)]">
                Most loved
              </span>
            )}

            <h3 className="text-lg font-semibold text-[var(--lm-fg)]">
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--lm-fg-muted)]">
              {tier.description}
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={period}
                  initial={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: durations.fast, ease: eases.out }}
                  className="text-4xl font-semibold tracking-tight text-[var(--lm-fg)]"
                >
                  ${period === "monthly" ? tier.monthly : tier.yearly}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm text-[var(--lm-fg-faint)]">
                /mo{period === "yearly" ? ", billed yearly" : ""}
              </span>
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-[var(--lm-fg-muted)]"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lm-positive)]"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={tier.highlighted ? "accent" : "outline"}
              size="md"
              className="mt-8 w-full"
              onClick={() => onTierSelect?.(tier, period)}
            >
              {tier.ctaLabel}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
