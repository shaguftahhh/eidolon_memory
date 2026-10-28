import React from 'react';
import { Upload, FolderOpen, ShieldCheck } from 'lucide-react';

interface RequiemTerminalGatewayProps {
  onStartCustomInvestigation: () => void;
  onOpenSampleCase: () => void;
}

export const RequiemTerminalGateway: React.FC<RequiemTerminalGatewayProps> = ({
  onStartCustomInvestigation,
  onOpenSampleCase
}) => {
  return (
    <section className="w-full py-24 bg-[#0B0912] border-b border-[#1E172B]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-violet-400 mb-3">
            <span className="w-8 h-[1px] bg-violet-400/60" />
            <span>INTERACTIVE FORENSIC TERMINAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight leading-tight mb-4">
            THE ARCHIVE IS WAITING.
          </h2>
          <p className="text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
            Begin with your own forgotten codebase, or immediately explore the authentic precomputed archaeological autopsy of <strong className="text-stone-200">HyperFlow Engine</strong> — zero API key or sign-up required.
          </p>
        </div>

        {/* Action Gateways Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card 1: Custom Investigation */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-[#261C36] hover:border-violet-600/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-violet-950/40 text-violet-400 border border-violet-800/40">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-violet-400/80">
                  CUSTOM REPO
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mb-3">
                INVESTIGATE A PROJECT
              </h3>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                Upload source files, manifests, or README archives. REQUIEM parses evidence and runs forensic extraction through the configured Gemma inference adapter.
              </p>
            </div>
            <button
              onClick={onStartCustomInvestigation}
              className="w-full py-3.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-violet-400 to-indigo-300 hover:from-violet-300 hover:to-indigo-200 transition-colors shadow-lg cursor-pointer"
            >
              START INVESTIGATION
            </button>
          </div>

          {/* Card 2: Sample Case */}
          <div className="p-8 rounded-xl bg-[#120D1D]/90 border border-amber-600/30 hover:border-amber-500/60 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-amber-950/40 text-amber-400 border border-amber-800/40">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400/80">
                  INSTANT ACCESS
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mb-3">
                EXPLORE A SAMPLE CASE
              </h3>
              <p className="text-sm text-stone-400 font-sans leading-relaxed mb-6">
                Inspect the fully reconstructed autopsy of HyperFlow Engine: 6 evidence-backed findings with real line proofs, git ghost timeline, and interactive dreams map.
              </p>
            </div>
            <button
              onClick={onOpenSampleCase}
              className="w-full py-3.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 transition-colors shadow-lg cursor-pointer"
            >
              OPEN HYPERFLOW CASE STUDY
            </button>
          </div>
        </div>

        {/* Disclaimer / Privacy footnote */}
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Sample cases are precomputed from authentic historical open-source repositories without simulated latency.</span>
        </div>
      </div>
    </section>
  );
};
