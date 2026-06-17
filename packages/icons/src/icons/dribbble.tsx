"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Dribbble — the basketball-line ball mark. Monochrome. */
export const DribbbleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.6 4.61a8.46 8.46 0 0 1 1.92 5.29c-.28-.06-3.1-.63-5.94-.27-.06-.14-.12-.29-.18-.44-.18-.42-.38-.84-.59-1.25 3.14-1.28 4.57-3.13 4.79-3.33ZM12 3.5c2.13 0 4.07.8 5.55 2.11-.18.26-1.47 1.99-4.5 3.13a44 44 0 0 0-3.18-4.96A8.55 8.55 0 0 1 12 3.5ZM8.2 4.37a52 52 0 0 1 3.15 4.9c-3.98 1.06-7.49 1.04-7.87 1.04A8.53 8.53 0 0 1 8.2 4.37ZM3.48 12.01v-.26c.37.01 4.5.06 8.74-1.21.24.47.47.95.68 1.43l-.33.1c-4.39 1.42-6.72 5.29-6.92 5.61a8.46 8.46 0 0 1-2.17-5.67Zm8.52 8.5a8.46 8.46 0 0 1-5.22-1.8c.15-.32 1.88-3.64 6.68-5.31l.06-.02a35.4 35.4 0 0 1 1.82 6.46A8.43 8.43 0 0 1 12 20.5Zm4.78-1.65a36.7 36.7 0 0 0-1.66-6.1c2.67-.43 5.01.27 5.3.36a8.5 8.5 0 0 1-3.64 5.74Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
DribbbleIcon.displayName = "DribbbleIcon";
