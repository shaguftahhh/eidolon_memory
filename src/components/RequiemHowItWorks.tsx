import React from 'react';
import { Search, Cpu, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const RequiemHowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="w-full py-24 bg-[#09070D] border-b border-[#1E172B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-violet-400 mb-3">
            <span className="w-8 h-[1px] bg-violet-400/60" />
            <span>DIGITAL ARCHAEOLOGY METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-tight mb-6">
            HOW REQUIEM WORKS
          </h2>
          <p className="text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
            A three-stage forensic pipeline that treats abandoned codebases not as dead text, but as archaeological sites to be documented with strict academic rigor.
          </p>
        </div>

        {/* 3 Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage 01 */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-violet-800/40 relative flex flex-col justify-between hover:border-violet-500/70 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-mono font-bold text-violet-400">01</span>
                <div className="p-2 rounded-lg bg-violet-950/60 text-violet-300 border border-violet-800/40">
                  <Search className="w-5 h-5" />
                </div>
              </div>
              <div className="text-xs font-mono tracking-widest uppercase text-violet-400/80 mb-2">
                STAGE 01
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mb-3">
                DISCOVER
              </h3>
              <p className="text-xs font-serif italic text-amber-200/90 mb-4">
                "Bring the forgotten project into the light."
              </p>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                Supply README manifests, source trees, or git history. REQUIEM performs safe offline extraction, strips private credentials, isolates core modules, and prepares an evidence corpus without executing untrusted code.
              </p>
              <ul className="space-y-2 mb-8 text-xs font-sans text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Zero-execution safe ingestion</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Secret & token scrub</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Git ref inspection</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#231A33] flex items-center justify-between text-xs font-mono text-stone-400">
              <span>Safe Ingestion Corpus</span>
              <ArrowRight className="w-4 h-4 text-violet-400" />
            </div>
          </div>

          {/* Stage 02 */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-[#271C38] relative flex flex-col justify-between hover:border-violet-500/70 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-mono font-bold text-violet-400">02</span>
                <div className="p-2 rounded-lg bg-violet-950/60 text-violet-300 border border-violet-800/40">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
              <div className="text-xs font-mono tracking-widest uppercase text-violet-400/80 mb-2">
                STAGE 02
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mb-3">
                RECONSTRUCT
              </h3>
              <p className="text-xs font-serif italic text-amber-200/90 mb-4">
                "Follow the evidence left behind."
              </p>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                Using open-weight Gemma models with strict evidence grounding, REQUIEM separates indisputable facts from hypotheses. It traces unmerged branches, isolates panic stubs, and builds an architectural dependency graph.
              </p>
              <ul className="space-y-2 mb-8 text-xs font-sans text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Verified evidence vs inference</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Ghost branch analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Deadlock detection</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#231A33] flex items-center justify-between text-xs font-mono text-stone-400">
              <span>Gemma 2 Inference Engine</span>
              <ArrowRight className="w-4 h-4 text-violet-400" />
            </div>
          </div>

          {/* Stage 03 */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-[#271C38] relative flex flex-col justify-between hover:border-violet-500/70 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-mono font-bold text-violet-400">03</span>
                <div className="p-2 rounded-lg bg-violet-950/60 text-violet-300 border border-violet-800/40">
                  <Compass className="w-5 h-5" />
                </div>
              </div>
              <div className="text-xs font-mono tracking-widest uppercase text-violet-400/80 mb-2">
                STAGE 03
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mb-3">
                REVIVE
              </h3>
              <p className="text-xs font-serif italic text-amber-200/90 mb-4">
                "Give the unfinished a next chapter."
              </p>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                Rather than hallucinating boilerplate, REQUIEM generates an actionable revival blueprint. Broken mutexes, missing test fixtures, and orphaned RFCs are prioritized into concrete contribution-ready tasks.
              </p>
              <ul className="space-y-2 mb-8 text-xs font-sans text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>P0/P1/P2 Roadmap</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>GitHub Issue drafts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Contribution criteria</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#231A33] flex items-center justify-between text-xs font-mono text-stone-400">
              <span>Executable Blueprint</span>
              <ArrowRight className="w-4 h-4 text-violet-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
