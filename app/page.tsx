"use client";
import { useState } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInputBar } from "@/components/chat/ChatInputBar";
import { EmptyState } from "@/components/chat/EmptyState";
import { MessageList } from "@/components/chat/MessageList";
import { SourcesDrawer } from "@/components/chat/SourcesDrawer";
import { useChatSearch } from "@/hooks/useChatSearch";
import { SUGGESTIONS } from "@/lib/chat/constants";
import type { Source } from "@/lib/types/chat";

export default function Home() {
  const {
    bottomRef,
    clearChat,
    handleSearch,
    inputRef,
    loading,
    messages,
    query,
    searching,
    setQuery,
  } = useChatSearch();
  const [sourcesPanelOpen, setSourcesPanelOpen] = useState(false);
  const [activeSources, setActiveSources] = useState<Source[]>([]);
  const [activeSourceQuery, setActiveSourceQuery] = useState("");

  const isEmpty = messages.length === 0;
  const openSourcesPanel = (messageIndex: number) => {
    const message = messages[messageIndex];
    if (!message?.sources?.length) return;

    const userPrompt =
      [...messages.slice(0, messageIndex)].reverse().find((msg) => msg.role === "user")
        ?.content || "this answer";

    setActiveSources(message.sources);
    setActiveSourceQuery(userPrompt);
    setSourcesPanelOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <ChatHeader hasMessages={messages.length > 0} onNewChat={clearChat} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {isEmpty && (
            <EmptyState suggestions={SUGGESTIONS} onSuggestionClick={handleSearch} />
          )}
          <MessageList
            loading={loading}
            messages={messages}
            searching={searching}
            onOpenSources={openSourcesPanel}
          />

          <div ref={bottomRef} />
        </div>
      </div>

      <ChatInputBar
        inputRef={inputRef}
        loading={loading}
        onSearch={() => handleSearch()}
        query={query}
        setQuery={setQuery}
      />

      <SourcesDrawer
        open={sourcesPanelOpen}
        onClose={() => setSourcesPanelOpen(false)}
        sources={activeSources}
        query={activeSourceQuery}
      />
    </main>
  );
}