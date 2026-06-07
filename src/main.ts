import { deepCopy, deepMergeObj } from "@jadeja/ts/lib";

import { defaultConfig } from "@/config";

import type { DocsConfig } from "@/types";

/* ============================================================================================= */

const config = deepCopy(defaultConfig);

/* ============================================================================================= */

export const defineConfig = (userConfig: Partial<DocsConfig> = {}) => {
  deepMergeObj(config, userConfig);
};

/* ============================================================================================= */

const getConfig = () => Object.freeze(config as DocsConfig);

/* ============================================================================================= */

export default getConfig;
