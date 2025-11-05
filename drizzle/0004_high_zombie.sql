CREATE TABLE `university_partnership_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`universityName` varchar(255) NOT NULL,
	`cnpj` varchar(18),
	`state` varchar(2) NOT NULL,
	`city` varchar(100) NOT NULL,
	`website` varchar(255),
	`contactName` varchar(255) NOT NULL,
	`contactRole` varchar(255),
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(20),
	`studentsCount` varchar(50),
	`coursesOffered` text,
	`message` text,
	`status` enum('pending','in_review','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `university_partnership_requests_id` PRIMARY KEY(`id`)
);
