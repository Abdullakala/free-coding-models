import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, model, agent } = await req.json();

  // Build system prompt based on agent
  let systemPrompt =
    "You are a helpful AI coding assistant. Provide clear, accurate, and well-formatted responses. Use markdown for code blocks and formatting.";

  if (agent?.systemPrompt) {
    systemPrompt = agent.systemPrompt;
  }

  // Use the model's API ID or default to llama
  const modelId = model?.apiId || "groq/llama-3.3-70b-versatile";

  // Use Vercel AI Gateway (zero-config) instead of direct Groq SDK
  const result = streamText({
    model: modelId,
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
