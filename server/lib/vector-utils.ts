/**
 * Vector Utilities for Suzely (V3.0)
 * Implements RRF (Reciprocal Rank Fusion) and Distance Math.
 */

export interface RankedResult {
  id: number;
  rank: number;
}

export interface RankedListInput {
  ids: number[];
  weight?: number;
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
  return fuseRankedLists(
    [
      { ids: vectorResults, weight: 1 },
      { ids: keywordResults, weight: 1 },
    ],
    k
  );
}

export function fuseRankedLists(
  rankedLists: RankedListInput[],
  k: number = 60
): { id: number; rrfScore: number }[] {
  const scores: Record<number, number> = {};

  rankedLists.forEach(({ ids, weight = 1 }) => {
    ids.forEach((id, index) => {
      scores[id] = (scores[id] || 0) + weight * (1 / (k + (index + 1)));
    });
  });

  // Convert to sorted array
  return Object.entries(scores)
    .map(([id, rrfScore]) => ({ id: Number(id), rrfScore }))
    .sort((a, b) => b.rrfScore - a.rrfScore);
}
