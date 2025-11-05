import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extended with userType for multi-stakeholder authentication
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  userType: mysqlEnum("userType", ["empresa", "jovem", "universidade"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/**
 * Company profiles - extends user data for companies
 */
export const companyProfiles = mysqlTable("company_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 18 }),
  industry: varchar("industry", { length: 100 }),
  size: mysqlEnum("size", ["pequena", "media", "grande"]),
  description: text("description"),
  website: varchar("website", { length: 255 }),
  logo: varchar("logo", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Young talent profiles - extends user data for students/young professionals
 */
export const talentProfiles = mysqlTable("talent_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 14 }),
  birthDate: timestamp("birthDate"),
  phone: varchar("phone", { length: 20 }),
  universityId: int("universityId"),
  course: varchar("course", { length: 255 }),
  semester: int("semester"),
  graduationYear: int("graduationYear"),
  bio: text("bio"),
  skills: json("skills").$type<string[]>(),
  portfolio: varchar("portfolio", { length: 500 }),
  linkedin: varchar("linkedin", { length: 255 }),
  github: varchar("github", { length: 255 }),
  avatar: varchar("avatar", { length: 500 }),
  isAvailable: boolean("isAvailable").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * University profiles - extends user data for universities
 */
export const universityProfiles = mysqlTable("university_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  universityName: varchar("universityName", { length: 255 }).notNull(),
  acronym: varchar("acronym", { length: 20 }),
  cnpj: varchar("cnpj", { length: 18 }),
  state: varchar("state", { length: 2 }),
  city: varchar("city", { length: 100 }),
  contactPerson: varchar("contactPerson", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 20 }),
  logo: varchar("logo", { length: 500 }),
  partnershipStartDate: timestamp("partnershipStartDate"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Projects (Squad Boxes) created by companies
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: mysqlEnum("category", ["esg", "direitos_humanos", "ods", "comunicacao", "marketing", "website", "ui_ux", "design_thinking"]).notNull(),
  duration: int("duration").notNull(), // in days
  teamSize: int("teamSize").notNull(),
  requiredSkills: json("requiredSkills").$type<string[]>(),
  budget: int("budget"), // in cents
  status: mysqlEnum("status", ["draft", "open", "in_progress", "completed", "cancelled"]).default("draft").notNull(),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  deliverables: text("deliverables"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Applications from talents to projects
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  talentId: int("talentId").notNull(),
  coverLetter: text("coverLetter"),
  status: mysqlEnum("status", ["pending", "accepted", "rejected"]).default("pending").notNull(),
  appliedAt: timestamp("appliedAt").defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: int("reviewedBy"), // admin user id
});

/**
 * Squads - formed teams for projects
 */
export const squads = mysqlTable("squads", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["forming", "active", "completed"]).default("forming").notNull(),
  formedAt: timestamp("formedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

/**
 * Squad members - many-to-many relationship between squads and talents
 */
export const squadMembers = mysqlTable("squad_members", {
  id: int("id").autoincrement().primaryKey(),
  squadId: int("squadId").notNull(),
  talentId: int("talentId").notNull(),
  role: varchar("role", { length: 100 }),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
  leftAt: timestamp("leftAt"),
});

/**
 * Project evaluations - feedback from companies about talents
 */
export const evaluations = mysqlTable("evaluations", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  talentId: int("talentId").notNull(),
  companyId: int("companyId").notNull(),
  rating: int("rating").notNull(), // 1-5
  feedback: text("feedback"),
  skills: json("skills").$type<{skill: string, rating: number}[]>(),
  wouldHireAgain: boolean("wouldHireAgain"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Blog posts
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: varchar("coverImage", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: json("tags").$type<string[]>(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Events
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  createdBy: int("createdBy").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  subtitle: varchar("subtitle", { length: 500 }),
  description: text("description").notNull(),
  coverImage: varchar("coverImage", { length: 500 }),
  eventDate: timestamp("eventDate").notNull(),
  eventTime: varchar("eventTime", { length: 20 }),
  location: varchar("location", { length: 255 }),
  isOnline: boolean("isOnline").default(false),
  registrationLink: varchar("registrationLink", { length: 500 }), // Sympla link
  maxParticipants: int("maxParticipants"),
  status: mysqlEnum("status", ["upcoming", "ongoing", "completed", "cancelled"]).default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Contact Requests - Companies requesting quotes
 */
export const contactRequests = mysqlTable("contact_requests", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  cnpj: varchar("cnpj", { length: 18 }),
  industry: varchar("industry", { length: 100 }),
  companySize: mysqlEnum("companySize", ["pequena", "media", "grande"]),
  projectType: varchar("projectType", { length: 100 }),
  budget: varchar("budget", { length: 50 }),
  timeline: varchar("timeline", { length: 50 }),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "contacted", "converted", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Student Questions - Questions from students
 */
export const studentQuestions = mysqlTable("student_questions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  university: varchar("university", { length: 255 }),
  course: varchar("course", { length: 255 }),
  question: text("question").notNull(),
  status: mysqlEnum("status", ["pending", "answered", "archived"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  answeredAt: timestamp("answeredAt"),
});

/**
 * University Invitations - Students inviting their universities
 */
export const universityInvitations = mysqlTable("university_invitations", {
  id: int("id").autoincrement().primaryKey(),
  studentName: varchar("studentName", { length: 255 }).notNull(),
  studentEmail: varchar("studentEmail", { length: 320 }).notNull(),
  universityName: varchar("universityName", { length: 255 }).notNull(),
  state: varchar("state", { length: 2 }),
  city: varchar("city", { length: 100 }),
  course: varchar("course", { length: 255 }),
  contactName: varchar("contactName", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "contacted", "partnered", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * University Partnership Requests - Universities requesting partnership
 */
export const universityPartnershipRequests = mysqlTable("university_partnership_requests", {
  id: int("id").autoincrement().primaryKey(),
  universityName: varchar("universityName", { length: 255 }).notNull(),
  cnpj: varchar("cnpj", { length: 18 }),
  state: varchar("state", { length: 2 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  website: varchar("website", { length: 255 }),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactRole: varchar("contactRole", { length: 255 }),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 20 }),
  studentsCount: varchar("studentsCount", { length: 50 }),
  coursesOffered: text("coursesOffered"),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "in_review", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/**
 * Notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["info", "success", "warning", "error"]).default("info").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  link: varchar("link", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Relations
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

export const projectsRelations = relations(projects, ({ one, many }) => ({
  company: one(companyProfiles, {
    fields: [projects.companyId],
    references: [companyProfiles.id],
  }),
  applications: many(applications),
  squad: one(squads),
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

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CompanyProfile = typeof companyProfiles.$inferSelect;
export type InsertCompanyProfile = typeof companyProfiles.$inferInsert;
export type TalentProfile = typeof talentProfiles.$inferSelect;
export type InsertTalentProfile = typeof talentProfiles.$inferInsert;
export type UniversityProfile = typeof universityProfiles.$inferSelect;
export type InsertUniversityProfile = typeof universityProfiles.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;
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
