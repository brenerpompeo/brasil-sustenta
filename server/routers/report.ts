import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { reports } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

const hubEnum = z.enum(["Global", "São Paulo (Estado)", "Rio de Janeiro (Estado)", "Campinas (Região)"]).default("Global");

export const reportRouter = router({
  // Public Procedures
  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(reports)
        .where(eq(reports.status, "published"))
        .orderBy(desc(reports.publishedAt))
        .limit(input.limit);
    }),

  // Admin Procedures
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(reports).orderBy(desc(reports.createdAt)).limit(input.limit);
    }),

  create: adminProcedure
    .input(z.object({ 
      title: z.string().min(3), 
      slug: z.string().min(3), 
      summary: z.string().optional(), 
      content: z.string().optional(), 
      reportType: z.enum(["esg", "impact", "ods", "annual", "sustainability"]).default("esg"), 
      year: z.number().optional(), 
      period: z.string().optional(), 
      fileUrl: z.string().optional(), 
      coverImage: z.string().optional(), 
      hub: hubEnum,
      status: z.enum(["draft", "published"]).default("draft") 
    }))
    .mutation(async ({ ctx, input }) => {
      const [rpt] = await ctx.db.insert(reports).values({ ...input, authorId: ctx.user.id, publishedAt: input.status === "published" ? new Date() : null }).returning({ id: reports.id });
      return { success: true, reportId: rpt.id };
    }),

  update: adminProcedure
    .input(z.object({ 
      id: z.number(), 
      title: z.string().optional(), 
      slug: z.string().optional(),
      summary: z.string().optional(),
      content: z.string().optional(),
      reportType: z.enum(["esg", "impact", "ods", "annual", "sustainability"]).optional(),
      year: z.number().optional(),
      period: z.string().optional(),
      fileUrl: z.string().optional(),
      coverImage: z.string().optional(),
      hub: hubEnum.optional(),
      status: z.enum(["draft", "published"]).optional() 
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const updateData: any = { ...data, updatedAt: new Date() };
      if (data.status === "published") updateData.publishedAt = new Date();
      await ctx.db.update(reports).set(updateData).where(eq(reports.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(reports).where(eq(reports.id, input.id));
      return { success: true };
    }),
});
