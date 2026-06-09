"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Right arrow. On activation the shaft redraws toward the tip while the
 * head nudges forward and settles home — a gesture of "go".
 */
export const ArrowRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M4.5 12H19"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0.3, 1],
            transition: { duration: 0.4, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M13.5 6.5L19 12l-5.5 5.5"
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: {
            x: [0, 2, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
ArrowRightIcon.displayName = "ArrowRightIcon";
