import { defineConfig, loadEnv } from "vite";
import devServer from "@hono/vite-dev-server";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
    // Load env file from current directory and workspace root
    const envDir = process.cwd();
    const env = {
        ...loadEnv(mode, resolve(envDir, "../.."), ""),
        ...loadEnv(mode, envDir, ""),
    };

    return {
        server: {
            port: 3001,
        },
        build: {
            lib: {
                entry: "src/index.ts",
                formats: ["es"],
                fileName: "index",
            },
            rollupOptions: {
                external: [
                    /^node:.*/,
                    "better-auth",
                    "drizzle-orm",
                    "hono",
                    "valibot",
                    "@hono/node-server",
                    "@workspace/database",
                    "dotenv",
                ],
            },
            ssr: true,
            target: "node20",
            outDir: "dist",
        },
        plugins: [
            devServer({
                entry: "src/index.ts",
            }),
        ],
        define: {
            // Expose environment variables to the dev server
            "process.env.DATABASE_URL": JSON.stringify(env.DATABASE_URL),
            "process.env.BETTER_AUTH_SECRET": JSON.stringify(env.BETTER_AUTH_SECRET),
            "process.env.BETTER_AUTH_URL": JSON.stringify(env.BETTER_AUTH_URL),
            "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV || mode),
            "process.env.PORT": JSON.stringify(env.PORT || "3001"),
            "process.env.NEXTJS_URL": JSON.stringify(env.NEXTJS_URL),
            "process.env.API_URL": JSON.stringify(env.API_URL),
            "process.env.COOKIE_DOMAIN": JSON.stringify(env.COOKIE_DOMAIN),
        },
    };
});
