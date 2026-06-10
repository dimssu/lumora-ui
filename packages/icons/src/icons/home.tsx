"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Home. The roof pops with a quick breath while the door light
 * drops in from above and lands — somebody's in.
 */
export const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M3.5 10.5L12 4l8.5 6.5"
        style={{ originX: 0.5, originY: 1 }}
        variants={{
          idle: { scale: 1 },
          active: {
            scale: [1, 1.08, 1],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      />
      <path d="M5.5 12.5V19a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-6.5" />
      <motion.path
        d="M12 15.4v.2"
        variants={{
          idle: { y: 0, opacity: 1 },
          active: {
            y: [-3, 0],
            opacity: [0, 1],
            transition: { duration: durations.base, ease: eases.out, delay: 0.08 },
          },
        }}
      />
    </IconBase>
  ),
);
HomeIcon.displayName = "HomeIcon";
