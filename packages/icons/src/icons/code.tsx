"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, eases, durations, type IconProps } from "../lib/icon";

/**
 * Code. The brackets spread apart to make room while the slash
 * redraws between them — an expression taking shape.
 */
export const CodeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M8.5 7.5L4 12l4.5 4.5"
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: { x: -1.4, transition: springs.snap },
        }}
      />
      <motion.path
        d="M15.5 7.5L20 12l-4.5 4.5"
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: { x: 1.4, transition: springs.snap },
        }}
      />
      <motion.path
        d="M13.4 5.5l-2.8 13"
        variants={{
          idle: { pathLength: 1 },
          active: {
            pathLength: [0, 1],
            transition: { duration: durations.base, ease: eases.out, delay: 0.06 },
          },
        }}
      />
    </IconBase>
  ),
);
CodeIcon.displayName = "CodeIcon";
