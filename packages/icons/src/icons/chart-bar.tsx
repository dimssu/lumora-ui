"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/** Bar x-positions and top y-coordinates, left to right. */
const BARS: ReadonlyArray<{ x: number; top: number }> = [
  { x: 8.75, top: 13 },
  { x: 12.75, top: 8.25 },
  { x: 16.75, top: 11 },
];

/**
 * Bar chart. Each bar collapses to the baseline and grows back up in a
 * quick left-to-right stagger — the data refreshing before your eyes.
 */
export const ChartBarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4.5 4.5v13.25a1.75 1.75 0 0 0 1.75 1.75H19.5" />
      {BARS.map((bar, i) => (
        <motion.path
          key={bar.x}
          d={`M${bar.x} 16.25V${bar.top}`}
          style={{ originX: 0.5, originY: 1 }}
          variants={{
            idle: { scaleY: 1, transition: springs.snap },
            active: {
              scaleY: [1, 0, 1],
              transition: {
                duration: 0.34,
                ease: eases.out,
                times: [0, 0.35, 1],
                delay: i * 0.05,
              },
            },
          }}
        />
      ))}
    </IconBase>
  ),
);
ChartBarIcon.displayName = "ChartBarIcon";
