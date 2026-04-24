import { z } from "zod";
import { ENV } from "../_core/env";
import {
  SUZELY_MODEL_VERSION,
  SUZELY_PIPELINE_VERSION,
  type MatchConfidence,
  type MatchEvidence,
  type MatchSubscores,
} from "../../shared/suzely";

/**
 * Suzely Intelligence (VNext)
 * Embeddings + structured evidence generation.
 */

const GEMINI_API_V1BETA = "https://generativelanguage.googleapis.com/v1beta";

const evidenceSchema = z.object({
  id: z.number(),
  score: z.number().min(0).max(100),
  reasoning: z.string().min(1),
  evidenceQuotesFromTalent: z.array(z.string()).min(1),
  evidenceQuotesFromProject: z.array(z.string()).min(1),
  confidence: z.enum(["high", "medium", "low"]),
});

type EvidencePayload = z.infer<typeof evidenceSchema>;

export interface SuzelyMatchCandidate {
  id: number;
  content: string;
  skills: string[];
  fallbackReasoning: string;
  fallbackQuotesFromTalent: string[];
  fallbackQuotesFromProject: string[];
}

function sentenceSnippet(text: string | null | undefined): string {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (!clean) return "Sem evidencia literal disponivel.";
  const [firstSentence] = clean.split(/(?<=[.!?])\s+/);
  return (firstSentence || clean).slice(0, 220);
}

function normalizeConfidence(score: number, validEvidence: boolean): MatchConfidence {
  if (!validEvidence) return "low";
  if (score >= 80) return "high";
  if (score >= 60) return "medium";
  return "low";
}

function createFallbackEvidence(candidate: SuzelyMatchCandidate, score: number): EvidencePayload {
  const validEvidence =
    candidate.fallbackQuotesFromTalent.length > 0 &&
    candidate.fallbackQuotesFromProject.length > 0;

  return {
    id: candidate.id,
    score,
    reasoning: candidate.fallbackReasoning,
    evidenceQuotesFromTalent: candidate.fallbackQuotesFromTalent.length
      ? candidate.fallbackQuotesFromTalent
      : [sentenceSnippet(candidate.content)],
    evidenceQuotesFromProject: candidate.fallbackQuotesFromProject.length
      ? candidate.fallbackQuotesFromProject
      : ["Projeto sem citacao literal capturada."],
    confidence: normalizeConfidence(score, validEvidence),
  };
}

export const suzely = {
  pipelineVersion: SUZELY_PIPELINE_VERSION,
  modelVersion: SUZELY_MODEL_VERSION,

  async generateEmbedding(text: string): Promise<number[]> {
    if (!ENV.geminiApiKey) {
      throw new Error("Suzely: GEMINI_API_KEY is missing em ENV");
    }

    const response = await fetch(
      `${GEMINI_API_V1BETA}/models/gemini-embedding-001:embedContent?key=${ENV.geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "models/gemini-embedding-001",
          content: { parts: [{ text }] },
          output_dimensionality: 768,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Suzely API Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return data.embedding.values;
  },

  buildFallbackReasoning(subscores: MatchSubscores): string {
    const strongestDimension =
      Object.entries(subscores).sort((a, b) => b[1] - a[1])[0]?.[0] || "context";

    return `Fit calculado pelo pipeline ${SUZELY_PIPELINE_VERSION} com melhor aderencia em ${strongestDimension}.`;
  },

  async generateEvidenceBatch(
    projectBrief: string,
    candidates: Array<SuzelyMatchCandidate & { deterministicScore: number }>
  ): Promise<Record<number, MatchEvidence & { score: number }>> {
    if (!candidates.length) return {};

    if (!ENV.geminiApiKey) {
      return Object.fromEntries(
        candidates.map(candidate => {
          const fallback = createFallbackEvidence(candidate, candidate.deterministicScore);
          return [
            candidate.id,
            {
              score: fallback.score,
              reasoning: fallback.reasoning,
              evidenceQuotesFromTalent: fallback.evidenceQuotesFromTalent,
              evidenceQuotesFromProject: fallback.evidenceQuotesFromProject,
              confidence: fallback.confidence,
            },
          ];
        })
      );
    }

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Voce e Suzely, motor de matching da Brasil Sustenta.
Analise o PROJETO e os CANDIDATOS. Responda JSON plano com uma lista de objetos no formato:
{"id": number, "score": number, "reasoning": string, "evidenceQuotesFromTalent": string[], "evidenceQuotesFromProject": string[], "confidence": "high" | "medium" | "low"}.

Regra critica:
- Use citacoes literais curtas quando possivel.
- Se nao houver evidencia suficiente, reduza score e confidence.
- Nao invente experiencias ou requisitos.

PROJETO:
${projectBrief}

CANDIDATOS:
${candidates
  .map(
    candidate =>
      `[ID: ${candidate.id}] Score base ${candidate.deterministicScore}. Perfil: ${candidate.content}`
  )
  .join("\n")}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    try {
      const response = await fetch(
        `${GEMINI_API_V1BETA}/models/${SUZELY_MODEL_VERSION}:generateContent?key=${ENV.geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Suzely evidence request failed with ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = z.array(evidenceSchema).safeParse(JSON.parse(text));

      if (!parsed.success) {
        throw new Error(parsed.error.message);
      }

      const byId = new Map(
        parsed.data.map(item => [
          item.id,
          {
            score: item.score,
            reasoning: item.reasoning,
            evidenceQuotesFromTalent: item.evidenceQuotesFromTalent,
            evidenceQuotesFromProject: item.evidenceQuotesFromProject,
            confidence: item.confidence,
          },
        ])
      );

      return Object.fromEntries(
        candidates.map(candidate => {
          const llmValue = byId.get(candidate.id);
          if (!llmValue) {
            const fallback = createFallbackEvidence(candidate, candidate.deterministicScore);
            return [candidate.id, fallback];
          }

          return [candidate.id, llmValue];
        })
      );
    } catch (_error) {
      return Object.fromEntries(
        candidates.map(candidate => {
          const fallback = createFallbackEvidence(candidate, candidate.deterministicScore);
          return [candidate.id, fallback];
        })
      );
    }
  },

  sentenceSnippet,
};
