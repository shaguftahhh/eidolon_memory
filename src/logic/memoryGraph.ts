import { MemoryItem, MemoryConnection } from '../types/memory';

/**
 * Filters memories based on era or returns all if 'all'.
 */
export function filterMemoriesByEra(memories: MemoryItem[], era: string | number): MemoryItem[] {
  if (era === 'all') return memories;
  const numEra = typeof era === 'string' ? parseInt(era, 10) : era;
  if (isNaN(numEra)) return memories;
  return memories.filter((m) => m.year === numEra);
}

/**
 * Searches memories across title, tags, location, participants, and excerpts.
 */
export function searchMemories(memories: MemoryItem[], query: string): MemoryItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return memories;

  return memories.filter((m) => {
    return (
      m.title.toLowerCase().includes(clean) ||
      m.location.toLowerCase().includes(clean) ||
      m.excerpt.toLowerCase().includes(clean) ||
      m.fullContent.toLowerCase().includes(clean) ||
      m.code.toLowerCase().includes(clean) ||
      m.tags.some((t) => t.toLowerCase().includes(clean)) ||
      m.participants.some((p) => p.toLowerCase().includes(clean))
    );
  });
}

/**
 * Finds all incoming and outgoing connections for a given memory item.
 */
export function findConnectionsForMemory(memoryId: string, connections: MemoryConnection[]): MemoryConnection[] {
  return connections.filter((conn) => conn.sourceId === memoryId || conn.targetId === memoryId);
}

/**
 * Detects discrepancies and temporal drift across archival fragments.
 */
export function detectCognitiveDrifts(memories: MemoryItem[], connections: MemoryConnection[]) {
  const contradictions = connections.filter((c) => c.type === 'contradiction' || c.type === 'temporal_drift');
  return contradictions.map((c) => {
    const src = memories.find((m) => m.id === c.sourceId);
    const tgt = memories.find((m) => m.id === c.targetId);
    const yearGap = src && tgt ? Math.abs(tgt.year - src.year) : 0;
    return {
      connection: c,
      sourceMemory: src,
      targetMemory: tgt,
      yearGap
    };
  });
}

/**
 * Computes ghostly resonance metrics for the active memory or selection.
 */
export function calculateArchivalGhostResonance(activeMemoryIds: string[], memories: MemoryItem[]) {
  if (activeMemoryIds.length === 0) {
    return {
      coherenceScore: 0,
      dominantTag: 'void',
      temporalSpanYears: 0,
      totalEmotionalEnergy: 0
    };
  }

  const selected = memories.filter((m) => activeMemoryIds.includes(m.id));
  if (selected.length === 0) {
    return { coherenceScore: 0, dominantTag: 'dormant', temporalSpanYears: 0, totalEmotionalEnergy: 0 };
  }

  const years = selected.map((m) => m.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const temporalSpanYears = maxYear - minYear;

  const totalEmotionalEnergy = selected.reduce((sum, m) => sum + m.emotionalWeight, 0);

  // Dominant recurring tag
  const tagCounts: Record<string, number> = {};
  selected.forEach((m) => {
    m.tags.forEach((t) => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  let dominantTag = 'memory';
  let maxCount = 0;
  for (const [tag, count] of Object.entries(tagCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantTag = tag;
    }
  }

  // Coherence score based on connected nodes and completeness
  const baseCoherence = Math.min(100, Math.round((selected.length * 15) + (totalEmotionalEnergy * 3.5)));

  return {
    coherenceScore: baseCoherence,
    dominantTag,
    temporalSpanYears,
    totalEmotionalEnergy
  };
}

/**
 * Reconstructs a revived narrative connecting memory fragments offline.
 */
export function synthesizeRevivedStory(selectedMemoryIds: string[], memories: MemoryItem[], connections: MemoryConnection[]) {
  const chosen = memories.filter((m) => selectedMemoryIds.includes(m.id));
  // Sort chronologically
  chosen.sort((a, b) => a.year - b.year);

  if (chosen.length === 0) {
    return {
      title: 'Untold Story in the Static',
      summary: 'No memories were gathered for reconstruction.',
      chronology: [],
      synthesisProse: 'The ghost core remains still, awaiting the spark of an archived date.',
      linkedThemes: []
    };
  }

  const themes = Array.from(new Set(chosen.flatMap((m) => m.tags)));
  const relevantConns = connections.filter((c) =>
    selectedMemoryIds.includes(c.sourceId) && selectedMemoryIds.includes(c.targetId)
  );

  const startYear = chosen[0].year;
  const endYear = chosen[chosen.length - 1].year;
  const timespanText = startYear === endYear ? `${startYear}` : `${startYear} — ${endYear}`;

  let prose = `Offline Reconstruction [${timespanText}]:\n\n`;
  prose += `Between the shadows of ${startYear} and ${endYear}, these ${chosen.length} fragments whisper a single unbroken thread.\n`;
  prose += `From ${chosen[0].location}, where "${chosen[0].excerpt.slice(0, 70)}...", `;
  if (chosen.length > 1) {
    prose += `to the eventual realization in ${chosen[chosen.length - 1].year} at ${chosen[chosen.length - 1].location}.\n\n`;
  } else {
    prose += `the solitary record echoes without interruption.\n\n`;
  }

  if (relevantConns.length > 0) {
    prose += `The offline model identified ${relevantConns.length} cross-temporal link(s):\n`;
    relevantConns.forEach((c) => {
      prose += `• ${c.title}: ${c.description}\n`;
    });
  } else {
    prose += `Although separated across seasons, the recurring presence of "${themes.slice(0, 3).join(', ')}" binds their silence together.`;
  }

  return {
    title: `The Echo of ${timespanText}`,
    summary: `Synthesized narrative across ${chosen.length} offline fragments preserving the forgotten thread of ${themes.slice(0, 3).join(', ')}.`,
    chronology: chosen,
    synthesisProse: prose,
    linkedThemes: themes
  };
}

export interface DustRgb {
  r: number;
  g: number;
  b: number;
}

export type MemoryEraCategory = 'historical' | 'modern' | 'transitional';

/**
 * Determines whether a memory belongs to the historical (sepia) or modern (blue) category.
 */
export function getMemoryCategoryType(memory: MemoryItem | null): MemoryEraCategory {
  if (!memory) return 'historical';
  // Historical: <= 1999 (faded polaroids, handwritten wax letters, vintage train tickets)
  if (memory.year <= 1999) return 'historical';
  // Modern: >= 2008 (microcassette audio recordings, modern marginalia, late archives)
  if (memory.year >= 2008) return 'modern';
  // Transitional: 2000-2007 (early digital transition, sunlit verandas)
  return 'transitional';
}

/**
 * Returns the target RGB palettes for memory dust particles based on category.
 * Sepia for historical, luminous blue for modern.
 */
export function getTargetDustColors(category: MemoryEraCategory): {
  primary: DustRgb;
  secondary: DustRgb;
  glow: DustRgb;
} {
  if (category === 'historical') {
    // Sepia: warm golden amber & antique burnt umber
    return {
      primary: { r: 217, g: 130, b: 43 },
      secondary: { r: 180, g: 90, b: 25 },
      glow: { r: 245, g: 158, b: 11 }
    };
  } else if (category === 'modern') {
    // Blue: cool twilight sapphire & electric spectral azure
    return {
      primary: { r: 56, g: 189, b: 248 },
      secondary: { r: 99, g: 102, b: 241 },
      glow: { r: 147, g: 197, b: 253 }
    };
  } else {
    // Transitional: muted twilight bronze
    return {
      primary: { r: 168, g: 135, b: 110 },
      secondary: { r: 100, g: 140, b: 190 },
      glow: { r: 210, g: 180, b: 150 }
    };
  }
}

