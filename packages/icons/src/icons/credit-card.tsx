"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

/**
 * Credit card. The magnetic stripe retracts and redraws left to right —
 * a shimmer sweeping across the card as it's read.
 */
export const CreditCardIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <motion.path
        d="M3 9.75h18"
        variants={{
          idle: { pathLength: 1, transition: { duration: durations.fast } },
          active: {
            pathLength: [1, 0, 1],
            transition: {
              duration: 0.42,
              ease: eases.inOut,
              times: [0, 0.45, 1],
            },
          },
        }}
      />
      <path d="M6.5 14.75h4" />
    </IconBase>
  ),
);
CreditCardIcon.displayName = "CreditCardIcon";
