"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Heart. A double beat — two quick swells, the second softer — exactly
 * like the thing it stands for.
 */
export const HeartIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M19.3 5.7a4.6 4.6 0 0 0-6.5 0l-.8.8-.8-.8a4.6 4.6 0 0 0-6.5 6.5l.8.8 6.5 6.5 6.5-6.5.8-.8a4.6 4.6 0 0 0 0-6.5Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [1, 1.14, 1, 1.1, 1],
            transition: {
              duration: durations.max,
              ease: eases.inOut,
              times: [0, 0.25, 0.5, 0.7, 1],
            },
          },
        }}
      />
    </IconBase>
  ),
);
HeartIcon.displayName = "HeartIcon";
