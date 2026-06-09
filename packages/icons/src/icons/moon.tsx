"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Moon. The crescent rocks gently about its center and drifts back to
 * stillness — a slow nod toward night.
 */
export const MoonIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M11.8 3.25a7 7 0 0 0 8.95 8.95A8.25 8.25 0 1 1 11.8 3.25Z"
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: {
            rotate: [0, -10, 7, 0],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      />
    </IconBase>
  ),
);
MoonIcon.displayName = "MoonIcon";
