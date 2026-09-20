import { withErrorReporting } from "../_lib/withErrorReporting";
import { searchRepositories } from "../_lib/githubProxy";

export default withErrorReporting("Unexpected error searching repositories.", async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const page = Number(req.query.page ?? 1) || 1;

  const result = await searchRepositories(query, page, process.env.GITHUB_TOKEN);
  res.status(result.status).json(result.body);
});
