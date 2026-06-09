"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Search. The lens tips on its handle joint while the handle extends a
 * touch outward — the glass leaning in for a closer look.
 */
export const SearchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: 1, originY: 1 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: {
            rotate: [0, -10, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      >
        <circle cx="11" cy="11" r="6.5" />
      </motion.g>
      <motion.path
        d="M15.8 15.8L20.5 20.5"
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: {
            x: [0, 1.2, 0],
            y: [0, 1.2, 0],
            transition: { duration: durations.max, ease: eases.out, delay: 0.05 },
          },
        }}
      />
    </IconBase>
  ),
);
SearchIcon.displayName = "SearchIcon";
