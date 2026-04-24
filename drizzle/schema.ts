import {
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
  foreignKey,
  json,
  serial,
  vector,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Enums ──────────────────────────────────────────────────────────────────────

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const userStatusEnum = pgEnum("user_status", ["active", "pending", "inactive"]);
export const userTypeEnum = pgEnum("user_type", ["empresa", "jovem", "universidade", "prefeitura", "embaixador"]);
export const companySizeEnum = pgEnum("company_size", ["pequena", "media", "grande"]);
export const projectStatusEnum = pgEnum("project_status", ["draft", "open", "in_progress", "completed", "cancelled"]);
export const projectCategoryEnum = pgEnum("project_category", ["esg", "direitos_humanos", "ods", "comunicacao", "marketing", "website", "ui_ux", "design_thinking"]);
export const applicationStatusEnum = pgEnum("application_status", ["pending", "accepted", "rejected"]);
export const squadStatusEnum = pgEnum("squad_status", ["forming", "active", "completed"]);
export const notificationTypeEnum = pgEnum("notification_type", ["info", "success", "warning", "error"]);
export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);
export const eventStatusEnum = pgEnum("event_status", ["upcoming", "ongoing", "completed", "cancelled"]);
export const contactStatusEnum = pgEnum("contact_status", ["pending", "contacted", "converted", "rejected"]);
export const hubStatusEnum = pgEnum("hub_status", ["piloto", "consolidado", "flagship"]);
export const campusStatusEnum = pgEnum("campus_status", ["ativo", "inativo", "onboarding"]);
export const programStatusEnum = pgEnum("program_status", ["informal", "engajada", "negociacao", "ativo"]);
export const studentQuestionStatusEnum = pgEnum("student_question_status", ["pending", "answered", "archived"]);
export const invitationStatusEnum = pgEnum("invitation_status", ["pending", "contacted", "partnered", "rejected"]);
export const partnershipRequestStatusEnum = pgEnum("partnership_request_status", ["pending", "in_review", "approved", "rejected"]);
export const articleTypeEnum = pgEnum("article_type", ["academic", "opinion", "case_study", "whitepaper"]);
export const reportTypeEnum = pgEnum("report_type", ["esg", "impact", "ods", "annual", "sustainability"]);
export const materialTypeEnum = pgEnum("material_type", ["video", "ebook", "infographic", "podcast", "webinar", "toolkit"]);
export const territoryNodeTypeEnum = pgEnum("territory_node_type", ["state_hub", "city_hub", "campus"]);
export const territoryNodeStatusEnum = pgEnum("territory_node_status", ["planning", "active", "expanding", "paused"]);

// ── Tables ─────────────────────────────────────────────────────────────────────

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("open_id", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("login_method", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  userType: userTypeEnum("user_type"),
  status: userStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").defaultNow().notNull(),
});

/**
 * Company profiles.
 */
export const companyProfiles = pgTable("company_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 18 }),
  industry: varchar("industry", { length: 100 }),
  size: companySizeEnum("size"),
  description: text("description"),
  website: varchar("website", { length: 255 }),
  logo: varchar("logo", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Young talent profiles.
 */
export const talentProfiles = pgTable("talent_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 14 }),
  birthDate: timestamp("birth_date"),
  phone: varchar("phone", { length: 20 }),
  universityId: integer("university_id"),
  course: varchar("course", { length: 255 }),
  semester: integer("semester"),
  ra: varchar("ra", { length: 20 }),
  graduationYear: integer("graduation_year"),
  bio: text("bio"),
  skills: json("skills").$type<string[]>(),
  portfolio: varchar("portfolio", { length: 500 }),
  linkedin: varchar("linkedin", { length: 255 }),
  github: varchar("github", { length: 255 }),
  avatar: varchar("avatar", { length: 500 }),
  embedding: vector("embedding", { dimensions: 768 }), // Suzely's brain node (Model: text-embedding-004)
  bioEmbedding: vector("bio_embedding", { dimensions: 768 }),
  skillsEmbedding: vector("skills_embedding", { dimensions: 768 }),
  odsEmbedding: vector("ods_embedding", { dimensions: 768 }),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * University profiles.
 */
export const universityProfiles = pgTable("university_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  universityName: varchar("university_name", { length: 255 }).notNull(),
  acronym: varchar("acronym", { length: 20 }),
  cnpj: varchar("cnpj", { length: 18 }),
  state: varchar("state", { length: 2 }),
  city: varchar("city", { length: 100 }),
  contactPerson: varchar("contact_person", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 320 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  logo: varchar("logo", { length: 500 }),
  partnershipStartDate: timestamp("partnership_start_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Territory nodes powering the public map and admin CRUD.
 */
export const territoryNodes = pgTable(
  "territory_nodes",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    nodeType: territoryNodeTypeEnum("node_type").notNull(),
    status: territoryNodeStatusEnum("status").default("planning").notNull(),
    stateCode: varchar("state_code", { length: 2 }),
    cityName: varchar("city_name", { length: 120 }),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    shortDescription: text("short_description"),
    longDescription: text("long_description"),
    badge: varchar("badge", { length: 120 }),
    heroImage: varchar("hero_image", { length: 500 }),
    colorToken: varchar("color_token", { length: 32 }).default("leaf").notNull(),
    metrics: json("metrics").$type<
      { label: string; value: string; note?: string }[]
    >(),
    cta_links: json("cta_links").$type<
      { label: string; href: string; variant?: "primary" | "secondary" | "ghost" }[]
    >(),
    legacyHubLabel: varchar("legacy_hub_label", { length: 120 }),
    parentNodeId: integer("parent_node_id"),
    universityProfileId: integer("university_profile_id").references(
      () => universityProfiles.id,
      { onDelete: "set null" }
    ),
    isPublished: boolean("is_published").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  table => ({
    parentNodeFk: foreignKey({
      columns: [table.parentNodeId],
      foreignColumns: [table.id],
      name: "territory_nodes_parent_node_id_fk",
    }).onDelete("set null"),
  })
);

/**
 * Projects (Squad Boxes) created by companies.
 */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: projectCategoryEnum("category").notNull(),
  duration: integer("duration").notNull(), // in days
  teamSize: integer("team_size").notNull(),
  requiredSkills: json("required_skills").$type<string[]>(),
  embedding: vector("embedding", { dimensions: 768 }), // Suzely's context node (Model: text-embedding-004)
  briefEmbedding: vector("brief_embedding", { dimensions: 768 }),
  skillsEmbedding: vector("skills_embedding", { dimensions: 768 }),
  odsEmbedding: vector("ods_embedding", { dimensions: 768 }),
  hubLocalId: integer("hub_local_id"),
  odsAlignment: json("ods_alignment").$type<number[]>(),
  budget: integer("budget"), // in cents
  status: projectStatusEnum("status").default("draft").notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  deliverables: text("deliverables"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Applications from talents to projects.
 */
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  talentId: integer("talent_id").notNull(),
  coverLetter: text("cover_letter"),
  status: applicationStatusEnum("status").default("pending").notNull(),
  odsFitScore: integer("ods_fit_score"),
  odsFitExplanation: text("ods_fit_explanation"),
  matchAudit: json("match_audit").$type<{
    pipelineVersion: string;
    modelVersion: string;
    stage: string;
    score: number;
    confidence: "high" | "medium" | "low";
    reasoning: string;
    subscores: {
      skills: number;
      ods: number;
      context: number;
      availability: number;
      territory: number;
    };
    evidenceQuotesFromTalent: string[];
    evidenceQuotesFromProject: string[];
    fairnessAudit?: {
      eligible: boolean;
      reasons: string[];
      version: string;
    };
  }>(),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: integer("reviewed_by"),
});

export const matchDecisions = pgTable("match_decisions", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  talentId: integer("talent_id").notNull(),
  applicationId: integer("application_id"),
  stage: varchar("stage", { length: 32 }).notNull(),
  pipelineVersion: varchar("pipeline_version", { length: 32 }).notNull(),
  modelVersion: varchar("model_version", { length: 64 }).notNull(),
  score: integer("score").notNull(),
  confidence: varchar("confidence", { length: 16 }).notNull(),
  reasoning: text("reasoning").notNull(),
  subscores: json("subscores").$type<{
    skills: number;
    ods: number;
    context: number;
    availability: number;
    territory: number;
  }>().notNull(),
  evidenceQuotesFromTalent: json("evidence_quotes_from_talent").$type<string[]>().notNull(),
  evidenceQuotesFromProject: json("evidence_quotes_from_project").$type<string[]>().notNull(),
  fairnessAudit: json("fairness_audit").$type<{
    eligible: boolean;
    reasons: string[];
    version: string;
  }>(),
  allocationStatus: varchar("allocation_status", { length: 24 }),
  allocationRank: integer("allocation_rank"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Squads - formed teams for projects.
 */
export const squads = pgTable("squads", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  status: squadStatusEnum("status").default("forming").notNull(),
  formedAt: timestamp("formed_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

/**
 * Squad members - many-to-many between squads and talents.
 */
export const squadMembers = pgTable("squad_members", {
  id: serial("id").primaryKey(),
  squadId: integer("squad_id").notNull(),
  talentId: integer("talent_id").notNull(),
  role: varchar("role", { length: 100 }),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  leftAt: timestamp("left_at"),
});

/**
 * Project evaluations.
 */
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  talentId: integer("talent_id").notNull(),
  companyId: integer("company_id").notNull(),
  rating: integer("rating").notNull(),
  feedback: text("feedback"),
  skills: json("skills").$type<{skill: string, rating: number}[]>(),
  wouldHireAgain: boolean("would_hire_again"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Blog posts.
 */
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: json("tags").$type<string[]>(),
  hub: varchar("hub", { length: 50 }),
  territoryNodeId: integer("territory_node_id").references(
    () => territoryNodes.id,
    { onDelete: "set null" }
  ),
  status: postStatusEnum("status").default("draft").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Events.
 */
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  createdBy: integer("created_by").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  subtitle: varchar("subtitle", { length: 500 }),
  description: text("description").notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  eventDate: timestamp("event_date").notNull(),
  eventTime: varchar("event_time", { length: 20 }),
  location: varchar("location", { length: 255 }),
  isOnline: boolean("is_online").default(false),
  registrationLink: varchar("registration_link", { length: 500 }),
  maxParticipants: integer("max_participants"),
  hub: varchar("hub", { length: 50 }),
  territoryNodeId: integer("territory_node_id").references(
    () => territoryNodes.id,
    { onDelete: "set null" }
  ),
  status: eventStatusEnum("status").default("upcoming").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Contact Requests.
 */
export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  cnpj: varchar("cnpj", { length: 18 }),
  industry: varchar("industry", { length: 100 }),
  companySize: companySizeEnum("company_size"),
  projectType: varchar("project_type", { length: 100 }),
  budget: varchar("budget", { length: 50 }),
  timeline: varchar("timeline", { length: 50 }),
  message: text("message"),
  status: contactStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Student Questions.
 */
export const studentQuestions = pgTable("student_questions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  university: varchar("university", { length: 255 }),
  course: varchar("course", { length: 255 }),
  question: text("question").notNull(),
  status: studentQuestionStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  answeredAt: timestamp("answered_at"),
});

/**
 * University Invitations.
 */
export const universityInvitations = pgTable("university_invitations", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  studentEmail: varchar("student_email", { length: 320 }).notNull(),
  universityName: varchar("university_name", { length: 255 }).notNull(),
  state: varchar("state", { length: 2 }),
  city: varchar("city", { length: 100 }),
  course: varchar("course", { length: 255 }),
  contactName: varchar("contact_name", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 320 }),
  message: text("message"),
  status: invitationStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * University Partnership Requests.
 */
export const universityPartnershipRequests = pgTable("university_partnership_requests", {
  id: serial("id").primaryKey(),
  universityName: varchar("university_name", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 18 }),
  state: varchar("state", { length: 2 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  website: varchar("website", { length: 255 }),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  contactRole: varchar("contact_role", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 320 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 20 }),
  studentsCount: varchar("students_count", { length: 50 }),
  coursesOffered: text("courses_offered"),
  message: text("message"),
  status: partnershipRequestStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Articles (Lattes-style academic/opinion pieces).
 */
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  abstract: text("abstract"),
  content: text("content").notNull(),
  articleType: articleTypeEnum("article_type").default("academic").notNull(),
  keywords: json("keywords").$type<string[]>(),
  institution: varchar("institution", { length: 255 }),
  coAuthors: json("co_authors").$type<string[]>(),
  doi: varchar("doi", { length: 255 }),
  externalLink: varchar("external_link", { length: 500 }),
  coverImage: varchar("cover_image", { length: 500 }),
  hub: varchar("hub", { length: 50 }),
  territoryNodeId: integer("territory_node_id").references(
    () => territoryNodes.id,
    { onDelete: "set null" }
  ),
  status: postStatusEnum("status").default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Reports (ESG, ODS, Impact, Annual).
 */
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  summary: text("summary"),
  content: text("content"),
  reportType: reportTypeEnum("report_type").default("esg").notNull(),
  year: integer("year"),
  period: varchar("period", { length: 50 }),
  fileUrl: varchar("file_url", { length: 500 }),
  coverImage: varchar("cover_image", { length: 500 }),
  tags: json("tags").$type<string[]>(),
  hub: varchar("hub", { length: 50 }),
  territoryNodeId: integer("territory_node_id").references(
    () => territoryNodes.id,
    { onDelete: "set null" }
  ),
  status: postStatusEnum("status").default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Support Materials (YouTube videos, eBooks, toolkits, etc.).
 */
export const supportMaterials = pgTable("support_materials", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  description: text("description"),
  materialType: materialTypeEnum("material_type").default("video").notNull(),
  externalUrl: varchar("external_url", { length: 500 }),
  fileUrl: varchar("file_url", { length: 500 }),
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  duration: varchar("duration", { length: 20 }),
  tags: json("tags").$type<string[]>(),
  hub: varchar("hub", { length: 50 }),
  territoryNodeId: integer("territory_node_id").references(
    () => territoryNodes.id,
    { onDelete: "set null" }
  ),
  status: postStatusEnum("status").default("draft").notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Notifications.
 */
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: notificationTypeEnum("type").default("info").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  link: varchar("link", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Sprint 0: Tabelas novas ────────────────────────────────────────────────────

export const hubLocals = pgTable("hub_locals", {
  id: serial("id").primaryKey(),
  cityName: varchar("city_name", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  status: hubStatusEnum("status").default("piloto"),
  embaixadorUserId: integer("embaixador_user_id"),
  prefeituraPartnerId: integer("prefeitura_partner_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const campuses = pgTable("campuses", {
  id: serial("id").primaryKey(),
  hubLocalId: integer("hub_local_id").notNull(),
  universityProfileId: integer("university_profile_id").notNull(),
  liderName: varchar("lider_name", { length: 255 }),
  liderEmail: varchar("lider_email", { length: 320 }),
  status: campusStatusEnum("status").default("onboarding"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const prefeituraProfiles = pgTable("prefeitura_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  cityName: varchar("city_name", { length: 100 }).notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  secretaria: varchar("secretaria", { length: 255 }),
  contactPerson: varchar("contact_person", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 320 }),
  contactPhone: varchar("contact_phone", { length: 20 }),
  programStatus: programStatusEnum("program_status").default("informal"),
  contractType: varchar("contract_type", { length: 100 }),
  contractValue: integer("contract_value"),
  odsTargets: json("ods_targets").$type<number[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const hubMetrics = pgTable("hub_metrics", {
  id: serial("id").primaryKey(),
  hubLocalId: integer("hub_local_id").notNull(),
  period: varchar("period", { length: 20 }).notNull(),
  talentosEngajados: integer("talentos_engajados").default(0),
  squadsEntregues: integer("squads_entregues").default(0),
  empresasParceiras: integer("empresas_parceiras").default(0),
  eventosRealizados: integer("eventos_realizados").default(0),
  horasExtensao: integer("horas_extensao").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Relations ──────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one }) => ({
  companyProfile: one(companyProfiles, {
    fields: [users.id],
    references: [companyProfiles.userId],
  }),
  talentProfile: one(talentProfiles, {
    fields: [users.id],
    references: [talentProfiles.userId],
  }),
  universityProfile: one(universityProfiles, {
    fields: [users.id],
    references: [universityProfiles.userId],
  }),
}));

export const territoryNodesRelations = relations(territoryNodes, ({ one, many }) => ({
  parent: one(territoryNodes, {
    fields: [territoryNodes.parentNodeId],
    references: [territoryNodes.id],
    relationName: "territory_node_tree",
  }),
  children: many(territoryNodes, {
    relationName: "territory_node_tree",
  }),
  universityProfile: one(universityProfiles, {
    fields: [territoryNodes.universityProfileId],
    references: [universityProfiles.id],
  }),
  blogPosts: many(blogPosts),
  events: many(events),
  articles: many(articles),
  reports: many(reports),
  supportMaterials: many(supportMaterials),
}));

export const universityProfilesRelations = relations(
  universityProfiles,
  ({ many }) => ({
    territoryNodes: many(territoryNodes),
  })
);

export const projectsRelations = relations(projects, ({ one, many }) => ({
  company: one(companyProfiles, {
    fields: [projects.companyId],
    references: [companyProfiles.id],
  }),
  applications: many(applications),
  squad: one(squads, {
    fields: [projects.id],
    references: [squads.projectId],
  }),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  project: one(projects, {
    fields: [applications.projectId],
    references: [projects.id],
  }),
  talent: one(talentProfiles, {
    fields: [applications.talentId],
    references: [talentProfiles.id],
  }),
}));

export const matchDecisionsRelations = relations(matchDecisions, ({ one }) => ({
  project: one(projects, {
    fields: [matchDecisions.projectId],
    references: [projects.id],
  }),
  talent: one(talentProfiles, {
    fields: [matchDecisions.talentId],
    references: [talentProfiles.id],
  }),
  application: one(applications, {
    fields: [matchDecisions.applicationId],
    references: [applications.id],
  }),
}));

export const squadsRelations = relations(squads, ({ one, many }) => ({
  project: one(projects, {
    fields: [squads.projectId],
    references: [projects.id],
  }),
  members: many(squadMembers),
}));

export const squadMembersRelations = relations(squadMembers, ({ one }) => ({
  squad: one(squads, {
    fields: [squadMembers.squadId],
    references: [squads.id],
  }),
  talent: one(talentProfiles, {
    fields: [squadMembers.talentId],
    references: [talentProfiles.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  territoryNode: one(territoryNodes, {
    fields: [blogPosts.territoryNodeId],
    references: [territoryNodes.id],
  }),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  territoryNode: one(territoryNodes, {
    fields: [events.territoryNodeId],
    references: [territoryNodes.id],
  }),
}));

export const hubLocalsRelations = relations(hubLocals, ({ many }) => ({
  campuses: many(campuses),
  metrics: many(hubMetrics),
}));

export const campusesRelations = relations(campuses, ({ one }) => ({
  hubLocal: one(hubLocals, {
    fields: [campuses.hubLocalId],
    references: [hubLocals.id],
  }),
  universityProfile: one(universityProfiles, {
    fields: [campuses.universityProfileId],
    references: [universityProfiles.id],
  }),
}));

export const prefeituraProfilesRelations = relations(prefeituraProfiles, ({ one }) => ({
  user: one(users, {
    fields: [prefeituraProfiles.userId],
    references: [users.id],
  }),
}));

export const hubMetricsRelations = relations(hubMetrics, ({ one }) => ({
  hubLocal: one(hubLocals, {
    fields: [hubMetrics.hubLocalId],
    references: [hubLocals.id],
  }),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
  territoryNode: one(territoryNodes, {
    fields: [articles.territoryNodeId],
    references: [territoryNodes.id],
  }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  territoryNode: one(territoryNodes, {
    fields: [reports.territoryNodeId],
    references: [territoryNodes.id],
  }),
}));

export const supportMaterialsRelations = relations(
  supportMaterials,
  ({ one }) => ({
    territoryNode: one(territoryNodes, {
      fields: [supportMaterials.territoryNodeId],
      references: [territoryNodes.id],
    }),
  })
);

// ── Type Exports ───────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CompanyProfile = typeof companyProfiles.$inferSelect;
export type InsertCompanyProfile = typeof companyProfiles.$inferInsert;
export type TalentProfile = typeof talentProfiles.$inferSelect;
export type InsertTalentProfile = typeof talentProfiles.$inferInsert;
export type UniversityProfile = typeof universityProfiles.$inferSelect;
export type InsertUniversityProfile = typeof universityProfiles.$inferInsert;
export type TerritoryNode = typeof territoryNodes.$inferSelect;
export type InsertTerritoryNode = typeof territoryNodes.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;
export type MatchDecision = typeof matchDecisions.$inferSelect;
export type InsertMatchDecision = typeof matchDecisions.$inferInsert;
export type Squad = typeof squads.$inferSelect;
export type InsertSquad = typeof squads.$inferInsert;
export type SquadMember = typeof squadMembers.$inferSelect;
export type InsertSquadMember = typeof squadMembers.$inferInsert;
export type Evaluation = typeof evaluations.$inferSelect;
export type InsertEvaluation = typeof evaluations.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;
export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = typeof contactRequests.$inferInsert;
export type StudentQuestion = typeof studentQuestions.$inferSelect;
export type InsertStudentQuestion = typeof studentQuestions.$inferInsert;
export type UniversityInvitation = typeof universityInvitations.$inferSelect;
export type InsertUniversityInvitation = typeof universityInvitations.$inferInsert;
export type UniversityPartnershipRequest = typeof universityPartnershipRequests.$inferSelect;
export type InsertUniversityPartnershipRequest = typeof universityPartnershipRequests.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
export type SupportMaterial = typeof supportMaterials.$inferSelect;
export type InsertSupportMaterial = typeof supportMaterials.$inferInsert;
