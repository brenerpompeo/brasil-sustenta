import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { talentProfiles, projects, type TalentProfile } from "../../drizzle/schema";
import { eq, sql, desc, inArray } from "drizzle-orm";
import { suzely } from "../lib/suzely";
import { fuseRRF } from "../lib/vector-utils";

export const aiRouter = router({
  /**
   * Suzely Smart Match (V3.0)
   * The unicorn-level matching engine for Brasil Sustenta.
   */
  calculateFitScore: publicProcedure
    .input(z.object({ projectId: z.number(), talentId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = (ctx as any).db || await getDb();
      if (!db) throw new Error("DB unavailable");

      const [project] = await db.select().from(projects).where(eq(projects.id, input.projectId)).limit(1);
      const [talent] = await db.select().from(talentProfiles).where(eq(talentProfiles.id, input.talentId)).limit(1);

      if (!project || !talent) throw new Error("Project or talent not found");

      const requiredSkills: string[] = project.requiredSkills || [];
      const talentSkills: string[] = talent.skills || [];
      const skillMatches = requiredSkills.filter(s =>
        talentSkills.some(ts => ts.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ts.toLowerCase()))
      );
      const skillsFit = requiredSkills.length > 0
        ? Math.round((skillMatches.length / requiredSkills.length) * 100)
        : 50;

      const projectOds: number[] = (project.odsAlignment as number[]) || [];
      const esgSkills = ['esg', 'sustentabilidade', 'ods', 'impacto', 'ambiental', 'social', 'carbono', 'clima'];
      const talentEsgScore = talentSkills.filter(s =>
        esgSkills.some(e => s.toLowerCase().includes(e))
      ).length;
      const odsFit = projectOds.length > 0
        ? Math.min(100, Math.round(50 + (talentEsgScore * 10)))
        : 50;

      const contextFit = talent.isAvailable ? 80 : 30;

      const totalScore = Math.round((skillsFit * 0.40) + (odsFit * 0.35) + (contextFit * 0.25));

      let explanation = `${talent.fullName} tem `;
      if (totalScore >= 75) explanation += `fit alto (${totalScore}/100) com este projeto. `;
      else if (totalScore >= 50) explanation += `fit moderado (${totalScore}/100) com este projeto. `;
      else explanation += `fit baixo (${totalScore}/100) com este projeto. `;

      if (skillMatches.length > 0) {
        explanation += `Suas skills em ${skillMatches.slice(0, 2).join(' e ')} são diretamente relevantes. `;
      }
      if (projectOds.length > 0) {
        explanation += `O projeto foca nos ODS ${projectOds.slice(0, 3).join(', ')}. `;
      }
      if (!talent.isAvailable) {
        explanation += `Atenção: talento marcado como indisponível no momento.`;
      }

      return {
        skillsFit,
        odsFit,
        contextFit,
        totalScore,
        explanation,
        odsBadges: projectOds.slice(0, 5),
      };
    }),

  getShortlist: publicProcedure
    .input(z.object({ projectId: z.number(), limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      const db = (ctx as any).db || await getDb();
      if (!db) throw new Error("DB unavailable");

      const [project] = await db.select().from(projects).where(eq(projects.id, input.projectId)).limit(1);
      if (!project) throw new Error("Project not found");

      const talents = await db.select().from(talentProfiles).where(eq(talentProfiles.isAvailable, true)).limit(input.limit);

      const esgSkills = ['esg', 'sustentabilidade', 'ods', 'impacto', 'ambiental', 'social', 'carbono'];
      const projectOds: number[] = (project.odsAlignment as number[]) || [];

      const results = talents.map((talent: TalentProfile) => {
        const requiredSkills: string[] = project.requiredSkills || [];
        const talentSkills: string[] = talent.skills || [];
        const skillMatches = requiredSkills.filter(s =>
          talentSkills.some(ts => ts.toLowerCase().includes(s.toLowerCase()))
        );
        const skillsFit = requiredSkills.length > 0 ? Math.round((skillMatches.length / requiredSkills.length) * 100) : 50;
        const talentEsgScore = talentSkills.filter(s => esgSkills.some(e => s.toLowerCase().includes(e))).length;
        const odsFit = Math.min(100, 50 + talentEsgScore * 10);
        const contextFit = talent.isAvailable ? 80 : 30;
        const totalScore = Math.round(skillsFit * 0.40 + odsFit * 0.35 + contextFit * 0.25);

        return {
          talent,
          skillsFit,
          odsFit,
          contextFit,
          totalScore,
          odsBadges: projectOds.slice(0, 5),
        };
      }).sort((a: { totalScore: number }, b: { totalScore: number }) => b.totalScore - a.totalScore);

      return { shortlist: results, projectTitle: project.title };
    }),

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

      // 1. Context Retrieval: Get Project Details & Embedding
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      if (!project) {
        throw new Error("Project not found");
      }

      // 2. Suzely Knowledge Injection: Generate embedding for project if missing
      let projectEmbedding = project.embedding;
      if (!projectEmbedding) {
        console.log(`[Suzely] Project ${project.id} missing embedding. Generating...`);
        const textToEmbed = `${project.title}: ${project.description}. Required: ${project.requiredSkills?.join(", ")}`;
        projectEmbedding = await suzely.generateEmbedding(textToEmbed);
        
        // Save back to DB for future matches
        await db.update(projects)
          .set({ embedding: projectEmbedding })
          .where(eq(projects.id, project.id));
      }

      // 3. Hybrid Retrieval Stage
      
      // Stage A: Vector Search (Semantic Intent)
      // distance operator <=> is for cosine similarity in pgvector
      const vectorCandidates = await db
        .select({ id: talentProfiles.id })
        .from(talentProfiles)
        .where(eq(talentProfiles.isAvailable, true))
        .orderBy(sql`${talentProfiles.embedding} <=> ${JSON.stringify(projectEmbedding)}`)
        .limit(20);

      const vectorIds = vectorCandidates.map(c => c.id);

      // Stage B: Lexical Search (Keyword Skills)
      const requiredSkills = project.requiredSkills || [];
      const lexicalCandidates = await db
        .select({ id: talentProfiles.id })
        .from(talentProfiles)
        .where(eq(talentProfiles.isAvailable, true))
        .limit(20);
        // Simple mock of lexical for now, RRF handles its ranking
      
      const lexicalIds = lexicalCandidates.map(c => c.id);

      // 4. Fusion Layer: RRF (Reciprocal Rank Fusion)
      const fusedResults = fuseRRF(vectorIds, lexicalIds);
      const topFusedIds = fusedResults.slice(0, 10).map(r => r.id);

      if (topFusedIds.length === 0) {
        return { success: true, matches: [] };
      }

      // 5. Final Fetch & Agentic Reranking
      const topTalents = await db
        .select()
        .from(talentProfiles)
        .where(inArray(talentProfiles.id, topFusedIds));

      // Prepare metadata for Suzely's reasoning
      const candidatePayload = topTalents.map(t => ({
        id: t.id,
        content: `${t.fullName}: ${t.bio}`,
        skills: t.skills || []
      }));

      const rerankedResults = await suzely.agenticRerank(
        `${project.title}: ${project.description}`,
        candidatePayload
      );

      // 6. Assembly & Return
      const matches = rerankedResults
        .map(rank => {
          const talent = topTalents.find(t => t.id === rank.id);
          return {
            talent,
            aiFitScore: rank.score,
            aiMatchReason: rank.reason
          };
        })
        .sort((a, b) => b.aiFitScore - a.aiFitScore)
        .slice(0, input.limit);

      return {
        success: true,
        suzelyEngine: "V3.0 (Unicorn-Active)",
        projectContext: {
          title: project.title,
          category: project.category
        },
        matches
      };
    }),
});
