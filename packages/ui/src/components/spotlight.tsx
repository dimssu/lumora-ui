"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight diameter in px. @default 480 */
  size?: number;
}

/**
 * Full-section pointer spotlight: a soft circle of lumen trails the cursor
 * on a spring, fading in on entry and out on exit, like a hand-held light
 * passing over the content. Under reduced motion the light snaps to the
 * pointer with no spring lag.
 */
export function Spotlight({
  size = 480,
  className,
  children,
  ...props
}: SpotlightProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springs.drift);
  const springY = useSpring(y, springs.drift);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
      {...props}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          x: reduceMotion ? x : springX,
          y: reduceMotion ? y : springY,
          background:
            "radial-gradient(circle closest-side, var(--lm-glow), transparent 70%)",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: durations.base, ease: eases.out }}
      />
    </div>
  );
}
