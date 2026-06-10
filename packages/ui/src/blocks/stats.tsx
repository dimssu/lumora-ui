"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";
import { NumberTicker } from "../components/number-ticker";

export interface StatItem {
  /** Final value the ticker lands on. */
  value: number;
  /** Short description under the number. */
  label: string;
  /** Rendered before the number, e.g. "$". */
  prefix?: string;
  /** Rendered after the number, e.g. "%". */
  suffix?: string;
  /** Fraction digits while ticking. @default 0 */
  decimals?: number;
  /** Small change hint, tinted positive for "up" and negative for "down". */
  trend?: { label: string; direction: "up" | "down" };
}

export interface StatsBandProps extends React.HTMLAttributes<HTMLElement> {
  /** Three or four stats in display order. @default four demo stats */
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  {
    value: 12800,
    label: "Teams building on Ondine",
    trend: { label: "+18% this quarter", direction: "up" },
  },
  {
    value: 99.98,
    suffix: "%",
    decimals: 2,
    label: "Uptime across all regions",
    trend: { label: "+0.04 pts", direction: "up" },
  },
  {
    value: 4.6,
    suffix: "M",
    decimals: 1,
    label: "Events processed every day",
    trend: { label: "+412k since May", direction: "up" },
  },
  {
    value: 212,
    label: "Releases shipped this year",
    trend: { label: "+34 vs last year", direction: "up" },
  },
];

/**
 * A horizontal band of large counting stats. Each item rises into place on a
 * gentle stagger as the band scrolls into view, then its NumberTicker counts
 * up to the final figure.
 */
export function StatsBand({
  stats = defaultStats,
  className,
  ...props
}: StatsBandProps) {
  const reduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion ? { duration: 0 } : springs.drift,
    },
  };

  return (
    <section
      className={cn("mx-auto max-w-6xl px-4 py-16 sm:px-6", className)}
      {...props}
    >
      <motion.dl
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="flex flex-col rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] sm:flex-row"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className={cn(
              "flex flex-1 flex-col gap-2 px-8 py-8",
              i > 0 &&
                "border-t border-[var(--lm-border)] sm:border-l sm:border-t-0",
            )}
          >
            <dd className="order-1 text-4xl font-semibold tracking-tight">
              <NumberTicker
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </dd>
            <dt className="order-2 text-sm text-[var(--lm-fg-muted)]">
              {stat.label}
            </dt>
            {stat.trend && (
              <dd
                className={cn(
                  "order-3 flex items-center gap-1 text-xs font-medium",
                  stat.trend.direction === "up"
                    ? "text-[var(--lm-positive)]"
                    : "text-[var(--lm-negative)]",
                )}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "h-3 w-3",
                    stat.trend.direction === "down" && "rotate-180",
                  )}
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                {stat.trend.label}
              </dd>
            )}
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
