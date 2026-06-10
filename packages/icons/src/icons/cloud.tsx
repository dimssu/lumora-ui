"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Cloud. The whole cloud drifts up a breath, widens slightly, and
 * settles back — weather, not weight.
 */
export const CloudIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M7 18.5h9.3a4 4 0 0 0 .9-7.9 5.5 5.5 0 0 0-10.6-1A4.25 4.25 0 0 0 7 18.5z"
        style={{ originX: 0.5, originY: 1 }}
        variants={{
          idle: { y: 0, scaleX: 1 },
          active: {
            y: [0, -1.6, 0],
            scaleX: [1, 1.04, 1],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      />
    </IconBase>
  ),
);
CloudIcon.displayName = "CloudIcon";
