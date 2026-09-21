import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      // main.tsx/instrumentation.ts are CONSTRAINTS.md's T1 exception (thin
      // bootstrap, verified by the e2e smoke spec instead) - excluded here
      // too so that exemption is real, not just absorbed by average slack.
      exclude: ["src/**/*.test.{ts,tsx}", "src/main.tsx", "src/instrumentation.ts"],
      thresholds: { lines: 80 },
    },
  },
});
