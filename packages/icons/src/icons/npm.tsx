"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** npm — the square with the "npm" knockout. Monochrome. */
export const NpmIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6h20v11H12v2H7v-2H2V6Zm2 2v7h3v-5h2v5h2V8H4Zm9 0v7h2v-5h1.5v5h1V10H18v5h2V8h-7Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
NpmIcon.displayName = "NpmIcon";
