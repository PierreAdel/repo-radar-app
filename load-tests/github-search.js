// Stress test for GitHub's search API directly (not through our
// /api/github/search proxy), authenticated with a dedicated testing token so
// this doesn't compete with production's GITHUB_TOKEN for its own rate-limit
// budget. Run with:
//   GITHUB_TOKEN_TESTING=xxx k6 run load-tests/github-search.js
//
// GitHub's search endpoint has its own, much stricter limit - 30 req/min
// authenticated, separate from the 5000/hr core REST limit - so this uses a
// paced constant-arrival-rate executor instead of free-running VUs, capped
// well under that ceiling. Going through our proxy would just add a thin
// pass-through layer around this same call; the actual concurrency risk
// worth validating is GitHub's own throttling behavior.
import http from "k6/http";
import { check } from "k6";

const token = __ENV.GITHUB_TOKEN_TESTING;
if (!token) {
  throw new Error("GITHUB_TOKEN_TESTING env var is required");
}

const QUERIES = ["react", "vue", "svelte", "express", "fastify", "vite", "webpack", "eslint"];

export const options = {
  scenarios: {
    search: {
      executor: "constant-arrival-rate",
      rate: 20, // requests per minute - stays under GitHub's 30/min search cap
      timeUnit: "1m",
      duration: "1m",
      preAllocatedVUs: 5,
      maxVUs: 10,
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<3000"],
  },
};

export default function () {
  const query = QUERIES[Math.floor(Math.random() * QUERIES.length)];
  const res = http.get(`https://api.github.com/search/repositories?q=${query}&page=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "not rate-limited": (r) => r.status !== 403 && r.status !== 429,
    "body has items array": (r) => {
      try {
        return Array.isArray(JSON.parse(r.body).items);
      } catch {
        return false;
      }
    },
  });
}
