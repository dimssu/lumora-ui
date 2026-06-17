"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Info. The ring draws around and the dot of the "i" taps down to greet
 * you — a note politely raising its hand.
 */
export const InfoIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.circle
        cx="12"
        cy="12"
        r="8.5"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: { pathLength: [0, 1], transition: { duration: durations.max, ease: eases.out } },
        }}
      />
      <path d="M12 11v5" />
      <motion.circle
        cx="12"
        cy="7.75"
        r="0.65"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: { y: [0, 1.4, 0], transition: { duration: durations.base, ease: eases.out, delay: 0.18 } },
        }}
      />
    </IconBase>
  ),
);
InfoIcon.displayName = "InfoIcon";
