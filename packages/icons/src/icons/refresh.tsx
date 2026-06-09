"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Refresh. The circular arrow performs a single full 360° spin and lands
 * exactly where it started, so repeat triggers always read as one clean turn.
 */
export const RefreshIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { rotate: 0, transition: { duration: durations.fast } },
          active: {
            rotate: 360,
            transition: { duration: durations.max, ease: eases.inOut },
            transitionEnd: { rotate: 0 },
          },
        }}
      >
        <path d="M20 12a8 8 0 1 1-8-8c2.2 0 4.3.9 5.9 2.4L20 8" />
        <path d="M20 3.5V8h-4.5" />
      </motion.g>
    </IconBase>
  ),
);
RefreshIcon.displayName = "RefreshIcon";
