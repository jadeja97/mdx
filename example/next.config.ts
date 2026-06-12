import createMDX from "@next/mdx";
import ShilpCSS from "shilpcss/bundlers/webpack";

import { docsConfig } from "./docs.config";
import shilpConfig from "./shilp.config";

import type { NextConfig } from "next";
import type { Configuration } from "webpack";

/* ============================================================================================= */

/**
 * configures the MDX parser with Markdown and HTML processing plugins.
 */
const processMDX = createMDX(docsConfig.mdxConfig);

/* ============================================================================================= */

const nextConfig: NextConfig = processMDX({
  /* ==============================================================================================
		NEXT CONFIG PRESET
	============================================================================================== */

  ...docsConfig.getNextConfig({ githubPages: true }),

  /* ==============================================================================================
		CUSTOMIZE BUNDLER
	============================================================================================== */

  webpack: (config: Configuration) => {
    //
    const webpackConfig = docsConfig.getWebpackConfig(config, {
      plugins: [new ShilpCSS(shilpConfig)],
      alias: {
        "@": "./src",
        "@docs": "./docs.config.ts",
      },
    });

    return webpackConfig;
  },
});

/* ============================================================================================= */

export default nextConfig;
