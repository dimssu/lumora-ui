"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Wallet. The top flap hinges open a crack from its left fold and closes
 * again — just enough to check what's inside.
 */
export const WalletIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M3.5 9.5V7.75A1.75 1.75 0 0 1 5.25 6h11a1.75 1.75 0 0 1 1.75 1.75V9.5"
        style={{ originX: 0, originY: 1 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: {
            rotate: [0, -6, 0],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      />
      <path d="M3.5 9.5h15.25a1.75 1.75 0 0 1 1.75 1.75v6.5a1.75 1.75 0 0 1-1.75 1.75H5.25a1.75 1.75 0 0 1-1.75-1.75z" />
      <path d="M16.5 14.5h.01" />
    </IconBase>
  ),
);
WalletIcon.displayName = "WalletIcon";
