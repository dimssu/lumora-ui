"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Bookmark. The ribbon dips as if pressed into the page, and a fold
 * line draws across it — saved, deliberately.
 */
export const BookmarkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M7 4.5h10a1 1 0 0 1 1 1v15l-6-3.9-6 3.9v-15a1 1 0 0 1 1-1z"
        style={{ originX: 0.5, originY: 0 }}
        variants={{
          idle: { y: 0, scaleY: 1 },
          active: {
            y: [0, 1.4, 0],
            scaleY: [1, 0.96, 1],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M9.5 9h5"
        variants={{
          idle: { pathLength: 1, opacity: 1 },
          active: {
            pathLength: [0, 1],
            opacity: [0, 1],
            transition: { duration: durations.base, ease: eases.out, delay: 0.1 },
          },
        }}
      />
    </IconBase>
  ),
);
BookmarkIcon.displayName = "BookmarkIcon";
