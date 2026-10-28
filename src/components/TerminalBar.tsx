import React, { useState, useRef, useEffect } from 'react';
import { TerminalEntry, SystemSpecs } from '../types/memory';
import { soundEngine } from '../audio/ambientSynth';
import { Terminal as TerminalIcon, ShieldCheck, Cpu, HardDrive, Send, ChevronUp, ChevronDown } from 'lucide-react';

interface TerminalBarProps {
  logs: TerminalEntry[];
  systemSpecs: SystemSpecs;
  onExecuteCommand: (cmd: string) => void;
  onSelectMemoryFromTerminal: (memId: string) => void;
}

export const TerminalBar: React.FC<TerminalBarProps> = ({
  logs,
  systemSpecs,
  onExecuteCommand,
  onSelectMemoryFromTerminal
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    soundEngine.playCassetteClick();
    onExecuteCommand(inputVal.trim());
    setInputVal('');
  };

  const quickCommands = [
    { label: '“I found something you forgot.”', cmd: 'inspect --forgotten' },
    { label: '“This photograph appears in 4 memories.”', cmd: 'trace --photo mem-1994-01' },
    { label: '“The same story was told differently 7 years later.”', cmd: 'audit --drift 7yr' },
    { label: 'Audit Airgap Privacy', cmd: 'verify --airgap' }
  ];

  return (
    <footer
      aria-label="Local AI Terminal and offline status bar"
      className="w-full bg-[#0E0C0A] border-t border-[#2C241E] flex flex-col transition-all duration-300 z-10"
    >
      {/* Top Status Ribbon (Includes mandatory badges & indicators) */}
      <div className="px-4 py-2 border-b border-[#221B16] bg-[#14110E] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left indicators */}
        <div className="flex items-center gap-3">
          {/* Badge: RUNNING LOCALLY — NO CLOUD */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-950/40 border border-amber-600/40 text-amber-300 font-mono text-[11px] tracking-wider font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>RUNNING LOCALLY — NO CLOUD</span>
          </div>

          {/* Model Status: OPEN-WEIGHT MODEL */}
          <div className="flex items-center gap-1 text-[11px] font-mono text-stone-300">
            <Cpu className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">Model:</span>
            <span className="text-stone-200 font-medium">OPEN-WEIGHT MODEL</span>
            <span className="text-stone-500">({systemSpecs.modelName})</span>
          </div>

          {/* Privacy Indicator: YOUR MEMORIES NEVER LEFT THIS MACHINE */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400/90 bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-800/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>YOUR MEMORIES NEVER LEFT THIS MACHINE</span>
          </div>
        </div>

        {/* Right Hardware Telemetry */}
        <div className="flex items-center gap-4 text-[11px] font-mono text-stone-400">
          <div className="hidden sm:flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-stone-500" />
            <span>RAM: {systemSpecs.localRamUsed}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500/90">
            <span>Egress: {systemSpecs.networkEgress}</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-stone-300 hover:text-amber-300 transition-colors"
            aria-label={isExpanded ? 'Collapse terminal drawer' : 'Expand terminal drawer'}
          >
            <span>{isExpanded ? 'Collapse Terminal' : 'Expand Terminal'}</span>
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={logContainerRef}
        className={`px-4 py-2 font-mono text-xs overflow-y-auto space-y-1.5 bg-[#090807] transition-all duration-300 ${
          isExpanded ? 'h-48' : 'h-24'
        }`}
      >
        {logs.map((log) => {
          const isQuote = log.message.startsWith('“');
          return (
            <div
              key={log.id}
              className={`flex items-start gap-2 leading-relaxed ${
                isQuote
                  ? 'text-amber-300 font-serif italic text-sm py-0.5'
                  : log.type === 'alert'
                  ? 'text-emerald-400'
                  : 'text-stone-300'
              }`}
            >
              <span className="text-stone-600 text-[10px] font-mono select-none pt-0.5 shrink-0">
                [{log.timestamp}]
              </span>
              <span className="text-amber-600/70 select-none shrink-0">❯</span>
              <span className="flex-1">
                {log.message}
                {log.targetMemoryId && (
                  <button
                    onClick={() => {
                      soundEngine.playCassetteClick();
                      onSelectMemoryFromTerminal(log.targetMemoryId!);
                    }}
                    className="ml-2 text-[10px] font-mono text-amber-400 hover:text-amber-200 underline not-italic"
                  >
                    [Focus In Core]
                  </button>
                )}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Prompts Bar & CLI Input */}
      <div className="p-2.5 bg-[#110F0D] border-t border-[#221B16] flex flex-col md:flex-row items-stretch md:items-center gap-2">
        {/* Quick Eerie AI Prompts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-[10px] uppercase font-mono text-stone-500 whitespace-nowrap shrink-0">
            Presets:
          </span>
          {quickCommands.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundEngine.playCassetteClick();
                onExecuteCommand(q.cmd);
              }}
              className="px-2 py-1 text-[11px] font-serif rounded bg-[#1A1613] hover:bg-amber-950/40 text-stone-300 hover:text-amber-200 border border-[#2D241C] hover:border-amber-700/50 transition-colors whitespace-nowrap shrink-0"
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Command Line Input */}
        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 min-w-[240px]">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-amber-500">
              <TerminalIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask offline ghost (e.g. 'find letters with marigolds' or 'audit --drift')..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-[#0A0908] border border-[#2B231B] rounded text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-mono bg-amber-700 hover:bg-amber-600 text-stone-900 font-medium rounded transition-colors flex items-center gap-1 shrink-0"
          >
            <span>Query</span>
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </footer>
  );
};
