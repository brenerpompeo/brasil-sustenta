/**
 * Vector Utilities for Suzely (V3.0)
 * Implements RRF (Reciprocal Rank Fusion) and Distance Math.
 */

export interface RankedResult {
  id: number;
  rank: number;
}

/**
 * Reciprocal Rank Fusion (RRF)
 * Merges multiple ranked lists into a single ranking.
 * Formula: score = SUM( 1 / (k + rank) )
 */
export function fuseRRF(
  vectorResults: number[], // IDs in order of vector distance
  keywordResults: number[], // IDs in order of keyword score
  k: number = 60
): { id: number; rrfScore: number }[] {
  const scores: Record<number, number> = {};

  // Process Vector Rankings
  vectorResults.forEach((id, index) => {
    scores[id] = (scores[id] || 0) + 1 / (k + (index + 1));
  });

  // Process Keyword Rankings
  keywordResults.forEach((id, index) => {
    scores[id] = (scores[id] || 0) + 1 / (k + (index + 1));
  });

  // Convert to sorted array
  return Object.entries(scores)
    .map(([id, rrfScore]) => ({ id: Number(id), rrfScore }))
    .sort((a, b) => b.rrfScore - a.rrfScore);
}
