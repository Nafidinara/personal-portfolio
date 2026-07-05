import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * Provider-agnostic LLM factory.
 *
 * The model is driven entirely by env so the provider can be swapped without a
 * code change:
 *
 *   OpenRouter: LLM_BASE_URL=https://openrouter.ai/api/v1  LLM_MODEL=anthropic/claude-haiku-4.5
 *   Groq:       LLM_BASE_URL=https://api.groq.com/openai/v1 LLM_MODEL=llama-3.3-70b-versatile
 *
 * Any OpenAI-compatible /v1 endpoint works. Keys live server-side only.
 */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

let provider: ReturnType<typeof createOpenAICompatible> | null = null;

export function getChatModel() {
  if (!provider) {
    provider = createOpenAICompatible({
      name: "portfolio-llm",
      baseURL: required("LLM_BASE_URL"),
      apiKey: required("LLM_API_KEY"),
    });
  }
  return provider(required("LLM_MODEL"));
}

/** Test hook: clear the memoized provider so env changes take effect. */
export function resetLlmForTest() {
  provider = null;
}
