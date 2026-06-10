"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Pie chart. The top-right slice nudges out of the pie and slots back
 * in — presenting its share, then rejoining the whole.
 */
export const ChartPieIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M19.75 12.75A8 8 0 1 1 11.25 4.25" />
      <motion.path
        d="M13.25 10.75V3.3a8 8 0 0 1 7.45 7.45z"
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: {
            x: [0, 1.3, 0],
            y: [0, -1.3, 0],
            transition: { duration: 0.36, ease: eases.inOut },
          },
        }}
      />
    </IconBase>
  ),
);
ChartPieIcon.displayName = "ChartPieIcon";
