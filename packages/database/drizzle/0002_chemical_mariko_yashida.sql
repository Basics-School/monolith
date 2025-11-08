ALTER TABLE "project" DROP CONSTRAINT "project_subdomain_unique";--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_schema_name_unique";--> statement-breakpoint
DROP INDEX "project_subdomain_idx";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "subdomain";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "schema_name";