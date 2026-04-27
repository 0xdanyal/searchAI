export interface Source {
  title: string;
  url: string;
}

export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
  sources?: Source[];
}

export interface ChatHistoryItem {
  role: MessageRole;
  content: string;
}

export interface SearchRequestBody {
  query: string;
  history?: ChatHistoryItem[];
}

export type StreamEvent =
  | { type: "sources"; sources: Source[] }
  | { type: "token"; text: string }
  | { type: "done" };
