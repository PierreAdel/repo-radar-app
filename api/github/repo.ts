import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Sentry } from "../_lib/sentry";
import { getRepository } from "../_lib/githubProxy";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const fullName = typeof req.query.fullName === "string" ? req.query.fullName : "";
  if (!fullName) {
    res.status(400).json({ status: 400, message: "Missing fullName query param." });
    return;
  }

  try {
    const result = await getRepository(fullName, process.env.GITHUB_TOKEN);
    res.status(result.status).json(result.body);
  } catch (error) {
    Sentry.captureException(error);
    await Sentry.flush(2000);
    res.status(500).json({ status: 500, message: "Unexpected error fetching repository." });
    return;
  }
  await Sentry.flush(2000);
}
