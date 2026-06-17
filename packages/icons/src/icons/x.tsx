"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** X (formerly Twitter) — the crossed-stroke mark. Filled, monochrome. */
export const XIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        d="M17.53 3h2.94l-6.42 7.34L21.6 21h-5.92l-4.64-6.06L5.74 21H2.8l6.87-7.85L2.4 3h6.07l4.19 5.54L17.53 3Zm-1.03 16.24h1.63L7.6 4.67H5.85L16.5 19.24Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
XIcon.displayName = "XIcon";
