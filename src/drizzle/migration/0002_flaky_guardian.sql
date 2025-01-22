CREATE TABLE IF NOT EXISTS "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"medal" text NOT NULL,
	"level" text NOT NULL,
	"organizer" text NOT NULL,
	"date" timestamp NOT NULL,
	"student_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "teachers" ALTER COLUMN "password" SET NOT NULL;