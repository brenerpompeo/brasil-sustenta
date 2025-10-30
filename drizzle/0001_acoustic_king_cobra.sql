CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`talentId` int NOT NULL,
	`coverLetter` text,
	`status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
	`appliedAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	`reviewedBy` int,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`coverImage` varchar(500),
	`category` varchar(100),
	`tags` json,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `company_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`cnpj` varchar(18),
	`industry` varchar(100),
	`size` enum('pequena','media','grande'),
	`description` text,
	`website` varchar(255),
	`logo` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `company_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `company_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `evaluations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`talentId` int NOT NULL,
	`companyId` int NOT NULL,
	`rating` int NOT NULL,
	`feedback` text,
	`skills` json,
	`wouldHireAgain` boolean,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `evaluations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`createdBy` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`subtitle` varchar(500),
	`description` text NOT NULL,
	`coverImage` varchar(500),
	`eventDate` timestamp NOT NULL,
	`eventTime` varchar(20),
	`location` varchar(255),
	`isOnline` boolean DEFAULT false,
	`registrationLink` varchar(500),
	`maxParticipants` int,
	`status` enum('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`),
	CONSTRAINT `events_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` enum('info','success','warning','error') NOT NULL DEFAULT 'info',
	`isRead` boolean NOT NULL DEFAULT false,
	`link` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` enum('esg','direitos_humanos','ods','comunicacao','marketing','website','ui_ux','design_thinking') NOT NULL,
	`duration` int NOT NULL,
	`teamSize` int NOT NULL,
	`requiredSkills` json,
	`budget` int,
	`status` enum('draft','open','in_progress','completed','cancelled') NOT NULL DEFAULT 'draft',
	`startDate` timestamp,
	`endDate` timestamp,
	`deliverables` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `squad_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`squadId` int NOT NULL,
	`talentId` int NOT NULL,
	`role` varchar(100),
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	`leftAt` timestamp,
	CONSTRAINT `squad_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `squads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`status` enum('forming','active','completed') NOT NULL DEFAULT 'forming',
	`formedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `squads_id` PRIMARY KEY(`id`),
	CONSTRAINT `squads_projectId_unique` UNIQUE(`projectId`)
);
--> statement-breakpoint
CREATE TABLE `talent_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`cpf` varchar(14),
	`birthDate` timestamp,
	`phone` varchar(20),
	`universityId` int,
	`course` varchar(255),
	`semester` int,
	`graduationYear` int,
	`bio` text,
	`skills` json,
	`portfolio` varchar(500),
	`linkedin` varchar(255),
	`github` varchar(255),
	`avatar` varchar(500),
	`isAvailable` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `talent_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `talent_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `university_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`universityName` varchar(255) NOT NULL,
	`acronym` varchar(20),
	`cnpj` varchar(18),
	`state` varchar(2),
	`city` varchar(100),
	`contactPerson` varchar(255),
	`contactEmail` varchar(320),
	`contactPhone` varchar(20),
	`logo` varchar(500),
	`partnershipStartDate` timestamp,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `university_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `university_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `userType` enum('empresa','jovem','universidade');