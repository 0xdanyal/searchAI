interface EmptyStateProps {
  suggestions: string[];
  onSuggestionClick: (value: string) => void;
}

export function EmptyState({ suggestions, onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="text-center mt-20 mb-10">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Ask anything.</h1>
      <p className="text-white/40 text-base">Get answers from the live web, with sources.</p>
      <div className="flex flex-wrap gap-2 justify-center mt-8">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-white/50 hover:text-white/80 transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
