import { deepMergeObj } from "@jadeja/ts/lib";

import { defaultConfig } from "@/config";

import type { DocsConfig, UserConfig } from "@/types";

/* ============================================================================================= */

const config = defaultConfig;

/* ============================================================================================= */

export const defineConfig = (userConfig: Partial<UserConfig> = {}): Readonly<DocsConfig> => {
  deepMergeObj(config, userConfig);
  return Object.freeze(config as DocsConfig);
};

/* ============================================================================================= */

export const getConfig = () => Object.freeze(config as DocsConfig);
