import React from 'react';
import { Search, Sparkles, HeartHandshake, Compass } from 'lucide-react';

export const EidolonHowItWorks: React.FC = () => {
  const stages = [
    {
      num: '01',
      name: 'SALVAGE',
      title: 'Excavate the Scattered Relics',
      desc: 'Ingest analog cassette digitizations, scanned journal pages, daguerreotypes, and abandoned git histories. Extract temporal markers, emotional sentiment, and unfinished thoughts.',
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/40 text-cyan-300',
    },
    {
      num: '02',
      name: 'ATTUNE',
      title: 'Attune the Spectral Resonance',
      desc: 'Gemma 2 local open-weight intelligence runs on your device with zero cloud connectivity. Cross-examine what was written against what was whispered, separating established facts from human inference.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 text-amber-300',
    },
    {
      num: '03',
      name: 'RESURRECT',
      title: 'Breathe the Memory Ghost Back to Life',
      desc: 'Manifest the living apparition. Trace continuous connections across decades, generate revived poetic stories, and export turnkey revival blueprints to continue their unfinished work.',
      icon: <HeartHandshake className="w-5 h-5 text-teal-400" />,
      color: 'border-teal-500/40 text-teal-300',
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-24 bg-[#0A0713] border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPECTRAL ARCHAEOLOGY PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100 tracking-tight leading-tight mb-4">
            HOW EIDOLON WORKS
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Three disciplined archaeological phases reconcile physical relics with local machine intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="p-8 rounded-3xl bg-[#0D0917] border border-stone-800/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif font-light text-stone-400 group-hover:text-cyan-300 transition-colors">
                    {stage.num}
                  </span>
                  <div className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800">
                    {stage.icon}
                  </div>
                </div>

                <span className={`text-[11px] font-mono tracking-widest uppercase block mb-1 font-semibold ${stage.color}`}>
                  STAGE {stage.num} // {stage.name}
                </span>
                <h3 className="text-lg font-serif font-normal text-stone-100 mb-3 group-hover:text-cyan-200 transition-colors">
                  {stage.title}
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/60 text-[10px] font-mono text-cyan-400/80 uppercase">
                Zero Cloud Telemetry • 100% Deterministic
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
