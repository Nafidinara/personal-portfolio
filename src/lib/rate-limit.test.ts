import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const limitMock = vi.fn();

vi.mock("@upstash/redis", () => ({
  Redis: class {
    // no-op stub
  },
}));

vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: Object.assign(
    class {
      limit = limitMock;
    },
    { slidingWindow: () => ({}) },
  ),
}));

import { checkRateLimit, resetRateLimitForTest } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimitForTest();
    limitMock.mockReset();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  afterEach(() => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    resetRateLimitForTest();
  });

  it("allows everything when Upstash env is absent (local dev no-op)", async () => {
    const result = await checkRateLimit("1.2.3.4");
    expect(result.success).toBe(true);
    expect(limitMock).not.toHaveBeenCalled();
  });

  it("blocks when the Upstash limiter reports over-limit", async () => {
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token";
    resetRateLimitForTest();
    limitMock.mockResolvedValue({ success: false, limit: 5, remaining: 0, reset: 1000 });

    const result = await checkRateLimit("1.2.3.4");
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
    expect(limitMock).toHaveBeenCalledWith("1.2.3.4");
  });
});
