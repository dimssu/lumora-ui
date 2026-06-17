"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Log out. The doorframe stays while the arrow strides out through the
 * threshold and returns — stepping cleanly out.
 */
export const LogOutIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M14.5 4.5H6.75A1.75 1.75 0 0 0 5 6.25v11.5A1.75 1.75 0 0 0 6.75 19.5H14.5" />
      <motion.g
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: { x: [0, 2.4, 0], transition: { duration: durations.max, ease: eases.out } },
        }}
      >
        <path d="M11 12h9.5" />
        <path d="M17 8.5l3.5 3.5-3.5 3.5" />
      </motion.g>
    </IconBase>
  ),
);
LogOutIcon.displayName = "LogOutIcon";
