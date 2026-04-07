import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { universityProfiles, talentProfiles, applications, projects, companyProfiles } from "../../drizzle/schema";
import { eq, and, sql, or, ilike } from "drizzle-orm";

/**
 * University Router
 * Real endpoints for University (Portal Acadêmico) dashboard with advanced filters
 */
export const universityRouter = router({
  getPartnershipStatus: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.db || !ctx.user) throw new Error("Unauthorized");
      
      const result = await ctx.db
        .select()
        .from(universityProfiles)
        .where(eq(universityProfiles.userId, ctx.user.id))
        .limit(1);

      if (result.length === 0) return { status: "inactive" };

      return {
        status: result[0].isActive ? "active" : "inactive",
        partnerSince: result[0].partnershipStartDate?.toISOString() || result[0].createdAt.toISOString(),
        universityName: result[0].universityName,
        acronym: result[0].acronym,
      };
    }),
    
  getStudentsInProjects: protectedProcedure
    .input(z.object({ 
      limit: z.number().default(20), 
      offset: z.number().default(0),
      search: z.string().optional(),
      semester: z.number().optional(),
    }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) return { students: [], total: 0 };

      const uniResult = await ctx.db
        .select({ id: universityProfiles.id })
        .from(universityProfiles)
        .where(eq(universityProfiles.userId, ctx.user.id))
        .limit(1);
      
      const uni = uniResult[0];
      if (!uni) return { students: [], total: 0 };

      // Construir filtros
      const conditions = [
        eq(talentProfiles.universityId, uni.id),
        eq(applications.status, "accepted"),
      ];

      if (input.search) {
        conditions.push(or(
          ilike(talentProfiles.fullName, `%${input.search}%`),
          ilike(talentProfiles.ra, `%${input.search}%`)
        ) as any);
      }

      if (input.semester) {
        conditions.push(eq(talentProfiles.semester, input.semester));
      }

      const result = await ctx.db
        .select({
          id: talentProfiles.id,
          name: talentProfiles.fullName,
          ra: talentProfiles.ra,
          course: talentProfiles.course,
          semester: talentProfiles.semester,
          project: projects.title,
          company: companyProfiles.companyName,
          status: applications.status,
          hours: sql<string>`(${projects.duration} * 4) || 'h'`,
        })
        .from(talentProfiles)
        .innerJoin(applications, eq(applications.talentId, talentProfiles.id))
        .innerJoin(projects, eq(applications.projectId, projects.id))
        .innerJoin(companyProfiles, eq(projects.companyId, companyProfiles.id))
        .where(and(...conditions))
        .limit(input.limit)
        .offset(input.offset);

      return {
        students: result,
        total: result.length,
      };
    }),

  getImpactReport: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.db || !ctx.user) return { totalHours: 0, totalProjects: 0, totalStudents: 0, conversionRate: 0 };

      const uniResult = await ctx.db
        .select({ id: universityProfiles.id })
        .from(universityProfiles)
        .where(eq(universityProfiles.userId, ctx.user.id))
        .limit(1);
      
      const uni = uniResult[0];
      if (!uni) return { totalHours: 0, totalProjects: 0, totalStudents: 0, conversionRate: 0 };

      // 1. Total de alunos da universidade cadastrados (potencial)
      const totalStudentsUni = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(talentProfiles)
        .where(eq(talentProfiles.universityId, uni.id));

      // 2. Alunos engajados (com projetos aprovados)
      const engagedResult = await ctx.db
        .select({ count: sql<number>`count(distinct ${talentProfiles.id})` })
        .from(talentProfiles)
        .innerJoin(applications, and(eq(applications.talentId, talentProfiles.id), eq(applications.status, "accepted")))
        .where(eq(talentProfiles.universityId, uni.id));

      const engagedCount = Number(engagedResult[0]?.count || 0);
      const totalCount = Number(totalStudentsUni[0]?.count || 1); // evita divisão por zero
      const conversionRate = Math.round((engagedCount / totalCount) * 100);

      // 3. Total de projetos ativos
      const projectCount = await ctx.db
        .select({ count: sql<number>`count(distinct ${projects.id})` })
        .from(projects)
        .innerJoin(applications, and(eq(applications.projectId, projects.id), eq(applications.status, "accepted")))
        .innerJoin(talentProfiles, eq(applications.talentId, talentProfiles.id))
        .where(eq(talentProfiles.universityId, uni.id));

      // 4. Soma das horas
      const hoursSum = await ctx.db
        .select({ total: sql<number>`sum(${projects.duration} * 4)` })
        .from(projects)
        .innerJoin(applications, and(eq(applications.projectId, projects.id), eq(applications.status, "accepted")))
        .innerJoin(talentProfiles, eq(applications.talentId, talentProfiles.id))
        .where(eq(talentProfiles.universityId, uni.id));

      return {
        totalHours: Number(hoursSum[0]?.total || 0),
        totalProjects: Number(projectCount[0]?.count || 0),
        totalStudents: engagedCount,
        conversionRate,
        skillsDeveloped: ["ESG", "ODS", "Impacto Social", "Empregabilidade"],
      };
    }),
});
