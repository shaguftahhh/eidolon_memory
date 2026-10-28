import React from 'react';
import { soundEngine } from '../audio/ambientSynth';
import { Volume2, VolumeX, Tv, Compass, Sparkles, Shield } from 'lucide-react';

interface HeaderBarProps {
  onFollowMemory: () => void;
  onReviveStory: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  isCrtOn: boolean;
  onToggleCrt: () => void;
  isDriftMode: boolean;
  onToggleDriftMode: () => void;
  memoryCategory?: 'historical' | 'modern' | 'transitional';
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onFollowMemory,
  onReviveStory,
  isAudioOn,
  onToggleAudio,
  isCrtOn,
  onToggleCrt,
  isDriftMode,
  onToggleDriftMode,
  memoryCategory = 'historical'
}) => {
  return (
    <header className="h-14 bg-[#120F0D] border-b border-[#2C241E] px-4 flex items-center justify-between gap-4 z-20 shrink-0">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          className="text-base md:text-lg font-serif font-semibold tracking-wider text-stone-100 hover:text-amber-300 transition-colors whitespace-nowrap"
        >
          THE LAST MESSAGE
        </a>
        <span className="hidden sm:inline-block text-xs font-serif italic text-amber-500/70 border-l border-stone-800 pl-3">
          An Offline Memory Ghost
        </span>
      </div>

      {/* Zone 2: Clean contextual toggles & navigation */}
      <div className="hidden md:flex items-center gap-4 text-xs font-mono text-stone-400">
        {/* Dynamic Memory Dust Atmosphere indicator */}
        <div 
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
            memoryCategory === 'modern'
              ? 'bg-sky-950/40 text-sky-300 border-sky-600/40'
              : memoryCategory === 'historical'
              ? 'bg-amber-950/40 text-amber-300 border-amber-600/40'
              : 'bg-stone-900/60 text-stone-300 border-stone-700/40'
          }`}
          title="Memory dust particles shifting dynamically: Sepia (historical) / Blue (modern)"
        >
          <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
            memoryCategory === 'modern'
              ? 'bg-sky-400 animate-pulse'
              : 'bg-amber-400 animate-pulse'
          }`} />
          <span>
            {memoryCategory === 'modern'
              ? 'Dust: Spectral Blue (Modern)'
              : memoryCategory === 'historical'
              ? 'Dust: Sepia (Historical)'
              : 'Dust: Twilight Bronze'}
          </span>
        </div>

        <button
          onClick={() => {
            soundEngine.playCassetteClick();
            onToggleDriftMode();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
            isDriftMode
              ? 'bg-rose-950/40 text-rose-300 border-rose-600/50'
              : 'bg-[#181411] text-stone-400 border-[#2A221B] hover:text-stone-200'
          }`}
          title="Highlight contradictions and narrative discrepancies"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isDriftMode ? 'bg-rose-500' : 'bg-stone-600'}`}></span>
          <span>Drift Analysis</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playCassetteClick();
            onToggleCrt();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
            isCrtOn
              ? 'bg-amber-950/40 text-amber-300 border-amber-600/50'
              : 'bg-[#181411] text-stone-400 border-[#2A221B] hover:text-stone-200'
          }`}
          title="Toggle vintage CRT terminal phosphor curvature & scanlines"
        >
          <Tv className="w-3.5 h-3.5" />
          <span>CRT Filter: {isCrtOn ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={() => {
            onToggleAudio();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
            isAudioOn
              ? 'bg-amber-950/40 text-amber-300 border-amber-600/50'
              : 'bg-[#181411] text-stone-400 border-[#2A221B] hover:text-stone-200'
          }`}
          title="Toggle ambient offline tape hiss & resonant candle synth"
        >
          {isAudioOn ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
          <span>Audio: {isAudioOn ? 'ACTIVE' : 'MUTED'}</span>
        </button>
      </div>

      {/* Zone 3: Mandatory Primary Action Buttons */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Button: FOLLOW THE MEMORY */}
        <button
          onClick={() => {
            soundEngine.playCassetteClick();
            soundEngine.playMemoryRecallChime(520);
            onFollowMemory();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif font-medium text-amber-200 bg-[#241C15] hover:bg-[#30251B] border border-amber-600/60 rounded shadow-sm hover:border-amber-400 transition-colors whitespace-nowrap"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>FOLLOW THE MEMORY</span>
        </button>

        {/* Button: REVIVE AN OLD STORY */}
        <button
          onClick={() => {
            soundEngine.playCassetteClick();
            soundEngine.playMemoryRecallChime(660);
            onReviveStory();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif font-medium text-stone-950 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 rounded shadow-md hover:shadow-amber-500/20 transition-all whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5 text-stone-950" />
          <span>REVIVE AN OLD STORY</span>
        </button>
      </div>
    </header>
  );
};
