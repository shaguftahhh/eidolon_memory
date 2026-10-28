import React, { useState } from 'react';
import { TimelineMilestone } from '../types/requiem';
import { GitCommit, Sparkles, AlertOctagon, CheckCircle2, ChevronRight, Copy, Check, Flame, Heart } from 'lucide-react';
import { soundEngine } from '../audio/ambientSynth';

interface Props {
  milestones: TimelineMilestone[];
  onOpenProofModal?: (code: string, file: string, title: string) => void;
}

export const EidolonTimelineSection: React.FC<Props> = ({ milestones, onOpenProofModal }) => {
  const [selectedId, setSelectedId] = useState<string>(milestones[milestones.length - 1]?.id || milestones[0]?.id);
  const [copied, setCopied] = useState(false);

  const activeMilestone = milestones.find((m) => m.id === selectedId) || milestones[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    soundEngine.playCassetteClick();
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <Sparkles className="w-3 h-3" /> GEMMA 2 INFERENCE
          </span>
        );
      case 'repo_freeze':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <Flame className="w-3 h-3" /> HUMAN DEPARTURE & REPO FREEZE
          </span>
        );
    }
  };

  return (
    <section id="timeline" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-cyan-500/20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
          TEMPORAL HUMAN STRATA
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 mt-4 mb-4 tracking-tight">
          THE GHOST TIMELINE
        </h2>
        <p className="text-stone-300 text-sm md:text-base leading-relaxed">
          Every abandonment tells a human story. We correlate commit velocity, personal comments,
          and uncommitted branch fragments to reconstruct the exact trajectory where the human pulse ceased.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Strata Steps */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
            <span>Historical Milestones</span>
            <span className="text-cyan-400">{milestones.length} Recorded Phases</span>
          </div>

          {milestones.map((milestone, idx) => {
            const isSelected = milestone.id === selectedId;
            return (
              <button
                key={milestone.id}
                onClick={() => {
                  setSelectedId(milestone.id);
                  soundEngine.playCassetteClick();
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden flex items-start gap-4 ${
                  isSelected
                    ? 'bg-[#120D20] border-cyan-400/80 shadow-lg shadow-cyan-950/40'
                    : 'bg-[#0C0816]/80 border-stone-800 hover:border-cyan-800/60 hover:bg-[#100B1D]'
                }`}
              >
                {/* Left Step Indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                      isSelected
                        ? 'bg-cyan-400 text-stone-950 shadow-md shadow-cyan-400/40 ring-2 ring-cyan-400/30'
                        : 'bg-stone-900 text-stone-400 border border-stone-800'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-[1px] h-8 bg-stone-800 my-1" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400/90">{milestone.date}</span>
                    {milestone.commitHash && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">
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
                    isSelected ? 'text-cyan-400 translate-x-1' : 'text-stone-500'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Deep Dive Pane */}
        <div className="lg:col-span-7 bg-[#0C0816] border border-cyan-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-800 mb-6">
            <div className="flex items-center gap-3">
              {getTypeBadge(activeMilestone.type)}
              {activeMilestone.commitHash && (
                <span className="text-xs font-mono text-stone-300 flex items-center gap-1.5 bg-stone-900/80 px-2.5 py-1 rounded-xl border border-stone-800">
                  <GitCommit className="w-3.5 h-3.5 text-cyan-400" />
                  {activeMilestone.commitHash}
                </span>
              )}
            </div>
            <div className="text-xs font-mono text-stone-400">
              Recorded Epoch: <span className="text-cyan-300">{activeMilestone.date}</span>
            </div>
          </div>

          {/* Milestone Title & Description */}
          <h3 className="text-xl md:text-2xl font-serif text-stone-100 font-light mb-3">
            {activeMilestone.title}
          </h3>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
            {activeMilestone.description}
          </p>

          {/* Code Artifact / Git Diff if present */}
          {activeMilestone.codeSnippet && (
            <div className="mb-6">
              <div className="flex items-center justify-between bg-stone-950 px-4 py-2 rounded-t-xl border-t border-x border-stone-800 text-xs font-mono text-stone-400">
                <span>Salvaged Relic Fragment</span>
                <button
                  onClick={() => handleCopyCode(activeMilestone.codeSnippet || '')}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Fragment'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-b-xl bg-[#060309] border border-stone-800 overflow-x-auto text-xs font-mono text-stone-300 leading-relaxed max-h-56">
                <code>{activeMilestone.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Verified Archaeological Note */}
          <div className="bg-[#120D20] border border-cyan-500/30 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-300 leading-relaxed font-sans">
              <span className="font-semibold text-cyan-300 block mb-0.5 font-mono">
                {activeMilestone.verifiedNotes || 'STRATUM VERIFICATION STATUS'}
              </span>
              Reconciled against local commit diffs and maintainer commentary. Cross-validated with Gemma 2 offline attention maps.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
