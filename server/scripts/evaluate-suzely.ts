import { evaluateBenchmark, loadBenchmarkScenarios } from "../lib/suzely-benchmark";

async function main() {
  const scenarios = await loadBenchmarkScenarios();
  const metrics = evaluateBenchmark(scenarios);

  console.log("Suzely benchmark");
  console.log(JSON.stringify(metrics, null, 2));
}

main().catch(error => {
  console.error("Failed to evaluate Suzely benchmark");
  console.error(error);
  process.exit(1);
});
