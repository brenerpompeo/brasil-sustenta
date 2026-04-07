CREATE TYPE "public"."article_type" AS ENUM('academic', 'opinion', 'case_study', 'whitepaper');--> statement-breakpoint
CREATE TYPE "public"."material_type" AS ENUM('video', 'ebook', 'infographic', 'podcast', 'webinar', 'toolkit');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('esg', 'impact', 'ods', 'annual', 'sustainability');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"title" varchar(500) NOT NULL,
	"slug" varchar(500) NOT NULL,
	"abstract" text,
	"content" text NOT NULL,
	"article_type" "article_type" DEFAULT 'academic' NOT NULL,
	"keywords" json,
	"institution" varchar(255),
	"co_authors" json,
	"doi" varchar(255),
	"external_link" varchar(500),
	"cover_image" varchar(500),
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"title" varchar(500) NOT NULL,
	"slug" varchar(500) NOT NULL,
	"summary" text,
	"content" text,
	"report_type" "report_type" DEFAULT 'esg' NOT NULL,
	"year" integer,
	"period" varchar(50),
	"file_url" varchar(500),
	"cover_image" varchar(500),
	"tags" json,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reports_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "support_materials" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"title" varchar(500) NOT NULL,
	"slug" varchar(500) NOT NULL,
	"description" text,
	"material_type" "material_type" DEFAULT 'video' NOT NULL,
	"external_url" varchar(500),
	"file_url" varchar(500),
	"thumbnail_url" varchar(500),
	"duration" varchar(20),
	"tags" json,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "support_materials_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "talent_profiles" ADD COLUMN "ra" varchar(20);