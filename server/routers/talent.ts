import { z } from "zod";
import { protectedProcedure, adminProcedure, router } from "../_core/trpc";
import { projects, applications, companyProfiles, talentProfiles } from "../../drizzle/schema";
import { eq, desc, count } from "drizzle-orm";

/**
 * Talent Router
 * Real endpoints for Talent (Jovem) dashboard
 */
export const talentRouter = router({
  /**
   * Get all talents (Admin)
   */
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.select().from(talentProfiles).orderBy(desc(talentProfiles.createdAt)).limit(input.limit).offset(input.offset);
      const enriched = await Promise.all(rows.map(async (t) => {
        const [appCountResult] = await ctx.db.select({ value: count() }).from(applications).where(eq(applications.talentId, t.id));
        return { ...t, applicationCount: appCountResult?.value || 0 };
      }));
      return { talents: enriched, total: rows.length };
    }),

  getOpenProjects: protectedProcedure
    .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) return { projects: [], total: 0 };

      const result = await ctx.db
        .select({
          id: projects.id,
          title: projects.title,
          category: projects.category,
          status: projects.status,
          budget: projects.budget,
          requiredSkills: projects.requiredSkills,
          duration: projects.duration,
          company: companyProfiles.companyName,
        })
        .from(projects)
        .innerJoin(companyProfiles, eq(projects.companyId, companyProfiles.id))
        .where(eq(projects.status, "open"))
        .limit(input.limit)
        .offset(input.offset)
        .orderBy(desc(projects.createdAt));

      return {
        projects: result,
        total: result.length,
      };
    }),
    
  getMyApplications: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.db || !ctx.user) return { applications: [], total: 0 };

      // Buscar o ID do talento baseado no usuário logado
      const talentResult = await ctx.db
        .select()
        .from(talentProfiles)
        .where(eq(talentProfiles.userId, ctx.user.id))
        .limit(1);
      
      const talent = talentResult[0];
      if (!talent) return { applications: [], total: 0 };

      const result = await ctx.db
        .select({
          id: applications.id,
          projectId: applications.projectId,
          status: applications.status,
          appliedAt: applications.appliedAt,
          project: {
            title: projects.title,
            company: companyProfiles.companyName,
          },
        })
        .from(applications)
        .innerJoin(projects, eq(applications.projectId, projects.id))
        .innerJoin(companyProfiles, eq(projects.companyId, companyProfiles.id))
        .where(eq(applications.talentId, talent.id))
        .orderBy(desc(applications.appliedAt));

      return {
        applications: result,
        total: result.length,
      };
    }),

  getMySquads: protectedProcedure
    .query(async () => {
      // TODO: Implementar lógica real de squads quando a tabela estiver pronta com membros
      return {
        squads: [],
        total: 0
      };
    }),

  applyToProject: protectedProcedure
    .input(z.object({ projectId: z.number(), coverLetter: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) throw new Error("Unauthorized");

      const talentResult = await ctx.db
        .select()
        .from(talentProfiles)
        .where(eq(talentProfiles.userId, ctx.user.id))
        .limit(1);
      
      const talent = talentResult[0];
      if (!talent) throw new Error("Talent profile not found");

      await ctx.db.insert(applications).values({
        projectId: input.projectId,
        talentId: talent.id,
        coverLetter: input.coverLetter,
        status: "pending",
      });

      return { success: true, message: "Candidatura enviada com sucesso! Boa sorte. ✨" };
    })
});
