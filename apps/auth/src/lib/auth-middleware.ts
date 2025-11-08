/**
 * Unified Authentication Middleware
 *
 * Supports multiple authentication methods:
 * 1. Cookies (session-based) - Default Better Auth method
 * 2. Bearer tokens (Authorization: Bearer <token>)
 * 3. API keys (X-API-Key header or api_key query parameter)
 *
 * Priority order:
 * 1. API Key (if present, for server-to-server communication)
 * 2. Bearer Token (if present, for stateless API access)
 * 3. Session Cookie (default, for browser-based requests)
 */

import type { Context, Next } from "hono";
import { auth } from "@workspace/better-auth";
import { createProjectAuthInstance } from "./dynamic-auth";
import { projectService } from "./project-service";
import type { projectSchema } from "@workspace/database";
import { db } from "@workspace/database";
import { authSchema } from "@workspace/database";
import { eq, and } from "drizzle-orm";

// Extend Hono context with auth info
declare module "hono" {
    interface ContextVariableMap {
        session?: any;
        user?: any;
        organizationId?: string;
        authMethod?: "cookie" | "bearer" | "api_key";
        apiKeyProject?: typeof projectSchema.project.$inferSelect;
    }
}

/**
 * Validates an API key and returns the associated project
 */
async function validateApiKey(apiKey: string): Promise<typeof projectSchema.project.$inferSelect | null> {
    try {
        // API keys are stored in the project table
        // Format: pk_<random> for public keys or sk_<random> for secret keys
        const project = await projectService.getProjectByApiKey(apiKey);

        if (!project) {
            return null;
        }

        // Check if project is active
        if (project.status !== "active") {
            return null;
        }

        return project;
    } catch (error) {
        console.error("Error validating API key:", error);
        return null;
    }
}

/**
 * Unified authentication middleware
 * Attempts authentication in order: API Key -> Bearer Token -> Session Cookie
 */
export async function authenticate(c: Context, next: Next) {
    const isPlatform = c.var.isPlatformRequest;
    const project = c.var.project;

    // Determine which auth instance to use
    const authInstance = isPlatform ? auth : (project ? createProjectAuthInstance(project) : auth);

    // 1. Check for API Key authentication (highest priority for server-to-server)
    const apiKeyFromHeader = c.req.header("x-api-key");
    const apiKeyFromQuery = c.req.query("api_key");
    const apiKey = apiKeyFromHeader || apiKeyFromQuery;

    if (apiKey) {
        const apiKeyProject = await validateApiKey(apiKey);

        if (apiKeyProject) {
            // API key is valid
            c.set("authMethod", "api_key");
            c.set("apiKeyProject", apiKeyProject);
            c.set("organizationId", apiKeyProject.organizationId);

            // For API key auth, we don't have a specific user session
            // but we can set organization context
            return next();
        } else {
            return c.json(
                {
                    error: "Invalid API key",
                    message: "The provided API key is invalid or expired",
                },
                401
            );
        }
    }

    // 2. Check for Bearer Token authentication
    const authHeader = c.req.header("authorization");
    if (authHeader?.startsWith("Bearer ")) {
        try {
            const session = await authInstance.api.getSession({
                headers: c.req.raw.headers,
            });

            if (session) {
                c.set("session", session.session);
                c.set("user", session.user);
                c.set("authMethod", "bearer");

                // Note: Organization context should be passed via request or looked up separately
                // The organization plugin stores this in a separate member table

                return next();
            }

            // Bearer token is present but invalid
            return c.json(
                {
                    error: "Invalid bearer token",
                    message: "The provided bearer token is invalid or expired",
                },
                401
            );
        } catch (error) {
            console.error("Error validating bearer token:", error);
            return c.json(
                {
                    error: "Authentication error",
                    message: "Failed to validate bearer token",
                },
                401
            );
        }
    }

    // 3. Check for Session Cookie authentication (default)
    try {
        const session = await authInstance.api.getSession({
            headers: c.req.raw.headers,
        });

        if (!session) {
            return c.json(
                {
                    error: "Unauthorized",
                    message: "Authentication required. Please provide valid credentials via cookie, bearer token, or API key.",
                },
                401
            );
        }

        c.set("session", session.session);
        c.set("user", session.user);
        c.set("authMethod", "cookie");

        // Note: Organization context should be passed via request or looked up separately
        // The organization plugin stores this in a separate member table

        return next();
    } catch (error) {
        console.error("Error validating session:", error);
        return c.json(
            {
                error: "Authentication error",
                message: "Failed to validate session",
            },
            500
        );
    }
}

/**
 * Middleware to ensure user has an active organization
 * Should be used after authenticate middleware
 *
 * For cookie/bearer auth: Looks up user's first organization membership
 * For API key auth: Uses the organization from the API key's project
 */
export async function requireOrganization(c: Context, next: Next) {
    const authMethod = c.var.authMethod;
    const user = c.var.user;

    // For API key auth, organization is already set from the project
    if (authMethod === "api_key") {
        const organizationId = c.var.organizationId;
        if (!organizationId) {
            return c.json(
                {
                    error: "Organization required",
                    message: "This API key is not associated with an organization",
                },
                403
            );
        }
        return next();
    }

    // For user-based auth (cookie/bearer), look up their organization membership
    if (!user?.id) {
        return c.json(
            {
                error: "Authentication required",
                message: "User not found in session",
            },
            401
        );
    }

    try {
        // Query the member table to find user's organization
        const memberships = await db
            .select()
            .from(authSchema.member)
            .where(eq(authSchema.member.userId, user.id))
            .limit(1);

        if (!memberships || memberships.length === 0) {
            return c.json(
                {
                    error: "Organization required",
                    message: "You must be a member of an organization to perform this action. Please create or join an organization first.",
                },
                403
            );
        }

        const membership = memberships[0];
        if (!membership) {
            return c.json(
                {
                    error: "Organization required",
                    message: "Organization membership not found",
                },
                403
            );
        }

        c.set("organizationId", membership.organizationId);
        return next();
    } catch (error) {
        console.error("Error looking up organization membership:", error);
        return c.json(
            {
                error: "Internal server error",
                message: "Failed to verify organization membership",
            },
            500
        );
    }
}

/**
 * Middleware to ensure request is authenticated with a specific method
 */
export function requireAuthMethod(...methods: Array<"cookie" | "bearer" | "api_key">) {
    return (c: Context, next: Next) => {
        const authMethod = c.var.authMethod;

        if (!authMethod || !methods.includes(authMethod)) {
            return c.json(
                {
                    error: "Invalid authentication method",
                    message: `This endpoint requires authentication via: ${methods.join(", ")}`,
                },
                403
            );
        }

        return next();
    };
}

/**
 * Optional authentication middleware
 * Attempts to authenticate but doesn't fail if authentication is missing
 * Useful for public endpoints that want to provide different responses for authenticated users
 */
export async function optionalAuthenticate(c: Context, next: Next) {
    const isPlatform = c.var.isPlatformRequest;
    const project = c.var.project;

    const authInstance = isPlatform ? auth : (project ? createProjectAuthInstance(project) : auth);

    // Try API key
    const apiKey = c.req.header("x-api-key") || c.req.query("api_key");
    if (apiKey) {
        const apiKeyProject = await validateApiKey(apiKey);
        if (apiKeyProject) {
            c.set("authMethod", "api_key");
            c.set("apiKeyProject", apiKeyProject);
            c.set("organizationId", apiKeyProject.organizationId);
            return next();
        }
    }

    // Try bearer or cookie
    try {
        const session = await authInstance.api.getSession({
            headers: c.req.raw.headers,
        });

        if (session) {
            c.set("session", session.session);
            c.set("user", session.user);
            c.set("authMethod", c.req.header("authorization")?.startsWith("Bearer ") ? "bearer" : "cookie");

            // Note: Organization context should be passed via request or looked up separately
        }
    } catch (error) {
        // Silently fail for optional auth
        console.debug("Optional auth failed:", error);
    }

    return next();
}
