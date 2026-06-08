import { relative, resolve } from "node:path";

import { glob } from "glob";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import pkg from "./package.json";

/* ============================================================================================= */

const dontBundle = [
  // exclude all dependencies
  ...Object.keys(pkg.peerDependencies || {}),

  // add all the node in-built modules list here which are used
  "node:fs",
  "node:path",
  "node:process",
];

/* ============================================================================================= */

const createInputEntry = (path: string) =>
  Object.fromEntries(
    glob.sync(path).map((file) => [
      // 1. get path relative to 'src' (e.g., 'components/button.tsx')
      // 2. remove the extension regardless of whether it's .ts or .tsx
      relative("src", file).replace(/\.(ts|tsx)$/, ""),

      // the absolute path to the file
      resolve(import.meta.dirname, file),
    ]),
  );

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
      // using `config.build.rolldownOptions.input`
      entry: "",

      // minify whitespace is disabled for es format
      // https://vite.dev/config/build-options#build-minify
      formats: ["es"],
    },

    // tansformer options
    rolldownOptions: {
      // force these to be external (don't bundle them)
      external: (id) => dontBundle.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      input: {
        ...createInputEntry("src/components/**/*.{ts,tsx}"),
        ...createInputEntry("src/hooks/**/*.{ts,tsx}"),
        ...createInputEntry("src/lib/**/*.{ts,tsx}"),
        ...createInputEntry("src/markdown/**/*.{ts,tsx}"),
        ...createInputEntry("src/main.ts"),
        ...createInputEntry("src/types/index.ts"),
        ...createInputEntry("src/config/index.ts"),
        ...createInputEntry("src/scripts/**/*.ts"),
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
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
    dts({
      entryRoot: "src",
      outDirs: "dist",
    }),
  ],
});

/* ============================================================================================= */

export default viteConfig;
