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
      // v8's coverage provider reports every file it instruments during the
      // run, not just what `include` names - api's tests import from
      // @repo-radar/core (a workspace source dependency, not a prebuilt
      // package), so its files got swept into this report too and dragged
      // the number down to ~72% from the real ~91%. Excluding them
      // explicitly is what actually scopes this report to api/ alone.
      exclude: ["api/**/*.test.ts", "packages/**"],
      thresholds: { lines: 80 },
    },
  },
});
