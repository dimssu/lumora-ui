"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Play. The triangle nudges toward its point and swells slightly before
 * settling — pressure building behind the press.
 */
export const PlayIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M8 5.5v13L18.5 12 8 5.5Z"
        variants={{
          idle: { x: 0, scale: 1, transition: springs.snap },
          active: {
            x: [0, 1.5, 0],
            scale: [1, 1.1, 1],
            transition: { duration: 0.4, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
PlayIcon.displayName = "PlayIcon";
