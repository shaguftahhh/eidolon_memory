import React, { useState } from 'react';
import { X, Cpu, Check, Sliders, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RequiemModelSettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [modelVariant, setModelVariant] = useState<'9b' | '27b' | '2b'>('9b');
  const [quantization, setQuantization] = useState<'int4' | 'int8' | 'fp16'>('int8');
  const [strictProvenance, setStrictProvenance] = useState(true);
  const [temperature, setTemperature] = useState(0.2);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0E0A17] border border-purple-500/40 w-full max-w-lg rounded-2xl shadow-2xl shadow-purple-950/60 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-purple-900/40 flex items-center justify-between bg-[#120B1D]">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-base font-serif text-stone-100 font-medium">Gemma 2 Enclave Settings</h3>
              <p className="text-xs text-stone-400 font-mono">Local offline inference configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs font-mono">
          {/* Model Weights */}
          <div>
            <label className="text-stone-300 uppercase tracking-wider block mb-2 font-semibold">
              Gemma 2 Architecture
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '2b', name: 'Gemma 2 2B', desc: 'Ultra-fast edge scan' },
                { id: '9b', name: 'Gemma 2 9B', desc: 'Recommended default' },
                { id: '27b', name: 'Gemma 2 27B', desc: 'Deep architectural AST' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModelVariant(m.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    modelVariant === m.id
                      ? 'bg-purple-950/80 border-purple-500 text-white shadow-md shadow-purple-900/40'
                      : 'bg-stone-900/60 border-purple-900/30 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="font-bold text-xs">{m.name}</div>
                  <div className="text-[10px] text-stone-400 mt-1">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantization */}
          <div>
            <label className="text-stone-300 uppercase tracking-wider block mb-2 font-semibold">
              Quantization Precision
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'int4', label: 'INT4 (4.5 GB VRAM)' },
                { id: 'int8', label: 'INT8 (9.2 GB VRAM)' },
                { id: 'fp16', label: 'FP16 Full Precision' },
              ].map((q) => (
                <button
                  key={q.id}
                  onClick={() => setQuantization(q.id as any)}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    quantization === q.id
                      ? 'bg-purple-600 border-purple-500 text-white font-semibold'
                      : 'bg-stone-900/60 border-purple-900/30 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Temperature Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-stone-300 uppercase tracking-wider font-semibold">
                Archaeological Temperature
              </label>
              <span className="text-purple-400 font-bold">{temperature}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.7"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>0.0 (Deterministic / AST Proofs)</span>
              <span>0.7 (Creative Hypothesis)</span>
            </div>
          </div>

          {/* Strict Provenance Toggle */}
          <div className="p-3.5 rounded-xl bg-[#140E22] border border-purple-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-stone-200 font-bold">Strict Provenance Mode</div>
                <div className="text-[10px] text-stone-400">
                  Reject any inference lacking verified file coordinate anchors
                </div>
              </div>
            </div>
            <button
              onClick={() => setStrictProvenance(!strictProvenance)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                strictProvenance ? 'bg-purple-600' : 'bg-stone-800'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  strictProvenance ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-900/40 bg-[#0B0714] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono text-stone-400 hover:text-stone-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : null}
            <span>{saved ? 'Enclave Updated' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
