CREATE TYPE "public"."territory_node_type" AS ENUM('state_hub', 'city_hub', 'campus');--> statement-breakpoint
CREATE TYPE "public"."territory_node_status" AS ENUM('planning', 'active', 'expanding', 'paused');--> statement-breakpoint
CREATE TABLE "territory_nodes" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"node_type" "territory_node_type" NOT NULL,
	"status" "territory_node_status" DEFAULT 'planning' NOT NULL,
	"state_code" varchar(2),
	"city_name" varchar(120),
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"short_description" text,
	"long_description" text,
	"badge" varchar(120),
	"hero_image" varchar(500),
	"color_token" varchar(32) DEFAULT 'leaf' NOT NULL,
	"metrics" json,
	"cta_links" json,
	"legacy_hub_label" varchar(120),
	"parent_node_id" integer,
	"university_profile_id" integer,
	"is_published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "territory_nodes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "territory_node_id" integer;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "territory_node_id" integer;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "territory_node_id" integer;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "territory_node_id" integer;--> statement-breakpoint
ALTER TABLE "support_materials" ADD COLUMN "territory_node_id" integer;--> statement-breakpoint
ALTER TABLE "territory_nodes" ADD CONSTRAINT "territory_nodes_parent_node_id_fk" FOREIGN KEY ("parent_node_id") REFERENCES "public"."territory_nodes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "territory_nodes" ADD CONSTRAINT "territory_nodes_university_profile_id_university_profiles_id_fk" FOREIGN KEY ("university_profile_id") REFERENCES "public"."university_profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_territory_node_id_territory_nodes_id_fk" FOREIGN KEY ("territory_node_id") REFERENCES "public"."territory_nodes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_territory_node_id_territory_nodes_id_fk" FOREIGN KEY ("territory_node_id") REFERENCES "public"."territory_nodes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_territory_node_id_territory_nodes_id_fk" FOREIGN KEY ("territory_node_id") REFERENCES "public"."territory_nodes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_territory_node_id_territory_nodes_id_fk" FOREIGN KEY ("territory_node_id") REFERENCES "public"."territory_nodes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_materials" ADD CONSTRAINT "support_materials_territory_node_id_territory_nodes_id_fk" FOREIGN KEY ("territory_node_id") REFERENCES "public"."territory_nodes"("id") ON DELETE set null ON UPDATE no action;
