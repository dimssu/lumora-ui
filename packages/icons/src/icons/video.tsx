"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Video. The camera body stays while the lens wedge nudges out and back —
 * a feed about to roll.
 */
export const VideoIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3" y="6.5" width="12" height="11" rx="2" />
      <motion.path
        d="M15 10.25l5.25-3a0.6 0.6 0 0 1 .9.52v8.46a0.6 0.6 0 0 1-.9.52L15 13.75z"
        variants={{
          idle: { x: 0, transition: springs.snap },
          active: {
            x: [0, 1.6, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
VideoIcon.displayName = "VideoIcon";
