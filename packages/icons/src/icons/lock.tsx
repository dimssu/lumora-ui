"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Lock. The shackle lifts free, then seats back into the body with a tiny
 * overshoot — the click of something made secure.
 */
export const LockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M8.25 11V7.75a3.75 3.75 0 0 1 7.5 0V11"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, -2.2, 0.4, 0],
            transition: {
              duration: durations.max,
              ease: eases.inOut,
              times: [0, 0.4, 0.75, 1],
            },
          },
        }}
      />
      <rect x="4.75" y="11" width="14.5" height="9.25" rx="2" />
      <path d="M12 14.5v2.25" />
    </IconBase>
  ),
);
LockIcon.displayName = "LockIcon";
