import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { talentProfiles, projects } from "../../drizzle/schema";
import { eq, sql, desc, inArray } from "drizzle-orm";
import { suzely } from "../lib/suzely";
import { fuseRRF } from "../lib/vector-utils";

export const aiRouter = router({
  /**
   * Suzely Smart Match (V3.0)
   * The unicorn-level matching engine for Brasil Sustenta.
   */
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
