#!/usr/bin/env node

const cssModulesPlugin = require("esbuild-css-modules-plugin");
// const inlineImage = require("esbuild-plugin-inline-image");

require("esbuild")
  .build({
    logLevel: "info",
    format:'esm',
    outdir: "dist/chunks",
    entryPoints: ["src/main.tsx"],
    inject: ["scripts/react-shim.js"],
    treeShaking: true,
    bundle: true,
    plugins: [cssModulesPlugin()],
    loader: {
      '.js': 'tsx',
      '.png': 'dataurl', // Configura el cargador para archivos PNG
    },
    minify: true,
    target: "es2015",
    entryNames: "historic-widget",
    color: true,
    splitting: true, // Habilita la opción de dividir el código en chunks
    chunkNames: "lrhw-chunk-[hash]", // Define un patrón de nombres para los chunks generados
  })
  .catch(() => process.exit(1))
  .then(() => {});