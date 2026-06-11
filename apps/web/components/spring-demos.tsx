"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@lumora/ui";

type SpringName = "snap" | "drift" | "glide";

const SPRINGS: {
  name: SpringName;
  stiffness: number;
  detail: string;
  use: string;
}[] = [
  {
    name: "snap",
    stiffness: 480,
    detail: "Fast settle, no wobble.",
    use: "Hovers, presses, magnetic pulls.",
  },
  {
    name: "drift",
    stiffness: 260,
    detail: "One soft breath on entry.",
    use: "Tooltips, popovers, reveals.",
  },
  {
    name: "glide",
    stiffness: 170,
    detail: "Long and deliberate.",
    use: "Layout shifts, shared elements.",
  },
];

/**
 * One spring card with a live chip the reader can replay: tap or focus to
 * fling the dot across the track under that exact spring. Under reduced
 * motion the dot jumps without physics and the prompt drops.
 */
function SpringCard({
  name,
  stiffness,
  detail,
  use,
}: (typeof SPRINGS)[number]) {
  const reduceMotion = useReducedMotion();
  const [toggled, setToggled] = React.useState(false);
  const transition = reduceMotion ? { duration: 0 } : springs[name];

  return (
    <button
      type="button"
      onClick={() => setToggled((v) => !v)}
      aria-label={`Replay the ${name} spring`}
      className="group flex flex-col gap-3 rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)] bg-[var(--lm-surface)] p-5 text-left outline-none transition-colors duration-[var(--lm-duration-fast)] hover:border-[var(--lm-border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--lm-accent)]"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-mono text-sm font-semibold text-[var(--lm-fg)]">
          springs.{name}
        </h3>
        <span className="font-mono text-[11px] text-[var(--lm-fg-faint)]">
          {stiffness}
        </span>
      </div>

      {/* live track */}
      <div className="relative h-8 rounded-[var(--lm-radius-full)] border border-[var(--lm-border)] bg-[var(--lm-surface-2)]">
        <motion.span
          aria-hidden
          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-[var(--lm-radius-full)] bg-[var(--lm-accent)] shadow-[0_0_14px_var(--lm-glow)]"
          style={{ left: 6 }}
          animate={{ x: toggled ? "calc(100% - 26px - 6px)" : 0 }}
          transition={transition}
        />
      </div>

      <p className="text-sm leading-relaxed text-[var(--lm-fg-muted)]">
        <span className="text-[var(--lm-fg)]">{use}</span> {detail}
      </p>
      <span
        aria-hidden
        className="text-[11px] font-medium uppercase tracking-wider text-[var(--lm-fg-faint)] opacity-0 transition-opacity duration-[var(--lm-duration-fast)] group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {reduceMotion ? "Reduced motion" : "Tap to replay"}
      </span>
    </button>
  );
}

/** The three named springs as live, replayable demo chips. */
export function SpringDemos() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {SPRINGS.map((spring) => (
        <SpringCard key={spring.name} {...spring} />
      ))}
    </div>
  );
}
