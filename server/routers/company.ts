import { z } from "zod";
import { protectedProcedure, adminProcedure, router } from "../_core/trpc";
import { projects, applications, companyProfiles, talentProfiles, squads, squadMembers } from "../../drizzle/schema";
import { eq, and, desc, inArray, count } from "drizzle-orm";

/**
 * Company Router
 * Handles project management and company-specific operations
 */
export const companyRouter = router({
  /**
   * Get all companies (Admin)
   */
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0), search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.select().from(companyProfiles).orderBy(desc(companyProfiles.createdAt)).limit(input.limit).offset(input.offset);
      const enriched = await Promise.all(rows.map(async (c) => {
        const [projectCountResult] = await ctx.db.select({ value: count() }).from(projects).where(eq(projects.companyId, c.id));
        return { ...c, projectCount: projectCountResult?.value || 0 };
      }));
      return { companies: enriched, total: rows.length };
    }),

  /**
   * Create a new project
   */
  createProject: protectedProcedure
    .input(
      z.object({
        title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
        description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres"),
        category: z.enum(["esg", "direitos_humanos", "ods", "comunicacao", "marketing", "website", "ui_ux", "design_thinking"]),
        duration: z.number().min(1, "Duração deve ser pelo menos 1 dia"),
        teamSize: z.number().min(1, "Equipe deve ter pelo menos 1 membro"),
        requiredSkills: z.array(z.string()).min(1, "Selecione pelo menos uma habilidade"),
        budget: z.number().min(0, "Orçamento não pode ser negativo"),
        deliverables: z.string().optional(),
        coverImage: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can create projects");
      }

      // Get company profile to associate with project
      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0) {
        throw new Error("Company profile not found");
      }

      await ctx.db.insert(projects).values({
        companyId: companyProfile[0].id,
        title: input.title,
        description: input.description,
        category: input.category,
        duration: input.duration,
        teamSize: input.teamSize,
        requiredSkills: input.requiredSkills,
        budget: input.budget,
        deliverables: input.deliverables || null,
        status: "draft",
      });

      // Get the created project ID
      const createdProject = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.companyId, companyProfile[0].id))
        .orderBy(desc(projects.createdAt))
        .limit(1);

      return {
        success: true,
        projectId: createdProject[0]?.id || 0,
        message: "Projeto criado com sucesso!",
      };
    }),

  /**
   * Get all projects for the current company
   */
  getMyProjects: protectedProcedure
    .input(
      z.object({
        status: z.enum(["draft", "open", "in_progress", "completed", "cancelled"]).optional(),
        category: z.enum(["esg", "direitos_humanos", "ods", "comunicacao", "marketing", "website", "ui_ux", "design_thinking"]).optional(),
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can view their projects");
      }

      // Get company profile
      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0) {
        return { projects: [], total: 0 };
      }

      const conditions = [eq(projects.companyId, companyProfile[0].id)];

      if (input.status) {
        conditions.push(eq(projects.status, input.status));
      }

      if (input.category) {
        conditions.push(eq(projects.category, input.category));
      }

      const projectsList = await ctx.db
        .select()
        .from(projects)
        .where(and(...conditions))
        .orderBy(desc(projects.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // Get total count
      const countResult = await ctx.db
        .select({ count: projects.id })
        .from(projects)
        .where(and(...conditions));

      return {
        projects: projectsList,
        total: countResult.length,
      };
    }),

  /**
   * Get a single project by ID
   */
  getProject: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      const project = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      if (!project || project.length === 0) {
        throw new Error("Project not found");
      }

      // If user is a company, verify they own this project
      if (ctx.user.userType === "empresa") {
        const companyProfile = await ctx.db
          .select()
          .from(companyProfiles)
          .where(eq(companyProfiles.userId, ctx.user.id))
          .limit(1);

        if (!companyProfile || companyProfile.length === 0 || companyProfile[0].id !== project[0].companyId) {
          throw new Error("You don't have permission to view this project");
        }
      }

      return project[0];
    }),

  /**
   * Get applications for a specific project
   */
  getProjectApplications: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        status: z.enum(["pending", "accepted", "rejected"]).optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can view applications");
      }

      // Verify that the project belongs to this company
      const project = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      if (!project || project.length === 0) {
        throw new Error("Project not found");
      }

      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0 || companyProfile[0].id !== project[0].companyId) {
        throw new Error("You don't have permission to view this project's applications");
      }

      // Get applications with talent details
      const conditions = [eq(applications.projectId, input.projectId)];

      if (input.status) {
        conditions.push(eq(applications.status, input.status));
      }

      const appsList = await ctx.db
        .select({
          id: applications.id,
          projectId: applications.projectId,
          talentId: applications.talentId,
          coverLetter: applications.coverLetter,
          status: applications.status,
          appliedAt: applications.appliedAt,
          reviewedAt: applications.reviewedAt,
          talent: {
            fullName: talentProfiles.fullName,
            course: talentProfiles.course,
            skills: talentProfiles.skills,
            avatar: talentProfiles.avatar,
            linkedin: talentProfiles.linkedin,
          },
        })
        .from(applications)
        .leftJoin(talentProfiles, eq(applications.talentId, talentProfiles.userId))
        .where(and(...conditions))
        .orderBy(desc(applications.appliedAt))
        .limit(input.limit)
        .offset(input.offset);

      // Get total count
      const countResult = await ctx.db
        .select({ count: applications.id })
        .from(applications)
        .where(and(...conditions));

      return {
        applications: appsList,
        total: countResult.length,
      };
    }),

  /**
   * Get squads for a company's projects
   */
  getMySquads: protectedProcedure
    .input(
      z.object({
        projectId: z.number().optional(),
        status: z.enum(["forming", "active", "completed"]).optional(),
        limit: z.number().min(1).max(100).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can view squads");
      }

      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0) {
        return { squads: [], total: 0 };
      }

      // If projectId is provided, verify it belongs to the company
      if (input.projectId) {
        const project = await ctx.db
          .select()
          .from(projects)
          .where(and(eq(projects.id, input.projectId), eq(projects.companyId, companyProfile[0].id)))
          .limit(1);

        if (!project || project.length === 0) {
          throw new Error("Project not found or doesn't belong to your company");
        }
      }

      // Get project IDs for the company
      const companyProjects = await ctx.db
        .select({ id: projects.id })
        .from(projects)
        .where(eq(projects.companyId, companyProfile[0].id));

      if (companyProjects.length === 0) {
        return { squads: [], total: 0 };
      }

      const projectIds = companyProjects.map((p) => p.id);
      
      const targetProjectIds = input.projectId ? [input.projectId] : projectIds;

      const conditions = [inArray(squads.projectId, targetProjectIds)];

      if (input.status) {
        conditions.push(eq(squads.status, input.status));
      }

      // Fetch squads with basic project details
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
        .from(squads)
        .innerJoin(projects, eq(squads.projectId, projects.id))
        .where(and(...conditions))
        .orderBy(desc(squads.formedAt))
        .limit(input.limit)
        .offset(input.offset);

      // Now fetch members for these squads
      const squadsWithMembers = await Promise.all(
        squadsList.map(async (squad) => {
          const membersList = await ctx.db!
            .select({
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
            .where(eq(squadMembers.squadId, squad.id));
            
          return { ...squad, members: membersList };
        })
      );

      const countResult = await ctx.db
        .select({ count: squads.id })
        .from(squads)
        .where(and(...conditions));

      return {
        squads: squadsWithMembers,
        total: countResult.length,
      };
    }),

  /**
   * Approve an application
   */
  approveApplication: protectedProcedure
    .input(
      z.object({
        applicationId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can approve applications");
      }

      // Get the application
      const app = await ctx.db
        .select()
        .from(applications)
        .where(eq(applications.id, input.applicationId))
        .limit(1);

      if (!app || app.length === 0) {
        throw new Error("Application not found");
      }

      // Verify company owns the project
      const project = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, app[0].projectId))
        .limit(1);

      if (!project || project.length === 0) {
        throw new Error("Project not found");
      }

      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0 || companyProfile[0].id !== project[0].companyId) {
        throw new Error("You don't have permission to approve this application");
      }

      await ctx.db
        .update(applications)
        .set({ status: "accepted", reviewedAt: new Date() })
        .where(eq(applications.id, input.applicationId));

      return { success: true, message: "Candidatura aprovada com sucesso!" };
    }),

  /**
   * Reject an application
   */
  rejectApplication: protectedProcedure
    .input(
      z.object({
        applicationId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can reject applications");
      }

      // Get the application
      const app = await ctx.db
        .select()
        .from(applications)
        .where(eq(applications.id, input.applicationId))
        .limit(1);

      if (!app || app.length === 0) {
        throw new Error("Application not found");
      }

      // Verify company owns the project
      const project = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, app[0].projectId))
        .limit(1);

      if (!project || project.length === 0) {
        throw new Error("Project not found");
      }

      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0 || companyProfile[0].id !== project[0].companyId) {
        throw new Error("You don't have permission to reject this application");
      }

      await ctx.db
        .update(applications)
        .set({ status: "rejected", reviewedAt: new Date() })
        .where(eq(applications.id, input.applicationId));

      return { success: true, message: "Candidatura rejeitada com sucesso!" };
    }),

  /**
   * Update project status
   */
  updateProjectStatus: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        status: z.enum(["draft", "open", "in_progress", "completed", "cancelled"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can update projects");
      }

      // Get the project
      const project = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      if (!project || project.length === 0) {
        throw new Error("Project not found");
      }

      // Verify company owns the project
      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0 || companyProfile[0].id !== project[0].companyId) {
        throw new Error("You don't have permission to update this project");
      }

      await ctx.db
        .update(projects)
        .set({ status: input.status })
        .where(eq(projects.id, input.projectId));

      return { success: true, message: "Status do projeto atualizado com sucesso!" };
    }),

  /**
   * Delete a project (only if in draft status)
   */
  deleteProject: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.db || !ctx.user) {
        throw new Error("Unauthorized");
      }

      if (ctx.user.userType !== "empresa") {
        throw new Error("Only companies can delete projects");
      }

      // Get the project
      const project = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.projectId))
        .limit(1);

      if (!project || project.length === 0) {
        throw new Error("Project not found");
      }

      if (project[0].status !== "draft") {
        throw new Error("Only draft projects can be deleted");
      }

      // Verify company owns the project
      const companyProfile = await ctx.db
        .select()
        .from(companyProfiles)
        .where(eq(companyProfiles.userId, ctx.user.id))
        .limit(1);

      if (!companyProfile || companyProfile.length === 0 || companyProfile[0].id !== project[0].companyId) {
        throw new Error("You don't have permission to delete this project");
      }

      // Delete associated applications first
      await ctx.db
        .delete(applications)
        .where(eq(applications.projectId, input.projectId));

      // Delete the project
      await ctx.db
        .delete(projects)
        .where(eq(projects.id, input.projectId));

      return { success: true, message: "Projeto deletado com sucesso!" };
    }),
});
