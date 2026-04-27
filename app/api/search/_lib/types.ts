import type { ChatHistoryItem } from "@/lib/types/chat";

export interface SearchApiRequest {
  query: string;
  history?: ChatHistoryItem[];
}

export interface TavilyResult {
  title: string;
  content: string;
  url: string;
}
