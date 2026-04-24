import { z } from "zod";
import { eq, inArray } from "drizzle-orm";
import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { projects, talentProfiles } from "../../drizzle/schema";
import {
  computeDeterministicSubscores,
  runAllocationBatch,
  runReranking,
  scoreSubscores,
} from "../lib/suzely-pipeline";
import { suzely } from "../lib/suzely";

async function resolveDb(ctx: unknown) {
  return ((ctx as { db?: Awaited<ReturnType<typeof getDb>> })?.db || (await getDb())) as NonNullable<
    Awaited<ReturnType<typeof getDb>>
  >;
}

export const aiRouter = router({
  calculateFitScore: publicProcedure
    .input(z.object({ projectId: z.number(), talentId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await resolveDb(ctx);

      const [project] = await db
        .select({
          id: projects.id,
          title: projects.title,
          description: projects.description,
          requiredSkills: projects.requiredSkills,
          odsAlignment: projects.odsAlignment,
          teamSize: projects.teamSize,
          companyId: projects.companyId,
          hubLocalId: projects.hubLocalId,
          embedding: projects.embedding,
          briefEmbedding: projects.briefEmbedding,
          skillsEmbedding: projects.skillsEmbedding,
          odsEmbedding: projects.odsEmbedding,
          category: projects.category,
        })
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      const [talent] = await db
        .select({
          id: talentProfiles.id,
          userId: talentProfiles.userId,
          fullName: talentProfiles.fullName,
          bio: talentProfiles.bio,
          skills: talentProfiles.skills,
          portfolio: talentProfiles.portfolio,
          linkedin: talentProfiles.linkedin,
          github: talentProfiles.github,
          avatar: talentProfiles.avatar,
          course: talentProfiles.course,
          universityId: talentProfiles.universityId,
          embedding: talentProfiles.embedding,
          bioEmbedding: talentProfiles.bioEmbedding,
          skillsEmbedding: talentProfiles.skillsEmbedding,
          odsEmbedding: talentProfiles.odsEmbedding,
          isAvailable: talentProfiles.isAvailable,
        })
        .from(talentProfiles)
        .where(eq(talentProfiles.id, input.talentId))
        .limit(1);

      if (!project || !talent) {
        throw new Error("Project or talent not found");
      }

      const subscores = computeDeterministicSubscores(project, talent);
      const deterministicScore = scoreSubscores(subscores);
      const evidence = await suzely.generateEvidenceBatch(
        `${project.title}. ${project.description}`,
        [
          {
            id: talent.id,
            content: `${talent.fullName}. ${talent.bio || ""} Skills: ${(talent.skills || []).join(", ")}`,
            skills: talent.skills || [],
            deterministicScore,
            fallbackReasoning: suzely.buildFallbackReasoning(subscores),
            fallbackQuotesFromTalent: [suzely.sentenceSnippet(`${talent.fullName}. ${talent.bio || ""}`)],
            fallbackQuotesFromProject: [suzely.sentenceSnippet(`${project.title}. ${project.description}`)],
          },
        ]
      );

      const matchEvidence = evidence[talent.id];
      const finalScore = Math.round((matchEvidence?.score ?? deterministicScore) * 0.65 + deterministicScore * 0.35);

      return {
        skillsFit: subscores.skills,
        odsFit: subscores.ods,
        contextFit: Math.round((subscores.context + subscores.availability + subscores.territory) / 3),
        totalScore: finalScore,
        explanation: matchEvidence?.reasoning || suzely.buildFallbackReasoning(subscores),
        odsBadges: (project.odsAlignment || []).slice(0, 5),
        subscores,
        evidence: matchEvidence,
        confidence: matchEvidence?.confidence || "low",
        pipelineVersion: suzely.pipelineVersion,
      };
    }),

  getShortlist: publicProcedure
    .input(z.object({ projectId: z.number(), limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      const db = await resolveDb(ctx);
      const { project, reranked } = await runReranking(db, {
        projectId: input.projectId,
        limit: input.limit,
        candidatePoolLimit: Math.max(input.limit * 5, 30),
      });
      const talentIds = reranked.map(candidate => candidate.talentId);

      const talents = await db
        .select({
          id: talentProfiles.id,
          fullName: talentProfiles.fullName,
          bio: talentProfiles.bio,
          skills: talentProfiles.skills,
          avatar: talentProfiles.avatar,
          course: talentProfiles.course,
          isAvailable: talentProfiles.isAvailable,
        })
        .from(talentProfiles)
        .where(
          talentIds.length
            ? inArray(talentProfiles.id, talentIds)
            : inArray(talentProfiles.id, [-1])
        );

      const talentById = new Map(talents.map(talent => [talent.id, talent]));

      return {
        projectTitle: project.title,
        shortlist: reranked.map(candidate => ({
          talent: {
            id: talentById.get(candidate.talentId)?.id || candidate.talentId,
            fullName: talentById.get(candidate.talentId)?.fullName || "Talento",
            skills: talentById.get(candidate.talentId)?.skills || [],
            avatar: talentById.get(candidate.talentId)?.avatar || null,
            course: talentById.get(candidate.talentId)?.course || null,
            university: null,
          },
          totalScore: candidate.finalScore,
          skillsFit: candidate.subscores.skills,
          odsFit: candidate.subscores.ods,
          contextFit: candidate.subscores.context,
          odsBadges: (project.odsAlignment || []).slice(0, 5),
          evidence: {
            reasoning: candidate.reasoning,
            confidence: candidate.confidence,
          },
        })),
      };
    }),

  getTalentMatches: publicProcedure
    .input(
      z.object({
        projectId: z.number(),
        limit: z.number().default(5),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = await resolveDb(ctx);
      const { project, reranked } = await runReranking(db, {
        projectId: input.projectId,
        limit: input.limit,
        candidatePoolLimit: Math.max(input.limit * 10, 40),
      });

      const talentIds = reranked.map(candidate => candidate.talentId);
      const talents = talentIds.length
        ? await db
            .select({
              id: talentProfiles.id,
              fullName: talentProfiles.fullName,
              bio: talentProfiles.bio,
              skills: talentProfiles.skills,
              avatar: talentProfiles.avatar,
              isAvailable: talentProfiles.isAvailable,
            })
            .from(talentProfiles)
            .where(inArray(talentProfiles.id, talentIds))
        : [];
      const talentById = new Map(talents.map(talent => [talent.id, talent]));

      return {
        success: true,
        suzelyEngine: "VNext pipeline active",
        stageExecuted: "reranking",
        pipelineVersion: suzely.pipelineVersion,
        projectContext: {
          title: project.title,
          category: project.category,
        },
        matches: reranked.map(candidate => ({
          talent: talentById.get(candidate.talentId),
          aiFitScore: candidate.finalScore,
          aiMatchReason: candidate.reasoning,
          finalScore: candidate.finalScore,
          subscores: candidate.subscores,
          evidence: {
            reasoning: candidate.reasoning,
            evidenceQuotesFromTalent: candidate.evidenceQuotesFromTalent,
            evidenceQuotesFromProject: candidate.evidenceQuotesFromProject,
            confidence: candidate.confidence,
          },
          retrieval: candidate.retrieval,
          confidence: candidate.confidence,
          pipelineVersion: candidate.pipelineVersion,
          fairnessAudit: candidate.fairnessAudit,
        })),
      };
    }),

  runAllocationBatch: adminProcedure
    .input(
      z.object({
        projectIds: z.array(z.number()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await resolveDb(ctx);
      return runAllocationBatch(db, input.projectIds);
    }),
});
