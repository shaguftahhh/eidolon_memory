import React, { useState } from 'react';
import { MemoryItem, MemoryMedium } from '../types/memory';
import { soundEngine } from '../audio/ambientSynth';
import { 
  Camera, 
  FileText, 
  Radio, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Play, 
  Pause,
  AlertCircle
} from 'lucide-react';

interface TimelinePanelProps {
  memories: MemoryItem[];
  selectedMemoryId: string | null;
  onSelectMemory: (id: string) => void;
  onOpenDetails: (memory: MemoryItem) => void;
}

const MEDIUM_ICONS: Record<MemoryMedium, React.ElementType> = {
  photograph: Camera,
  letter: FileText,
  voice_recording: Radio,
  keepsake: Sparkles,
  diary_fragment: BookOpen
};

export const TimelinePanel: React.FC<TimelinePanelProps> = ({
  memories,
  selectedMemoryId,
  onSelectMemory,
  onOpenDetails
}) => {
  const [activeEra, setActiveEra] = useState<string>('all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const eras = ['all', '1994', '1998', '2002', '2008', '2015'];

  const filteredMemories = memories.filter((m) => {
    if (activeEra === 'all') return true;
    return m.year.toString() === activeEra;
  });

  const handleAudioToggle = (e: React.MouseEvent, memId: string) => {
    e.stopPropagation();
    soundEngine.playCassetteClick();

    if (playingAudioId === memId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(memId);
      soundEngine.playMemoryRecallChime(320);
    }
  };

  return (
    <aside
      aria-label="Chronological memory timeline"
      className="flex flex-col h-full w-full bg-[#12100E]/95 border-r border-[#2C241E] backdrop-blur-md"
    >
      {/* Panel Header */}
      <div className="p-4 border-b border-[#2C241E] bg-[#171411]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-serif uppercase tracking-widest text-stone-200">
              Chronological Timeline
            </h2>
          </div>
          <span className="text-[11px] font-mono text-stone-400">
            {filteredMemories.length} / {memories.length} Fragments
          </span>
        </div>

        {/* Era Navigation Segmented Filter (Compliant with Zero-Pill Interactive Button Rules) */}
        <div className="flex items-center gap-1 mt-3 p-1 bg-[#0A0908] rounded border border-[#221B16] overflow-x-auto">
          {eras.map((era) => {
            const isActive = activeEra === era;
            return (
              <button
                key={era}
                onClick={() => {
                  soundEngine.playCassetteClick();
                  setActiveEra(era);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-[#1E1915]'
                }`}
              >
                {era === 'all' ? 'All Eras' : era}
              </button>
            );
          })}
        </div>
      </div>

      {/* Memory List Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-stone-800">
        {filteredMemories.map((mem) => {
          const isSelected = selectedMemoryId === mem.id;
          const IconComponent = MEDIUM_ICONS[mem.medium];
          const isPlayingAudio = playingAudioId === mem.id;

          return (
            <article
              key={mem.id}
              onClick={() => {
                soundEngine.playCassetteClick();
                onSelectMemory(mem.id);
              }}
              className={`group relative rounded p-3 transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#1C1713] border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40'
                  : 'bg-[#15120F]/90 border-[#26201B] hover:border-amber-700/40 hover:bg-[#191512]'
              }`}
            >
              {/* Accession & Year metadata (clean unboxed text per constitution) */}
              <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5 font-mono">
                <span className="text-amber-500/80">{mem.code}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-300 font-serif italic">{mem.year}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize text-stone-400">{mem.medium.replace('_', ' ')}</span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-serif font-medium text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                {mem.title}
              </h3>

              {/* Optional Archival Image Preview */}
              {mem.imagePath && (
                <div className="relative mt-2 rounded overflow-hidden aspect-[16/10] bg-stone-950 border border-stone-800/80">
                  <img
                    src={mem.imagePath}
                    alt={mem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter sepia-[0.25] contrast-[1.05]"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/assets/images/') && !target.src.includes('/src/assets/images/')) {
                        target.src = target.src.replace('/assets/images/', '/src/assets/images/');
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] text-stone-300 font-mono">
                    <span className="truncate">{mem.location}</span>
                  </div>
                </div>
              )}

              {/* Audio Waveform Scrubber if voice recording */}
              {mem.medium === 'voice_recording' && mem.audioWaveform && (
                <div className="mt-2.5 p-2 rounded bg-[#0D0B0A] border border-[#26201B]">
                  <div className="flex items-center justify-between mb-1.5">
                    <button
                      onClick={(e) => handleAudioToggle(e, mem.id)}
                      className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-amber-300 bg-amber-950/40 border border-amber-600/30 rounded hover:bg-amber-900/40 transition-colors"
                      aria-label={isPlayingAudio ? 'Pause cassette audio' : 'Play cassette audio'}
                    >
                      {isPlayingAudio ? <Pause className="w-3 h-3 fill-amber-300" /> : <Play className="w-3 h-3 fill-amber-300" />}
                      <span>{isPlayingAudio ? 'PAUSE TAPE' : 'PLAY TAPE'}</span>
                    </button>
                    <span className="text-[10px] font-mono text-stone-400">
                      {mem.recordingDuration || '02:44'}
                    </span>
                  </div>

                  {/* Visual Waveform bars */}
                  <div className="flex items-end gap-[2px] h-6 px-1">
                    {mem.audioWaveform.map((val, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 transition-all duration-300 rounded-xs ${
                          isPlayingAudio
                            ? 'bg-amber-400 animate-pulse'
                            : 'bg-stone-600 group-hover:bg-amber-600/60'
                        }`}
                        style={{ height: `${Math.max(15, val)}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Excerpt text with authentic archival tone */}
              <p className="mt-2 text-xs text-stone-300/90 font-serif leading-relaxed line-clamp-2 italic">
                {mem.excerpt}
              </p>

              {/* Contradiction warning indicator if flagged */}
              {mem.contradictionNote && (
                <div className="mt-2 flex items-start gap-1.5 text-[11px] text-amber-400/90 bg-amber-950/20 p-1.5 rounded border border-amber-800/30">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{mem.contradictionNote}</span>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="mt-2.5 pt-2 border-t border-[#221B16] flex items-center justify-between text-[11px] text-stone-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-500" />
                  <span className="truncate max-w-[130px]">{mem.location}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playCassetteClick();
                    onOpenDetails(mem);
                  }}
                  className="text-amber-400 hover:text-amber-200 transition-colors font-mono hover:underline"
                >
                  Inspect Fragment →
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
};
