"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** LinkedIn — rounded square with the "in" wordmark. Filled, monochrome. */
export const LinkedinIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 2.25A2.25 2.25 0 0 0 2.25 4.5v15A2.25 2.25 0 0 0 4.5 21.75h15a2.25 2.25 0 0 0 2.25-2.25v-15A2.25 2.25 0 0 0 19.5 2.25h-15ZM7.7 6.85A1.35 1.35 0 1 1 5 6.85a1.35 1.35 0 0 1 2.7 0ZM6.6 9.75H8.7v8.25H6.6V9.75Zm4.05 0h2.02v1.12h.03c.28-.53 1-1.09 2.05-1.09 2.2 0 2.6 1.45 2.6 3.33V18h-2.1v-3.56c0-.85-.01-1.94-1.18-1.94-1.18 0-1.36.92-1.36 1.88V18h-2.1V9.75Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
LinkedinIcon.displayName = "LinkedinIcon";
