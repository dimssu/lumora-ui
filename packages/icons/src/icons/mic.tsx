"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Mic. The pickup arc pulses outward from the capsule — sound radiating
 * from a live microphone — then relaxes back.
 */
export const MicIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="9.5" y="3.25" width="5" height="9" rx="2.5" />
      <motion.path
        d="M5.75 11.25a6.25 6.25 0 0 0 12.5 0"
        style={{ originX: 0.5, originY: 0 }}
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [1, 1.14, 1],
            transition: { duration: 0.36, ease: eases.out },
          },
        }}
      />
      <path d="M12 17.6v2.65" />
    </IconBase>
  ),
);
MicIcon.displayName = "MicIcon";
