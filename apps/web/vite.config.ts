import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { searchRepositories, getRepository } from "../../api/_lib/githubProxy";

const repoRoot = path.resolve(__dirname, "../..");

// Mirrors the /api/github/* Vercel Functions locally so `pnpm dev` works without the Vercel CLI.
function githubApiDevProxyPlugin(githubToken?: string): Plugin {
  return {
    name: "github-api-dev-proxy",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) {
          next();
          return;
        }
        const url = new URL(req.url, "http://localhost");

        if (url.pathname === "/api/github/search") {
          const query = url.searchParams.get("q") ?? "";
          const page = Number(url.searchParams.get("page") ?? 1) || 1;
          const result = await searchRepositories(query, page, githubToken);
          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.body));
          return;
        }

        if (url.pathname === "/api/github/repo") {
          const fullName = url.searchParams.get("fullName") ?? "";
          if (!fullName) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ status: 400, message: "Missing fullName query param." }));
            return;
          }
          const result = await getRepository(fullName, githubToken);
          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.body));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, "");
  return {
    envDir: repoRoot,
    plugins: [react(), githubApiDevProxyPlugin(env.GITHUB_TOKEN)],
  };
});
