import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Copy, Check, Flame, Heart, RefreshCw } from 'lucide-react';
import { soundEngine } from '../audio/ambientSynth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviveStoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedFragments, setSelectedFragments] = useState<string[]>([
    'tape-1997',
    'letter-1984',
    'marigolds',
  ]);
  const [isWeaving, setIsWeaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revivedStory, setRevivedStory] = useState<string | null>(
    `The rain on the tin roof in Devon never truly stopped; it simply changed frequencies. In October 1984, she had written of a repeating pulse at 1420 MHz, thinking it was a celestial beacon from Cassiopeia. But listening to the 1997 tape thirty years later, the truth emerged: it was the rhythm of the old watermill where she had waited for a train that was cancelled by the autumn floods. 

We laid dried marigold petals across the edge of the CRT terminal. In the quiet midnight hours, the offline model connected the handwriting from her atlas to the audio harmonics of the cassette. She was never lost. She was simply waiting for someone to listen to the silence between the notes.`
  );

  if (!isOpen) return null;

  const fragments = [
    { id: 'tape-1997', label: 'Cassette Tape: Rain on Tin Roof (1997)', type: 'Voice Wave' },
    { id: 'letter-1984', label: 'Atlas Journal: 1420 MHz Signal (1984)', type: 'Diary' },
    { id: 'marigolds', label: 'Pressed Marigold Petals in Locket (2011)', type: 'Día de los Muertos' },
    { id: 'commit-2024', label: 'Terminal Push: 03:42 AM RingBuffer', type: 'Code Epitaph' },
  ];

  const handleToggleFragment = (id: string) => {
    setSelectedFragments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWeaveStory = () => {
    setIsWeaving(true);
    soundEngine.playMemoryRecallChime(523.25);

    setTimeout(() => {
      setIsWeaving(false);
      setRevivedStory(
        `Under the amber glow of the terminal lamp, three scattered epochs coalesce. The silver locket preserved the scent of Cempasúchil petals, carrying her intention across the threshold of time. When the model cross-referenced the 1984 notebook against the acoustic resonance of the 1997 tape, the missing coordinates revealed an unfinished dedication written on the inside of the cassette inlay: 'To the ones who stay awake to keep the flame alive.' The memory has been revived and permanently preserved in the local enclave.`
      );
    }, 1800);
  };

  const handleCopyStory = () => {
    if (!revivedStory) return;
    navigator.clipboard.writeText(revivedStory);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0E0A17] border border-amber-500/40 w-full max-w-2xl rounded-3xl shadow-2xl shadow-amber-950/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-amber-500/20 flex items-center justify-between bg-gradient-to-r from-amber-950/40 via-[#130E20] to-[#0E0A17]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif text-stone-100 font-light">Revive an Old Story</h3>
              <p className="text-xs text-amber-400/80 font-mono">
                Weaving scattered human memories into living prose
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-mono">
          {/* Select Memory Fragments */}
          <div>
            <label className="text-stone-300 uppercase tracking-wider block mb-2.5 font-semibold flex items-center justify-between">
              <span>Select Memory Fragments to Weave</span>
              <span className="text-amber-400 font-normal">
                {selectedFragments.length} fragments chosen
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {fragments.map((frag) => {
                const isSelected = selectedFragments.includes(frag.id);
                return (
                  <button
                    key={frag.id}
                    onClick={() => handleToggleFragment(frag.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 shadow-md shadow-amber-950/30'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs leading-snug mb-0.5">{frag.label}</div>
                      <span className="text-[10px] text-amber-400/70">{frag.type}</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'bg-amber-500 border-amber-400 text-stone-950' : 'border-stone-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 font-bold" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action to re-weave */}
          <div className="flex items-center justify-between">
            <span className="text-stone-400 text-[11px]">
              Powered by Gemma 2 Local Enclave (Zero Cloud)
            </span>
            <button
              onClick={handleWeaveStory}
              disabled={isWeaving || selectedFragments.length === 0}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold font-mono text-xs transition-all shadow-md shadow-amber-600/30 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isWeaving ? 'animate-spin' : ''}`} />
              <span>{isWeaving ? 'Reweaving Memory Threads...' : 'Commune & Weave'}</span>
            </button>
          </div>

          {/* Revived Story Output */}
          <div className="p-5 rounded-2xl bg-[#07050D] border border-amber-500/30 space-y-3 relative shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-amber-400 border-b border-amber-500/20 pb-2">
              <span className="flex items-center gap-1.5 font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                LIVING MEMORY PROSE
              </span>
              <button
                onClick={handleCopyStory}
                className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Story'}</span>
              </button>
            </div>
            <p className="text-sm font-serif italic text-stone-200 leading-relaxed">
              {revivedStory}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-amber-500/20 bg-[#0A0713] flex items-center justify-between">
          <span className="text-xs font-mono text-stone-400">
            "The memory ghost is not forgotten so long as the story is whispered."
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 font-mono text-xs transition-colors"
          >
            Close Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
};
