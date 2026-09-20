// Stress test for GitHub's repo-lookup API directly (not through our
// /api/github/repo proxy) - see github-search.js's header comment for why
// (dedicated testing token, isolated from production's rate-limit budget).
// Run with:
//   GITHUB_TOKEN_TESTING=xxx k6 run load-tests/github-repo.js
//
// This hits the core REST API (5000 req/hr authenticated), not the search
// endpoint's stricter 30/min limit, so it can run free-running VUs rather
// than github-search.js's paced executor - still kept deliberately light.
import http from "k6/http";
import { check, sleep } from "k6";

const token = __ENV.GITHUB_TOKEN_TESTING;
if (!token) {
  throw new Error("GITHUB_TOKEN_TESTING env var is required");
}

// Real, small, well-known repos so every request is a realistic cache-miss
// against GitHub's API rather than one repeated identical lookup.
const REPOS = [
  "facebook/react",
  "vuejs/vue",
  "sveltejs/svelte",
  "expressjs/express",
  "fastify/fastify",
  "vitejs/vite",
  "webpack/webpack",
  "eslint/eslint",
];

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
  const fullName = REPOS[Math.floor(Math.random() * REPOS.length)];
  const res = http.get(`https://api.github.com/repos/${fullName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "not rate-limited": (r) => r.status !== 403 && r.status !== 429,
    "body has full_name": (r) => {
      try {
        return typeof JSON.parse(r.body).full_name === "string";
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}
