CREATE TYPE "public"."user_status" AS ENUM('active', 'pending', 'inactive');--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "hub" varchar(50);--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "hub" varchar(50);--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "hub" varchar(50);--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "hub" varchar(50);--> statement-breakpoint
ALTER TABLE "support_materials" ADD COLUMN "hub" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" "user_status" DEFAULT 'pending' NOT NULL;