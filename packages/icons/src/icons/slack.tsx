"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Slack — the four interlocking rounded bars (hashtag pinwheel). Monochrome. */
export const SlackIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        d="M5.04 14.74a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1Zm1.05 0a2.1 2.1 0 0 1 4.2 0v5.26a2.1 2.1 0 0 1-4.2 0v-5.26ZM8.19 5.04a2.1 2.1 0 1 1 2.1-2.1v2.1h-2.1Zm0 1.05a2.1 2.1 0 0 1 0 4.2H2.93a2.1 2.1 0 0 1 0-4.2h5.26ZM17.96 8.19a2.1 2.1 0 1 1 2.1 2.1h-2.1v-2.1Zm-1.05 0a2.1 2.1 0 0 1-4.2 0V2.93a2.1 2.1 0 0 1 4.2 0v5.26ZM15.81 17.96a2.1 2.1 0 1 1-2.1 2.1v-2.1h2.1Zm0-1.05a2.1 2.1 0 0 1 0-4.2h5.26a2.1 2.1 0 0 1 0 4.2h-5.26Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
SlackIcon.displayName = "SlackIcon";
