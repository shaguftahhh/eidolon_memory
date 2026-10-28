import React, { useState } from 'react';
import { ForensicArtifact, EvidenceTag } from '../types/requiem';
import { Search, ShieldAlert, Sparkles, FileCode, ArrowUpRight, Eye } from 'lucide-react';

interface Props {
  artifacts: ForensicArtifact[];
  onSelectArtifact: (artifact: ForensicArtifact) => void;
}

export const RequiemEvidenceVaultSection: React.FC<Props> = ({ artifacts, onSelectArtifact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');

  const tags: string[] = [
    'All',
    'Unfinished Code',
    'Security & Deadlocks',
    'Architecture',
    'Missing Docs',
    'Dead Modules',
  ];

  const filteredArtifacts = artifacts.filter((artifact) => {
    const matchesSearch =
      artifact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.filePath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.codeSnippet.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      activeTag === 'All' ||
      artifact.tags.includes(activeTag as EvidenceTag) ||
      (activeTag === 'Unfinished Code' && artifact.typeTag.includes('UNFINISHED')) ||
      (activeTag === 'Security & Deadlocks' && artifact.typeTag.includes('SECURITY')) ||
      (activeTag === 'Architecture' && artifact.typeTag.includes('INTERPRETATION'));

    return matchesSearch && matchesTag;
  });

  return (
    <section id="evidence" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-purple-900/20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-950/40 px-3 py-1 rounded-full border border-purple-500/20">
          PRIMARY ARTIFACT ARCHIVE
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 mt-4 mb-4 tracking-tight">
          THE EVIDENCE VAULT
        </h2>
        <p className="text-stone-400 text-sm md:text-base leading-relaxed">
          Every assertion made by REQUIEM is anchored to concrete code coordinates. Inspect raw files,
          unwind broken abstractions, and review the exact lines where execution was abandoned.
        </p>
      </div>

      {/* Search & Tag Filter Bar */}
      <div className="bg-[#0E0A17] border border-purple-900/30 rounded-2xl p-4 md:p-6 mb-12 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search code paths, symbols, TODOs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#150F24]/80 border border-purple-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-stone-200 placeholder:text-stone-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Tag Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white font-medium shadow-md shadow-purple-600/30'
                      : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-purple-900/30'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtifacts.map((artifact) => {
          const isVerified = artifact.category === 'verified';
          return (
            <div
              key={artifact.id}
              className="bg-[#0D0916] border border-purple-900/30 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-purple-950/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition-colors pointer-events-none" />

              <div>
                {/* Card Top: Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldAlert className="w-3 h-3" /> VERIFIED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        <Sparkles className="w-3 h-3" /> AI HYPOTHESIS
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-purple-300/70 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-900/40">
                      {artifact.typeTag}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-stone-400">
                    {artifact.confidence}% conf
                  </span>
                </div>

                {/* File Path */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400 mb-2 truncate">
                  <FileCode className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{artifact.filePath}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-medium text-stone-100 group-hover:text-purple-200 transition-colors mb-2.5 leading-snug">
                  {artifact.title}
                </h3>

                {/* Summary */}
                <p className="text-stone-400 text-xs leading-relaxed mb-4 line-clamp-3">
                  {artifact.summary}
                </p>

                {/* Code Snippet Box */}
                <div className="bg-[#07040C] border border-purple-900/30 rounded-lg p-3 mb-4 font-mono text-[11px] text-stone-300 overflow-x-auto max-h-32">
                  <div className="text-[10px] text-stone-400 mb-1 border-b border-purple-900/20 pb-1">
                    {artifact.lineRange}
                  </div>
                  <pre className="text-stone-300 leading-tight">
                    <code>{artifact.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Action Button: SHOW ME THE PROOF */}
              <button
                onClick={() => onSelectArtifact(artifact)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400/60 font-mono text-xs font-medium transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>SHOW ME THE PROOF</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          );
        })}
      </div>

      {filteredArtifacts.length === 0 && (
        <div className="text-center py-16 bg-[#0E0A17] rounded-2xl border border-purple-900/30 text-stone-400">
          <p className="font-mono text-sm">No evidence artifacts matched your query: "{searchQuery}"</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTag('All');
            }}
            className="mt-3 text-xs text-purple-400 hover:underline font-mono"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
};
