import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env files
config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../../.env") });

import { serve } from "@hono/node-server";
import app from "./app";

const port = Number(process.env.PORT) || 3001;

// Export for Vite dev server plugin
export default app;

// Only run server if in production mode
if (import.meta.env.PROD) {
    console.log(`🚀 Starting Auth Server on port ${port}`);
    console.log(`📦 Database URL configured: ${!!process.env.DATABASE_URL}`);

    serve({
        fetch: app.fetch,
        port,
    });

    console.log(`✅ Auth Server running at http://localhost:${port}`);
}
