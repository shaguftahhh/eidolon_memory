import React from 'react';

export const RequiemFooter: React.FC = () => {
  return (
    <footer className="bg-[#08050D] border-t border-purple-900/30 pt-16 pb-12 px-6 md:px-12 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-stone-100 font-serif tracking-wider text-base font-semibold">
            <span className="text-purple-400">◆</span>
            <span>REQUIEM</span>
            <span className="text-stone-400 text-xs font-mono font-normal">/ THE GHOST ARCHIVE</span>
          </div>
          <p className="text-stone-400 leading-relaxed max-w-sm">
            Digital archaeology protocol powered by Gemma 2 open weights. Resurrecting abandoned software
            heritage and mapping the unfinished dreams of open-source creators.
          </p>
          <div className="text-[11px] font-mono text-stone-400">
            "Every codebase is a cemetery of human intent. We build the torches to read the epitaphs."
          </div>
        </div>

        {/* Links 1 */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-mono text-purple-400 uppercase tracking-widest text-[11px] font-bold">
            Archaeology
          </div>
          <ul className="space-y-2">
            <li><a href="#autopsy" className="hover:text-purple-300 transition-colors">Case Autopsy</a></li>
            <li><a href="#how-it-works" className="hover:text-purple-300 transition-colors">Methodology</a></li>
            <li><a href="#timeline" className="hover:text-purple-300 transition-colors">Ghost Timeline</a></li>
            <li><a href="#evidence" className="hover:text-purple-300 transition-colors">Evidence Vault</a></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-mono text-purple-400 uppercase tracking-widest text-[11px] font-bold">
            Revival
          </div>
          <ul className="space-y-2">
            <li><a href="#blueprint" className="hover:text-purple-300 transition-colors">Revival Blueprint</a></li>
            <li><a href="#blueprint" className="hover:text-purple-300 transition-colors">P0 Emergency Fix</a></li>
            <li><a href="#blueprint" className="hover:text-purple-300 transition-colors">Hacktoberfest Spec</a></li>
            <li><a href="#blueprint" className="hover:text-purple-300 transition-colors">Export Issue</a></li>
          </ul>
        </div>

        {/* Links 3 */}
        <div className="md:col-span-3 space-y-3">
          <div className="font-mono text-purple-400 uppercase tracking-widest text-[11px] font-bold">
            Model & Provenance
          </div>
          <ul className="space-y-2">
            <li><a href="#architecture" className="hover:text-purple-300 transition-colors">Gemma 2 9B / 27B</a></li>
            <li><a href="#governance" className="hover:text-purple-300 transition-colors">Zero Cloud Exfiltration</a></li>
            <li><a href="#governance" className="hover:text-purple-300 transition-colors">Hallucination Defense</a></li>
            <li><a href="#governance" className="hover:text-purple-300 transition-colors">Archival Ethics</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-purple-900/20 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-stone-400">
        <div>
          REQUIEM PROTOCOL © {new Date().getFullYear()} — AN OPEN ARTIFACT PRESERVATION INITIATIVE
        </div>
        <div className="flex items-center gap-4">
          <span className="text-purple-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            GEMMA 2 LOCAL ENCLAVE READY
          </span>
          <span>HACKTOBERFEST HERITAGE</span>
        </div>
      </div>
    </footer>
  );
};
