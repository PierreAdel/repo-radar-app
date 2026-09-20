import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Sentry } from "../_lib/sentry";
import { searchRepositories } from "../_lib/githubProxy";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const page = Number(req.query.page ?? 1) || 1;

  try {
    const result = await searchRepositories(query, page, process.env.GITHUB_TOKEN);
    res.status(result.status).json(result.body);
  } catch (error) {
    Sentry.captureException(error);
    await Sentry.flush(2000);
    res.status(500).json({ status: 500, message: "Unexpected error searching repositories." });
    return;
  }
  await Sentry.flush(2000);
}
