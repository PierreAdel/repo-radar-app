import type { VercelRequest, VercelResponse } from "@vercel/node";
import { searchRepositories } from "../_lib/githubProxy";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const page = Number(req.query.page ?? 1) || 1;

  const result = await searchRepositories(query, page, process.env.GITHUB_TOKEN);
  res.status(result.status).json(result.body);
}
