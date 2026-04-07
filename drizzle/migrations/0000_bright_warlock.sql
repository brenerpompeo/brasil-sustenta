CREATE TYPE "public"."application_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."company_size" AS ENUM('pequena', 'media', 'grande');--> statement-breakpoint
CREATE TYPE "public"."contact_status" AS ENUM('pending', 'contacted', 'converted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('pending', 'contacted', 'partnered', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('info', 'success', 'warning', 'error');--> statement-breakpoint
CREATE TYPE "public"."partnership_request_status" AS ENUM('pending', 'in_review', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."project_category" AS ENUM('esg', 'direitos_humanos', 'ods', 'comunicacao', 'marketing', 'website', 'ui_ux', 'design_thinking');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('draft', 'open', 'in_progress', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."squad_status" AS ENUM('forming', 'active', 'completed');--> statement-breakpoint
CREATE TYPE "public"."student_question_status" AS ENUM('pending', 'answered', 'archived');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('empresa', 'jovem', 'universidade');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"talent_id" integer NOT NULL,
	"cover_letter" text,
	"status" "application_status" DEFAULT 'pending' NOT NULL,
	"applied_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_at" timestamp,
	"reviewed_by" integer
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"cover_image" varchar(500),
	"category" varchar(100),
	"tags" json,
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "company_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"cnpj" varchar(18),
	"industry" varchar(100),
	"size" "company_size",
	"description" text,
	"website" varchar(255),
	"logo" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "company_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "contact_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"contact_name" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(20),
	"cnpj" varchar(18),
	"industry" varchar(100),
	"company_size" "company_size",
	"project_type" varchar(100),
	"budget" varchar(50),
	"timeline" varchar(50),
	"message" text,
	"status" "contact_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evaluations" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"talent_id" integer NOT NULL,
	"company_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"feedback" text,
	"skills" json,
	"would_hire_again" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_by" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"subtitle" varchar(500),
	"description" text NOT NULL,
	"cover_image" varchar(500),
	"event_date" timestamp NOT NULL,
	"event_time" varchar(20),
	"location" varchar(255),
	"is_online" boolean DEFAULT false,
	"registration_link" varchar(500),
	"max_participants" integer,
	"status" "event_status" DEFAULT 'upcoming' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"type" "notification_type" DEFAULT 'info' NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"link" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category" "project_category" NOT NULL,
	"duration" integer NOT NULL,
	"team_size" integer NOT NULL,
	"required_skills" json,
	"budget" integer,
	"status" "project_status" DEFAULT 'draft' NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"deliverables" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "squad_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"squad_id" integer NOT NULL,
	"talent_id" integer NOT NULL,
	"role" varchar(100),
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"left_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "squads" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"status" "squad_status" DEFAULT 'forming' NOT NULL,
	"formed_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	CONSTRAINT "squads_project_id_unique" UNIQUE("project_id")
);
--> statement-breakpoint
CREATE TABLE "student_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(320) NOT NULL,
	"university" varchar(255),
	"course" varchar(255),
	"question" text NOT NULL,
	"status" "student_question_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"answered_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "talent_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"cpf" varchar(14),
	"birth_date" timestamp,
	"phone" varchar(20),
	"university_id" integer,
	"course" varchar(255),
	"semester" integer,
	"graduation_year" integer,
	"bio" text,
	"skills" json,
	"portfolio" varchar(500),
	"linkedin" varchar(255),
	"github" varchar(255),
	"avatar" varchar(500),
	"is_available" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "talent_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "university_invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_name" varchar(255) NOT NULL,
	"student_email" varchar(320) NOT NULL,
	"university_name" varchar(255) NOT NULL,
	"state" varchar(2),
	"city" varchar(100),
	"course" varchar(255),
	"contact_name" varchar(255),
	"contact_email" varchar(320),
	"message" text,
	"status" "invitation_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "university_partnership_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"university_name" varchar(255) NOT NULL,
	"cnpj" varchar(18),
	"state" varchar(2) NOT NULL,
	"city" varchar(100) NOT NULL,
	"website" varchar(255),
	"contact_name" varchar(255) NOT NULL,
	"contact_role" varchar(255),
	"contact_email" varchar(320) NOT NULL,
	"contact_phone" varchar(20),
	"students_count" varchar(50),
	"courses_offered" text,
	"message" text,
	"status" "partnership_request_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "university_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"university_name" varchar(255) NOT NULL,
	"acronym" varchar(20),
	"cnpj" varchar(18),
	"state" varchar(2),
	"city" varchar(100),
	"contact_person" varchar(255),
	"contact_email" varchar(320),
	"contact_phone" varchar(20),
	"logo" varchar(500),
	"partnership_start_date" timestamp,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "university_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"open_id" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"login_method" varchar(64),
	"role" "role" DEFAULT 'user' NOT NULL,
	"user_type" "user_type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_signed_in" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_open_id_unique" UNIQUE("open_id")
);
