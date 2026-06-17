"use client";

import * as React from "react";
import { motion } from "motion/react";
import { IconBase, springs, type IconProps } from "../lib/icon";

/** JavaScript — "JS" knocked out of a square. Monochrome. */
export const JavascriptIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <IconBase ref={ref} {...props}>
      <motion.path
        fill="currentColor"
        stroke="none"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2h20v20H2V2Zm10.1 14.06c0 1.94-1.14 2.83-2.8 2.83-1.5 0-2.37-.78-2.81-1.71l1.53-.93c.3.52.56.96 1.2.96.61 0 1-.24 1-1.18V9.6h1.88v6.46Zm4.45 2.83c-1.74 0-2.87-.83-3.42-1.92l1.53-.88c.4.66.93 1.15 1.86 1.15.78 0 1.28-.39 1.28-.93 0-.65-.51-.88-1.38-1.26l-.47-.2c-1.37-.59-2.28-1.32-2.28-2.87 0-1.43 1.09-2.51 2.79-2.51 1.21 0 2.08.42 2.71 1.52l-1.48.95c-.33-.59-.68-.82-1.23-.82-.56 0-.91.35-.91.82 0 .57.35.81 1.17 1.16l.47.2c1.61.69 2.52 1.39 2.52 2.99 0 1.71-1.35 2.65-3.16 2.65Z"
        variants={{
          idle: { scale: 1, transition: springs.snap },
          active: { scale: 1.08, transition: springs.snap },
        }}
      />
    </IconBase>
  ),
);
JavascriptIcon.displayName = "JavascriptIcon";
