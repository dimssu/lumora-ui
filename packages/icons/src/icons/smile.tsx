"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Smile. The face holds while the grin draws itself across — the moment a
 * smile breaks.
 */
export const SmileIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9.25" cy="10" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="14.75" cy="10" r="0.65" fill="currentColor" stroke="none" />
      <motion.path
        d="M8.25 14a5 5 0 0 0 7.5 0"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: { pathLength: [0, 1], transition: { duration: durations.max, ease: eases.out } },
        }}
      />
    </IconBase>
  ),
);
SmileIcon.displayName = "SmileIcon";
