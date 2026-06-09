"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Disclosure chevron. Dips downward and softens (a slight vertical squash)
 * before springing back — an invitation to expand.
 */
export const ChevronDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M6 9.5l6 6 6-6"
        variants={{
          idle: { y: 0, scaleY: 1, transition: springs.snap },
          active: {
            y: [0, 2, 0],
            scaleY: [1, 0.8, 1],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
ChevronDownIcon.displayName = "ChevronDownIcon";
