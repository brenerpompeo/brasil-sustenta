import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { users, companyProfiles, talentProfiles, universityProfiles } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Authentication Router
 * Handles user registration with profile creation for each stakeholder type
 */
export const authRouter = router({
  /**
   * Register Company
   * Creates user + company profile
   */
  registerCompany: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        companyName: z.string().min(1, "Nome da empresa é obrigatório"),
        cnpj: z.string().optional(),
        industry: z.string().optional(),
        size: z.enum(["pequena", "media", "grande"]).optional(),
        description: z.string().optional(),
        website: z.string().url("URL inválida").optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) {
        throw new Error("Database not available");
      }

      // Check if user already exists
      const existingUsers = await ctx.db.select().from(users).where(eq(users.email, input.email!)).limit(1);

      if (existingUsers.length > 0) {
        throw new Error("Email já cadastrado");
      }

      // Create user with empresa type
      const [user] = await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        userType: "empresa",
        openId: `temp_${Date.now()}`, // Will be replaced by OAuth
        loginMethod: "email",
      });

      // Create company profile
      await ctx.db.insert(companyProfiles).values({
        userId: (user as any).insertId,
        companyName: input.companyName,
        cnpj: input.cnpj,
        industry: input.industry,
        size: input.size,
        description: input.description,
        website: input.website,
      });

      return {
        success: true,
        userId: (user as any).insertId,
        message: "Empresa cadastrada com sucesso!",
      };
    }),

  /**
   * Register Young Talent
   * Creates user + talent profile
   */
  registerTalent: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        fullName: z.string().min(1, "Nome completo é obrigatório"),
        cpf: z.string().optional(),
        phone: z.string().optional(),
        birthDate: z.string().optional(),
        course: z.string().min(1, "Curso é obrigatório"),
        semester: z.number().min(1).max(12).optional(),
        university: z.string().optional(),
        skills: z.array(z.string()).optional(),
        bio: z.string().optional(),
        linkedin: z.string().url("URL inválida").optional(),
        github: z.string().url("URL inválida").optional(),
        portfolio: z.string().url("URL inválida").optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) {
        throw new Error("Database not available");
      }

      // Check if user already exists
      const existingUsers = await ctx.db.select().from(users).where(eq(users.email, input.email!)).limit(1);

      if (existingUsers.length > 0) {
        throw new Error("Email já cadastrado");
      }

      // Create user with jovem type
      const [user] = await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        userType: "jovem",
        openId: `temp_${Date.now()}`,
        loginMethod: "email",
      });

      // Create talent profile
      await ctx.db.insert(talentProfiles).values({
        userId: (user as any).insertId,
        fullName: input.fullName,
        cpf: input.cpf,
        phone: input.phone,
        birthDate: input.birthDate ? new Date(input.birthDate) : undefined,
        course: input.course,
        semester: input.semester,
        skills: input.skills || undefined,
        bio: input.bio,
        linkedin: input.linkedin,
        github: input.github,
        portfolio: input.portfolio,
      });

      return {
        success: true,
        userId: (user as any).insertId,
        message: "Cadastro realizado com sucesso!",
      };
    }),

  /**
   * Register University
   * Creates user + university profile
   */
  registerUniversity: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        universityName: z.string().min(1, "Nome da universidade é obrigatório"),
        acronym: z.string().optional(),
        type: z.enum(["publica", "privada"]).optional(),
        state: z.string().min(1, "Estado é obrigatório"),
        city: z.string().min(1, "Cidade é obrigatória"),
        description: z.string().optional(),
        website: z.string().url("URL inválida").optional(),
        contactPerson: z.string().optional(),
        contactPhone: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db) {
        throw new Error("Database not available");
      }

      // Check if user already exists
      const existingUsers = await ctx.db.select().from(users).where(eq(users.email, input.email!)).limit(1);

      if (existingUsers.length > 0) {
        throw new Error("Email já cadastrado");
      }

      // Create user with universidade type
      const [user] = await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        userType: "universidade",
        openId: `temp_${Date.now()}`,
        loginMethod: "email",
      });

      // Create university profile
      await ctx.db.insert(universityProfiles).values({
        userId: (user as any).insertId,
        universityName: input.universityName,
        acronym: input.acronym,
        state: input.state,
        city: input.city,
        contactPerson: input.contactPerson,
        contactPhone: input.contactPhone,
      });

      return {
        success: true,
        userId: (user as any).insertId,
        message: "Universidade cadastrada com sucesso!",
      };
    }),

  /**
   * Get current user profile
   * Returns user + extended profile based on userType
   */
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user || !ctx.db) {
      return null;
    }

    const userList = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
    const user = userList[0];

    if (!user) {
      return null;
    }

    let profile = null;

    // Fetch extended profile based on userType
    if (user.userType === "empresa") {
      const profiles = await ctx.db.select().from(companyProfiles).where(eq(companyProfiles.userId, user.id)).limit(1);
      profile = profiles[0] || null;
    } else if (user.userType === "jovem") {
      const profiles = await ctx.db.select().from(talentProfiles).where(eq(talentProfiles.userId, user.id)).limit(1);
      profile = profiles[0] || null;
    } else if (user.userType === "universidade") {
      const profiles = await ctx.db.select().from(universityProfiles).where(eq(universityProfiles.userId, user.id)).limit(1);
      profile = profiles[0] || null;
    }

    return {
      ...user,
      profile,
    };
  }),
});
