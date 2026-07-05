import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { getChatContext } from "@/lib/chat-context";
import { buildSystemPrompt } from "@/lib/chat-prompt";
import { getChatModel } from "@/lib/llm";
import { checkRateLimit } from "@/lib/rate-limit";

/*
 *  POST /api/chat
 *  ──────────────
 *   body: { messages: UIMessage[] }        (sent by useChat)
 *     │
 *     ├─ rate-limit per IP ── blocked ──► 429 { type: "rate_limit" }
 *     ├─ assemble CONTEXT (cached)
 *     ├─ streamText({ model, system: policy+CONTEXT, messages })
 *     └─ SSE UI-message stream ──► useChat renders tokens live
 *
 *  Node runtime (fs access + provider SDK), always dynamic (per-request).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "anonymous";
}

export async function POST(req: Request) {
  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "no_messages" }, { status: 400 });
  }

  const rateLimit = await checkRateLimit(clientIp(req));
  if (!rateLimit.success) {
    return Response.json(
      {
        type: "rate_limit",
        message: "That's a lot of questions. Give it a minute, or reach Alfara directly at nafidinara@gmail.com.",
      },
      { status: 429 },
    );
  }

  const result = streamText({
    model: getChatModel(),
    system: buildSystemPrompt(getChatContext()),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 600,
    temperature: 0.4,
    onError: ({ error }) => {
      console.error("[api/chat] stream error", error);
    },
  });

  return result.toUIMessageStreamResponse({
    onError: () =>
      "I glitched mid-answer. You can reach Alfara directly at nafidinara@gmail.com.",
  });
}
