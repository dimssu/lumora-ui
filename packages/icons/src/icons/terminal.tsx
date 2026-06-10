"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Terminal. The prompt chevron nudges forward and the cursor line
 * blinks twice — a shell waiting on your next idea.
 */
export const TerminalIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <motion.path
        d="M7.5 9.5l3 2.5-3 2.5"
        variants={{
          idle: { x: 0 },
          active: {
            x: [0, 1.4, 0],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M13.5 15h3.5"
        variants={{
          idle: { opacity: 1 },
          active: {
            opacity: [1, 0, 1, 0, 1],
            transition: { duration: durations.max, times: [0, 0.25, 0.5, 0.75, 1] },
          },
        }}
      />
    </IconBase>
  ),
);
TerminalIcon.displayName = "TerminalIcon";
