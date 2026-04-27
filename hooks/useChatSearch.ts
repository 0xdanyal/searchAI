"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { parseSseBufferChunk } from "@/lib/chat/sse";
import type { ChatHistoryItem, Message, SearchRequestBody } from "@/lib/types/chat";

function toHistory(messages: Message[]): ChatHistoryItem[] {
  return messages
    .filter((message) => message.content.trim() !== "")
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));
}

export function useChatSearch() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const handleSearch = useCallback(
    async (nextQuery?: string) => {
      const searchQuery = (nextQuery || query).trim();
      if (!searchQuery || loading) return;

      setQuery("");
      setLoading(true);
      setSearching(true);

      const history = toHistory(messages);
      const userMessage: Message = { role: "user", content: searchQuery };

      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: "", sources: [] },
      ]);

      try {
        const body: SearchRequestBody = { query: searchQuery, history };
        const response = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const reader = response.body?.getReader();
        if (!reader) throw new Error("Missing response body");

        const decoder = new TextDecoder();
        let buffer = "";
        setSearching(false);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const { nextBuffer, events } = parseSseBufferChunk(buffer);
          buffer = nextBuffer;

          for (const event of events) {
            if (event.type === "sources") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = { ...last, sources: event.sources };
                return updated;
              });
            }

            if (event.type === "token") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + event.text,
                };
                return updated;
              });
            }

            if (event.type === "done") {
              setLoading(false);
            }
          }
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            content: "Something went wrong. Please try again.",
          };
          return updated;
        });
      } finally {
        setLoading(false);
        setSearching(false);
      }
    },
    [loading, messages, query],
  );

  return {
    bottomRef,
    clearChat,
    handleSearch,
    inputRef,
    loading,
    messages,
    query,
    searching,
    setQuery,
  };
}
