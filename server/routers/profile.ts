import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { companyProfiles, talentProfiles, universityProfiles } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Profile Router
 * Handles profile management for all user types
 */
export const profileRouter = router({
  /**
   * Get current user's profile
   */
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.db || !ctx.user) {
      return null;
    }

    const userType = ctx.user.userType;

    if (userType === "empresa") {
      const profiles = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);
      return { type: "empresa", profile: profiles[0] || null };
    }

    if (userType === "jovem") {
      const profiles = await ctx.db
        .select()
        .from(talentProfiles)
        .where(eq(talentProfiles.userId, ctx.user.id))
        .limit(1);
      return { type: "jovem", profile: profiles[0] || null };
    }

    if (userType === "universidade") {
      const profiles = await ctx.db
        .select()
        .from(universityProfiles)
        .where(eq(universityProfiles.userId, ctx.user.id))
        .limit(1);
      return { type: "universidade", profile: profiles[0] || null };
    }

    return null;
  }),

  /**
   * Update company profile
   */
  updateCompanyProfile: protectedProcedure
    .input(
      z.object({
        companyName: z.string().optional(),
        cnpj: z.string().optional(),
        industry: z.string().optional(),
        size: z.enum(["pequena", "media", "grande"]).optional(),
        description: z.string().optional(),
        website: z.string().url().optional(),
        logo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can update company profiles");
      }

      await ctx.db
        .update(companyProfiles)
        .set(input)
        .where(eq(companyProfiles.userId, ctx.user.id));

      return { success: true, message: "Perfil atualizado com sucesso!" };
    }),

  /**
   * Update talent profile
   */
  updateTalentProfile: protectedProcedure
    .input(
      z.object({
        fullName: z.string().optional(),
        cpf: z.string().optional(),
        phone: z.string().optional(),
        birthDate: z.string().optional(),
        course: z.string().optional(),
        semester: z.number().min(1).max(12).optional(),
        graduationYear: z.number().min(2024).max(2040).optional(),
        ra: z.string().optional(),
        universityId: z.number().optional(),
        skills: z.array(z.string()).optional(),
        bio: z.string().optional(),
        linkedin: z.string().url().optional().or(z.string().startsWith('http').optional()),
        github: z.string().url().optional().or(z.string().startsWith('http').optional()),
        portfolio: z.string().url().optional().or(z.string().startsWith('http').optional()),
        avatar: z.string().optional(),
        isAvailable: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "jovem") {
        throw new Error("Only talents can update talent profiles");
      }

      const updateData: any = { ...input };
      if (input.birthDate) {
        updateData.birthDate = new Date(input.birthDate);
      }

      await ctx.db
        .update(talentProfiles)
        .set(updateData)
        .where(eq(talentProfiles.userId, ctx.user.id));

      return { success: true, message: "Perfil atualizado com sucesso!" };
    }),

  /**
   * Update university profile
   */
  updateUniversityProfile: protectedProcedure
    .input(
      z.object({
        universityName: z.string().optional(),
        acronym: z.string().optional(),
        cnpj: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        contactPerson: z.string().optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().optional(),
        logo: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "universidade") {
        throw new Error("Only universities can update university profiles");
      }

      await ctx.db
        .update(universityProfiles)
        .set(input)
        .where(eq(universityProfiles.userId, ctx.user.id));

      return { success: true, message: "Perfil atualizado com sucesso!" };
    }),
});
