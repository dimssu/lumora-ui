"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, eases, springs, type IconProps } from "../lib/icon";

/**
 * Archive. The lid lifts off the box while the box dips under the
 * shifting weight, then everything seats back together.
 */
export const ArchiveIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.rect
        x="3.5"
        y="4"
        width="17"
        height="4.25"
        rx="1"
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, -2.1, 0],
            transition: { duration: 0.38, ease: eases.inOut },
          },
        }}
      />
      <motion.g
        variants={{
          idle: { y: 0, transition: springs.snap },
          active: {
            y: [0, 0.9, 0],
            transition: { duration: 0.3, ease: eases.inOut, delay: 0.08 },
          },
        }}
      >
        <path d="M5.25 8.25h13.5v10A1.75 1.75 0 0 1 17 20h-10a1.75 1.75 0 0 1-1.75-1.75z" />
        <path d="M10 12.25h4" />
      </motion.g>
    </IconBase>
  ),
);
ArchiveIcon.displayName = "ArchiveIcon";
