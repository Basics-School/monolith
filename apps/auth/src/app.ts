import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { auth } from "@workspace/better-auth";
import { subdomainMiddleware, requirePlatformRequest } from "./lib/subdomain-middleware";
import { createProjectAuthInstance } from "./lib/dynamic-auth";
import projectRoutes from "./routes/projects";

const app = new Hono();

// Global middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", secureHeaders());

// Subdomain detection middleware - applies to all requests
app.use("*", subdomainMiddleware);

// CORS configuration for cross-origin requests from Next.js and API servers
app.use(
    "*",
    cors({
        origin: [
            process.env.NEXTJS_URL || "http://localhost:3000",
            process.env.API_URL || "http://localhost:6000",
        ],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        exposeHeaders: ["Content-Length", "X-Request-Id"],
        credentials: true,
        maxAge: 600,
    }),
);

// Health check endpoint
app.get("/health", (c) => {
    const subdomain = c.var.subdomain;
    const isPlatform = c.var.isPlatformRequest;

    return c.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "auth",
        mode: isPlatform ? "platform" : "project",
        subdomain: subdomain || null,
    });
});

/**
 * Platform API Routes
 * These are only accessible from the main platform domain (no subdomain)
 */
app.route("/api/projects", projectRoutes);

/**
 * Authentication Handler - Works for both platform and project requests
 *
 * ARCHITECTURE: Shared Database, Isolated Schemas
 * - Platform requests (no subdomain): Uses the main platform auth instance (public schema)
 * - Project requests (with subdomain): Uses the project-specific auth instance (project schema)
 * - All projects share the same database connection but have isolated PostgreSQL schemas
 * - SaaS customers don't need their own database - automatic isolation via schemas
 *
 * AUTHENTICATION METHODS SUPPORTED:
 *
 * 1. Cookies (Session-based) - Default for browser applications
 *    - Automatically set after sign-in
 *    - HTTP-only and secure in production
 *    - Best for same-origin web apps
 *
 * 2. Bearer Tokens - For stateless API access
 *    - Header: Authorization: Bearer <token>
 *    - Generate via POST /api/auth/bearer/generate
 *    - Best for mobile apps and SPAs
 *
 * 3. API Keys - For server-to-server communication
 *    - Header: X-API-Key: <key>
 *    - Query param: ?api_key=<key>
 *    - Best for backend services and automation
 *
 * Better Auth provides comprehensive authentication & authorization APIs:
 *
 * Authentication:
 * - POST /api/auth/sign-in/email
 * - POST /api/auth/sign-up/email
 * - POST /api/auth/sign-out
 * - GET /api/auth/session
 * - POST /api/auth/bearer/generate (Bearer token generation)
 * - POST /api/auth/jwt/generate (JWT generation)
 * - GET /api/auth/reference (OpenAPI documentation)
 *
 * Organization Management (Platform only):
 * - GET /api/auth/organization/list
 * - POST /api/auth/organization/create
 * - GET /api/auth/organization/get-full-organization
 * - GET /api/auth/organization/get-active-member
 * - GET /api/auth/organization/get-active-member-role
 * - GET /api/auth/organization/list-members
 * - POST /api/auth/organization/invite-member
 * - POST /api/auth/organization/update-member-role
 *
 * All these endpoints support all three authentication methods!
 * See AUTHENTICATION-GUIDE.md for detailed usage examples.
 */
app.all("/api/auth/*", async (c) => {
    const isPlatform = c.var.isPlatformRequest;
    const project = c.var.project;

    if (isPlatform) {
        // Platform request - use main auth instance
        return auth.handler(c.req.raw);
    } else if (project) {
        // Project request - use project-specific auth instance
        const projectAuth = createProjectAuthInstance(project);
        return projectAuth.handler(c.req.raw);
    }

    // This should never happen due to subdomain middleware
    return c.json({ error: "Invalid request" }, 400);
});

// 404 handler
app.notFound((c) => {
    return c.json({ error: "Not found" }, 404);
});

// Error handler
app.onError((err, c) => {
    console.error("Error:", err);
    return c.json(
        {
            error: "Internal server error",
            message:
                process.env.NODE_ENV === "development" ? err.message : undefined,
        },
        500,
    );
});

export default app;
