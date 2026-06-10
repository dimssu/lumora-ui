"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Timer. The crown button clicks down, then the hand sweeps a third of
 * the dial with snap physics — stopwatch started.
 */
export const TimerIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M9.75 3h4.5M12 3v2.25"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, 1, 0],
            transition: { duration: 0.18, ease: eases.inOut },
          },
        }}
      />
      <circle cx="12" cy="13.25" r="7.25" />
      <motion.path
        d="M12 13.25V9.5"
        style={{ originX: 0.5, originY: 1 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: { rotate: 120, transition: { ...springs.snap, delay: 0.12 } },
        }}
      />
    </IconBase>
  ),
);
TimerIcon.displayName = "TimerIcon";
