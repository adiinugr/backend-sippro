CREATE TABLE IF NOT EXISTS "subject_to_subject_groups" (
	"subject_id" integer NOT NULL,
	"subject_group_id" integer NOT NULL,
	CONSTRAINT "subject_to_subject_groups_subject_id_subject_group_id_pk" PRIMARY KEY("subject_id","subject_group_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subject_to_subject_groups" ADD CONSTRAINT "subject_to_subject_groups_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subject_to_subject_groups" ADD CONSTRAINT "subject_to_subject_groups_subject_group_id_subject_groups_id_fk" FOREIGN KEY ("subject_group_id") REFERENCES "public"."subject_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "subjects" DROP COLUMN IF EXISTS "subject_group_id";