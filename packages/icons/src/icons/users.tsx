"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Users. The front figure holds while the companion behind fades and rises
 * into frame — a group coming together.
 */
export const UsersIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="9.25" cy="8.5" r="3.5" />
      <path d="M3.5 19.5a5.75 5.75 0 0 1 11.5 0" />
      <motion.g
        variants={{
          idle: { opacity: 1, y: 0, transition: { duration: durations.fast } },
          active: {
            opacity: [0, 1],
            y: [3, 0],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      >
        <path d="M15.5 5.4a3.5 3.5 0 0 1 0 6.2" />
        <path d="M17 14.1a5.75 5.75 0 0 1 3.5 5.4" />
      </motion.g>
    </IconBase>
  ),
);
UsersIcon.displayName = "UsersIcon";
