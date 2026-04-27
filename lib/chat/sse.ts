import type { StreamEvent } from "@/lib/types/chat";

export function parseSseBufferChunk(buffer: string): {
  nextBuffer: string;
  events: StreamEvent[];
} {
  const lines = buffer.split("\n");
  const nextBuffer = lines.pop() || "";
  const events: StreamEvent[] = [];

  for (const line of lines) {
    if (!line.startsWith("data: ")) continue;

    const raw = line.slice(6).trim();
    if (!raw || raw === "[DONE]") continue;

    try {
      const parsed = JSON.parse(raw) as StreamEvent;
      events.push(parsed);
    } catch {
      // Ignore malformed SSE payloads.
    }
  }

  return { nextBuffer, events };
}
