import React from 'react';
import { FileText, Radio, HeartCrack, Flame } from 'lucide-react';

export const EidolonProblemSection: React.FC = () => {
  const cards = [
    {
      step: '01',
      title: 'The Intent Remains Buried',
      subtitle: 'Unsent letters, margin notes, and midnight commits',
      body: 'Every human creator leaves behind fragments of what they intended to say. When time moves on, those intentions gather dust in attics, discarded hard drives, and private branches.',
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      borderGlow: 'hover:border-amber-500/50 shadow-amber-950/20',
      badge: 'BURIED THOUGHTS',
    },
    {
      step: '02',
      title: 'The Frequency Becomes Scattered',
      subtitle: 'Audio tape flutter, spectrograms, and silence',
      body: 'A grandmother’s voice note, the sound of rain on a tin roof in 1997, a synthesizer track left unrendered. The physical mediums decay, scattering the human presence into cosmic background noise.',
      icon: <Radio className="w-5 h-5 text-cyan-400" />,
      borderGlow: 'hover:border-cyan-500/50 shadow-cyan-950/20',
      badge: 'ANALOG DECAY',
    },
    {
      step: '03',
      title: 'The Next Breath Becomes Uncertain',
      subtitle: 'Where do the dreams go when the creator departs?',
      body: 'A project does not die because it was broken; it dies because the human behind it ran out of time. EIDOLON breathes local intelligence into those embers to ensure the story continues.',
      icon: <HeartCrack className="w-5 h-5 text-rose-400" />,
      borderGlow: 'hover:border-rose-500/50 shadow-rose-950/20',
      badge: 'UNFINISHED DREAMS',
    },
  ];

  return (
    <section id="problem" className="w-full py-24 bg-[#08050D] border-b border-cyan-500/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-cyan-400 mb-3">
            <span className="w-8 h-[1px] bg-cyan-400/60" />
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              THE CEMETERY OF HUMAN INTENT
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-100 tracking-tight leading-tight mb-4">
            NOT EVERY ENDING WAS INTENDED.
          </h2>
          <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed">
            Every human life and creative work leaves behind a constellation of abandoned moments.
            Without an intentional archive, the nuance of what they loved dissolves into silence.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.step}
              className={`p-8 rounded-3xl bg-[#0C0816] border border-stone-800/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl ${card.borderGlow}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-900/50">
                    PHASE {card.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-stone-900/80 border border-stone-800">
                    {card.icon}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mb-2">
                  {card.badge}
                </div>
                <h3 className="text-xl font-serif font-normal text-stone-100 group-hover:text-cyan-200 transition-colors mb-2 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mb-4">
                  {card.subtitle}
                </p>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-800/60 flex items-center justify-between text-xs font-mono text-stone-400">
                <span>Preservation Priority</span>
                <span className="text-amber-400 font-medium">Critical Strata</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
