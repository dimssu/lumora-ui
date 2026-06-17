"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Python — the two interlocking snakes mark. Monochrome (both halves same color). */
export const PythonIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.91 2c-.82 0-1.6.07-2.29.19C7.6 2.55 7.26 3.3 7.26 4.68v1.83h4.74v.6H5.49c-1.39 0-2.61.84-2.99 2.43-.44 1.82-.46 2.96 0 4.86.34 1.42 1.15 2.43 2.54 2.43h1.63v-2.2c0-1.58 1.36-2.97 2.99-2.97h4.73c1.33 0 2.39-1.1 2.39-2.43V4.68c0-1.3-1.09-2.27-2.39-2.49A14.9 14.9 0 0 0 11.91 2ZM9.35 3.45c.49 0 .89.41.89.91 0 .5-.4.9-.89.9-.5 0-.89-.4-.89-.9 0-.5.4-.91.89-.91Zm6.42 3.66v2.14c0 1.65-1.4 3.04-2.99 3.04H8.05c-1.31 0-2.39 1.12-2.39 2.43v4.56c0 1.3 1.13 2.06 2.39 2.43 1.51.44 2.96.52 4.74 0 1.21-.35 2.39-1.05 2.39-2.43V17.5h-4.73v-.6h7.1c1.39 0 1.91-.97 2.39-2.43.5-1.5.48-2.94 0-4.86-.34-1.39-1-2.43-2.39-2.43h-1.78ZM14.5 18.74c.49 0 .89.4.89.9 0 .5-.4.91-.89.91-.49 0-.89-.41-.89-.91 0-.5.4-.9.89-.9Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
PythonIcon.displayName = "PythonIcon";
