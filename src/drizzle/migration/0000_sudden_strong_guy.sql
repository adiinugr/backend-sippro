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
CREATE TABLE IF NOT EXISTS "classrooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"grade_id" integer NOT NULL,
	CONSTRAINT "classrooms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clsrm_to_sbjgs" (
	"id" serial PRIMARY KEY NOT NULL,
	"classroom_id" integer NOT NULL,
	"subject_group_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grades" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "grades_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_years" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "lesson_years_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "marks" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"subject_group_id" integer NOT NULL,
	"semester" text NOT NULL,
	"mark" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles_to_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"permissions_id" integer NOT NULL,
	"create" boolean DEFAULT false NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"update" boolean DEFAULT false NOT NULL,
	"delete" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rule_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "rule_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"point" integer NOT NULL,
	"rule_category_id" integer NOT NULL,
	CONSTRAINT "rules_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stds_to_sbjgs_to_clsrms" (
	"student_id" integer NOT NULL,
	"clsrm_to_sbjg_id" integer NOT NULL,
	CONSTRAINT "stds_to_sbjgs_to_clsrms_student_id_clsrm_to_sbjg_id_pk" PRIMARY KEY("student_id","clsrm_to_sbjg_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"nis" text NOT NULL,
	"nisn" text NOT NULL,
	"place_of_birth" text NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"status" text DEFAULT 'student' NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subject_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"grade_id" integer NOT NULL,
	"lesson_year_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sbjs_to_sbjgs" (
	"subject_order" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"subject_group_id" integer NOT NULL,
	CONSTRAINT "sbjs_to_sbjgs_subject_id_subject_group_id_pk" PRIMARY KEY("subject_id","subject_group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"category" text,
	CONSTRAINT "subjects_code_unique" UNIQUE("code"),
	CONSTRAINT "subjects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teachers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"place_of_birth" text NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"status" text DEFAULT 'teacher' NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "teachers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teachers_to_roles" (
	"teacher_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "teachers_to_roles_teacher_id_role_id_pk" PRIMARY KEY("teacher_id","role_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "violations" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"student_id" integer NOT NULL,
	"rule_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_to_permissions" ADD CONSTRAINT "roles_to_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_to_permissions" ADD CONSTRAINT "roles_to_permissions_permissions_id_permissions_id_fk" FOREIGN KEY ("permissions_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rules" ADD CONSTRAINT "rules_rule_category_id_rule_categories_id_fk" FOREIGN KEY ("rule_category_id") REFERENCES "public"."rule_categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stds_to_sbjgs_to_clsrms" ADD CONSTRAINT "stds_to_sbjgs_to_clsrms_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stds_to_sbjgs_to_clsrms" ADD CONSTRAINT "stds_to_sbjgs_to_clsrms_clsrm_to_sbjg_id_clsrm_to_sbjgs_id_fk" FOREIGN KEY ("clsrm_to_sbjg_id") REFERENCES "public"."clsrm_to_sbjgs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sbjs_to_sbjgs" ADD CONSTRAINT "sbjs_to_sbjgs_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sbjs_to_sbjgs" ADD CONSTRAINT "sbjs_to_sbjgs_subject_group_id_subject_groups_id_fk" FOREIGN KEY ("subject_group_id") REFERENCES "public"."subject_groups"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teachers_to_roles" ADD CONSTRAINT "teachers_to_roles_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teachers_to_roles" ADD CONSTRAINT "teachers_to_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "violations" ADD CONSTRAINT "violations_rule_id_rules_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
