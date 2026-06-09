"use client";

import * as React from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  type LegacyAnimationControls,
  type SVGMotionProps,
  type Transition,
} from "motion/react";

/**
 * Lumora icon motion language — mirrors `@lumora/ui`'s `src/lib/motion.ts`
 * so icons move as one body with the rest of the library.
 */
export const springs = {
  snap: { type: "spring", stiffness: 480, damping: 34, mass: 0.7 },
  drift: { type: "spring", stiffness: 260, damping: 22, mass: 0.9 },
} satisfies Record<string, Transition>;

/** Ease curves for keyframe (time-based) micro-animations. */
export const eases: Record<"out" | "inOut" | "emphasized", [number, number, number, number]> = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  emphasized: [0.19, 1, 0.22, 1],
};

/** Standard durations (seconds). Micro-interactions stay under 0.45s. */
export const durations = {
  fast: 0.18,
  base: 0.3,
  max: 0.45,
} as const;

/** Pause between repeats in `animate="loop"` mode (seconds). */
const LOOP_REPEAT_DELAY = 2.4;

/** The four animation modes every Lumora icon understands. */
export type IconAnimateMode = "hover" | "mount" | "loop" | "none";

type MotionSvgProps = Omit<SVGMotionProps<SVGSVGElement>, "animate">;

export interface IconProps extends MotionSvgProps {
  /**
   * Rendered width/height in px.
   * @default 20
   */
  size?: number;
  /**
   * Stroke weight on the 24px grid.
   * @default 1.75
   */
  strokeWidth?: number;
  /**
   * How the icon's micro-animation is triggered:
   * - `"hover"` — plays while a pointer rests on the icon (or a wrapping
   *   `motion` parent propagates its hover), settles back on leave.
   * - `"mount"` — plays once when the icon enters the tree, then rests.
   * - `"loop"`  — plays, rests, and repeats every ~2.4s. Ambient; use sparingly.
   * - `"none"`  — static glyph, no motion.
   * Reduced-motion preferences force `"none"`.
   * @default "hover"
   */
  animate?: IconAnimateMode;
  /**
   * Accessible name. When set, the svg gets `role="img"` + `aria-label`;
   * otherwise the icon is `aria-hidden` (decorative by default).
   */
  label?: string;
}

/** Motion props produced by {@link useIconAnimation} for the root svg. */
export interface IconMotionProps {
  initial: "idle";
  animate: "idle" | LegacyAnimationControls;
  whileHover?: "active";
}

/**
 * Implements the four icon animation modes. Returns props for the root
 * `motion.svg`; child paths declare `idle`/`active` variants and inherit
 * whichever label the root is currently playing. Respects reduced motion.
 */
export function useIconAnimation(animate: IconAnimateMode = "hover"): IconMotionProps {
  const reducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const mode: IconAnimateMode = reducedMotion ? "none" : animate;

  React.useEffect(() => {
    if (mode !== "mount" && mode !== "loop") return undefined;
    let cancelled = false;
    const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s * 1000));

    void (async () => {
      do {
        await controls.start("active");
        if (cancelled) return;
        await controls.start("idle");
        if (cancelled || mode === "mount") return;
        await sleep(LOOP_REPEAT_DELAY);
      } while (!cancelled);
    })();

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [mode, controls]);

  if (mode === "hover") {
    return { initial: "idle", animate: "idle", whileHover: "active" };
  }
  if (mode === "mount" || mode === "loop") {
    return { initial: "idle", animate: controls };
  }
  return { initial: "idle", animate: "idle" };
}

/**
 * Shared svg shell for every Lumora icon. Renders a `motion.svg` on the
 * 24px grid (stroke `currentColor`, round caps/joins) and wires variant
 * propagation so child motion paths animate between `idle` and `active`.
 */
export const IconBase = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 20,
      strokeWidth = 1.75,
      animate = "hover",
      label,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const motionProps = useIconAnimation(animate);
    return (
      <motion.svg
        ref={ref}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.svg>
    );
  },
);
IconBase.displayName = "IconBase";
