"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Apple — the bitten-apple mark with leaf. Filled, monochrome. */
export const AppleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        d="M16.36 12.71c-.02-2.36 1.93-3.49 2.02-3.55-1.1-1.61-2.81-1.83-3.42-1.85-1.46-.15-2.84.85-3.58.85-.74 0-1.88-.83-3.09-.81-1.59.02-3.05.92-3.87 2.34-1.65 2.86-.42 7.1 1.19 9.42.78 1.13 1.71 2.4 2.94 2.36 1.18-.05 1.62-.76 3.05-.76 1.42 0 1.83.76 3.08.74 1.27-.02 2.08-1.16 2.86-2.3.9-1.32 1.27-2.6 1.29-2.66-.03-.01-2.47-.95-2.49-3.77ZM14.01 5.77c.65-.79 1.09-1.89.97-2.99-.94.04-2.08.63-2.75 1.42-.6.69-1.13 1.81-.99 2.88 1.05.08 2.12-.53 2.77-1.31Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
AppleIcon.displayName = "AppleIcon";
