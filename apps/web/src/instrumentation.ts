// @sentry/react is the single largest chunk in the app (~95KB, bigger than
// React itself). Loading it statically from the entry point blocks first
// paint, so this is dynamically imported and initialized on demand instead -
// see main.tsx (idle-time warmup) and AppErrorBoundary (crash-triggered
// fallback if a crash happens before idle time). Memoized so both callers
// share the same in-flight/completed init rather than racing each other.
let sentryPromise: Promise<typeof import("@sentry/react")> | null = null;

export function loadSentry() {
  if (!sentryPromise) {
    sentryPromise = import("@sentry/react").then((Sentry) => {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.MODE,
        integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
      return Sentry;
    });
  }
  return sentryPromise;
}
