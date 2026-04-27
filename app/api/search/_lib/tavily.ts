import type { TavilyResult } from "./types";

const TAVILY_URL = "https://api.tavily.com/search";

export async function searchWeb(query: string): Promise<TavilyResult[]> {
  const response = await fetch(TAVILY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      search_depth: "basic",
      max_results: 6,
    }),
  });

  const payload: { results?: TavilyResult[] } = await response.json();
  return payload.results || [];
}

export function buildWebContext(sources: TavilyResult[]): string {
  return sources
    .map((source, index) => `[${index + 1}] ${source.title}\n${source.content}`)
    .join("\n\n");
}
