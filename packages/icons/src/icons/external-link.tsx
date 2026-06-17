"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * External link. The frame stays put while the arrow darts up and to the
 * right and snaps back — content leaving for somewhere new.
 */
export const ExternalLinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <path d="M13 5.5H6.5A1.75 1.75 0 0 0 4.75 7.25v10A1.75 1.75 0 0 0 6.5 19h10a1.75 1.75 0 0 0 1.75-1.75V11" />
      <motion.g
        style={{ originX: "14px", originY: "10px" }}
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: {
            x: [0, 2, 0],
            y: [0, -2, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      >
        <path d="M14 4.5h5.5V10" />
        <path d="M19.5 4.5L11.5 12.5" />
      </motion.g>
    </IconBase>
  ),
);
ExternalLinkIcon.displayName = "ExternalLinkIcon";
