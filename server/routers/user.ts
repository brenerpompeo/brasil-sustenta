import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { users, companyProfiles, talentProfiles, universityProfiles } from "../../drizzle/schema";
import { eq, desc, and, or, ilike } from "drizzle-orm";

/**
 * Admin User Management Router
 */
export const userRouter = router({
  /**
   * Get all users with enriched profile data (Admin)
   */
  getAll: adminProcedure
    .input(z.object({ 
      limit: z.number().default(50), 
      offset: z.number().default(0),
      search: z.string().optional(),
      userType: z.enum(["todos", "jovem", "empresa", "universidade"]).default("todos")
    }))
    .query(async ({ ctx, input }) => {
      const conditions = [];
      
      if (input.userType && input.userType !== "todos") {
        conditions.push(eq(users.userType, input.userType as any));
      }
      
      if (input.search) {
        conditions.push(
          or(
            ilike(users.name, `%${input.search}%`),
            ilike(users.email, `%${input.search}%`)
          )
        );
      }

      const rows = await ctx.db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          userType: users.userType,
          status: users.status,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(conditions.length ? and(...conditions) : undefined)
        .orderBy(desc(users.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // Enriquecer com dados de perfil se necessário (opcional para listagem)
      // Para a listagem básica, os dados do 'users' já são suficientes
      return { users: rows, total: rows.length };
    }),

  /**
   * Update user status (Admin)
   */
  updateStatus: adminProcedure
    .input(z.object({ 
      userId: z.number(), 
      status: z.enum(["active", "pending", "inactive"]) 
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({ status: input.status })
        .where(eq(users.id, input.userId));
      
      return { success: true };
    }),

  /**
   * Delete user (Admin)
   */
  delete: adminProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Nota: Em um sistema real, deletar um usuário exige cascade ou limpeza manual de perfis
      // Por enquanto, deletamos o usuário (assumindo cascade no schema ou limpeza simples)
      await ctx.db.delete(users).where(eq(users.id, input.userId));
      return { success: true };
    }),
});
