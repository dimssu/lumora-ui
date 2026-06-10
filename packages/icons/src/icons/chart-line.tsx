"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Line chart. The trend line draws itself left to right and the end dot
 * pops in at the peak — the latest reading landing on the chart.
 */
export const ChartLineIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4.5 4.5v13.25a1.75 1.75 0 0 0 1.75 1.75H19.5" />
      <motion.path
        d="M7.5 14.75l3.4-3.6 2.6 2.35 4.25-5"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.3, ease: eases.out },
          },
        }}
      />
      <motion.circle
        cx="17.75"
        cy="8.5"
        r="1.3"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [0, 0, 1.25, 1],
            transition: {
              duration: 0.42,
              ease: eases.out,
              times: [0, 0.62, 0.85, 1],
            },
          },
        }}
      />
    </IconBase>
  ),
);
ChartLineIcon.displayName = "ChartLineIcon";
