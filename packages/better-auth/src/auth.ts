import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
    organization,
    twoFactor,
    username,
    admin,
    multiSession,
    jwt,
    openAPI,
    bearer,
} from "better-auth/plugins";
import { db } from "@workspace/database";
import * as schema from "@workspace/database/schema/auth";
import {
    ac,
    owner,
    user,
} from "./permissions";
import { nextCookies } from "better-auth/next-js";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
    appName: "auth",
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
    secret: process.env.BETTER_AUTH_SECRET!,
    trustedOrigins: [
        process.env.NEXTJS_URL || "http://localhost:3000",
    ],

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
            twoFactor: schema.twoFactor,
            passkey: schema.passkey,
            organization: schema.organization,
            member: schema.member,
            invitation: schema.invitation,
            organizationRole: schema.organizationRole,
            team: schema.team,
            teamMember: schema.teamMember,
        },
    }),

    // Email configuration (SMTP)
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: true,
        sendResetPassword: async ({ user, url }) => {
            // TODO: Send password reset email
            console.log(`Password reset URL for ${user.email}: ${url}`);
        },
    },

    // Social OAuth providers
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            enabled: !!process.env.GITHUB_CLIENT_ID,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            accessType: "offline",
            enabled: !!process.env.GOOGLE_CLIENT_ID,
        },
        microsoft: {
            clientId: process.env.MICROSOFT_CLIENT_ID as string,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
            tenantId: process.env.MICROSOFT_TENANT_ID || "common",
            enabled: !!process.env.MICROSOFT_CLIENT_ID,
        },
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            enabled: !!process.env.DISCORD_CLIENT_ID,
        },
        linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
            enabled: !!process.env.LINKEDIN_CLIENT_ID,
        },
    },

    // Session management
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day (refresh session)
        freshAge: 60 * 10, // 10 minutes (consider fresh for sensitive operations)
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },

    // Rate limiting
    rateLimit: {
        enabled: true,
        window: 60, // 60 seconds
        max: 100, // 100 requests per window
        storage: "memory", // Use 'database' for production with multiple instances
    },

    // Advanced security options
    advanced: {
        cookiePrefix: "custom_prefix",
        crossSubDomainCookies: {
            enabled: true,
            domain: process.env.COOKIE_DOMAIN,
        },
        useSecureCookies: process.env.NODE_ENV === "production",
        database: {
            generateId: false,
        },
    },

    // Plugins
    plugins: [
        // Organization/multi-tenancy support with dynamic access control and teams
        organization({
            async sendInvitationEmail(data) {
                // TODO: Send invitation email
                console.log(
                    `Invitation sent to ${data.email} for organization ${data.organization.name}`,
                );
            },
            allowUserToCreateOrganization: true,
            organizationLimit: 5,

            // Enable teams/sub-organizations
            teams: {
                enabled: true,
                maximumTeams: 10, // Optional: limit teams per organization
                allowRemovingAllTeams: false, // Optional: prevent removing the last team
            },

            // Enable dynamic access control
            ac,

            // Predefined roles
            roles: {
                owner,
                user,
            },

            // Dynamic access control configuration
            dynamicAccessControl: {
                enabled: true,
                maximumRolesPerOrganization: 50, // Organizations can create up to 50 custom roles
            },
        }),

        // Two-factor authentication
        twoFactor({
            issuer: "Auth Service",
            otpOptions: {
                period: 30,
            },
        }),

        // Username support
        username(),

        // Admin plugin for user management with RBAC
        admin({
            ac,
            roles: {
                owner,
                user,
            },
            defaultRole: "user", // New users get user role by default
        }),

        // Multiple concurrent sessions
        multiSession({
            maximumSessions: 5,
        }),

        // JWT support for Bearer token auth
        jwt(),
        bearer(),
        // OpenAPI documentation
        openAPI({
            path: "/reference", // Available at /api/auth/reference
            theme: "purple", // Scalar theme
            disableDefaultReference: false,
        }),
        nextCookies()
    ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
