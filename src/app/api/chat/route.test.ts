import { beforeEach, describe, expect, it, vi } from "vitest";

const { streamTextMock, toResponseMock, checkRateLimitMock } = vi.hoisted(() => ({
  streamTextMock: vi.fn(),
  toResponseMock: vi.fn(() => new Response("stream", { status: 200 })),
  checkRateLimitMock: vi.fn(),
}));

vi.mock("ai", () => ({
  streamText: (...args: unknown[]) => {
    streamTextMock(...args);
    return { toUIMessageStreamResponse: toResponseMock };
  },
  convertToModelMessages: (m: unknown) => m,
}));

vi.mock("@/lib/llm", () => ({ getChatModel: () => "mock-model" }));
vi.mock("@/lib/chat-context", () => ({ getChatContext: () => "CONTEXT" }));
vi.mock("@/lib/chat-prompt", () => ({ buildSystemPrompt: (c: string) => `SYSTEM:${c}` }));
vi.mock("@/lib/rate-limit", () => ({ checkRateLimit: checkRateLimitMock }));

import { POST } from "./route";

function post(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const oneMessage = [{ id: "1", role: "user", parts: [{ type: "text", text: "hi" }] }];

describe("POST /api/chat", () => {
  beforeEach(() => {
    streamTextMock.mockClear();
    toResponseMock.mockClear();
    checkRateLimitMock.mockReset();
    checkRateLimitMock.mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: 0 });
  });

  it("400s on invalid JSON", async () => {
    const res = await POST(post("not json{"));
    expect(res.status).toBe(400);
  });

  it("400s when messages are missing or empty", async () => {
    expect((await POST(post({ messages: [] }))).status).toBe(400);
    expect((await POST(post({}))).status).toBe(400);
  });

  it("429s when the rate limiter blocks", async () => {
    checkRateLimitMock.mockResolvedValue({ success: false, limit: 5, remaining: 0, reset: 1000 });
    const res = await POST(post({ messages: oneMessage }));
    expect(res.status).toBe(429);
    expect(await res.json()).toMatchObject({ type: "rate_limit" });
    expect(streamTextMock).not.toHaveBeenCalled();
  });

  it("streams with the system prompt built from context", async () => {
    const res = await POST(post({ messages: oneMessage }));
    expect(res.status).toBe(200);
    expect(streamTextMock).toHaveBeenCalledTimes(1);
    const call = streamTextMock.mock.calls[0][0] as { system: string; model: string };
    expect(call.system).toBe("SYSTEM:CONTEXT");
    expect(call.model).toBe("mock-model");
    expect(toResponseMock).toHaveBeenCalled();
  });

  it("uses the first x-forwarded-for hop as the rate-limit key", async () => {
    await POST(post({ messages: oneMessage }, { "x-forwarded-for": "9.9.9.9, 10.0.0.1" }));
    expect(checkRateLimitMock).toHaveBeenCalledWith("9.9.9.9");
  });
});
