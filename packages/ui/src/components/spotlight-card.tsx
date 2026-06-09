"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "../lib/cn";
import { durations, eases, springs } from "../lib/motion";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius (px) of the lumen spotlight. @default 260 */
  radius?: number;
}

/**
 * A surface card whose border lights up and a soft radial lumen glow trails
 * the cursor; the glow fades in on enter and out on leave. With reduced
 * motion the spotlight stops tracking and simply fades in at the center.
 */
export function SpotlightCard({
  radius = 260,
  className,
  children,
  ...props
}: SpotlightCardProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const { stiffness, damping, mass } = springs.snap;
  const x = useSpring(rawX, { stiffness, damping, mass });
  const y = useSpring(rawY, { stiffness, damping, mass });

  const glow = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, var(--lm-glow), transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(${radius * 0.75}px circle at ${x}px ${y}px, var(--lm-accent), transparent 70%)`;

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (reduceMotion) {
      rawX.jump(rect.width / 2);
      rawY.jump(rect.height / 2);
      return;
    }
    rawX.set(event.clientX - rect.left);
    rawY.set(event.clientY - rect.top);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--lm-radius-lg)]",
        "border border-[var(--lm-border)] bg-[var(--lm-surface)]",
        className,
      )}
      {...props}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerCancel={() => setHovered(false)}
    >
      {/* lumen wash that trails the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: durations.base, ease: [...eases.out] }}
        style={{ background: glow }}
      />
      {/* 1px border highlight, masked to the card's edge */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: durations.base, ease: [...eases.out] }}
        style={{
          background: borderGlow,
          padding: 1,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
