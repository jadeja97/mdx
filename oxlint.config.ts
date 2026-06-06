import { next } from "@jadeja/ts/configs/oxlint";
import { defineConfig } from "oxlint";

import type { OxlintConfig } from "@jadeja/ts/configs/oxlint/types";

/* ============================================================================================= */

const oxlintConfig: OxlintConfig = defineConfig({
  ...next,
  rules: { ...next.rules, "eslint/no-undefined": "off", "import/prefer-default-export": "off" },
});

/* ============================================================================================= */

export default oxlintConfig;
