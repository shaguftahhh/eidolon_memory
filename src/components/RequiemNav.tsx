import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';

interface RequiemNavProps {
  onOpenChamber: () => void;
  isChamberActive: boolean;
  onOpenModelModal: () => void;
}

export const RequiemNav: React.FC<RequiemNavProps> = ({
  onOpenChamber,
  isChamberActive,
  onOpenModelModal
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0910]/85 backdrop-blur-md border-b border-[#231A33]">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="text-violet-400 text-lg group-hover:rotate-45 transition-transform duration-300">◆</span>
          <span className="text-xl font-serif tracking-widest font-bold text-stone-100 group-hover:text-violet-200 transition-colors">
            REQUIEM
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-sans text-stone-300">
          <a href="#how-it-works" className="hover:text-stone-100 hover:underline transition-colors">
            How It Works
          </a>
          <a href="#autopsy" className="hover:text-stone-100 hover:underline transition-colors">
            Autopsy
          </a>
          <a href="#timeline" className="hover:text-stone-100 hover:underline transition-colors">
            Timeline
          </a>
          <a href="#evidence" className="hover:text-stone-100 hover:underline transition-colors">
            Evidence
          </a>
          <a href="#open-weight-ai" className="hover:text-stone-100 hover:underline transition-colors">
            Open-Weight AI
          </a>
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenModelModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-violet-300 bg-[#161224] border border-violet-800/40 hover:border-violet-500/60 hover:bg-[#1E1833] transition-colors"
          >
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>Gemma 2 Model</span>
          </button>

          <button
            onClick={onOpenChamber}
            className="px-5 py-2 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg text-stone-950 bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-300 hover:from-violet-300 hover:to-sky-200 shadow-[0_0_20px_rgba(167,139,250,0.35)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            {isChamberActive ? 'RETURN TO LANDING' : 'ARCHIVE CHAMBER'}
          </button>
        </div>
      </div>
    </header>
  );
};
