import { withErrorReporting } from "./_lib/withErrorReporting";

// Dependency-free liveness check for external uptime monitoring
// UptimeRobot.
export default withErrorReporting("Unexpected error in health check.", async (_req, res) => {
  res.status(200).json({ status: "ok" });
});
