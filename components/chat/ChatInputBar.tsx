import type { RefObject } from "react";

interface ChatInputBarProps {
  inputRef: RefObject<HTMLInputElement | null>;
  loading: boolean;
  onSearch: () => void;
  query: string;
  setQuery: (value: string) => void;
}

export function ChatInputBar({
  inputRef,
  loading,
  onSearch,
  query,
  setQuery,
}: ChatInputBarProps) {
  return (
    <div className="border-t border-white/5 px-4 py-4 flex-shrink-0">
      <div className="max-w-2xl mx-auto flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSearch()}
          placeholder={loading ? "Thinking..." : "Ask a follow-up..."}
          disabled={loading}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-400/50 transition-all placeholder:text-white/25 disabled:opacity-50"
        />
        <button
          onClick={onSearch}
          disabled={loading || !query.trim()}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black font-semibold px-5 py-3 rounded-xl text-sm transition-all"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            "↑"
          )}
        </button>
      </div>
    </div>
  );
}
