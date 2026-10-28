import React, { useState } from 'react';
import { CameraViewPreset } from './ThreeMemoryScene';
import { soundEngine } from '../audio/ambientSynth';
import { 
  Tv, 
  Volume2, 
  VolumeX, 
  Compass, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  Terminal as TerminalIcon,
  ShieldCheck,
  Disc
} from 'lucide-react';

interface ThreeControlDockProps {
  cameraPreset: CameraViewPreset;
  onChangeCameraPreset: (preset: CameraViewPreset) => void;
  onFollowMemory: () => void;
  onReviveStory: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  isCrtOn: boolean;
  onToggleCrt: () => void;
  memoryCategory: 'historical' | 'modern' | 'transitional';
}

const VIEW_PRESETS: { id: CameraViewPreset; label: string; icon: string }[] = [
  { id: 'midnight_room', label: 'Midnight Desk (3D Room)', icon: '🏛' },
  { id: 'terminal_focus', label: 'Terminal Screen (Focus)', icon: '💻' },
  { id: 'ghost_orbit', label: 'Memory Core (Ghost Orbit)', icon: '✨' },
  { id: 'keepsakes_zoom', label: 'Archival Keepsakes (Desk)', icon: '⏳' }
];

export const ThreeControlDock: React.FC<ThreeControlDockProps> = ({
  cameraPreset,
  onChangeCameraPreset,
  onFollowMemory,
  onReviveStory,
  onToggleTerminal,
  isTerminalOpen,
  isAudioOn,
  onToggleAudio,
  isCrtOn,
  onToggleCrt,
  memoryCategory
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="3D Archival Scene Controls"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 pointer-events-auto transition-transform duration-300"
      style={{
        transform: isCollapsed ? 'translate(-50%, calc(100% - 32px))' : 'translate(-50%, 0)'
      }}
    >
      {/* Collapse / Expand Tab attached to top of dock */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => {
            soundEngine.playCassetteClick();
            setIsCollapsed(!isCollapsed);
          }}
          className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-stone-300 bg-[#171411] border border-[#2D231A] rounded-t-md hover:text-amber-300 hover:bg-[#201B17] transition-colors shadow-lg"
          aria-label={isCollapsed ? 'Show 3D Control Dock' : 'Hide 3D Control Dock'}
        >
          {isCollapsed ? <ChevronUp className="w-3.5 h-3.5 text-amber-400" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-400" />}
          <span>{isCollapsed ? 'Show Scene Controls' : 'Cinema Mode (Hide Dock)'}</span>
        </button>
      </div>

      {/* Main Glass-free Solid PBR Dock Container */}
      <div className="p-3 bg-[#110E0C] border border-[#2C241E] rounded-lg shadow-2xl flex flex-col gap-2.5">
        {/* Row 1: Camera View Mode Switches & Category indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#221B16] pb-2 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] uppercase font-mono text-stone-500 mr-1 whitespace-nowrap">
              3D View:
            </span>
            {VIEW_PRESETS.map((p) => {
              const isActive = cameraPreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    soundEngine.playCassetteClick();
                    onChangeCameraPreset(p.id);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-serif transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 shadow-sm'
                      : 'bg-[#181411] text-stone-400 border border-[#241C15] hover:text-stone-200 hover:bg-[#201B17]'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Airgap badge */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <div className="flex items-center gap-1 text-emerald-400/90 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OFFLINE AIRGAPPED</span>
            </div>
          </div>
        </div>

        {/* Row 2: Primary Actions & Utility Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Left Buttons: Mandatory Journeys */}
          <div className="flex items-center gap-2">
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

            <button
              onClick={() => {
                soundEngine.playCassetteClick();
                soundEngine.playMemoryRecallChime(660);
                onReviveStory();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif font-medium text-stone-950 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 rounded shadow-md transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>REVIVE AN OLD STORY</span>
            </button>
          </div>

          {/* Right Utility Buttons */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => {
                soundEngine.playCassetteClick();
                onToggleTerminal();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-colors ${
                isTerminalOpen
                  ? 'bg-amber-950/40 text-amber-300 border-amber-600/50'
                  : 'bg-[#181411] text-stone-400 border-[#2A221B] hover:text-stone-200'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Local Terminal</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playCassetteClick();
                onToggleCrt();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-colors ${
                isCrtOn
                  ? 'bg-amber-950/40 text-amber-300 border-amber-600/50'
                  : 'bg-[#181411] text-stone-400 border-[#2A221B] hover:text-stone-200'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>CRT: {isCrtOn ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={onToggleAudio}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-colors ${
                isAudioOn
                  ? 'bg-amber-950/40 text-amber-300 border-amber-600/50'
                  : 'bg-[#181411] text-stone-400 border-[#2A221B] hover:text-stone-200'
              }`}
            >
              {isAudioOn ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5 text-stone-500" />}
              <span>Audio: {isAudioOn ? 'ACTIVE' : 'MUTED'}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
