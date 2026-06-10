"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Globe. The meridian redraws around the sphere and the equator
 * sweeps after it — one quick spin of the world.
 */
export const GlobeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <motion.ellipse
        cx="12"
        cy="12"
        rx="3.8"
        ry="8.5"
        variants={{
          idle: { pathLength: 1 },
          active: {
            pathLength: [0, 1],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M3.5 12h17"
        variants={{
          idle: { pathLength: 1 },
          active: {
            pathLength: [0, 1],
            transition: { duration: durations.base, ease: eases.out, delay: 0.1 },
          },
        }}
      />
    </IconBase>
  ),
);
GlobeIcon.displayName = "GlobeIcon";
