import { describe, expect, it } from "vitest";
import {
  computeDeterministicSubscores,
  computeLexicalRanking,
  scoreSubscores,
  stableAllocateManyToOne,
} from "./suzely-pipeline";
import { SUZELY_PIPELINE_VERSION, type AllocationInput, type RerankedCandidate } from "../../shared/suzely";

const project = {
  id: 1,
  title: "ODS 13 climate brief",
  description: "Projeto para engajar jovens em estrategia de clima e dados ESG.",
  requiredSkills: ["pesquisa", "comunicacao", "dados"],
  odsAlignment: [13, 17],
  teamSize: 2,
  companyId: 1,
  hubLocalId: 9,
  embedding: null,
  briefEmbedding: null,
  skillsEmbedding: null,
  odsEmbedding: null,
  category: "esg" as const,
};

const makeTalent = (overrides: Partial<any> = {}) => ({
  id: 1,
  userId: 11,
  fullName: "Talento ODS",
  bio: "Atuo com pesquisa, dados e sustentabilidade em projetos de impacto.",
  skills: ["pesquisa", "dados", "comunicacao", "sustentabilidade"],
  portfolio: "https://portfolio.example",
  linkedin: "https://linkedin.example",
  github: null,
  avatar: null,
  course: "Administracao",
  universityId: 44,
  embedding: null,
  bioEmbedding: null,
  skillsEmbedding: null,
  odsEmbedding: null,
  isAvailable: true,
  ...overrides,
});

function makeCandidate(
  talentId: number,
  finalScore: number,
  overrides: Partial<RerankedCandidate> = {}
): RerankedCandidate {
  return {
    projectId: 1,
    talentId,
    finalScore,
    subscores: {
      skills: 80,
      ods: 75,
      context: 70,
      availability: 100,
      territory: 60,
    },
    reasoning: "Fit forte por skills e ODS.",
    evidenceQuotesFromTalent: ["Atuo com pesquisa e sustentabilidade."],
    evidenceQuotesFromProject: ["Projeto para engajar jovens em estrategia de clima."],
    confidence: "high",
    retrieval: {
      talentId,
      fusedScore: 0.98,
      vectorScore: 1,
      lexicalScore: 85,
      reasons: ["vector_recall", "skill_overlap"],
    },
    pipelineVersion: SUZELY_PIPELINE_VERSION,
    modelVersion: "gemini-2.0-flash",
    fairnessAudit: {
      eligible: true,
      reasons: [],
      version: SUZELY_PIPELINE_VERSION,
    },
    ...overrides,
  };
}

describe("suzely pipeline", () => {
  it("computes deterministic subscores with high skills and availability", () => {
    const subscores = computeDeterministicSubscores(project, makeTalent());

    expect(subscores.skills).toBeGreaterThan(60);
    expect(subscores.availability).toBe(100);
    expect(scoreSubscores(subscores)).toBeGreaterThan(65);
  });

  it("uses pre-filtered lexical ranking and pushes stronger overlaps up", () => {
    const strong = makeTalent({ id: 1 });
    const weak = makeTalent({
      id: 2,
      fullName: "Talento Generico",
      bio: "Interesse geral em voluntariado.",
      skills: ["organizacao"],
      portfolio: null,
      linkedin: null,
    });

    const ranking = computeLexicalRanking(project, [weak, strong]);
    expect(ranking[0]?.id).toBe(1);
    expect(ranking[0]?.lexicalScore).toBeGreaterThan(ranking[1]?.lexicalScore || 0);
  });

  it("stable allocation respects capacity and excludes ineligible talent", () => {
    const inputs: AllocationInput[] = [
      {
        projectId: 1,
        projectCapacity: 1,
        candidates: [
          makeCandidate(1, 92),
          makeCandidate(2, 88, {
            fairnessAudit: {
              eligible: false,
              reasons: ["Talent marked as unavailable."],
              version: SUZELY_PIPELINE_VERSION,
            },
          }),
        ],
      },
      {
        projectId: 2,
        projectCapacity: 1,
        candidates: [makeCandidate(1, 80, { projectId: 2 }), makeCandidate(3, 79, { projectId: 2 })],
      },
    ];

    const [first, second] = stableAllocateManyToOne(inputs);

    expect(first.allocated).toHaveLength(1);
    expect(first.allocated[0]?.talentId).toBe(1);
    expect(first.excluded[0]?.talentId).toBe(2);
    expect(second.allocated[0]?.talentId).toBe(3);
  });
});
