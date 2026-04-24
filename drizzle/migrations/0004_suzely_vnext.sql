ALTER TABLE "talent_profiles" ADD COLUMN "bio_embedding" vector(768);--> statement-breakpoint
ALTER TABLE "talent_profiles" ADD COLUMN "skills_embedding" vector(768);--> statement-breakpoint
ALTER TABLE "talent_profiles" ADD COLUMN "ods_embedding" vector(768);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "brief_embedding" vector(768);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "skills_embedding" vector(768);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "ods_embedding" vector(768);--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "match_audit" json;--> statement-breakpoint
CREATE TABLE "match_decisions" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"talent_id" integer NOT NULL,
	"application_id" integer,
	"stage" varchar(32) NOT NULL,
	"pipeline_version" varchar(32) NOT NULL,
	"model_version" varchar(64) NOT NULL,
	"score" integer NOT NULL,
	"confidence" varchar(16) NOT NULL,
	"reasoning" text NOT NULL,
	"subscores" json NOT NULL,
	"evidence_quotes_from_talent" json NOT NULL,
	"evidence_quotes_from_project" json NOT NULL,
	"fairness_audit" json,
	"allocation_status" varchar(24),
	"allocation_rank" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "match_decisions" ADD CONSTRAINT "match_decisions_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_decisions" ADD CONSTRAINT "match_decisions_talent_id_talent_profiles_id_fk" FOREIGN KEY ("talent_id") REFERENCES "public"."talent_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_decisions" ADD CONSTRAINT "match_decisions_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
