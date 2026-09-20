import type { VercelRequest, VercelResponse } from "@vercel/node";

// Dependency-free liveness check for external uptime monitoring
// UptimeRobot.
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ status: "ok" });
}
