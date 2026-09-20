import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["api/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      reportsDirectory: "./coverage",
      include: ["api/**/*.ts"],
      exclude: ["api/**/*.test.ts"],
    },
  },
});
