"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, type IconProps } from "../lib/icon";

/** Wheels drawn as near-closed arcs so their spin is visible. */
const WHEELS: ReadonlyArray<{ cx: number; cy: number }> = [
  { cx: 9.5, cy: 19.25 },
  { cx: 16.5, cy: 19.25 },
];

/**
 * Cart. The whole cart rolls forward 2px and back while the wheels —
 * arcs with a tiny gap — spin a quarter turn, casters and all.
 */
export const CartIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { x: 0, transition: { duration: 0.2, ease: eases.out } },
          active: {
            x: [0, 2, 0],
            transition: { duration: 0.4, ease: eases.inOut },
          },
        }}
      >
        <path d="M3.25 4.5h2.1l2.2 9.9a1.6 1.6 0 0 0 1.56 1.25h7.06a1.6 1.6 0 0 0 1.55-1.2L19.5 8h-13" />
        {WHEELS.map((wheel) => (
          <motion.path
            key={wheel.cx}
            d={`M${wheel.cx + 1.35} ${wheel.cy}a1.35 1.35 0 1 1-.4-.95`}
            style={{ originX: 0.5, originY: 0.5 }}
            variants={{
              idle: { rotate: 0, transition: { duration: 0.2, ease: eases.out } },
              active: {
                rotate: [0, 90, 0],
                transition: { duration: 0.4, ease: eases.inOut },
              },
            }}
          />
        ))}
      </motion.g>
    </IconBase>
  ),
);
CartIcon.displayName = "CartIcon";
