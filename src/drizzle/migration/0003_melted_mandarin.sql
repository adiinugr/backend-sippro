ALTER TABLE "roles_to_permissions" RENAME COLUMN "permissions_id" TO "permission_id";--> statement-breakpoint
ALTER TABLE "roles_to_permissions" DROP CONSTRAINT "roles_to_permissions_permissions_id_permissions_id_fk";
--> statement-breakpoint
ALTER TABLE "permissions" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_to_permissions" ADD CONSTRAINT "roles_to_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
