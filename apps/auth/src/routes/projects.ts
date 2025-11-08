import { Hono } from "hono";
import { projectService } from "../lib/project-service";
import { clearProjectAuthCache } from "../lib/dynamic-auth";
import { authenticate, requireOrganization } from "../lib/auth-middleware";

const projectRoutes = new Hono();

/**
 * GET /api/projects
 * List all projects for the authenticated user's active organization
 */
projectRoutes.get("/", authenticate, requireOrganization, async (c) => {
    try {
        const organizationId = c.var.organizationId;
        if (!organizationId) {
            return c.json({ error: "Organization ID not found" }, 500);
        }
        const projects = await projectService.getOrganizationProjects(organizationId);

        return c.json({
            projects: projects.map((p) => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                status: p.status,
                apiKey: p.apiKey, // Include public API key
                createdAt: p.createdAt,
                updatedAt: p.updatedAt,
            })),
        });
    } catch (error) {
        console.error("Error listing projects:", error);
        return c.json({ error: "Failed to list projects" }, 500);
    }
});

/**
 * POST /api/projects
 * Create a new project
 */
projectRoutes.post("/", authenticate, requireOrganization, async (c) => {
    try {
        const body = await c.req.json();
        const { name, slug, description, authConfig } = body;

        // Validate required fields
        if (!name || !slug) {
            return c.json(
                {
                    error: "Missing required fields",
                    message: "name and slug are required",
                },
                400
            );
        }

        // Validate slug format (alphanumeric and hyphens only)
        if (!/^[a-z0-9-]+$/.test(slug)) {
            return c.json(
                {
                    error: "Invalid slug",
                    message: "Slug can only contain lowercase letters, numbers, and hyphens",
                },
                400
            );
        }

        // Check if slug is available
        const isAvailable = await projectService.isSlugAvailable(slug);
        if (!isAvailable) {
            return c.json(
                {
                    error: "Slug unavailable",
                    message: "This slug is already taken",
                },
                409
            );
        }

        // Create the project
        const organizationId = c.var.organizationId;
        if (!organizationId) {
            return c.json({ error: "Organization ID not found" }, 500);
        }
        const project = await projectService.createProject({
            name,
            slug,
            description,
            organizationId,
            createdBy: c.var.user.id,
            authConfig,
        });

        return c.json(
            {
                message: "Project created successfully",
                project: {
                    id: project.id,
                    name: project.name,
                    slug: project.slug,
                    description: project.description,
                    status: project.status,
                    apiKey: project.apiKey,
                    authUrl: `https://${project.slug}.${process.env.BASE_DOMAIN || "auth-platform.com"}`,
                    createdAt: project.createdAt,
                },
            },
            201
        );
    } catch (error) {
        console.error("Error creating project:", error);
        return c.json(
            {
                error: "Failed to create project",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            500
        );
    }
});

/**
 * GET /api/projects/:id
 * Get details of a specific project
 */
projectRoutes.get("/:id", authenticate, requireOrganization, async (c) => {
    try {
        const projectId = c.req.param("id");
        const organizationId = c.var.organizationId;
        if (!organizationId) {
            return c.json({ error: "Organization ID not found" }, 500);
        }

        // Verify ownership
        const isOwner = await projectService.validateProjectOwnership(
            projectId,
            organizationId
        );

        if (!isOwner) {
            return c.json({ error: "Project not found or access denied" }, 404);
        }

        const project = await projectService.getProjectById(projectId);

        if (!project) {
            return c.json({ error: "Project not found" }, 404);
        }

        return c.json({
            project: {
                id: project.id,
                name: project.name,
                slug: project.slug,
                description: project.description,
                status: project.status,
                apiKey: project.apiKey,
                authConfig: project.authConfig,
                authUrl: `https://${project.slug}.${process.env.BASE_DOMAIN || "auth-platform.com"}`,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt,
            },
        });
    } catch (error) {
        console.error("Error getting project:", error);
        return c.json({ error: "Failed to get project" }, 500);
    }
});

/**
 * PATCH /api/projects/:id
 * Update a project's configuration
 */
projectRoutes.patch("/:id", authenticate, requireOrganization, async (c) => {
    try {
        const projectId = c.req.param("id");
        const organizationId = c.var.organizationId;
        if (!organizationId) {
            return c.json({ error: "Organization ID not found" }, 500);
        }
        const body = await c.req.json();

        // Verify ownership
        const isOwner = await projectService.validateProjectOwnership(
            projectId,
            organizationId
        );

        if (!isOwner) {
            return c.json({ error: "Project not found or access denied" }, 404);
        }

        // Only allow updating certain fields
        const allowedUpdates = {
            name: body.name,
            description: body.description,
            authConfig: body.authConfig,
        };

        // Remove undefined values
        Object.keys(allowedUpdates).forEach((key) => {
            if (allowedUpdates[key as keyof typeof allowedUpdates] === undefined) {
                delete allowedUpdates[key as keyof typeof allowedUpdates];
            }
        });

        const updatedProject = await projectService.updateProject(
            projectId,
            allowedUpdates
        );

        if (!updatedProject) {
            return c.json({ error: "Failed to update project" }, 500);
        }

        // Clear the auth cache for this project so it gets regenerated with new config
        clearProjectAuthCache(projectId);

        return c.json({
            message: "Project updated successfully",
            project: {
                id: updatedProject.id,
                name: updatedProject.name,
                slug: updatedProject.slug,
                description: updatedProject.description,
                status: updatedProject.status,
                authConfig: updatedProject.authConfig,
                updatedAt: updatedProject.updatedAt,
            },
        });
    } catch (error) {
        console.error("Error updating project:", error);
        return c.json({ error: "Failed to update project" }, 500);
    }
});

/**
 * DELETE /api/projects/:id
 * Soft delete a project
 */
projectRoutes.delete("/:id", authenticate, requireOrganization, async (c) => {
    try {
        const projectId = c.req.param("id");
        const organizationId = c.var.organizationId;
        if (!organizationId) {
            return c.json({ error: "Organization ID not found" }, 500);
        }

        // Verify ownership
        const isOwner = await projectService.validateProjectOwnership(
            projectId,
            organizationId
        );

        if (!isOwner) {
            return c.json({ error: "Project not found or access denied" }, 404);
        }

        await projectService.deleteProject(projectId);

        // Clear the auth cache
        clearProjectAuthCache(projectId);

        return c.json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        return c.json({ error: "Failed to delete project" }, 500);
    }
});

/**
 * POST /api/projects/:id/regenerate-api-key
 * Regenerate API credentials for a project
 */
projectRoutes.post(
    "/:id/regenerate-api-key",
    authenticate,
    requireOrganization,
    async (c) => {
        try {
            const projectId = c.req.param("id");
            const organizationId = c.var.organizationId;
            if (!organizationId) {
                return c.json({ error: "Organization ID not found" }, 500);
            }

            // Verify ownership
            const isOwner = await projectService.validateProjectOwnership(
                projectId,
                organizationId
            );

            if (!isOwner) {
                return c.json({ error: "Project not found or access denied" }, 404);
            }

            // Generate new API credentials
            const { randomBytes } = await import("crypto");
            const apiKey = `pk_${randomBytes(16).toString("hex")}`;
            const apiSecret = `sk_${randomBytes(32).toString("hex")}`;

            const updatedProject = await projectService.updateProject(projectId, {
                apiKey,
                apiSecret, // TODO: Hash this
            });

            if (!updatedProject) {
                return c.json({ error: "Failed to regenerate API key" }, 500);
            }

            return c.json({
                message: "API credentials regenerated successfully",
                apiKey: updatedProject.apiKey,
                // Only show secret once
                apiSecret: apiSecret,
            });
        } catch (error) {
            console.error("Error regenerating API key:", error);
            return c.json({ error: "Failed to regenerate API key" }, 500);
        }
    }
);

export default projectRoutes;
