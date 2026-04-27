import { formatAnswerHtml } from "@/lib/chat/format";
import type { Message } from "@/lib/types/chat";

interface MessageListProps {
  loading: boolean;
  messages: Message[];
  onOpenSources: (index: number) => void;
  searching: boolean;
}

export function MessageList({
  loading,
  messages,
  onOpenSources,
  searching,
}: MessageListProps) {
  return (
    <>
      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`} className="mb-6">
          {message.role === "user" ? (
            <div className="flex justify-end mb-2">
              <div className="bg-emerald-500/15 border border-emerald-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                <p className="text-sm text-white/90">{message.content}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {searching && index === messages.length - 1 && (
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <div className="w-3 h-3 border border-white/20 border-t-emerald-400 rounded-full animate-spin" />
                  Searching the web...
                </div>
              )}

              {message.content && (
                <div className="text-sm text-white/85 leading-relaxed">
                  <p
                    dangerouslySetInnerHTML={{ __html: formatAnswerHtml(message.content) }}
                    className="[&_strong]:text-white [&_p]:mb-3"
                  />
                </div>
              )}

              {loading && index === messages.length - 1 && message.content && (
                <span className="inline-block w-1.5 h-4 bg-emerald-400 animate-pulse rounded-sm ml-0.5 align-middle" />
              )}

              {!loading && (message.sources?.length || 0) > 0 && (
                <button
                  onClick={() => onOpenSources(index)}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1.5 text-sm font-medium text-emerald-200 hover:bg-emerald-400/20 hover:border-emerald-300/60 transition-colors"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                  {message.sources?.length} sources
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
