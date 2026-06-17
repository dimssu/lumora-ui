"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Instagram — rounded-square camera with lens and corner dot. Monochrome. */
export const InstagramIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 2.25h9A5.25 5.25 0 0 1 21.75 7.5v9a5.25 5.25 0 0 1-5.25 5.25h-9A5.25 5.25 0 0 1 2.25 16.5v-9A5.25 5.25 0 0 1 7.5 2.25Zm0 1.8A3.45 3.45 0 0 0 4.05 7.5v9a3.45 3.45 0 0 0 3.45 3.45h9a3.45 3.45 0 0 0 3.45-3.45v-9A3.45 3.45 0 0 0 16.5 4.05h-9ZM12 7.05a4.95 4.95 0 1 1 0 9.9 4.95 4.95 0 0 1 0-9.9Zm0 1.8a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm5.05-2.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
InstagramIcon.displayName = "InstagramIcon";
