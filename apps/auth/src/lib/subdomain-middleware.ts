import type { Context, Next } from "hono";
import { projectService } from "./project-service";
import type { projectSchema } from "@workspace/database";

// Extend Hono context with project info
declare module "hono" {
    interface ContextVariableMap {
        project?: typeof projectSchema.project.$inferSelect;
        subdomain?: string;
        isPlatformRequest: boolean;
        session?: any;
        user?: any;
        organizationId?: string;
    }
}

/**
 * Extracts subdomain from the request host
 * The subdomain corresponds to the project's slug
 * Examples:
 * - myapp.auth-platform.com -> "myapp"
 * - auth-platform.com -> null (platform request)
 * - localhost:3001 -> null (development, platform request)
 */
function extractSubdomain(host: string): string | null {
    // Remove port if present
    const hostWithoutPort = host.split(":")[0];

    if (!hostWithoutPort) {
        return null;
    }

    // Get base domain from environment or use default
    const baseDomain = process.env.BASE_DOMAIN || "auth-platform.com";

    // In development (localhost), treat as platform request
    if (hostWithoutPort === "localhost" || hostWithoutPort === "127.0.0.1") {
        return null;
    }

    // Check if this is the base domain (platform request)
    if (hostWithoutPort === baseDomain) {
        return null;
    }

    // Extract subdomain
    const parts = hostWithoutPort.split(".");
    const baseParts = baseDomain.split(".");

    // If host has more parts than base domain, first part is subdomain
    if (parts.length > baseParts.length) {
        return parts[0] || null;
    }

    return null;
}

/**
 * Middleware to detect and load project based on subdomain
 * Sets context variables:
 * - c.var.subdomain: The extracted subdomain (or null)
 * - c.var.isPlatformRequest: true if this is a platform request (no subdomain)
 * - c.var.project: The project object if found
 */
export async function subdomainMiddleware(c: Context, next: Next) {
    const host = c.req.header("host") || "";
    const subdomain = extractSubdomain(host);

    // Set subdomain in context
    c.set("subdomain", subdomain || undefined);

    // If no subdomain, this is a platform request
    if (!subdomain) {
        c.set("isPlatformRequest", true);
        return next();
    }

    // This is a project request, look up the project
    c.set("isPlatformRequest", false);

    try {
        const project = await projectService.getProjectBySlug(subdomain);

        if (!project) {
            return c.json(
                {
                    error: "Project not found",
                    message: `No project found for subdomain: ${subdomain}`,
                },
                404
            );
        }

        // Check if project is active
        if (project.status !== "active") {
            return c.json(
                {
                    error: "Project unavailable",
                    message: `This project is currently ${project.status}`,
                },
                403
            );
        }

        // Set project in context
        c.set("project", project);

        return next();
    } catch (error) {
        console.error("Error in subdomain middleware:", error);
        return c.json(
            {
                error: "Internal server error",
                message: "Failed to process subdomain",
            },
            500
        );
    }
}

/**
 * Middleware to ensure request is from platform (no subdomain)
 * Use this to protect platform-only endpoints
 */
export function requirePlatformRequest(c: Context, next: Next) {
    if (!c.var.isPlatformRequest) {
        return c.json(
            {
                error: "Forbidden",
                message: "This endpoint is only accessible from the platform domain",
            },
            403
        );
    }
    return next();
}

/**
 * Middleware to ensure request is from a project (has subdomain)
 * Use this to protect project-only endpoints
 */
export function requireProjectRequest(c: Context, next: Next) {
    if (c.var.isPlatformRequest || !c.var.project) {
        return c.json(
            {
                error: "Forbidden",
                message: "This endpoint is only accessible from a project subdomain",
            },
            403
        );
    }
    return next();
}
