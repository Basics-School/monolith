ALTER TABLE "organization_role" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "active_team_id" uuid;