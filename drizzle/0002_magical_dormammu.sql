CREATE TABLE `contact_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`contactName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`cnpj` varchar(18),
	`industry` varchar(100),
	`companySize` enum('pequena','media','grande'),
	`projectType` varchar(100),
	`budget` varchar(50),
	`timeline` varchar(50),
	`message` text,
	`status` enum('pending','contacted','converted','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_requests_id` PRIMARY KEY(`id`)
);
