import { eq } from "drizzle-orm";
import { db, executeInSchema, getSchemaDb } from "@workspace/database";
import { projectSchema } from "@workspace/database";
import { randomBytes } from "crypto";

/**
 * Service for managing projects and their database schemas
 *
 * SHARED DATABASE ARCHITECTURE:
 * All projects use the same PostgreSQL database with schema-based isolation.
 * - Platform data lives in the 'public' schema
 * - Each project gets a unique schema using their slug (e.g., 'myapp')
 * - The slug is used as both the schema name and subdomain
 * - Better Auth tables are automatically created in each project's schema
 * - SaaS customers don't need to provide their own database
 * - Data is completely isolated between projects
 */
export class ProjectService {


    /**
     * Generates API key and secret for a project
     */
    private generateApiCredentials(): { apiKey: string; apiSecret: string } {
        const apiKey = `pk_${randomBytes(16).toString("hex")}`;
        const apiSecret = `sk_${randomBytes(32).toString("hex")}`;
        return { apiKey, apiSecret };
    }

    /**
     * Creates a new PostgreSQL schema
     * This creates an isolated namespace for the project's data
     */
    private async createSchema(schemaName: string): Promise<void> {
        await executeInSchema("public", `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
    }

    /**
     * Creates better-auth tables in a specific schema
     * This creates the core authentication tables needed by better-auth
     * within the project's isolated schema (not in 'public')
     */
    private async createAuthTables(schemaName: string): Promise<void> {
        // SQL for creating better-auth tables
        const createTablesSQL = `
            -- User table
            CREATE TABLE IF NOT EXISTS "${schemaName}".user (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                email_verified BOOLEAN NOT NULL DEFAULT false,
                image TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                two_factor_enabled BOOLEAN DEFAULT false,
                username TEXT UNIQUE,
                display_username TEXT
            );

            -- Session table
            CREATE TABLE IF NOT EXISTS "${schemaName}".session (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                expires_at TIMESTAMP NOT NULL,
                token TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                ip_address TEXT,
                user_agent TEXT,
                user_id UUID NOT NULL REFERENCES "${schemaName}".user(id) ON DELETE CASCADE
            );

            -- Account table
            CREATE TABLE IF NOT EXISTS "${schemaName}".account (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                account_id UUID NOT NULL,
                provider_id UUID NOT NULL,
                user_id UUID NOT NULL REFERENCES "${schemaName}".user(id) ON DELETE CASCADE,
                access_token TEXT,
                refresh_token TEXT,
                id_token TEXT,
                access_token_expires_at TIMESTAMP,
                refresh_token_expires_at TIMESTAMP,
                scope TEXT,
                password TEXT,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            );

            -- Verification table
            CREATE TABLE IF NOT EXISTS "${schemaName}".verification (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                identifier TEXT NOT NULL,
                value TEXT NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW()
            );

            -- Two Factor table (if plugin enabled)
            CREATE TABLE IF NOT EXISTS "${schemaName}".two_factor (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                secret TEXT NOT NULL,
                backup_codes TEXT NOT NULL,
                user_id UUID NOT NULL REFERENCES "${schemaName}".user(id) ON DELETE CASCADE
            );

            -- Passkey table (if plugin enabled)
            CREATE TABLE IF NOT EXISTS "${schemaName}".passkey (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT,
                public_key TEXT NOT NULL,
                user_id UUID NOT NULL REFERENCES "${schemaName}".user(id) ON DELETE CASCADE,
                webauthn_user_id TEXT NOT NULL,
                counter INTEGER NOT NULL,
                device_type TEXT NOT NULL,
                backed_up BOOLEAN NOT NULL,
                transports TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            );

            -- Create indexes for better performance
            CREATE INDEX IF NOT EXISTS idx_session_user_id ON "${schemaName}".session(user_id);
            CREATE INDEX IF NOT EXISTS idx_session_token ON "${schemaName}".session(token);
            CREATE INDEX IF NOT EXISTS idx_account_user_id ON "${schemaName}".account(user_id);
            CREATE INDEX IF NOT EXISTS idx_user_email ON "${schemaName}".user(email);
        `;

        await executeInSchema("public", createTablesSQL);
    }

    /**
     * Creates a new project with its own database schema
     * The slug is used as both the schema name and subdomain
     */
    async createProject(data: {
        name: string;
        slug: string;
        organizationId: string;
        createdBy: string;
        description?: string;
        authConfig?: any;
    }) {
        // Validate slug format (alphanumeric and hyphens only, lowercase)
        if (!/^[a-z0-9-]+$/.test(data.slug)) {
            throw new Error("Slug must contain only lowercase letters, numbers, and hyphens");
        }

        // Use slug as schema name
        const schemaName = data.slug;

        // Generate API credentials
        const { apiKey, apiSecret } = this.generateApiCredentials();

        try {
            // Step 1: Create the PostgreSQL schema
            await this.createSchema(schemaName);

            // Step 2: Create better-auth tables in the new schema
            await this.createAuthTables(schemaName);

            // Step 3: Insert project record in public schema
            const [project] = await db
                .insert(projectSchema.project)
                .values({
                    name: data.name,
                    slug: data.slug,
                    organizationId: data.organizationId,
                    createdBy: data.createdBy,
                    description: data.description,
                    apiKey,
                    apiSecret, // TODO: Hash this before storing
                    authConfig: data.authConfig || {
                        emailAndPassword: { enabled: true },
                        socialProviders: {},
                        session: { expiresIn: 604800 },
                        rateLimit: { enabled: true, window: 60, max: 100 },
                        plugins: {},
                    },
                    status: "active",
                })
                .returning();

            if (!project) {
                throw new Error("Failed to create project");
            }

            return project;
        } catch (error) {
            // If something fails, try to clean up the schema
            try {
                await executeInSchema("public", `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
            } catch (cleanupError) {
                console.error("Failed to cleanup schema:", cleanupError);
            }
            throw error;
        }
    }

    /**
     * Gets a project by ID
     */
    async getProjectById(projectId: string) {
        const [project] = await db
            .select()
            .from(projectSchema.project)
            .where(eq(projectSchema.project.id, projectId))
            .limit(1);

        return project;
    }

    /**
     * Gets a project by slug (used as both schema name and subdomain)
     */
    async getProjectBySlug(slug: string) {
        const [project] = await db
            .select()
            .from(projectSchema.project)
            .where(eq(projectSchema.project.slug, slug))
            .limit(1);

        return project;
    }

    /**
     * Gets all projects for an organization
     */
    async getOrganizationProjects(organizationId: string) {
        return db
            .select()
            .from(projectSchema.project)
            .where(eq(projectSchema.project.organizationId, organizationId));
    }

    /**
     * Updates a project's configuration
     */
    async updateProject(
        projectId: string,
        updates: Partial<typeof projectSchema.project.$inferInsert>
    ) {
        const [project] = await db
            .update(projectSchema.project)
            .set({
                ...updates,
                updatedAt: new Date(),
            })
            .where(eq(projectSchema.project.id, projectId))
            .returning();

        return project;
    }

    /**
     * Deletes a project and its schema (soft delete)
     */
    async deleteProject(projectId: string): Promise<void> {
        const project = await this.getProjectById(projectId);
        if (!project) {
            throw new Error("Project not found");
        }

        // Soft delete
        await db
            .update(projectSchema.project)
            .set({
                status: "deleted",
                deletedAt: new Date(),
            })
            .where(eq(projectSchema.project.id, projectId));
    }

    /**
     * Permanently deletes a project and drops its schema
     * WARNING: This is irreversible!
     */
    async hardDeleteProject(projectId: string): Promise<void> {
        const project = await this.getProjectById(projectId);
        if (!project) {
            throw new Error("Project not found");
        }

        // Drop the schema first (schema name is the slug)
        await executeInSchema("public", `DROP SCHEMA IF EXISTS "${project.slug}" CASCADE`);

        // Delete the project record
        await db
            .delete(projectSchema.project)
            .where(eq(projectSchema.project.id, projectId));
    }

    /**
     * Checks if a slug is available
     */
    async isSlugAvailable(slug: string): Promise<boolean> {
        const project = await this.getProjectBySlug(slug);
        return !project;
    }

    /**
     * Validates project ownership by organization
     */
    async validateProjectOwnership(projectId: string, organizationId: string): Promise<boolean> {
        const project = await this.getProjectById(projectId);
        return project?.organizationId === organizationId;
    }

    /**
     * Gets a project by API key (for API key authentication)
     */
    async getProjectByApiKey(apiKey: string) {
        const projects = await db
            .select()
            .from(projectSchema.project)
            .where(eq(projectSchema.project.apiKey, apiKey))
            .limit(1);

        return projects[0] || null;
    }
}

// Export singleton instance
export const projectService = new ProjectService();
