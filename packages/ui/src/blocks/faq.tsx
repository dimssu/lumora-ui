"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps extends React.HTMLAttributes<HTMLElement> {
  /** Sticky heading in the left column. @default "Questions, answered" */
  heading?: string;
  /** Supporting line under the heading. */
  subheading?: string;
  /** Disclosure items in display order. @default five demo questions */
  items?: FaqItem[];
  /** Index of the item open on mount, or `null` for all closed. @default 0 */
  defaultOpen?: number | null;
}

const defaultItems: FaqItem[] = [
  {
    question: "Can I use Lumora in commercial projects?",
    answer:
      "Yes. The core library is MIT-licensed, so it can ship in client work, products, and internal tools without attribution. Paid tiers add blocks and services on top, never license restrictions underneath.",
  },
  {
    question: "How does theming work?",
    answer:
      "Every component reads from a small set of CSS variables — surfaces, strokes, type, one accent, radii, and shadows. Set data-theme=\"light\" on any ancestor for the built-in light theme, or override the variables to make the system fully yours.",
  },
  {
    question: "What happens for users who prefer reduced motion?",
    answer:
      "Ambient and looping animation stops entirely, and interaction feedback falls back to opacity. This is wired into every component, not bolted on — the marquee becomes a grid, drawers fade instead of slide.",
  },
  {
    question: "Do the blocks work with server components?",
    answer:
      "Blocks are client components because they animate, but they drop into any server-rendered tree. Pass your content as plain props from the server and the boundary stays exactly one component wide.",
  },
  {
    question: "How often do new components land?",
    answer:
      "A new component or block ships roughly every two weeks, and existing APIs follow semantic versioning. Nothing is removed without a full major version and a written migration path.",
  },
];

/**
 * Two-column FAQ: the heading stays pinned on the left while disclosures
 * open on the right, each answer unfolding to its natural height as the
 * chevron turns over.
 */
export function Faq({
  heading = "Questions, answered",
  subheading = "The things teams ask before they switch the lights on.",
  items = defaultItems,
  defaultOpen = 0,
  className,
  ...props
}: FaqProps) {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const [open, setOpen] = React.useState<number | null>(defaultOpen);

  return (
    <section
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16",
        className,
      )}
      {...props}
    >
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)] [text-wrap:balance]">
            {subheading}
          </p>
        )}
      </div>

      <ul className="flex flex-col">
        {items.map((item, i) => {
          const isOpen = open === i;
          const buttonId = `${uid}-faq-button-${i}`;
          const panelId = `${uid}-faq-panel-${i}`;
          return (
            <li key={item.question} className="border-b border-[var(--lm-border)]">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 py-5 text-left outline-none",
                  "rounded-[var(--lm-radius-sm)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]",
                )}
              >
                <span
                  className={cn(
                    "text-base font-medium transition-colors duration-[var(--lm-duration-fast)]",
                    isOpen
                      ? "text-[var(--lm-fg)]"
                      : "text-[var(--lm-fg-muted)] hover:text-[var(--lm-fg)]",
                  )}
                >
                  {item.question}
                </span>
                <motion.svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={reduceMotion ? { duration: 0 } : springs.snap}
                  className="h-4 w-4 shrink-0 text-[var(--lm-fg-faint)]"
                >
                  <path d="m6 9 6 6 6-6" />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={
                      reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { height: "auto", opacity: 1 }
                    }
                    exit={
                      reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: durations.base, ease: eases.out }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-[var(--lm-fg-muted)]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
