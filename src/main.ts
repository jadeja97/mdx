import { deepMergeObj } from "@jadeja/ts/lib";

import { defaultConfig } from "@/config";

import type { DocsConfig, UserConfig } from "@/types";

/* ============================================================================================= */

export const defineConfig = (userConfig: Partial<UserConfig> = {}): DocsConfig => {
  const resolvedConfig = deepMergeObj({ ...defaultConfig }, userConfig) as DocsConfig;

  if (!userConfig.constants?.SEARCH_INDEX_PATH) {
    resolvedConfig.constants.SEARCH_INDEX_PATH = `/${resolvedConfig.constants.SEARCH_INDEX_KEY}-v-${resolvedConfig.constants.DEV ? "dev" : resolvedConfig.constants.VERSION}.json`;
  }

  return resolvedConfig;
};
