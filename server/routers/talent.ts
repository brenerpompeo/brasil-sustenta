import { z } from "zod";
import { protectedProcedure, adminProcedure, router } from "../_core/trpc";
import { projects, applications, companyProfiles, talentProfiles, squads, squadMembers } from "../../drizzle/schema";
import { eq, desc, count, and, inArray, getTableColumns, sql } from "drizzle-orm";

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
      const enriched = await ctx.db
        .select({
          ...getTableColumns(talentProfiles),
          applicationCount: sql<number>`count(${applications.id})`.as('application_count'),
        })
        .from(talentProfiles)
        .leftJoin(applications, eq(applications.talentId, talentProfiles.id))
        .groupBy(talentProfiles.id)
        .orderBy(desc(talentProfiles.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      return { talents: enriched, total: enriched.length };
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
    .query(async ({ ctx }) => {
      if (!ctx.db || !ctx.user) return { squads: [], total: 0 };

      // Get talent ID
      const talentResult = await ctx.db
        .select()
        .from(talentProfiles)
        .where(eq(talentProfiles.userId, ctx.user.id))
        .limit(1);

      const talent = talentResult[0];
      if (!talent) return { squads: [], total: 0 };

      // Get squads where this talent is a member
      const squadsList = await ctx.db
        .select({
          id: squads.id,
          name: squads.name,
          status: squads.status,
          formedAt: squads.formedAt,
          completedAt: squads.completedAt,
          project: {
            id: projects.id,
            title: projects.title,
            status: projects.status,
          }
        })
        .from(squadMembers)
        .innerJoin(squads, eq(squadMembers.squadId, squads.id))
        .innerJoin(projects, eq(squads.projectId, projects.id))
        .where(eq(squadMembers.talentId, talent.id))
        .orderBy(desc(squads.formedAt));

      // Buscar membros de todos os squads em uma única query (batch)
      const squadIds = squadsList.map(s => s.id);
      const allMembers = squadIds.length > 0
        ? await ctx.db
            .select({
              squadId: squadMembers.squadId,
              id: squadMembers.id,
              role: squadMembers.role,
              talent: {
                fullName: talentProfiles.fullName,
                course: talentProfiles.course,
                avatar: talentProfiles.avatar,
              }
            })
            .from(squadMembers)
            .innerJoin(talentProfiles, eq(squadMembers.talentId, talentProfiles.id))
            .where(inArray(squadMembers.squadId, squadIds))
        : [];

      const membersBySquad = allMembers.reduce((acc, m) => {
        if (!acc[m.squadId]) acc[m.squadId] = [];
        acc[m.squadId].push({ id: m.id, role: m.role, talent: m.talent });
        return acc;
      }, {} as Record<number, Array<{ id: number; role: string | null; talent: { fullName: string | null; course: string | null; avatar: string | null } }>>);

      const squadsWithMembers = squadsList.map(squad => ({
        ...squad,
        members: membersBySquad[squad.id] || [],
      }));

      const countResult = await ctx.db
        .select({ count: squads.id })
        .from(squadMembers)
        .innerJoin(squads, eq(squadMembers.squadId, squads.id))
        .where(eq(squadMembers.talentId, talent.id));

      return {
        squads: squadsWithMembers,
        total: countResult[0]?.count || 0
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
