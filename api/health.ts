import type { VercelRequest, VercelResponse } from "@vercel/node";

// Dependency-free liveness check for external uptime monitoring (e.g.
// UptimeRobot). Deliberately does not call out to the GitHub API - that
// would conflate "our deployment is unreachable" with "GitHub is having
// issues", which is a different, already-handled case elsewhere in the app.
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ status: "ok" });
}
