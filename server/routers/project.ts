import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { projects, companyProfiles, applications } from "../../drizzle/schema";
import { eq, and, desc, ilike, or, count } from "drizzle-orm";

/**
 * Public & Admin Project Router
 */
export const projectRouter = router({
  /**
   * Get all projects (Admin)
   */
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0), status: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const conditions = [];
      if (input.status && input.status !== "todos") conditions.push(eq(projects.status, input.status as any));
      
      const rows = await ctx.db.select().from(projects).where(conditions.length ? and(...conditions) : undefined).orderBy(desc(projects.createdAt)).limit(input.limit).offset(input.offset);
      
      const enriched = await Promise.all(rows.map(async (p) => {
        const [company] = await ctx.db.select({ name: companyProfiles.companyName }).from(companyProfiles).where(eq(companyProfiles.id, p.companyId)).limit(1);
        const [appCountResult] = await ctx.db.select({ value: count() }).from(applications).where(eq(applications.projectId, p.id));
        return { ...p, companyName: company?.name || "Desconhecida", applicantCount: appCountResult?.value || 0 };
      }));
      
      return { projects: enriched, total: rows.length };
    }),

  /**
   * Approve a project (Admin)
   */
  approve: adminProcedure
    .input(z.object({ projectId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(projects).set({ status: "open" }).where(eq(projects.id, input.projectId));
      return { success: true };
    }),

  /**
   * Get all public 'open' projects
   */
  getAllPublic: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const conditions = [eq(projects.status, "open")];

      if (input.category && input.category !== "Todas") {
        // Enums mapping check: esg, direitos_humanos, ods, etc.
        // We handle mapping or direct match
        const catMap: Record<string, string> = {
          "Tecnologia": "website",
          "Meio Ambiente": "esg",
          "Social": "direitos_humanos",
          "Governança": "ods",
          "Educação": "marketing" // Placeholder mapping
        };
        const mappedCat = catMap[input.category] || input.category.toLowerCase();
        conditions.push(eq(projects.category, mappedCat as any));
      }

      if (input.search) {
        conditions.push(
          or(
            ilike(projects.title, `%${input.search}%`),
            ilike(projects.description, `%${input.search}%`)
          ) as any
        );
      }

      const projectsList = await db
        .select()
        .from(projects)
        .where(and(...conditions))
        .orderBy(desc(projects.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return projectsList;
    }),

  /**
   * Get project stats for landing pages
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, active: 0 };
    
    // Quick count
    const all = await db.select().from(projects);
    return {
      total: all.length,
      active: all.filter(p => p.status === 'open').length,
      impact: 15 // Placeholder for real impact metrics
    };
  }),
});
