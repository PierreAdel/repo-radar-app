import { withErrorReporting } from "../_lib/withErrorReporting";
import { getRepository } from "../_lib/githubProxy";

export default withErrorReporting("Unexpected error fetching repository.", async (req, res) => {
  const fullName = typeof req.query.fullName === "string" ? req.query.fullName : "";
  if (!fullName) {
    res.status(400).json({ status: 400, message: "Missing fullName query param." });
    return;
  }

  const result = await getRepository(fullName, process.env.GITHUB_TOKEN);
  res.status(result.status).json(result.body);
});
