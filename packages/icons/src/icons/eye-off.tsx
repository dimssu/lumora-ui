"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Eye off. The eye sits open and the cancelling slash draws itself across
 * from corner to corner — visibility struck through.
 */
export const EyeOffIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M2.75 12S6 5.5 12 5.5a9.5 9.5 0 0 1 4.4 1.05" />
      <path d="M19.6 8.1A18 18 0 0 1 21.25 12S18 18.5 12 18.5a9.7 9.7 0 0 1-3.1-.5" />
      <path d="M9.7 9.7a3.25 3.25 0 0 0 4.6 4.6" />
      <motion.path
        d="M4.5 4.5L19.5 19.5"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.34, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
EyeOffIcon.displayName = "EyeOffIcon";
