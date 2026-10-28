import React from 'react';
import { MemoryItem, MemoryConnection } from '../types/memory';
import { soundEngine } from '../audio/ambientSynth';
import { X, Calendar, MapPin, Tag, Users, AlertTriangle, Radio } from 'lucide-react';

interface MemoryInspectionModalProps {
  memory: MemoryItem | null;
  connections: MemoryConnection[];
  allMemories: MemoryItem[];
  onClose: () => void;
  onSelectRelated: (memId: string) => void;
}

export const MemoryInspectionModal: React.FC<MemoryInspectionModalProps> = ({
  memory,
  connections,
  allMemories,
  onClose,
  onSelectRelated
}) => {
  if (!memory) return null;

  const relatedConnections = connections.filter(
    (c) => c.sourceId === memory.id || c.targetId === memory.id
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-archival-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#14110E] border border-amber-600/40 rounded-lg shadow-2xl text-stone-200 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playCassetteClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          aria-label="Close archival fragment inspection"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Archival Accession Header */}
        <div className="flex items-center gap-3 text-xs font-mono text-amber-500/80 mb-2">
          <span>{memory.code}</span>
          <span aria-hidden="true">·</span>
          <span>Archived Year: {memory.year}</span>
          <span aria-hidden="true">·</span>
          <span className="uppercase text-stone-400">{memory.medium.replace('_', ' ')}</span>
        </div>

        <h2 id="modal-archival-title" className="text-2xl font-serif font-medium text-stone-100 mb-4">
          {memory.title}
        </h2>

        {/* Media Preview if photo / keepsake / letter */}
        {memory.imagePath && (
          <div className="relative mb-5 rounded overflow-hidden border border-amber-700/30 bg-stone-950 aspect-[16/9]">
            <img
              src={memory.imagePath}
              alt={memory.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter sepia-[0.2]"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('/assets/images/') && !target.src.includes('/src/assets/images/')) {
                  target.src = target.src.replace('/assets/images/', '/src/assets/images/');
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110E] via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Voice recording waveform if applicable */}
        {memory.medium === 'voice_recording' && (
          <div className="mb-5 p-4 rounded bg-[#0A0908] border border-[#26201B] flex items-center gap-4">
            <Radio className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-mono text-stone-400 mb-1">
                Microcassette Track • Duration {memory.recordingDuration || '02:44'}
              </div>
              <div className="flex items-end gap-1 h-8">
                {memory.audioWaveform?.map((val, i) => (
                  <div key={i} className="flex-1 bg-amber-500/60 rounded-xs" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Document Content / Transcription with aged paper feel */}
        <div className="p-4 rounded bg-[#1A1612] border border-[#2D231A] mb-5">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500/70 block mb-1">
            Archival Transcription
          </span>
          <p className="text-sm font-serif italic text-stone-200 leading-relaxed mb-3">
            “{memory.excerpt}”
          </p>
          <p className="text-xs text-stone-400 font-serif leading-relaxed">
            {memory.fullContent}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mb-5 border-t border-b border-[#26201B] py-3">
          <div className="flex items-center gap-2 text-stone-300">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>{memory.dateStr}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-300">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{memory.location}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-300">
            <Users className="w-4 h-4 text-amber-500" />
            <span>Participants: {memory.participants.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-300">
            <Tag className="w-4 h-4 text-amber-500" />
            <span>Tags: {memory.tags.join(', ')}</span>
          </div>
        </div>

        {/* Contradiction Warning */}
        {memory.contradictionNote && (
          <div className="mb-5 p-3 rounded bg-rose-950/20 border border-rose-800/40 flex items-start gap-2 text-xs text-rose-300 font-serif">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-mono uppercase text-[10px] tracking-wider block text-rose-400">
                Archival Contradiction Note:
              </strong>
              <span>{memory.contradictionNote}</span>
            </div>
          </div>
        )}

        {/* Related Interconnected Memories */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-500/80 mb-2">
            Interconnected Fragments ({relatedConnections.length})
          </h3>
          <div className="space-y-2">
            {relatedConnections.map((conn) => {
              const otherId = conn.sourceId === memory.id ? conn.targetId : conn.sourceId;
              const otherMem = allMemories.find((m) => m.id === otherId);
              if (!otherMem) return null;

              return (
                <div
                  key={conn.id}
                  onClick={() => {
                    soundEngine.playCassetteClick();
                    onSelectRelated(otherId);
                  }}
                  className="p-2.5 rounded bg-[#0F0D0B] border border-[#26201B] hover:border-amber-600/40 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase mr-2">
                      [{conn.type.replace('_', ' ')}]
                    </span>
                    <span className="text-xs font-serif text-stone-200">
                      {otherMem.title} ({otherMem.year})
                    </span>
                    <p className="text-[11px] text-stone-400 font-serif italic mt-0.5">
                      {conn.description}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-amber-500 ml-3">Inspect →</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
