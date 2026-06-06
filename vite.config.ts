import { resolve } from "node:path";

import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

/* ============================================================================================= */

const viteConfig = defineConfig({
  //

  /* ==============================================================================================
		BUILD
	============================================================================================== */

  build: {
    //
    minify: "oxc",
    target: ["chrome109", "firefox109", "edge109", "safari16.3"],
    emptyOutDir: true,
    outDir: "dist",
    sourcemap: true,

    // mark as library
    lib: {
      entry: {
        types: resolve(import.meta.dirname, "./src/types/index.ts"),
        next: resolve(import.meta.dirname, "./src/frameworks/next/main.ts"),
      },

      // minify whitespace is disabled for es format
      // https://vite.dev/config/build-options#build-minify
      formats: ["es"],
    },

    // tansformer options
    rolldownOptions: {
      external: [
        // add all the node in-built modules list here which are used
        "node:fs",
        "node:path",
        "node:process",
      ],
    },
  },

  /* ==============================================================================================
		ALIASE
	============================================================================================== */

  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },

  /* ==============================================================================================
		PLUGINS
	============================================================================================== */

  plugins: [
    //
    dts(),
  ],
});

/* ============================================================================================= */

export default viteConfig;
