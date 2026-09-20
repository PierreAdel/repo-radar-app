import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { searchRepositories, getRepository } from "../../api/_lib/githubProxy";

const repoRoot = path.resolve(__dirname, "../..");

// Groups for manualChunks below, checked in order. @mui/x-charts and its d3-*
// dependencies are deliberately not listed here, so they stay in
// StarsChartCard's existing lazy/dynamic-import chunk instead of being
// pulled into one of these, which load on every page.
const vendorChunks: [name: string, pattern: RegExp][] = [
  ["vendor-sentry", /@sentry/],
  ["vendor-mui", /@mui|@emotion|@popperjs|\/stylis\/|react-transition-group/],
  ["vendor-redux", /@reduxjs|react-redux|\/redux\/|\/immer\/|\/reselect\//],
  ["vendor-router", /react-router/],
  ["vendor-react", /\/react\/|\/react-dom\/|\/scheduler\//],
];

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
    plugins: [
      react(),
      githubApiDevProxyPlugin(env.GITHUB_TOKEN),
      // Opt-in bundle breakdown: `ANALYZE=1 pnpm build` writes
      // dist/bundle-analysis.html instead of affecting every normal build.
      process.env.ANALYZE
        ? visualizer({
            filename: "dist/bundle-analysis.html",
            gzipSize: true,
            brotliSize: true,
            template: "treemap",
          })
        : null,
    ],
    build: {
      rollupOptions: {
        output: {
          // Splits the previously-monolithic main chunk into vendor groups
          // that change at different rates, so a deploy that only touches
          // app code doesn't invalidate the browser's cache of React, MUI,
          // etc. too. Groups picked by measuring apps/web/dist/assets/index-*.js
          // with ANALYZE=1.
          manualChunks(id) {
            if (
              !id.includes("node_modules") ||
              id.includes("@mui/x-charts") ||
              id.includes("/d3-")
            ) {
              return undefined;
            }
            return vendorChunks.find(([, pattern]) => pattern.test(id))?.[0] ?? "vendor";
          },
        },
      },
    },
  };
});
