// Duplicated from packages/core/src/utils/validation.ts rather than imported
// from @repo-radar/core: that package has no build step (its "exports"
// points straight at raw .ts source, fine for Vite-based consumers like
// apps/web, but Vercel Functions run plain compiled Node.js with no
// transpilation layer, so importing it here crashes at runtime with
// ERR_MODULE_NOT_FOUND). api/_lib/githubProxy.ts already only imports
// *types* from @repo-radar/core for the same reason - this keeps that same
// convention rather than being the one runtime-value exception to it.
const FULL_NAME_PATTERN = /^(?!\.\.?\/)[^/]+\/(?!\.\.?$)[^/]+$/;

export function isValidRepoFullName(value: string): boolean {
  return FULL_NAME_PATTERN.test(value);
}
