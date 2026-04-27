import { NextRequest } from "next/server";
import { createAnswerStream } from "./_lib/groq";
import { createSseResponse } from "./_lib/sse";
import { buildWebContext, searchWeb } from "./_lib/tavily";
import type { SearchApiRequest } from "./_lib/types";
import type { ChatHistoryItem } from "@/lib/types/chat";

export async function POST(req: NextRequest) {
  const { query, history }: SearchApiRequest = await req.json();

  if (!query) {
    return Response.json({ error: "Query is required" }, { status: 400 });
  }

  const sources = await searchWeb(query);
  const context = buildWebContext(sources);
  const stream = await createAnswerStream({
    query,
    context,
    history: history || ([] as ChatHistoryItem[]),
  });

  return createSseResponse(async ({ send, close }) => {
    send({ type: "sources", sources });

    let lastToken = "";
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text && text !== lastToken) {
        lastToken = text;
        send({ type: "token", text });
      }
    }

    send({ type: "done" });
    close();
  });
}