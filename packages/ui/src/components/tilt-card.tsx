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

export interface TiltCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof motion.div>, "children"> {
  children?: React.ReactNode;
  /** Maximum tilt in degrees at the card's edges. @default 10 */
  maxTilt?: number;
  /** Render a soft lumen glare that tracks the pointer. @default false */
  glare?: boolean;
}

/**
 * A card that tilts in 3D toward the cursor and drifts flat again on leave.
 * `transformStyle: preserve-3d` is set, so children can pop with their own
 * `translateZ`. With reduced motion the tilt is disabled and the optional
 * glare falls back to a centered opacity fade.
 */
export function TiltCard({
  maxTilt = 10,
  glare = false,
  className,
  children,
  style,
  ...props
}: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const { stiffness, damping, mass } = springs.drift;
  const rotateX = useSpring(rotateXRaw, { stiffness, damping, mass });
  const rotateY = useSpring(rotateYRaw, { stiffness, damping, mass });

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, var(--lm-glow), transparent 65%)`;

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateYRaw.set((px - 0.5) * 2 * maxTilt);
    rotateXRaw.set(-(py - 0.5) * 2 * maxTilt);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const settle = () => {
    setHovered(false);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-[var(--lm-radius-lg)] border border-[var(--lm-border)]",
        "bg-[var(--lm-surface)] shadow-[var(--lm-shadow-sm)]",
        className,
      )}
      style={{
        ...style,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={settle}
      onPointerCancel={settle}
      {...props}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: durations.base, ease: [...eases.out] }}
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
