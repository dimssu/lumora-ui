"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, durations, type IconProps } from "../lib/icon";

/**
 * Zap. The bolt dims for a frame and discharges with a pop — a
 * capacitor letting go.
 */
export const ZapIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M13.2 3.5L5.5 13.5h5.1l-1 7L19 10.2h-5.3z"
        style={{ originX: 0.5, originY: 0.5 }}
        variants={{
          idle: { opacity: 1, scale: 1 },
          active: {
            opacity: [1, 0.35, 1],
            scale: [1, 1, 1.12, 1],
            transition: {
              duration: durations.base,
              ease: eases.emphasized,
              times: [0, 0.3, 0.6, 1],
            },
          },
        }}
      />
    </IconBase>
  ),
);
ZapIcon.displayName = "ZapIcon";
