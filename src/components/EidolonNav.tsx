import React, { useState } from 'react';
import { Cpu, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
import { soundEngine } from '../audio/ambientSynth';

interface EidolonNavProps {
  onOpenChamber: () => void;
  isChamberActive: boolean;
  onOpenModelModal: () => void;
}

export const EidolonNav: React.FC<EidolonNavProps> = ({
  onOpenChamber,
  isChamberActive,
  onOpenModelModal,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(soundEngine.getIsPlaying());

  const handleToggleAudio = () => {
    const active = soundEngine.toggle();
    setIsAudioActive(active);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08050D]/90 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="text-cyan-400 text-xl group-hover:rotate-45 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            ✦
          </span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-serif tracking-widest font-bold text-stone-100 group-hover:text-cyan-200 transition-colors">
                EIDOLON
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse" />
            </div>
            <span className="text-[10px] font-mono tracking-wider text-cyan-400/80 uppercase">
              THE HUMAN GHOST ARCHIVE
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono text-stone-300">
          <a href="#manifestation" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span className="text-cyan-400">01</span> Manifestation
          </a>
          <a href="#problem" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span className="text-cyan-400">02</span> The Forgotten
          </a>
          <a href="#autopsy" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span className="text-cyan-400">03</span> Autopsy & Relics
          </a>
          <a href="#timeline" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span className="text-cyan-400">04</span> Strata Timeline
          </a>
          <a href="#evidence" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span className="text-cyan-400">05</span> Evidence Vault
          </a>
          <a href="#blueprint" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span className="text-cyan-400">06</span> Revival
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Audio Ambience Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              isAudioActive
                ? 'bg-amber-950/70 border-amber-500/60 text-amber-300 shadow-md shadow-amber-950/40'
                : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
            title="Toggle midnight candle & tape hum atmosphere"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-[11px]">Tape Hum [ON]</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="text-[11px]">Audio [OFF]</span>
              </>
            )}
          </button>

          {/* Model Status Pill */}
          <button
            onClick={onOpenModelModal}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 hover:border-cyan-500/50 text-xs font-mono text-stone-300 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Gemma 2 Offline</span>
          </button>

          {/* Chamber Workspace Toggle */}
          <button
            onClick={onOpenChamber}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-amber-600 hover:from-cyan-500 hover:to-amber-500 text-stone-950 text-xs font-mono font-bold tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isChamberActive ? 'RETURN TO ALTAR' : 'SPECTRAL CHAMBER'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
