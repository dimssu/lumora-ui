"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Bell. Swings from its top pivot with damped decay — each pass smaller
 * than the last until it hangs still again.
 */
export const BellIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: 0.5, originY: 0 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: {
            rotate: [0, 13, -9, 5, -2, 0],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      >
        <path d="M6.25 9.5a5.75 5.75 0 0 1 11.5 0c0 4.4 1.7 5.9 2.45 6.65H3.8c.75-.75 2.45-2.25 2.45-6.65" />
        <path d="M10.5 19.25a1.5 1.5 0 0 0 3 0" />
      </motion.g>
    </IconBase>
  ),
);
BellIcon.displayName = "BellIcon";
