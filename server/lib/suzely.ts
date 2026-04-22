import { ENV } from "../_core/env";

/**
 * Suzely Intelligence (V3.1) - 2026 Post-Migration
 * Using the new gemini-embedding-001 model.
 */

const GEMINI_API_V1 = "https://generativelanguage.googleapis.com/v1";
const GEMINI_API_V1BETA = "https://generativelanguage.googleapis.com/v1beta";

export interface SuzelyMatchCandidate {
  id: number;
  content: string;
  skills: string[];
  metadata?: any;
}

export const suzely = {
  /**
   * Generates a 768-dimension embedding using the new Gemini Standard.
   * Model: gemini-embedding-001
   */
  async generateEmbedding(text: string): Promise<number[]> {
    if (!ENV.geminiApiKey) {
      throw new Error("Suzely: GEMINI_API_KEY is missing in ENV");
    }

    try {
      const response = await fetch(
        `${GEMINI_API_V1}/models/gemini-embedding-001:embedContent?key=${ENV.geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "models/gemini-embedding-001",
            content: { parts: [{ text }] },
            output_dimensionality: 768, // Hard-compatibility with our schema
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Suzely API Error (v1): ${JSON.stringify(error)}`);
      }

      const data = await response.json();
      return data.embedding.values;
    } catch (error) {
      console.error("[Suzely] Failed to generate embedding with gemini-embedding-001:", error);
      throw error;
    }
  },

  /**
   * Agentic Reranking (Gemini 2.0 Flash)
   */
  async agenticRerank(
    projectBrief: string,
    candidates: SuzelyMatchCandidate[]
  ): Promise<{ id: number; reason: string; score: number }[]> {
    if (!ENV.geminiApiKey) {
      return candidates.map(c => ({ id: c.id, reason: "Match semântico básico", score: 0 }));
    }

    const payload = {
      contents: [{
        parts: [{
          text: `Você é Suzely, a Inteligência de Match da Brasil Sustenta.
Analise o PROJETO e os CANDIDATOS. Sugira o Fit estratégico.

PROJETO:
${projectBrief}

CANDIDATOS:
${candidates.map(c => `[ID: ${c.id}] ${c.content}`).join("\n")}

Retorne JSON plano: [{"id": number, "score": number, "reason": "Justificativa curta"}]`
        }]
      }],
      generationConfig: { responseMimeType: "application/json" }
    };

    try {
      const response = await fetch(
        `${GEMINI_API_V1BETA}/models/gemini-2.0-flash:generateContent?key=${ENV.geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) return candidates.map(c => ({ id: c.id, reason: "Erro no reranking", score: 0 }));

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return JSON.parse(text);
    } catch (error) {
      return candidates.map(c => ({ id: c.id, reason: "Falha na análise", score: 0 }));
    }
  }
};
