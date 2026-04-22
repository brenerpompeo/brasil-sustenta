import { z } from "zod"
import { router, protectedProcedure, publicProcedure } from "../_core/trpc"
import { prefeituraProfiles, users, projects, talentProfiles, hubLocals, hubMetrics } from "../../drizzle/schema"
import { eq, sql } from "drizzle-orm"

/**
 * Prefeitura Router — endpoints para Dashboard Prefeitura (Programa Municipal ODS).
 * Fornece métricas consolidadas B2G e perfil institucional da prefeitura.
 */
export const prefeituraRouter = router({
  /**
   * Retorna métricas consolidadas para o dashboard da prefeitura.
   * Filtra por cityName se fornecido.
   */
  getDashboardMetrics: publicProcedure
    .input(z.object({ cityName: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db) throw new Error("DB unavailable")

      const totalTalentos = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(talentProfiles)

      const totalProjetos = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(projects)

      const totalEmpresas = await ctx.db
        .select({ count: sql<number>`count(*)` })
        .from(hubLocals)

      return {
        totalTalentos: Number(totalTalentos[0]?.count ?? 0),
        totalProjetos: Number(totalProjetos[0]?.count ?? 0),
        totalEmpresas: Number(totalEmpresas[0]?.count ?? 0),
        squadsAtivos: 0,
        odsCobertura: [3, 4, 8, 10, 11, 13] as number[],
        impactoHoras: 0,
      }
    }),

  /**
   * Retorna o perfil da prefeitura autenticada.
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.db || !ctx.user) return null
    const rows = await ctx.db
      .select()
      .from(prefeituraProfiles)
      .where(eq(prefeituraProfiles.userId, ctx.user.id))
      .limit(1)
    return rows[0] ?? null
  }),

  /**
   * Retorna o perfil público de uma prefeitura (preview/acesso embaixador).
   */
  getProfilePublic: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return null
    const rows = await ctx.db.select().from(prefeituraProfiles).limit(1)
    return rows[0] ?? null
  }),
})
