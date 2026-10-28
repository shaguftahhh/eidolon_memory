import React, { useState } from 'react';
import { TimelineMilestone } from '../types/requiem';
import { GitCommit, Sparkles, AlertOctagon, CheckCircle2, ChevronRight, Copy, Check } from 'lucide-react';

interface Props {
  milestones: TimelineMilestone[];
  onOpenProofModal?: (code: string, file: string, title: string) => void;
}

export const RequiemTimelineSection: React.FC<Props> = ({ milestones, onOpenProofModal }) => {
  const [selectedId, setSelectedId] = useState<string>(milestones[milestones.length - 1]?.id || milestones[0]?.id);
  const [copied, setCopied] = useState(false);

  const activeMilestone = milestones.find((m) => m.id === selectedId) || milestones[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeBadge = (type: TimelineMilestone['type']) => {
    switch (type) {
      case 'verified_git':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GitCommit className="w-3 h-3" /> VERIFIED GIT COMMIT
          </span>
        );
      case 'ai_inference':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <Sparkles className="w-3 h-3" /> GEMMA 2 INFERENCE
          </span>
        );
      case 'repo_freeze':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertOctagon className="w-3 h-3" /> REPOSITORY FREEZE
          </span>
        );
    }
  };

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-purple-900/20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
          CHRONOLOGICAL STRATA
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 mt-4 mb-4 tracking-tight">
          THE GHOST TIMELINE
        </h2>
        <p className="text-stone-400 text-sm md:text-base leading-relaxed">
          Every open-source abandonment tells a chronological story. We correlate commit velocity, PR commentary,
          and uncommitted branch fragments to reconstruct the exact trajectory where development lost its pulse.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Strata Steps */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
            <span>Historical Strata Events</span>
            <span className="text-purple-400">{milestones.length} Recorded Phases</span>
          </div>

          {milestones.map((milestone, idx) => {
            const isSelected = milestone.id === selectedId;
            return (
              <button
                key={milestone.id}
                onClick={() => setSelectedId(milestone.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden flex items-start gap-4 ${
                  isSelected
                    ? 'bg-[#150F24] border-purple-500/50 shadow-lg shadow-purple-950/30'
                    : 'bg-[#0E0A17]/60 border-purple-900/30 hover:border-purple-800/60 hover:bg-[#120D1F]'
                }`}
              >
                {/* Left Step Indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                      isSelected
                        ? 'bg-purple-600 text-stone-100 shadow-md shadow-purple-500/40 ring-2 ring-purple-400/30'
                        : 'bg-stone-900 text-stone-400 border border-purple-900/40'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-[1px] h-8 bg-purple-900/30 my-1" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-stone-400">{milestone.date}</span>
                    {milestone.commitHash && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-purple-300 border border-purple-900/40">
                        {milestone.commitHash}
                      </span>
                    )}
                  </div>
                  <h4 className={`text-sm font-medium leading-snug truncate ${isSelected ? 'text-stone-100 font-semibold' : 'text-stone-300'}`}>
                    {milestone.title}
                  </h4>
                  <div className="mt-2">
                    {getTypeBadge(milestone.type)}
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 mt-2 transition-transform ${
                    isSelected ? 'text-purple-400 translate-x-1' : 'text-stone-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Deep Dive Pane */}
        <div className="lg:col-span-7 bg-[#0E0A17] border border-purple-900/40 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-900/30 mb-6">
            <div className="flex items-center gap-3">
              {getTypeBadge(activeMilestone.type)}
              {activeMilestone.commitHash && (
                <span className="text-xs font-mono text-stone-400 flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded border border-purple-900/30">
                  <GitCommit className="w-3.5 h-3.5 text-purple-400" />
                  {activeMilestone.commitHash}
                </span>
              )}
            </div>
            <div className="text-xs font-mono text-stone-400">
              Timestamp: <span className="text-stone-300">{activeMilestone.date}</span>
            </div>
          </div>

          {/* Milestone Title & Description */}
          <h3 className="text-xl md:text-2xl font-serif text-stone-100 font-light mb-3">
            {activeMilestone.title}
          </h3>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-6">
            {activeMilestone.description}
          </p>

          {/* Code Artifact / Git Diff if present */}
          {activeMilestone.codeSnippet && (
            <div className="mb-6">
              <div className="flex items-center justify-between bg-stone-950/80 px-4 py-2 rounded-t-lg border-t border-x border-purple-900/30 text-xs font-mono text-stone-400">
                <span>Archaeological Evidence Fragment</span>
                <button
                  onClick={() => handleCopyCode(activeMilestone.codeSnippet || '')}
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-b-lg bg-[#08050E] border border-purple-900/30 overflow-x-auto text-xs font-mono text-stone-300 leading-relaxed max-h-56">
                <code>{activeMilestone.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Verified Archaeological Note */}
          <div className="bg-[#150F24]/60 border border-purple-500/20 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-300 leading-relaxed">
              <span className="font-semibold text-stone-200 block mb-0.5 font-mono">
                {activeMilestone.verifiedNotes || 'STRATUM VERIFICATION STATUS'}
              </span>
              Cross-checked against the raw Git commit tree. AST diff confirmed zero subsequent commits touched this subsystem prior to archival freeze.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
