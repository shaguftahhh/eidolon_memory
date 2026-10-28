import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Cpu, Lock, Sparkles, Flame } from 'lucide-react';

interface EidolonHeroProps {
  onEnterArchive: () => void;
  onExploreExperience: () => void;
}

export const EidolonHero: React.FC<EidolonHeroProps> = ({
  onEnterArchive,
  onExploreExperience,
}) => {
  return (
    <section className="relative w-full pt-16 pb-20 overflow-hidden">
      {/* Background radial gradients for cyan + amber ambiance */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-cyan-500/10 via-amber-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>RUNNING LOCALLY — NO CLOUD</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/40 text-purple-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>OPEN-WEIGHT GEMMA 2</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>YOUR MEMORIES NEVER LEAVE THIS MACHINE</span>
          </div>
        </div>

        {/* Central Display Typography */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight text-stone-100 leading-[1.08] mb-6">
            EVERY HUMAN MEMORY LEAVES A{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300 font-normal drop-shadow-[0_0_35px_rgba(34,211,238,0.4)]">
              SPECTRAL GHOST.
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-2xl mx-auto">
            A quiet room at midnight. Floating photographs, handwritten diary fragments, analog tape
            frequencies, and marigold petals weave around an offline intelligence. The ghost is not a stranger—it is the memory itself.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreExperience}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-stone-950 font-mono text-sm font-bold tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 group"
          >
            <span>COMMUNE WITH THE GHOST</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onEnterArchive}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#120B1F] hover:bg-[#1A102C] text-stone-200 hover:text-white border border-amber-500/30 hover:border-amber-400/60 font-mono text-sm font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-black/40"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ENTER SPECTRAL CHAMBER</span>
          </button>
        </div>

        {/* Hero Artwork Frame with Ghost & Candle Ambiance */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 group">
          <img
            src="/assets/images/spectral_human_ghost_1793207526079.jpg"
            alt="Spectral Human Memory Ghost in atmospheric midnight chamber"
            className="w-full h-auto object-cover opacity-95 transition-all duration-700 group-hover:scale-[1.01]"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('/src/assets/')) {
                target.src = '/src/assets/images/spectral_human_ghost_1793207526079.jpg';
              }
            }}
          />

          {/* Vignette & scanline gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07050A] via-transparent to-transparent pointer-events-none" />

          {/* Bottom Card Overlay */}
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#090611]/85 backdrop-blur-md border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>OFFLINE ENCLAVE RECONSTRUCTION</span>
              </div>
              <h3 className="text-base font-serif text-stone-100 font-medium">
                The Astronomer & The Cassette Tape (1974–2024)
              </h3>
              <p className="text-xs text-stone-300">
                4,120 salvaged handwriting tokens • 3 audio spectrograms • 1 unbroken memory
              </p>
            </div>

            <button
              onClick={onExploreExperience}
              className="px-5 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-mono text-xs transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md"
            >
              <span>Inspect Memory Strata</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
