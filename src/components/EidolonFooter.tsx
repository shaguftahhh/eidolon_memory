import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

export const EidolonFooter: React.FC = () => {
  return (
    <footer className="bg-[#050308] border-t border-cyan-500/20 pt-16 pb-12 px-6 md:px-12 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5 text-stone-100 font-serif tracking-wider text-base font-semibold">
            <span className="text-cyan-400">✦</span>
            <span>EIDOLON</span>
            <span className="text-cyan-400/80 text-xs font-mono font-normal">/ THE HUMAN GHOST ARCHIVE</span>
          </div>
          <p className="text-stone-300 leading-relaxed max-w-sm font-sans">
            Offline human memory preservation protocol powered by Gemma 2 open weights.
            Reconstructing forgotten human lives, abandoned letters, and deceased projects entirely on your machine.
          </p>
          <div className="text-[11px] font-mono text-amber-300/80 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>"The ghost is not a phantom of fear, but the memory itself seeking a home."</span>
          </div>
        </div>

        {/* Links 1 */}
        <div className="md:col-span-2 space-y-3 font-mono">
          <div className="text-cyan-400 uppercase tracking-widest text-[11px] font-bold">
            Archaeology
          </div>
          <ul className="space-y-2">
            <li><a href="#manifestation" className="hover:text-cyan-300 transition-colors">Ghost Manifestation</a></li>
            <li><a href="#autopsy" className="hover:text-cyan-300 transition-colors">Human Autopsy</a></li>
            <li><a href="#timeline" className="hover:text-cyan-300 transition-colors">Strata Timeline</a></li>
            <li><a href="#evidence" className="hover:text-cyan-300 transition-colors">Evidence Vault</a></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="md:col-span-2 space-y-3 font-mono">
          <div className="text-amber-400 uppercase tracking-widest text-[11px] font-bold">
            Resuscitation
          </div>
          <ul className="space-y-2">
            <li><a href="#blueprint" className="hover:text-amber-300 transition-colors">Revival Blueprint</a></li>
            <li><a href="#blueprint" className="hover:text-amber-300 transition-colors">P0 Emergency Fix</a></li>
            <li><a href="#blueprint" className="hover:text-amber-300 transition-colors">Hacktoberfest Spec</a></li>
            <li><a href="#blueprint" className="hover:text-amber-300 transition-colors">Export Issue</a></li>
          </ul>
        </div>

        {/* Links 3 */}
        <div className="md:col-span-3 space-y-3 font-mono">
          <div className="text-purple-400 uppercase tracking-widest text-[11px] font-bold">
            Sanctuary & Ethics
          </div>
          <ul className="space-y-2">
            <li><a href="#architecture" className="hover:text-purple-300 transition-colors">Gemma 2 Open Weights</a></li>
            <li><a href="#governance" className="hover:text-purple-300 transition-colors">Zero Cloud Exfiltration</a></li>
            <li><a href="#governance" className="hover:text-purple-300 transition-colors">Hallucination Defense</a></li>
            <li><a href="#governance" className="hover:text-purple-300 transition-colors">Día de los Muertos Altar</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-stone-400">
        <div>
          EIDOLON PROTOCOL © {new Date().getFullYear()} — AN OFFLINE MEMORY GHOST INITIATIVE
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping"></span>
            GEMMA 2 LOCAL ENCLAVE READY
          </span>
          <span className="text-amber-400/90 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            100% PRIVATE HUMAN SANCTUARY
          </span>
        </div>
      </div>
    </footer>
  );
};
