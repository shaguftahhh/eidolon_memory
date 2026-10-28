import React, { useState } from 'react';
import { CaseStudy, ForensicArtifact, FindingCategory } from '../types/requiem';
import {
  FolderOpen,
  FileText,
  Clock,
  Shield,
  Code2,
  Download,
  X,
  ExternalLink,
  Search,
  Sparkles,
  GitCommit,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  Settings,
  Plus
} from 'lucide-react';

interface Props {
  caseStudy: CaseStudy;
  onExitChamber: () => void;
  onSelectArtifact: (artifact: ForensicArtifact) => void;
  onOpenModelSettings: () => void;
  onOpenNewInvestigation: () => void;
}

export const RequiemChamberWorkspace: React.FC<Props> = ({
  caseStudy,
  onExitChamber,
  onSelectArtifact,
  onOpenModelSettings,
  onOpenNewInvestigation,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'autopsy' | 'evidence' | 'timeline' | 'roadmap' | 'json'>('overview');
  const [copiedJson, setCopiedJson] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [completedP0Tasks, setCompletedP0Tasks] = useState<Record<number, boolean>>({});

  const toggleP0Task = (idx: number) => {
    setCompletedP0Tasks((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleDownloadMarkdown = () => {
    const md = `# EIDOLON SPECTRAL DOSSIER: ${caseStudy.name}
${caseStudy.tagline}

- **License:** ${caseStudy.license}
- **Languages:** ${caseStudy.languages.join(', ')}
- **Analysis Engine:** ${caseStudy.modelUsed}
- **Analysis Date:** ${caseStudy.analysisDate}

## 1. Core Intent
${caseStudy.coreIntent}

## 2. Target Audience
${caseStudy.targetAudience}

## 3. Stalled Reason Autopsy
${caseStudy.stalledReason}

## 4. Evidence Artifacts
${caseStudy.artifacts
  .map(
    (a) => `### [${a.category.toUpperCase()}] ${a.title} (${a.filePath} ${a.lineRange})
${a.summary}
\`\`\`
${a.codeSnippet}
\`\`\`
- **Establishes:** ${a.whatItEstablishes}
- **Uncertainty:** ${a.whatRemainsUncertain}
`
  )
  .join('\n')}

## 5. Revival Blueprint
### P0 - ${caseStudy.blueprint.p0.title}
${caseStudy.blueprint.p0.tasks.map((t) => `- [ ] ${t}`).join('\n')}

### P1 - ${caseStudy.blueprint.p1.title}
${caseStudy.blueprint.p1.tasks.map((t) => `- [ ] ${t}`).join('\n')}

### P2 - ${caseStudy.blueprint.p2.title}
${caseStudy.blueprint.p2.tasks.map((t) => `- [ ] ${t}`).join('\n')}
`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eidolon-dossier-${caseStudy.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(caseStudy, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `eidolon-dossier-${caseStudy.id}.json`;
    a.click();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(caseStudy, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07050A] text-stone-200 flex flex-col font-sans">
      {/* Top Workspace Header */}
      <header className="h-14 border-b border-cyan-500/20 bg-[#0B0814] px-4 md:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-serif text-stone-100 font-semibold tracking-wider text-sm">
            <span className="text-cyan-400">✦</span>
            <span>EIDOLON</span>
            <span className="text-cyan-400/80 font-mono text-xs font-normal">/ SPECTRAL CHAMBER</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-stone-800 text-xs font-mono">
            <span className="text-stone-400">SUBJECT:</span>
            <span className="text-cyan-300 font-medium bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              {caseStudy.name}
            </span>
            <span className="text-stone-400">STATE:</span>
            <span className="text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/40 text-[10px]">
              FROZEN
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Model Status Pill */}
          <button
            onClick={onOpenModelSettings}
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#140E22] hover:bg-[#1C142E] border border-stone-800 text-xs font-mono text-stone-300 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="hidden md:inline">Gemma 2 Enclave</span>
            <Settings className="w-3.5 h-3.5 text-stone-400 ml-1" />
          </button>

          {/* New Investigation Button */}
          <button
            onClick={onOpenNewInvestigation}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden md:inline">New Archive</span>
          </button>

          {/* Exit Chamber */}
          <button
            onClick={onExitChamber}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-mono transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Chamber</span>
          </button>
        </div>
      </header>

      {/* Main Chamber Layout: Sidebar + Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 md:w-72 border-r border-purple-900/40 bg-[#0B0714] flex flex-col justify-between shrink-0 overflow-y-auto">
          {/* Dossier Summary Card */}
          <div className="p-4 space-y-4">
            <div className="p-3.5 rounded-xl bg-[#120B1F] border border-purple-900/40 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>DOSSIER REF</span>
                <span className="text-purple-400 font-semibold">#HYP-2024-42</span>
              </div>
              <h3 className="font-serif text-sm font-semibold text-stone-100">{caseStudy.name}</h3>
              <p className="text-[11px] text-stone-400 leading-snug line-clamp-2">
                {caseStudy.tagline}
              </p>
              <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>{caseStudy.languages.join(' • ')}</span>
                <span className="text-emerald-400">94% CONFIDENCE</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-purple-400/80 uppercase tracking-wider px-2 py-1">
                Forensic Stratigraphy
              </div>

              {[
                { id: 'overview', label: '01 CASE OVERVIEW', icon: <FileText className="w-4 h-4" /> },
                { id: 'autopsy', label: `02 AUTOPSY & FINDINGS (${caseStudy.artifacts.length})`, icon: <Shield className="w-4 h-4" /> },
                { id: 'evidence', label: '03 EVIDENCE VAULT', icon: <Code2 className="w-4 h-4" /> },
                { id: 'timeline', label: '04 STRATA TIMELINE', icon: <Clock className="w-4 h-4" /> },
                { id: 'roadmap', label: '05 REVIVAL ROADMAP', icon: <CheckCircle className="w-4 h-4" /> },
                { id: 'json', label: '06 RAW DOSSIER JSON', icon: <FolderOpen className="w-4 h-4" /> },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                      isActive
                        ? 'bg-purple-600 text-white font-medium shadow-md shadow-purple-600/30'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-[#140E22]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Bottom Export Buttons */}
          <div className="p-4 border-t border-purple-900/30 space-y-2 bg-[#090510]">
            <button
              onClick={handleDownloadMarkdown}
              className="w-full py-2 px-3 rounded-lg bg-[#140E22] hover:bg-[#1C142E] text-stone-300 border border-purple-900/40 text-xs font-mono transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Export Markdown</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="w-full py-2 px-3 rounded-lg bg-[#140E22] hover:bg-[#1C142E] text-stone-300 border border-purple-900/40 text-xs font-mono transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Download JSON</span>
            </button>
          </div>
        </aside>

        {/* Right Main Stage */}
        <main className="flex-1 overflow-y-auto bg-[#08050D] p-6 md:p-8">
          {activeTab === 'overview' && (
            <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest bg-purple-950/40 px-2.5 py-1 rounded border border-purple-900/40">
                  AUTOPSY SUMMARY REPORT
                </span>
                <h1 className="text-3xl font-serif text-stone-100 font-light mt-3 mb-2">
                  {caseStudy.name}
                </h1>
                <p className="text-stone-400 text-sm">{caseStudy.tagline}</p>
              </div>

              {/* Bento Quick Facts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#0E0A17] border border-purple-900/30">
                  <div className="text-[11px] font-mono text-stone-400 uppercase mb-1">Languages</div>
                  <div className="text-sm font-semibold text-stone-200">{caseStudy.languages.join(', ')}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0E0A17] border border-purple-900/30">
                  <div className="text-[11px] font-mono text-stone-400 uppercase mb-1">License</div>
                  <div className="text-sm font-semibold text-stone-200">{caseStudy.license}</div>
                </div>
                <div className="p-4 rounded-xl bg-[#0E0A17] border border-purple-900/30">
                  <div className="text-[11px] font-mono text-stone-400 uppercase mb-1">Archaeology Engine</div>
                  <div className="text-sm font-semibold text-purple-300">{caseStudy.modelUsed}</div>
                </div>
              </div>

              {/* Core Intent & Target Audience */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#0E0A17] border border-purple-900/30 space-y-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold">
                    01 Core Intent Reconstructed
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">{caseStudy.coreIntent}</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0E0A17] border border-purple-900/30 space-y-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-purple-400 font-bold">
                    02 Target Audience & Ecosystem Position
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">{caseStudy.targetAudience}</p>
                </div>

                <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-rose-400 font-bold">
                    03 Root Cause of Abandonment
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">{caseStudy.stalledReason}</p>
                </div>
              </div>

              {/* Quick Jump Call to Action */}
              <div className="p-4 rounded-xl bg-[#140E22] border border-purple-900/40 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">
                  {caseStudy.artifacts.length} verified code artifacts available for inspection
                </span>
                <button
                  onClick={() => setActiveTab('autopsy')}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Examine Artifacts</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'autopsy' && (
            <div className="max-w-5xl space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-stone-100 font-light">Forensic Autopsy Findings</h2>
                  <p className="text-xs text-stone-400 font-mono mt-1">
                    Direct AST extractions and inferred structural bottlenecks
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.artifacts.map((art) => (
                  <div
                    key={art.id}
                    className="p-5 rounded-2xl bg-[#0E0A17] border border-purple-900/40 hover:border-purple-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                            art.category === 'verified'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          }`}
                        >
                          {art.badgeLabel}
                        </span>
                        <span className="text-xs font-mono text-stone-400">{art.filePath}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-100 mb-2">{art.title}</h4>
                      <p className="text-xs text-stone-400 leading-relaxed mb-4 line-clamp-3">
                        {art.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectArtifact(art)}
                      className="w-full py-2 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-purple-900/50 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Show Proof & Coordinates</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="max-w-5xl space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-stone-100 font-light">Evidence Vault</h2>
                  <p className="text-xs text-stone-400 font-mono mt-1">
                    Search and inspect raw code snippets from the excavation
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {caseStudy.artifacts.map((art) => (
                  <div
                    key={art.id}
                    className="p-5 rounded-2xl bg-[#0D0916] border border-purple-900/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-purple-400">
                          {art.filePath}
                        </span>
                        <span className="text-xs font-mono text-stone-400">({art.lineRange})</span>
                      </div>
                      <button
                        onClick={() => onSelectArtifact(art)}
                        className="px-3 py-1 rounded bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 text-xs font-mono border border-purple-800/40"
                      >
                        Inspect Full Context
                      </button>
                    </div>
                    <pre className="p-3 bg-[#06030A] rounded-lg border border-purple-900/30 overflow-x-auto text-xs font-mono text-stone-300">
                      <code>{art.codeSnippet}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-serif text-stone-100 font-light">Strata Timeline</h2>
                <p className="text-xs text-stone-400 font-mono mt-1">
                  Chronological progression leading to codebase freeze
                </p>
              </div>

              <div className="space-y-4 border-l border-purple-900/50 pl-6 ml-2">
                {caseStudy.timeline.map((mile) => (
                  <div key={mile.id} className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-[#08050D]"></span>
                    <div className="p-4 rounded-xl bg-[#0E0A17] border border-purple-900/30 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                        <span>{mile.date}</span>
                        {mile.commitHash && <span className="text-purple-400">[{mile.commitHash}]</span>}
                      </div>
                      <h4 className="text-sm font-semibold text-stone-200">{mile.title}</h4>
                      <p className="text-xs text-stone-400 leading-relaxed">{mile.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="max-w-4xl space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-serif text-stone-100 font-light">Revival Roadmap</h2>
                <p className="text-xs text-stone-400 font-mono mt-1">
                  Interactive contributor roadmap to resuscitate HyperFlow
                </p>
              </div>

              <div className="space-y-4">
                {/* P0 Checklist */}
                <div className="p-5 rounded-2xl bg-[#120B1D] border border-rose-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                      P0 — CRITICAL RESUSCITATION
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      {Object.values(completedP0Tasks).filter(Boolean).length} / {caseStudy.blueprint.p0.tasks.length} solved
                    </span>
                  </div>
                  <div className="space-y-2">
                    {caseStudy.blueprint.p0.tasks.map((task, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0C0714] border border-rose-900/30 hover:border-rose-500/40 cursor-pointer text-xs font-mono transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={!!completedP0Tasks[idx]}
                          onChange={() => toggleP0Task(idx)}
                          className="w-4 h-4 rounded text-purple-600 focus:ring-0 accent-purple-600"
                        />
                        <span className={completedP0Tasks[idx] ? 'line-through text-stone-400' : 'text-stone-200'}>
                          {task}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* P1 Section */}
                <div className="p-5 rounded-2xl bg-[#0E0A17] border border-amber-500/30 space-y-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    P1 — STABILIZATION & HARNESS
                  </span>
                  <div className="space-y-2 text-xs font-mono text-stone-300">
                    {caseStudy.blueprint.p1.tasks.map((task, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#0A0612] border border-amber-900/30">
                        • {task}
                      </div>
                    ))}
                  </div>
                </div>

                {/* P2 Section */}
                <div className="p-5 rounded-2xl bg-[#0E0A17] border border-purple-500/30 space-y-3">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                    P2 — ARCHITECTURAL HORIZON
                  </span>
                  <div className="space-y-2 text-xs font-mono text-stone-300">
                    {caseStudy.blueprint.p2.tasks.map((task, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#0A0612] border border-purple-900/30">
                        • {task}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="max-w-4xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-stone-100 font-light">Raw Dossier JSON</h2>
                  <p className="text-xs text-stone-400 font-mono mt-1">
                    Direct serialized schema for API integration and automated tooling
                  </p>
                </div>
                <button
                  onClick={handleCopyJson}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs transition-colors flex items-center gap-1.5"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-purple-200" />}
                  <span>{copiedJson ? 'Copied JSON!' : 'Copy to Clipboard'}</span>
                </button>
              </div>

              <pre className="p-5 rounded-2xl bg-[#06030A] border border-purple-900/40 text-xs font-mono text-stone-300 overflow-x-auto max-h-[70vh]">
                <code>{JSON.stringify(caseStudy, null, 2)}</code>
              </pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
