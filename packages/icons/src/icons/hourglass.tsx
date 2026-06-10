"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/**
 * Hourglass. Flips a full half turn with spring physics — time turned
 * over to run again — and flips back upright on release.
 */
export const HourglassIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: { rotate: 180, transition: springs.snap },
        }}
      >
        <path d="M7 3.75h10" />
        <path d="M7 20.25h10" />
        <path d="M8.25 3.75v2.6a3.75 3.75 0 0 0 1.5 3L12 11.1l2.25-1.75a3.75 3.75 0 0 0 1.5-3v-2.6" />
        <path d="M8.25 20.25v-2.6a3.75 3.75 0 0 1 1.5-3L12 12.9l2.25 1.75a3.75 3.75 0 0 1 1.5 3v2.6" />
      </motion.g>
    </IconBase>
  ),
);
HourglassIcon.displayName = "HourglassIcon";
