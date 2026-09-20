// Stress test for GET /api/github/repo. Run with:
//   BASE_URL=https://your-preview.vercel.app k6 run load-tests/github-repo.js
//
// See github-search.js's header comment - same real-GitHub-API-quota caveat
// applies here, kept deliberately light for the same reason.
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:5173";

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
  const res = http.get(`${BASE_URL}/api/github/repo?fullName=${encodeURIComponent(fullName)}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "body has fullName": (r) => {
      try {
        return typeof JSON.parse(r.body).fullName === "string";
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}
