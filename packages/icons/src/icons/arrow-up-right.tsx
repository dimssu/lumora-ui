"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Diagonal "open elsewhere" arrow. The glyph nudges up and to the right
 * while a faint trail of the diagonal fades in behind it, then everything
 * settles back on the grid.
 */
export const ArrowUpRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      {/* Trail left behind by the departing arrow. */}
      <motion.path
        d="M6.5 17.5L17.5 6.5"
        variants={{
          idle: { opacity: 0, transition: { duration: durations.fast } },
          active: {
            opacity: [0, 0.3, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      />
      <motion.g
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: {
            x: [0, 2, 0],
            y: [0, -2, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      >
        <path d="M6.5 17.5L17.5 6.5" />
        <path d="M8 6.5h9.5V16" />
      </motion.g>
    </IconBase>
  ),
);
ArrowUpRightIcon.displayName = "ArrowUpRightIcon";
