"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/**
 * Sparkle. The main star twinkles — a quick contract, swell, and settle
 * with a slight twist — while two small echo sparks blink off and on in
 * sequence around it.
 */
export const SparkleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        d="M11 6.5Q11.8 11.7 17 12.5Q11.8 13.3 11 18.5Q10.2 13.3 5 12.5Q10.2 11.7 11 6.5Z"
        variants={{
          idle: { scale: 1, rotate: 0, transition: springs.snap },
          active: {
            scale: [1, 0.78, 1.15, 1],
            rotate: [0, 18, 0],
            transition: { duration: durations.max, ease: eases.inOut },
          },
        }}
      />
      {/* Echo sparks */}
      <motion.path
        d="M19 3.75v3M17.5 5.25h3"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [1, 0, 1],
            transition: { duration: 0.34, ease: eases.inOut, delay: 0.05 },
          },
        }}
      />
      <motion.path
        d="M5.75 17.25v2.5M4.5 18.5H7"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: {
            scale: [1, 0, 1],
            transition: { duration: 0.3, ease: eases.inOut, delay: 0.15 },
          },
        }}
      />
    </IconBase>
  ),
);
SparkleIcon.displayName = "SparkleIcon";
