"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Edit. The pencil lifts a hair off the page and the underline beneath the
 * nib draws itself in — the stroke being written, not stamped.
 */
export const EditIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: 1, originY: 0 }}
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: {
            x: [0, 1, 0],
            y: [0, -1, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      >
        <path d="M14.75 5.5l3.75 3.75" />
        <path d="M16.4 3.85a1.6 1.6 0 0 1 2.25 0L20.15 5.35a1.6 1.6 0 0 1 0 2.25L9.5 18.25 5 19.5l1.25-4.5z" />
      </motion.g>
      <motion.path
        d="M5.5 20.5h9"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.32, ease: eases.out, delay: 0.05 },
          },
        }}
      />
    </IconBase>
  ),
);
EditIcon.displayName = "EditIcon";
