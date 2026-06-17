"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Alert triangle. The frame draws around and the exclamation stroke gives a
 * single sharp shake — a warning catching your eye.
 */
export const AlertTriangleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M12 4.5l8.25 14a1 1 0 0 1-.87 1.5H4.62a1 1 0 0 1-.87-1.5z"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: { pathLength: [0, 1], transition: { duration: durations.max, ease: eases.out } },
        }}
      />
      <motion.g
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: {
            x: [0, -1.4, 1.4, -0.9, 0],
            transition: { duration: durations.base, ease: eases.inOut, delay: 0.16 },
          },
        }}
      >
        <path d="M12 9.5v4.25" />
        <circle cx="12" cy="16.75" r="0.65" fill="currentColor" stroke="none" />
      </motion.g>
    </IconBase>
  ),
);
AlertTriangleIcon.displayName = "AlertTriangleIcon";
