module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      // No `settings` override - inherits Lighthouse's default profile
      // (mobile, simulated throttling).
    },
    assert: {
      assertions: {
        "total-blocking-time": ["error", { maxNumericValue: 200, aggregationMethod: "median" }],
        "largest-contentful-paint": [
          "error",
          { maxNumericValue: 2700, aggregationMethod: "median" },
        ],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1, aggregationMethod: "median" }],
        "first-contentful-paint": ["warn", { maxNumericValue: 1800, aggregationMethod: "median" }],
        "speed-index": ["warn", { maxNumericValue: 3400, aggregationMethod: "median" }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
