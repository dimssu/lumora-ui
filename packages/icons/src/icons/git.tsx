"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Git — the rotated-square logo with the three-node branch. Monochrome. */
export const GitIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <path
          fill="currentColor"
          stroke="none"
          d="M22.44 11.06 12.94 1.56a1.56 1.56 0 0 0-2.2 0L8.76 3.54l2.5 2.5a1.86 1.86 0 0 1 2.36 2.37l2.41 2.41a1.86 1.86 0 1 1-1.12 1.05l-2.25-2.25v5.92a1.86 1.86 0 1 1-1.53-.05V9.51a1.86 1.86 0 0 1-1.01-2.44L7.66 4.64l-6.1 6.1a1.56 1.56 0 0 0 0 2.2l9.5 9.5a1.56 1.56 0 0 0 2.2 0l9.18-9.18a1.56 1.56 0 0 0 0-2.2Z"
        />
      </motion.g>
    </IconBase>
  ),
);
GitIcon.displayName = "GitIcon";
