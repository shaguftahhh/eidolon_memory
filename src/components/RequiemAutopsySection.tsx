import React, { useState } from 'react';
import { CaseStudy, ForensicArtifact, FindingCategory } from '../types/requiem';
import { CheckCircle2, HelpCircle, AlertTriangle, FileCode2, ChevronRight } from 'lucide-react';

interface RequiemAutopsySectionProps {
  caseStudy: CaseStudy;
  onSelectArtifactProof: (artifact: ForensicArtifact) => void;
}

export const RequiemAutopsySection: React.FC<RequiemAutopsySectionProps> = ({
  caseStudy,
  onSelectArtifactProof
}) => {
  const [activeCategory, setActiveCategory] = useState<FindingCategory>('all');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(caseStudy.artifacts[0].id);

  const filteredArtifacts = caseStudy.artifacts.filter((art) => {
    if (activeCategory === 'all') return true;
    return art.category === activeCategory;
  });

  const selectedArtifact =
    caseStudy.artifacts.find((a) => a.id === selectedArtifactId) || caseStudy.artifacts[0];

  const counts = {
    all: caseStudy.artifacts.length,
    verified: caseStudy.artifacts.filter((a) => a.category === 'verified').length,
    hypothesis: caseStudy.artifacts.filter((a) => a.category === 'hypothesis').length,
    unknown: caseStudy.artifacts.filter((a) => a.category === 'unknown').length
  };

  return (
    <section id="autopsy" className="w-full py-24 bg-[#09070D] border-b border-[#1E172B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-violet-400 mb-3">
              <span className="w-8 h-[1px] bg-violet-400/60" />
              <span>SECTION 05 · FORENSIC AUTOPSY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-tight mb-3">
              PROJECT AUTOPSY
            </h2>
            <p className="text-sm sm:text-base text-stone-400 font-sans max-w-2xl leading-relaxed">
              Forensic reconstruction of <strong className="text-stone-200">{caseStudy.name}</strong>. Every statement is strictly grounded in the extracted codebase and categorized by certainty.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#140F22] border border-[#2D2145] text-xs font-mono text-stone-400 shrink-0">
            <div className="flex items-center gap-2 text-violet-300 font-medium">
              <span>{caseStudy.languages.join(' / ')}</span>
              <span aria-hidden="true">·</span>
              <span>{caseStudy.license}</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              Demonstration Case Study
            </div>
          </div>
        </div>

        {/* 3-Part Investigation Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-xl bg-[#110C1B] border border-[#231836] mb-10">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-stone-400 mb-2">
              PURPOSE & CORE INTENT
            </div>
            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
              {caseStudy.coreIntent}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-stone-400 mb-2">
              INTENDED TARGET AUDIENCE
            </div>
            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
              {caseStudy.targetAudience}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-amber-400 mb-2">
              WHY THE PROJECT STALLED
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 font-sans leading-relaxed">
              {caseStudy.stalledReason}
            </p>
          </div>
        </div>

        {/* Category Filter Pills & Instructions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1 bg-[#120D1D] rounded-lg border border-[#241A36]">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                activeCategory === 'all'
                  ? 'bg-violet-600 text-stone-100 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              All Findings ({counts.all})
            </button>
            <button
              onClick={() => setActiveCategory('verified')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 ${
                activeCategory === 'verified'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Evidence ({counts.verified})</span>
            </button>
            <button
              onClick={() => setActiveCategory('hypothesis')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 ${
                activeCategory === 'hypothesis'
                  ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-violet-400" />
              <span>AI Hypothesis ({counts.hypothesis})</span>
            </button>
            <button
              onClick={() => setActiveCategory('unknown')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5 ${
                activeCategory === 'unknown'
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Unknowns ({counts.unknown})</span>
            </button>
          </div>

          <div className="text-xs font-mono text-stone-400">
            Click finding to view analysis · Click <strong className="text-violet-300">"Show Me The Proof"</strong> for code
          </div>
        </div>

        {/* Master-Detail Findings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left List of Findings */}
          <div className="lg:col-span-5 space-y-3">
            {filteredArtifacts.map((art) => {
              const isSelected = selectedArtifact.id === art.id;
              const isVerified = art.category === 'verified';
              const isHypothesis = art.category === 'hypothesis';

              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtifactId(art.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#181126] border-violet-500/80 shadow-[0_0_20px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/40'
                      : 'bg-[#110C1B] border-[#221735] hover:border-violet-700/50 hover:bg-[#150F22]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span
                      className={`uppercase tracking-wider font-semibold ${
                        isVerified
                          ? 'text-emerald-400'
                          : isHypothesis
                          ? 'text-violet-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {art.badgeLabel}
                    </span>
                    <span className="text-stone-400">{art.confidence}% conf</span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-stone-100 mb-2 leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <span className="text-violet-300 truncate max-w-[200px]">{art.filePath}</span>
                    <ChevronRight className="w-4 h-4 text-violet-400 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Selected Finding Dossier */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-xl bg-[#110C1B] border border-[#261A3A] flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider mb-4">
                <span className="text-violet-400">
                  FINDING DOSSIER · {selectedArtifact.typeTag}
                </span>
                <button
                  onClick={() => onSelectArtifactProof(selectedArtifact)}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-semibold text-stone-950 bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-300 hover:from-violet-300 hover:to-sky-200 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>SHOW ME THE PROOF</span>
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mb-4 leading-snug">
                {selectedArtifact.title}
              </h3>

              <div className="p-4 rounded-lg bg-[#0A0711] border border-[#1E142E] mb-6">
                <div className="text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-1">
                  ARCHAEOLOGICAL FINDING
                </div>
                <p className="text-sm text-stone-300 font-sans leading-relaxed">
                  {selectedArtifact.summary}
                </p>
              </div>

              {/* Verified Impact vs Uncertainty Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#0F1A15] border border-emerald-900/40">
                  <div className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>WHAT THIS ESTABLISHES</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 font-sans leading-relaxed">
                    {selectedArtifact.whatItEstablishes}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#1F1511] border border-amber-900/40">
                  <div className="text-[11px] font-mono tracking-wider uppercase text-amber-400 mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>WHAT REMAINS UNCERTAIN</span>
                  </div>
                  <p className="text-xs text-amber-200/90 font-sans leading-relaxed">
                    {selectedArtifact.whatRemainsUncertain}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#201533] flex items-center justify-between text-xs font-mono text-stone-400">
              <span className="text-violet-300">{selectedArtifact.filePath}</span>
              <span>{selectedArtifact.lineRange}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
