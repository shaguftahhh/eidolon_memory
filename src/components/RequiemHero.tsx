import React from 'react';
import { Sparkles, ArrowDown, Compass } from 'lucide-react';

interface RequiemHeroProps {
  onEnterArchive: () => void;
  onExploreExperience: () => void;
}

export const RequiemHero: React.FC<RequiemHeroProps> = ({
  onEnterArchive,
  onExploreExperience
}) => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-b from-[#09070D] via-[#0E0B16] to-[#09070D] border-b border-[#201830]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-violet-400 mb-6">
            <span className="w-8 h-[1px] bg-violet-400/60" />
            <span>DIGITAL ARCHAEOLOGY PROTOCOL</span>
            <span className="text-stone-500">/</span>
            <span className="text-stone-400">Hacktoberfest 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-bold text-stone-100 tracking-tight leading-[1.08] mb-6">
            EVERY ABANDONED PROJECT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 drop-shadow-[0_0_35px_rgba(167,139,250,0.4)]">
              LEAVES A GHOST.
            </span>
          </h1>

          {/* Body Prose */}
          <p className="text-base sm:text-lg text-stone-300/90 font-sans leading-relaxed max-w-2xl mb-8">
            Somewhere inside forgotten code, a story remains unfinished. REQUIEM uncovers the evidence, reconstructs the intent, and reveals what can live again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={onEnterArchive}
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-mono font-semibold tracking-wide text-stone-950 bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-300 hover:from-violet-300 hover:to-sky-200 shadow-[0_0_25px_rgba(167,139,250,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>ENTER THE ARCHIVE</span>
              <Sparkles className="w-4 h-4 text-stone-950" />
            </button>

            <button
              onClick={onExploreExperience}
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-mono text-stone-200 bg-[#161224] border border-[#35284D] hover:border-violet-500/60 hover:bg-[#1E1833] transition-colors cursor-pointer"
            >
              <span>EXPLORE THE EXPERIENCE</span>
              <Compass className="w-4 h-4 text-violet-400" />
            </button>
          </div>

          {/* Subtext Tag */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-violet-400/80 uppercase">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span>AN OPEN-WEIGHT AI EXPERIMENT IN DIGITAL ARCHAEOLOGY</span>
          </div>
        </div>

        {/* Right Column: Hero Artwork */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative rounded-2xl overflow-hidden border border-violet-800/40 shadow-[0_0_60px_rgba(139,92,246,0.25)] bg-[#0C0912]">
            <img
              src="/assets/images/requiem_hero_archivist_1793206731085.jpg"
              alt="Archivist on battlement overlooking cyberpunk midnight city"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('/src/assets/')) {
                  target.src = '/src/assets/images/requiem_hero_archivist_1793206731085.jpg';
                }
              }}
            />
            {/* Ambient inner vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09070D] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-stone-500 pointer-events-none">
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-3.5 h-3.5 text-violet-400 animate-bounce" />
      </div>
    </section>
  );
};
