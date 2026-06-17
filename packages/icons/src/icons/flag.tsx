"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Flag. The pole stays planted while the cloth ripples on a passing breeze —
 * a marker raised and catching wind.
 */
export const FlagIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M6 20.5V4" />
      <motion.path
        d="M6 5h11.5a0.5 0.5 0 0 1 .4.8l-2.4 3.2 2.4 3.2a0.5 0.5 0 0 1-.4.8H6"
        style={{ originX: "6px", originY: "8.5px" }}
        variants={{
          idle: { skewX: 0, scaleX: 1, transition: { duration: durations.fast } },
          active: {
            skewX: [0, -6, 4, 0],
            scaleX: [1, 0.97, 1.01, 1],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      />
    </IconBase>
  ),
);
FlagIcon.displayName = "FlagIcon";
