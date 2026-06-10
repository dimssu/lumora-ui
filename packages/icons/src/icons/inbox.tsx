"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Inbox. A dot blinks out, reappears above the tray, and drops into the
 * slot; the tray dips a touch as it catches — new mail has arrived.
 */
export const InboxIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M12 9.25h.01"
        variants={{
          idle: { y: 0, opacity: 1, transition: springs.snap },
          active: {
            y: [0, -4.5, -4.5, 0],
            opacity: [1, 0, 1, 1],
            transition: {
              duration: durations.max,
              ease: eases.inOut,
              times: [0, 0.3, 0.45, 1],
            },
          },
        }}
      />
      <motion.g
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, 0.8, 0],
            transition: { duration: 0.18, ease: eases.out, delay: 0.4 },
          },
        }}
      >
        <path d="M3.5 13h4.65l1.6 2.5h4.5l1.6-2.5h4.65" />
        <path d="M6.6 5.6A1.75 1.75 0 0 1 8.25 4.5h7.5a1.75 1.75 0 0 1 1.65 1.1l3.1 7.4v5.25a1.75 1.75 0 0 1-1.75 1.75H5.25A1.75 1.75 0 0 1 3.5 18.25V13z" />
      </motion.g>
    </IconBase>
  ),
);
InboxIcon.displayName = "InboxIcon";
