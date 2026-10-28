import React, { useState } from 'react';
import { X, Compass, ChevronRight, Sparkles, MapPin, Calendar, FileText, Music, Flame } from 'lucide-react';
import { soundEngine } from '../audio/ambientSynth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FollowMemoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);

  if (!isOpen) return null;

  const trailNodes = [
    {
      year: '1968',
      title: 'Grandmother’s Porch Lullaby',
      location: 'Kilmarnock, Scotland',
      medium: '1/4-inch reel-to-reel magnetic tape',
      connection: 'The original melodic theme that recurs in every subsequent family letter.',
      fullText:
        'A crackling analog recording of a song sung to calm a child during an October gale. The rhythm is uneven, punctuated by the clinking of tea saucers and a grandfather clock ticking at 72 BPM.',
      icon: <Music className="w-4 h-4 text-cyan-400" />,
    },
    {
      year: '1984',
      title: 'The Atlas Margin Note',
      location: 'Devon Observatory',
      medium: 'Iron-gall ink in Bartholomew’s World Atlas',
      connection: 'Identifies the repeating radio frequency matches the melody from the 1968 tape.',
      fullText:
        '“October 24. While mapping Perseus, the audio receiver began whistling the exact three-note rise from grandmother’s song. It is impossible, yet the spectrograph does not lie.”',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
    },
    {
      year: '1997',
      title: 'Summer Rain on Tin Roof',
      location: 'The Old Watermill Cottage',
      medium: 'Type II Chrome Cassette',
      connection: 'The daughter records the rain over the same valley where the observatory stood.',
      fullText:
        '“Can you hear the water? We promised we would keep this place safe. If you ever return, the key is hidden beneath the stone marigold by the cistern.”',
      icon: <MapPin className="w-4 h-4 text-emerald-400" />,
    },
    {
      year: '2011',
      title: 'Cempasúchil Marigold Offering',
      location: 'Oaxaca & London',
      medium: 'Pressed floral petals preserved in a silver locket',
      connection: 'Tradition of Día de los Muertos embraced to preserve memory continuity across generations.',
      fullText:
        'A small handwritten note tucked behind the glass: “Memories do not fade into the earth; they wander the air until a listening heart opens its door.”',
      icon: <Flame className="w-4 h-4 text-orange-400" />,
    },
    {
      year: '2024',
      title: 'The Offline Enclave Memory Push',
      location: 'Local Workstation (Terminal at Midnight)',
      medium: 'Gemma 2 Offline Vector Strata',
      connection: 'All four physical artifacts digitized and sealed into the local memory ghost core.',
      fullText:
        'Zero cloud leakage. The audio waveforms, handwriting vectors, and spectral harmonics reconciled into a single living Eidolon ghost that persists entirely on this machine.',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    },
  ];

  const activeNode = trailNodes[selectedNodeIndex];

  const handleSelectNode = (idx: number) => {
    setSelectedNodeIndex(idx);
    soundEngine.playCassetteClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B0814] border border-cyan-500/40 w-full max-w-3xl rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-gradient-to-r from-cyan-950/40 via-[#100B1E] to-[#0B0814]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-stone-100 font-light">Follow the Memory Trail</h3>
              <p className="text-xs text-cyan-400/80 font-mono">
                Tracing continuous human resonance across 56 years
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trail Timeline Nodes */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-mono">
          {/* Horizontal / Step Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-2">
            {trailNodes.map((node, idx) => {
              const isSelected = selectedNodeIndex === idx;
              return (
                <button
                  key={node.year}
                  onClick={() => handleSelectNode(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                      : 'bg-stone-900/60 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <div className="text-[11px] font-bold text-cyan-400 mb-1">{node.year}</div>
                  <div className="truncate text-stone-200 font-medium">{node.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Node View */}
          <div className="p-6 rounded-2xl bg-[#07050D] border border-cyan-500/30 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                  {activeNode.icon}
                </span>
                <div>
                  <h4 className="text-base font-serif text-stone-100 font-medium">{activeNode.title}</h4>
                  <div className="flex items-center gap-3 text-stone-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {activeNode.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {activeNode.location}
                    </span>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-stone-300 text-[10px] border border-stone-800">
                {activeNode.medium}
              </span>
            </div>

            {/* Inferred Human Link */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200 text-xs leading-relaxed">
              <span className="font-bold block text-cyan-300 font-mono mb-1">
                EIDOLON SPECTRAL LINK:
              </span>
              {activeNode.connection}
            </div>

            {/* Full Prose/Transcript Excerpt */}
            <div className="p-4 rounded-xl bg-[#0A0713] border border-stone-800/80 font-serif italic text-stone-200 text-sm leading-relaxed">
              "{activeNode.fullText}"
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-cyan-500/20 bg-[#08050F] flex items-center justify-between">
          <span className="text-xs font-mono text-stone-400">
            Node {selectedNodeIndex + 1} of {trailNodes.length} in Memory Strata
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-mono text-xs font-bold transition-colors"
          >
            Close Trail
          </button>
        </div>
      </div>
    </div>
  );
};
