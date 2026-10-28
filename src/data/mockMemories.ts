import { MemoryItem, MemoryConnection, TerminalEntry, SystemSpecs } from '../types/memory';

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1994-01',
    code: 'FRAG-1994-08A',
    title: 'Autumn Rain at Whitby Station',
    year: 1994,
    dateStr: '14 October 1994 • 19:42',
    location: 'Whitby Platform 2, North Yorkshire',
    medium: 'photograph',
    imagePath: '/assets/images/archival_polaroid_station_1793204201714.jpg',
    excerpt: 'The damp pavement mirrored the gas lamp glow. A single black umbrella held against the oncoming October fog.',
    fullContent: 'Found on an oxidized Kodak 35mm film roll inside a rusted tin under floorboards. The note on the reverse reads: "The 19:45 train pulled away without him. He said he had one more letter to post before the frost set in."',
    emotionalWeight: 9,
    tags: ['whitby', 'railway', 'october', 'departure', 'rain'],
    participants: ['Thomas Vance', 'Unknown traveler'],
    contradictionNote: 'Appears in 4 distinct memory clusters. Later oral accounts claim no one was on the platform that evening.'
  },
  {
    id: 'mem-1994-02',
    code: 'FRAG-1994-11C',
    title: 'The Letter to Eliza (Unposted)',
    year: 1994,
    dateStr: '14 October 1994 • 22:15',
    location: 'Old Vicarage Study, Whitby',
    medium: 'letter',
    imagePath: '/assets/images/archival_diary_letter_1793204202186.jpg',
    excerpt: '“The air is crisp today, and the trees are finally ablaze with gold. I sit by the window writing this, wondering about the autumn in the valley...”',
    fullContent: 'Parchment fragment found tucked into a leather bound ledger. A single dried marigold petal remained pressed into the crease of the paper, perfectly preserved from moisture. Signed: “Yours, lovingly, Thomas.” The postage stamp is uncancelled.',
    emotionalWeight: 8,
    tags: ['eliza', 'letter', 'marigold', 'vicarage', 'unposted'],
    participants: ['Thomas Vance', 'Eliza Holloway']
  },
  {
    id: 'mem-1998-01',
    code: 'FRAG-1998-03K',
    title: 'Brass Watch & Oaxaca Transit Slip',
    year: 1998,
    dateStr: '14 October 1998 • 16:12',
    location: 'Oaxaca Central Depot, Mexico',
    medium: 'keepsake',
    imagePath: '/assets/images/archival_marigold_keepsake_1793204203001.jpg',
    excerpt: 'An antique pocket watch halted at 7:42, accompanied by Mexican Railways transit slip 340.00 MXN and cempasúchil petals.',
    fullContent: 'Recovered from a cedar chest wrapped in oiled silk. The watch hands stopped at exactly 7:42 — the same hour the Whitby station train departed four years prior. The dried cempasúchil (Day of the Dead marigolds) retain faint botanical resonance.',
    emotionalWeight: 9,
    tags: ['pocket-watch', 'oaxaca', 'railway', 'marigold', 'cempasuchil', 'anniversary'],
    participants: ['Thomas Vance'],
    contradictionNote: 'Date matches the Whitby platform departure exactly to the day, exactly 4 years later.'
  },
  {
    id: 'mem-2002-01',
    code: 'FRAG-2002-09V',
    title: 'The Veranda Conversations at Sunset',
    year: 2002,
    dateStr: '28 August 2002 • 18:30',
    location: 'Holloway Homestead, Somerset',
    medium: 'photograph',
    imagePath: '/assets/images/archival_summer_porch_1793204204233.jpg',
    excerpt: 'Golden hour amber casting long raking shadows over the wooden floorboards and empty rocking chair.',
    fullContent: 'Scanned from an Agfa slide. Eliza sat just beyond the doorframe, speaking into a portable microcassette recorder about the letters she never received during the winter of 1994. The dust motes in the porch light seemed suspended in time.',
    emotionalWeight: 7,
    tags: ['veranda', 'eliza', 'golden-hour', 'silence', 'august'],
    participants: ['Eliza Holloway', 'Julian Vance']
  },
  {
    id: 'mem-2008-01',
    code: 'FRAG-2008-04T',
    title: 'Microcassette Tape #03 — Eliza’s Voice',
    year: 2008,
    dateStr: '02 November 2008 • 23:48',
    location: 'Recorded in Somerset Cottage',
    medium: 'voice_recording',
    excerpt: '“I still smell the marigolds when the first October cold snaps. Someone told me he kept traveling south...”',
    fullContent: 'Magnetic microcassette labeled "Memories for November / Día de Recuerdos". Audio contains background tape hiss, fireplace crackle, and Eliza’s trembling voice recounting the night she waited at the crossroads in 1994.',
    emotionalWeight: 10,
    tags: ['audio', 'microcassette', 'voice', 'marigolds', 'confession'],
    participants: ['Eliza Holloway'],
    recordingDuration: '02:44',
    audioWaveform: [18, 35, 62, 80, 45, 22, 60, 95, 75, 40, 15, 55, 88, 70, 30, 48, 82, 65, 25, 50, 72, 90, 60, 35, 20]
  },
  {
    id: 'mem-2015-01',
    code: 'FRAG-2015-10D',
    title: 'Journal Marginalia on Forgetting',
    year: 2015,
    dateStr: '31 October 2015 • Midnight',
    location: 'Archival Annex Box 44',
    medium: 'diary_fragment',
    excerpt: '“We do not lose the past because it dies; we lose it because memory reshapes the edges until the truth feels like a ghost.”',
    fullContent: 'Written on the endpapers of an old botanical atlas. The author writes of finding the 1994 Whitby station photograph and failing to recognize the face under the umbrella, despite realizing it was their own father.',
    emotionalWeight: 8,
    tags: ['diary', 'october', 'drift', 'spectral', 'loss'],
    participants: ['Julian Vance'],
    contradictionNote: 'Directly refutes the 2002 account where Julian claimed he never saw any photographs from Whitby.'
  }
];

export const INITIAL_CONNECTIONS: MemoryConnection[] = [
  {
    id: 'conn-01',
    sourceId: 'mem-1994-01',
    targetId: 'mem-1998-01',
    type: 'contradiction',
    title: 'Temporal Synchronization: Oct 14 Departure',
    description: 'The Whitby platform departure (Oct 14, 1994 at 19:42) matches the Oaxaca transit slip and watch stoppage (Oct 14, 1998 at 19:42) to the exact minute across 4 years.',
    confidence: 98,
    revealedInYear: 1998
  },
  {
    id: 'conn-02',
    sourceId: 'mem-1994-02',
    targetId: 'mem-1998-01',
    type: 'shared_motif',
    title: 'Botanical Tag: Pressed Cempasúchil Petals',
    description: 'The dried flower inside Thomas’s unposted 1994 letter shares identical micro-cellular morphology with the marigold petals on the 1998 Mexican transit keepsake.',
    confidence: 96,
    revealedInYear: 1998
  },
  {
    id: 'conn-03',
    sourceId: 'mem-2002-01',
    targetId: 'mem-2008-01',
    type: 'temporal_drift',
    title: 'Oral Narrative Drift: 6-Year Discrepancy',
    description: 'In 2002, Eliza stated she believed Thomas had settled in the northern coast. Six years later in microcassette #03, her account shifts: “Someone told me he kept traveling south...”',
    confidence: 92,
    revealedInYear: 2008
  },
  {
    id: 'conn-04',
    sourceId: 'mem-2002-01',
    targetId: 'mem-2015-01',
    type: 'contradiction',
    title: 'Witness Testimony Inconsistency',
    description: 'Julian stated in 2002 that all Whitby archives were destroyed in a flood, yet his 2015 diary explicitly chronicles finding the original 1994 photograph in Box 44.',
    confidence: 94,
    revealedInYear: 2015
  },
  {
    id: 'conn-05',
    sourceId: 'mem-1994-01',
    targetId: 'mem-2008-01',
    type: 'voice_shift',
    title: 'Audio Frequency Acoustic Resonance',
    description: 'Rainfall frequency patterns recorded in the 1994 background match the ambient acoustic resonance of the 2008 cassette tape playback.',
    confidence: 89,
    revealedInYear: 2008
  }
];

export const INITIAL_TERMINAL_LOGS: TerminalEntry[] = [
  {
    id: 'log-1',
    timestamp: '00:00:12',
    type: 'system',
    message: 'Local memory ghost initialized. 6 offline archival fragments loaded into local memory cache.'
  },
  {
    id: 'log-2',
    timestamp: '00:00:14',
    type: 'insight',
    message: '“I found something you forgot.”',
    suggestedAction: 'examine-drift'
  },
  {
    id: 'log-3',
    timestamp: '00:00:18',
    type: 'insight',
    message: '“This photograph appears in 4 memories.”',
    targetMemoryId: 'mem-1994-01',
    suggestedAction: 'track-photo'
  },
  {
    id: 'log-4',
    timestamp: '00:00:23',
    type: 'insight',
    message: '“The same story was told differently 7 years later.”',
    targetMemoryId: 'mem-2002-01',
    suggestedAction: 'compare-drift'
  },
  {
    id: 'log-5',
    timestamp: '00:00:30',
    type: 'alert',
    message: 'Offline verification passed: 0 outbound sockets opened. No telemetry leaves this terminal.'
  }
];

export const SYSTEM_SPECS: SystemSpecs = {
  modelName: 'Memoria-Ghost-7B (Q4_K_M)',
  quantization: '4-bit GGUF • ggml-org/offline',
  parameterCount: '7.24B Parameters',
  contextWindow: '32,768 Tokens',
  localRamUsed: '4.82 GB / 16.0 GB',
  inferenceSpeed: '38.4 tokens/sec',
  networkEgress: '0 bytes (Airgapped)',
  storageEncrypted: true,
  offlineStatus: 'OPERATIONAL • AIRGAPPED'
};
