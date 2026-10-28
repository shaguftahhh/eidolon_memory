import React from 'react';
import { Upload, FolderOpen, Flame, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

interface EidolonTerminalGatewayProps {
  onStartCustomInvestigation: () => void;
  onOpenSampleCase: () => void;
}

export const EidolonTerminalGateway: React.FC<EidolonTerminalGatewayProps> = ({
  onStartCustomInvestigation,
  onOpenSampleCase,
}) => {
  return (
    <section className="w-full py-24 bg-[#08050D] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-cyan-400 mb-3">
            <span className="w-8 h-[1px] bg-cyan-400/60" />
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              INTERACTIVE SPECTRAL TERMINAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100 tracking-tight leading-tight mb-4">
            THE ARCHIVE IS WAITING.
          </h2>
          <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed">
            Choose whether to initiate an excavation into your own salvaged archives or explore a pre-attuned
            human ghost case study.
          </p>
        </div>

        {/* 2 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Custom Investigation */}
          <div className="p-8 rounded-3xl bg-[#0C0816] border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex flex-col justify-between group shadow-xl hover:shadow-cyan-950/40">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-900/40">
                  LOCAL ENCLAVE INGEST
                </span>
              </div>

              <h3 className="text-2xl font-serif font-normal text-stone-100 group-hover:text-cyan-200 transition-colors mb-2">
                Excavate a New Memory Soulprint
              </h3>
              <p className="text-xs font-mono text-cyan-400/80 mb-4">
                Audio tape digitizations, journal scans, or GitHub repository
              </p>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                Point EIDOLON toward an abandoned code tree or folder of personal memories. The local Gemma 2
                engine performs an immediate zero-execution AST walk and temporal resonance pass.
              </p>
            </div>

            <button
              onClick={onStartCustomInvestigation}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-stone-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>COMMENCE DIGITAL EXCAVATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Sample Case Study */}
          <div className="p-8 rounded-3xl bg-[#0E0A18] border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between group shadow-xl hover:shadow-amber-950/40">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-900/40">
                  PRE-ATTUNED CASE STUDY
                </span>
              </div>

              <h3 className="text-2xl font-serif font-normal text-stone-100 group-hover:text-amber-200 transition-colors mb-2">
                Leo Sterling & HyperFlow Engine
              </h3>
              <p className="text-xs font-mono text-amber-400/80 mb-4">
                The Midnight Architect (1991–2024) • Rust & Asynchronous Telemetry
              </p>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                Explore an authentic multi-stratum autopsy. Inspect the uncommitted branch fragments,
                the fatal sync mutex pin, and the exact lines of code where momentum ceased.
              </p>
            </div>

            <button
              onClick={onOpenSampleCase}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-mono text-xs font-bold transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
            >
              <span>EXPLORE HYPERFLOW ARCHIVE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-stone-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero cloud egress: All processing occurs strictly on your machine.</span>
        </div>
      </div>
    </section>
  );
};
