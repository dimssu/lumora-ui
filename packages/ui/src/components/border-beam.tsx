"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "../lib/cn";

export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seconds per full lap around the border. @default 6 */
  duration?: number;
  /** Thickness of the painted border ring in px. @default 2 */
  beamWidth?: number;
  /** Which accent carries the beam. @default "lumen" */
  color?: "lumen" | "dusk";
}

/**
 * Wraps its child with a luminous beam endlessly traveling around the
 * border: a rotating conic gradient (bright head, transparent tail) is
 * masked down to the border ring via the padding-box/border-box mask
 * composite trick, so only the ring ever lights up. Under reduced motion
 * the lap stops and a static gradient border remains.
 */
export function BorderBeam({
  duration = 6,
  beamWidth = 2,
  color = "lumen",
  className,
  children,
  ...props
}: BorderBeamProps) {
  const reduceMotion = useReducedMotion();
  const angle = useMotionValue(0);

  const head = color === "dusk" ? "var(--lm-accent-2)" : "var(--lm-accent)";
  const soft =
    color === "dusk" ? "var(--lm-accent-2-soft)" : "var(--lm-accent-soft)";

  React.useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(angle, [0, 360], {
      duration,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [angle, duration, reduceMotion]);

  const beam = useTransform(
    angle,
    (a) =>
      `conic-gradient(from ${a}deg, transparent 0deg, transparent 250deg, ${soft} 310deg, ${head} 360deg)`,
  );

  const ringMask: React.CSSProperties = {
    padding: beamWidth,
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
  };

  return (
    <div
      {...props}
      className={cn("relative rounded-[var(--lm-radius-lg)]", className)}
    >
      {children}
      {reduceMotion ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            ...ringMask,
            background: `linear-gradient(135deg, ${head}, ${soft})`,
          }}
        />
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ ...ringMask, background: beam }}
        />
      )}
    </div>
  );
}
