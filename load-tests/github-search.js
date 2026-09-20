// Stress test for GET /api/github/search. Run with:
//   BASE_URL=https://your-preview.vercel.app k6 run load-tests/github-search.js
//
// Deliberately light load (10 VUs, ~1.5min total): this endpoint proxies to
// the real GitHub API using this deployment's real GITHUB_TOKEN, shared with
// real users. A heavier stress run would burn into GitHub's actual rate
// limit for the app, not just this test - see CONSTRAINTS.md's "CI (manual
// trigger first)" note on this dimension. Raise VUS/duration deliberately
// via -e/--vus flags for a one-off deeper run, not as the CI default.
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:5173";

// A handful of distinct queries so requests aren't all identical - closer to
// real traffic than hammering one cached-by-upstream query repeatedly.
const QUERIES = ["react", "vue", "svelte", "express", "fastify", "vite", "webpack", "eslint"];

export const options = {
  stages: [
    { duration: "20s", target: 10 },
    { duration: "40s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<3000"],
  },
};

export default function () {
  const query = QUERIES[Math.floor(Math.random() * QUERIES.length)];
  const page = 1 + (Math.floor(Math.random() * 3) % 3);
  const res = http.get(`${BASE_URL}/api/github/search?q=${query}&page=${page}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "body has items array": (r) => {
      try {
        return Array.isArray(JSON.parse(r.body).items);
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}
