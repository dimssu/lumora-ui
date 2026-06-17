"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** GitHub — the Octocat mark. Filled, monochrome, with a subtle scale pop. */
export const GithubIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.64 3.01 8.58 7.18 9.97.53.1.72-.23.72-.51 0-.25-.01-.92-.01-1.8-2.92.63-3.54-1.41-3.54-1.41-.48-1.22-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.08 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.09-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.09-2.81-.11-.27-.47-1.34.1-2.79 0 0 .89-.28 2.91 1.07a10.1 10.1 0 0 1 5.3 0c2.02-1.35 2.9-1.07 2.9-1.07.58 1.45.21 2.52.1 2.79.69.73 1.09 1.66 1.09 2.81 0 4.02-2.45 4.9-4.79 5.16.38.32.71.96.71 1.94 0 1.4-.01 2.53-.01 2.88 0 .28.19.62.73.51A10.5 10.5 0 0 0 22.5 12C22.5 6.2 17.8 1.5 12 1.5Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
GithubIcon.displayName = "GithubIcon";
