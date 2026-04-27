interface ChatHeaderProps {
  hasMessages: boolean;
  onNewChat: () => void;
}

export function ChatHeader({ hasMessages, onNewChat }: ChatHeaderProps) {
  return (
    <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <span className="text-lg font-semibold tracking-tight">
        search<span className="text-emerald-400">ai</span>
      </span>
      {hasMessages && (
        <button
          onClick={onNewChat}
          className="text-xs text-white/30 hover:text-white/60 transition-all"
        >
          New chat
        </button>
      )}
    </nav>
  );
}
