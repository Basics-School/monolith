import {
    pgTable,
    text,
    timestamp,
    boolean,
    uuid,
    json,
    index,
} from "drizzle-orm/pg-core";
import { user, organization } from "./auth";

/**
 * Projects table - stores all customer projects
 * Each project gets its own PostgreSQL schema for data isolation
 */
export const project = pgTable(
    "project",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        // Project identification
        name: text("name").notNull(),
        slug: text("slug").notNull().unique(), // URL-friendly identifier, used as both schema name and subdomain
        description: text("description"),

        // Ownership
        organizationId: uuid("organization_id")
            .notNull()
            .references(() => organization.id, { onDelete: "cascade" }),
        createdBy: uuid("created_by")
            .notNull()
            .references(() => user.id),

        // Better-auth configuration stored as JSON
        // Stores all authentication settings including OAuth provider secrets
        authConfig: json("auth_config").$type<{
            // Base configuration
            baseURL?: string;
            trustedOrigins?: string[];

            // Email & Password
            emailAndPassword?: {
                enabled?: boolean;
                requireEmailVerification?: boolean;
                autoSignIn?: boolean;
            };

            // Social providers configuration with secrets
            // Each provider stores its client credentials securely
            socialProviders?: {
                github?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string; // Stored securely per project
                };
                google?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                    accessType?: string; // e.g., "offline" for refresh tokens
                };
                microsoft?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                    tenantId?: string; // e.g., "common" or specific tenant
                };
                discord?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                linkedin?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                facebook?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                twitter?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                apple?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                spotify?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                twitch?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                dropbox?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                };
                gitlab?: {
                    enabled: boolean;
                    clientId?: string;
                    clientSecret?: string;
                    issuer?: string; // For self-hosted GitLab instances
                };
                // Add more providers as needed
            };

            // Generic OAuth/OIDC providers for custom integrations
            // Supports any OAuth 2.0 or OpenID Connect provider
            genericOAuthProviders?: Array<{
                providerId: string;
                enabled: boolean;
                clientId?: string;
                clientSecret?: string;
                discoveryUrl?: string; // OpenID Connect discovery URL
                authorizationUrl?: string;
                tokenUrl?: string;
                userInfoUrl?: string;
                scopes?: string[];
                pkce?: boolean; // PKCE support
            }>;

            // SAML/SSO Configuration
            ssoProviders?: Array<{
                providerId: string;
                enabled: boolean;
                issuer?: string;
                domain?: string;
                // OIDC-based SSO
                oidcConfig?: {
                    clientId?: string;
                    clientSecret?: string;
                    authorizationEndpoint?: string;
                    tokenEndpoint?: string;
                    jwksEndpoint?: string;
                    discoveryEndpoint?: string;
                    scopes?: string[];
                    pkce?: boolean;
                };
            }>;

            // Session configuration
            session?: {
                expiresIn?: number; // Session expiry in seconds
                updateAge?: number; // How often to update session
                freshAge?: number; // Consider session fresh for this duration
            };

            // Rate limiting
            rateLimit?: {
                enabled?: boolean;
                window?: number; // Time window in seconds
                max?: number; // Max requests per window
            };

            // Plugins configuration
            plugins?: {
                twoFactor?: { enabled: boolean };
                username?: { enabled: boolean };
                multiSession?: { enabled: boolean; maximumSessions?: number };
                organization?: { enabled: boolean };
            };

            // Advanced settings
            advanced?: {
                useSecureCookies?: boolean;
                cookiePrefix?: string;
            };
        }>().default({
            emailAndPassword: { enabled: true },
            socialProviders: {},
            genericOAuthProviders: [],
            ssoProviders: [],
            session: { expiresIn: 604800 },
            rateLimit: { enabled: true, window: 60, max: 100 },
            plugins: {},
        }),

        // API keys for project access
        apiKey: text("api_key").notNull(), // Public API key
        apiSecret: text("api_secret").notNull(), // Secret key (hashed)

        // Project status
        status: text("status").notNull().default("active"), // 'active', 'suspended', 'deleted'

        // Metadata
        metadata: json("metadata").$type<Record<string, any>>(),

        // Timestamps
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),

        // Soft delete
        deletedAt: timestamp("deleted_at"),
    },
    (table) => [
        // Indexes for faster lookups
        index("project_org_idx").on(table.organizationId),
        index("project_slug_idx").on(table.slug),
        index("project_status_idx").on(table.status),
    ],
);

/**
 * Project API logs - track API usage per project
 */
export const projectApiLog = pgTable(
    "project_api_log",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        projectId: uuid("project_id")
            .notNull()
            .references(() => project.id, { onDelete: "cascade" }),

        // Request details
        endpoint: text("endpoint").notNull(),
        method: text("method").notNull(),
        statusCode: text("status_code"),

        // Metrics
        responseTime: text("response_time"), // in milliseconds

        // Client info
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),

        // Timestamps
        timestamp: timestamp("timestamp").defaultNow().notNull(),
    },
    (table) => [
        index("api_log_project_idx").on(table.projectId),
        index("api_log_timestamp_idx").on(table.timestamp),
    ],
);

/**
 * Project webhooks - allow projects to receive auth events
 */
export const projectWebhook = pgTable("project_webhook", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
        .notNull()
        .references(() => project.id, { onDelete: "cascade" }),

    // Webhook configuration
    url: text("url").notNull(),
    secret: text("secret").notNull(), // For signature verification

    // Events to listen to
    events: json("events").$type<string[]>().notNull(), // e.g., ['user.created', 'user.login', 'user.logout']

    // Status
    enabled: boolean("enabled").default(true).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
