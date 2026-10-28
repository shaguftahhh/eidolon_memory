import React from 'react';
import { FileQuestion, GitBranch, AlertOctagon } from 'lucide-react';

export const RequiemProblemSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#0A0810] border-b border-[#1E172B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Eyebrow & Headline */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-violet-400 mb-3">
            <span className="w-8 h-[1px] bg-violet-400/60" />
            <span>THE SILENT CEMETERY OF OPEN SOURCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-tight mb-6">
            NOT EVERY ENDING WAS INTENDED.
          </h2>
          <p className="text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
            Every year, hundreds of thousands of promising open-source repositories go dark. Maintainers burn out, careers pivot, life intervenes. What remains is not junk — it is an archaeological dig site waiting for an investigator to reconstruct what was and what could be.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-[#271C38] flex flex-col justify-between hover:border-violet-600/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-mono font-bold text-violet-400/80">01</span>
                <div className="p-2 rounded-lg bg-violet-950/40 text-violet-400 border border-violet-800/30">
                  <FileQuestion className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-100 mb-2">
                THE INTENT REMAINS BURIED
              </h3>
              <div className="text-xs font-mono tracking-wider uppercase text-violet-400/70 mb-4">
                CODE OUTLIVES MEMORY
              </div>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                The maintainer had a vision: a reason why that thread-pool was sized to 32, why that proto enum was commented out. When they moved on, the architectural soul stayed locked in silent source files.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#08060D] border border-[#221832] font-mono text-xs text-stone-300">
              <span className="text-violet-400 font-bold mr-2">❯</span>
              <span className="text-stone-400">src/core/scheduler.rs:49 // FIXME: rec...</span>
            </div>
          </div>

          {/* Card 02 */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-[#271C38] flex flex-col justify-between hover:border-violet-600/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-mono font-bold text-violet-400/80">02</span>
                <div className="p-2 rounded-lg bg-violet-950/40 text-violet-400 border border-violet-800/30">
                  <GitBranch className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-100 mb-2">
                THE EVIDENCE BECOMES SCATTERED
              </h3>
              <div className="text-xs font-mono tracking-wider uppercase text-violet-400/70 mb-4">
                BROKEN TRAILS OF TRUTH
              </div>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                README claims 4.2M ops/sec, but the test suite tests 100 loops. The issue tracker has 40 stale requests. Half-finished branches sit orphaned in git ref logs. The truth is fragmented across hundreds of disparate artifacts.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#08060D] border border-[#221832] font-mono text-xs text-stone-300">
              <span className="text-violet-400 font-bold mr-2">❯</span>
              <span className="text-stone-400">git branch -a → feat/distributed-raft...</span>
            </div>
          </div>

          {/* Card 03 */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-[#271C38] flex flex-col justify-between hover:border-violet-600/50 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-mono font-bold text-violet-400/80">03</span>
                <div className="p-2 rounded-lg bg-violet-950/40 text-violet-400 border border-violet-800/30">
                  <AlertOctagon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-stone-100 mb-2">
                THE NEXT STEP BECOMES UNCERTAIN
              </h3>
              <div className="text-xs font-mono tracking-wider uppercase text-violet-400/70 mb-4">
                THE PARALYSIS OF REVIVAL
              </div>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                Would-be maintainers and Hacktoberfest contributors open the repository, stare at 20,000 lines of unmaintained code, and fear breaking an unknown dependency. Without an archaeological roadmap, no one dares touch it.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#08060D] border border-[#221832] font-mono text-xs text-stone-300">
              <span className="text-violet-400 font-bold mr-2">❯</span>
              <span className="text-stone-400">Cargo.lock → tokio 0.2.22 (vulnerabil...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
