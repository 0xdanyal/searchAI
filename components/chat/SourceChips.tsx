import { getDomainFromUrl } from "@/lib/chat/format";
import type { Source } from "@/lib/types/chat";

interface SourceChipsProps {
  sources: Source[];
}

export function SourceChips({ sources }: SourceChipsProps) {
  if (sources.length === 0) return null;

  const visibleSources = sources.slice(0, 4);
  const hiddenCount = sources.length - visibleSources.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleSources.map((source, index) => (
        <a
          key={`${source.url}-${index}`}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] leading-none bg-white/4 hover:bg-white/8 border border-white/10 rounded-full px-2.5 py-1 text-white/55 hover:text-white/85 transition-all"
        >
          <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="truncate max-w-[110px]">{getDomainFromUrl(source.url)}</span>
        </a>
      ))}
      {hiddenCount > 0 && (
        <span className="text-[11px] leading-none bg-white/3 border border-white/8 rounded-full px-2.5 py-1 text-white/40">
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
}
