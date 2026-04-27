import { getDomainFromUrl } from "@/lib/chat/format";
import type { Source } from "@/lib/types/chat";

interface SourceCardsProps {
  sources: Source[];
}

export function SourceCards({ sources }: SourceCardsProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <p className="text-xs text-white/25 uppercase tracking-widest mb-3">Sources</p>
      <div className="grid grid-cols-1 gap-2">
        {sources.map((source, index) => (
          <a
            key={`${source.url}-${index}`}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/8 rounded-xl transition-all group"
          >
            <div className="overflow-hidden">
              <p className="text-sm text-white/60 group-hover:text-white/85 truncate transition-all">
                {source.title}
              </p>
              <p className="text-xs text-white/25 truncate mt-0.5">
                {getDomainFromUrl(source.url)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
