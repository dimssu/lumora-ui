"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Phone. The handset wiggles side to side in quick decaying swings —
 * an incoming call begging to be picked up.
 */
export const PhoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M20.5 16.6v2.3a1.85 1.85 0 0 1-2.02 1.85 18.3 18.3 0 0 1-7.98-2.84 18 18 0 0 1-5.54-5.54A18.3 18.3 0 0 1 2.12 4.35 1.85 1.85 0 0 1 3.96 2.33h2.3a1.85 1.85 0 0 1 1.85 1.59c.12.89.33 1.76.64 2.6a1.85 1.85 0 0 1-.42 1.95l-.97.97a14.8 14.8 0 0 0 5.54 5.54l.97-.97a1.85 1.85 0 0 1 1.95-.42c.84.31 1.71.52 2.6.64a1.85 1.85 0 0 1 1.58 1.87z"
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: {
            rotate: [0, -9, 8, -6, 4, 0],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      />
    </IconBase>
  ),
);
PhoneIcon.displayName = "PhoneIcon";
