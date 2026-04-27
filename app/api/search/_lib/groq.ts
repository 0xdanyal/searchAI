import Groq from "groq-sdk";
import type { ChatHistoryItem } from "@/lib/types/chat";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a helpful AI assistant like Perplexity. You remember the full conversation.
Answer using the web results provided for the latest question.
Write in clean prose. Do NOT use inline citation numbers like [1] or [2].
Be conversational, clear, and concise.`;

export async function createAnswerStream(input: {
  query: string;
  context: string;
  history: ChatHistoryItem[];
}) {
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...input.history,
    {
      role: "user" as const,
      content: `${input.query}\n\nWeb results:\n${input.context}`,
    },
  ];

  return groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    stream: true,
    messages,
  });
}
