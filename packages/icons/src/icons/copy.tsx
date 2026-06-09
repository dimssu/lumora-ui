"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Copy. The back sheet slides up-and-left out from under the front sheet,
 * then glides home — the duplicate peeling away and returning.
 */
export const CopyIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M5.5 15H5a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 5 4h8a1.5 1.5 0 0 1 1.5 1.5V6"
        variants={{
          idle: { x: 0, y: 0, transition: springs.snap },
          active: {
            x: [0, -1.8, 0],
            y: [0, -1.8, 0],
            transition: { duration: durations.max, ease: eases.out },
          },
        }}
      />
      <rect x="9" y="9" width="11.5" height="11.5" rx="2" />
    </IconBase>
  ),
);
CopyIcon.displayName = "CopyIcon";
