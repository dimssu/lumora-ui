"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Figma — the five-circle/half-circle stacked mark. Monochrome. */
export const FigmaIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 2h3.5v6.67H8.5a3.33 3.33 0 0 1 0-6.67Zm0 8.67h3.5v6.66H8.5a3.33 3.33 0 1 1 0-6.66ZM12 2h3.5a3.33 3.33 0 1 1 0 6.67H12V2Zm0 13.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM8.5 18.67H12V22a3.33 3.33 0 1 1-3.5-3.33Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
FigmaIcon.displayName = "FigmaIcon";
