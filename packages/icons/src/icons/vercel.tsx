"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Vercel — the upward equilateral triangle. Filled, monochrome. */
export const VercelIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        d="M12 3 22.5 21H1.5L12 3Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
VercelIcon.displayName = "VercelIcon";
