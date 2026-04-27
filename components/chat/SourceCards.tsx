import { getDomainFromUrl } from "@/lib/chat/format";
import type { Source } from "@/lib/types/chat";

interface SourceCardsProps {
  sources: Source[];
}

export function SourceCards({ sources }: SourceCardsProps) {
  if (sources.length === 0) return null;

  const visibleSources = sources.slice(0, 3);
  const hiddenCount = sources.length - visibleSources.length;

  return (
    <div className="mt-3 pt-3 border-t border-white/5">
      <p className="text-[10px] text-white/25 uppercase tracking-[0.2em] mb-2">Sources</p>
      <div className="grid grid-cols-1 gap-1.5">
        {visibleSources.map((source, index) => (
          <a
            key={`${source.url}-${index}`}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 p-2 bg-white/3 hover:bg-white/6 border border-white/8 rounded-lg transition-all group"
          >
            <div className="overflow-hidden">
              <p className="text-xs text-white/60 group-hover:text-white/85 truncate transition-all">
                {source.title}
              </p>
              <p className="text-[11px] text-white/25 truncate mt-0.5">
                {getDomainFromUrl(source.url)}
              </p>
            </div>
          </a>
        ))}
      </div>
      {hiddenCount > 0 && (
        <p className="text-[11px] text-white/35 mt-2">+{hiddenCount} more sources</p>
      )}
    </div>
  );
}
