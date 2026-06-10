"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Compass. The needle swings toward a new heading, overshoots, and
 * settles — the way a real needle hunts before it commits.
 */
export const CompassIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <motion.path
        d="M14.8 9.2l-1.7 4.6-4.6 1.7 1.7-4.6z"
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          idle: { rotate: 0 },
          active: {
            rotate: [0, 48, 26, 35],
            transition: {
              duration: durations.max,
              ease: eases.emphasized,
              times: [0, 0.45, 0.75, 1],
            },
          },
        }}
      />
    </IconBase>
  ),
);
CompassIcon.displayName = "CompassIcon";
