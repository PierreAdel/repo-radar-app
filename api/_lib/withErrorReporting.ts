import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Sentry } from "./sentry";

// Wraps a Vercel Function handler so an unhandled exception gets reported to
// Sentry and turned into a generic 500 instead of crashing the function with
// nothing logging it.
export function withErrorReporting(
  errorMessage: string,
  handler: (req: VercelRequest, res: VercelResponse) => Promise<void>,
) {
  return async (req: VercelRequest, res: VercelResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      Sentry.captureException(error);
      await Sentry.flush(2000);
      res.status(500).json({ status: 500, message: errorMessage });
      return;
    }
    await Sentry.flush(2000);
  };
}
