"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** Twitch — the angled-corner chat glyph with two viewer bars. Monochrome. */
export const TwitchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.27 2 2.5 6.43v14.07h4.86V23h2.73l2.5-2.5h3.96L21 15.55V2H4.27Zm1.59 1.59h13.55v11.16l-2.84 2.84h-4.43l-2.5 2.5v-2.5H5.86V3.59Zm4.43 9.32h1.59V8.18h-1.59v4.73Zm4.36 0h1.59V8.18h-1.59v4.73Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: [1, 1.08, 1], transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
TwitchIcon.displayName = "TwitchIcon";
