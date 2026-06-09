"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/** Each ray's path plus its outward unit direction for the burst. */
const RAYS: ReadonlyArray<{ d: string; ux: number; uy: number }> = [
  { d: "M12 5.5V3.25", ux: 0, uy: -1 },
  { d: "M16.6 7.4l1.59-1.59", ux: 0.71, uy: -0.71 },
  { d: "M18.5 12h2.25", ux: 1, uy: 0 },
  { d: "M16.6 16.6l1.59 1.59", ux: 0.71, uy: 0.71 },
  { d: "M12 18.5v2.25", ux: 0, uy: 1 },
  { d: "M7.4 16.6l-1.59 1.59", ux: -0.71, uy: 0.71 },
  { d: "M5.5 12H3.25", ux: -1, uy: 0 },
  { d: "M7.4 7.4L5.81 5.81", ux: -0.71, uy: -0.71 },
];

/**
 * Sun. The eight rays burst outward in a clockwise stagger and fall back —
 * a brief flare of daylight around the still core.
 */
export const SunIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="4" />
      {RAYS.map((ray, i) => (
        <motion.path
          key={ray.d}
          d={ray.d}
          variants={{
            idle: { x: 0, y: 0, transition: springs.snap },
            active: {
              x: [0, ray.ux * 1.4, 0],
              y: [0, ray.uy * 1.4, 0],
              transition: { duration: 0.36, ease: eases.out, delay: i * 0.012 },
            },
          }}
        />
      ))}
    </IconBase>
  ),
);
SunIcon.displayName = "SunIcon";
