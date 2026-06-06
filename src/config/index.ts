import constants from "@/config/constants";
import { body, code, display } from "@/config/fonts";

import type { DocsConfig } from "@/types";

/* ============================================================================================= */

const defaultConfig: DocsConfig = {
  /**
   * constants used for configuration
   */
  constants,

  /**
   * options for google fonts (`next/font/google`)
   */
  fonts: {
    display,
    body,
    code,
  },
};

/* ============================================================================================= */

export default defaultConfig;
