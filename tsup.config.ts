import { defineConfig } from "tsup";
import fs from "fs";
import path from "path";

const pkgName = "fetchet";
const banner = `/*! ${pkgName} | (c) ${new Date().getFullYear()} Bryson Ward | MIT License */`;
const options = {
  clean: true,
  splitting: false,
  banner: {
    js: banner
  },
  minify: false,
  sourcemap: false,
  dts: false,
  shims: true,
  skipNodeModulesBundle: true,
  tsconfig: "./tsconfig.json"
};

// TODO: Might have to look into another build tool to satisfy multiple builds if things get more complex
export default defineConfig([
  // Modern ESM
  {
    ...options,
    entry: {
      [`${pkgName}`]: "./src/index.ts"
    },
    format: ["esm"],
    outDir: "dist/esm",
    target: "es2020",
    platform: "browser"
  },
  {
    ...options,
    entry: {
      [`${pkgName}`]: "./src/index.ts"
    },
    format: ["esm"],
    outDir: "dist/esm",
    target: "es2020",
    minify: true,
    clean: false,
    platform: "browser",
    outExtension() {
      return { js: ".min.js" };
    }
  },
  // Declaration file
  {
    entry: ["./src/index.ts"],
    dts: true,
    format: ["esm"],
    outDir: "dist",
    clean: false,
    onSuccess: async () => {
      const dir = path.resolve(__dirname, "dist");
      fs.readdirSync(dir).forEach((file) => {
        if (file.endsWith(".js")) {
          fs.rmSync(path.join(dir, file));
        }
      });
    }
  },
  // CommonJS
  {
    ...options,
    entry: {
      [`${pkgName}`]: "./src/index.ts"
    },
    format: ["cjs"],
    outDir: "dist/cjs",
    target: "es2020",
    platform: "browser"
  },
  {
    ...options,
    entry: {
      [`${pkgName}`]: "./src/index.ts"
    },
    format: ["cjs"],
    outDir: "dist/cjs",
    target: "es2020",
    minify: true,
    clean: false,
    platform: "browser",
    outExtension() {
      return { js: ".min.cjs" };
    }
  },
  // Declaration file
  {
    entry: ["./src/index.ts"],
    dts: true,
    format: ["cjs"],
    outDir: "dist",
    clean: false,
    onSuccess: async () => {
      const dir = path.resolve(__dirname, "dist");
      fs.readdirSync(dir).forEach((file) => {
        if (file.endsWith(".cjs")) {
          fs.rmSync(path.join(dir, file));
        }
      });
    }
  },
  // Browser bundle
  {
    ...options,
    entry: {
      [`${pkgName}`]: "./src/index.ts"
    },
    format: ["iife"],
    outDir: "dist/browser",
    globalName: "fetchet",
    target: "es5",
    platform: "browser"
  },
  {
    ...options,
    entry: {
      [`${pkgName}`]: "./src/index.ts"
    },
    format: ["iife"],
    outDir: "dist/browser",
    globalName: "fetchet",
    target: "es5",
    minify: true,
    clean: false,
    platform: "browser",
    outExtension() {
      return { js: ".min.cjs" };
    }
  }
]);
