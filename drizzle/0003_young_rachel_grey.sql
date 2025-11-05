CREATE TABLE `student_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`university` varchar(255),
	`course` varchar(255),
	`question` text NOT NULL,
	`status` enum('pending','answered','archived') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`answeredAt` timestamp,
	CONSTRAINT `student_questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `university_invitations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentName` varchar(255) NOT NULL,
	`studentEmail` varchar(320) NOT NULL,
	`universityName` varchar(255) NOT NULL,
	`state` varchar(2),
	`city` varchar(100),
	`course` varchar(255),
	`contactName` varchar(255),
	`contactEmail` varchar(320),
	`message` text,
	`status` enum('pending','contacted','partnered','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `university_invitations_id` PRIMARY KEY(`id`)
);
