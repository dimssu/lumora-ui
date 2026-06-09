"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Trash. The lid lifts and tips back on its left hinge, then settles shut —
 * a small warning of what confirming will do.
 */
export const TrashIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: 0, originY: 1 }}
        variants={{
          idle: { y: 0, rotate: 0, transition: springs.snap },
          active: {
            y: [0, -2.2, 0],
            rotate: [0, -9, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      >
        <path d="M4.5 7h15" />
        <path d="M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" />
      </motion.g>
      <path d="M6.5 7l.75 11.4a2 2 0 0 0 2 1.85h5.5a2 2 0 0 0 2-1.85L17.5 7" />
      <path d="M10.25 10.75v6" />
      <path d="M13.75 10.75v6" />
    </IconBase>
  ),
);
TrashIcon.displayName = "TrashIcon";
