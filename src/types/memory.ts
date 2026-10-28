export type MemoryMedium = 'photograph' | 'voice_recording' | 'diary_fragment' | 'keepsake' | 'letter';

export interface MemoryItem {
  id: string;
  code: string; // e.g. "FRAG-1994-08A"
  title: string;
  year: number;
  dateStr: string;
  location: string;
  medium: MemoryMedium;
  imagePath?: string;
  excerpt: string;
  fullContent: string;
  emotionalWeight: number; // 1 to 10
  tags: string[];
  participants: string[];
  audioWaveform?: number[]; // simulated waveform amplitudes for voice recordings
  recordingDuration?: string;
  contradictionNote?: string;
}

export type ConnectionType = 'contradiction' | 'shared_motif' | 'temporal_drift' | 'voice_shift' | 'recurring_anchor';

export interface MemoryConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: ConnectionType;
  title: string;
  description: string;
  confidence: number; // e.g. 96%
  revealedInYear: number;
}

export interface TerminalEntry {
  id: string;
  timestamp: string;
  type: 'insight' | 'system' | 'alert' | 'archival';
  message: string;
  suggestedAction?: string;
  targetMemoryId?: string;
}

export interface SystemSpecs {
  modelName: string;
  quantization: string;
  parameterCount: string;
  contextWindow: string;
  localRamUsed: string;
  inferenceSpeed: string;
  networkEgress: string;
  storageEncrypted: boolean;
  offlineStatus: string;
}
