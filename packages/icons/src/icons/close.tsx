"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Close. Both strokes redraw from their origins, crossing into the X with
 * a slight offset between them — a deliberate, legible cancel.
 */
export const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M6.5 6.5l11 11"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.28, ease: eases.out },
          },
        }}
      />
      <motion.path
        d="M17.5 6.5l-11 11"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [0, 1],
            transition: { duration: 0.28, ease: eases.out, delay: 0.09 },
          },
        }}
      />
    </IconBase>
  ),
);
CloseIcon.displayName = "CloseIcon";
