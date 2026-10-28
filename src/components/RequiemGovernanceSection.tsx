import React from 'react';
import { Shield, BookOpen, Scale, HeartHandshake } from 'lucide-react';

export const RequiemGovernanceSection: React.FC = () => {
  const cards = [
    {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      title: 'Zero Execution Guarantee',
      body: 'REQUIEM employs purely static Abstract Syntax Tree (AST) analysis and temporal git differential walks. No arbitrary scripts, tests, or binary payloads are ever executed in the archaeological environment.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      title: 'Preservation of Original Authorship',
      body: 'Every reconstructed timeline faithfully attributes the original maintainers and preserves existing licenses (Apache-2.0, MIT, BSD, GPL). Software archaeology honors original human intent.',
    },
    {
      icon: <Scale className="w-5 h-5 text-amber-400" />,
      title: 'Epistemological Separation',
      body: 'Verified code coordinates and git commit hashes are never conflated with probabilistic completions. All AI hypotheses are explicitly tagged with confidence meters and uncertainty boundaries.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-400" />,
      title: 'Community Stewardship & Hacktoberfest',
      body: 'Thousands of repositories freeze when maintainers experience life transitions. By turning abandonment into structured revival roadmaps, we empower the next generation of contributors.',
    },
  ];

  return (
    <section id="governance" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-purple-900/20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
          ARCHAEOLOGICAL ETHICS
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 mt-4 mb-4 tracking-tight">
          PRIVACY, COPYRIGHT & TRUST
        </h2>
        <p className="text-stone-400 text-sm md:text-base leading-relaxed">
          Digital archaeology requires disciplined ethics. We treat abandoned repositories with the
          intellectual reverence of an ancient archive, never an exploit target.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="p-6 md:p-8 rounded-2xl bg-[#0E0A17] border border-purple-900/30 hover:border-purple-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#150F24] border border-purple-900/50 flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-serif text-stone-100 font-light mb-2">
                {card.title}
              </h3>
              <p className="text-stone-400 text-xs md:text-sm leading-relaxed">
                {card.body}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-purple-900/20 text-[10px] font-mono text-purple-400 uppercase tracking-widest">
              REQUIEM ARCHIVAL ETHICS CHARTER § {idx + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
