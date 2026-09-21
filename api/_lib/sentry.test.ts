import { afterEach, describe, expect, it, vi } from "vitest";

const initMock = vi.hoisted(() => vi.fn());

vi.mock("@sentry/node", () => ({
  init: initMock,
  captureException: vi.fn(),
  flush: vi.fn(),
}));

describe("api/_lib/sentry", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    initMock.mockClear();
  });

  it("initializes Sentry with the DSN and environment from process.env", async () => {
    vi.stubEnv("SENTRY_DSN", "https://example@sentry.io/1");
    vi.stubEnv("VERCEL_ENV", "production");

    await import("./sentry.js");

    expect(initMock).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: "https://example@sentry.io/1",
        environment: "production",
        tracesSampleRate: 1,
      }),
    );
  });

  it('falls back to "development" when VERCEL_ENV is unset', async () => {
    vi.stubEnv("VERCEL_ENV", undefined);
    vi.stubEnv("SENTRY_DSN", undefined);

    await import("./sentry.js");

    expect(initMock).toHaveBeenCalledWith(expect.objectContaining({ environment: "development" }));
  });
});
