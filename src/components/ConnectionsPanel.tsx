import React from 'react';
import { MemoryConnection, MemoryItem } from '../types/memory';
import { soundEngine } from '../audio/ambientSynth';
import { GitCommit, AlertTriangle, Flower2, Clock, GitMerge, ExternalLink } from 'lucide-react';

interface ConnectionsPanelProps {
  connections: MemoryConnection[];
  memories: MemoryItem[];
  selectedMemoryId: string | null;
  onSelectConnection: (connection: MemoryConnection) => void;
  onCompareMemories: (source: MemoryItem, target: MemoryItem, conn: MemoryConnection) => void;
}

const TYPE_CONFIG = {
  contradiction: {
    label: 'Contradiction Detected',
    icon: AlertTriangle,
    color: 'text-rose-400',
    borderColor: 'border-rose-900/40',
    bgColor: 'bg-rose-950/20'
  },
  shared_motif: {
    label: 'Shared Motif Link',
    icon: Flower2,
    color: 'text-amber-400',
    borderColor: 'border-amber-900/40',
    bgColor: 'bg-amber-950/20'
  },
  temporal_drift: {
    label: 'Temporal Drift (7-Yr)',
    icon: Clock,
    color: 'text-amber-300',
    borderColor: 'border-amber-800/40',
    bgColor: 'bg-amber-950/20'
  },
  voice_shift: {
    label: 'Acoustic Shift',
    icon: GitCommit,
    color: 'text-amber-200',
    borderColor: 'border-amber-700/40',
    bgColor: 'bg-stone-900/40'
  },
  recurring_anchor: {
    label: 'Recurring Anchor',
    icon: GitMerge,
    color: 'text-stone-300',
    borderColor: 'border-stone-700/40',
    bgColor: 'bg-stone-900/40'
  }
};

export const ConnectionsPanel: React.FC<ConnectionsPanelProps> = ({
  connections,
  memories,
  selectedMemoryId,
  onSelectConnection,
  onCompareMemories
}) => {
  const getMemory = (id: string) => memories.find((m) => m.id === id);

  return (
    <aside
      aria-label="Connections Found panel"
      className="flex flex-col h-full w-full bg-[#12100E]/95 border-l border-[#2C241E] backdrop-blur-md"
    >
      {/* Panel Header */}
      <div className="p-4 border-b border-[#2C241E] bg-[#171411]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-serif uppercase tracking-widest text-stone-200">
              Connections Found
            </h2>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            {connections.length} Neural Links
          </span>
        </div>
        <p className="mt-1.5 text-xs text-stone-400 font-serif italic">
          Offline cross-temporal archaeology detected subconscious linkages and narrative drift.
        </p>
      </div>

      {/* Connections List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-stone-800">
        {connections.map((conn) => {
          const config = TYPE_CONFIG[conn.type] || TYPE_CONFIG.shared_motif;
          const Icon = config.icon;
          const source = getMemory(conn.sourceId);
          const target = getMemory(conn.targetId);

          const isHighlighted = selectedMemoryId === conn.sourceId || selectedMemoryId === conn.targetId;

          return (
            <article
              key={conn.id}
              onClick={() => {
                soundEngine.playCassetteClick();
                onSelectConnection(conn);
              }}
              className={`rounded p-3 transition-all cursor-pointer border ${
                isHighlighted
                  ? 'bg-[#1C1713] border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30'
                  : 'bg-[#15120F]/90 border-[#26201B] hover:border-amber-700/40 hover:bg-[#191512]'
              }`}
            >
              {/* Type Header & Confidence */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                  <span className={`font-mono text-[11px] uppercase tracking-wider ${config.color}`}>
                    {config.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono tabular-nums text-stone-400">
                  {conn.confidence}% Conf.
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xs font-serif font-semibold text-stone-100 group-hover:text-amber-200 leading-snug">
                {conn.title}
              </h3>

              {/* Source -> Target Nodes Flow */}
              {source && target && (
                <div className="mt-2 p-2 rounded bg-[#0A0908] border border-[#221B16] flex items-center justify-between text-[11px] font-mono text-stone-300">
                  <div className="flex flex-col">
                    <span className="text-amber-500/70 text-[9px] uppercase">{source.year}</span>
                    <span className="truncate max-w-[90px] text-stone-200">{source.code}</span>
                  </div>
                  <div className="text-stone-500 font-mono text-xs px-2">⟷</div>
                  <div className="flex flex-col text-right">
                    <span className="text-amber-500/70 text-[9px] uppercase">{target.year}</span>
                    <span className="truncate max-w-[90px] text-stone-200">{target.code}</span>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="mt-2 text-xs text-stone-300/80 font-serif leading-relaxed italic">
                {conn.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-2.5 pt-2 border-t border-[#221B16] flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-400">
                  Span: {source && target ? Math.abs(target.year - source.year) : 0} yrs
                </span>
                {source && target && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playCassetteClick();
                      onCompareMemories(source, target, conn);
                    }}
                    className="flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-200 hover:underline"
                  >
                    <span>Cross-Examine</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
};
