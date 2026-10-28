import React, { useState } from 'react';
import { X, Search, GitBranch, Terminal, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCompleteInvestigation: () => void;
}

export const RequiemNewInvestigationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCompleteInvestigation,
}) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/hyperflow-rs/hyperflow');
  const [branch, setBranch] = useState('main');
  const [depth, setDepth] = useState('Full Git Strata (All Commits)');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  if (!isOpen) return null;

  const sampleTargets = [
    { name: 'HyperFlow Engine', repo: 'https://github.com/hyperflow-rs/hyperflow', tag: 'Rust • Tokio Stalled' },
    { name: 'ChronoSync DB', repo: 'https://github.com/chronosync/core', tag: 'Go • Raft Partition Stalled' },
    { name: 'AetherMesh P2P', repo: 'https://github.com/aethermesh/node', tag: 'TypeScript • WebRTC Abandoned' },
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1500);
    setTimeout(() => setScanStep(4), 2300);
    setTimeout(() => {
      setScanStep(5);
      setTimeout(() => {
        setIsScanning(false);
        setScanStep(0);
        onCompleteInvestigation();
      }, 1000);
    }, 3100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0E0A17] border border-purple-500/40 w-full max-w-xl rounded-2xl shadow-2xl shadow-purple-950/60 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-purple-900/40 flex items-center justify-between bg-[#120B1D]">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-base font-serif text-stone-100 font-medium">
                Initiate Digital Archaeology Scan
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                Static AST decomposition and Gemma 2 intent reconstruction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isScanning}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs font-mono">
          {!isScanning ? (
            <>
              {/* Sample Quick Targets */}
              <div>
                <label className="text-stone-400 uppercase tracking-wider block mb-2 font-semibold">
                  Or Pick a Curated Cemetery Case Study
                </label>
                <div className="space-y-1.5">
                  {sampleTargets.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setRepoUrl(s.repo)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        repoUrl === s.repo
                          ? 'bg-purple-950/70 border-purple-500/60 text-purple-200'
                          : 'bg-stone-900/50 border-purple-900/30 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <div className="font-semibold text-stone-200">{s.name}</div>
                      <div className="text-[10px] text-stone-400">{s.tag}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* GitHub Repository Target */}
              <div>
                <label className="text-stone-300 uppercase tracking-wider block mb-2 font-semibold">
                  Target Repository URL or Local Directory
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/owner/repository"
                    className="w-full bg-[#150F24] border border-purple-900/40 rounded-xl px-3.5 py-2.5 text-stone-200 placeholder:text-stone-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Branch & Depth */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-400 uppercase tracking-wider block mb-1.5">
                    Branch / Tag / Ref
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-[#150F24] border border-purple-900/40 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-stone-400 uppercase tracking-wider block mb-1.5">
                    Strata Depth
                  </label>
                  <select
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="w-full bg-[#150F24] border border-purple-900/40 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-purple-500"
                  >
                    <option>Full Git Strata (All Commits)</option>
                    <option>Last 100 Commits + PRs</option>
                    <option>Freeze Horizon Delta Only</option>
                  </select>
                </div>
              </div>

              {/* Notice */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/40 text-stone-400 text-[11px] leading-relaxed flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  Zero execution sandbox: Code will undergo static AST graph extraction. No binaries or scripts will be executed.
                </span>
              </div>
            </>
          ) : (
            /* Live Terminal Progress View */
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 animate-spin text-purple-400" />
                  <span>EXCAVATING STRATA: {repoUrl}</span>
                </span>
                <span>STEP 0{scanStep} / 05</span>
              </div>

              <div className="p-4 rounded-xl bg-[#06030A] border border-purple-900/50 space-y-3 font-mono text-xs">
                <div className={`flex items-center gap-2 ${scanStep >= 1 ? 'text-emerald-400' : 'text-stone-400'}`}>
                  {scanStep > 1 ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin inline-block" />}
                  <span>[01/05] Local git tree clone & differential commit graph...</span>
                </div>
                {scanStep >= 2 && (
                  <div className={`flex items-center gap-2 ${scanStep >= 2 ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {scanStep > 2 ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin inline-block" />}
                    <span>[02/05] AST parsing: Extracted 24 modules, 412 functions, 14 unmerged PRs</span>
                  </div>
                )}
                {scanStep >= 3 && (
                  <div className={`flex items-center gap-2 ${scanStep >= 3 ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {scanStep > 3 ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin inline-block" />}
                    <span>[03/05] Pinpointing blockers: Identified Tokio sync mutex across await point</span>
                  </div>
                )}
                {scanStep >= 4 && (
                  <div className={`flex items-center gap-2 ${scanStep >= 4 ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {scanStep > 4 ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin inline-block" />}
                    <span>[04/05] Gemma 2 9B inference: Reconstructing original design intent & P0 roadmap</span>
                  </div>
                )}
                {scanStep >= 5 && (
                  <div className="flex items-center gap-2 text-purple-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>[05/05] Sealed forensic dossier compiled. Entering Archive Chamber...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-900/40 bg-[#0B0714] flex items-center justify-end gap-2">
          {!isScanning && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-400 hover:text-stone-200"
              >
                Cancel
              </button>
              <button
                onClick={handleStartScan}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-purple-600/30"
              >
                <span>Begin Excavation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
