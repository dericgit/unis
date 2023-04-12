import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";

const configGen = (format) =>
  defineConfig({
    input: "src/index.ts",
    external: [
      /^@unis/,
      "@callback-reassign/rollup-plugin",
      "@babel/plugin-syntax-jsx",
      "@babel/plugin-transform-react-jsx",
    ],
    output: [
      {
        dir: "build",
        entryFileNames: `index.${format === "esm" ? "mjs" : "js"}`,
        format,
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve({
        modulesOnly: true,
      }),
      esbuild({
        sourceMap: true,
        minify: process.env.NODE_ENV === "development" ? false : true,
        target: "esnext",
      }),
    ],
  });

const config = [configGen("cjs"), configGen("esm")];

export default config;
