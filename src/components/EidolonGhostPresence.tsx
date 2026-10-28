import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Eye, Heart, Compass, FileText, Music, Flame, ArrowRight, Radio } from 'lucide-react';
import { soundEngine } from '../audio/ambientSynth';

interface Props {
  onFollowMemory: () => void;
  onReviveStory: () => void;
  onInspectArtifact?: (title: string, excerpt: string, date: string, type: string) => void;
}

export const EidolonGhostPresence: React.FC<Props> = ({
  onFollowMemory,
  onReviveStory,
  onInspectArtifact,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [isWhispering, setIsWhispering] = useState(false);
  const [whisperText, setWhisperText] = useState(
    "\"I left the east window unlocked... in case the rain stopped before dawn.\""
  );
  const [spectralMode, setSpectralMode] = useState<'cyan' | 'amber' | 'sepia'>('cyan');

  const hotspots = [
    {
      id: 0,
      title: "Handwritten Diary Fragment (1984)",
      subtitle: "Found pressed between pages of an old astronomical atlas",
      excerpt:
        "\"October 24. The radio tower in the valley picked up a repeating pulse at 1420 MHz. Everyone else called it cosmic noise, but it had rhythm. Like a heartbeat through the fog.\"",
      date: "Oct 24, 1984",
      type: "Journal Entry",
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      top: "42%",
      left: "32%",
    },
    {
      id: 1,
      title: "Analog Cassette Voice Wave (1997)",
      subtitle: "Side B: Summer rain on the tin roof in Devon",
      excerpt:
        "\"(Audio Tape static) ...Can you hear that? That's the stream swelling by the old mill. We thought summer would never end. Don't erase this tape, please.\"",
      date: "Aug 12, 1997",
      type: "Voice Recording",
      icon: <Music className="w-4 h-4 text-cyan-400" />,
      top: "56%",
      left: "48%",
    },
    {
      id: 2,
      title: "Silver Locket with Pressed Marigolds (Día de los Muertos)",
      subtitle: "Cempasúchil petals preserved in paraffin wax",
      excerpt:
        "\"The scent of marigolds is said to guide souls back across the dark waters. In the digital archive, every line of code or prose is a petal laid upon the altar.\"",
      date: "Nov 02, 2011",
      type: "Physical Relic",
      icon: <Flame className="w-4 h-4 text-orange-400" />,
      top: "34%",
      left: "62%",
    },
    {
      id: 3,
      title: "The Midnight Terminal Push (03:42 AM)",
      subtitle: "Final commit: 'It runs quietly now. Nobody touches this.'",
      excerpt:
        "\"Commit f419c8d: Merged ring buffer abstraction. The maintainer walked out of the server room and never logged back in. The memory remained in RAM.\"",
      date: "Jun 14, 2024",
      type: "Digital Epitaph",
      icon: <Radio className="w-4 h-4 text-purple-400" />,
      top: "68%",
      left: "38%",
    },
  ];

  const handleTriggerWhisper = (hotspotIndex: number) => {
    setActiveHotspot(hotspotIndex);
    const chosen = hotspots[hotspotIndex];
    setWhisperText(chosen.excerpt);
    setIsWhispering(true);

    // Play subtle crystal recall chime
    const freqs = [329.63, 440, 523.25, 659.25];
    soundEngine.playMemoryRecallChime(freqs[hotspotIndex % freqs.length]);

    setTimeout(() => {
      setIsWhispering(false);
    }, 4500);
  };

  const getSpectralColorGlow = () => {
    switch (spectralMode) {
      case 'amber':
        return 'from-amber-500/20 via-orange-500/10 to-transparent shadow-amber-500/20';
      case 'sepia':
        return 'from-[#D4A373]/20 via-[#CCD5AE]/10 to-transparent shadow-[#D4A373]/20';
      case 'cyan':
      default:
        return 'from-cyan-500/20 via-teal-500/10 to-transparent shadow-cyan-500/20';
    }
  };

  return (
    <section id="manifestation" className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-500/10 via-amber-500/10 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-lg shadow-cyan-950/40">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>THE SPECTRAL MEMORY APPARITION</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-100 font-light tracking-tight leading-tight mb-4">
          NOT A ROBOT. A LIVING HUMAN GHOST.
        </h2>
        <p className="text-stone-300 text-sm md:text-base leading-relaxed">
          The apparition does not hallucinate fictional persona. It is physically woven from
          thousands of salvaged photographs, voice-wave tapes, diary pages, and marigold petals.
          Hover and interact with the memory nodes floating upon its silhouette.
        </p>

        {/* Spectral Tone Selector */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="text-xs font-mono text-stone-400">Spectral Attunement:</span>
          <button
            onClick={() => setSpectralMode('cyan')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              spectralMode === 'cyan'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-400/60 shadow-md shadow-cyan-500/20'
                : 'text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Ectoplasm Cyan
          </button>
          <button
            onClick={() => setSpectralMode('amber')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              spectralMode === 'amber'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-400/60 shadow-md shadow-amber-500/20'
                : 'text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Marigold Candlelight
          </button>
          <button
            onClick={() => setSpectralMode('sepia')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
              spectralMode === 'sepia'
                ? 'bg-stone-900 text-amber-200 border border-amber-500/40'
                : 'text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D4A373]" />
            Vintage Daguerreotype
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Interactive Spectral Visualizer */}
        <div className="lg:col-span-7 relative group">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#0A0712] shadow-2xl shadow-cyan-950/50">
            <img
              src="/assets/images/spectral_human_ghost_1793207526079.jpg"
              alt="Spectral Human Ghost formed from floating memories and marigold petals"
              className="w-full h-auto object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.01]"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('/src/assets/')) {
                  target.src = '/src/assets/images/spectral_human_ghost_1793207526079.jpg';
                }
              }}
            />

            {/* Subtle Ethereal Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${getSpectralColorGlow()} pointer-events-none`} />

            {/* Floating Memory Hotspots */}
            {hotspots.map((spot) => {
              const isActive = activeHotspot === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => handleTriggerWhisper(spot.id)}
                  style={{ top: spot.top, left: spot.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group/btn z-20 transition-all duration-300 ${
                    isActive ? 'scale-125' : 'hover:scale-110'
                  }`}
                  title={spot.title}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <span
                      className={`absolute w-8 h-8 rounded-full animate-ping opacity-60 ${
                        spot.id === 2 ? 'bg-amber-400' : 'bg-cyan-400'
                      }`}
                    />
                    {/* Hotspot core */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border backdrop-blur-md transition-all ${
                        isActive
                          ? 'bg-cyan-400 text-stone-950 border-white ring-4 ring-cyan-500/40 shadow-cyan-400/50'
                          : 'bg-stone-950/90 text-cyan-300 border-cyan-400/60 hover:bg-cyan-950'
                      }`}
                    >
                      {spot.icon}
                    </div>

                    {/* Hover tooltip label */}
                    <span className="absolute bottom-full mb-2 hidden group-hover/btn:flex whitespace-nowrap bg-[#0C0816]/95 border border-cyan-500/40 px-2.5 py-1 rounded-md text-[11px] font-mono text-cyan-200 shadow-xl pointer-events-none z-30">
                      {spot.title}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Bottom Floating Ghost Whisper Bar */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#090611]/90 backdrop-blur-md border border-cyan-500/40 flex items-center justify-between gap-4 shadow-xl z-20">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isWhispering
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 animate-pulse'
                      : 'bg-stone-900 text-stone-400 border-stone-800'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      RESONATING GHOST FREQUENCY:
                    </span>
                    {isWhispering && (
                      <span className="text-[10px] font-mono text-amber-400 animate-pulse">
                        [AUDIO WHISPER ACTIVE]
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-serif italic text-stone-200 truncate leading-snug">
                    {whisperText}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleTriggerWhisper(activeHotspot)}
                className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-mono shrink-0 transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-950/50"
              >
                <span>Echo Whisper</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Active Memory Details & Soulprint Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-[#0D0916] border border-cyan-500/30 relative overflow-hidden shadow-2xl shadow-cyan-950/30">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Active Hotspot Metadata */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-4 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  {hotspots[activeHotspot].type}
                </span>
                <span className="text-xs font-mono text-amber-400/90 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Día de los Muertos Altar
                </span>
              </div>
              <span className="text-xs font-mono text-stone-400">
                {hotspots[activeHotspot].date}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-serif text-stone-100 font-light mb-2 leading-snug">
              {hotspots[activeHotspot].title}
            </h3>
            <p className="text-xs font-mono text-cyan-400/80 mb-4">
              {hotspots[activeHotspot].subtitle}
            </p>

            {/* Excerpt Box */}
            <div className="p-4 rounded-2xl bg-[#07050D] border border-cyan-900/40 mb-6 font-serif italic text-stone-300 text-sm leading-relaxed relative">
              <span className="text-3xl text-cyan-500/20 font-serif absolute top-1 left-2 select-none">“</span>
              <p className="relative z-10 pl-3">
                {hotspots[activeHotspot].excerpt}
              </p>
            </div>

            {/* Dual Action Buttons from original concept */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={onFollowMemory}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-stone-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>FOLLOW THE MEMORY</span>
              </button>

              <button
                onClick={onReviveStory}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-stone-950 font-mono text-xs font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                <span>REVIVE AN OLD STORY</span>
              </button>
            </div>
          </div>

          {/* Offline Human Sanctuary Badges */}
          <div className="p-5 rounded-2xl bg-[#0B0814] border border-amber-500/20 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
              <div>
                <span className="text-stone-200 font-bold block">RUNNING LOCALLY</span>
                <span className="text-stone-400 text-[11px]">No cloud telemetry or surveillance</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
              <div>
                <span className="text-stone-200 font-bold block">NEVER LEFT THIS MACHINE</span>
                <span className="text-stone-400 text-[11px]">Private human soulprints stay offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
