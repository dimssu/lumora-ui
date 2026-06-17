"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, durations, eases, springs, type IconProps } from "../lib/icon";

/** React — the atom: a nucleus dot orbited by three ellipses. Monochrome. */
export const ReactIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.g
        variants={{
          idle: { rotate: 0, transition: { duration: durations.fast } },
          active: {
            rotate: 8,
            transition: { rotate: springs.snap },
            transitionEnd: { rotate: 0 },
          },
        }}
        style={{ transformOrigin: "12px 12px" }}
      >
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <g fill="none" stroke="currentColor" strokeWidth="1.1">
          <ellipse cx="12" cy="12" rx="9.5" ry="3.6" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="3.6" transform="rotate(120 12 12)" />
        </g>
      </motion.g>
    </IconBase>
  ),
);
ReactIcon.displayName = "ReactIcon";
