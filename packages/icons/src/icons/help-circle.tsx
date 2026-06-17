"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Help circle. The question mark holds while its dot bounces once beneath
 * it — a query waiting for an answer.
 */
export const HelpCircleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.45-1.55C15 9.3 13.5 10 12.6 11a2 2 0 0 0-.6 1.5v.5" />
      <motion.circle
        cx="12"
        cy="16.25"
        r="0.65"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, -2.2, 0],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
HelpCircleIcon.displayName = "HelpCircleIcon";
