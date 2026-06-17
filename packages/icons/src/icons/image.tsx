"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Image. The frame and ridgeline hold while the sun rises into the corner —
 * a picture coming to light.
 */
export const ImageIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3.75" y="4.75" width="16.5" height="14.5" rx="2" />
      <path d="M4.25 16.5l4.25-4.25 3.5 3.5 3-3 4.75 4.75" />
      <motion.circle
        cx="9"
        cy="9.25"
        r="1.4"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [2.5, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      />
    </IconBase>
  ),
);
ImageIcon.displayName = "ImageIcon";
