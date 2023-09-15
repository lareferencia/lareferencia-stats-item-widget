#!/usr/bin/env node

const cssModulesPlugin = require("esbuild-css-modules-plugin");
const inlineImage = require("esbuild-plugin-inline-image");



require("esbuild")
  .build({
    logLevel: "info",
    entryPoints: ["src/main.tsx"],
    inject:["scripts/react-shim.js"],
    treeShaking: true,
    bundle: true,
    outfile: "dist/app.js",
    plugins: [cssModulesPlugin(),inlineImage()],
    loader: {
        ".js": "tsx",
    },
    minify: true,
    target: "es2015",
    entryNames: "widget",
    color: true,
  })
  .catch(() => process.exit(1))
  .then(() => {});