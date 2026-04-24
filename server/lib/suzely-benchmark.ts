import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export interface BenchmarkScenario {
  id: string;
  projectId: number;
  idealTalentIds: number[];
  rankedTalentIds: number[];
}

export interface BenchmarkMetrics {
  scenarios: number;
  mrr: number;
  ndcgAt5: number;
  recallAt5: number;
}

function reciprocalRank(idealTalentIds: number[], rankedTalentIds: number[]): number {
  const index = rankedTalentIds.findIndex(talentId => idealTalentIds.includes(talentId));
  return index === -1 ? 0 : 1 / (index + 1);
}

function dcgAtK(idealTalentIds: number[], rankedTalentIds: number[], k: number): number {
  return rankedTalentIds.slice(0, k).reduce((sum, talentId, index) => {
    const relevance = idealTalentIds.includes(talentId) ? 1 : 0;
    if (!relevance) return sum;
    return sum + relevance / Math.log2(index + 2);
  }, 0);
}

function ndcgAtK(idealTalentIds: number[], rankedTalentIds: number[], k: number): number {
  const dcg = dcgAtK(idealTalentIds, rankedTalentIds, k);
  const idealRanking = idealTalentIds.slice(0, k);
  const idcg = dcgAtK(idealTalentIds, idealRanking, k);
  return idcg === 0 ? 0 : dcg / idcg;
}

function recallAtK(idealTalentIds: number[], rankedTalentIds: number[], k: number): number {
  const hits = rankedTalentIds.slice(0, k).filter(talentId => idealTalentIds.includes(talentId)).length;
  return idealTalentIds.length === 0 ? 0 : hits / idealTalentIds.length;
}

export function evaluateBenchmark(scenarios: BenchmarkScenario[]): BenchmarkMetrics {
  const scenarioCount = scenarios.length || 1;

  const totals = scenarios.reduce(
    (acc, scenario) => {
      acc.mrr += reciprocalRank(scenario.idealTalentIds, scenario.rankedTalentIds);
      acc.ndcgAt5 += ndcgAtK(scenario.idealTalentIds, scenario.rankedTalentIds, 5);
      acc.recallAt5 += recallAtK(scenario.idealTalentIds, scenario.rankedTalentIds, 5);
      return acc;
    },
    { mrr: 0, ndcgAt5: 0, recallAt5: 0 }
  );

  return {
    scenarios: scenarios.length,
    mrr: Number((totals.mrr / scenarioCount).toFixed(4)),
    ndcgAt5: Number((totals.ndcgAt5 / scenarioCount).toFixed(4)),
    recallAt5: Number((totals.recallAt5 / scenarioCount).toFixed(4)),
  };
}

export async function loadBenchmarkScenarios(): Promise<BenchmarkScenario[]> {
  const fixturePath = resolve(process.cwd(), "server/fixtures/suzely-benchmark.json");
  const raw = await readFile(fixturePath, "utf8");
  return JSON.parse(raw) as BenchmarkScenario[];
}
