"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, type IconProps } from "../lib/icon";

const FLAP_TIMES = [0, 0.3, 0.7, 1];

/**
 * Mail. The closed flap crossfades into an opened flap (peaked above the
 * fold) and back — the envelope breathing open to show there's something
 * inside.
 */
export const MailIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      {/* Closed flap */}
      <motion.path
        d="M3.5 7.5L12 13.5l8.5-6"
        variants={{
          idle: { opacity: 1, transition: { duration: durations.fast } },
          active: {
            opacity: [1, 0, 0, 1],
            transition: { duration: durations.max, ease: eases.inOut, times: FLAP_TIMES },
          },
        }}
      />
      {/* Open flap */}
      <motion.path
        d="M4 10.5L12 4.5l8 6"
        variants={{
          idle: { opacity: 0, transition: { duration: durations.fast } },
          active: {
            opacity: [0, 1, 1, 0],
            transition: { duration: durations.max, ease: eases.inOut, times: FLAP_TIMES },
          },
        }}
      />
    </IconBase>
  ),
);
MailIcon.displayName = "MailIcon";
