import React from 'react';
import { MemoryItem, MemoryConnection } from '../types/memory';
import { soundEngine } from '../audio/ambientSynth';
import { X, AlertTriangle, ArrowRightLeft } from 'lucide-react';

interface CrossExamineModalProps {
  sourceMemory: MemoryItem | null;
  targetMemory: MemoryItem | null;
  connection: MemoryConnection | null;
  onClose: () => void;
}

export const CrossExamineModal: React.FC<CrossExamineModalProps> = ({
  sourceMemory,
  targetMemory,
  connection,
  onClose
}) => {
  if (!sourceMemory || !targetMemory || !connection) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crossexamine-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#14110E] border border-amber-600/50 rounded-lg shadow-2xl text-stone-200 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            soundEngine.playCassetteClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          aria-label="Close cross-examination modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span>CROSS-TEMPORAL CONTRADICTION & DRIFT DETECTOR</span>
        </div>

        <h2 id="crossexamine-title" className="text-2xl font-serif font-medium text-stone-100 mb-2">
          {connection.title}
        </h2>

        {/* Connection analysis callout */}
        <div className="p-4 rounded bg-rose-950/20 border border-rose-900/40 mb-6 text-xs text-rose-200 font-serif leading-relaxed">
          <p className="font-semibold text-rose-300 font-mono text-[11px] uppercase tracking-wider mb-1">
            Offline Neural Diagnostic ({connection.confidence}% Confidence):
          </p>
          <p>{connection.description}</p>
        </div>

        {/* Side by Side Memory comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Source Memory Card */}
          <div className="p-4 rounded bg-[#1A1612] border border-[#2D231A]">
            <div className="flex items-center justify-between text-xs font-mono text-amber-500 mb-2">
              <span>{sourceMemory.year}</span>
              <span className="text-stone-400">{sourceMemory.code}</span>
            </div>
            <h3 className="text-base font-serif font-medium text-stone-100 mb-2">
              {sourceMemory.title}
            </h3>
            {sourceMemory.imagePath && (
              <div className="mb-3 rounded overflow-hidden aspect-[16/10] bg-stone-950">
                <img
                  src={sourceMemory.imagePath}
                  alt={sourceMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter sepia-[0.2]"
                />
              </div>
            )}
            <blockquote className="text-xs font-serif italic text-stone-300 border-l-2 border-amber-600/40 pl-3 py-1 my-2">
              “{sourceMemory.excerpt}”
            </blockquote>
            <p className="text-xs text-stone-400 font-serif mt-2">
              {sourceMemory.fullContent}
            </p>
            <div className="mt-3 text-[11px] font-mono text-stone-500">
              Recorded in: {sourceMemory.location}
            </div>
          </div>

          {/* Target Memory Card */}
          <div className="p-4 rounded bg-[#1A1612] border border-[#2D231A]">
            <div className="flex items-center justify-between text-xs font-mono text-amber-500 mb-2">
              <span>{targetMemory.year}</span>
              <span className="text-stone-400">{targetMemory.code}</span>
            </div>
            <h3 className="text-base font-serif font-medium text-stone-100 mb-2">
              {targetMemory.title}
            </h3>
            {targetMemory.imagePath && (
              <div className="mb-3 rounded overflow-hidden aspect-[16/10] bg-stone-950">
                <img
                  src={targetMemory.imagePath}
                  alt={targetMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter sepia-[0.2]"
                />
              </div>
            )}
            <blockquote className="text-xs font-serif italic text-stone-300 border-l-2 border-amber-600/40 pl-3 py-1 my-2">
              “{targetMemory.excerpt}”
            </blockquote>
            <p className="text-xs text-stone-400 font-serif mt-2">
              {targetMemory.fullContent}
            </p>
            <div className="mt-3 text-[11px] font-mono text-stone-500">
              Recorded in: {targetMemory.location}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#26201B] text-xs font-mono text-stone-400">
          <span>Gap: {Math.abs(targetMemory.year - sourceMemory.year)} years between accounts</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#241C15] hover:bg-[#30251B] text-amber-300 border border-amber-700/40 transition-colors"
          >
            Dismiss Cross-Examination
          </button>
        </div>
      </div>
    </div>
  );
};
