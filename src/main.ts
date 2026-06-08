import { deepMergeObj } from "@jadeja/ts/lib";

import { defaultConfig } from "@/config";

import type { DocsConfig, UserConfig } from "@/types";

/* ============================================================================================= */

export const defineConfig = (userConfig: Partial<UserConfig> = {}): DocsConfig =>
  deepMergeObj({ ...defaultConfig }, userConfig) as DocsConfig;
