"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "../lib/cn";
import { springs } from "../lib/motion";

export interface MagneticZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Distance (px) from the zone's center at which the pull engages. @default 120 */
  radius?: number;
  /** Pull intensity from 0–1; the child travels this fraction of the cursor offset. @default 0.35 */
  strength?: number;
}

/**
 * Wrap anything to make it magnetic: while the cursor is within `radius` px
 * of the zone's center the child leans toward it, then snaps back home on
 * leave. With reduced motion the pull is disabled entirely.
 */
export function MagneticZone({
  radius = 120,
  strength = 0.35,
  className,
  children,
  ...props
}: MagneticZoneProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { stiffness, damping, mass } = springs.snap;
  const springX = useSpring(x, { stiffness, damping, mass });
  const springY = useSpring(y, { stiffness, damping, mass });

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const release = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn("inline-block", className)}
      {...props}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      <motion.div className="inline-block" style={{ x: springX, y: springY }}>
        {children}
      </motion.div>
    </div>
  );
}
