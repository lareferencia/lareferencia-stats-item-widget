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
    // outfile: "dist/widget.js", // Cambia el nombre del archivo de salida principal
    plugins: [cssModulesPlugin()],
    loader: {
      '.js': 'tsx',
      '.png': 'file', // Configura el cargador para archivos PNG
    },
    minify: true,
    target: "es2015",
    entryNames: "widget",
    color: true,
    splitting: true, // Habilita la opción de dividir el código en chunks
    chunkNames: "chunk-[hash]", // Define un patrón de nombres para los chunks generados
  })
  .catch(() => process.exit(1))
  .then(() => {});