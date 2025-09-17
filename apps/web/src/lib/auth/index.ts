import { db } from "@workspace/database";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { apiKey, bearer, haveIBeenPwned, jwt, openAPI, organization, twoFactor, username } from "better-auth/plugins";
import { secondaryStorage } from "./secondary-storage";





const authConfig: BetterAuthOptions = {
    appName: "Monolith",
    baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    session: {
        expiresIn: 604800,
        updateAge: 86400,
        preserveSessionInDatabase: true

    },
    secondaryStorage: secondaryStorage,
    trustedOrigins: async (request: Request) => {
        return [`*.${process.env.ROOT_DOMAIN}`];
    },
    rateLimit: {
        enabled: true,
        window: 10,
        max: 100,
        // customRules: {
        //     "/example/path": {
        //         window: 10,
        //         max: 100
        //     }
        // },
        storage: "secondary-storage",
        modelName: "rateLimit"
    },
    advanced: {
        ipAddress: {
            ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
            disableIpTracking: false
        },
        useSecureCookies: true,
        disableCSRFCheck: false,
        crossSubDomainCookies: {
            enabled: true,
            additionalCookies: ["custom_cookie"],
            domain: process.env.ROOT_DOMAIN
        },
        cookies: {
            session_token: {
                name: "custom_session_token",
                attributes: {
                    httpOnly: true,
                    secure: true
                }
            }
        },
        defaultCookieAttributes: {
            httpOnly: true,
            secure: true
        },
        cookiePrefix: "custom_prefix",
        database: {
            // If your DB is using auto-incrementing IDs, set this to true.
            useNumberId: false,
            // Use your own custom ID generator, or disable generating IDs as a whole.
            generateId: false,
            defaultFindManyLimit: 100,
        }

    },
    plugins: [

        organization({
            teams: {
                enabled: true,
                maximumTeams: 5,
                allowRemovingAllTeams: false
            },
            schema: {
                organization: {
                    modelName: "club"
                }
            }
        }),
        haveIBeenPwned({
            customPasswordCompromisedMessage: "Please choose a more secure password.",
        }),
        twoFactor(),
        username(),
        jwt(),
        bearer(),
        apiKey(),
        openAPI(),
        nextCookies()]
};

export const auth = betterAuth(authConfig) as ReturnType<typeof betterAuth>;
