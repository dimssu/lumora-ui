"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export type ChangelogTagTone = "new" | "improved" | "fixed";

export interface ChangelogTag {
  label: string;
  /** Tint of the pill: lumen for "new", dusk for "improved", positive for "fixed". @default "new" */
  tone?: ChangelogTagTone;
}

export interface ChangelogRelease {
  /** Version string rendered in the spine chip, e.g. "2.4.0". */
  version: string;
  /** Human-readable date, rendered as-is. */
  date: string;
  title: string;
  /** Bullet list of changes. */
  items: string[];
  tags?: ChangelogTag[];
}

export interface ChangelogProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading. @default "What's new" */
  heading?: string;
  /** Supporting line under the heading. */
  subheading?: string;
  /** Releases, newest first. @default three demo releases */
  releases?: ChangelogRelease[];
}

const defaultReleases: ChangelogRelease[] = [
  {
    version: "2.4.0",
    date: "June 2026",
    title: "Night Tide",
    tags: [
      { label: "New", tone: "new" },
      { label: "Improved", tone: "improved" },
    ],
    items: [
      "Scenes: save a dashboard layout and recall it from the command bar.",
      "Live cursors in shared reports, throttled to stay out of your way.",
      "Charts re-render 2.3× faster on boards with more than 40 widgets.",
    ],
  },
  {
    version: "2.3.0",
    date: "April 2026",
    title: "Low Lantern",
    tags: [
      { label: "New", tone: "new" },
      { label: "Fixed", tone: "fixed" },
    ],
    items: [
      "Audit trail: every workspace change, filterable by member and day.",
      "Keyboard palette learned fuzzy matching and recent-first ordering.",
      "Fixed a drift where weekly digests could arrive in yesterday's timezone.",
    ],
  },
  {
    version: "2.2.1",
    date: "March 2026",
    title: "Still Water",
    tags: [{ label: "Fixed", tone: "fixed" }],
    items: [
      "Exports no longer round currency columns past two decimals.",
      "Sidebar badges clear immediately after the activity feed is read.",
    ],
  },
];

const toneClasses: Record<ChangelogTagTone, string> = {
  new: "bg-[var(--lm-accent-soft)] text-[var(--lm-accent)]",
  improved: "bg-[var(--lm-accent-2-soft)] text-[var(--lm-accent-2)]",
  fixed: "border border-[var(--lm-border)] bg-[var(--lm-surface-2)] text-[var(--lm-positive)]",
};

/**
 * Release notes with a hairline spine down the left edge. Each release hangs
 * off the spine from a version chip and drifts into place as it scrolls into
 * view, newest first.
 */
export function Changelog({
  heading = "What's new",
  subheading = "Every release of Ondine, in the order the lights came on.",
  releases = defaultReleases,
  className,
  ...props
}: ChangelogProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn("mx-auto max-w-3xl px-4 py-20 sm:px-6", className)}
      {...props}
    >
      <div className="mb-12">
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--lm-fg)] [text-wrap:balance] sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-4 text-base leading-relaxed text-[var(--lm-fg-muted)]">
            {subheading}
          </p>
        )}
      </div>

      <div className="relative">
        {/* The spine */}
        <span
          aria-hidden
          className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--lm-border)]"
        />

        <ol className="flex flex-col gap-12">
          {releases.map((release, i) => (
            <motion.li
              key={release.version}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={reduceMotion ? { duration: 0 } : springs.drift}
              className="relative pl-10"
            >
              {/* Spine node */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1 h-[15px] w-[15px] rounded-full border bg-[var(--lm-surface)]",
                  i === 0
                    ? "border-[var(--lm-accent)] shadow-[0_0_12px_var(--lm-glow)]"
                    : "border-[var(--lm-border-strong)]",
                )}
              />

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-[var(--lm-radius-full)] border border-[var(--lm-border-strong)] bg-[var(--lm-surface-2)] px-2.5 py-0.5 font-mono text-xs font-medium text-[var(--lm-fg)]">
                  v{release.version}
                </span>
                <time className="text-xs text-[var(--lm-fg-faint)]">
                  {release.date}
                </time>
                {release.tags?.map((tag) => (
                  <span
                    key={tag.label}
                    className={cn(
                      "rounded-[var(--lm-radius-full)] px-2 py-0.5 text-[11px] font-medium leading-relaxed",
                      toneClasses[tag.tone ?? "new"],
                    )}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <h3 className="mt-3 text-lg font-semibold text-[var(--lm-fg)]">
                {release.title}
              </h3>

              <ul className="mt-3 flex flex-col gap-2">
                {release.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--lm-fg-muted)]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--lm-fg-faint)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
