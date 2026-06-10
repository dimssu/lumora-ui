"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Git branch. The branch line redraws from trunk to tip, then the
 * branch node pops — a feature forking off.
 */
export const GitBranchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="6.5" cy="5.5" r="1.9" />
      <circle cx="6.5" cy="18.5" r="1.9" />
      <path d="M6.5 7.4v9.2" />
      <motion.path
        d="M17.5 7.5c0 4.8-4.2 8.7-9 9"
        variants={{
          idle: { pathLength: 1 },
          active: {
            pathLength: [0, 1],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      />
      <motion.circle
        cx="17.5"
        cy="5.5"
        r="1.9"
        style={{ originX: "17.5px", originY: "5.5px" }}
        variants={{
          idle: { scale: 1 },
          active: {
            scale: [1, 1.3, 1],
            transition: { duration: durations.fast, ease: eases.out, delay: 0.22 },
          },
        }}
      />
    </IconBase>
  ),
);
GitBranchIcon.displayName = "GitBranchIcon";
