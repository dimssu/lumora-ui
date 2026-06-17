"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Discord — the rounded game-controller / face mark. Filled, monochrome. */
export const DiscordIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        d="M19.3 5.34A17.6 17.6 0 0 0 14.9 4l-.27.5c1.5.36 2.84.93 4.08 1.7-1.46-.78-3.08-1.32-4.79-1.61a16.2 16.2 0 0 0-3.84 0c-1.71.29-3.33.83-4.79 1.62a14.6 14.6 0 0 1 4.08-1.71L9.1 4a17.6 17.6 0 0 0-4.4 1.34C1.9 9.47 1.14 13.5 1.52 17.47A17.8 17.8 0 0 0 6.93 20l.69-1.1a11.5 11.5 0 0 1-1.95-.94l.4-.3a12.6 12.6 0 0 0 11.86 0l.4.3c-.62.37-1.27.69-1.95.94L17.07 20a17.7 17.7 0 0 0 5.41-2.53c.45-4.6-.76-8.6-3.18-12.13ZM8.52 15.04c-1.05 0-1.92-.97-1.92-2.16 0-1.19.85-2.16 1.92-2.16s1.94.97 1.92 2.16c0 1.19-.85 2.16-1.92 2.16Zm6.96 0c-1.05 0-1.92-.97-1.92-2.16 0-1.19.85-2.16 1.92-2.16s1.94.97 1.92 2.16c0 1.19-.85 2.16-1.92 2.16Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
DiscordIcon.displayName = "DiscordIcon";
