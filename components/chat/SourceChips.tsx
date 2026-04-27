import { getDomainFromUrl } from "@/lib/chat/format";
import type { Source } from "@/lib/types/chat";

interface SourceChipsProps {
  sources: Source[];
}

export function SourceChips({ sources }: SourceChipsProps) {
  if (sources.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source, index) => (
        <a
          key={`${source.url}-${index}`}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-white/50 hover:text-white/80 transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="truncate max-w-[140px]">{getDomainFromUrl(source.url)}</span>
        </a>
      ))}
    </div>
  );
}
