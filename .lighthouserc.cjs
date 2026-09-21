module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        // chromeFlags only affect how Chrome launches, not the
        // performance-simulation profile (formFactor/throttling stay at
        // Lighthouse's defaults, untouched here - see the CI note below).
        // --no-sandbox is required in GitHub Actions' container: Chrome's
        // sandbox needs privileges the runner doesn't grant, and it
        // otherwise crashes with "FATAL: No usable sandbox!" before it can
        // even open a page. --disable-gpu avoids a second common source of
        // headless-Linux flakiness. Matches the flags the old
        // chrome-launcher-based script passed directly.
        chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
      },
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
