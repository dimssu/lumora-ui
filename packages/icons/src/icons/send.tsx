"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Send. The paper plane tilts into the wind and darts toward its corner,
 * then coasts back to rest — the message is on its way.
 */
export const SendIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { x: 0, y: 0, rotate: 0, transition: springs.snap },
          active: {
            x: [0, 2.5, 0],
            y: [0, -2.5, 0],
            rotate: [0, -8, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      >
        <path d="M20.5 3.5L3.5 10l7 3.5 3.5 7 6.5-17Z" />
        <path d="M20.5 3.5L10.5 13.5" />
      </motion.g>
    </IconBase>
  ),
);
SendIcon.displayName = "SendIcon";
