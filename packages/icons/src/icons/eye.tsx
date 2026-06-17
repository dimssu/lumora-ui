"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Eye. The iris contracts as if a lid swept across, then dilates open —
 * a single, deliberate blink.
 */
export const EyeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M2.75 12S6 5.5 12 5.5 21.25 12 21.25 12 18 18.5 12 18.5 2.75 12 2.75 12z" />
      <motion.circle
        cx="12"
        cy="12"
        r="3.25"
        style={{ originX: "12px", originY: "12px" }}
        variants={{
          idle: { scaleY: 1, transition: springs.snap },
          active: {
            scaleY: [1, 0.1, 1],
            transition: { duration: durations.base, ease: eases.inOut, times: [0, 0.45, 1] },
          },
        }}
      />
    </IconBase>
  ),
);
EyeIcon.displayName = "EyeIcon";
