import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { supportMaterials } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

const hubEnum = z.enum(["Global", "São Paulo (Estado)", "Rio de Janeiro (Estado)", "Campinas (Região)"]).default("Global");

export const materialRouter = router({
  // Public Procedures
  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(12) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(supportMaterials)
        .where(eq(supportMaterials.status, "published"))
        .orderBy(desc(supportMaterials.publishedAt))
        .limit(input.limit);
    }),

  // Admin Procedures
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(supportMaterials).orderBy(desc(supportMaterials.createdAt)).limit(input.limit);
    }),

  create: adminProcedure
    .input(z.object({ 
      title: z.string().min(3), 
      slug: z.string().min(3), 
      description: z.string().optional(), 
      materialType: z.enum(["video", "ebook", "infographic", "podcast", "webinar", "toolkit"]).default("video"), 
      externalUrl: z.string().optional(), 
      fileUrl: z.string().optional(), 
      thumbnailUrl: z.string().optional(), 
      duration: z.string().optional(), 
      hub: hubEnum,
      status: z.enum(["draft", "published"]).default("draft") 
    }))
    .mutation(async ({ ctx, input }) => {
      const [mat] = await ctx.db.insert(supportMaterials).values({ ...input, authorId: ctx.user.id, publishedAt: input.status === "published" ? new Date() : null }).returning({ id: supportMaterials.id });
      return { success: true, materialId: mat.id };
    }),

  update: adminProcedure
    .input(z.object({ 
      id: z.number(), 
      title: z.string().optional(), 
      slug: z.string().optional(),
      description: z.string().optional(),
      materialType: z.enum(["video", "ebook", "infographic", "podcast", "webinar", "toolkit"]).optional(),
      externalUrl: z.string().optional(),
      fileUrl: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      duration: z.string().optional(),
      hub: hubEnum.optional(),
      status: z.enum(["draft", "published"]).optional() 
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const updateData: any = { ...data, updatedAt: new Date() };
      if (data.status === "published") updateData.publishedAt = new Date();
      await ctx.db.update(supportMaterials).set(updateData).where(eq(supportMaterials.id, id));
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(supportMaterials).where(eq(supportMaterials.id, input.id));
      return { success: true };
    }),
});
