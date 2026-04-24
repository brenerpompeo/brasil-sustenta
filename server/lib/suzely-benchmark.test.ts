import { describe, expect, it } from "vitest";
import { evaluateBenchmark } from "./suzely-benchmark";

describe("suzely benchmark", () => {
  it("computes ranking metrics for offline calibration", () => {
    const metrics = evaluateBenchmark([
      {
        id: "scenario-1",
        projectId: 1,
        idealTalentIds: [10],
        rankedTalentIds: [10, 2, 3, 4, 5],
      },
      {
        id: "scenario-2",
        projectId: 2,
        idealTalentIds: [7, 8],
        rankedTalentIds: [1, 8, 4, 7, 9],
      },
    ]);

    expect(metrics.scenarios).toBe(2);
    expect(metrics.mrr).toBeGreaterThan(0.7);
    expect(metrics.ndcgAt5).toBeGreaterThan(0.7);
    expect(metrics.recallAt5).toBe(1);
  });
});
