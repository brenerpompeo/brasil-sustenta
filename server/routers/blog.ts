import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { blogPosts, users } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

const hubEnum = z.enum(["Global", "São Paulo (Estado)", "Rio de Janeiro (Estado)", "Campinas (Região)"]).default("Global");

/**
 * Public & Admin Blog Router
 */
export const blogRouter = router({
  /**
   * Get latest published posts (Public)
   */
  getLatest: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10),
        category: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(blogPosts.status, "published")];
      if (input.category && input.category !== "Todos") {
        conditions.push(eq(blogPosts.category, input.category));
      }

      return await ctx.db
        .select({
          id: blogPosts.id,
          title: blogPosts.title,
          slug: blogPosts.slug,
          excerpt: blogPosts.excerpt,
          coverImage: blogPosts.coverImage,
          category: blogPosts.category,
          publishedAt: blogPosts.publishedAt,
          authorName: users.name,
        })
        .from(blogPosts)
        .leftJoin(users, eq(blogPosts.authorId, users.id))
        .where(and(...conditions))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(input.limit);
    }),

  /**
   * Get a single post by slug (Public)
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db
        .select({
          id: blogPosts.id,
          title: blogPosts.title,
          slug: blogPosts.slug,
          excerpt: blogPosts.excerpt,
          content: blogPosts.content,
          coverImage: blogPosts.coverImage,
          category: blogPosts.category,
          publishedAt: blogPosts.publishedAt,
          authorName: users.name,
        })
        .from(blogPosts)
        .leftJoin(users, eq(blogPosts.authorId, users.id))
        .where(and(eq(blogPosts.slug, input.slug), eq(blogPosts.status, "published")))
        .limit(1);

      return post[0] || null;
    }),

  // ── Admin Procedures ────────────────────────────────────────────────

  /**
   * Get all posts (Admin)
   */
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select({ 
          id: blogPosts.id, 
          title: blogPosts.title, 
          slug: blogPosts.slug, 
          excerpt: blogPosts.excerpt, 
          category: blogPosts.category, 
          status: blogPosts.status, 
          isFeatured: blogPosts.isFeatured,
          publishedAt: blogPosts.publishedAt, 
          createdAt: blogPosts.createdAt,
          authorName: users.name,
        })
        .from(blogPosts)
        .leftJoin(users, eq(blogPosts.authorId, users.id))
        .orderBy(desc(blogPosts.createdAt))
        .limit(input.limit);
    }),

  /**
   * Create a new post (Admin)
   */
  create: adminProcedure
    .input(z.object({ 
      title: z.string().min(3), 
      slug: z.string().min(3), 
      excerpt: z.string().optional(), 
      content: z.string().min(10), 
      coverImage: z.string().optional(), 
      category: z.string().optional(), 
      tags: z.array(z.string()).optional(), 
      hub: hubEnum,
      status: z.enum(["draft", "published"]).default("draft"),
      isFeatured: z.boolean().default(false)
    }))
    .mutation(async ({ ctx, input }) => {
      const [post] = await ctx.db.insert(blogPosts).values({ 
        ...input, 
        authorId: ctx.user.id,
        publishedAt: input.status === "published" ? new Date() : null 
      }).returning({ id: blogPosts.id });
      return { success: true, postId: post.id };
    }),

  /**
   * Update a post (Admin)
   */
  update: adminProcedure
    .input(z.object({ 
      id: z.number(), 
      title: z.string().optional(), 
      slug: z.string().optional(),
      excerpt: z.string().optional(), 
      content: z.string().optional(), 
      coverImage: z.string().optional(), 
      category: z.string().optional(), 
      tags: z.array(z.string()).optional(), 
      hub: hubEnum.optional(),
      status: z.enum(["draft", "published"]).optional(),
      isFeatured: z.boolean().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const updateData: any = { ...data, updatedAt: new Date() };
      if (data.status === "published") updateData.publishedAt = new Date();
      await ctx.db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id));
      return { success: true };
    }),

  /**
   * Delete a post (Admin)
   */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(blogPosts).where(eq(blogPosts.id, input.id));
      return { success: true };
    }),
});
