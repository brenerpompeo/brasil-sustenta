import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { articles } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

const hubEnum = z.enum(["Global", "São Paulo (Estado)", "Rio de Janeiro (Estado)", "Campinas (Região)"]).default("Global");

export const articleRouter = router({
  // Public Procedures
  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(articles)
        .where(eq(articles.status, "published"))
        .orderBy(desc(articles.publishedAt))
        .limit(input.limit);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.select().from(articles).where(eq(articles.slug, input.slug)).limit(1);
      return res[0] || null;
    }),

  // Admin Procedures
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(articles).orderBy(desc(articles.createdAt)).limit(input.limit);
    }),

  create: adminProcedure
    .input(z.object({ 
      title: z.string().min(3), 
      slug: z.string().min(3), 
      abstract: z.string().optional(), 
      content: z.string().min(10), 
      articleType: z.enum(["academic", "opinion", "case_study", "whitepaper"]).default("academic"), 
      keywords: z.array(z.string()).optional(), 
      institution: z.string().optional(), 
      coAuthors: z.array(z.string()).optional(), 
      doi: z.string().optional(), 
      externalLink: z.string().optional(), 
      coverImage: z.string().optional(), 
      hub: hubEnum,
      territoryNodeId: z.number().optional().nullable(),
      status: z.enum(["draft", "published"]).default("draft") 
    }))
    .mutation(async ({ ctx, input }) => {
      const [art] = await ctx.db.insert(articles).values({ 
        ...input, 
        authorId: ctx.user.id, 
        publishedAt: input.status === "published" ? new Date() : null 
      }).returning({ id: articles.id });
      return { success: true, articleId: art.id };
    }),

  update: adminProcedure
    .input(z.object({ 
      id: z.number(), 
      title: z.string().optional(), 
      slug: z.string().optional(), 
      abstract: z.string().optional(), 
      content: z.string().optional(), 
      articleType: z.enum(["academic", "opinion", "case_study", "whitepaper"]).optional(), 
      keywords: z.array(z.string()).optional(),
      institution: z.string().optional(),
      coAuthors: z.array(z.string()).optional(),
      doi: z.string().optional(),
      externalLink: z.string().optional(),
      coverImage: z.string().optional(),
      hub: hubEnum.optional(),
      territoryNodeId: z.number().optional().nullable(),
      status: z.enum(["draft", "published"]).optional() 
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const updateData: any = { ...data, updatedAt: new Date() };
      if (data.status === "published") updateData.publishedAt = new Date();
      await ctx.db.update(articles).set(updateData).where(eq(articles.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(articles).where(eq(articles.id, input.id));
      return { success: true };
    }),
});
