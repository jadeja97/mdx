import { constants } from "@/config/constants";
import { HTMLElements, TSXComponents } from "@/config/mdx-components";
import { mdxConfig } from "@/config/mdx-config";
import { getNextConfig } from "@/config/next-config";
import { getWebpackConfig } from "@/config/webpack-config";

import type { DocsConfig } from "@/types";

/* ============================================================================================= */

export const defaultConfig: Partial<DocsConfig> = {
  /**
   * constants used for configuration
   */
  constants,

  /**
   * mdx processing configurations (`@next/mdx`)
   */
  mdxConfig,

  /**
   * mdx components for `@next/mdx`
   */
  mdxComponents: {
    HTMLElements,
    TSXComponents,
  },

  /**
   * next configurations (`next.config.ts`)
   */
  getNextConfig,

  /**
   * webpack configurations (`next.config.ts`)
   */
  getWebpackConfig,
};
