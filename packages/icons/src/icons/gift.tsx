"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Gift. The lid pops up off the box and drops back on, the bow bouncing
 * a beat behind — almost unwrapped.
 */
export const GiftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M5 11.5h14v7a1.75 1.75 0 0 1-1.75 1.75H6.75A1.75 1.75 0 0 1 5 18.5z" />
      <path d="M12 11.5v8.75" />
      <motion.g
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, -2.4, 0.4, 0],
            transition: {
              duration: durations.max,
              ease: eases.inOut,
              times: [0, 0.4, 0.78, 1],
            },
          },
        }}
      >
        <rect x="3.75" y="8.25" width="16.5" height="3.25" rx="0.75" />
        <path d="M12 8.25v3.25" />
        <motion.path
          d="M12 8.25c-1.3-2.5-3.9-3.35-4.8-2-0.75 1.15.85 2 4.8 2zm0 0c1.3-2.5 3.9-3.35 4.8-2 .75 1.15-.85 2-4.8 2z"
          variants={{
            idle: { y: 0, transition: springs.snap },
            active: {
              y: [0, -0.9, 0.3, 0],
              transition: {
                duration: durations.max,
                ease: eases.inOut,
                times: [0, 0.45, 0.8, 1],
                delay: 0.04,
              },
            },
          }}
        />
      </motion.g>
    </IconBase>
  ),
);
GiftIcon.displayName = "GiftIcon";
