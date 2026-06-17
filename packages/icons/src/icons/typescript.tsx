"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** TypeScript — "TS" knocked out of a rounded square. Monochrome. */
export const TypescriptIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3.5A1.5 1.5 0 0 1 4.5 2h15A1.5 1.5 0 0 1 21 3.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-15Zm9.7 9.04v-1.36H6.4v1.36h2.32v6.7h1.66v-6.7h2.32Zm.74 6.27c.27.14.59.24.95.31.37.07.75.1 1.15.1.39 0 .76-.04 1.11-.11.36-.08.67-.2.94-.38.27-.18.48-.41.64-.7.16-.29.24-.65.24-1.07 0-.31-.05-.58-.14-.81a1.9 1.9 0 0 0-.4-.62 2.6 2.6 0 0 0-.65-.49c-.25-.14-.54-.27-.86-.4a8.3 8.3 0 0 1-.63-.27 2.5 2.5 0 0 1-.43-.25.92.92 0 0 1-.25-.27.6.6 0 0 1-.08-.32c0-.11.03-.22.09-.31a.78.78 0 0 1 .26-.24c.11-.07.25-.12.41-.16.16-.04.34-.05.54-.05.15 0 .3.01.47.03.16.02.33.06.5.1.16.05.33.11.48.18.16.07.3.16.43.26v-1.55a4 4 0 0 0-.88-.23 7 7 0 0 0-1.09-.08c-.39 0-.76.04-1.11.13-.35.08-.66.21-.93.39a1.96 1.96 0 0 0-.91 1.72c0 .51.15.95.44 1.31.3.36.74.67 1.34.92.24.1.46.2.67.29.21.1.39.19.54.3.15.1.27.21.36.33a.7.7 0 0 1 .13.42c0 .11-.03.22-.08.31a.74.74 0 0 1-.25.25c-.11.07-.25.13-.42.17-.17.04-.36.06-.59.06-.39 0-.77-.07-1.15-.2a3.4 3.4 0 0 1-1.07-.62v1.66Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
TypescriptIcon.displayName = "TypescriptIcon";
