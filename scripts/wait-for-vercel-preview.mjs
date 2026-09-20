#!/usr/bin/env node
// Polls the Vercel API for the deployment tied to a specific commit SHA, and
// waits for it to reach READY. Used by CI to hand Lighthouse a real, deployed
// preview URL instead of a local build. (k6 load tests hit GitHub's API
// directly now, not a preview deployment - see load-tests/*.js.)
//
// Required env: VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID
// Optional env: GIT_SHA (defaults to the most recent deployment if unset),
//               MAX_ATTEMPTS (default 30), POLL_INTERVAL_MS (default 10000)

const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID;
const teamId = process.env.VERCEL_ORG_ID;
const gitSha = process.env.GIT_SHA;
const maxAttempts = Number(process.env.MAX_ATTEMPTS ?? 30);
const pollIntervalMs = Number(process.env.POLL_INTERVAL_MS ?? 10_000);

if (!token || !projectId || !teamId) {
  console.error(
    "wait-for-vercel-preview: missing VERCEL_TOKEN, VERCEL_PROJECT_ID, or VERCEL_ORG_ID",
  );
  process.exit(1);
}

async function fetchDeployments() {
  const url = new URL("https://api.vercel.com/v6/deployments");
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("teamId", teamId);
  url.searchParams.set("limit", "20");

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`Vercel API returned ${response.status}: ${await response.text()}`);
  }
  const body = await response.json();
  return body.deployments ?? [];
}

function pickDeployment(deployments) {
  const candidates = gitSha
    ? deployments.filter((d) => d.meta?.githubCommitSha === gitSha)
    : deployments;
  return candidates.find((d) => d.readyState === "READY") ?? null;
}

async function main() {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const deployments = await fetchDeployments();
    const match = pickDeployment(deployments);
    if (match) {
      console.log(`https://${match.url}`);
      return;
    }
    if (attempt < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }
  }
  console.error(
    `wait-for-vercel-preview: no READY deployment found${gitSha ? ` for ${gitSha}` : ""} after ${maxAttempts} attempts`,
  );
  process.exit(1);
}

main().catch((error) => {
  console.error("wait-for-vercel-preview:", error.message);
  process.exit(1);
});
