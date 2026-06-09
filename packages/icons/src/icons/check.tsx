"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Check. The tick draws itself in from heel to tip — confirmation that
 * feels written, not stamped.
 */
export const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.35, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
CheckIcon.displayName = "CheckIcon";
