import { TRPCError } from "@trpc/server";
import { asc, desc, eq, inArray, or } from "drizzle-orm";
import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../_core/trpc";
import {
  articles,
  blogPosts,
  events,
  reports,
  supportMaterials,
  territoryNodes,
  universityProfiles,
} from "../../drizzle/schema";
import {
  legacyTerritorySeeds,
  mapNodeStatuses,
  mapNodeTypes,
  type LegacyTerritorySeed,
  type MapNodeDetail,
  type MapNodeFeatureProps,
  type MapPointFeature,
  type MapPointFeatureCollection,
  type TerritoryCtaLink,
  type TerritoryMetric,
} from "@shared/territory";

const territoryNodeInput = z.object({
  slug: z.string().min(3),
  name: z.string().min(2),
  nodeType: z.enum(mapNodeTypes),
  status: z.enum(mapNodeStatuses),
  stateCode: z.string().trim().length(2).optional().nullable(),
  cityName: z.string().trim().min(2).optional().nullable(),
  latitude: z.number().min(-34).max(6),
  longitude: z.number().min(-74).max(-28),
  shortDescription: z.string().optional().nullable(),
  longDescription: z.string().optional().nullable(),
  badge: z.string().optional().nullable(),
  heroImage: z.string().optional().nullable(),
  colorToken: z
    .enum(["leaf", "sun", "atlantic", "clay", "ink"])
    .default("leaf"),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        note: z.string().optional(),
      })
    )
    .default([]),
  ctaLinks: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().min(1),
        variant: z.enum(["primary", "secondary", "ghost"]).optional(),
      })
    )
    .default([]),
  legacyHubLabel: z.string().optional().nullable(),
  parentNodeId: z.number().optional().nullable(),
  universityProfileId: z.number().optional().nullable(),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  linkedContent: z
    .object({
      blogPostIds: z.array(z.number()).default([]),
      eventIds: z.array(z.number()).default([]),
      articleIds: z.array(z.number()).default([]),
      reportIds: z.array(z.number()).default([]),
      materialIds: z.array(z.number()).default([]),
    })
    .default({
      blogPostIds: [],
      eventIds: [],
      articleIds: [],
      reportIds: [],
      materialIds: [],
    }),
});

type LinkedContentInput = z.infer<typeof territoryNodeInput>["linkedContent"];
type BlogRelatedRow = {
  id: number;
  title: string;
  slug: string;
  category: string | null;
};
type EventRelatedRow = {
  id: number;
  title: string;
  slug: string;
  eventDate: Date | null;
};
type ArticleRelatedRow = {
  id: number;
  title: string;
  slug: string;
  articleType: string | null;
};
type ReportRelatedRow = {
  id: number;
  title: string;
  slug: string;
  year: number | null;
};
type MaterialRelatedRow = {
  id: number;
  title: string;
  slug: string;
  materialType: string | null;
};

function featureFromNode(node: typeof territoryNodes.$inferSelect): MapPointFeature {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [node.longitude, node.latitude],
    },
    properties: {
      id: node.id,
      slug: node.slug,
      name: node.name,
      nodeType: node.nodeType,
      status: node.status,
      badge: node.badge,
      stateCode: node.stateCode,
      cityName: node.cityName,
      shortDescription: node.shortDescription,
      colorToken: (node.colorToken as MapNodeFeatureProps["colorToken"]) ?? "leaf",
      isPublished: node.isPublished,
      sortOrder: node.sortOrder,
    },
  };
}

function featureFromSeed(seed: LegacyTerritorySeed): MapPointFeature {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [seed.longitude, seed.latitude],
    },
    properties: {
      id: null,
      slug: seed.slug,
      name: seed.name,
      nodeType: seed.nodeType,
      status: seed.status,
      badge: seed.badge,
      stateCode: seed.stateCode,
      cityName: seed.cityName,
      shortDescription: seed.shortDescription,
      colorToken: seed.colorToken,
      isPublished: seed.isPublished ?? true,
      sortOrder: seed.sortOrder,
    },
  };
}

function seedReference(seed: LegacyTerritorySeed) {
  return {
    id: null,
    slug: seed.slug,
    name: seed.name,
    nodeType: seed.nodeType,
    stateCode: seed.stateCode,
    cityName: seed.cityName,
    status: seed.status,
  } as const;
}

async function getPublishedNodes(ctx: { db: any }) {
  return ctx.db
    .select()
    .from(territoryNodes)
    .where(eq(territoryNodes.isPublished, true))
    .orderBy(asc(territoryNodes.sortOrder), asc(territoryNodes.name));
}

async function getAllNodes(ctx: { db: any }) {
  return ctx.db
    .select()
    .from(territoryNodes)
    .orderBy(asc(territoryNodes.sortOrder), asc(territoryNodes.name));
}

async function getRelatedContent(
  ctx: any,
  nodeId: number | null,
  legacyHubLabel?: string | null
) {
  const blogWhere = nodeId
    ? legacyHubLabel
      ? or(
          eq(blogPosts.territoryNodeId, nodeId),
          eq(blogPosts.hub, legacyHubLabel)
        )
      : eq(blogPosts.territoryNodeId, nodeId)
    : legacyHubLabel
      ? eq(blogPosts.hub, legacyHubLabel)
      : undefined;
  const eventWhere = nodeId
    ? legacyHubLabel
      ? or(eq(events.territoryNodeId, nodeId), eq(events.hub, legacyHubLabel))
      : eq(events.territoryNodeId, nodeId)
    : legacyHubLabel
      ? eq(events.hub, legacyHubLabel)
      : undefined;
  const articleWhere = nodeId
    ? legacyHubLabel
      ? or(
          eq(articles.territoryNodeId, nodeId),
          eq(articles.hub, legacyHubLabel)
        )
      : eq(articles.territoryNodeId, nodeId)
    : legacyHubLabel
      ? eq(articles.hub, legacyHubLabel)
      : undefined;
  const reportWhere = nodeId
    ? legacyHubLabel
      ? or(eq(reports.territoryNodeId, nodeId), eq(reports.hub, legacyHubLabel))
      : eq(reports.territoryNodeId, nodeId)
    : legacyHubLabel
      ? eq(reports.hub, legacyHubLabel)
      : undefined;
  const materialWhere = nodeId
    ? legacyHubLabel
      ? or(
          eq(supportMaterials.territoryNodeId, nodeId),
          eq(supportMaterials.hub, legacyHubLabel)
        )
      : eq(supportMaterials.territoryNodeId, nodeId)
    : legacyHubLabel
      ? eq(supportMaterials.hub, legacyHubLabel)
      : undefined;

  const [blog, eventItems, articleItems, reportItems, materialItems]: [
    BlogRelatedRow[],
    EventRelatedRow[],
    ArticleRelatedRow[],
    ReportRelatedRow[],
    MaterialRelatedRow[],
  ] = await Promise.all([
      blogWhere
        ? ctx.db
            .select({
              id: blogPosts.id,
              title: blogPosts.title,
              slug: blogPosts.slug,
              category: blogPosts.category,
            })
            .from(blogPosts)
            .where(blogWhere)
            .orderBy(desc(blogPosts.updatedAt))
        : Promise.resolve([] as BlogRelatedRow[]),
      eventWhere
        ? ctx.db
            .select({
              id: events.id,
              title: events.title,
              slug: events.slug,
              eventDate: events.eventDate,
            })
            .from(events)
            .where(eventWhere)
            .orderBy(desc(events.eventDate))
        : Promise.resolve([] as EventRelatedRow[]),
      articleWhere
        ? ctx.db
            .select({
              id: articles.id,
              title: articles.title,
              slug: articles.slug,
              articleType: articles.articleType,
            })
            .from(articles)
            .where(articleWhere)
            .orderBy(desc(articles.updatedAt))
        : Promise.resolve([] as ArticleRelatedRow[]),
      reportWhere
        ? ctx.db
            .select({
              id: reports.id,
              title: reports.title,
              slug: reports.slug,
              year: reports.year,
            })
            .from(reports)
            .where(reportWhere)
            .orderBy(desc(reports.updatedAt))
        : Promise.resolve([] as ReportRelatedRow[]),
      materialWhere
        ? ctx.db
            .select({
              id: supportMaterials.id,
              title: supportMaterials.title,
              slug: supportMaterials.slug,
              materialType: supportMaterials.materialType,
            })
            .from(supportMaterials)
            .where(materialWhere)
            .orderBy(desc(supportMaterials.updatedAt))
        : Promise.resolve([] as MaterialRelatedRow[]),
    ]);

  return [
    {
      kind: "blog" as const,
      label: "Blog e Narrativas",
      items: blog.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        href: "/blog",
        meta: item.category,
      })),
    },
    {
      kind: "event" as const,
      label: "Eventos e Ativações",
      items: eventItems.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        href: "/eventos",
        meta: item.eventDate ? new Date(item.eventDate).toLocaleDateString("pt-BR") : null,
      })),
    },
    {
      kind: "article" as const,
      label: "Artigos e Estudos",
      items: articleItems.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        href: "/artigos",
        meta: item.articleType,
      })),
    },
    {
      kind: "report" as const,
      label: "Relatórios",
      items: reportItems.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        href: "/relatorios",
        meta: item.year ? String(item.year) : null,
      })),
    },
    {
      kind: "material" as const,
      label: "Biblioteca",
      items: materialItems.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        href: "/biblioteca",
        meta: item.materialType,
      })),
    },
  ].filter(group => group.items.length > 0);
}

async function buildSeedDetail(ctx: any, seed: LegacyTerritorySeed): Promise<MapNodeDetail> {
  const parentSeed = seed.parentSlug
    ? legacyTerritorySeeds.find(item => item.slug === seed.parentSlug) ?? null
    : null;
  const childSeeds = legacyTerritorySeeds.filter(item => item.parentSlug === seed.slug);
  const relatedContent = await getRelatedContent(
    ctx,
    null,
    seed.legacyHubLabel ?? null
  );

  return {
    id: null,
    slug: seed.slug,
    name: seed.name,
    nodeType: seed.nodeType,
    status: seed.status,
    badge: seed.badge,
    stateCode: seed.stateCode,
    cityName: seed.cityName,
    coordinates: {
      lat: seed.latitude,
      lng: seed.longitude,
    },
    shortDescription: seed.shortDescription,
    longDescription: seed.longDescription,
    colorToken: seed.colorToken,
    metrics: seed.metrics,
    ctaLinks: seed.ctaLinks,
    parent: parentSeed ? seedReference(parentSeed) : null,
    children: childSeeds.map(seedReference),
    university: null,
    relatedContent,
    legacyHubLabel: seed.legacyHubLabel ?? null,
  };
}

async function validateParentRules(
  ctx: any,
  nodeType: z.infer<typeof territoryNodeInput>["nodeType"],
  parentNodeId?: number | null
) {
  if (nodeType === "state_hub") {
    return null;
  }

  if (!parentNodeId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Este tipo de nó exige um nó pai válido.",
    });
  }

  const parent = await ctx.db
    .select()
    .from(territoryNodes)
    .where(eq(territoryNodes.id, parentNodeId))
    .limit(1);

  const parentNode = parent[0];
  if (!parentNode) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Nó pai não encontrado.",
    });
  }

  if (nodeType === "city_hub" && parentNode.nodeType !== "state_hub") {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Hub de cidade deve apontar para uma matriz estadual.",
    });
  }

  if (
    nodeType === "campus" &&
    !["city_hub", "state_hub"].includes(parentNode.nodeType)
  ) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Campus deve apontar para um HUB de cidade ou matriz estadual.",
    });
  }

  return parentNode;
}

async function syncTableAssignments(
  ctx: any,
  table: any,
  idColumn: any,
  territoryColumn: any,
  nodeId: number,
  ids: number[]
) {
  await ctx.db
    .update(table)
    .set({ territoryNodeId: null, updatedAt: new Date() })
    .where(eq(territoryColumn, nodeId));

  if (!ids.length) return;

  await ctx.db
    .update(table)
    .set({ territoryNodeId: nodeId, updatedAt: new Date() })
    .where(inArray(idColumn, ids));
}

async function syncLinkedContent(ctx: any, nodeId: number, linkedContent: LinkedContentInput) {
  await Promise.all([
    syncTableAssignments(
      ctx,
      blogPosts,
      blogPosts.id,
      blogPosts.territoryNodeId,
      nodeId,
      linkedContent.blogPostIds
    ),
    syncTableAssignments(
      ctx,
      events,
      events.id,
      events.territoryNodeId,
      nodeId,
      linkedContent.eventIds
    ),
    syncTableAssignments(
      ctx,
      articles,
      articles.id,
      articles.territoryNodeId,
      nodeId,
      linkedContent.articleIds
    ),
    syncTableAssignments(
      ctx,
      reports,
      reports.id,
      reports.territoryNodeId,
      nodeId,
      linkedContent.reportIds
    ),
    syncTableAssignments(
      ctx,
      supportMaterials,
      supportMaterials.id,
      supportMaterials.territoryNodeId,
      nodeId,
      linkedContent.materialIds
    ),
  ]);
}

async function seedNodesFromLegacy(ctx: any) {
  const existing = await getAllNodes(ctx);
  if (existing.length > 0) {
    return { created: 0, skipped: existing.length };
  }

  const inserted = new Map<string, number>();
  for (const seed of legacyTerritorySeeds) {
    const [node] = await ctx.db
      .insert(territoryNodes)
      .values({
        slug: seed.slug,
        name: seed.name,
        nodeType: seed.nodeType,
        status: seed.status,
        stateCode: seed.stateCode,
        cityName: seed.cityName,
        latitude: seed.latitude,
        longitude: seed.longitude,
        shortDescription: seed.shortDescription,
        longDescription: seed.longDescription,
        badge: seed.badge,
        colorToken: seed.colorToken,
        metrics: seed.metrics,
        ctaLinks: seed.ctaLinks,
        legacyHubLabel: seed.legacyHubLabel ?? null,
        isPublished: seed.isPublished ?? true,
        sortOrder: seed.sortOrder,
      })
      .returning({ id: territoryNodes.id });

    inserted.set(seed.slug, node.id);
  }

  for (const seed of legacyTerritorySeeds) {
    if (!seed.parentSlug) continue;
    await ctx.db
      .update(territoryNodes)
      .set({
        parentNodeId: inserted.get(seed.parentSlug) ?? null,
        updatedAt: new Date(),
      })
      .where(eq(territoryNodes.slug, seed.slug));
  }

  return { created: legacyTerritorySeeds.length, skipped: 0 };
}

export const territoryRouter = router({
  public: router({
    listMapNodes: publicProcedure.query(async ({ ctx }) => {
      const nodes = await getPublishedNodes(ctx);

      if (!nodes.length) {
        return {
          type: "FeatureCollection",
          features: legacyTerritorySeeds
            .filter(seed => seed.isPublished ?? true)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map(featureFromSeed),
        } satisfies MapPointFeatureCollection;
      }

      return {
        type: "FeatureCollection",
        features: nodes.map(featureFromNode),
      } satisfies MapPointFeatureCollection;
    }),

    getNodeDetail: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ ctx, input }) => {
        const node = await ctx.db
          .select()
          .from(territoryNodes)
          .where(eq(territoryNodes.slug, input.slug))
          .limit(1);

        const currentNode = node[0];
        if (!currentNode) {
          const seed = legacyTerritorySeeds.find(item => item.slug === input.slug);
          if (!seed) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Nó territorial não encontrado.",
            });
          }
          return buildSeedDetail(ctx, seed);
        }

        const [parentRows, childRows, universityRows] = await Promise.all([
          currentNode.parentNodeId
            ? ctx.db
                .select()
                .from(territoryNodes)
                .where(eq(territoryNodes.id, currentNode.parentNodeId))
                .limit(1)
            : Promise.resolve([]),
          ctx.db
            .select()
            .from(territoryNodes)
            .where(eq(territoryNodes.parentNodeId, currentNode.id))
            .orderBy(asc(territoryNodes.sortOrder), asc(territoryNodes.name)),
          currentNode.universityProfileId
            ? ctx.db
                .select()
                .from(universityProfiles)
                .where(eq(universityProfiles.id, currentNode.universityProfileId))
                .limit(1)
            : Promise.resolve([]),
        ]);

        const relatedContent = await getRelatedContent(
          ctx,
          currentNode.id,
          currentNode.legacyHubLabel
        );

        return {
          id: currentNode.id,
          slug: currentNode.slug,
          name: currentNode.name,
          nodeType: currentNode.nodeType,
          status: currentNode.status,
          badge: currentNode.badge,
          stateCode: currentNode.stateCode,
          cityName: currentNode.cityName,
          coordinates: {
            lat: currentNode.latitude,
            lng: currentNode.longitude,
          },
          shortDescription: currentNode.shortDescription,
          longDescription: currentNode.longDescription,
          colorToken: currentNode.colorToken as MapNodeDetail["colorToken"],
          metrics: (currentNode.metrics as TerritoryMetric[] | null) ?? [],
          ctaLinks: (currentNode.ctaLinks as TerritoryCtaLink[] | null) ?? [],
          parent: parentRows[0]
            ? {
                id: parentRows[0].id,
                slug: parentRows[0].slug,
                name: parentRows[0].name,
                nodeType: parentRows[0].nodeType,
                stateCode: parentRows[0].stateCode,
                cityName: parentRows[0].cityName,
                status: parentRows[0].status,
              }
            : null,
          children: childRows.map(child => ({
            id: child.id,
            slug: child.slug,
            name: child.name,
            nodeType: child.nodeType,
            stateCode: child.stateCode,
            cityName: child.cityName,
            status: child.status,
          })),
          university: universityRows[0]
            ? {
                id: universityRows[0].id,
                name: universityRows[0].universityName,
                acronym: universityRows[0].acronym,
                city: universityRows[0].city,
                state: universityRows[0].state,
              }
            : null,
          relatedContent,
          legacyHubLabel: currentNode.legacyHubLabel,
        } satisfies MapNodeDetail;
      }),
  }),

  admin: router({
    list: adminProcedure.query(async ({ ctx }) => {
      return getAllNodes(ctx);
    }),

    getReferences: adminProcedure.query(async ({ ctx }) => {
      const [nodes, universities, blog, eventItems, articleItems, reportItems, materialItems] =
        await Promise.all([
          getAllNodes(ctx),
          ctx.db
            .select({
              id: universityProfiles.id,
              universityName: universityProfiles.universityName,
              acronym: universityProfiles.acronym,
              city: universityProfiles.city,
              state: universityProfiles.state,
            })
            .from(universityProfiles)
            .orderBy(asc(universityProfiles.universityName)),
          ctx.db
            .select({
              id: blogPosts.id,
              title: blogPosts.title,
              slug: blogPosts.slug,
              territoryNodeId: blogPosts.territoryNodeId,
              hub: blogPosts.hub,
            })
            .from(blogPosts)
            .orderBy(desc(blogPosts.updatedAt))
            .limit(200),
          ctx.db
            .select({
              id: events.id,
              title: events.title,
              slug: events.slug,
              territoryNodeId: events.territoryNodeId,
              hub: events.hub,
            })
            .from(events)
            .orderBy(desc(events.updatedAt))
            .limit(200),
          ctx.db
            .select({
              id: articles.id,
              title: articles.title,
              slug: articles.slug,
              territoryNodeId: articles.territoryNodeId,
              hub: articles.hub,
            })
            .from(articles)
            .orderBy(desc(articles.updatedAt))
            .limit(200),
          ctx.db
            .select({
              id: reports.id,
              title: reports.title,
              slug: reports.slug,
              territoryNodeId: reports.territoryNodeId,
              hub: reports.hub,
            })
            .from(reports)
            .orderBy(desc(reports.updatedAt))
            .limit(200),
          ctx.db
            .select({
              id: supportMaterials.id,
              title: supportMaterials.title,
              slug: supportMaterials.slug,
              territoryNodeId: supportMaterials.territoryNodeId,
              hub: supportMaterials.hub,
            })
            .from(supportMaterials)
            .orderBy(desc(supportMaterials.updatedAt))
            .limit(200),
        ]);

      return {
        nodes,
        universities,
        content: {
          blogPosts: blog,
          events: eventItems,
          articles: articleItems,
          reports: reportItems,
          materials: materialItems,
        },
      };
    }),

    create: adminProcedure
      .input(territoryNodeInput)
      .mutation(async ({ ctx, input }) => {
        await validateParentRules(ctx, input.nodeType, input.parentNodeId);

        if (input.nodeType !== "campus" && input.universityProfileId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Somente campus pode vincular universidade diretamente.",
          });
        }

        const [node] = await ctx.db
          .insert(territoryNodes)
          .values({
            slug: input.slug,
            name: input.name,
            nodeType: input.nodeType,
            status: input.status,
            stateCode: input.stateCode?.toUpperCase() ?? null,
            cityName: input.cityName ?? null,
            latitude: input.latitude,
            longitude: input.longitude,
            shortDescription: input.shortDescription ?? null,
            longDescription: input.longDescription ?? null,
            badge: input.badge ?? null,
            heroImage: input.heroImage ?? null,
            colorToken: input.colorToken,
            metrics: input.metrics,
            ctaLinks: input.ctaLinks,
            legacyHubLabel: input.legacyHubLabel ?? null,
            parentNodeId:
              input.nodeType === "state_hub" ? null : input.parentNodeId ?? null,
            universityProfileId:
              input.nodeType === "campus"
                ? input.universityProfileId ?? null
                : null,
            isPublished: input.isPublished,
            sortOrder: input.sortOrder,
          })
          .returning({ id: territoryNodes.id });

        await syncLinkedContent(ctx, node.id, input.linkedContent);

        return { success: true, territoryNodeId: node.id };
      }),

    update: adminProcedure
      .input(territoryNodeInput.extend({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const parent = await validateParentRules(
          ctx,
          input.nodeType,
          input.parentNodeId
        );

        if (parent && parent.id === input.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Um nó não pode apontar para si mesmo.",
          });
        }

        await ctx.db
          .update(territoryNodes)
          .set({
            slug: input.slug,
            name: input.name,
            nodeType: input.nodeType,
            status: input.status,
            stateCode: input.stateCode?.toUpperCase() ?? null,
            cityName: input.cityName ?? null,
            latitude: input.latitude,
            longitude: input.longitude,
            shortDescription: input.shortDescription ?? null,
            longDescription: input.longDescription ?? null,
            badge: input.badge ?? null,
            heroImage: input.heroImage ?? null,
            colorToken: input.colorToken,
            metrics: input.metrics,
            ctaLinks: input.ctaLinks,
            legacyHubLabel: input.legacyHubLabel ?? null,
            parentNodeId:
              input.nodeType === "state_hub" ? null : input.parentNodeId ?? null,
            universityProfileId:
              input.nodeType === "campus"
                ? input.universityProfileId ?? null
                : null,
            isPublished: input.isPublished,
            sortOrder: input.sortOrder,
            updatedAt: new Date(),
          })
          .where(eq(territoryNodes.id, input.id));

        await syncLinkedContent(ctx, input.id, input.linkedContent);

        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await Promise.all([
          ctx.db
            .update(blogPosts)
            .set({ territoryNodeId: null, updatedAt: new Date() })
            .where(eq(blogPosts.territoryNodeId, input.id)),
          ctx.db
            .update(events)
            .set({ territoryNodeId: null, updatedAt: new Date() })
            .where(eq(events.territoryNodeId, input.id)),
          ctx.db
            .update(articles)
            .set({ territoryNodeId: null, updatedAt: new Date() })
            .where(eq(articles.territoryNodeId, input.id)),
          ctx.db
            .update(reports)
            .set({ territoryNodeId: null, updatedAt: new Date() })
            .where(eq(reports.territoryNodeId, input.id)),
          ctx.db
            .update(supportMaterials)
            .set({ territoryNodeId: null, updatedAt: new Date() })
            .where(eq(supportMaterials.territoryNodeId, input.id)),
          ctx.db
            .update(territoryNodes)
            .set({ parentNodeId: null, updatedAt: new Date() })
            .where(eq(territoryNodes.parentNodeId, input.id)),
        ]);

        await ctx.db.delete(territoryNodes).where(eq(territoryNodes.id, input.id));
        return { success: true };
      }),

    reorder: adminProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        await Promise.all(
          input.ids.map((id, index) =>
            ctx.db
              .update(territoryNodes)
              .set({ sortOrder: (index + 1) * 10, updatedAt: new Date() })
              .where(eq(territoryNodes.id, id))
          )
        );
        return { success: true };
      }),

    seedLegacy: adminProcedure.mutation(async ({ ctx }) => {
      return seedNodesFromLegacy(ctx);
    }),
  }),
});
