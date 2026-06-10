"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Camera. The lens ring contracts, overshoots a hair, and locks in —
 * autofocus hunting and finding its subject.
 */
export const CameraIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M4.75 7.5h2.55l1.45-2.25h6.5L16.7 7.5h2.55A1.75 1.75 0 0 1 21 9.25v8.5a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 17.75v-8.5A1.75 1.75 0 0 1 4.75 7.5z" />
      <motion.circle
        cx="12"
        cy="13.25"
        r="3.25"
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [1, 0.76, 1.07, 1],
            transition: {
              duration: durations.max,
              ease: eases.inOut,
              times: [0, 0.4, 0.75, 1],
            },
          },
        }}
      />
    </IconBase>
  ),
);
CameraIcon.displayName = "CameraIcon";
