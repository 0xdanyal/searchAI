"use client";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInputBar } from "@/components/chat/ChatInputBar";
import { EmptyState } from "@/components/chat/EmptyState";
import { MessageList } from "@/components/chat/MessageList";
import { useChatSearch } from "@/hooks/useChatSearch";
import { SUGGESTIONS } from "@/lib/chat/constants";

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

  const isEmpty = messages.length === 0;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <ChatHeader hasMessages={messages.length > 0} onNewChat={clearChat} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {isEmpty && (
            <EmptyState suggestions={SUGGESTIONS} onSuggestionClick={handleSearch} />
          )}
          <MessageList loading={loading} messages={messages} searching={searching} />

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
    </main>
  );
}