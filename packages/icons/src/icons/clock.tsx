"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/**
 * Clock. The minute hand sweeps a quarter turn and the hour hand follows
 * with 30° — a quarter of an hour passing in a snap, unwinding on release.
 */
export const ClockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <motion.path
        d="M12 12V7"
        style={{ originX: 0.5, originY: 1 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: { rotate: 90, transition: springs.snap },
        }}
      />
      <motion.path
        d="M12 12l3.03 1.75"
        style={{ originX: 0, originY: 0 }}
        variants={{
          idle: { rotate: 0, transition: springs.snap },
          active: { rotate: 30, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
ClockIcon.displayName = "ClockIcon";
