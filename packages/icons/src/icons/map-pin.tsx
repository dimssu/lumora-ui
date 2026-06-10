"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Map pin. The pin lifts, drops back onto its spot, and lands with a
 * tiny squash — pinned with intent.
 */
export const MapPinIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        variants={{
          idle: { y: 0, scaleY: 1 },
          active: {
            y: [0, -2.5, 0, 0],
            scaleY: [1, 1, 0.92, 1],
            transition: {
              duration: durations.max,
              ease: eases.out,
              times: [0, 0.35, 0.7, 1],
            },
          },
        }}
      >
        <path d="M12 21s-6.5-5.1-6.5-10a6.5 6.5 0 0 1 13 0c0 4.9-6.5 10-6.5 10z" />
        <circle cx="12" cy="10.75" r="2.25" />
      </motion.g>
    </IconBase>
  ),
);
MapPinIcon.displayName = "MapPinIcon";
