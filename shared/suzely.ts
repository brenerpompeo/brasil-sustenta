export const SUZELY_PIPELINE_VERSION = "vNext-1";
export const SUZELY_MODEL_VERSION = "gemini-2.0-flash";

export type MatchConfidence = "high" | "medium" | "low";
export type MatchStage = "retrieval" | "reranking" | "allocation";
export type AllocationStatus = "allocated" | "waitlisted" | "excluded";

export interface MatchSubscores {
  skills: number;
  ods: number;
  context: number;
  availability: number;
  territory: number;
}

export interface MatchEvidence {
  reasoning: string;
  evidenceQuotesFromTalent: string[];
  evidenceQuotesFromProject: string[];
  confidence: MatchConfidence;
}

export interface FairnessAudit {
  eligible: boolean;
  reasons: string[];
  version: string;
}

export interface RetrievalQuery {
  projectId: number;
  limit?: number;
  candidatePoolLimit?: number;
}

export interface RetrievedCandidate {
  talentId: number;
  fusedScore: number;
  vectorScore: number;
  lexicalScore: number;
  reasons: string[];
}

export interface RerankedCandidate extends MatchEvidence {
  projectId: number;
  talentId: number;
  finalScore: number;
  subscores: MatchSubscores;
  retrieval: RetrievedCandidate;
  pipelineVersion: string;
  modelVersion: string;
  fairnessAudit: FairnessAudit;
}

export interface AllocationInput {
  projectId: number;
  projectCapacity: number;
  candidates: RerankedCandidate[];
}

export interface AllocationResult {
  projectId: number;
  allocated: RerankedCandidate[];
  waitlisted: RerankedCandidate[];
  excluded: Array<RerankedCandidate & { exclusionReason: string }>;
  pipelineVersion: string;
}
