import { getDomainFromUrl } from "@/lib/chat/format";
import type { Source } from "@/lib/types/chat";

interface SourcesDrawerProps {
  onClose: () => void;
  open: boolean;
  query: string;
  sources: Source[];
}

export function SourcesDrawer({ onClose, open, query, sources }: SourcesDrawerProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close sources panel"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      <aside className="fixed right-0 top-0 h-full w-full sm:w-[460px] bg-[#101010] border-l border-white/10 z-50 flex flex-col shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
            {sources.length} sources
          </h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white/85 transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto">
          <p className="text-white/50 text-sm mb-4">Sources for &quot;{query}&quot;</p>
          <div className="space-y-3">
            {sources.map((source, index) => (
              <a
                key={`${source.url}-${index}`}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.06] transition-colors"
              >
                <p className="text-sm text-white/90 leading-snug">{source.title}</p>
                <p className="text-xs text-white/40 mt-1">{getDomainFromUrl(source.url)}</p>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
