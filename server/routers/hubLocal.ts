import { z } from "zod"
import { router, publicProcedure } from "../_core/trpc"
import { hubLocals, hubMetrics, campuses, talentProfiles } from "../../drizzle/schema"
import { eq, sql } from "drizzle-orm"

/**
 * HubLocal Router — endpoints para o Dashboard HUB Local (embaixador/líder).
 * Expõe resumo do HUB, campi, métricas e base de talentos.
 */
export const hubLocalRouter = router({
  /**
   * Lista todos os HUBs (até 50).
   */
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return []
    return ctx.db.select().from(hubLocals).limit(50)
  }),

  /**
   * Retorna série histórica de métricas de um HUB específico.
   */
  getMetrics: publicProcedure
    .input(z.object({ hubLocalId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) return []
      return ctx.db
        .select()
        .from(hubMetrics)
        .where(eq(hubMetrics.hubLocalId, input.hubLocalId))
        .orderBy(hubMetrics.createdAt)
    }),

  /**
   * Retorna campi cadastrados em um HUB.
   */
  getCampuses: publicProcedure
    .input(z.object({ hubLocalId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) return []
      return ctx.db
        .select()
        .from(campuses)
        .where(eq(campuses.hubLocalId, input.hubLocalId))
        .limit(20)
    }),

  /**
   * Resumo completo do HUB para o dashboard.
   * Retorna o primeiro HUB se hubLocalId não for fornecido (preview mode).
   */
  getDashboardSummary: publicProcedure
    .input(z.object({ hubLocalId: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) return null

      let hub
      if (input.hubLocalId) {
        const rows = await ctx.db
          .select()
          .from(hubLocals)
          .where(eq(hubLocals.id, input.hubLocalId))
          .limit(1)
        hub = rows[0]
      } else {
        const rows = await ctx.db.select().from(hubLocals).limit(1)
        hub = rows[0]
      }

      if (!hub) return null

      const [campusCount, talentoCount] = await Promise.all([
        ctx.db
          .select({ count: sql<number>`count(*)` })
          .from(campuses)
          .where(eq(campuses.hubLocalId, hub.id)),
        ctx.db.select({ count: sql<number>`count(*)` }).from(talentProfiles),
      ])

      return {
        hub,
        totalCampus: Number(campusCount[0]?.count ?? 0),
        totalTalentos: Number(talentoCount[0]?.count ?? 0),
        squadsAtivos: 0,
        leadsAbertos: 0,
      }
    }),
})
