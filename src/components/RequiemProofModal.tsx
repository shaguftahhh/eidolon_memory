import React, { useState } from 'react';
import { ForensicArtifact } from '../types/requiem';
import { X, Check, Copy, ShieldAlert, Sparkles, FileCode, CheckCircle2, HelpCircle, Flame } from 'lucide-react';
import { soundEngine } from '../audio/ambientSynth';

interface Props {
  artifact: ForensicArtifact | null;
  onClose: () => void;
}

export const RequiemProofModal: React.FC<Props> = ({ artifact, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!artifact) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.codeSnippet);
    setCopied(true);
    soundEngine.playCassetteClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const isVerified = artifact.category === 'verified';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0C0816] border border-cyan-500/40 w-full max-w-4xl rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 flex items-start justify-between gap-4 bg-gradient-to-r from-cyan-950/40 via-[#100B1E] to-[#0C0816]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                {artifact.id}
              </span>
              {isVerified ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldAlert className="w-3.5 h-3.5" /> VERIFIED RELIC & CODE PROOF
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5" /> AI HYPOTHESIS & INFERENCE
                </span>
              )}
              <span className="text-xs font-mono text-stone-400">
                {artifact.confidence}% Confidence
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-serif text-stone-100 font-light">
              {artifact.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* File location bar */}
          <div className="flex items-center justify-between bg-[#130E20] px-4 py-2.5 rounded-2xl border border-stone-800 text-xs font-mono text-stone-300">
            <div className="flex items-center gap-2 truncate">
              <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-cyan-300 font-semibold">{artifact.filePath}</span>
              <span className="text-stone-400">({artifact.lineRange})</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-cyan-300 hover:text-white transition-colors bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/40 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Fragment'}</span>
            </button>
          </div>

          {/* Syntax Code Editor Container */}
          <div className="relative rounded-2xl border border-stone-800 bg-[#060309] overflow-hidden shadow-inner">
            <div className="px-4 py-2 bg-stone-950 border-b border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 inline-block"></span>
                <span className="ml-2 text-stone-400">EIDOLON Enclave Proof Viewer</span>
              </div>
              <span className="text-cyan-400 font-medium">Rust / Tokio Enclave AST</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-stone-200">
              <code>{artifact.codeSnippet}</code>
            </pre>
          </div>

          {/* Dual Epistemological Analysis Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>WHAT THIS ESTABLISHES</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {artifact.whatItEstablishes}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-300 mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>WHAT REMAINS UNCERTAIN</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {artifact.whatRemainsUncertain}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-800 bg-[#090611] flex items-center justify-between">
          <span className="text-xs font-mono text-stone-400">
            Validated by Gemma 2 local AST verification engine
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-mono text-xs font-bold transition-colors"
          >
            Close Proof
          </button>
        </div>
      </div>
    </div>
  );
};
