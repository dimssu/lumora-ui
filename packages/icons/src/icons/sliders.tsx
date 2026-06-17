"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/**
 * Sliders. The two handles glide along their tracks to fresh positions and
 * settle — controls being dialed in.
 */
export const SlidersIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4.5 8h15" />
      <path d="M4.5 16h15" />
      <motion.circle
        cx="9"
        cy="8"
        r="2.5"
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: { x: 5, transition: springs.drift },
        }}
      />
      <motion.circle
        cx="15"
        cy="16"
        r="2.5"
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: { x: -5, transition: springs.drift },
        }}
      />
    </IconBase>
  ),
);
SlidersIcon.displayName = "SlidersIcon";
