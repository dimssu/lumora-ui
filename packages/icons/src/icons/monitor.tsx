"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Monitor. Two content lines type themselves across the screen in
 * sequence — the display waking up with something to show.
 */
export const MonitorIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <path d="M12 17v3.25M8.5 20.25h7" />
      <motion.path
        d="M6.75 8.75h6.5"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.24, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M6.75 12.25h4"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.2, ease: eases.out, delay: 0.16 },
          },
        }}
      />
    </IconBase>
  ),
);
MonitorIcon.displayName = "MonitorIcon";
