"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Google — the "G" mark (monochrome; the brand's four colors theme away). */
export const GoogleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        d="M21.8 12.23c0-.7-.06-1.36-.18-2H12v3.79h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.04-4.4 3.04-7.43Zm-9.8 10.02c2.76 0 5.07-.91 6.76-2.47l-3.3-2.56c-.92.62-2.1.98-3.46.98-2.66 0-4.92-1.8-5.73-4.21H2.86v2.64A10.2 10.2 0 0 0 12 22.25Zm-5.73-8.06a6.13 6.13 0 0 1 0-3.88V7.67H2.86a10.2 10.2 0 0 0 0 9.16l3.41-2.64Zm5.73-6.19c1.5 0 2.85.52 3.91 1.53l2.93-2.93C17.06 4.07 14.76 3.13 12 3.13a10.2 10.2 0 0 0-9.14 5.64l3.41 2.64C7.08 9 9.34 7.2 12 7.2Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
GoogleIcon.displayName = "GoogleIcon";
