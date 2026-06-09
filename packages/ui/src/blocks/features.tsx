"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface FeatureItem {
  /** Glyph rendered in the soft accent chip. */
  icon?: React.ReactNode;
  title: string;
  body: string;
}

export interface FeatureBentoProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading. @default "Built for the details" */
  heading?: string;
  /** Supporting line under the heading. */
  subheading?: string;
  /**
   * Cards in display order. The first item fills the large 2×2 cell;
   * the rest flow into the small cells. @default five demo features
   */
  items?: FeatureItem[];
}

function Glyph({ d }: { d: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={d} />
    </svg>
  );
}

const defaultItems: FeatureItem[] = [
  {
    icon: <Glyph d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.4-6.4-2.1 2.1M9.7 14.3l-2.1 2.1m0-8.8 2.1 2.1m4.6 4.6 2.1 2.1" />,
    title: "Motion that settles once",
    body: "Three shared springs power every hover, reveal, and layout shift, so the whole page moves as one body. Entrances breathe a single time — nothing wobbles, nothing nags. Override per component only when the physics genuinely call for it.",
  },
  {
    icon: <Glyph d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />,
    title: "Token-pure theming",
    body: "Every color, radius, and shadow resolves through CSS variables. Flip one attribute for a full light theme.",
  },
  {
    icon: <Glyph d="M4 12h16M4 6h16M4 18h10" />,
    title: "Composed, not configured",
    body: "Blocks accept plain content props — arrays in, polished sections out. No config files, no schema wrangling.",
  },
  {
    icon: <Glyph d="M9 12l2 2 4-5m6 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
    title: "Accessible by default",
    body: "Focus rings, aria wiring, and keyboard paths ship in every component, with reduced-motion fallbacks throughout.",
  },
  {
    icon: <Glyph d="M13 2 4.5 13.5H11L10 22l8.5-11.5H13L13 2Z" />,
    title: "Fast where it counts",
    body: "Transform-only animation and lazy ambient effects keep interaction under a frame, even on modest hardware.",
  },
];

/**
 * Asymmetric bento grid: one large anchor card and a constellation of small
 * ones. Cards stagger into view as you scroll, then lift two pixels and
 * brighten their border under the cursor.
 */
export function FeatureBento({
  heading = "Built for the details",
  subheading = "The unglamorous parts of great interfaces, handled once and handled well.",
  items = defaultItems,
  className,
  ...props
}: FeatureBentoProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn("mx-auto max-w-6xl px-4 py-20 sm:px-6", className)}
      {...props}
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
            {subheading}
          </p>
        )}
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ ...springs.drift, delay: i * 0.08 }}
            className={cn(
              "group flex flex-col gap-3 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-6",
              "transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)]",
              i === 0 && "sm:col-span-2 sm:row-span-2 sm:justify-end sm:p-8",
            )}
          >
            {item.icon && (
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--lm-radius)] bg-[var(--lm-accent-soft)] text-[var(--lm-accent)]"
              >
                {item.icon}
              </span>
            )}
            <h3
              className={cn(
                "font-semibold text-[var(--lm-fg)]",
                i === 0 ? "text-xl sm:text-2xl" : "text-base",
              )}
            >
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
              {item.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
