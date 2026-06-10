"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Shield. The shield swells with a confident pulse, then the check
 * draws in heel-to-tip — protection, then proof.
 */
export const ShieldIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M12 3.5l7 2.6v5.3c0 4.6-3 7.7-7 9.1-4-1.4-7-4.5-7-9.1V6.1z"
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          idle: { scale: 1 },
          active: {
            scale: [1, 1.07, 1],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M9.1 11.9l2.1 2.1 3.7-4.2"
        variants={{
          idle: { pathLength: 1 },
          active: {
            pathLength: [0, 1],
            transition: { duration: durations.base, ease: eases.out, delay: 0.12 },
          },
        }}
      />
    </IconBase>
  ),
);
ShieldIcon.displayName = "ShieldIcon";
