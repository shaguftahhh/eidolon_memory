export type FindingCategory = 'all' | 'verified' | 'hypothesis' | 'unknown';
export type EvidenceTag = 'Unfinished Code' | 'Security & Deadlocks' | 'Architecture' | 'Missing Docs' | 'Dead Modules';

export interface ForensicArtifact {
  id: string;
  category: 'verified' | 'hypothesis' | 'unknown';
  typeTag: string;
  badgeLabel: string;
  confidence: number; // e.g. 98
  title: string;
  summary: string;
  filePath: string;
  lineRange: string;
  codeSnippet: string;
  whatItEstablishes: string;
  whatRemainsUncertain: string;
  tags: EvidenceTag[];
}

export interface TimelineMilestone {
  id: string;
  date: string;
  commitHash?: string;
  type: 'verified_git' | 'ai_inference' | 'repo_freeze';
  title: string;
  description: string;
  codeSnippet?: string;
  verifiedNotes?: string;
}

export interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  languages: string[];
  license: string;
  analysisDate: string;
  modelUsed: string;
  coreIntent: string;
  targetAudience: string;
  stalledReason: string;
  artifacts: ForensicArtifact[];
  timeline: TimelineMilestone[];
  blueprint: {
    p0: { title: string; tasks: string[]; impact: string };
    p1: { title: string; tasks: string[]; impact: string };
    p2: { title: string; tasks: string[]; impact: string };
  };
}
