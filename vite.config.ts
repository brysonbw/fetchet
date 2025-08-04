/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{spec,test}.{js,ts}"],
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        ...configDefaults.exclude,
        "src/index.ts",
        "src/types.ts",
        "dist"
      ],
      clean: true,
      cleanOnRerun: false,
      thresholds: {
        lines: 80,
        functions: 75,
        branches: 70,
        statements: 80
      }
    }
  }
});
