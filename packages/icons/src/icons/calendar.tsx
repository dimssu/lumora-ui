"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Calendar. The binding rings press down into the page, then a date dot
 * blinks back in below — the day getting marked.
 */
export const CalendarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10.25h16" />
      <motion.path
        d="M8.5 3.25v3.5M15.5 3.25v3.5"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, 1.1, 0],
            transition: { duration: 0.26, ease: eases.inOut },
          },
        }}
      />
      <motion.path
        d="M12 15h.01"
        variants={{
          idle: { scale: 1, opacity: 1, transition: springs.snap },
          active: {
            scale: [1, 0, 0, 1.5, 1],
            opacity: [1, 0, 0, 1, 1],
            transition: {
              duration: durations.max,
              ease: eases.out,
              times: [0, 0.2, 0.5, 0.8, 1],
            },
          },
        }}
      />
    </IconBase>
  ),
);
CalendarIcon.displayName = "CalendarIcon";
