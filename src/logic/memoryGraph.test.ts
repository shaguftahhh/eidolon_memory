import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterMemoriesByEra,
  searchMemories,
  findConnectionsForMemory,
  detectCognitiveDrifts,
  calculateArchivalGhostResonance,
  synthesizeRevivedStory,
  getMemoryCategoryType,
  getTargetDustColors
} from './memoryGraph';
import { INITIAL_MEMORIES, INITIAL_CONNECTIONS } from '../data/mockMemories';

test('filterMemoriesByEra filters correctly and returns all when requested', () => {
  const all = filterMemoriesByEra(INITIAL_MEMORIES, 'all');
  assert.equal(all.length, INITIAL_MEMORIES.length);

  const era1994 = filterMemoriesByEra(INITIAL_MEMORIES, 1994);
  assert.equal(era1994.length, 2);
  assert.ok(era1994.every((m) => m.year === 1994));

  const era2008 = filterMemoriesByEra(INITIAL_MEMORIES, '2008');
  assert.equal(era2008.length, 1);
  assert.equal(era2008[0].id, 'mem-2008-01');
});

test('searchMemories matches keywords across title, tags, and excerpts', () => {
  const rainSearch = searchMemories(INITIAL_MEMORIES, 'rain');
  assert.ok(rainSearch.length >= 1);
  assert.ok(rainSearch.some((m) => m.id === 'mem-1994-01'));

  const marigoldSearch = searchMemories(INITIAL_MEMORIES, 'marigold');
  assert.ok(marigoldSearch.length >= 2);

  const nonExistent = searchMemories(INITIAL_MEMORIES, 'spaceship');
  assert.equal(nonExistent.length, 0);
});

test('findConnectionsForMemory retrieves all incoming and outgoing connections', () => {
  const conns = findConnectionsForMemory('mem-1994-01', INITIAL_CONNECTIONS);
  assert.ok(conns.length >= 2);
  assert.ok(conns.some((c) => c.sourceId === 'mem-1994-01' || c.targetId === 'mem-1994-01'));
});

test('detectCognitiveDrifts identifies discrepancies with proper year gaps', () => {
  const drifts = detectCognitiveDrifts(INITIAL_MEMORIES, INITIAL_CONNECTIONS);
  assert.ok(drifts.length >= 2);
  const temporalDrift = drifts.find((d) => d.connection.type === 'temporal_drift');
  assert.ok(temporalDrift);
  assert.equal(temporalDrift?.yearGap, 6);
});

test('calculateArchivalGhostResonance handles empty and active selections', () => {
  const emptyRes = calculateArchivalGhostResonance([], INITIAL_MEMORIES);
  assert.equal(emptyRes.coherenceScore, 0);

  const activeRes = calculateArchivalGhostResonance(['mem-1994-01', 'mem-1994-02', 'mem-1998-01'], INITIAL_MEMORIES);
  assert.ok(activeRes.coherenceScore > 30);
  assert.equal(activeRes.temporalSpanYears, 4);
});

test('synthesizeRevivedStory creates structured chronological narrative', () => {
  const story = synthesizeRevivedStory(['mem-1994-01', 'mem-1998-01'], INITIAL_MEMORIES, INITIAL_CONNECTIONS);
  assert.ok(story.title.includes('1994 — 1998'));
  assert.equal(story.chronology.length, 2);
  assert.ok(story.synthesisProse.includes('Offline Reconstruction'));
  assert.ok(story.synthesisProse.includes('Temporal Synchronization'));
});

test('getMemoryCategoryType correctly classifies historical vs modern eras', () => {
  const mem1994 = INITIAL_MEMORIES.find((m) => m.year === 1994)!;
  const mem1998 = INITIAL_MEMORIES.find((m) => m.year === 1998)!;
  const mem2002 = INITIAL_MEMORIES.find((m) => m.year === 2002)!;
  const mem2008 = INITIAL_MEMORIES.find((m) => m.year === 2008)!;
  const mem2015 = INITIAL_MEMORIES.find((m) => m.year === 2015)!;

  assert.equal(getMemoryCategoryType(mem1994), 'historical');
  assert.equal(getMemoryCategoryType(mem1998), 'historical');
  assert.equal(getMemoryCategoryType(mem2002), 'transitional');
  assert.equal(getMemoryCategoryType(mem2008), 'modern');
  assert.equal(getMemoryCategoryType(mem2015), 'modern');
  assert.equal(getMemoryCategoryType(null), 'historical');
});

test('getTargetDustColors returns warm sepia for historical and cool blue for modern', () => {
  const sepia = getTargetDustColors('historical');
  // Sepia has dominant red/green and low blue (warm)
  assert.ok(sepia.primary.r > sepia.primary.b);
  assert.equal(sepia.primary.r, 217);

  const blue = getTargetDustColors('modern');
  // Modern has high blue/cyan
  assert.ok(blue.primary.b > blue.primary.r);
  assert.equal(blue.primary.b, 248);
});

