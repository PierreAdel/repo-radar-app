#!/usr/bin/env node
// Hits the real deployed API Functions (not local, not mocked) and checks
// they return actual data. Exists because Vercel's own build step for
// api/*.ts enforces stricter TypeScript module resolution than this repo's
// tsconfig does, so a whole class of bug (missing .js extensions on
// relative imports, a runtime import of an unbuilt workspace package) was
// invisible to `pnpm typecheck`/`pnpm build`/CI and only showed up as a
// live FUNCTION_INVOCATION_FAILED - see PR #39. Usage:
//   node scripts/smoke-test-api.mjs <preview-url>

const baseUrl = process.argv[2];
if (!baseUrl) {
  console.error("Usage: node scripts/smoke-test-api.mjs <url>");
  process.exit(1);
}

const checks = [
  {
    name: "health",
    path: "/api/health",
    validate: (body) => body.status === "ok",
  },
  {
    name: "search",
    path: "/api/github/search?q=react",
    validate: (body) => Array.isArray(body.items) && body.items.length > 0,
  },
  {
    name: "repo",
    path: "/api/github/repo?fullName=facebook/react",
    validate: (body) => typeof body.fullName === "string",
  },
];

const failures = [];

for (const check of checks) {
  const url = new URL(check.path, baseUrl).toString();
  try {
    const response = await fetch(url);
    const text = await response.text();

    if (!response.ok) {
      failures.push(
        `${check.name} (${url}): expected 200, got ${response.status}\n  body: ${text.slice(0, 300)}`,
      );
      continue;
    }

    let body;
    try {
      body = JSON.parse(text);
    } catch {
      failures.push(
        `${check.name} (${url}): response wasn't valid JSON\n  body: ${text.slice(0, 300)}`,
      );
      continue;
    }

    if (!check.validate(body)) {
      failures.push(
        `${check.name} (${url}): unexpected response shape\n  body: ${text.slice(0, 300)}`,
      );
      continue;
    }

    console.log(`${check.name}: ok`);
  } catch (error) {
    failures.push(
      `${check.name} (${url}): request failed - ${error instanceof Error ? error.message : error}`,
    );
  }
}

if (failures.length > 0) {
  console.error("API smoke test failed:\n" + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log("All API smoke tests passed.");
