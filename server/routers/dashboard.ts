import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { users, companyProfiles, talentProfiles, projects, universityProfiles, squads, blogPosts, events, articles, reports, supportMaterials } from "../../drizzle/schema";
import { count, eq, desc, sum, sql, and, gte } from "drizzle-orm";

/**
 * Dashboard Router
 * Handles admin-level statistics and summaries
 */
export const dashboardRouter = router({
  /**
   * Get main platform statistics
   */
  getStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [universityCount] = await db.select({ value: count() }).from(universityProfiles).where(eq(universityProfiles.isActive, true));
    const [talentCount] = await db.select({ value: count() }).from(talentProfiles);
    const [companyCount] = await db.select({ value: count() }).from(companyProfiles);
    const [squadCount] = await db.select({ value: count() }).from(squads).where(eq(squads.status, "active"));
    const [completedProjects] = await db.select({ value: count() }).from(projects).where(eq(projects.status, "completed"));
    const [totalBudget] = await db.select({ value: sum(projects.budget) }).from(projects).where(eq(projects.status, "completed"));
    
    // Hub Activity (weighted combination of content created in last 30 days)
    const hubActivity = await db.execute(sql`
      SELECT hub, COUNT(*) as activity_count 
      FROM (
        SELECT hub FROM blog_posts WHERE created_at >= ${thirtyDaysAgo} AND hub IS NOT NULL
        UNION ALL
        SELECT hub FROM events WHERE created_at >= ${thirtyDaysAgo} AND hub IS NOT NULL
        UNION ALL
        SELECT hub FROM articles WHERE created_at >= ${thirtyDaysAgo} AND hub IS NOT NULL
        UNION ALL
        SELECT hub FROM reports WHERE created_at >= ${thirtyDaysAgo} AND hub IS NOT NULL
        UNION ALL
        SELECT hub FROM support_materials WHERE created_at >= ${thirtyDaysAgo} AND hub IS NOT NULL
      ) combined
      GROUP BY hub
      ORDER BY activity_count DESC
      LIMIT 1
    `);

    return {
      universities: Number(universityCount?.value || 0),
      talents: Number(talentCount?.value || 0),
      companies: Number(companyCount?.value || 0),
      activeHub: (hubActivity[0] as any)?.hub || "Global",
      squads: Number(squadCount?.value || 0),
      completedProjects: Number(completedProjects?.value || 0),
      totalValue: Number(totalBudget?.value || 0) / 100, // Budget is in cents
    };
  }),

  /**
   * Get recent activity for the dashboard
   */
  getRecentActivity: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const recentProjects = await db
      .select({
        id: projects.id,
        title: projects.title,
        status: projects.status,
        createdAt: projects.createdAt,
        companyId: projects.companyId,
      })
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(5);

    return {
      projects: recentProjects,
    };
  }),
});
