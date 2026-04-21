import { z } from "zod";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { events } from "../../drizzle/schema";
import { eq, desc, and, gte } from "drizzle-orm";

/**
 * Public Event Router
 * Exposes content for visitors and users
 */
const hubEnum = z.enum(["Global", "São Paulo (Estado)", "Rio de Janeiro (Estado)", "Campinas (Região)"]).default("Global");

/**
 * Public & Admin Event Router
 * Exposes content for visitors and provides CMS capabilities for admins
 */
export const eventRouter = router({
  /**
   * Get upcoming events (Public)
   */
  getUpcoming: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(events)
        .where(and(
          eq(events.status, "upcoming"),
          gte(events.eventDate, new Date())
        ))
        .orderBy(desc(events.eventDate))
        .limit(input.limit);
    }),

  /**
   * Get a single event by slug (Public)
   */
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(events)
        .where(eq(events.slug, input.slug))
        .limit(1);

      return result[0] || null;
    }),

  /**
   * Get latest events for listing (Public)
   */
  getLatest: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(events)
        .orderBy(desc(events.eventDate))
        .limit(input.limit);
    }),

  // ── Admin Procedures ────────────────────────────────────────────────

  /**
   * Get all events (Admin)
   */
  getAll: adminProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(events).orderBy(desc(events.eventDate)).limit(input.limit);
    }),

  /**
   * Create a new event (Admin)
   */
  create: adminProcedure
    .input(z.object({ 
      title: z.string().min(3), 
      slug: z.string().min(3), 
      subtitle: z.string().optional(), 
      description: z.string().min(10), 
      coverImage: z.string().optional(), 
      eventDate: z.date(), 
      eventTime: z.string().optional(), 
      location: z.string().optional(), 
      isOnline: z.boolean().default(false), 
      registrationLink: z.string().optional(), 
      maxParticipants: z.number().optional(),
      hub: hubEnum,
      territoryNodeId: z.number().optional().nullable(),
      status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).default("upcoming"),
      isFeatured: z.boolean().default(false)
    }))
    .mutation(async ({ ctx, input }) => {
      const [evt] = await ctx.db.insert(events).values({ ...input, createdBy: ctx.user.id }).returning({ id: events.id });
      return { success: true, eventId: evt.id };
    }),

  /**
   * Update an existing event (Admin)
   */
  update: adminProcedure
    .input(z.object({ 
      id: z.number(), 
      title: z.string().optional(), 
      slug: z.string().optional(),
      subtitle: z.string().optional(), 
      description: z.string().optional(), 
      coverImage: z.string().optional(), 
      eventDate: z.date().optional(), 
      eventTime: z.string().optional(), 
      location: z.string().optional(), 
      isOnline: z.boolean().optional(), 
      registrationLink: z.string().optional(), 
      maxParticipants: z.number().optional(), 
      hub: hubEnum.optional(),
      territoryNodeId: z.number().optional().nullable(),
      status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]).optional(),
      isFeatured: z.boolean().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await ctx.db.update(events).set({ ...data, updatedAt: new Date() }).where(eq(events.id, id));
      return { success: true };
    }),

  /**
   * Delete an event (Admin)
   */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(events).where(eq(events.id, input.id));
      return { success: true };
    }),
});
