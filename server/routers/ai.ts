import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { talentProfiles, projects } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const aiRouter = router({
  getTalentMatches: publicProcedure
    .input(
      z.object({
        projectId: z.number(),
        limit: z.number().default(5),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database connection unavailable");
      }

      // Buscar detalhes do projeto para extrair habilidades e requisitos
      const projectResult = await db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      const project = projectResult[0];
      if (!project) {
        throw new Error("Project not found");
      }

      const requiredSkills = project.requiredSkills || [];

      // Buscar talentos disponíveis
      const allTalents = await db
        .select()
        .from(talentProfiles)
        .where(eq(talentProfiles.isAvailable, true));

      // Algoritmo Híbrido: Cálculo de Score Base e Simulação de Contexto GenAI
      const scoredTalents = allTalents.map((talent) => {
        const talentSkills = talent.skills || [];
        
        // Match exato de habilidades
        let matchCount = 0;
        requiredSkills.forEach((reqSkill) => {
          if (talentSkills.some(ts => ts.toLowerCase() === reqSkill.toLowerCase())) {
            matchCount++;
          }
        });

        // Simulação do Algoritmo de "Fit Score"
        // Em produção, isso usaria pgvector para distância Cosseno.
        let baseScore = requiredSkills.length > 0 
          ? (matchCount / requiredSkills.length) * 100 
          : 50 + Math.random() * 50; // Fallback randômico para demonstração

        // Bonificação para alinhamento ODS/ESG baseado em keywords
        const esgKeywords = ["sustentabilidade", "ods", "esg", "social", "ambiental", "diversidade"];
        const bioText = (talent.bio || "").toLowerCase();
        let esgBonus = 0;
        esgKeywords.forEach((kw) => {
          if (bioText.includes(kw)) esgBonus += 5;
        });

        const finalScore = Math.min(100, Math.round(baseScore + esgBonus));

        // GenAI Copilot Mocking: Gera uma justificativa baseada nos dados do Jovem
        let aiReasoning = "Match Semântico indisponível.";
        if (finalScore >= 80) {
          aiReasoning = `✨ O Cérebro IA identificou alto alinhamento estratégico. ${talent.fullName} possui forte sinergia com o projeto, combinando as competências de ${talentSkills.slice(0,2).join(", ")} com o propósito de sustentabilidade (ESG) que sua empresa busca.`;
        } else if (finalScore >= 50) {
          aiReasoning = `🔍 Match Parcial. ${talent.fullName} domina parte das habilidades exigidas e demonstra interesse em aprendizado contínuo, sendo um perfil focado em desenvolvimento de longo prazo.`;
        } else {
          aiReasoning = `📈 Perfil exploratório. Embora o fit direto de skills seja menor, a trajetória acadêmica traz potencial diversidade de pensamento para o desafio.`;
        }

        return {
          talent,
          aiFitScore: finalScore,
          aiMatchReason: aiReasoning
        };
      });

      // Ordena por score descendente
      scoredTalents.sort((a, b) => b.aiFitScore - a.aiFitScore);

      return {
        success: true,
        projectContext: {
          title: project.title,
          category: project.category
        },
        matches: scoredTalents.slice(0, input.limit)
      };
    }),
});
