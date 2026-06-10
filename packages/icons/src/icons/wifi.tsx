"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Wifi. The dot pings first, then each arc draws outward in turn —
 * signal radiating from the source.
 */
export const WifiIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M12 18.9v.1"
        variants={{
          idle: { scale: 1, opacity: 1 },
          active: {
            scale: [1, 1.6, 1],
            opacity: [1, 0.5, 1],
            transition: { duration: durations.fast, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M8.2 15.4a5.4 5.4 0 0 1 7.6 0"
        variants={{
          idle: { pathLength: 1 },
          active: {
            pathLength: [0, 1],
            transition: { duration: durations.fast, ease: eases.out, delay: 0.1 },
          },
        }}
      />
      <motion.path
        d="M5.2 12.2a9.6 9.6 0 0 1 13.6 0"
        variants={{
          idle: { pathLength: 1 },
          active: {
            pathLength: [0, 1],
            transition: { duration: durations.fast, ease: eases.out, delay: 0.2 },
          },
        }}
      />
    </IconBase>
  ),
);
WifiIcon.displayName = "WifiIcon";
