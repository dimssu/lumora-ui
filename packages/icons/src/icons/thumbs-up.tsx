"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Thumbs up. The whole hand pops up and tilts with a small overshoot —
 * an enthusiastic, springy approval.
 */
export const ThumbsUpIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: "8px", originY: "20px" }}
        variants={{
          idle: { y: 0, rotate: 0, transition: springs.snap },
          active: {
            y: [0, -1.6, 0],
            rotate: [0, -8, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      >
        <path d="M7.5 10.5l3.25-6a2 2 0 0 1 2 2v3.5h4.85a2 2 0 0 1 1.97 2.35l-1.1 6A2 2 0 0 1 18.5 20h-11z" />
        <path d="M7.5 10.5H5a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h2.5z" />
      </motion.g>
    </IconBase>
  ),
);
ThumbsUpIcon.displayName = "ThumbsUpIcon";
