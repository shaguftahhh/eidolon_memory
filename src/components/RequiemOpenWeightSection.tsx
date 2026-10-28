import React from 'react';
import { Cpu, ShieldCheck, Database, RefreshCw, Lock, Terminal, FileCode2, GitBranch } from 'lucide-react';

export const RequiemOpenWeightSection: React.FC = () => {
  const pipelineSteps = [
    { num: '01', title: 'Ingest Tree', desc: 'Secure local clone & checkout of historical snapshot' },
    { num: '02', title: 'AST & Dead Code Tree', desc: 'Tree-sitter extraction of orphaned symbols and TODOs' },
    { num: '03', title: 'Git Delta Strata', desc: 'Temporal analysis of commit velocity and PR discussions' },
    { num: '04', title: 'Gemma 2 Inference', desc: 'Synthesizing abandoned intent via 9B / 27B open weights' },
    { num: '05', title: 'Cross-Verification', desc: 'Strict AST check validating every generated code coordinate' },
    { num: '06', title: 'Sealed Dossier', desc: 'Cryptographically signed evidence package with zero cloud trace' },
  ];

  const pillars = [
    {
      icon: <Lock className="w-5 h-5 text-purple-400" />,
      title: 'Zero Cloud Exfiltration',
      description:
        'Proprietary codebases, internal experiments, and unreleased IP never touch third-party servers. All inference runs locally in isolated enclaves.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Hallucination Defense Protocol',
      description:
        'REQUIEM strictly segregates verifiable facts (commit logs, AST nodes, compiler panics) from AI hypotheses with explicit visual confidence badges.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-sky-400" />,
      title: 'Reproducible Archaeology',
      description:
        'Deterministic prompting, seed locking, and pinned Gemma 2 weights guarantee that two independent engineers auditing the same repo reach the same forensic truth.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      title: 'Open Weights Sovereignty',
      description:
        'Powered by Google DeepMind Gemma 2 architecture. Permissively licensed, inspectable attention layers, and adaptable for specialized domain fine-tunes.',
    },
  ];

  return (
    <section id="architecture" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-purple-900/20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
          DEEP ARCHAEOLOGY ENGINE
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 mt-4 mb-4 tracking-tight">
          WHY OPEN-WEIGHT AI MATTERS
        </h2>
        <p className="text-stone-400 text-sm md:text-base leading-relaxed">
          Proprietary closed APIs cannot be trusted with historical software heritage or private codebase
          post-mortems. REQUIEM is engineered from the ground up on open-weight Gemma 2 intelligence.
        </p>
      </div>

      {/* 6-Step Pipeline Visual */}
      <div className="bg-[#0E0A17] border border-purple-900/30 rounded-2xl p-6 md:p-8 mb-16 shadow-2xl">
        <div className="text-xs font-mono uppercase text-purple-400 tracking-wider mb-6 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            Archaeological Inference Pipeline
          </span>
          <span className="text-stone-400">Offline Execution Cycle</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineSteps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-[#140E22] border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-all group"
            >
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 mb-2 block">
                  {step.num}
                </span>
                <h4 className="text-xs font-semibold text-stone-200 mb-1.5 group-hover:text-purple-200">
                  {step.title}
                </h4>
              </div>
              <p className="text-[11px] text-stone-400 leading-normal mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-[#0D0916] border border-purple-900/30 rounded-2xl p-6 md:p-8 hover:border-purple-500/40 transition-all flex items-start gap-4"
          >
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-900/50 shrink-0">
              {pillar.icon}
            </div>
            <div>
              <h3 className="text-base md:text-lg font-serif text-stone-100 font-light mb-2">
                {pillar.title}
              </h3>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
