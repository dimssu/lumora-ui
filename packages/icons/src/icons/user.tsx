"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * User. The head dips and the shoulders rise to meet it — a figure
 * settling into place.
 */
export const UserIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.circle
        cx="12"
        cy="8"
        r="3.75"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: { y: [0, 0.9, 0], transition: { duration: durations.base, ease: eases.out } },
        }}
      />
      <motion.path
        d="M5 19.5a7 7 0 0 1 14 0"
        style={{ originX: 0.5, originY: 1 }}
        variants={{
          idle: { scaleY: 1, transition: springs.snap },
          active: { scaleY: 1.12, transition: springs.drift },
        }}
      />
    </IconBase>
  ),
);
UserIcon.displayName = "UserIcon";
