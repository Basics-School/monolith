import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
    twoFactor,
    username,
    multiSession,
    genericOAuth,
} from "better-auth/plugins";
import { getSchemaDb } from "@workspace/database";
import { projectSchema } from "@workspace/database";

// Cache for better-auth instances per project
const authInstances = new Map<string, ReturnType<typeof betterAuth>>();

/**
 * Creates a better-auth instance for a specific project
 *
 * ARCHITECTURE: Shared Database, Isolated Schemas
 * -----------------------------------------------
 * - All projects share the same PostgreSQL database connection
 * - Each project has its own isolated schema (e.g., 'project_abc123')
 * - The platform uses the 'public' schema
 * - SaaS customers don't need their own database - they get automatic isolation via schemas
 * - Better Auth tables are created in each project's schema during project creation
 *
 * This approach provides:
 * - Strong data isolation between projects
 * - Simplified infrastructure (one database for all)
 * - Cost efficiency for SaaS customers
 * - Easy backups and maintenance
 * - Native PostgreSQL Row Level Security can be added for extra protection
 *
 * Each project gets its own auth instance with custom configuration
 */
export function createProjectAuthInstance(
    project: typeof projectSchema.project.$inferSelect
): ReturnType<typeof betterAuth> {
    // Check cache first
    if (authInstances.has(project.id)) {
        return authInstances.get(project.id)!;
    }

    // Get database connection for this project's schema (using slug as schema name)
    const projectDb = getSchemaDb(project.slug);

    // Build plugins array based on project config
    const plugins: any[] = [];

    // Add two-factor if enabled
    if (project.authConfig?.plugins?.twoFactor?.enabled) {
        plugins.push(
            twoFactor({
                issuer: project.name,
            })
        );
    }

    // Add username if enabled
    if (project.authConfig?.plugins?.username?.enabled) {
        plugins.push(username());
    }

    // Add multi-session if enabled
    if (project.authConfig?.plugins?.multiSession?.enabled) {
        plugins.push(
            multiSession({
                maximumSessions:
                    project.authConfig.plugins.multiSession.maximumSessions || 5,
            })
        );
    }

    // Build social providers config
    const socialProviders: any = {};
    if (project.authConfig?.socialProviders) {
        const providers = project.authConfig.socialProviders;

        if (providers.github?.enabled && providers.github.clientId) {
            socialProviders.github = {
                clientId: providers.github.clientId,
                clientSecret: providers.github.clientSecret,
                enabled: true,
            };
        }

        if (providers.google?.enabled && providers.google.clientId) {
            socialProviders.google = {
                clientId: providers.google.clientId,
                clientSecret: providers.google.clientSecret,
                accessType: providers.google.accessType || "offline",
                enabled: true,
            };
        }

        if (providers.microsoft?.enabled && providers.microsoft.clientId) {
            socialProviders.microsoft = {
                clientId: providers.microsoft.clientId,
                clientSecret: providers.microsoft.clientSecret,
                tenantId: providers.microsoft.tenantId || "common",
                enabled: true,
            };
        }

        if (providers.discord?.enabled && providers.discord.clientId) {
            socialProviders.discord = {
                clientId: providers.discord.clientId,
                clientSecret: providers.discord.clientSecret,
                enabled: true,
            };
        }

        if (providers.linkedin?.enabled && providers.linkedin.clientId) {
            socialProviders.linkedin = {
                clientId: providers.linkedin.clientId,
                clientSecret: providers.linkedin.clientSecret,
                enabled: true,
            };
        }

        if (providers.facebook?.enabled && providers.facebook.clientId) {
            socialProviders.facebook = {
                clientId: providers.facebook.clientId,
                clientSecret: providers.facebook.clientSecret,
                enabled: true,
            };
        }

        if (providers.twitter?.enabled && providers.twitter.clientId) {
            socialProviders.twitter = {
                clientId: providers.twitter.clientId,
                clientSecret: providers.twitter.clientSecret,
                enabled: true,
            };
        }

        if (providers.apple?.enabled && providers.apple.clientId) {
            socialProviders.apple = {
                clientId: providers.apple.clientId,
                clientSecret: providers.apple.clientSecret,
                enabled: true,
            };
        }

        if (providers.spotify?.enabled && providers.spotify.clientId) {
            socialProviders.spotify = {
                clientId: providers.spotify.clientId,
                clientSecret: providers.spotify.clientSecret,
                enabled: true,
            };
        }

        if (providers.twitch?.enabled && providers.twitch.clientId) {
            socialProviders.twitch = {
                clientId: providers.twitch.clientId,
                clientSecret: providers.twitch.clientSecret,
                enabled: true,
            };
        }

        if (providers.dropbox?.enabled && providers.dropbox.clientId) {
            socialProviders.dropbox = {
                clientId: providers.dropbox.clientId,
                clientSecret: providers.dropbox.clientSecret,
                enabled: true,
            };
        }

        if (providers.gitlab?.enabled && providers.gitlab.clientId) {
            socialProviders.gitlab = {
                clientId: providers.gitlab.clientId,
                clientSecret: providers.gitlab.clientSecret,
                issuer: providers.gitlab.issuer,
                enabled: true,
            };
        }
    }

    // Build generic OAuth providers for custom integrations
    if (project.authConfig?.genericOAuthProviders && project.authConfig.genericOAuthProviders.length > 0) {
        const enabledGenericProviders = project.authConfig.genericOAuthProviders
            .filter(p => p.enabled && p.clientId)
            .map(p => ({
                providerId: p.providerId,
                clientId: p.clientId!,
                clientSecret: p.clientSecret!,
                discoveryUrl: p.discoveryUrl,
                authorizationUrl: p.authorizationUrl,
                tokenUrl: p.tokenUrl,
                userInfoUrl: p.userInfoUrl,
                scopes: p.scopes,
                pkce: p.pkce,
            }));

        if (enabledGenericProviders.length > 0) {
            plugins.push(
                genericOAuth({
                    config: enabledGenericProviders,
                })
            );
        }
    }

    // Build the auth configuration
    const authConfig: BetterAuthOptions = {
        appName: project.name,
        baseURL:
            project.authConfig?.baseURL ||
            `https://${project.slug}.${process.env.BASE_DOMAIN || "auth-platform.com"}`,
        secret: process.env.BETTER_AUTH_SECRET!,
        trustedOrigins: project.authConfig?.trustedOrigins || [],

        database: drizzleAdapter(projectDb, {
            provider: "pg",
            // Note: Schema is already set via search_path in the connection
        }),

        emailAndPassword: {
            enabled: project.authConfig?.emailAndPassword?.enabled ?? true,
            requireEmailVerification:
                project.authConfig?.emailAndPassword?.requireEmailVerification ?? false,
            autoSignIn: project.authConfig?.emailAndPassword?.autoSignIn ?? true,
            sendResetPassword: async ({ user, url }) => {
                // TODO: Integrate with project's email service
                console.log(
                    `[Project: ${project.name}] Password reset URL for ${user.email}: ${url}`
                );
            },
        },

        socialProviders,

        session: {
            expiresIn:
                project.authConfig?.session?.expiresIn ?? 60 * 60 * 24 * 7, // 7 days
            updateAge: project.authConfig?.session?.updateAge ?? 60 * 60 * 24, // 1 day
            freshAge: project.authConfig?.session?.freshAge ?? 60 * 10, // 10 minutes
            cookieCache: {
                enabled: true,
                maxAge: 60 * 5, // 5 minutes
            },
        },

        rateLimit: {
            enabled: project.authConfig?.rateLimit?.enabled ?? true,
            window: project.authConfig?.rateLimit?.window ?? 60, // 60 seconds
            max: project.authConfig?.rateLimit?.max ?? 100, // 100 requests
            storage: "memory", // Could be upgraded to database for distributed systems
        },

        advanced: {
            cookiePrefix: project.authConfig?.advanced?.cookiePrefix || "auth",
            useSecureCookies:
                project.authConfig?.advanced?.useSecureCookies ??
                process.env.NODE_ENV === "production",
            database: {
                generateId: false, // Let PostgreSQL handle ID generation
            },
        },

        plugins,
    };

    // Create the auth instance
    const authInstance = betterAuth(authConfig);

    // Cache it
    authInstances.set(project.id, authInstance);

    return authInstance;
}

/**
 * Clears a project's auth instance from cache
 * Useful when project configuration changes
 */
export function clearProjectAuthCache(projectId: string): void {
    authInstances.delete(projectId);
}

/**
 * Clears all cached auth instances
 */
export function clearAllAuthCaches(): void {
    authInstances.clear();
}

/**
 * Gets the number of cached auth instances
 */
export function getCachedAuthInstanceCount(): number {
    return authInstances.size;
}
