"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/** The three dot centers, left to right. */
const DOTS = [6, 12, 18] as const;

/**
 * More. The three dots hop up in a quick left-to-right ripple and settle —
 * a row of options announcing itself.
 */
export const MoreHorizontalIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      {DOTS.map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="12"
          r="1.4"
          fill="currentColor"
          stroke="none"
          variants={{
            idle: { y: 0, transition: springs.snap },
            active: {
              y: [0, -3, 0],
              transition: { duration: 0.32, ease: eases.out, delay: i * 0.07 },
            },
          }}
        />
      ))}
    </IconBase>
  ),
);
MoreHorizontalIcon.displayName = "MoreHorizontalIcon";
