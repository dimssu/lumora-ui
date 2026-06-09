import type { Transition } from "motion/react";

/**
 * Lumora motion language.
 *
 * Three springs cover almost every interaction in the library:
 * - `snap`   — hovers, presses, magnetic pulls. Fast settle, no wobble.
 * - `drift`  — tooltips, popovers, reveals. Soft entrance with one gentle breath.
 * - `glide`  — layout shifts, shared-element moves. Long, weighty, deliberate.
 *
 * Components accept a `transition` prop to override, but defaults should
 * always come from here so the whole library moves as one body.
 */
export const springs = {
  snap: { type: "spring", stiffness: 480, damping: 34, mass: 0.7 },
  drift: { type: "spring", stiffness: 260, damping: 22, mass: 0.9 },
  glide: { type: "spring", stiffness: 170, damping: 26, mass: 1.1 },
} satisfies Record<string, Transition>;

/** Ease curves for non-spring (time-based) animation, e.g. gradients, opacity. */
export const eases = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  emphasized: [0.19, 1, 0.22, 1],
} as const;

/** Standard durations (seconds). Keep micro-interactions under 0.45s. */
export const durations = {
  fast: 0.18,
  base: 0.3,
  slow: 0.6,
  ambient: 1.4,
} as const;
