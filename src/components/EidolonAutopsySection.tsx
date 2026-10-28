import React, { useState } from 'react';
import { CaseStudy, ForensicArtifact, FindingCategory } from '../types/requiem';
import { CheckCircle2, HelpCircle, AlertTriangle, FileCode2, ChevronRight, Sparkles, Flame, User } from 'lucide-react';

interface EidolonAutopsySectionProps {
  caseStudy: CaseStudy;
  onSelectArtifactProof: (artifact: ForensicArtifact) => void;
}

export const EidolonAutopsySection: React.FC<EidolonAutopsySectionProps> = ({
  caseStudy,
  onSelectArtifactProof,
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
    unknown: caseStudy.artifacts.filter((a) => a.category === 'unknown').length,
  };

  return (
    <section id="autopsy" className="w-full py-24 bg-[#07050A] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3 shadow-lg shadow-cyan-950/40">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPECTRAL POST-MORTEM & HUMAN RELICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100 tracking-tight leading-tight mb-4">
            THE ARCHIVAL AUTOPSY
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Reconstructing the human intentions, fatal bottlenecks, and uncommitted thoughts behind
            abandoned digital creations.
          </p>
        </div>

        {/* Bento Overview Box */}
        <div className="rounded-3xl bg-[#0C0816] border border-cyan-500/30 p-6 md:p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-stone-800/80 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  CASE STUDY SUBJECT
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-400" />
                  CREATOR DEPARTED (~2024)
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-stone-100 mb-2">
                {caseStudy.name}
              </h3>
              <p className="text-stone-300 text-sm sm:text-base max-w-2xl font-sans">
                {caseStudy.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300">
                {caseStudy.languages.join(' • ')}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300">
                {caseStudy.license}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                Gemma 2 Local Enclave
              </span>
            </div>
          </div>

          {/* 3 Core Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Core Intent */}
            <div className="p-5 rounded-2xl bg-[#090611] border border-stone-800/80">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>01 Original Human Intent</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                {caseStudy.coreIntent}
              </p>
            </div>

            {/* Target Audience */}
            <div className="p-5 rounded-2xl bg-[#090611] border border-stone-800/80">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>02 Intended Audience & Community</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                {caseStudy.targetAudience}
              </p>
            </div>

            {/* Stalled Reason */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
              <div className="text-xs font-mono text-rose-300 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>03 The Fatal Moment of Abandonment</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed font-sans">
                {caseStudy.stalledReason}
              </p>
            </div>
          </div>
        </div>

        {/* Forensic Artifacts Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Artifacts', count: counts.all },
              { id: 'verified', label: 'Verified Code Proofs', count: counts.verified },
              { id: 'hypothesis', label: 'AI Hypotheses', count: counts.hypothesis },
              { id: 'unknown', label: 'Open Questions', count: counts.unknown },
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as FindingCategory)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-stone-950 font-bold shadow-md shadow-cyan-600/30'
                      : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-stone-950/40 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-stone-400">
            Click artifact to inspect coordinates & code evidence
          </span>
        </div>

        {/* Master Detail Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Artifacts List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredArtifacts.map((art) => {
              const isSelected = art.id === selectedArtifactId;
              const isVerified = art.category === 'verified';
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArtifactId(art.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[#120D20] border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                      : 'bg-[#0B0815] border-stone-800 hover:border-stone-700 hover:bg-[#0E0A19]'
                  }`}
                >
                  <div className="mt-1">
                    {isVerified ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : art.category === 'hypothesis' ? (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isVerified
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        }`}
                      >
                        {art.badgeLabel}
                      </span>
                      <span className="text-xs font-mono text-stone-400 truncate">
                        {art.filePath}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-medium leading-snug line-clamp-2 ${
                        isSelected ? 'text-stone-100 font-semibold' : 'text-stone-300'
                      }`}
                    >
                      {art.title}
                    </h4>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 mt-2 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-stone-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Forensic Proof Inspector */}
          <div className="lg:col-span-7 bg-[#0C0816] border border-cyan-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono px-2.5 py-0.5 rounded ${
                    selectedArtifact.category === 'verified'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                  }`}
                >
                  {selectedArtifact.badgeLabel}
                </span>
                <span className="text-xs font-mono text-stone-400">
                  {selectedArtifact.confidence}% Confidence
                </span>
              </div>

              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5" />
                {selectedArtifact.filePath}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-serif text-stone-100 font-light mb-3">
              {selectedArtifact.title}
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed mb-6 font-sans">
              {selectedArtifact.summary}
            </p>

            {/* Code Snippet Box */}
            <div className="rounded-2xl border border-stone-800 bg-[#060309] overflow-hidden mb-6 shadow-inner">
              <div className="px-4 py-2 bg-stone-950 border-b border-stone-800 text-[11px] font-mono text-stone-400 flex items-center justify-between">
                <span>{selectedArtifact.lineRange}</span>
                <span className="text-cyan-400">Rust AST Trace</span>
              </div>
              <pre className="p-4 text-xs font-mono text-stone-200 overflow-x-auto leading-relaxed max-h-48">
                <code>{selectedArtifact.codeSnippet}</code>
              </pre>
            </div>

            {/* Epistemological Check: Establishes vs Uncertainty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1 font-bold">
                  WHAT THIS ESTABLISHES
                </span>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {selectedArtifact.whatItEstablishes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block mb-1 font-bold">
                  WHAT REMAINS UNCERTAIN
                </span>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {selectedArtifact.whatRemainsUncertain}
                </p>
              </div>
            </div>

            {/* Primary Action Trigger: SHOW ME THE PROOF */}
            <button
              onClick={() => onSelectArtifactProof(selectedArtifact)}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-amber-600 hover:from-cyan-500 hover:to-amber-500 text-stone-950 font-mono text-xs font-bold transition-all shadow-xl shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              <FileCode2 className="w-4 h-4" />
              <span>SHOW ME THE EXACT CODE PROOF IN ENCLAVE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
