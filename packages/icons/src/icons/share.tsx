"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Share. The connecting lines hold while the two destination nodes pulse
 * outward in turn — content fanning out to where it's headed.
 */
export const ShareIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M8.5 13.5l7-3.75" />
      <path d="M8.5 10.5l7 3.75" />
      <circle cx="6" cy="12" r="2.5" />
      <motion.circle
        cx="17.5"
        cy="6.5"
        r="2.5"
        style={{ originX: "17.5px", originY: "6.5px" }}
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [1, 1.28, 1],
            transition: { duration: durations.base, ease: eases.out },
          },
        }}
      />
      <motion.circle
        cx="17.5"
        cy="17.5"
        r="2.5"
        style={{ originX: "17.5px", originY: "17.5px" }}
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [1, 1.28, 1],
            transition: { duration: durations.base, ease: eases.out, delay: 0.08 },
          },
        }}
      />
    </IconBase>
  ),
);
ShareIcon.displayName = "ShareIcon";
